 'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, ArrowLeft, CheckCircle2, Pencil, Plus, Trash2, X } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

type Notice = {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  isImportant: boolean;
  fileUrl: string | null;
};

const emptyForm = { title: '', category: 'General', date: '', content: '', isImportant: false, fileUrl: '' };

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadNotices = useCallback(async () => {
    const response = await fetch('/api/admin/notices', { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to load notices');
    setNotices(data.notices);
    setLoading(false);
  }, []);

  useEffect(() => { loadNotices().catch(() => setLoading(false)); }, [loadNotices]);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/admin/notices', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Save failed');
      setMessage(editingId ? 'Notice updated' : 'Notice published');
      resetForm();
      await loadNotices();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Save failed');
    } finally { setSaving(false); }
  };
  const edit = (notice: Notice) => {
    setEditingId(notice.id);
    setForm({ title: notice.title, category: notice.category, date: notice.date, content: notice.content, isImportant: notice.isImportant, fileUrl: notice.fileUrl || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const remove = async (id: string) => {
    if (!window.confirm('Delete this notice?')) return;
    const response = await fetch(`/api/admin/notices?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (response.ok) { setMessage('Notice deleted'); await loadNotices(); }
  };

  return (
    <div className="min-h-screen bg-[#E6F4EB] flex flex-col md:flex-row text-gray-800">
      <AdminSidebar active="notices" />
      <div className="flex-1 min-w-0">
      <header className="bg-white border-b border-emerald-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3"><Image src="/assets/college-emblem.png" alt="UAMC" width={44} height={44} /><div><h1 className="font-bold text-gray-900">Manage Notices</h1><p className="text-xs text-[#018837]">Publish updates to the public notice board</p></div></div>
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-semibold text-[#018837]"><ArrowLeft className="w-4 h-4" />Dashboard</Link>
      </header>
      <main className="max-w-6xl mx-auto p-5 sm:p-8 space-y-6">
        {message && <div className="flex items-center justify-between rounded-xl bg-white border border-emerald-100 px-4 py-3 text-sm"><span className="flex items-center gap-2 text-[#018837]"><CheckCircle2 className="w-4 h-4" />{message}</span><button onClick={() => setMessage(null)}><X className="w-4 h-4" /></button></div>}
        <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-xl font-bold">{editingId ? 'Edit notice' : 'Create a notice'}</h2>{editingId && <button type="button" onClick={resetForm} className="text-sm text-gray-500">Cancel edit</button>}</div>
          <div className="grid md:grid-cols-2 gap-4">
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Notice title" className="border rounded-lg px-3 py-2" />
            <input required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Date (e.g. Oct 27, 2026)" className="border rounded-lg px-3 py-2" />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border rounded-lg px-3 py-2"><option>General</option><option>Academic</option><option>Admission</option><option>Event</option><option>Job</option><option>Reports</option></select>
            <input value={form.fileUrl} onChange={e => setForm({ ...form, fileUrl: e.target.value })} placeholder="Optional PDF/link URL" className="border rounded-lg px-3 py-2" />
          </div>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Notice details" rows={4} className="w-full border rounded-lg px-3 py-2" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isImportant} onChange={e => setForm({ ...form, isImportant: e.target.checked })} /> Mark as important</label>
          <button disabled={saving} className="inline-flex items-center gap-2 bg-[#018837] text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-60">{editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{saving ? 'Saving...' : editingId ? 'Update notice' : 'Publish notice'}</button>
        </form>
        <section className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden"><div className="px-5 py-4 border-b font-bold">Published notices</div>{loading ? <p className="p-5 text-gray-500">Loading...</p> : notices.length === 0 ? <p className="p-5 text-gray-500">No notices yet.</p> : <div className="divide-y">{notices.map(notice => <div key={notice.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><div className="flex items-center gap-2"><span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-[#018837]">{notice.category}</span>{notice.isImportant && <span className="text-xs text-amber-600">Important</span>}</div><h3 className="font-semibold mt-2">{notice.title}</h3><p className="text-xs text-gray-500 mt-1">{notice.date}</p></div><div className="flex gap-2"><button onClick={() => edit(notice)} className="p-2 rounded-lg bg-emerald-50 text-[#018837]" aria-label="Edit notice"><Pencil className="w-4 h-4" /></button><button onClick={() => remove(notice.id)} className="p-2 rounded-lg bg-red-50 text-red-600" aria-label="Delete notice"><Trash2 className="w-4 h-4" /></button></div></div>)}</div>}</section>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">System engineered by <span className="font-semibold text-gray-700">Mst. Sanzida</span></footer>
      </div>
    </div>
  );
}
