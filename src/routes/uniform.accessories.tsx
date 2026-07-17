import { createFileRoute } from "@tanstack/react-router";
import { UNIFORM_ACCESSORIES } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SplashOverlay } from "@/components/SplashOverlay";

export const Route = createFileRoute("/uniform/accessories")({
  head: () => ({ meta: [{ title: "Accessories — NCO" }] }),
  component: Accessories,
});

function Accessories() {
  return (
    <>
      <SplashOverlay storageKey="splash-accessories" subtitle="Restricted access — proceed with pride.">This page is reserved for NCOs only</SplashOverlay>
      <div className="px-4 py-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-1 text-shadow-glow">Accessories</h1>
        <p className="text-white/70 mb-5">NCO ranks, sashes & lanyards.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {UNIFORM_ACCESSORIES.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
