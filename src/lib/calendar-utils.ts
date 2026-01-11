import { format, parseISO, isBefore, isToday, startOfDay, getDay } from "date-fns";
import { nl } from "date-fns/locale";
import type { BookingStatus, CatermonkeyOrderStatus, DayStatus } from "@/types/calendar";

// ===========================================
// DATE FORMATTING
// ===========================================

export function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatDisplayDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, "EEEE d MMMM yyyy", { locale: nl });
}

export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month, 1);
  return format(date, "MMMM yyyy", { locale: nl });
}

// ===========================================
// DATE CHECKS
// ===========================================

export function isPastDate(dateStr: string): boolean {
  const date = parseISO(dateStr);
  const today = startOfDay(new Date());
  return isBefore(date, today);
}

export function isTodayDate(dateStr: string): boolean {
  return isToday(parseISO(dateStr));
}

/**
 * Check if day is a closed day (Monday=1, Tuesday=2, Wednesday=3)
 */
export function isClosedDay(dateStr: string): boolean {
  const date = parseISO(dateStr);
  const dayOfWeek = getDay(date);
  return dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3;
}

/**
 * Check if day is Thursday (limited availability from 18:00)
 */
export function isThursday(dateStr: string): boolean {
  const date = parseISO(dateStr);
  return getDay(date) === 4;
}

// ===========================================
// STATUS MAPPING
// ===========================================

/**
 * Map Catermonkey order status to calendar display status
 */
export function mapCatermonkeyStatus(status: CatermonkeyOrderStatus): BookingStatus | null {
  switch (status) {
    case "concept":
    case "estimate":
    case "cancelled":
      return null; // Don't show on calendar
    case "option":
    case "awaiting-confirmation":
    case "new":
    case "prospect":
      return "option";
    case "confirmed":
    case "invoiced":
    case "partial-invoiced":
    case "to-invoice":
    case "completed":
      return "booked";
    default:
      console.log(`Unknown Catermonkey status: ${status}`);
      return null;
  }
}

/**
 * Get priority of booking status (higher = more important)
 */
export function getStatusPriority(status: BookingStatus | null): number {
  switch (status) {
    case "booked":
      return 3;
    case "option":
      return 2;
    case "available":
      return 1;
    default:
      return 0;
  }
}

/**
 * Get the effective status for a day considering operating hours
 */
export function getEffectiveDayStatus(
  dateStr: string,
  bookingStatus: BookingStatus
): BookingStatus {
  // Past dates
  if (isPastDate(dateStr)) {
    return bookingStatus;
  }

  // Closed days (ma, di, wo)
  if (isClosedDay(dateStr)) {
    return "closed";
  }

  // Thursday with limited hours
  if (isThursday(dateStr) && bookingStatus === "available") {
    return "limited";
  }

  return bookingStatus;
}

// ===========================================
// CALENDAR GENERATION
// ===========================================

export function getMonthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  const firstDay = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-start week (Mon=0, Sun=6)
  return firstDay === 0 ? 6 : firstDay - 1;
}

/**
 * Generate array of DayStatus objects for a month
 */
export function generateMonthData(
  year: number,
  month: number,
  bookings: Record<string, BookingStatus>
): DayStatus[] {
  const totalDays = getMonthDays(year, month);
  const days: DayStatus[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const dateStr = formatDateString(year, month, day);
    const bookingStatus = bookings[dateStr] || "available";
    const effectiveStatus = getEffectiveDayStatus(dateStr, bookingStatus);

    days.push({
      date: dateStr,
      status: effectiveStatus,
    });
  }

  return days;
}

// ===========================================
// WEEKDAY NAMES
// ===========================================

export const WEEKDAYS_SHORT = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
export const WEEKDAYS_FULL = [
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
  "Zondag",
];
