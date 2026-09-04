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
  type: 'retail' | 'club' | 'v2';
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
  type: 'retail',
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
            type: data.type || 'retail',
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

  const handleLogoFile = (file: File) => {
    setError('');
    if (file.size > 8 * 1024 * 1024) {
      setError('Logo je príliš veľké (max 8 MB).');
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => setError('Nepodarilo sa načítať súbor.');
    reader.onload = () => {
      const dataUrl = reader.result as string;

      // SVG: ulož ako data URI tak, ako je (vektor, malý)
      if (file.type === 'image/svg+xml') {
        setForm((p) => ({ ...p, partnerLogoPath: dataUrl }));
        return;
      }

      // Raster: zmenši na max 512 px (zachová priehľadnosť, export PNG)
      const img = new window.Image();
      img.onload = () => {
        const MAX_DIM = 512;
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setForm((p) => ({ ...p, partnerLogoPath: dataUrl }));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        setForm((p) => ({ ...p, partnerLogoPath: canvas.toDataURL('image/png') }));
      };
      img.onerror = () => setForm((p) => ({ ...p, partnerLogoPath: dataUrl }));
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
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
      discount: form.type === 'club' ? 0 : form.discount,
      pinCode: form.pinCode,
      isGeneral: form.isGeneral,
      type: form.type,
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
          {/* Presentation type */}
          <Section title="Typ prezentace">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, type: 'retail' }))}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  form.type === 'retail'
                    ? 'bg-[#E30613] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Retail / VO (prodejny, řetězce)
              </button>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, type: 'club' }))}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  form.type === 'club'
                    ? 'bg-[#232F5D] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Klub / federace (bez retail cen)
              </button>
            </div>
            <p className="text-white/30 text-xs mt-2">
              {form.type === 'v2'
                ? 'V2: ručně stavěná šablona (src/templates/v2). Zde lze měnit jen PIN, partnera a obchodníka — obsah a ceny se upravují v HTML šabloně.'
                : form.type === 'club'
                  ? 'Klubová verze: hodnotová nabídka pro sportovní kluby — výkon, regenerace, reference. Bez MOC/NC cen a planogramu, ceny na míru.'
                  : 'Retail verze: obchodní nabídka pro prodejny a řetězce s MOC/NC cenami a planogramem.'}
            </p>
          </Section>

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
            <div>
              <label className="block text-white/60 text-sm mb-2">Logo partnera</label>
              <div className="flex items-start gap-4">
                <div
                  className="w-24 h-24 shrink-0 rounded-lg border border-white/15 flex items-center justify-center overflow-hidden"
                  style={{ background: 'repeating-conic-gradient(#2a2a40 0% 25%, #1f1f33 0% 50%) 50% / 16px 16px' }}
                >
                  {form.partnerLogoPath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.partnerLogoPath} alt="logo náhľad" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-white/25 text-xs text-center px-2">žiadne logo</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <label className="inline-block cursor-pointer bg-white/10 hover:bg-white/20 text-white/80 text-sm px-4 py-2 rounded-lg transition-colors">
                      Nahrať logo
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleLogoFile(f);
                          e.target.value = '';
                        }}
                      />
                    </label>
                    {form.partnerLogoPath && (
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, partnerLogoPath: '' }))}
                        className="text-white/40 hover:text-white/70 text-sm px-2 py-2"
                      >
                        Odstrániť
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={form.partnerLogoPath.startsWith('data:') ? '' : form.partnerLogoPath}
                    onChange={(e) => setForm((p) => ({ ...p, partnerLogoPath: e.target.value }))}
                    placeholder="alebo cesta /assets/nazov.png"
                    className="mt-3 w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:border-[#E30613]/50 focus:outline-none transition-colors text-sm"
                  />
                  <p className="text-white/30 text-xs mt-1">
                    {form.partnerLogoPath.startsWith('data:')
                      ? 'Nahrané logo (uložené priamo v prezentácii). PNG s priehľadným pozadím vyzerá najlepšie.'
                      : 'Nahrajte súbor, alebo zadajte cestu k logu v /public/assets/. Veľké obrázky sa automaticky zmenšia.'}
                  </p>
                </div>
              </div>
            </div>
            {form.type !== 'club' && (
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
            )}
          </Section>

          {/* Conditions */}
          <Section title="Obchodné podmienky">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.type === 'club' ? (
                <div>
                  <label className="block text-white/60 text-sm mb-1">Cenové podmienky</label>
                  <div className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/40 text-sm">
                    Klubové ceny — na míru (žiadne MOC/NC v prezentácii)
                  </div>
                </div>
              ) : (
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
              )}
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
                <span>Typ: {form.type === 'club' ? 'Klub' : form.type === 'v2' ? 'V2' : 'Retail'}</span>
                {form.type !== 'club' && <span>Zľava: {form.discount} %</span>}
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
