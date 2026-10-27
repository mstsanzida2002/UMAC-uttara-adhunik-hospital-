'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, GraduationCap, Pencil, Plus, Trash2, X } from 'lucide-react';

type AdmissionInfo = {
  id: string;
  title: string;
  slug: string;
  content: string;
  downloadUrl: string | null;
};

const emptyForm = { title: '', slug: 'procedure', content: '', downloadUrl: '' };
const sections = [
  ['procedure', 'Admission Procedure & Fees'],
  ['papers', 'Admission Papers'],
  ['form', 'Application Form'],
  ['results', 'Admission Results'],
  ['registration', 'Online Registration'],
];

export default function AdminAdmissionsPage() {
  const [items, setItems] = useState<AdmissionInfo[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    const response = await fetch('/api/admin/admissions', { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to load admissions');
    setItems(data.items);
    setLoading(false);
  }, []);

  useEffect(() => { loadItems().catch(() => setLoading(false)); }, [loadItems]);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/admin/admissions', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Save failed');
      setMessage(editingId ? 'Admission information updated' : 'Admission information published');
      resetForm();
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };
  const edit = (item: AdmissionInfo) => {
    setEditingId(item.id);
    setForm({ title: item.title, slug: item.slug, content: item.content, downloadUrl: item.downloadUrl || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const remove = async (id: string) => {
    if (!window.confirm('Delete this admission information?')) return;
    const response = await fetch(`/api/admin/admissions?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (response.ok) { setMessage('Admission information deleted'); await loadItems(); }
  };

  return (
    <div className="min-h-screen bg-[#E6F4EB] text-gray-800">
      <header className="bg-white border-b border-emerald-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/assets/college-emblem.png" alt="UAMC" width={44} height={44} />
          <div><h1 className="font-bold text-gray-900">Manage Admissions</h1><p className="text-xs text-[#018837]">Publish admission information to the client site</p></div>
        </div>
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-semibold text-[#018837]"><ArrowLeft className="w-4 h-4" />Dashboard</Link>
      </header>
      <main className="max-w-6xl mx-auto p-5 sm:p-8 space-y-6">
        {message && <div className="flex items-center justify-between rounded-xl bg-white border border-emerald-100 px-4 py-3 text-sm"><span className="flex items-center gap-2 text-[#018837]"><CheckCircle2 className="w-4 h-4" />{message}</span><button onClick={() => setMessage(null)}><X className="w-4 h-4" /></button></div>}
        <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-xl font-bold">{editingId ? 'Edit admission information' : 'Add admission information'}</h2>{editingId && <button type="button" onClick={resetForm} className="text-sm text-gray-500">Cancel edit</button>}</div>
          <div className="grid md:grid-cols-2 gap-4">
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border rounded-lg px-3 py-2" />
            <select value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="border rounded-lg px-3 py-2">{sections.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          </div>
          <textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Information shown to clients" rows={6} className="w-full border rounded-lg px-3 py-2" />
          <input type="url" value={form.downloadUrl} onChange={e => setForm({ ...form, downloadUrl: e.target.value })} placeholder="Optional document or application URL" className="w-full border rounded-lg px-3 py-2" />
          <button disabled={saving} className="inline-flex items-center gap-2 bg-[#018837] text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-60">{editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{saving ? 'Saving...' : editingId ? 'Update information' : 'Publish information'}</button>
        </form>
        <section className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b font-bold">Published admission information</div>
          {loading ? <p className="p-5 text-gray-500">Loading...</p> : items.length === 0 ? <p className="p-5 text-gray-500">No admission information yet.</p> : <div className="divide-y">{items.map(item => <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-[#018837]">{sections.find(([value]) => value === item.slug)?.[1] || item.slug}</span><h3 className="font-semibold mt-2">{item.title}</h3><p className="text-sm text-gray-500 mt-1 line-clamp-2 whitespace-pre-wrap">{item.content}</p></div><div className="flex gap-2 shrink-0"><button onClick={() => edit(item)} className="p-2 rounded-lg bg-emerald-50 text-[#018837]" aria-label="Edit admission information"><Pencil className="w-4 h-4" /></button><button onClick={() => remove(item.id)} className="p-2 rounded-lg bg-red-50 text-red-600" aria-label="Delete admission information"><Trash2 className="w-4 h-4" /></button></div></div>)}</div>}
        </section>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">System engineered by <span className="font-semibold text-gray-700">Mst. Sanzida</span></footer>
    </div>
  );
}
