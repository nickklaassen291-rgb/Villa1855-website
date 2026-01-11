import type { BookingStatus } from "@/types/calendar";

/**
 * Mock booking data for development/testing
 * Returns bookings for the current and next few months
 */
export function getMockBookings(): Record<string, BookingStatus> {
  const bookings: Record<string, BookingStatus> = {};
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Generate some realistic mock data
  for (let monthOffset = 0; monthOffset <= 3; monthOffset++) {
    const month = (currentMonth + monthOffset) % 12;
    const year = currentMonth + monthOffset > 11 ? currentYear + 1 : currentYear;
    const monthStr = String(month + 1).padStart(2, "0");

    // Add some booked dates (Saturdays are popular)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();

      // Skip past dates for bookings
      if (date < now) continue;

      const dateStr = `${year}-${monthStr}-${String(day).padStart(2, "0")}`;

      // Saturdays have 60% chance of being booked, 20% option
      if (dayOfWeek === 6) {
        const rand = Math.random();
        if (rand < 0.6) {
          bookings[dateStr] = "booked";
        } else if (rand < 0.8) {
          bookings[dateStr] = "option";
        }
      }
      // Fridays have 40% chance of being booked, 20% option
      else if (dayOfWeek === 5) {
        const rand = Math.random();
        if (rand < 0.4) {
          bookings[dateStr] = "booked";
        } else if (rand < 0.6) {
          bookings[dateStr] = "option";
        }
      }
      // Sundays have 30% chance of being booked
      else if (dayOfWeek === 0) {
        const rand = Math.random();
        if (rand < 0.3) {
          bookings[dateStr] = "booked";
        } else if (rand < 0.4) {
          bookings[dateStr] = "option";
        }
      }
      // Thursdays (limited) have 20% chance of being booked
      else if (dayOfWeek === 4) {
        const rand = Math.random();
        if (rand < 0.2) {
          bookings[dateStr] = "booked";
        } else if (rand < 0.3) {
          bookings[dateStr] = "option";
        }
      }
    }
  }

  return bookings;
}
