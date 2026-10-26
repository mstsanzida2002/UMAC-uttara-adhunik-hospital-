'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, Bell, GraduationCap, Briefcase, LogOut,
  ImageIcon, FileText, Save, CheckCircle2, AlertCircle,
  X, RefreshCw, ArrowUpRight, ChevronDown, ChevronUp,
} from 'lucide-react';

type ContentItem = {
  id: string;
  key: string;
  label: string;
  value: string;
  section: string;
  type: string;
  updatedAt: string;
};

type SectionGroup = { [section: string]: ContentItem[] };

// Only these keys from "text" type will be shown (contact/info fields)
const IMPORTANT_TEXT_KEYS = new Set([
  'college.phone',
  'college.email',
  'college.address',
  'college.location',
  'college.established',
  'college.affiliation',
  'college.recognition',
  'college.total_beds',
  'college.total_departments',
  'metrics.stat1.value',
  'metrics.stat1.label',
  'metrics.stat2.value',
  'metrics.stat2.label',
  'metrics.stat3.value',
  'metrics.stat3.label',
  'finddept.dept_count',
  'finddept.featured_dept',
  'finddept.popular_tag1',
  'finddept.popular_tag2',
  'finddept.popular_tag3',
  'about.principal_name',
  'about.principal_title',
  'about.principal_heading',
]);

// Filter: only textarea fields OR important contact/info text fields
function isImportant(item: ContentItem) {
  return item.type === 'textarea' || IMPORTANT_TEXT_KEYS.has(item.key);
}

const SECTION_ICONS: Record<string, string> = {
  College: '🏫',
  About: '📖',
  Metrics: '📊',
  Hero: '🖼️',
  Facilities: '🏥',
  FindDept: '🔍',
  Admission: '🎓',
};

