import { createFileRoute, Link } from "@tanstack/react-router";
import { Shirt, Award } from "lucide-react";

export const Route = createFileRoute("/store-select")({
  head: () => ({ meta: [{ title: "Choose Store — 6th Kch" }] }),
  component: StoreSelect,
});

function StoreSelect() {
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-black text-center text-shadow-glow mb-8">Please choose your desired store.</h1>
      <div className="grid gap-5">
        <BigButton to="/uniform" title="Senior Uniform Store" icon={<Shirt className="w-14 h-14" />} tint="from-blue-500/30 to-indigo-500/30" />
        <BigButton to="/awards" title="Senior Awards Store" icon={<Award className="w-14 h-14" />} tint="from-yellow-500/30 to-red-500/30" />
      </div>
    </div>
  );
}

function BigButton({ to, title, icon, tint }: { to: string; title: string; icon: React.ReactNode; tint: string }) {
  return (
    <Link
      to={to as never}
      className={`glass-strong rounded-3xl min-h-[180px] flex flex-col items-center justify-center gap-3 p-6 text-center hover:scale-[1.02] active:scale-95 transition bg-gradient-to-br ${tint}`}
    >
      <div className="text-[color:var(--bb-gold)]">{icon}</div>
      <span className="text-2xl sm:text-3xl font-black text-shadow-glow">{title}</span>
    </Link>
  );
}
