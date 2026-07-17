import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getOrder } from "@/lib/email";
import { QRCodeCanvas } from "qrcode.react";
import { CheckCircle2, Home } from "lucide-react";
import { useEffect, useState } from "react";
import type { OrderEmail } from "@/lib/email";

export const Route = createFileRoute("/success/$orderId")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.orderId}` }] }),
  component: Success,
});

function Success() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<OrderEmail | null>(null);
  useEffect(() => { setOrder(getOrder(orderId)); }, [orderId]);
  if (!order) return <div className="p-8 text-center text-white/70">Loading order…</div>;
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="glass-strong rounded-3xl p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/25 grid place-items-center mb-3">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-2xl font-black">Order is placed and waiting for review</h1>
        <p className="mt-2 text-white/70">Order ID</p>
        <p className="text-[color:var(--bb-gold)] text-xl font-black tracking-wider">{order.orderId}</p>

        <div className="mt-5 bg-white rounded-2xl p-4 mx-auto inline-block">
          <QRCodeCanvas value={order.qrUrl} size={200} includeMargin />
        </div>
        <p className="mt-3 text-white/70 text-sm">Show this QR code to the admin to complete payment in cash.</p>

        <div className="mt-6 text-left glass rounded-2xl p-4">
          <div className="text-xs uppercase tracking-widest text-white/60 mb-1">Buyer</div>
          <div className="font-semibold">{order.user.name}</div>
          <div className="text-sm text-white/70">{order.user.email} · {order.user.phone}</div>
          <div className="mt-3 text-xs uppercase tracking-widest text-white/60 mb-1">Items</div>
          <ul className="text-sm space-y-1">
            {order.cart.map((i) => (
              <li key={i.key} className="flex justify-between">
                <span>{i.name} × {i.quantity} {i.size ? `(${i.size})` : ""}</span>
                <span>RM {(i.price * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-white/20 mt-3 pt-2 font-bold">
            <span>Total</span><span className="text-[color:var(--bb-gold)]">RM {order.total.toFixed(2)}</span>
          </div>
        </div>

        <Link to="/" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl glass font-bold">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
