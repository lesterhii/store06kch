import { createFileRoute } from "@tanstack/react-router";
import { UNIFORM_GENERAL } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/uniform/general")({
  head: () => ({ meta: [{ title: "General — Uniform Store" }] }),
  component: General,
});

function General() {
  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1 text-shadow-glow">General</h1>
      <p className="text-white/70 mb-5">Senior uniform items & essentials.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {UNIFORM_GENERAL.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
