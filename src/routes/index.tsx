import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import bbLogo from "@/assets/bb_logo.png.asset.json";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Welcome — 6th Kch Store" }] }),
  component: Welcome,
});

function Welcome() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.phone.trim().length >= 6;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setUser({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
    navigate({ to: "/store-select" });
  };

  return (
    <div className="min-h-[80vh] px-4 py-8 grid place-items-center">
      <div className="glass-strong rounded-3xl w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center mb-6">
          <img src={bbLogo.url} alt="6th Kuching Company" className="w-24 h-24 drop-shadow-2xl" />
          <h1 className="mt-4 text-3xl sm:text-4xl font-black text-shadow-glow">Welcome to the 6th Kch Store!</h1>
          <p className="mt-2 text-white/80">Sure & Stedfast — let's get you kitted out.</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Full name" />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" />
          <Field label="Phone Number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+60 12 345 6789" />
          <button
            type="submit"
            disabled={!valid}
            className="mt-2 w-full py-4 rounded-2xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-black text-lg hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Let's Go! <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-white/70 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-black/25 border border-white/20 px-4 py-3 outline-none focus:border-[color:var(--bb-gold)] focus:bg-black/40 transition"
      />
    </label>
  );
}
