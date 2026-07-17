import { createFileRoute } from "@tanstack/react-router";
import { getOrder } from "@/lib/email";
import { useEffect, useState } from "react";
import type { OrderEmail } from "@/lib/email";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/order-details/$orderId")({
  head: () => ({ meta: [{ title: "Admin — Order Details" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

function Admin() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<OrderEmail | null>(null);
  useEffect(() => { setOrder(getOrder(orderId)); }, [orderId]);

  if (!order) return (
    <div className="p-8 text-center">
      <div className="glass-strong rounded-3xl inline-block p-6">
        <h1 className="text-xl font-black">Order not found</h1>
        <p className="text-white/70 mt-1">This order isn't stored on this device.</p>
        <p className="text-xs text-white/50 mt-2">ID: {orderId}</p>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="glass-strong rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[color:var(--bb-gold)]/20 grid place-items-center">
            <ShieldCheck className="w-7 h-7 text-[color:var(--bb-gold)]" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">Admin View</div>
            <h1 className="text-2xl font-black">Order {order.orderId}</h1>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4">
            <div className="text-xs uppercase tracking-widest text-white/60 mb-1">Buyer</div>
            <div className="font-bold">{order.user.name}</div>
            <div className="text-sm text-white/80">{order.user.email}</div>
            <div className="text-sm text-white/80">{order.user.phone}</div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="text-xs uppercase tracking-widest text-white/60 mb-1">Placed</div>
            <div className="font-bold">{new Date(order.date).toLocaleString()}</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-white/60">Total</div>
            <div className="text-2xl font-black text-[color:var(--bb-gold)]">RM {order.total.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-4 glass rounded-2xl p-4">
          <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Itemized Cart</div>
          <table className="w-full text-sm">
            <thead className="text-white/60 text-xs uppercase">
              <tr><th className="text-left py-1">Item</th><th className="text-center">Qty</th><th className="text-right">Price</th><th className="text-right">Subtotal</th></tr>
            </thead>
            <tbody>
              {order.cart.map((i) => (
                <tr key={i.key} className="border-t border-white/10">
                  <td className="py-2">
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-xs text-white/60">{[i.variant, i.size].filter(Boolean).join(" · ")}</div>
                  </td>
                  <td className="text-center">{i.quantity}</td>
                  <td className="text-right">RM {i.price.toFixed(2)}</td>
                  <td className="text-right font-bold">RM {(i.price * i.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-white/20 mt-2 pt-2 flex justify-between font-black text-lg">
            <span>Total</span>
            <span className="text-[color:var(--bb-gold)]">RM {order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
