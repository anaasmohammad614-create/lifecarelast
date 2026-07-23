import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "./doctors";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Life Care Medical Polyclinic" },
      { name: "description", content: "Read the privacy policy for Life Care Medical Polyclinic and Laboratory, including how we collect, use, and protect patient information." },
    ],
  }),
});

function PrivacyPolicy() {
  return (
    <SiteShell>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How Life Care Medical Polyclinic and Laboratory handles your information and respects your privacy." />
      <section className="mx-auto max-w-4xl px-4 py-16 prose prose-slate">
        <p>
          Life Care Medical Polyclinic and Laboratory is committed to protecting the privacy and confidentiality of patients, visitors, and users of our website. This Privacy Policy explains the information we collect and how it is used.
        </p>
        <h2>Information we collect</h2>
        <p>
          We may collect information that you provide voluntarily through appointment forms, contact forms, phone calls, or emails, including your name, contact details, medical history, and communication preferences.
        </p>
        <h2>How we use your information</h2>
        <p>
          Your information may be used to provide medical services, respond to your inquiries, schedule appointments, improve our services, and comply with legal or regulatory obligations.
        </p>
        <h2>Data protection</h2>
        <p>
          We take reasonable steps to keep your personal information secure and only share it with authorized personnel or service providers when necessary for care, operations, or legal compliance.
        </p>
        <h2>Your choices</h2>
        <p>
          You may contact us if you wish to review, update, or request deletion of any personal information we hold, subject to applicable law and medical record retention requirements.
        </p>
      </section>
    </SiteShell>
  );
}
