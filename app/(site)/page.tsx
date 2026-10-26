import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import NoticeBoard from "@/components/home/NoticeBoard";
import AboutSection from "@/components/home/AboutSection";
import FindDepartment from "@/components/home/FindDepartment";
import AdmissionBanner from "@/components/home/AdmissionBanner";
import FacilitiesSection from "@/components/home/FacilitiesSection";

export const metadata: Metadata = {
  title: "Uttara Adhunik Medical College | Home",
  description:
    "Uttara Adhunik Medical College (UAMC) & Hospital — Providing world-class medical education, advanced clinical training, and compassionate patient care in Dhaka, Bangladesh.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NoticeBoard />
      <AboutSection />
      <FindDepartment />
      <AdmissionBanner />
      <FacilitiesSection />
    </>
  );
}
