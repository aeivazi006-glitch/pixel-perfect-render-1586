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
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { Toaster } from "@/components/ToastNotification";
import { StoreProvider } from "@/lib/store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-3">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex rounded-full bg-primary px-8 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60svh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="display-md">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-7 py-3.5 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-input px-7 py-3.5 text-[0.68rem] tracking-[0.18em] uppercase transition-colors hover:border-foreground"
          >
            Go home
          </a>
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
      { title: "MODERNO — Premium Modern Furniture & Home Decor" },
      {
        name: "description",
        content:
          "MODERNO designs premium modern furniture and home decor — sofas, tables, beds and lighting made to order and delivered to your door.",
      },
      { name: "theme-color", content: "#f9f7f2" },
      { property: "og:site_name", content: "MODERNO" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
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
      <head>
        <HeadContent />
      </head>
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
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-primary focus:px-5 focus:py-3 focus:text-[0.68rem] focus:tracking-[0.18em] focus:uppercase focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <SearchModal />
        <Toaster />
      </StoreProvider>
    </QueryClientProvider>
  );
}
