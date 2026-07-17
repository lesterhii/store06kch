// No-backend order storage. Emails are sent via a mailto: link from checkout.
import type { CartItem, UserInfo } from "./store";

export type OrderEmail = {
  orderId: string;
  user: UserInfo;
  cart: CartItem[];
  total: number;
  qrText: string;
  date: string;
};

const ORDERS_KEY = "6kch_orders";
export function saveOrder(order: OrderEmail) {
  if (typeof window === "undefined") return;
  const list: OrderEmail[] = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
  list.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
}
export function getOrder(orderId: string): OrderEmail | null {
  if (typeof window === "undefined") return null;
  const list: OrderEmail[] = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
  return list.find((o) => o.orderId === orderId) ?? null;
}
