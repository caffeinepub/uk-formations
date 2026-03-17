export interface OrderRecord {
  id: string;
  companyName: string;
  packageSelected: string;
  serviceType: string;
  date: string;
  amountPaid: number;
  status: "completed" | "pending" | "processing";
  orderId?: string;
}

const STORAGE_KEY = "ukformations_order_history";

export function saveOrder(order: OrderRecord): void {
  const existing = getOrders();
  const filtered = existing.filter((o) => o.id !== order.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...filtered]));
}

export function getOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
