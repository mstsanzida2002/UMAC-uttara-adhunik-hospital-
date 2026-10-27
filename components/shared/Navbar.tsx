"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSiteImages } from "@/hooks/useSiteContent";

interface SubOption {
  title: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  subOptions?: SubOption[];
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About UAMC",
    href: "/about",
    subOptions: [
      { title: "Overview", href: "/about" },
      { title: "History of UAMC", href: "/about?tab=history" },
      { title: "Vision & Mission", href: "/about?tab=vision" },
      { title: "Aim & Objective", href: "/about?tab=aim" },
      { title: "Organizational Structure", href: "/about?tab=structure" },
      { title: "Founder Members", href: "/about?tab=founders" },
      { title: "EC Members", href: "/about?tab=ec" },
      { title: "GB Members", href: "/about?tab=gb" },
    ],
  },
  {
    name: "FACILITIES",
    href: "/facilities",
    subOptions: [
      { title: "Hospital Service", href: "/facilities?tab=hospital-service" },
      { title: "Departments", href: "/facilities?tab=departments" },
      { title: "Library", href: "/facilities?tab=library" },
      { title: "Medical Education Unit", href: "/facilities?tab=meu" },
      { title: "Training", href: "/facilities?tab=training" },
      { title: "Publications", href: "/facilities?tab=publications" },
      { title: "Seminar", href: "/facilities?tab=seminar" },
      { title: "Hostel", href: "/facilities?tab=hostel" },
      { title: "Laboratory", href: "/facilities?tab=laboratory" },
      { title: "Cafeteria", href: "/facilities?tab=cafeteria" },
    ],
  },
  {
    name: "ADMISSION",
    href: "/admissions",
    subOptions: [
      { title: "Admission Procedure & Fees", href: "/admissions#fees" },
      { title: "Admission Papers", href: "/admissions#papers" },
      { title: "Application Form", href: "/admissions#form" },
      { title: "Admission Results", href: "/admissions#results" },
      { title: "Online Registration", href: "/admissions#registration" },
    ],
  },
  {
    name: "NOTICE & Media",
    href: "/notice",
  },
  {
    name: "CAREER",
    href: "/career",
  },
];

