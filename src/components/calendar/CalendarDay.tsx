"use client";

import type { BookingStatus } from "@/types/calendar";
import { cn } from "@/lib/cn";

interface CalendarDayProps {
  day: number;
  status: BookingStatus;
  isToday: boolean;
  isPast: boolean;
  isThursday: boolean;
  onClick?: () => void;
}

const statusConfig: Record<
  BookingStatus,
  { bg: string; border: string; text: string; dot: string; tooltip: string }
> = {
  available: {
    bg: "bg-available-light",
    border: "border-available",
    text: "text-available",
    dot: "bg-available",
    tooltip: "Beschikbaar - klik voor aanvraag",
  },
  option: {
    bg: "bg-option-light",
    border: "border-option",
    text: "text-option",
    dot: "bg-option",
    tooltip: "In optie - vraag naar mogelijkheden",
  },
  booked: {
    bg: "bg-booked-light",
    border: "border-booked",
    text: "text-booked",
    dot: "bg-booked",
    tooltip: "Geboekt - niet beschikbaar",
  },
  limited: {
    bg: "bg-limited-light",
    border: "border-limited",
    text: "text-limited",
    dot: "bg-limited",
    tooltip: "Beschikbaar vanaf 18:00",
  },
  closed: {
    bg: "bg-closed-light",
    border: "border-closed",
    text: "text-closed",
    dot: "bg-closed",
    tooltip: "Gesloten - ma, di, wo niet beschikbaar",
  },
};

export function CalendarDay({
  day,
  status,
  isToday,
  isPast,
  isThursday,
  onClick,
}: CalendarDayProps) {
  const config = statusConfig[status];
  const isClickable = !isPast && status !== "closed" && status !== "booked";

  return (
    <div
      className={cn(
        "aspect-square flex flex-col items-center justify-center border relative transition-all duration-300 group",
        isPast && "opacity-40",
        !isPast && config.bg,
        !isPast && config.border,
        isClickable && "cursor-pointer hover:scale-105 hover:shadow-lg hover:z-10",
        !isClickable && !isPast && "cursor-not-allowed",
        isPast && "bg-gray-50 border-gray-100"
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Day number */}
      <span
        className={cn(
          "font-heading text-lg",
          isPast ? "text-primary" : config.text
        )}
      >
        {day}
      </span>

      {/* Time label for Thursday */}
      {!isPast && isThursday && (status === "limited" || status === "option") && (
        <span className={cn("text-[10px] font-medium mt-0.5", config.text)}>
          18:00
        </span>
      )}

      {/* Status dot */}
      {!isPast && status !== "closed" && !isThursday && (
        <span className={cn("w-1.5 h-1.5 rounded-full mt-1", config.dot)} />
      )}

      {/* Today indicator */}
      {isToday && (
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
      )}

      {/* Tooltip */}
      {!isPast && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-primary-darkest text-white text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          {isThursday && status !== "booked" && status !== "closed"
            ? status === "option"
              ? "In optie (vanaf 18:00)"
              : "Beschikbaar vanaf 18:00"
            : config.tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary-darkest" />
        </div>
      )}
    </div>
  );
}

export function CalendarDayEmpty() {
  return <div className="aspect-square" />;
}
