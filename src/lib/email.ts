// Mock email logic — logs to console. Replace with EmailJS when configured.
import type { CartItem, UserInfo } from "./store";

export type OrderEmail = {
  orderId: string;
  user: UserInfo;
  cart: CartItem[];
  total: number;
  qrUrl: string;
  date: string;
};

export function sendOrderEmails(order: OrderEmail) {
  // Buyer email
  console.info("[EMAIL → BUYER]", order.user.email, {
    subject: `Order ${order.orderId} placed and waiting for review`,
    body: {
      message: "Your digital receipt is attached. Show the QR code to the admin in person.",
      qr: order.qrUrl,
      items: order.cart,
      total: order.total,
    },
  });
  // Admin email
  console.info("[EMAIL → ADMIN] lesterze2010@gmail.com", {
    subject: `[6KCH] New order ${order.orderId} — RM ${order.total.toFixed(2)}`,
    body: {
      orderId: order.orderId,
      buyer: order.user,
      items: order.cart,
      total: order.total,
      qr: order.qrUrl,
      date: order.date,
    },
  });
}

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
