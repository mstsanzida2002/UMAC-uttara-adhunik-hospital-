import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const images = [
  // Hero
  { key: "hero-bg", label: "Hero Background", category: "Hero", url: "/images/hero-bg.jpg" },
  // About
  { key: "about-1", label: "About Image 1", category: "About", url: "/images/about-1.jpg" },
  { key: "about-2", label: "About Image 2", category: "About", url: "/images/about-2.jpg" },
  { key: "about-banner", label: "About Page Banner", category: "About", url: "/images/about-banner.jpg" },
  // Principal
  { key: "principal-photo", label: "Principal Photo", category: "Principal", url: "/images/principal-photo.jpg" },
  { key: "principal-signature", label: "Principal Signature", category: "Principal", url: "/images/principal-signature.png" },
  // Facilities
  { key: "facility-hostel", label: "Hostel Facility", category: "Facilities", url: "/images/facility-hostel.jpg" },
  // Find Department
  { key: "finddept-bg", label: "Find Department Background", category: "Departments", url: "/images/finddept-bg.jpg" },
  { key: "finddept-doctor", label: "Find Department Doctor", category: "Departments", url: "/images/finddept-doctor.jpg" },
  { key: "finddept-student1", label: "Find Department Student 1", category: "Departments", url: "/images/finddept-student1.jpg" },
  { key: "finddept-student2", label: "Find Department Student 2", category: "Departments", url: "/images/finddept-student2.jpg" },
  // Admission
  { key: "admission-bg", label: "Admission Background", category: "Admission", url: "/images/admission-bg.jpg" },
  { key: "admission-aid-bg", label: "Admission Aid Background", category: "Admission", url: "/images/admission-aid-bg.jpg" },
  // Metrics
  { key: "metrics-bg", label: "Metrics Section Background", category: "General", url: "/images/metrics-bg.jpg" },
  // Sustainability
  { key: "sustainability-1", label: "Sustainability Image 1", category: "General", url: "/images/sustainability-1.jpg" },
  { key: "sustainability-2", label: "Sustainability Image 2", category: "General", url: "/images/sustainability-2.jpg" },
  // Visit
  { key: "visit-uamc-bg", label: "Visit UAMC Background", category: "General", url: "/images/visit-uamc-bg.jpg" },
  // Footer
  { key: "footer-post-1", label: "Footer Post Image 1", category: "Footer", url: "/images/footer-post-1.webp" },
  { key: "footer-post-2", label: "Footer Post Image 2", category: "Footer", url: "/images/footer-post-2.webp" },
  // Logo / Branding
  { key: "logo", label: "College Logo (Round)", category: "Branding", url: "/images/uamc-logo-round.png" },
  { key: "college-emblem", label: "College Emblem", category: "Branding", url: "/assets/college-emblem.png" },
];

async function main() {
  let created = 0;
  for (const img of images) {
    await prisma.siteImage.upsert({
      where: { key: img.key },
      update: {},
      create: img,
    });
    created++;
    console.log(`✅ ${img.key}`);
  }
  console.log(`\nDone! ${created} image slots seeded.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
