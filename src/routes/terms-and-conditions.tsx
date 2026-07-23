import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsAndConditions,
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Life Care Medical Polyclinic" },
      { name: "description", content: "Read the terms and conditions for using the Life Care Medical Polyclinic website and services." },
    ],
  }),
});

function TermsAndConditions() {
  return (
    <SiteShell>
      <PageHero eyebrow="Legal" title="Terms and Conditions" subtitle="The terms governing your use of our website, appointments, and healthcare services." />
      <section className="mx-auto max-w-4xl px-4 py-16 prose prose-slate">
        <p>
          By using this website and interacting with Life Care Medical Polyclinic and Laboratory, you agree to the following terms and conditions.
        </p>
        <h2>Website use</h2>
        <p>
          This website is intended to provide general information about our services and support appointment booking. The content is provided for informational purposes and should not replace professional medical advice.
        </p>
        <h2>Appointments and consultations</h2>
        <p>
          Appointment availability is subject to change. Please confirm details directly with our clinic before visiting. We reserve the right to reschedule or cancel appointments when necessary.
        </p>
        <h2>Intellectual property</h2>
        <p>
          All website content, branding, images, and written materials are the property of Life Care Medical Polyclinic and Laboratory unless otherwise stated.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          We make every effort to provide accurate information, but we do not guarantee that the website will be free of errors, interruptions, or omissions.
        </p>
      </section>
    </SiteShell>
  );
}
