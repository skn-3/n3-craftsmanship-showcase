import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import "@fontsource/dm-serif-display/400.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import appCss from "../styles.css?url";
import { CustomCursor } from "@/components/CustomCursor";
import { MagneticButtons } from "@/components/MagneticButtons";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileCTABar } from "@/components/MobileCTABar";
import { ExitIntentCTA } from "@/components/ExitIntentCTA";
import { PageTransition } from "@/components/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Sidan hittades inte</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sidan du letar efter finns inte längre eller har flyttats.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Sidan kunde inte laddas
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Något gick fel hos oss. Prova att ladda om sidan eller gå tillbaka till start.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { title: "N3 SmartKlimat – Renovering & Bygg i Stockholm" },
      { name: "description", content: "N3 SmartKlimat renoverar och bygger i hela Stockholm — totalrenovering, badrum, kök, tak, fasad och altan. Fast pris, egen projektledare och 10 års garanti på arbetet." },
      { name: "author", content: "N3 SmartKlimat" },
      { property: "og:title", content: "N3 SmartKlimat – Renovering & Bygg i Stockholm" },
      { property: "og:description", content: "N3 SmartKlimat renoverar och bygger i hela Stockholm — totalrenovering, badrum, kök, tak, fasad och altan. Fast pris, egen projektledare och 10 års garanti på arbetet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "N3 SmartKlimat – Renovering & Bygg i Stockholm" },
      { name: "twitter:description", content: "N3 SmartKlimat renoverar och bygger i hela Stockholm — totalrenovering, badrum, kök, tak, fasad och altan. Fast pris, egen projektledare och 10 års garanti på arbetet." },
      { property: "og:image", content: "https://n3prenad.se/og.jpg" },
      { name: "twitter:image", content: "https://n3prenad.se/og.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({"@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "name": "N3 SmartKlimat", "legalName": "SmartKlimat N3prenad AB", "url": "https://n3prenad.se", "image": "https://n3prenad.se/og.jpg", "telephone": "+46707197235", "email": "n3prenad@smartklimat.org", "vatID": "SE559026663001", "areaServed": {"@type": "City", "name": "Stockholm"}, "address": {"@type": "PostalAddress", "addressLocality": "Stockholm", "addressCountry": "SE"}, "priceRange": "$$"}),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
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
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <MagneticButtons />
      <Nav />
      <MobileCTABar />
      <ExitIntentCTA />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
    </QueryClientProvider>
  );
}
