import { useState } from "react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { X, Minus, Plus, AlertTriangle, Check } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const displayPrice = product.price ?? product.sizePriceMap?.[0]?.price ?? 0;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass rounded-2xl p-3 flex flex-col text-left hover:scale-[1.02] hover:bg-white/15 transition"
      >
        <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-black/20">
          <img src={product.image} alt={product.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover" />
        </div>
        <div className="font-semibold text-sm leading-tight line-clamp-2">{product.name}</div>
        <div className="mt-1 text-[color:var(--bb-gold)] font-bold">
          {product.sizePriceMap ? `from RM ${displayPrice.toFixed(2)}` : `RM ${displayPrice.toFixed(2)}`}
        </div>
      </button>
      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(product.variants?.[0]);
  const [size, setSize] = useState<string | undefined>(
    product.sizes?.[0] ?? product.sizePriceMap?.[0]?.label
  );
  const [added, setAdded] = useState(false);

  const price = (() => {
    if (product.sizePriceMap) {
      const found = product.sizePriceMap.find((s) => s.label === size);
      return found?.price ?? 0;
    }
    const base = product.price ?? 0;
    if (variant === "Advanced" && product.advancedSurcharge) {
      return base + product.advancedSurcharge;
    }
    return base;
  })();

  const submit = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price,
      quantity: qty,
      size,
      variant,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-strong rounded-3xl max-w-md w-full p-5 animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-lg glass grid place-items-center"><X className="w-4 h-4" /></button>
        <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-black/20">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold">{product.name}</h3>
        <div className="text-[color:var(--bb-gold)] text-2xl font-bold mt-1">RM {price.toFixed(2)}</div>

        {product.warning && (
          <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-[color:var(--bb-red)]/25 border border-[color:var(--bb-red)]/50">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="text-sm">{product.warning}</p>
          </div>
        )}

        {product.variants && (
          <div className="mt-4">
            <label className="text-xs uppercase tracking-widest text-white/70">Variant</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v}
                  onClick={() => { setVariant(v); if (product.sizePriceMap) setSize(v); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${variant === v ? "bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)]" : "glass"}`}
                >{v}</button>
              ))}
            </div>
          </div>
        )}

        {(product.sizes || (product.sizePriceMap && !product.variants)) && (
          <div className="mt-4">
            <label className="text-xs uppercase tracking-widest text-white/70">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 w-full rounded-xl bg-black/30 border border-white/20 p-3 outline-none focus:border-[color:var(--bb-gold)]"
            >
              {(product.sizes ?? product.sizePriceMap?.map((s) => s.label))?.map((s) => (
                <option key={s} value={s} className="bg-[color:var(--bb-navy)]">{s}{product.sizePriceMap ? ` — RM ${product.sizePriceMap.find(x => x.label === s)?.price.toFixed(2)}` : ""}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4">
          <label className="text-xs uppercase tracking-widest text-white/70">Quantity</label>
          <div className="mt-1 flex items-center gap-3">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-xl glass grid place-items-center"><Minus className="w-4 h-4" /></button>
            <span className="text-2xl font-bold w-10 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-xl glass grid place-items-center"><Plus className="w-4 h-4" /></button>
            <div className="ml-auto text-right">
              <div className="text-xs text-white/60">Subtotal</div>
              <div className="font-bold">RM {(price * qty).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <button
          onClick={submit}
          className={`mt-5 w-full py-4 rounded-2xl font-bold text-lg transition ${added ? "bg-green-500 text-white" : "bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] hover:brightness-110"}`}
        >
          {added ? <span className="flex items-center justify-center gap-2"><Check className="w-5 h-5" /> Added!</span> : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
