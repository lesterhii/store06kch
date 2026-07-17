import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useStore, cartTotal } from "@/lib/store";
import { sendOrderEmails, saveOrder } from "@/lib/email";
import { Wallet, Info } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout" }] }),
  component: Checkout,
});

function makeOrderId() {
  const n = Math.floor(100 + Math.random() * 900);
  return `6KCH-ORD-${Date.now().toString().slice(-4)}${n}`;
}

function Checkout() {
  const { cart, user, clearCart } = useStore();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const total = cartTotal(cart);

  if (cart.length === 0) {
    return (
      <div className="px-4 py-16 max-w-md mx-auto text-center">
        <div className="glass-strong rounded-3xl p-8">
          <h1 className="text-2xl font-black mb-2">Your cart is empty</h1>
          <p className="text-white/70 mb-4">Add items before checkout.</p>
          <Link to="/store-select" className="inline-block px-5 py-3 rounded-xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-bold">Browse stores</Link>
        </div>
      </div>
    );
  }

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const orderId = makeOrderId();
    const qrUrl = `${window.location.origin}/admin/order-details/${orderId}`;
    const order = {
      orderId,
      user: form,
      cart,
      total,
      qrUrl,
      date: new Date().toISOString(),
    };
    saveOrder(order);
    sendOrderEmails(order);
    clearCart();
    navigate({ to: "/success/$orderId", params: { orderId } });
  };

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto grid gap-4 md:grid-cols-5">
      <div className="md:col-span-3 glass-strong rounded-3xl p-5">
        <h1 className="text-2xl font-black mb-4">Checkout</h1>
        <form onSubmit={place} className="space-y-3">
          <F label="Name" v={form.name} on={(v) => setForm({ ...form, name: v })} />
          <F label="Email" v={form.email} on={(v) => setForm({ ...form, email: v })} type="email" />
          <F label="Phone" v={form.phone} on={(v) => setForm({ ...form, phone: v })} type="tel" />

          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-[color:var(--bb-gold)]/20 border border-[color:var(--bb-gold)]/40">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--bb-gold)]" />
            <p className="text-sm">
              Payment will be collected in person via cash upon scanning your digital receipt.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting || !form.name || !form.email || !form.phone}
            className="mt-3 w-full py-4 rounded-2xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-black text-lg hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Wallet className="w-5 h-5" /> Place Order
          </button>
        </form>
      </div>

      <div className="md:col-span-2 glass-strong rounded-3xl p-5 h-fit">
        <h2 className="font-black mb-3">Order Summary</h2>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {cart.map((i) => (
            <div key={i.key} className="flex justify-between gap-3 text-sm">
              <div>
                <div className="font-semibold">{i.name} × {i.quantity}</div>
                <div className="text-white/60 text-xs">{[i.variant, i.size].filter(Boolean).join(" · ")}</div>
              </div>
              <div className="font-bold whitespace-nowrap">RM {(i.price * i.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/20 mt-3 pt-3 flex justify-between text-lg">
          <span>Total</span>
          <span className="font-black text-[color:var(--bb-gold)]">RM {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function F({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-white/70 mb-1">{label}</span>
      <input value={v} onChange={(e) => on(e.target.value)} type={type} required className="w-full rounded-xl bg-black/25 border border-white/20 px-4 py-3 outline-none focus:border-[color:var(--bb-gold)]" />
    </label>
  );
}