export default function Navbar() {
  const { img } = useSiteImages();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* 1. TOP UTILITY BAR */}
      <div className="w-full bg-[#F7F9F8] border-b border-neutral-200 text-[#444444] text-[12px] font-medium hidden md:block">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            {/* Contact & Location Info */}
            <div className="hidden">
              <div className="flex items-center gap-1.5 hover:text-[#018837] transition cursor-pointer">
                <svg className="w-3.5 h-3.5 text-[#018837]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>House - 34, Road - 4, Sector - 9, Sonargaon Janapath, Uttara Model Town</span>
              </div>

              <div className="flex items-center gap-1.5 hover:text-[#018837] transition cursor-pointer">
                <svg className="w-3.5 h-3.5 text-[#018837]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@uamc.com">info@uamc.com</a>
              </div>

              <div className="flex items-center gap-1.5 hover:text-[#018837] transition cursor-pointer">
                <svg className="w-3.5 h-3.5 text-[#018837]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+8801700220000">+880 1700-220000</a>
              </div>
            </div>

            {/* Portal Quick Links: Strict plain text links, zero border/outline */}
            <div className="mr-auto flex items-center gap-5">
              <Link href="/admin/login" className="text-neutral-600 hover:text-[#018837] transition font-medium no-underline border-none outline-none focus:outline-none">
                Student Portal
              </Link>
              <Link href="/admin/login" className="text-neutral-600 hover:text-[#018837] transition font-medium no-underline border-none outline-none focus:outline-none">
                Teachers Portal
              </Link>
              <Link href="/about" className="text-neutral-600 hover:text-[#018837] transition font-medium no-underline border-none outline-none focus:outline-none">
                Alumni
              </Link>
              <Link href="/notice" className="text-neutral-600 hover:text-[#018837] transition font-medium no-underline border-none outline-none focus:outline-none">
                Events
              </Link>
              <span className="text-neutral-300">|</span>
              <Link href="/contact" className="text-neutral-600 hover:text-[#018837] transition font-medium no-underline border-none outline-none focus:outline-none">
                Contact Us
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {[
                { label: "Facebook", text: "f", href: "https://facebook.com" },
                { label: "LinkedIn", text: "in", href: "https://linkedin.com" },
                { label: "Twitter", text: "x", href: "https://twitter.com" },
                { label: "YouTube", text: "▶", href: "https://youtube.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-200 px-1.5 text-[10px] font-bold text-neutral-700 transition hover:bg-[#018837] hover:text-white"
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR: Completely separated */}
      <div className="w-full bg-white border-b border-neutral-200">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 rounded-b-2xl bg-white flex-nowrap">
            
            {/* LEFT GROUP: Logo + Divider | + Social Icons (Strict Figma Dev Mode extraction) */}
            <div className="flex items-center gap-4 xl:gap-5 flex-shrink-0 flex-nowrap">
              {/* Brand Logo & Title */}
              <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0 flex-nowrap">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={img("logo", "/images/logo.png")}
                    alt="Uttara Adhunik Medical College Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="flex-shrink-0 whitespace-nowrap">
                  <span className="block text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#018837] transition leading-tight tracking-tight font-sans whitespace-nowrap">
                    Uttara Adhunik Medical College
                  </span>
                  <span className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider font-sans whitespace-nowrap">
                    Dhaka, Bangladesh • UAMC
                  </span>
                </div>
              </Link>

              {/* Vertical Divider Line after UAMC Logo */}
              <div className="hidden" />

              {/* Social links are shown in the utility bar. */}
              <div className="hidden">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-[#018837] hover:text-white transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-[#018837] hover:text-white transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-[#018837] hover:text-white transition"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-[#018837] hover:text-white transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT GROUP: Main Navigation Links Aligned to RIGHT (Frame 29 / Component 25) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto h-full flex-nowrap flex-shrink-0">
              <nav className="flex items-center gap-1 xl:gap-2 h-full flex-nowrap">
                {NAV_ITEMS.map((item) => {
                  const hasDropdown = Boolean(item.subOptions && item.subOptions.length > 0);
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href)) ||
                    (item.subOptions && item.subOptions.some((sub) => pathname === sub.href));
                  const isDropdownOpen = activeDropdown === item.name;

                  return (
                    <div
                      key={item.name}
                      className="relative group h-full flex items-center flex-shrink-0"
                      onMouseEnter={() => hasDropdown && handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Nav Link with exact border-b-2 green underline strictly sitting under the text */}
                      <Link
                        href={item.href}
                        className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 border-b-2 transition-all text-[14px] xl:text-[15px] font-medium font-sans whitespace-nowrap flex-shrink-0 ${
                          isActive
                            ? "border-[#018837] text-[#018837] font-semibold"
                            : isDropdownOpen
                            ? "border-[#018837] text-[#018837]"
                            : "border-transparent text-neutral-900 hover:border-[#018837] hover:text-[#018837]"
                        }`}
                      >
                        <span className="whitespace-nowrap">{item.name}</span>
                        {hasDropdown && (
                          <svg
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isDropdownOpen ? "rotate-180 text-[#018837]" : "text-neutral-500 group-hover:text-[#018837]"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </Link>

                    {/* Dropdown Menu Overlay:
                        - Width: 300px (Figma Node 7:1065 / 7:1051 width: 300)
                        - Background: rgba(30, 30, 30, 0.70) (Figma Node 13:1237 fills opacity: 0.7, rgb(30,30,30))
                        - Border: 0.5px solid rgba(255, 255, 255, 0.2) (Figma Node 13:1237 strokeWeight: 0.5, white)
                        - Border-radius: 0px / rounded-none (Sharp corners, NOT rounded)
                        - Item hover: background: #FECD2F, text: #000000 (Figma Node 13:1238)
                        - Arrow: Top-right diagonal arrow (↗) turning black on hover
                    */}
                    {hasDropdown && (
                      <div
                        className={`absolute top-full right-0 lg:left-0 w-[300px] z-50 transition-all duration-150 ${
                          isDropdownOpen
                            ? "opacity-100 visible pointer-events-auto translate-y-0"
                            : "opacity-0 invisible pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                        }`}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Container: sharp, dark translucent background with white/20 border */}
                        <div className="bg-[#1E1E1E]/80 backdrop-blur-md rounded-none shadow-2xl border border-white/20 overflow-hidden">
                          <div className="flex flex-col">
                            {item.subOptions!.map((sub, idx) => (
                              <Link
                                key={idx}
                                href={sub.href}
                                className="group/item flex items-center justify-between px-[16px] py-[15px] h-[54px] rounded-none transition-all duration-150 bg-transparent text-white hover:bg-[#FECD2F] hover:text-black border-b border-white/20 last:border-b-0 font-sans"
                              >
                                <span className="text-[15px] font-medium tracking-tight">
                                  {sub.title}
                                </span>
                                {/* Exact top-right diagonal arrow (↗) */}
                                <svg
                                  className="w-4 h-4 text-white/70 group-hover/item:text-black group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all flex-shrink-0 ml-2"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="h-6 w-[1px] bg-neutral-300 mx-1" />

            {/* Interactive Search Icon (Frame 30) */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="w-9 h-9 rounded-full bg-[#E8E8F4]/80 flex items-center justify-center text-neutral-700 hover:bg-[#018837] hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              {/* Search Dropdown Overlay */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 bg-white rounded-none p-3 shadow-2xl border border-neutral-200 z-50">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        window.location.href = `/facilities?tab=departments`;
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search website..."
                      className="w-full px-3 py-2 text-sm bg-neutral-100 rounded-none focus:outline-none focus:ring-2 focus:ring-[#018837]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#018837] text-white text-xs font-semibold rounded-none hover:bg-[#016f2c] transition"
                    >
                      Go
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-[#018837] hover:bg-neutral-100 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>
      </div>

      {/* Mobile Menu Drawer with Accordion Sub-options */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl max-h-[80vh] overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.subOptions && item.subOptions.length > 0);
            const isExpanded = mobileExpandedItem === item.name;

            return (
              <div key={item.name} className="border-b border-neutral-100 last:border-b-0">
                <div className="flex items-center justify-between py-2">
                  <Link
                    href={item.href}
                    onClick={() => !hasDropdown && setMobileMenuOpen(false)}
                    className="text-base font-semibold text-neutral-800 hover:text-[#018837] transition font-sans"
                  >
                    {item.name}
                  </Link>

                  {hasDropdown && (
                    <button
                      onClick={() => setMobileExpandedItem(isExpanded ? null : item.name)}
                      className="p-2 text-neutral-500 hover:text-[#018837]"
                      aria-label={`Expand ${item.name}`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#018837]" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sub-options for Mobile */}
                {hasDropdown && isExpanded && (
                  <div className="pl-3 pb-3 space-y-1">
                    {item.subOptions!.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-3 rounded-none text-sm font-medium text-neutral-600 hover:text-black hover:bg-[#FECD2F] transition border-b border-neutral-100 last:border-b-0 font-sans"
                      >
                        <span>{sub.title}</span>
                        <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick utility portals on mobile */}
          <div className="border-t border-neutral-200 pt-4 flex flex-col space-y-2 text-xs font-semibold text-neutral-600 font-sans">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#018837]"
            >
              🎓 Student Portal
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#018837]"
            >
              👨‍🏫 Teachers Portal
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#018837]"
            >
              📞 Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
