"use client";

import { useState, useEffect, useCallback } from "react";
import { CalendarDay, CalendarDayEmpty } from "./CalendarDay";
import { CalendarLegend } from "./CalendarLegend";
import { QuickActions } from "./QuickActions";
import { InquiryModal } from "./InquiryModal";
import {
  formatMonthYear,
  formatDateString,
  getFirstDayOfMonth,
  getMonthDays,
  isPastDate,
  isTodayDate,
  isThursday as checkIsThursday,
  WEEKDAYS_SHORT,
} from "@/lib/calendar-utils";
import type { DayStatus, BookingStatus } from "@/types/calendar";
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  initialMonth?: number;
  initialYear?: number;
}

export function Calendar({ initialMonth, initialYear }: CalendarProps) {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(initialMonth ?? now.getMonth());
  const [currentYear, setCurrentYear] = useState(initialYear ?? now.getFullYear());
  const [days, setDays] = useState<DayStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedIsThursday, setSelectedIsThursday] = useState(false);

  // Fetch availability data
  const fetchAvailability = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const response = await fetch(
        `/api/availability?month=${currentMonth + 1}&year=${currentYear}`
      );
      if (response.ok) {
        const data = await response.json();
        setDays(data.days);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, [currentMonth, currentYear]);

  // Initial fetch and auto-refresh every 60 seconds
  useEffect(() => {
    fetchAvailability();

    // Auto-refresh polling (only when page is visible)
    const intervalId = setInterval(() => {
      if (!document.hidden) {
        fetchAvailability(false); // Don't show loading spinner on refresh
      }
    }, 60000); // 60 seconds

    return () => clearInterval(intervalId);
  }, [fetchAvailability]);

  // Navigation handlers
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Modal handlers
  const openModal = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedIsThursday(checkIsThursday(dateStr));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Calculate calendar grid
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const totalDays = getMonthDays(currentYear, currentMonth);

  // Create day status map for quick lookup
  const dayStatusMap = days.reduce((acc, day) => {
    acc[day.date] = day.status;
    return acc;
  }, {} as Record<string, BookingStatus>);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-16">
        {/* Main Calendar */}
        <div className="bg-white shadow-strong p-6 md:p-10">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-primary-lighter">
            <h2 className="font-heading text-2xl md:text-3xl text-primary-darkest capitalize">
              {formatMonthYear(currentYear, currentMonth)}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="w-11 h-11 flex items-center justify-center border border-primary-lighter hover:bg-primary-darkest hover:border-primary-darkest hover:text-white transition-all"
                aria-label="Vorige maand"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNextMonth}
                className="w-11 h-11 flex items-center justify-center border border-primary-lighter hover:bg-primary-darkest hover:border-primary-darkest hover:text-white transition-all"
                aria-label="Volgende maand"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS_SHORT.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium tracking-wider uppercase text-primary py-3"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <CalendarDayEmpty key={`empty-${i}`} />
            ))}

            {/* Days of the month */}
            {isLoading
              ? // Loading skeleton
                Array.from({ length: totalDays }).map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="aspect-square bg-gray-100 animate-pulse"
                  />
                ))
              : // Actual days
                Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = formatDateString(currentYear, currentMonth, day);
                  const status = dayStatusMap[dateStr] || "available";
                  const isPast = isPastDate(dateStr);
                  const isToday = isTodayDate(dateStr);
                  const isThursday = checkIsThursday(dateStr);

                  return (
                    <CalendarDay
                      key={dateStr}
                      day={day}
                      status={status}
                      isToday={isToday}
                      isPast={isPast}
                      isThursday={isThursday}
                      onClick={() => openModal(dateStr)}
                    />
                  );
                })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-32 space-y-6">
          <CalendarLegend />
          <QuickActions />
        </div>
      </div>

      {/* Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={closeModal}
        date={selectedDate}
        isThursday={selectedIsThursday}
      />
    </>
  );
}
