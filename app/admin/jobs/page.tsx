'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Briefcase, CheckCircle2, Pencil, Plus, Trash2, X } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  deadline: string;
  requirements: string;
  isPublished: boolean;
};

const emptyForm = {
  title: '',
  department: '',
  type: 'Full-time',
  deadline: '',
  requirements: '',
  isPublished: true,
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadJobs = useCallback(async () => {
    const response = await fetch('/api/admin/jobs', { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to load job postings');
    setJobs(data.jobs);
    setLoading(false);
  }, []);

  useEffect(() => { loadJobs().catch(() => setLoading(false)); }, [loadJobs]);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/admin/jobs', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Save failed');
      setMessage(editingId ? 'Job posting updated' : 'Job posting published');
      resetForm();
      await loadJobs();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Save failed');
    } finally { setSaving(false); }
  };
  const edit = (job: Job) => {
    setEditingId(job.id);
    setForm({ title: job.title, department: job.department, type: job.type, deadline: job.deadline, requirements: job.requirements, isPublished: job.isPublished });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const remove = async (id: string) => {
    if (!window.confirm('Delete this job posting?')) return;
    const response = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (response.ok) { setMessage('Job posting deleted'); await loadJobs(); }
  };

  return (
    <div className="min-h-screen bg-[#E6F4EB] flex flex-col md:flex-row text-gray-800">
      <AdminSidebar active="jobs" />
      <div className="flex-1 min-w-0">
      <header className="bg-white border-b border-emerald-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3"><Image src="/assets/college-emblem.png" alt="UAMC" width={44} height={44} /><div><h1 className="font-bold text-gray-900">Manage Jobs</h1><p className="text-xs text-[#018837]">Publish career opportunities to the client site</p></div></div>
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-semibold text-[#018837]"><ArrowLeft className="w-4 h-4" />Dashboard</Link>
      </header>
      <main className="max-w-6xl mx-auto p-5 sm:p-8 space-y-6">
        {message && <div className="flex items-center justify-between rounded-xl bg-white border border-emerald-100 px-4 py-3 text-sm"><span className="flex items-center gap-2 text-[#018837]"><CheckCircle2 className="w-4 h-4" />{message}</span><button onClick={() => setMessage(null)}><X className="w-4 h-4" /></button></div>}
        <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-xl font-bold">{editingId ? 'Edit job posting' : 'Create a job posting'}</h2>{editingId && <button type="button" onClick={resetForm} className="text-sm text-gray-500">Cancel edit</button>}</div>
          <div className="grid md:grid-cols-2 gap-4">
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Job title" className="border rounded-lg px-3 py-2" />
            <input required value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} placeholder="Department" className="border rounded-lg px-3 py-2" />
            <input required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} placeholder="Employment type" className="border rounded-lg px-3 py-2" />
            <input required value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} placeholder="Application deadline" className="border rounded-lg px-3 py-2" />
          </div>
          <textarea required value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} placeholder="Requirements (one per line)" rows={5} className="w-full border rounded-lg px-3 py-2" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} /> Publish on the client Career page</label>
          <button disabled={saving} className="inline-flex items-center gap-2 bg-[#018837] text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-60">{editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{saving ? 'Saving...' : editingId ? 'Update job' : 'Publish job'}</button>
        </form>
        <section className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden"><div className="px-5 py-4 border-b font-bold">Job postings</div>{loading ? <p className="p-5 text-gray-500">Loading...</p> : jobs.length === 0 ? <p className="p-5 text-gray-500">No job postings yet.</p> : <div className="divide-y">{jobs.map(job => <div key={job.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><div className="flex items-center gap-2"><span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-[#018837]">{job.type}</span><span className={`text-xs ${job.isPublished ? 'text-emerald-600' : 'text-gray-500'}`}>{job.isPublished ? 'Published' : 'Hidden'}</span></div><h3 className="font-semibold mt-2">{job.title}</h3><p className="text-sm text-gray-500">{job.department} · Due: {job.deadline}</p></div><div className="flex gap-2"><button onClick={() => edit(job)} className="p-2 rounded-lg bg-emerald-50 text-[#018837]" aria-label="Edit job"><Pencil className="w-4 h-4" /></button><button onClick={() => remove(job.id)} className="p-2 rounded-lg bg-red-50 text-red-600" aria-label="Delete job"><Trash2 className="w-4 h-4" /></button></div></div>)}</div>}</section>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">System engineered by <span className="font-semibold text-gray-700">Mst. Sanzida</span></footer>
      </div>
    </div>
  );
}
