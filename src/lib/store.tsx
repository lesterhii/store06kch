import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserInfo = { name: string; email: string; phone: string };
export type CartItem = {
  key: string; // productId + variant + size
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  variant?: string;
  image: string;
};

type StoreCtx = {
  user: UserInfo | null;
  setUser: (u: UserInfo | null) => void;
  cart: CartItem[];
  addToCart: (i: Omit<CartItem, "key"> & { key?: string }) => void;
  updateQuantity: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (b: boolean) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUserState] = useState<UserInfo | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUserState(readLS<UserInfo | null>("6kch_user", null));
    setCart(readLS<CartItem[]>("6kch_cart", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("6kch_user", JSON.stringify(user));
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("6kch_cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  const setUser = (u: UserInfo | null) => setUserState(u);

  const addToCart: StoreCtx["addToCart"] = (item) => {
    const key = item.key ?? `${item.productId}__${item.variant ?? ""}__${item.size ?? ""}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, key }];
    });
  };

  const updateQuantity = (key: string, qty: number) => {
    if (qty <= 0) return setCart((p) => p.filter((i) => i.key !== key));
    setCart((p) => p.map((i) => i.key === key ? { ...i, quantity: qty } : i));
  };
  const removeFromCart = (key: string) => setCart((p) => p.filter((i) => i.key !== key));
  const clearCart = () => setCart([]);

  return (
    <Ctx.Provider value={{ user, setUser, cart, addToCart, updateQuantity, removeFromCart, clearCart, cartOpen, setCartOpen, menuOpen, setMenuOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used inside StoreProvider");
  return c;
}

export function cartTotal(cart: CartItem[]) {
  return cart.reduce((s, i) => s + i.price * i.quantity, 0);
}
