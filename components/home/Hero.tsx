"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteImages } from "@/hooks/useSiteImages";

const slides = [
  {
    id: "01",
    imageKey: "hero-bg",
    tagline: "Shaping the Future of Healthcare, One Student at a Time",
    title: "Excellence in Medical Education, Innovation in Healthcare",
    ctaText: "View Our Program",
    ctaLink: "/facilities?tab=departments",
    degrees: {
      category: "MBBS Degrees",
      items: [
        {
          title: "Bachelor of Medicine",
          description:
            "A degree focusing on the study of human biology, anatomy, and pathology to build a strong medical foundation.",
          link: "/facilities?tab=departments",
        },
        {
          title: "Bachelor of Surgery",
          description:
            "A degree emphasizing clinical and surgical skills for diagnosing and treating patients effectively.",
          link: "/facilities?tab=departments",
        },
      ],
    },
  },
  {
    id: "02",
    imageKey: "hero-bg-2",
    tagline: "World-Class Academic Faculty & Clinical Laboratories",
    title: "Nurturing Tomorrow's Compassionate Medical Leaders",
    ctaText: "Explore Departments",
    ctaLink: "/facilities?tab=departments",
    degrees: {
      category: "Academic Degrees",
      items: [
        {
          title: "Pre-Clinical Sciences",
          description:
            "Comprehensive training in Anatomy, Physiology, and Biochemistry with modern histology and dissection labs.",
          link: "/facilities?tab=departments",
        },
        {
          title: "Para-Clinical Sciences",
          description:
            "Rigorous exposure in Pathology, Microbiology, Pharmacology, and Community Medicine diagnostics.",
          link: "/facilities?tab=departments",
        },
      ],
    },
  },
  {
    id: "03",
    imageKey: "hero-bg-3",
    tagline: "500+ Bedded Tertiary Care Teaching Hospital",
    title: "Comprehensive Patient Care & Real-World Bedside Training",
    ctaText: "Hospital Facilities",
    ctaLink: "/facilities",
    degrees: {
      category: "Clinical Care",
      items: [
        {
          title: "24/7 Emergency & ICU Care",
          description:
            "Specialized acute emergency care units, CCU, NICU, and operation theaters providing active clinical training.",
          link: "/facilities",
        },
        {
          title: "Multidisciplinary Outpatient Care",
          description:
            "High-volume outpatient specialty clinics serving thousands of local and regional patients every day.",
          link: "/facilities",
        },
      ],
    },
  },
  {
    id: "04",
    imageKey: "hero-bg-4",
    tagline: "BMDC Recognized & University of Dhaka Affiliated",
    title: "Global Accreditation, Standardized Curriculum & Research",
    ctaText: "Admission Guidelines",
    ctaLink: "/admissions",
    degrees: {
      category: "MBBS Admissions",
      items: [
        {
          title: "National & Foreign Student Seats",
          description:
            "Merit-based admissions guided by DGHS standards with dedicated quotas for aspiring international doctors.",
          link: "/admissions",
        },
        {
          title: "Accredited Medical Degrees",
          description:
            "Degrees recognized internationally for USMLE, PLAB, AMC, and global postgraduate specialization.",
          link: "/admissions",
        },
      ],
    },
  },
];

