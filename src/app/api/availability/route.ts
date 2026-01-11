import { NextRequest, NextResponse } from "next/server";
import { fetchCatermonkeyOrders } from "@/lib/catermonkey";
import { getMockBookings } from "@/lib/mock-data";
import { generateMonthData } from "@/lib/calendar-utils";
import type { AvailabilityResponse, BookingStatus } from "@/types/calendar";

export const dynamic = "force-dynamic";

/**
 * GET /api/availability
 *
 * Query params:
 * - month: number (1-12)
 * - year: number
 *
 * Returns availability for the specified month
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    // Default to current month/year
    const now = new Date();
    const month = monthParam ? parseInt(monthParam) - 1 : now.getMonth(); // Convert to 0-indexed
    const year = yearParam ? parseInt(yearParam) : now.getFullYear();

    // Validate params
    if (month < 0 || month > 11 || year < 2024 || year > 2030) {
      return NextResponse.json(
        { error: "Invalid month or year" },
        { status: 400 }
      );
    }

    // Fetch bookings from Catermonkey or use mock data
    let bookings: Record<string, BookingStatus>;

    if (process.env.CATERMONKEY_API_KEY) {
      bookings = await fetchCatermonkeyOrders(year, month);
    } else {
      // Use mock data in development
      bookings = getMockBookings();
    }

    // Generate month data with effective statuses
    const days = generateMonthData(year, month, bookings);

    const response: AvailabilityResponse = {
      month: month + 1, // Return 1-indexed month
      year,
      days,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
