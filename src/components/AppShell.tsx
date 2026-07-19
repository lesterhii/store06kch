import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft, Menu, ShoppingCart, X, Home, Shirt, Award, Store, Trash2, Minus, Plus } from "lucide-react";
import { useStore, cartTotal } from "@/lib/store";
import { RIGHT_GROUPS, LEFT_GROUPS } from "@/lib/products";
import type { ReactNode } from "react";

// REPLACE THIS LINK WITH YOUR ACTUAL EXTERNAL IMAGE ADDRESS
const BB_LOGO_URL = "https://your-hosting-link.com/bb_logo.png";

export function AppShell({ children }: { children: ReactNode }) {
  const { cart, cartOpen, setCartOpen, menuOpen, setMenuOpen } = useStore();
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
  const loc = useLocation();

  return (
    <div className="min-h-dvh relative">
      {/* Top bar */}
      <header className="sticky top-0 z-40 px-4 pt-4">
        <div className="glass rounded-2xl px-3 py-2 flex items-center justify-between gap-2">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 rounded-xl glass-strong grid place-items-center hover:scale-105 transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src={BB_LOGO_URL} alt="6th Kuching BB" className="h-9 w-9 object-contain drop-shadow-lg" />
            <span className="font-bold tracking-wide text-shadow-glow">The 06 Kch Store</span>
          </Link>
          <div className="w-11" />
        </div>
      </header>

      <main className="pb-32 pt-4">{children}</main>

      {/* ... (rest of your component remains the same) */}

            {/* Inside Hamburger drawer */}
            <div className="flex items-center gap-2 px-1 mt-3">
              <img src={BB_LOGO_URL} alt="" className="w-8 h-8" />
              <span className="font-bold">Menu</span>
            </div>

            <ContextualNav pathname={loc.pathname} />
          </aside>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && <CartDrawer />}
    </div>
  );
}

function ContextualNav({ pathname }: { pathname: string }) {
  const storeSelection = <NavLink to="/store-select" icon={<Store className="w-5 h-5" />} label="Store Selection" />;
  const awardsMenu = <NavLink to="/awards" icon={<Award className="w-5 h-5" />} label="Awards Menu" />;
  // Uniform context
  if (pathname.startsWith("/uniform")) {
    return (
      <>
        {storeSelection}
        <SectionLabel icon={<Shirt className="w-4 h-4" />} text="Uniform Store" />
        <NavLink to="/uniform" label="Uniform Menu" />
        <NavLink to="/uniform/general" label="General" />
        <NavLink to="/uniform/accessories" label="Accessories (NCO)" />
      </>
    );
  }
  // Right Arm Awards context
  if (pathname.startsWith("/awards/right")) {
    return (
      <>
        {storeSelection}
        {awardsMenu}
        <SectionLabel icon={<Award className="w-4 h-4" />} text="Right Arm Awards" />
        {RIGHT_GROUPS.map((g) => (
          <NavLink key={g.slug} to="/awards/right/$group" params={{ group: g.slug }} label={g.label} />
        ))}
      </>
    );
  }
  // Left Arm Awards context
  if (pathname.startsWith("/awards/left")) {
    return (
      <>
        {storeSelection}
        {awardsMenu}
        <SectionLabel icon={<Award className="w-4 h-4" />} text="Left Arm Awards" />
        {LEFT_GROUPS.map((g) => (
          <NavLink key={g.slug} to="/awards/left/$group" params={{ group: g.slug }} label={g.label} />
        ))}
      </>
    );
  }
  // Awards hub — needs Store Selection + Awards Menu at top
  if (pathname.startsWith("/awards")) {
    return (
      <>
        {storeSelection}
        {awardsMenu}
        <SectionLabel icon={<Award className="w-4 h-4" />} text="Right Arm Awards" />
        {RIGHT_GROUPS.map((g) => (
          <NavLink key={g.slug} to="/awards/right/$group" params={{ group: g.slug }} label={g.label} />
        ))}
        <SectionLabel icon={<Award className="w-4 h-4" />} text="Left Arm Awards" />
        {LEFT_GROUPS.map((g) => (
          <NavLink key={g.slug} to="/awards/left/$group" params={{ group: g.slug }} label={g.label} />
        ))}
      </>
    );
  }
  // Awards hub or anywhere else — default hub-level nav
  return (
    <>
      <NavLink to="/" icon={<Home className="w-5 h-5" />} label="Welcome" />
      {storeSelection}
      <SectionLabel icon={<Shirt className="w-4 h-4" />} text="Uniform Store" />
      <NavLink to="/uniform" label="Uniform Menu" />
      <SectionLabel icon={<Award className="w-4 h-4" />} text="Awards Store" />
      <NavLink to="/awards" label="Awards Menu" />
    </>
  );
}

function SectionLabel({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="mt-3 mb-1 px-2 flex items-center gap-2 text-[color:var(--bb-gold)] uppercase tracking-widest text-xs font-bold">
      {icon} {text}
    </div>
  );
}

function NavLink({ to, params, icon, label }: { to: string; params?: Record<string, string>; icon?: ReactNode; label: string }) {
  const { setMenuOpen } = useStore();
  return (
    <Link
      to={to as never}
      params={params as never}
      onClick={() => setMenuOpen(false)}
      className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/15 transition"
    >
      {icon}<span className="font-medium">{label}</span>
    </Link>
  );
}

function CartDrawer() {
  const { cart, setCartOpen, updateQuantity, removeFromCart } = useStore();
  const total = cartTotal(cart);
  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md glass-strong p-4 overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><ShoppingCart className="w-6 h-6" /> Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-lg glass grid place-items-center"><X className="w-4 h-4" /></button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-1 grid place-items-center text-white/70">Your cart is empty.</div>
        ) : (
          <>
            <div className="flex-1 flex flex-col gap-3">
              {cart.map((i) => (
                <div key={i.key} className="glass rounded-xl p-3 flex gap-3">
                  <img src={i.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{i.name}</div>
                    <div className="text-xs text-white/70">
                      {[i.variant, i.size].filter(Boolean).join(" · ")}
                    </div>
                    <div className="text-[color:var(--bb-gold)] font-bold">RM {i.price.toFixed(2)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQuantity(i.key, i.quantity - 1)} className="w-7 h-7 rounded-md glass grid place-items-center"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center font-bold">{i.quantity}</span>
                      <button onClick={() => updateQuantity(i.key, i.quantity + 1)} className="w-7 h-7 rounded-md glass grid place-items-center"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeFromCart(i.key)} className="ml-auto w-7 h-7 rounded-md bg-[color:var(--bb-red)]/80 grid place-items-center"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 glass-strong rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80">Total</span>
                <span className="text-2xl font-bold text-[color:var(--bb-gold)]">RM {total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="block text-center w-full py-4 rounded-xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-bold text-lg hover:brightness-110 transition"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
