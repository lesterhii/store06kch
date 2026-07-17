import { useEffect, useState, type ReactNode } from "react";
import bbLogo from "@/assets/bb_logo.png.asset.json";

export function SplashOverlay({ storageKey, duration = 1800, children, subtitle }: { storageKey: string; duration?: number; children: ReactNode; subtitle?: string }) {
  const [show, setShow] = useState<boolean | null>(null);
  useEffect(() => {
    const seen = sessionStorage.getItem(storageKey);
    if (seen) { setShow(false); return; }
    setShow(true);
    sessionStorage.setItem(storageKey, "1");
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [storageKey, duration]);
  if (show === null) return null;
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-[color:var(--bb-navy)]/80 backdrop-blur-2xl" />
      <div className="relative text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-700">
        <img src={bbLogo.url} alt="" className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl animate-pulse" />
        <h2 className="text-3xl sm:text-4xl font-black text-shadow-glow tracking-tight">{children}</h2>
        {subtitle && <p className="mt-3 text-white/80 max-w-md mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
}
