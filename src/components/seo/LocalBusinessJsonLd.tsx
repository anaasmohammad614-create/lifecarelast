import { SITE_URL } from "@/lib/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalBusiness"],
  name: "Life Care Medical Polyclinic & Day Care Centre",
  url: SITE_URL,
  description:
    "Multi-specialty clinic and computerized diagnostic laboratory in Surathkal, Mangalore, offering consultations, routine tests, preventive health checkups, physiotherapy, and home blood sample collection.",
  telephone: "+91 81473 60437",
  email: "lifecarepolyclinic415@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Master Complex, Near MJM Hall, Chokkabettu",
    addressLocality: "Surathkal",
    addressRegion: "Karnataka",
    postalCode: "575014",
    addressCountry: "IN",
  },
  areaServed: [
    "Surathkal",
    "Chokkabettu",
    "Mangalore",
    "Kulai",
    "Katipalla",
    "Mulki",
    "NITK Surathkal",
    "Dakshina Kannada",
  ],
  medicalSpecialty: [
    "GeneralPractice",
    "Pediatric",
    "Gynecologic",
    "Orthopedic",
    "Dermatologic",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91 81473 60437",
      contactType: "appointments",
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91 96326 16501",
      contactType: "pharmacy",
      areaServed: "IN",
    },
  ],
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