export default function Hero() {
  const { img } = useSiteImages();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[680px] lg:min-h-[750px] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 1. Background Image with Standard Dark Overlay (matching Figma Node 7:1367) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slideItem, index) => (
          <Image
            key={slideItem.imageKey}
            src={img(slideItem.imageKey, "/images/hero-bg.jpg")}
            alt="Uttara Adhunik Medical College Campus"
            fill
            priority={index === 0}
            className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Standard dark overlay replacing the purple gradient */}
        <div className="absolute inset-0 bg-black/55 backdrop-brightness-90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-between min-h-[640px] lg:min-h-[700px]">
        {/* 2. Top Slide Navigation Bar (PREV | 01 02 03 04 | NEXT) */}
        <div className="w-full flex items-center justify-center pt-2 pb-6">
          <div className="inline-flex items-center gap-3 sm:gap-6 px-4 py-2 select-none">
            {/* PREV button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="text-white hover:text-[#FECD2F] text-xs sm:text-sm font-serif font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Prev
            </button>

            {/* Left Divider Line */}
            <div className="w-12 sm:w-24 md:w-32 h-[1px] bg-white/30" />

            {/* Numbers: 01, 02, 03, 04 */}
            <div className="flex items-center gap-2 sm:gap-4">
              {slides.map((s, index) => {
                const isActive = currentSlide === index;
                return (
                  <div key={s.id} className="flex items-center gap-2 sm:gap-4">
                    <button
                      onClick={() => setCurrentSlide(index)}
                      className={`font-serif transition-all cursor-pointer ${
                        isActive
                          ? "text-[#FECD2F] font-bold text-base sm:text-lg drop-shadow-[0_2px_8px_rgba(254,205,47,0.4)]"
                          : "text-white/70 hover:text-white font-medium text-xs sm:text-sm"
                      }`}
                      aria-label={`Go to slide ${s.id}`}
                    >
                      {s.id}
                    </button>
                    {index < slides.length - 1 && (
                      <span className="h-3 w-[1px] bg-white/20" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Divider Line */}
            <div className="w-12 sm:w-24 md:w-32 h-[1px] bg-white/30" />

            {/* NEXT button */}
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="text-white hover:text-[#FECD2F] text-xs sm:text-sm font-serif font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* 3. Floating Glassmorphic Card (matching Figma Frame 43: Node 7:1448) */}
        <div className="w-full bg-black/15 backdrop-blur-[6px] border border-white/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300 mt-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Eyebrow emblem, Main Headline, CTA Button */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Medical Emblem + Tagline */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-5 flex-shrink-0 flex items-center justify-center">
                  <svg
                    width="28"
                    height="20"
                    viewBox="0 0 29 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M26.5654 11.25L23.7961 12.2678C23.6973 10.8497 23.5285 9.46228 23.2934 8.13363L28.308 6.45905C28.7285 6.31864 29.0001 5.93902 29.0001 5.49192C29.0001 5.04481 28.7285 4.66515 28.308 4.52479L15.0001 0.0808181C14.6776 -0.0269394 14.3223 -0.0269394 14 0.0808181L0.692096 4.52479C0.27165 4.6652 0 5.04481 0 5.49198C0 5.93913 0.27165 6.31874 0.692096 6.4591L5.70584 8.13341C5.57936 8.8491 5.4705 9.59378 5.38185 10.3513C5.35438 10.5867 5.5209 10.7999 5.75388 10.8277C5.7708 10.8297 5.78763 10.8306 5.80428 10.8306C6.01663 10.8306 6.20009 10.6701 6.22558 10.452C6.30725 9.75382 6.40654 9.06743 6.52107 8.40566L7.8719 8.85677V9.92375C7.19227 10.1123 6.6914 10.7414 6.6914 11.4867C6.6914 11.9361 6.8735 12.3433 7.16695 12.6371C6.95182 13.4314 6.78587 14.3622 6.66975 15.4231C6.37998 15.2558 6.16401 15.1116 6.01963 15.0084C5.97704 14.9779 5.95189 14.9276 5.95228 14.8738C5.95846 14.0266 5.99182 13.1661 6.05152 12.3163C6.06812 12.0799 5.89185 11.8748 5.65781 11.8581C5.42433 11.8416 5.2206 12.0193 5.204 12.2556C5.14312 13.1235 5.10901 14.0023 5.10267 14.8674C5.10018 15.2015 5.25951 15.516 5.52866 15.7085C5.74152 15.8607 6.09242 16.0919 6.58315 16.3536C6.5111 17.2825 6.47264 18.2974 6.46811 19.3951C6.46675 19.7225 6.68528 20.0083 6.99969 20.0902C7.27797 20.1626 7.72894 20.249 8.29671 20.249C8.86442 20.249 9.31538 20.1626 9.59369 20.0901C9.90807 20.0083 10.1266 19.7224 10.1252 19.3951C10.1229 18.7965 10.1101 18.223 10.0875 17.6742C10.6617 17.8202 11.2583 17.9435 11.8697 18.0421C11.8858 18.3793 11.958 18.7352 12.0837 19.0837C12.2831 19.637 12.5971 20.1175 12.9679 20.4367C13.2785 20.7042 13.6175 20.8438 13.9384 20.8438C14.0499 20.8438 14.1591 20.826 14.2642 20.7916C14.2765 20.7884 14.2886 20.7846 14.3007 20.7801L20.8666 18.3669L20.8679 18.3664C21.1259 18.2719 21.3498 18.2726 21.5526 18.3686C22.0155 18.5876 22.2922 19.2475 22.3897 19.5212C22.4539 19.7009 22.5835 19.8444 22.7548 19.9255C22.8504 19.9707 22.9523 19.9934 23.0547 19.9934C23.1365 19.9934 23.2185 19.9789 23.2976 19.9498L25.2472 19.2332C25.4396 19.1625 25.5925 19.0112 25.6664 18.8181C25.7397 18.6264 25.7276 18.4125 25.6333 18.2312C25.3599 17.7062 24.9329 17.3142 24.3814 17.0749L25.06 16.8255C25.2805 16.7445 25.3941 16.4983 25.3138 16.2757C25.2336 16.053 24.9898 15.9382 24.7694 16.0193L23.6069 16.4465C23.6683 15.9927 23.6099 15.4597 23.415 14.9188C23.227 14.3974 22.937 13.9406 22.5937 13.6224L26.8556 12.0561C27.1085 11.9629 27.6733 12.3782 27.9838 13.2396C28.1316 13.6497 28.1842 14.0778 28.1282 14.4143C28.087 14.6615 27.9917 14.835 27.8731 14.8786L26.5436 15.3672C26.3232 15.4482 26.2095 15.6943 26.2898 15.917C26.3699 16.1395 26.6134 16.2544 26.8343 16.1734L28.1637 15.6848C28.5796 15.5319 28.8721 15.1207 28.966 14.5567C29.0469 14.0713 28.9816 13.4994 28.7822 12.9462C28.3342 11.703 27.3604 10.9578 26.5654 11.25Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="text-white/95 text-xs sm:text-sm font-medium tracking-wide">
                  {slide.tagline}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[45px] xl:text-[48px] font-normal text-white leading-[1.2] lg:leading-[1.25] tracking-tight">
                {slide.title.includes("Education,") ? (
                  <>
                    {slide.title.split("Education,")[0]}
                    <span className="text-[#FECD2F] font-normal">Education,</span>
                    {slide.title.split("Education,")[1]}
                  </>
                ) : (
                  slide.title
                )}
              </h1>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-[#018837] font-semibold text-sm sm:text-[15px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 group"
                >
                  <span>{slide.ctaText}</span>
                  <svg
                    className="w-4 h-4 text-[#018837] transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column: MBBS Degrees (matching Figma Frame 42) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-black/25 lg:bg-transparent rounded-xl p-4 sm:p-5 lg:p-0 border border-white/10 lg:border-none">
              {/* Category Title in Accent Gold */}
              <h2 className="font-serif font-bold text-2xl sm:text-[28px] text-[#FECD2F] tracking-tight mb-4 pb-1">
                {slide.degrees.category}
              </h2>

              <div className="space-y-4">
                {slide.degrees.items.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 group">
                    <Link
                      href={item.link}
                      className="flex items-center justify-between text-white group-hover:text-[#FECD2F] transition-colors"
                    >
                      <h3 className="font-serif font-medium text-base sm:text-lg">
                        {item.title}
                      </h3>
                      <svg
                        className="w-4 h-4 text-white group-hover:text-[#FECD2F] group-hover:translate-x-1 transition-all flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                    <p className="text-white/60 text-xs sm:text-[13px] leading-relaxed text-justify">
                      {item.description}
                    </p>
                    {idx < slide.degrees.items.length - 1 && (
                      <div className="border-t border-white/10 pt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
