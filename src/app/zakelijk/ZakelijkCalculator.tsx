'use client'

import { useState } from 'react'
import { Check, Users, CalendarDays, Sparkles, ChevronDown } from 'lucide-react'

// ============================================================
// PAKKETTEN - Villa 1855 Zakelijk (excl. BTW, Prijzen 2026)
// ============================================================
const PACKAGES = {
  'zakelijke-borrel': {
    id: 'zakelijke-borrel',
    name: 'Zakelijke borrel',
    pricePerPerson: 52.50,
    tagline: 'Een informele setting om relaties te versterken. Ideaal voor netwerkevents, productlanceringen of seizoensborrels.',
    included: [
      'Macaron bij ontvangst',
      'Tafelgarnituur',
      '2 luxe hapjes per persoon',
      '2 bites per persoon',
      'Bier, fris, wijn en warme dranken',
      'Meubilair',
      'Locatiehuur',
      'Schoonmaak',
    ],
    program: [
      { time: '16:00', activity: 'Ontvangst gasten | borrel' },
      { time: '19:00', activity: 'Einde bijeenkomst' },
    ],
    extras: [] as { label: string; description: string; price: number }[],
  },
  'zakelijke-bijeenkomst': {
    id: 'zakelijke-bijeenkomst',
    name: 'Zakelijke bijeenkomst',
    pricePerPerson: 65,
    tagline: 'Een productieve dag in een inspirerende omgeving. Perfect voor strategiesessies, trainingen, presentaties of workshops.',
    included: [
      'Macaron bij ontvangst',
      'Tafelgarnituur',
      '2 luxe hapjes per persoon',
      'Bier, fris, wijn en warme dranken',
      'Meubilair',
      'Beeldscherm 55 inch',
      'Locatiehuur',
      'Schoonmaak',
    ],
    program: [
      { time: '14:00', activity: 'Ontvangst gasten' },
      { time: '14:30', activity: 'Start plenaire sessie' },
      { time: '15:30', activity: 'Einde plenaire sessie | borrel' },
      { time: '18:30', activity: 'Einde bijeenkomst' },
    ],
    extras: [] as { label: string; description: string; price: number }[],
  },
  'zakelijk-diner': {
    id: 'zakelijk-diner',
    name: 'Zakelijk diner',
    pricePerPerson: 92.50,
    tagline: 'Versterk zakelijke relaties met een onvergetelijk diner. Combineer netwerken met excellent eten in een unieke setting.',
    included: [
      'Tafelgarnituur',
      '3-gangen diner',
      'Bier, fris, wijn en warme dranken',
      'Meubilair',
      'Linnen',
      'Locatiehuur',
      'Schoonmaak',
    ],
    program: [
      { time: '17:30', activity: 'Ontvangst gasten' },
      { time: '18:00', activity: 'Borrel' },
      { time: '19:00', activity: 'Start diner' },
      { time: '22:00', activity: 'Einde diner | naborrel' },
      { time: '23:00', activity: 'Einde bijeenkomst' },
    ],
    extras: [
      { label: 'Extra borrel vooraf', description: 'Bier, fris, wijn, warme dranken + 2 luxe hapjes p.p.', price: 15 },
      { label: 'Extra borrel achteraf', description: 'Bier, fris, wijn, warme dranken + 2 bites p.p.', price: 15 },
    ],
  },
} as const

type PackageKey = keyof typeof PACKAGES

// ============================================================
// HELPERS
// ============================================================
function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',')
}

function formatDateNL(date: string): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ============================================================
// OPTION FORM (left column when expanded)
// ============================================================
type AvailabilityState = 'idle' | 'checking' | 'available' | 'unavailable' | 'error'

interface OptionFormState {
  date: string
  guests: number
  name: string
  company: string
  email: string
  phone: string
  message: string
  extras: string[]
}

