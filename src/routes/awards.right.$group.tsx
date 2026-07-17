import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RIGHT_AWARDS, RIGHT_GROUPS, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/awards/right/$group")({
  head: ({ params }) => ({ meta: [{ title: `Right Arm — ${params.group}` }] }),
  loader: ({ params }) => {
    const data = RIGHT_AWARDS[params.group];
    if (!data) throw notFound();
    return data;
  },
  component: RightArm,
  notFoundComponent: () => <div className="p-8 text-center">Group not found.</div>,
});

function RightArm() {
  const data = Route.useLoaderData();
  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1">
        {RIGHT_GROUPS.map((g) => (
          <Link
            key={g.slug}
            to="/awards/right/$group"
            params={{ group: g.slug }}
            className="shrink-0 glass rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap"
            activeProps={{ className: "shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)]" }}
          >
            {g.label}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-black mb-1 text-shadow-glow">{data.title}</h1>
      <p className="text-white/70 mb-5">Right Arm Awards · Basic/Advanced variants apply.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.items.map((p: Product) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
