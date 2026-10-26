'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Bell,
  GraduationCap,
  Briefcase,
  LogOut,
  ImageIcon,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';

type SiteImage = {
  id: string;
  key: string;
  label: string;
  category: string;
  url: string;
  updatedAt: string;
};

const CATEGORIES = ['All', 'Hero', 'About', 'Principal', 'Facilities', 'Departments', 'Admission', 'General', 'Footer', 'Branding'];

export default function AdminImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [uploading, setUploading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/images');
      const data = await res.json();
      setImages(data.images || []);
    } catch {
      showToast('error', 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpload = async (key: string, file: File) => {
    setUploading(key);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', key);
    try {
      const res = await fetch('/api/admin/images/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Image updated successfully!');
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('site-data-updated'));
          localStorage.setItem('site-data-updated', Date.now().toString());
        }
        fetchImages();
      } else {
        showToast('error', data.error || 'Upload failed');
      }
    } catch {
      showToast('error', 'Network error during upload');
    } finally {
      setUploading(null);
    }
  };

  const filtered = activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#E6F4EB] flex flex-col md:flex-row text-gray-800 antialiased">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold animate-in slide-in-from-right-5 duration-300 ${toast.type === 'success' ? 'bg-[#018837] text-white' : 'bg-red-500 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
          <button onClick={() => setToast(null)}><X className="w-4 h-4 opacity-70 hover:opacity-100" /></button>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-emerald-100/80 flex flex-col justify-between shrink-0 shadow-sm md:shadow-md">
        <div>
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="relative w-11 h-11 shrink-0 drop-shadow-sm">
              <Image src="/assets/college-emblem.png" alt="UAMC Emblem" fill priority sizes="44px" className="object-contain" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base leading-tight font-serif">UAMC Portal</div>
              <div className="text-[11px] font-medium text-[#018837] tracking-wider uppercase">Admin Console</div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            {[
              { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { href: '/admin/images', icon: ImageIcon, label: 'Manage Images', active: true },
              { href: '/admin/notices', icon: Bell, label: 'Manage Notices' },
              { href: '/admin/admissions', icon: GraduationCap, label: 'Manage Admissions' },
              { href: '/admin/jobs', icon: Briefcase, label: 'Jobs' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${item.active ? 'bg-[#018837] text-white shadow-sm font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70'}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="p-3 bg-emerald-50/60 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#018837] text-white font-bold flex items-center justify-center text-sm shadow-sm">A</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">Admin</div>
              <div className="text-xs text-gray-500 truncate">Administrator</div>
            </div>
          </div>
          <Link href="/admin/login" className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100/80 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-serif">Image Manager</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Upload and replace all website images from here</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchImages} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#018837] hover:bg-[#016F2C] rounded-lg transition-colors shadow-sm">
              <span>View Live Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-[#018837] text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-emerald-50 border border-emerald-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-emerald-100/70 animate-pulse">
                  <div className="h-44 bg-gray-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-9 bg-gray-100 rounded-xl mt-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ImageIcon className="w-14 h-14 text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium">No images in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((img) => (
                <div key={img.key} className="bg-white rounded-2xl overflow-hidden border border-emerald-100/70 shadow-sm hover:shadow-md transition-shadow group">
                  {/* Image Preview */}
                  <div className="relative h-44 bg-gray-50 overflow-hidden">
                    <Image
                      src={`${img.url}?v=${new Date(img.updatedAt).getTime()}`}
                      alt={img.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    {/* Category badge */}
                    <span className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {img.category}
                    </span>
                    {/* Uploading overlay */}
                    {uploading === img.key && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Info & Upload */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{img.label}</h3>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">{img.key}</p>

                    {/* Upload button */}
                    <input
                      ref={el => { fileRefs.current[img.key] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(img.key, file);
                        e.target.value = '';
                      }}
                    />
                    <button
                      onClick={() => fileRefs.current[img.key]?.click()}
                      disabled={uploading === img.key}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#018837] hover:bg-[#016F2C] disabled:opacity-60 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {uploading === img.key ? 'Uploading...' : 'Replace Image'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="px-8 py-4 bg-white/50 border-t border-emerald-100/80 text-center text-xs text-gray-500">
          System engineered by <span className="font-semibold text-gray-700">Mst. Sanzida</span>
        </footer>
      </main>
    </div>
  );
}