function OptionForm({ pkg }: { pkg: typeof PACKAGES[PackageKey] }) {
  const [form, setForm] = useState<OptionFormState>({
    date: '',
    guests: 0,
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    extras: [],
  })
  const [availability, setAvailability] = useState<AvailabilityState>('idle')
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const checkAvailability = async (date: string) => {
    if (!date) {
      setAvailability('idle')
      return
    }
    setAvailability('checking')
    try {
      const d = new Date(date)
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      const res = await fetch(`/api/availability?month=${month}&year=${year}`)
      if (!res.ok) throw new Error('availability fetch failed')
      const data: { days: { date: string; status: string }[] } = await res.json()
      const day = data.days.find((x) => x.date === date)
      if (!day) {
        setAvailability('available')
        return
      }
      const free = day.status === 'available' || day.status === 'limited'
      setAvailability(free ? 'available' : 'unavailable')
    } catch {
      setAvailability('error')
    }
  }

  const handleDateChange = (date: string) => {
    setForm((f) => ({ ...f, date }))
    checkAvailability(date)
  }

  const toggleExtra = (label: string, checked: boolean) => {
    setForm((f) => ({
      ...f,
      extras: checked ? [...f.extras, label] : f.extras.filter((e) => e !== label),
    }))
  }

  const extrasTotal = pkg.extras
    .filter((e) => form.extras.includes(e.label))
    .reduce((sum, e) => sum + e.price, 0)
  const pricePerPerson = pkg.pricePerPerson + extrasTotal
  const total = form.guests * pricePerPerson

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.date &&
    form.guests > 0 &&
    availability !== 'unavailable' &&
    !submitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setSubmitResult(null)

    const extrasList = form.extras.length > 0 ? `\n- Extra's: ${form.extras.join(', ')}` : ''
    const message = [
      `Optie-aanvraag zakelijk event`,
      ``,
      `Pakket: ${pkg.name} (€${formatPrice(pkg.pricePerPerson)} p.p.)`,
      `Datum: ${formatDateNL(form.date)}`,
      `Aantal personen: ${form.guests}`,
      `Bedrijf: ${form.company || '-'}`,
      `Telefoon: ${form.phone || '-'}`,
      `Geschatte totaalprijs (excl. btw): €${formatPrice(total)}${extrasList}`,
      ``,
      `Bericht: ${form.message || '-'}`,
    ].join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: 'zakelijk',
          message,
        }),
      })
      const data = await res.json()
      setSubmitResult({ success: !!data.success, message: data.message || (data.success ? 'Verzonden!' : 'Er ging iets mis.') })
      if (data.success) {
        setForm({ date: '', guests: 0, name: '', company: '', email: '', phone: '', message: '', extras: [] })
        setAvailability('idle')
      }
    } catch {
      setSubmitResult({ success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent" />
        <h4 className="font-heading text-xl font-medium text-primary-darkest">Plaats een optie</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor={`${pkg.id}-date`} className="text-sm font-medium text-primary-darkest flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Datum
          </label>
          <input
            id={`${pkg.id}-date`}
            type="date"
            required
            value={form.date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
          {availability === 'checking' && <p className="text-xs text-primary">Beschikbaarheid checken…</p>}
          {availability === 'available' && (
            <p className="text-xs text-green-700 font-medium">Datum lijkt beschikbaar — we bevestigen na aanvraag.</p>
          )}
          {availability === 'unavailable' && (
            <p className="text-xs text-red-700 font-medium">Deze datum is niet beschikbaar. Kies een andere datum.</p>
          )}
          {availability === 'error' && (
            <p className="text-xs text-primary">Beschikbaarheid niet te checken — verstuur gerust, wij nemen contact op.</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor={`${pkg.id}-guests`} className="text-sm font-medium text-primary-darkest flex items-center gap-2">
            <Users className="h-4 w-4" />
            Aantal personen
          </label>
          <input
            id={`${pkg.id}-guests`}
            type="number"
            required
            min="1"
            max="150"
            value={form.guests || ''}
            onChange={(e) => setForm((f) => ({ ...f, guests: Math.max(0, parseInt(e.target.value) || 0) }))}
            placeholder="Bijv. 50"
            className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      {pkg.extras.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-darkest">Optionele uitbreidingen (meerprijs)</label>
          <div className="space-y-2">
            {pkg.extras.map((extra) => {
              const checked = form.extras.includes(extra.label)
              return (
                <label key={extra.label} className="flex items-start gap-3 cursor-pointer p-3 border border-primary-lighter hover:border-accent transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleExtra(extra.label, e.target.checked)}
                    className="mt-1 accent-accent"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-primary-darkest">{extra.label}</span>
                      <span className="text-xs font-semibold text-accent-hover whitespace-nowrap">+ &euro;{extra.price} p.p.</span>
                    </div>
                    <p className="text-xs text-primary mt-0.5">{extra.description}</p>
                  </div>
                </label>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor={`${pkg.id}-name`} className="text-sm font-medium text-primary-darkest">Naam *</label>
          <input
            id={`${pkg.id}-name`}
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={`${pkg.id}-company`} className="text-sm font-medium text-primary-darkest">Bedrijf</label>
          <input
            id={`${pkg.id}-company`}
            type="text"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={`${pkg.id}-email`} className="text-sm font-medium text-primary-darkest">E-mail *</label>
          <input
            id={`${pkg.id}-email`}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={`${pkg.id}-phone`} className="text-sm font-medium text-primary-darkest">Telefoon</label>
          <input
            id={`${pkg.id}-phone`}
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${pkg.id}-message`} className="text-sm font-medium text-primary-darkest">Bericht (optioneel)</label>
        <textarea
          id={`${pkg.id}-message`}
          rows={3}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Bijzonderheden, dieetwensen, AV-behoeften…"
          className="w-full px-4 py-3 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        />
      </div>

      {form.guests > 0 && (
        <div className="p-4 bg-accent/10 border-2 border-accent/30">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <span className="text-sm text-primary">
              {form.guests} personen × €{formatPrice(pricePerPerson)}
            </span>
            <span className="font-heading text-2xl font-semibold text-primary-darkest">
              €{formatPrice(total)}
            </span>
          </div>
          <p className="text-xs text-primary">Indicatieve totaalprijs, excl. btw.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Versturen…' : 'Vrijblijvende optie aanvragen'}
      </button>

      {submitResult && (
        <p className={`text-sm text-center ${submitResult.success ? 'text-green-700' : 'text-red-700'}`}>
          {submitResult.message}
        </p>
      )}
    </form>
  )
}

// ============================================================
// PROGRAMMA + INBEGREPEN (right column when expanded)
// ============================================================
function PackageDetails({ pkg }: { pkg: typeof PACKAGES[PackageKey] }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-heading text-xl font-medium text-primary-darkest mb-3">Voorbeeldprogramma</h4>
        <ul className="space-y-3">
          {pkg.program.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="font-semibold text-accent w-14 flex-shrink-0">{item.time}</span>
              <span className="text-primary">{item.activity}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-primary italic mt-4 leading-relaxed">
          Begin- en eindtijd bepaal je zelf in overleg — dit is slechts een voorbeeldprogramma. Extra uren zijn maatwerk en brengen extra kosten met zich mee.
        </p>
      </div>

      <div>
        <h4 className="font-heading text-xl font-medium text-primary-darkest mb-3">Inbegrepen</h4>
        <ul className="space-y-2">
          {pkg.included.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-primary">
              <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ============================================================
// PACKAGE ROW (collapsed header + expandable panel)
// ============================================================
function PackageRow({
  pkg,
  expanded,
  onToggle,
}: {
  pkg: typeof PACKAGES[PackageKey]
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div className={`bg-white overflow-hidden transition-shadow border ${expanded ? 'border-accent shadow-lg' : 'border-primary-lighter'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full text-left p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:bg-primary-lightest/40 transition-colors cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-2xl font-medium text-primary-darkest">{pkg.name}</h3>
          <p className="text-sm text-primary mt-1">{pkg.tagline}</p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 flex-shrink-0">
          <div className="text-right">
            <div className="font-heading text-3xl font-semibold text-primary-darkest leading-none">
              &euro;{formatPrice(pkg.pricePerPerson)}
            </div>
            <div className="text-xs text-primary mt-1">p.p. excl. btw</div>
          </div>
          <div className={`w-10 h-10 flex items-center justify-center border border-primary-lighter transition-transform ${expanded ? 'rotate-180 bg-accent text-white border-accent' : 'text-primary-darkest'}`}>
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-primary-lighter p-6 lg:p-8 bg-offwhite">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <OptionForm pkg={pkg} />
            </div>
            <div className="lg:border-l lg:border-primary-lighter lg:pl-12">
              <PackageDetails pkg={pkg} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// MAIN
// ============================================================
export default function ZakelijkCalculator() {
  const [expanded, setExpanded] = useState<PackageKey | null>(null)

  return (
    <section className="section-padding bg-offwhite" id="configurator">
      <div className="container">
        <div className="section-header">
          <h2>Kies je pakket</h2>
          <p>Drie kant-en-klare arrangementen voor jullie zakelijke event. Selecteer een pakket en plaats vrijblijvend een optie voor je gewenste datum.</p>
        </div>

        <div className="space-y-4 max-w-5xl mx-auto mt-12 mb-16">
          {(Object.keys(PACKAGES) as PackageKey[]).map((key) => (
            <PackageRow
              key={key}
              pkg={PACKAGES[key]}
              expanded={expanded === key}
              onToggle={() => setExpanded((prev) => (prev === key ? null : key))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
