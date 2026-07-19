import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react"; 

// Use the same URL constant here
const BB_LOGO_URL = "https://i.imgur.com/X1ZN9Wj.png";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Welcome — The 06 Kch Store" }] }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] px-4 py-8 grid place-items-center">
      <div className="glass-strong rounded-3xl w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center mb-6">
          {/* Updated src to use the constant */}
          <img src={BB_LOGO_URL} alt="6th Kuching Company" className="w-24 h-24 drop-shadow-2xl" />
          <h1 className="mt-4 text-3xl sm:text-4xl font-black text-shadow-glow">Welcome to the<br /> 06 Kch Store!</h1>
          <p className="mt-2 text-white/80">Sure & Stedfast — let's get you kitted out.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate({ to: "/store-select" })}
          className="mt-2 w-full py-4 rounded-2xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-black text-lg hover:brightness-110 transition flex items-center justify-center gap-2"
        >
          Let's Go! <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
