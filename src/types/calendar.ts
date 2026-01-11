// ===========================================
// BOOKING STATUS TYPES
// ===========================================

export type BookingStatus =
  | "available"
  | "option"
  | "booked"
  | "limited"
  | "closed";

export interface DayStatus {
  date: string; // YYYY-MM-DD format
  status: BookingStatus;
  catermonkeyOrderId?: number;
  eventName?: string;
  updatedAt?: string;
}

export interface CalendarMonth {
  year: number;
  month: number; // 0-11
  days: DayStatus[];
}

// ===========================================
// CATERMONKEY WEBHOOK TYPES
// ===========================================

export type CatermonkeyOrderStatus =
  | "concept"
  | "estimate"
  | "option"
  | "awaiting-confirmation"
  | "confirmed"
  | "invoiced"
  | "partial-invoiced"
  | "to-invoice"
  | "completed"
  | "cancelled"
  | "new"
  | "prospect";

export interface CatermonkeyWebhookPayload {
  id: string;
  type: "order.created" | "order.updated" | "order.deleted";
  data: {
    order_id: number;
    date: string; // ISO 8601
    date_end?: string;
    status: CatermonkeyOrderStatus;
    location_id: number;
    name?: string;
    num_persons?: number;
    customer_id?: number;
  };
}

// ===========================================
// API RESPONSE TYPES
// ===========================================

export interface AvailabilityResponse {
  month: number;
  year: number;
  days: DayStatus[];
  updatedAt: string;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
}

// ===========================================
// COMPONENT PROPS
// ===========================================

export interface CalendarProps {
  initialMonth?: number;
  initialYear?: number;
  locationId?: string;
}

export interface CalendarDayProps {
  day: number;
  status: BookingStatus;
  isToday: boolean;
  isPast: boolean;
  isThursday: boolean;
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  isThursday: boolean;
}
