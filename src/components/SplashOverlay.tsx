import { useEffect, useState, type ReactNode } from "react"; 
import { ArrowRight } from "lucide-react";

export function SplashOverlay({
  storageKey,
  children,
  subtitle,
  cta = "I got this!",
}: {
  storageKey: string;
  children: ReactNode;
  subtitle?: string;
  cta?: string;
}) {
  const [show, setShow] = useState<boolean | null>(null);
  useEffect(() => {
    const seen = sessionStorage.getItem(storageKey);
    setShow(seen ? false : true);
  }, [storageKey]);

  if (!show) return null;

  const dismiss = () => {
    sessionStorage.setItem(storageKey, "1");
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[color:var(--bb-navy)]/85 backdrop-blur-2xl" />
      <div className="relative w-full max-w-md glass-strong rounded-3xl p-8 text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <img 
          src="https://i.imgur.com/X1ZN9Wj.png" 
          alt="BB Logo" 
          className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl" 
        />
        <h2 className="text-3xl sm:text-4xl font-black text-shadow-glow tracking-tight">{children}</h2>
        {subtitle && <p className="mt-3 text-white/85 leading-relaxed">{subtitle}</p>}
        <button
          onClick={dismiss}
          className="mt-8 w-full py-4 rounded-2xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-black text-lg hover:brightness-110 transition flex items-center justify-center gap-2"
        >
          {cta} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
