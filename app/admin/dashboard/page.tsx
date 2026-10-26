import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Bell,
  GraduationCap,
  Briefcase,
  LogOut,
  Users,
  CheckCircle2,
  FileText,
  Clock,
  ArrowUpRight,
  ImageIcon,
  PenLine,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const summaryCards = [
    {
      title: 'Active Notices',
      value: '12',
      change: '+2 this week',
      icon: Bell,
      color: 'text-[#018837]',
      bg: 'bg-emerald-50',
      badge: 'Updated Today',
    },
    {
      title: 'Pending Admissions',
      value: '5',
      change: 'New submissions',
      icon: GraduationCap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      badge: 'Action Required',
    },
    {
      title: 'Job Applications',
      value: '8',
      change: 'Faculty & Staff',
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      badge: '3 Positions',
    },
    {
      title: 'System Status',
      value: 'Operational',
      change: '100% Uptime',
      icon: CheckCircle2,
      color: 'text-[#018837]',
      bg: 'bg-emerald-50',
      badge: 'All Systems Normal',
    },
  ];

  const quickLinks = [
    {
      title: 'Edit Site Content',
      desc: 'Update About, Hero, Metrics, Facilities & College info',
      href: '/admin/content',
      icon: PenLine,
    },
    {
      title: 'Manage Images',
      desc: 'Upload and replace website images from the backend',
      href: '/admin/images',
      icon: ImageIcon,
    },
    {
      title: 'Publish New Notice',
      desc: 'Add circulars, exam schedules, or alerts',
      href: '/admin/notices',
      icon: Bell,
    },
    {
      title: 'Review Admission Forms',
      desc: 'Process incoming MBBS candidate files',
      href: '/admin/admissions',
      icon: GraduationCap,
    },
    {
      title: 'Post Job Opening',
      desc: 'Create faculty or administrative listings',
      href: '/admin/jobs',
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-[#E6F4EB] flex flex-col md:flex-row text-gray-800 antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-emerald-100/80 flex flex-col justify-between shrink-0 shadow-sm md:shadow-md">
        <div>
          {/* Brand Logo & Name */}
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="relative w-11 h-11 shrink-0 drop-shadow-sm">
              <Image
                src="/assets/college-emblem.png"
                alt="UAMC Emblem"
                fill
                priority
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base leading-tight font-serif">
                UAMC Portal
              </div>
              <div className="text-[11px] font-medium text-[#018837] tracking-wider uppercase">
                Admin Console
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm bg-[#018837] text-white shadow-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/content"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70 transition-all"
            >
              <PenLine className="w-4 h-4 text-gray-400" />
              <span>Site Content</span>
            </Link>

            <Link
              href="/admin/images"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70 transition-all"
            >
              <ImageIcon className="w-4 h-4 text-gray-400" />
              <span>Manage Images</span>
            </Link>

            <Link
              href="/admin/notices"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70 transition-all"
            >
              <Bell className="w-4 h-4 text-gray-400 group-hover:text-[#018837]" />
              <span>Manage Notices</span>
            </Link>

            <Link
              href="/admin/admissions"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span>Manage Admissions</span>
            </Link>

            <Link
              href="/admin/jobs"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70 transition-all"
            >
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>Jobs</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer / Sign Out */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="p-3 bg-emerald-50/60 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#018837] text-white font-bold flex items-center justify-center text-sm shadow-sm">
              S
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">
                Sakin
              </div>
              <div className="text-xs text-gray-500 truncate">
                sakin5140@gmail.com
              </div>
            </div>
          </div>

          <Link
            href="/admin/login"
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100/80 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-serif">
              Welcome, Sakin
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Uttara Adhunik Medical College Management Panel
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span>View Live Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </Link>

            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#018837] hover:bg-[#016F2C] rounded-lg transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Summary Cards Grid */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Overview Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {summaryCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-emerald-100/70 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {card.title}
                        </p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
                          {card.value}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {card.change}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${card.bg}`}>
                        <IconComponent className={`w-6 h-6 ${card.color}`} />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#018837]">
                        {card.badge}
                      </span>
                      <span className="text-gray-400">Live</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Quick Management Shortcuts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {quickLinks.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group bg-white rounded-2xl p-5 border border-emerald-100/70 shadow-sm hover:shadow-md hover:border-[#018837]/40 transition-all flex items-start gap-4"
                  >
                    <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-[#018837] group-hover:text-white text-[#018837] transition-colors">
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#018837] transition-colors flex items-center gap-1.5">
                        {item.title}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* System Information Card */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100/70 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 flex items-center justify-center text-[#018837]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    UAMC Administration Hub
                  </h3>
                  <p className="text-xs text-gray-500">
                    Connected as Super Administrator &bull; Session active
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500 sm:text-right font-medium">
                Established 2007 &bull; Dhaka, Bangladesh
              </div>
            </div>
          </div>
        </div>

        {/* Global Admin Footer */}
        <footer className="px-8 py-4 bg-white/50 border-t border-emerald-100/80 text-center text-xs text-gray-500">
          System engineered by{' '}
          <span className="font-semibold text-gray-700">Sakin Bin Jabed with Mst. Sanzida</span>
        </footer>
      </main>
    </div>
  );
}
