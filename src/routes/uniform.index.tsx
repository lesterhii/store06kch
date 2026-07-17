import { createFileRoute, Link } from "@tanstack/react-router";
import { SplashOverlay } from "@/components/SplashOverlay";
import { Package, Star } from "lucide-react";

export const Route = createFileRoute("/uniform/")({
  head: () => ({ meta: [{ title: "Uniform Store" }] }),
  component: UniformMenu,
});

function UniformMenu() {
  return (
    <>
      <SplashOverlay storageKey="splash-uniform">Welcome to the Uniform Store</SplashOverlay>
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-center text-shadow-glow mb-8">Uniform Store</h1>
        <div className="grid gap-5">
          <Link to="/uniform/general" className="glass-strong rounded-3xl min-h-[160px] flex flex-col items-center justify-center gap-2 p-6 hover:scale-[1.02] transition bg-gradient-to-br from-blue-500/30 to-cyan-500/20">
            <Package className="w-12 h-12 text-[color:var(--bb-gold)]" />
            <span className="text-2xl font-black">General</span>
          </Link>
          <Link to="/uniform/accessories" className="glass-strong rounded-3xl min-h-[160px] flex flex-col items-center justify-center gap-2 p-6 hover:scale-[1.02] transition bg-gradient-to-br from-yellow-500/30 to-orange-500/20">
            <Star className="w-12 h-12 text-[color:var(--bb-gold)]" />
            <span className="text-2xl font-black">Accessories</span>
          </Link>
        </div>
      </div>
    </>
  );
}
