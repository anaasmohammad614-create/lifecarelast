import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap")({
  component: Sitemap,
  head: () => ({
    meta: [
      { title: "Sitemap | Life Care Medical Polyclinic" },
      { name: "description", content: "Browse the sitemap for Life Care Medical Polyclinic and Laboratory website pages." },
    ],
  }),
});

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/doctors", label: "Doctors" },
  { href: "/departments", label: "Departments" },
  { href: "/laboratory", label: "Laboratory" },
  { href: "/pharmacy", label: "Pharmacy" },
  { href: "/products", label: "Products" },
  { href: "/book-appointment", label: "Book Appointment" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function Sitemap() {
  return (
    <SiteShell>
      <PageHero eyebrow="Explore" title="Sitemap" subtitle="Quick links to the main pages of Life Care Medical Polyclinic and Laboratory." />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-3 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-2">
          {links.map((item) => (
            <Link key={item.href} to={item.href} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
