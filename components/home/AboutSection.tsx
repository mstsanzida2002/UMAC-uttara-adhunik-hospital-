"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent, useSiteImages } from "@/hooks/useSiteContent";

export default function AboutSection() {
  const { img } = useSiteImages();
  const { c } = useSiteContent({
    "about.tagline": "knowledge meets innovation",
    "about.heading": "About UAMC",
    "about.paragraph1":
      "Uttara Adhunik Medical College (UAMC) is a prestigious medical institution located in Uttara Model Town, Dhaka, Bangladesh. Established in 2003.",
    "about.paragraph2":
      "UAMC offers a Bachelor of Medicine and Bachelor of Surgery (MBBS) program, designed to equip students with the knowledge, skills, and hands-on clinical training needed to excel in the medical profession.",
    "about.mission_title": "College Mission",
    "about.mission_sub": "Statement",
    "about.vision_title": "College Vision",
    "about.vision_sub": "Achievement",
    "metrics.stat1.value": "90%",
    "metrics.stat1.label": "Post-Graduation Success Rate",
    "metrics.stat2.value": "Top 10",
    "metrics.stat2.label": "Colleges That Create Futures",
    "metrics.stat3.value": "No. 1",
    "metrics.stat3.label": "In The Nation For Materials R&D",
  });

  return (
    <section className="bg-white overflow-hidden">
      {/* Upper About Section */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Image Group */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[540px] lg:max-w-none">
              <div className="relative w-[85%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src={img("about-1", "/images/about-1.jpg")}
                  alt="UAMC Medical Students in Laboratory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 85vw, 450px"
                />
              </div>
              <div className="absolute -bottom-8 -right-2 sm:right-4 w-[62%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={img("about-2", "/images/about-2.jpg")}
                  alt="UAMC Doctors and Clinical Discussion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 320px"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-2xl border-4 border-[#018837] flex items-center justify-center animate-pulse">
                <div className="relative w-full h-full">
                  <Image src={img("logo", "/images/uamc-logo-round.png")} alt="UAMC Seal" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#018837]" />
              <span className="text-[#018837] font-semibold text-sm sm:text-base tracking-wide capitalize">
                {c("about.tagline")}
              </span>
            </div>

            <h2 className="font-bitter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#262626] leading-tight tracking-tight">
              {c("about.heading")}
            </h2>

            <p className="mt-6 text-[#737477] text-base sm:text-lg leading-relaxed">
              {c("about.paragraph1")}
            </p>
            <p className="mt-4 text-[#737477] text-base sm:text-lg leading-relaxed">
              {c("about.paragraph2")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#018837]/20 bg-[#e6f4ec]/30">
                <div className="w-12 h-12 rounded-lg bg-[#018837] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#018837] text-base leading-tight">{c("about.mission_title")}</h4>
                  <p className="text-xs text-[#737477] font-medium mt-0.5">{c("about.mission_sub")}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#018837]/20 bg-[#e6f4ec]/30">
                <div className="w-12 h-12 rounded-lg bg-[#018837] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#018837] text-base leading-tight">{c("about.vision_title")}</h4>
                  <p className="text-xs text-[#737477] font-medium mt-0.5">{c("about.vision_sub")}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#018837] text-white font-semibold text-base shadow-lg shadow-[#018837]/20 hover:bg-[#016f2c] transition-all group"
              >
                <span>View Our Program</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Banner */}
      <div className="relative w-full bg-[#018837] overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/metrics-bg.jpg" alt="UAMC Medical Research Background" fill className="object-cover" />
        </div>
        <div className="relative max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center">
            <div className="text-center md:px-8">
              <div className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {c("metrics.stat1.value")}
              </div>
              <p className="mt-2 text-base sm:text-lg font-bold text-[#FECD2F] uppercase tracking-wide">
                {c("metrics.stat1.label")}
              </p>
            </div>
            <div className="text-center md:px-8 md:border-x md:border-white/20">
              <div className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {c("metrics.stat2.value")}
              </div>
              <p className="mt-2 text-base sm:text-lg font-bold text-[#FECD2F] uppercase tracking-wide">
                {c("metrics.stat2.label")}
              </p>
            </div>
            <div className="text-center md:px-8">
              <div className="font-bitter text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {c("metrics.stat3.value")}
              </div>
              <p className="mt-2 text-base sm:text-lg font-bold text-[#FECD2F] uppercase tracking-wide">
                {c("metrics.stat3.label")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
