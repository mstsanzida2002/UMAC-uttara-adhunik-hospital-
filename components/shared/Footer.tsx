"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent, useSiteImages } from "@/hooks/useSiteContent";

export default function Footer() {
  const { img } = useSiteImages();
  const { c } = useSiteContent();
  return (
    <footer className="bg-black text-white overflow-hidden font-sans">
      {/* =========================================================================
          Top Section: Newsletter (Figma Node 24:3631)
          - Background: #000000 (Black)
          - Heading: "Subscribe To Newsletter" (Inter 30.94px / font-normal / leading-[36px])
          - Input: border-[#018837] px-[21px] py-[18px] h-[53px]
          - Submit Button: bg-white text-[#110C2D] h-[53px] with diagonal arrow (↗)
            and hover:bg-[#890C25] hover:text-white (Figma dark pink/red)
      ========================================================================= */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h3 className="font-sans text-2xl sm:text-[31px] font-normal text-white tracking-tight leading-[36px]">
              Subscribe To Newsletter
            </h3>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-xl lg:max-w-none"
          >
            <div className="relative w-full sm:w-[280px] lg:w-[320px]">
              <input
                type="email"
                placeholder="Enter Your mail "
                className="w-full h-[53px] px-[21px] rounded-lg bg-transparent border border-[#018837] text-white placeholder-white/60 text-sm focus:outline-none focus:border-[#890C25] transition"
                required
              />
            </div>
            <button
              type="submit"
              className="h-[53px] inline-flex items-center justify-center gap-2 px-8 rounded-lg bg-white text-[#110C2D] font-medium text-base hover:bg-[#890C25] hover:text-white transition-colors duration-200 shadow-md flex-shrink-0 cursor-pointer"
            >
              <span>Submit Button</span>
              {/* Top-Right Diagonal Arrow (↗) as strictly required by Figma Node 24:3638 Component 2 */}
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Horizontal Divider (Node 24:3639) */}
      <div className="w-full border-t border-white/10" />

      {/* =========================================================================
          Main 4-Column Directory (Figma Node 24:3640)
      ========================================================================= */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white p-1 border-2 border-[#018837]">
                <Image
                  src={img("logo", "/images/uamc-logo-round.png")}
                  alt="UAMC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bitter font-bold text-lg sm:text-xl text-white group-hover:text-[#890C25] transition-colors leading-snug">
                Uttara Adhunik<br />Medical College (UAMC)
              </span>
            </Link>

            <p className="mt-5 text-[15px] text-[#737477] leading-relaxed max-w-sm font-sans">
              We are passionate education dedicated to providing high-quality resources learners all backgrounds.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[#737477] font-sans">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#018837] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{c("college.address", "House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town, Dhaka-1230")}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#018837] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{c("college.phone", "+880 1700-220000")} / {c("college.email", "info@uamc.com")}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Our Campus (Figma Node 24:3646 & 24:3647) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-[20px] font-medium text-white mb-8 tracking-wide underline underline-offset-[10px] decoration-1 decoration-white/40">
              Our Campus
            </h4>
            <ul className="space-y-0">
              {["Academic", "Athletics", "Campus life", "Research", "Academic Area"].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href="/about"
                    className="text-[#737477] hover:text-[#890C25] transition-colors duration-200 block text-base font-normal leading-[25px] py-2"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Pages (Figma Node 24:3653 & 24:3654) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-[20px] font-medium text-white mb-8 tracking-wide underline underline-offset-[10px] decoration-1 decoration-white/40">
              Our Pages
            </h4>
            <ul className="space-y-0">
              {[
                { name: "About", href: "/about" },
                { name: "Tution Fee", href: "/admissions" },
                { name: "Alumni", href: "/about" },
                { name: "Faculty Staff", href: "/departments" },
                { name: "Event", href: "/notice" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-[#737477] hover:text-[#890C25] transition-colors duration-200 block text-base font-normal leading-[25px] py-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Recent Posts (Figma Node 24:3660) */}
          <div className="lg:col-span-4">
            <h4 className="font-sans text-[20px] font-medium text-white mb-8 tracking-wide underline underline-offset-[10px] decoration-1 decoration-white/40">
              Recent Posts
            </h4>
            <div className="space-y-5">

              {/* Post 1 */}
              <Link href="/notice" className="flex items-start gap-4 group">
                <div className="relative w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/10">
                  <Image
                    src={img("footer-post-1", "/images/footer-post-1.webp")}
                    alt="Medical News"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-200"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-[#737477]">
                    <svg className="w-3.5 h-3.5 text-[#018837] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>August 6, 2024</span>
                  </div>
                  <h5 className="mt-1.5 text-base font-normal text-white group-hover:text-[#890C25] transition-colors line-clamp-2 leading-snug">
                    Those inequalities are inequalities that...
                  </h5>
                </div>
              </Link>

              {/* Post 2 */}
              <Link href="/notice" className="flex items-start gap-4 group">
                <div className="relative w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/10">
                  <Image
                    src={img("footer-post-2", "/images/footer-post-2.webp")}
                    alt="Cardiovascular Care"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-200"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-[#737477]">
                    <svg className="w-3.5 h-3.5 text-[#018837] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>July 4, 2024</span>
                  </div>
                  <h5 className="mt-1.5 text-base font-normal text-white group-hover:text-[#890C25] transition-colors line-clamp-2 leading-snug">
                    After Decades Of Improvement, Cardiovascular...
                  </h5>
                </div>
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          Bottom Copyright Bar (Figma Node 24:3669)
          - Exactly: "Copyright © 2026. All Rights Reserved by SAKIN BIN JABED"
          - Perfectly centered horizontally with flex justify-center text-center w-full
      ========================================================================= */}
      <div className="border-t border-white/10 w-full flex justify-center text-center">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-center text-center w-full">
          <p className="text-xs sm:text-sm text-white/70 text-center">
            Copyright © 2026. All Rights Reserved by <span className="text-white font-medium"> Mst. Sanzida</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
