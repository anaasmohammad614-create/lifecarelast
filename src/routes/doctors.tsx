import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteShell } from "@/components/layout/SiteShell";
import { Calendar } from "lucide-react";
import { doctorImage, namedDoctorPhoto } from "@/lib/media";
import { openContactChoice } from "@/components/ContactChoiceDialog";

export const Route = createFileRoute("/doctors")({
  component: DoctorsPage,
  head: () => ({
    meta: [
      { title: "Doctors in Surathkal | Life Care Medical Polyclinic" },
      { name: "description", content: "Meet Life Care's specialist doctors in Surathkal and book a consultation for general medicine, child health, women's health, orthopedics, ENT, dermatology and more." },
      { property: "og:title", content: "Our Doctors — Life Care Medical" },
      { property: "og:description", content: "Experienced doctors across every major specialty at Life Care." },
    ],
  }),
});

function DoctorsPage() {
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await supabase.from("doctors").select("*, departments(name, slug)").eq("is_active", true).order("sort_order");
      return data ?? [];
    },
  });

  return (
    <SiteShell>
      <PageHero eyebrow="Our team" title="Doctors you can trust" subtitle="Board-certified specialists dedicated to compassionate, evidence-based care." />
      <div className="mx-auto max-w-7xl px-4 pb-24">
        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Loading doctors…</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d: any) => (
              <div key={d.id} className="card-lift rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
                <div className="img-zoom relative aspect-[3/4] bg-muted">
                  <img src={namedDoctorPhoto(d.name) || d.photo_url || doctorImage(d.name)} alt={`Portrait of ${d.name}`} loading="lazy" width={900} height={1200} className="h-full w-full object-contain" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[oklch(0.15_0.03_230/0.7)] to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs font-medium text-white">{d.specialty}</span>
                </div>
                <div className="p-6">
                  <div className="font-display text-xl font-semibold">{d.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{d.qualifications}</div>
                  {d.bio && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{d.bio}</p>}

                  <button type="button" onClick={() => openContactChoice("appointment")} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95">
                    <Calendar className="h-4 w-4" /> Book with {d.name.split(" ").slice(0, 2).join(" ")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="absolute inset-0 gradient-aurora opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="text-xs uppercase tracking-[0.18em] text-white/85">{eyebrow}</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/85">{subtitle}</p>}
      </div>


    </section>
  );
}
