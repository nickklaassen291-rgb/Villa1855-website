import type { CatermonkeyOrderStatus, BookingStatus } from "@/types/calendar";
import { mapCatermonkeyStatus, getStatusPriority } from "./calendar-utils";

// ===========================================
// CATERMONKEY API CLIENT
// ===========================================

const CATERMONKEY_API_URL = process.env.CATERMONKEY_API_URL || "https://api.catermonkey.com/v1";
const CATERMONKEY_API_KEY = process.env.CATERMONKEY_API_KEY || "";
const CATERMONKEY_LOCATION_ID = process.env.CATERMONKEY_LOCATION_ID || "";

interface CatermonkeyOrder {
  order_id: number;
  date: string;
  date_end?: string | null;
  status: CatermonkeyOrderStatus;
  location_id: number | null;
  name?: string | null;
}

/**
 * Fetch orders from Catermonkey for a specific month
 */
export async function fetchCatermonkeyOrders(
  year: number,
  month: number
): Promise<Record<string, BookingStatus>> {
  if (!CATERMONKEY_API_KEY) {
    console.warn("Catermonkey API key not configured, using mock data");
    return {};
  }

  const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  // Use first day of NEXT month as end date (API uses exclusive end date)
  const nextMonth = month + 2 > 12 ? 1 : month + 2;
  const nextYear = month + 2 > 12 ? year + 1 : year;
  const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

  try {
    // Use /api/search/orders endpoint with correct parameters
    const url = `${CATERMONKEY_API_URL}/search/orders?from=${startDate}&to=${endDate}&with_product_details=false`;
    console.log("Fetching Catermonkey orders:", url);

    const response = await fetch(url, {
      headers: {
        "X-Catermonkey-Key": CATERMONKEY_API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Don't cache to avoid issues
    });

    if (!response.ok) {
      throw new Error(`Catermonkey API error: ${response.status}`);
    }

    // API returns { data: [...], page: 0, num-rows: N, all-order-ids: [...] }
    const responseData = await response.json();
    const orders: CatermonkeyOrder[] = responseData.data || [];
    console.log(`Received ${orders.length} orders from Catermonkey (total: ${responseData['num-rows']})`);

    const bookings: Record<string, BookingStatus> = {};
    const locationId = parseInt(CATERMONKEY_LOCATION_ID);

    for (const order of orders) {
      // Only process orders for our location (or include if location is null)
      if (order.location_id !== null && order.location_id !== locationId) {
        continue;
      }

      const status = mapCatermonkeyStatus(order.status);
      if (status) {
        // Extract date part (YYYY-MM-DD) from ISO string
        const dateStr = order.date.split("T")[0];

        // Only update if new status has higher priority (booked > option > available)
        const currentStatus = bookings[dateStr];
        if (!currentStatus || getStatusPriority(status) > getStatusPriority(currentStatus)) {
          console.log(`Order ${order.order_id}: ${order.name} - ${dateStr} - ${order.status} -> ${status}`);
          bookings[dateStr] = status;
        }
      }
    }

    return bookings;
  } catch (error) {
    console.error("Error fetching Catermonkey orders:", error);
    return {};
  }
}

/**
 * Verify webhook signature from Catermonkey
 */
export function verifyCatermonkeyWebhook(
  payload: string,
  signature: string
): boolean {
  const webhookSecret = process.env.CATERMONKEY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn("Webhook secret not configured");
    return false;
  }

  // TODO: Implement actual signature verification based on Catermonkey's method
  // This is typically HMAC-SHA256 but depends on their implementation

  return true; // Placeholder - implement actual verification
}

/**
 * Get location ID from Catermonkey
 * Use this to find the correct location_id for Villa 1855
 */
export async function fetchCatermonkeyLocations(): Promise<unknown[]> {
  if (!CATERMONKEY_API_KEY) {
    console.warn("Catermonkey API key not configured");
    return [];
  }

  try {
    const response = await fetch(`${CATERMONKEY_API_URL}/locations`, {
      headers: {
        "X-Catermonkey-Key": CATERMONKEY_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Catermonkey API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching Catermonkey locations:", error);
    return [];
  }
}
