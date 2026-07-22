import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";
import { ArrowRight } from "lucide-react";
import { departmentImage } from "@/lib/media";
import { openContactChoice } from "@/components/ContactChoiceDialog";

export const Route = createFileRoute("/departments")({
  component: DepartmentsPage,
  head: () => ({
    meta: [
      { title: "Specialist Doctors & Departments in Surathkal | Life Care" },
      { name: "description", content: "Consult General Medicine, Pediatrics, Gynecology, Orthopedics, ENT, Dermatology and Neurosurgery specialists at Life Care Polyclinic in Surathkal." },
      { property: "og:title", content: "Departments — Life Care Medical" },
      { property: "og:description", content: "Every major specialty under one roof." },
    ],
  }),
});

function DepartmentsPage() {
  const { data = [] } = useQuery({
    queryKey: ["departments-all"],
    queryFn: async () => {
      const { data } = await supabase.from("departments").select("*").eq("is_active", true).order("sort_order");
      return data ?? [];
    },
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ["departments-doctors"],
    queryFn: async () => {
      const { data } = await supabase.from("doctors").select("id, name, specialty, qualifications, department_id").eq("is_active", true);
      return data ?? [];
    },
  });

  const byDept = doctors.reduce<Record<string, { id: string; name: string; specialty: string; qualifications: string | null }[]>>((acc, doc: any) => {
    if (!doc.department_id) return acc;
    (acc[doc.department_id] ||= []).push(doc);
    return acc;
  }, {});

  return (
    <SiteShell>
      <PageHero eyebrow="Specialties" title="Departments at Life Care" subtitle="Complete, coordinated care across every major specialty — supported by our on-site laboratory and pharmacy." />
      <div className="mx-auto max-w-7xl px-4 pb-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((d) => {
          const deptDocs = byDept[d.id] ?? [];
          return (
            <div key={d.id} className="card-lift group rounded-3xl border border-border bg-card shadow-soft overflow-hidden flex flex-col">
              <button type="button" onClick={() => openContactChoice("appointment")} className="img-zoom relative aspect-[16/10] block text-left">
                <img src={departmentImage(d.slug, d.name)} alt={`${d.name} — Life Care Medical`} loading="lazy" width={1024} height={640} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.03_230/0.7)] via-[oklch(0.15_0.03_230/0.15)] to-transparent" />
                <div className="absolute inset-x-5 bottom-4 text-white">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/80">Specialty</div>
                  <div className="font-display text-2xl font-semibold">{d.name}</div>
                </div>
              </button>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-3">{d.description}</p>
                {deptDocs.length > 0 && (
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">Our doctors</div>
                    <ul className="space-y-1">
                      {deptDocs.map((doc) => (
                        <li key={doc.id} className="text-sm">
                          <div className="font-semibold text-foreground">{doc.name}</div>
                          {doc.qualifications && (
                            <div className="text-xs text-muted-foreground">{doc.qualifications}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button type="button" onClick={() => openContactChoice("appointment")} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary self-start">Book consultation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </SiteShell>
  );
}
