"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent, useSiteImages } from "@/hooks/useSiteContent";

export default function AdmissionBanner() {
  const { img } = useSiteImages();
  const { c } = useSiteContent({
    "admission.banner_desc":
      "Uttara Adhunik Medical College (UAMC) was established in 2003 with a vision to provide quality medical education and healthcare services. Founded through the dedicated efforts of medical professionals and social leaders, UAMC is committed to training future doctors while ensuring affordable healthcare for the community.",
  });

  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={img("admission-bg", "/images/admission-bg.jpg")}
          alt="UAMC Medical College Campus & Hospital"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        {/* Subtle dark gradient overlay to guarantee 1:1 contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/60" />
      </div>

      <div className="relative z-10 max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            UAMC Admission
          </h2>

          <p className="mt-6 text-white/90 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            {c(
              "admission.banner_desc",
              "Uttara Adhunik Medical College (UAMC) was established in 2003 with a vision to provide quality medical education and healthcare services. Founded through the dedicated efforts of medical professionals and social leaders, UAMC is committed to training future doctors while ensuring affordable healthcare for the community."
            )}
          </p>

          <div className="mt-8">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#018837] text-white font-semibold text-base sm:text-lg shadow-xl hover:bg-[#016f2c] transition-all group"
            >
              <span>Learn More</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
