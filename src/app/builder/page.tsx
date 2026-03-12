'use client';

import { useEffect, useState } from 'react';
import { teamMembers } from '@/data/team';
import { getSession } from '@/lib/session';

interface FormData {
  partnerName: string;
  partnerNameShort: string;
  partnerLogoPath: string;
  discount: number;
  pinCode: string;
  isGeneral: boolean;
  salespersonKey: string;
  salespersonName: string;
  salespersonRole: string;
  salespersonPhone: string;
  salespersonEmail: string;
}

const firstMember = teamMembers['karolina.calda'];

const defaultForm: FormData = {
  partnerName: '',
  partnerNameShort: '',
  partnerLogoPath: '',
  discount: 35,
  pinCode: '',
  isGeneral: false,
  salespersonKey: 'karolina.calda',
  salespersonName: firstMember.name,
  salespersonRole: firstMember.role,
  salespersonPhone: firstMember.phone,
  salespersonEmail: firstMember.email,
};

export default function BuilderPage() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const session = getSession();
    if (!session) {
      window.location.href = '/login';
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('edit');
    if (id) {
      setEditId(id);
      fetch(`/api/presentations/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) return;
          setForm({
            partnerName: data.partnerName,
            partnerNameShort: data.partnerNameShort,
            partnerLogoPath: data.partnerLogoPath,
            discount: data.discount,
            pinCode: data.pinCode,
            isGeneral: data.isGeneral || false,
            salespersonKey: '',
            salespersonName: data.salesperson.name,
            salespersonRole: data.salesperson.role,
            salespersonPhone: data.salesperson.phone,
            salespersonEmail: data.salesperson.email,
          });
        });
    }
  }, []);

  const handleSalespersonSelect = (key: string) => {
    const member = teamMembers[key];
    if (member) {
      setForm((prev) => ({
        ...prev,
        salespersonKey: key,
        salespersonName: member.name,
        salespersonRole: member.role,
        salespersonPhone: member.phone,
        salespersonEmail: member.email,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const initials = form.salespersonName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase();

    const payload = {
      partnerName: form.partnerName,
      partnerNameShort: form.partnerNameShort || form.partnerName,
      partnerLogoPath: form.partnerLogoPath,
      discount: form.discount,
      pinCode: form.pinCode,
      isGeneral: form.isGeneral,
      salesperson: {
        name: form.salespersonName,
        role: form.salespersonRole,
        initials,
        phone: form.salespersonPhone,
        email: form.salespersonEmail,
      },
    };

    try {
      const url = editId ? `/api/presentations/${editId}` : '/api/presentations';
      const method = editId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Chyba při ukládání');
      }

      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neznámá chyba');
      setSaving(false);
    }
  };

  const generatePin = () => {
    const base = form.partnerNameShort || form.partnerName;
    const slug = base
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '');
    setForm((prev) => ({ ...prev, pinCode: slug + '2026' }));
  };

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-white/40 hover:text-white transition-colors">
              &larr; Zpět
            </a>
            <span className="text-white/20">|</span>
            <div className="bg-[#E30613] px-3 py-1">
              <span className="text-white font-bold text-sm tracking-wider">ENERVIT</span>
            </div>
          </div>
          <span className="text-white/50 text-sm">
            {editId ? 'Upraviť prezentáciu' : 'Nová prezentácia'}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">
          {editId ? 'Upraviť prezentáciu' : 'Vytvoriť novú prezentáciu'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Partner info */}
          <Section title="Partner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Názov partnera (celý)"
                placeholder="napr. INTERSPORT CZ"
                value={form.partnerName}
                onChange={(v) => setForm((p) => ({ ...p, partnerName: v }))}
                required
              />
              <Field
                label="Skrátený názov"
                placeholder="napr. INTERSPORT"
                value={form.partnerNameShort}
                onChange={(v) => setForm((p) => ({ ...p, partnerNameShort: v }))}
              />
            </div>
            <Field
              label="Cesta k logu partnera"
              placeholder="napr. /assets/intersport-logo.svg"
              value={form.partnerLogoPath}
              onChange={(v) => setForm((p) => ({ ...p, partnerLogoPath: v }))}
              hint="Nahrajte SVG logo do /public/assets/ a zadajte cestu /assets/nazov.svg"
            />
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isGeneral}
                onChange={(e) => setForm((p) => ({ ...p, isGeneral: e.target.checked }))}
                className="w-5 h-5 rounded bg-white/5 border border-white/15 accent-[#E30613]"
              />
              <span className="text-white/60 text-sm">
                Všeobecná prezentácia (bez cien, planogramov — len branding)
              </span>
            </label>
          </Section>

          {/* Conditions */}
          <Section title="Obchodné podmienky">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-sm mb-1">Zľava z MOC (%)</label>
                <input
                  type="number"
                  min={1}
                  max={80}
                  value={form.discount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, discount: Number(e.target.value) }))
                  }
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white focus:border-[#E30613]/50 focus:outline-none transition-colors"
                />
                <p className="text-white/30 text-xs mt-1">
                  NC = MOC x (1 - {form.discount}%) / 1.12
                </p>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-1">Prístupový PIN kód</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.pinCode}
                    onChange={(e) => setForm((p) => ({ ...p, pinCode: e.target.value }))}
                    placeholder="napr. intersport2026"
                    required
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white focus:border-[#E30613]/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={generatePin}
                    className="bg-white/10 hover:bg-white/20 text-white/60 px-4 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
                  >
                    Generovať
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* Salesperson */}
          <Section title="Obchodník">
            <div className="mb-4">
              <label className="block text-white/60 text-sm mb-2">Vybrať z tímu</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(teamMembers)
                  .filter(([key]) => key !== 'general')
                  .map(([key, member]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSalespersonSelect(key)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        form.salespersonKey === key
                          ? 'bg-[#E30613] text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {member.name}
                    </button>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Meno"
                value={form.salespersonName}
                onChange={(v) => setForm((p) => ({ ...p, salespersonName: v }))}
                required
              />
              <Field
                label="Pozícia"
                value={form.salespersonRole}
                onChange={(v) => setForm((p) => ({ ...p, salespersonRole: v }))}
              />
              <Field
                label="Telefón"
                value={form.salespersonPhone}
                onChange={(v) => setForm((p) => ({ ...p, salespersonPhone: v }))}
              />
              <Field
                label="E-mail"
                value={form.salespersonEmail}
                onChange={(v) => setForm((p) => ({ ...p, salespersonEmail: v }))}
              />
            </div>
          </Section>

          {/* Preview */}
          <Section title="Náhľad">
            <div className="bg-gradient-to-r from-[#E30613] to-[#8b0000] p-6 rounded-xl">
              <p className="text-white/70 text-sm mb-1">Prezentácia pre</p>
              <h3 className="text-white text-2xl font-bold">
                {form.partnerName || '(názov partnera)'}
              </h3>
              <div className="flex gap-6 mt-4 text-white/80 text-sm">
                <span>Zľava: {form.discount} %</span>
                <span>PIN: {form.pinCode || '...'}</span>
                <span>Obchodník: {form.salespersonName || '...'}</span>
              </div>
            </div>
          </Section>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#E30613] hover:bg-[#c00510] disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {saving ? 'Ukladám...' : editId ? 'Uložiť zmeny' : 'Vytvoriť prezentáciu'}
            </button>
            <a
              href="/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Zrušiť
            </a>
          </div>
        </form>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6">
      <h2 className="text-white font-semibold text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-white/60 text-sm mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-[#E30613]/50 focus:outline-none transition-colors"
      />
      {hint && <p className="text-white/30 text-xs mt-1">{hint}</p>}
    </div>
  );
}