export default function AdminContentPage() {
  const [grouped, setGrouped] = useState<SectionGroup>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [dirty, setDirty] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      const all: ContentItem[] = (data.items || []).filter(isImportant);

      const groups: SectionGroup = {};
      for (const item of all) {
        if (!groups[item.section]) groups[item.section] = [];
        groups[item.section].push(item);
      }
      // Remove empty sections (e.g. Hero has no textarea/important fields left)
      const nonEmpty: SectionGroup = {};
      for (const [sec, items] of Object.entries(groups)) {
        if (items.length > 0) nonEmpty[sec] = items;
      }
      setGrouped(nonEmpty);

      const exp: Record<string, boolean> = {};
      for (const sec of Object.keys(nonEmpty)) exp[sec] = true;
      setExpanded(exp);
    } catch {
      showToast('error', 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (key: string, value: string) => {
    setDirty(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    const value = dirty[key];
    if (value === undefined) return;
    setSaving(key);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Saved!');
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('site-data-updated'));
          localStorage.setItem('site-data-updated', Date.now().toString());
        }
        setDirty(prev => { const n = { ...prev }; delete n[key]; return n; });
        setGrouped(prev => {
          const ng = { ...prev };
          for (const sec of Object.keys(ng)) {
            ng[sec] = ng[sec].map(it => it.key === key ? { ...it, value } : it);
          }
          return ng;
        });
      } else {
        showToast('error', data.error || 'Save failed');
      }
    } catch {
      showToast('error', 'Network error');
    } finally {
      setSaving(null);
    }
  };

  const handleSaveAll = async (section: string) => {
    const toSave = (grouped[section] || []).filter(it => dirty[it.key] !== undefined);
    if (!toSave.length) { showToast('success', 'Nothing changed'); return; }
    for (const item of toSave) await handleSave(item.key);
  };

  const getValue = (item: ContentItem) =>
    dirty[item.key] !== undefined ? dirty[item.key] : item.value;

  const hasDirty = (section: string) =>
    (grouped[section] || []).some(it => dirty[it.key] !== undefined);

  const totalDirty = Object.keys(dirty).length;

  return (
    <div className="min-h-screen bg-[#E6F4EB] flex flex-col md:flex-row text-gray-800 antialiased">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold ${toast.type === 'success' ? 'bg-[#018837] text-white' : 'bg-red-500 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
          <button onClick={() => setToast(null)}><X className="w-4 h-4 opacity-70" /></button>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-emerald-100/80 flex flex-col justify-between shrink-0 shadow-sm md:shadow-md">
        <div>
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="relative w-11 h-11 shrink-0">
              <Image src="/assets/college-emblem.png" alt="UAMC" fill priority sizes="44px" className="object-contain" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base leading-tight font-serif">UAMC Portal</div>
              <div className="text-[11px] font-medium text-[#018837] tracking-wider uppercase">Admin Console</div>
            </div>
          </div>
          <nav className="p-4 space-y-1.5">
            {[
              { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { href: '/admin/content', icon: FileText, label: 'Site Content', active: true },
              { href: '/admin/images', icon: ImageIcon, label: 'Manage Images' },
              { href: '/admin/notices', icon: Bell, label: 'Manage Notices' },
              { href: '/admin/admissions', icon: GraduationCap, label: 'Manage Admissions' },
              { href: '/admin/jobs', icon: Briefcase, label: 'Jobs' },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${item.active ? 'bg-[#018837] text-white shadow-sm font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-emerald-50/70'}`}>
                <item.icon className="w-4 h-4" /><span>{item.label}</span>
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
            <LogOut className="w-3.5 h-3.5" /><span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100/80 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-serif">Site Content</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Edit descriptions, paragraphs, contact details & statistics</p>
          </div>
          <div className="flex items-center gap-3">
            {totalDirty > 0 && (
              <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                {totalDirty} unsaved change{totalDirty > 1 ? 's' : ''}
              </span>
            )}
            <button onClick={fetchContent} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /><span>Refresh</span>
            </button>
            <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#018837] hover:bg-[#016F2C] rounded-lg transition-colors shadow-sm">
              <span>View Site</span><ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-4 flex-1">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-emerald-100/70 animate-pulse space-y-3">
                  <div className="h-5 w-32 bg-gray-100 rounded" />
                  <div className="h-24 bg-gray-100 rounded-xl" />
                  <div className="h-24 bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            Object.entries(grouped).map(([section, sectionItems]) => {
              const isOpen = expanded[section] ?? true;
              const dirty_section = hasDirty(section);

              return (
                <div key={section} className="bg-white rounded-2xl border border-emerald-100/70 shadow-sm overflow-hidden">

                  {/* Section header */}
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [section]: !prev[section] }))}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-emerald-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{SECTION_ICONS[section] || '📝'}</span>
                      <div className="text-left">
                        <h2 className="font-bold text-gray-900">{section}</h2>
                        <p className="text-xs text-gray-400">{sectionItems.length} editable field{sectionItems.length !== 1 ? 's' : ''}</p>
                      </div>
                      {dirty_section && (
                        <span className="ml-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Unsaved</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {dirty_section && (
                        <button
                          onClick={e => { e.stopPropagation(); handleSaveAll(section); }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#018837] text-white text-xs font-semibold rounded-lg hover:bg-[#016F2C] transition-colors shadow-sm"
                        >
                          <Save className="w-3.5 h-3.5" />Save All
                        </button>
                      )}
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </button>

                  {/* Fields */}
                  {isOpen && (
                    <div className="border-t border-emerald-50 divide-y divide-emerald-50/70">
                      {sectionItems.map(item => {
                        const currentVal = getValue(item);
                        const isDirtyField = dirty[item.key] !== undefined;
                        const isSavingThis = saving === item.key;

                        return (
                          <div key={item.key} className={`px-6 py-5 ${isDirtyField ? 'bg-amber-50/30' : ''}`}>
                            <div className="flex items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  {item.label}
                                  {isDirtyField && <span className="ml-2 text-[11px] text-amber-500 font-medium">● unsaved</span>}
                                </label>

                                {item.type === 'textarea' ? (
                                  <textarea
                                    rows={4}
                                    value={currentVal}
                                    onChange={e => handleChange(item.key, e.target.value)}
                                    className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#018837] focus:ring-2 focus:ring-[#018837]/15 resize-y transition-all bg-gray-50/50 focus:bg-white"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={currentVal}
                                    onChange={e => handleChange(item.key, e.target.value)}
                                    className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#018837] focus:ring-2 focus:ring-[#018837]/15 transition-all bg-gray-50/50 focus:bg-white"
                                  />
                                )}
                              </div>

                              {isDirtyField && (
                                <button
                                  onClick={() => handleSave(item.key)}
                                  disabled={isSavingThis}
                                  className="mt-7 flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-[#018837] hover:bg-[#016F2C] disabled:opacity-60 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  {isSavingThis ? 'Saving…' : 'Save'}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <footer className="px-8 py-4 bg-white/50 border-t border-emerald-100/80 text-center text-xs text-gray-500">
          System engineered by <span className="font-semibold text-gray-700"> Mst. Sanzida</span>
        </footer>
      </main>
    </div>
  );
}
