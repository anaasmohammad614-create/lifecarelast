import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

// Per user's spec:
// Home=Teal, Doctors=White, Departments=White, Laboratory=Teal,
// Pharmacy=White, About=Teal, Contact=White
const TEAL_ROUTES = new Set<string>(["/", "/laboratory", "/about"]);

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isTeal = TEAL_ROUTES.has(pathname);
  const tone = isTeal ? "section-teal" : "section-white";
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className={`flex-1 overflow-x-hidden ${tone}`}>{children}</main>
      <Footer />
    </div>
  );
}
