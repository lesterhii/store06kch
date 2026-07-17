import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "../lib/store";
import { AppShell } from "../components/AppShell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-3xl max-w-md text-center p-8">
        <h1 className="text-7xl font-black">404</h1>
        <p className="mt-2 text-white/80">This page doesn't exist.</p>
        <Link to="/" className="inline-block mt-4 px-5 py-3 rounded-xl bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-bold">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-3xl max-w-md text-center p-8">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-white/80">Try again or head back home.</p>
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-4 py-2 rounded-lg bg-[color:var(--bb-gold)] text-[color:var(--bb-navy)] font-bold">Try again</button>
          <a href="/" className="px-4 py-2 rounded-lg glass">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Welcome — 6th Kch Store" },
      { name: "description", content: "Official 6th Kuching Company Boys' Brigade Senior Uniform & Awards Store." },
      { name: "author", content: "6th Kuching Company BB" },
      { property: "og:title", content: "Welcome — 6th Kch Store" },
      { property: "og:description", content: "Official 6th Kuching Company Boys' Brigade Senior Uniform & Awards Store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Welcome — 6th Kch Store" },
      { name: "twitter:description", content: "Official 6th Kuching Company Boys' Brigade Senior Uniform & Awards Store." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4baacbbd-990d-4aa4-bc13-965c9f401cad/id-preview-b67347fc--aaa0e27b-14ce-4bc7-a069-907b1b9622d9.lovable.app-1784286202551.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4baacbbd-990d-4aa4-bc13-965c9f401cad/id-preview-b67347fc--aaa0e27b-14ce-4bc7-a069-907b1b9622d9.lovable.app-1784286202551.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AppShell>
          <Outlet />
        </AppShell>
      </StoreProvider>
    </QueryClientProvider>
  );
}
