import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";

export const Route = createFileRoute("/disclaimer")({
  component: Disclaimer,
  head: () => ({
    meta: [
      { title: "Disclaimer | Life Care Medical Polyclinic" },
      { name: "description", content: "Read the disclaimer for Life Care Medical Polyclinic and Laboratory website content and medical information." },
    ],
  }),
});

function Disclaimer() {
  return (
    <SiteShell>
      <PageHero eyebrow="Legal" title="Disclaimer" subtitle="Important information about the nature of the content and services published on this website." />
      <section className="mx-auto max-w-4xl px-4 py-16 prose prose-slate">
        <p>
          The information provided on this website is intended for general informational purposes only and does not constitute medical advice, diagnosis, or treatment.
        </p>
        <h2>Medical information</h2>
        <p>
          Any medical concern should be discussed directly with a qualified healthcare professional. In emergency situations, please contact emergency services immediately.
        </p>
        <h2>Website accuracy</h2>
        <p>
          While we strive to keep the content accurate and up to date, details such as services, hours, fees, and availability may change without notice.
        </p>
        <h2>Third-party links</h2>
        <p>
          This website may contain links to third-party websites. We are not responsible for the content or practices of any external websites.
        </p>
      </section>
    </SiteShell>
  );
}
