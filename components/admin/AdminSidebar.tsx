'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bell, Briefcase, FileText, GraduationCap, ImageIcon, LayoutDashboard, LogOut } from 'lucide-react';

type AdminSection = 'dashboard' | 'content' | 'images' | 'notices' | 'admissions' | 'jobs';

const items = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
  { href: '/admin/content', icon: FileText, label: 'Site Content', section: 'content' },
  { href: '/admin/images', icon: ImageIcon, label: 'Manage Images', section: 'images' },
  { href: '/admin/notices', icon: Bell, label: 'Manage Notices', section: 'notices' },
  { href: '/admin/admissions', icon: GraduationCap, label: 'Manage Admissions', section: 'admissions' },
  { href: '/admin/jobs', icon: Briefcase, label: 'Jobs', section: 'jobs' },
] as const;

export default function AdminSidebar({ active }: { active: AdminSection }) {
  return (
    <aside className="w-full md:w-64 bg-white border-r border-emerald-100/80 flex flex-col justify-between shrink-0 shadow-sm md:shadow-md">
      <div>
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="relative w-11 h-11 shrink-0">
            <Image src="/assets/college-emblem.png" alt="UAMC Emblem" fill priority sizes="44px" className="object-contain" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-base leading-tight font-serif">UAMC Portal</div>
            <div className="text-[11px] font-medium text-[#018837] tracking-wider uppercase">Admin Console</div>
          </div>
        </div>
        <nav className="p-4 space-y-1.5" aria-label="Admin navigation">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                active === item.section
                  ? 'bg-[#018837] text-white shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-100 space-y-3">
        <div className="p-3 bg-emerald-50/60 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#018837] text-white font-bold flex items-center justify-center text-sm">A</div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-gray-900">Admin</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        </div>
        <Link href="/admin/login" className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
