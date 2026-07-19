import { createFileRoute, Link } from "@tanstack/react-router";
import { SplashOverlay } from "@/components/SplashOverlay";
import { AlertOctagon, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/awards/")({
  head: () => ({ meta: [{ title: "Awards Store" }] }),
  component: AwardsMenu,
});

function AwardsMenu() {
  const [ack, setAck] = useState(false);
  
  // Define the logo URL constant here
  const BB_LOGO_URL = "https://i.imgur.com/X1ZN9Wj.png";

  return (
    <>
      <SplashOverlay 
        storageKey="splash-awards" 
        logoUrl={BB_LOGO_URL}
      >
        Welcome to the Awards Store
      </SplashOverlay>
      
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {!ack ? (
          <div className="glass-strong rounded-3xl p-6 sm:p-8 text-center animate-in fade-in duration-500">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[color:var(--bb-red)]/30 grid place-items-center mb-4">
              <AlertOctagon className="w-9 h-9 text-[color:var(--bb-red)]" />
            </div>
            <h2 className="text-2xl font-black mb-2">Disclaimer</h2>
            <p className="text-white/85 leading-relaxed">
              You can only buy the awards you already own for replacement purposes.
            </p>
            <button
              onClick={() => setAck(true)}
              className="mt-6 w-full py-4 rounded-2xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-black text-lg hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              I Understand <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-black text-center text-shadow-glow mb-8">Awards Store</h1>
            <div className="grid gap-5">
              <Link to="/awards/right/$group" params={{ group: "compulsory" }} className="glass-strong rounded-3xl min-h-[160px] flex flex-col items-center justify-center p-6 hover:scale-[1.02] transition bg-gradient-to-br from-red-500/30 to-orange-500/20">
                <span className="text-2xl sm:text-3xl font-black">Right Arm Awards</span>
                <span className="mt-1 text-white/70 text-sm">Compulsory · Groups A–D</span>
              </Link>
              <Link to="/awards/left/$group" params={{ group: "service" }} className="glass-strong rounded-3xl min-h-[160px] flex flex-col items-center justify-center p-6 hover:scale-[1.02] transition bg-gradient-to-br from-blue-500/30 to-indigo-500/20">
                <span className="text-2xl sm:text-3xl font-black">Left Arm Awards</span>
                <span className="mt-1 text-white/70 text-sm">Service · Special</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
