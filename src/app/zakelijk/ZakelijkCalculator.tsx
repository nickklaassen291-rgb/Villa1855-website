'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ============================================================
// ARRANGEMENTEN - Villa 1855 Zakelijk (excl. BTW, Prijzen 2026)
// ============================================================
const ARRANGEMENTS = {
  'netwerkborrel': {
    id: 'netwerkborrel',
    name: 'Netwerkborrel',
    pricePerPerson: 52.50,
    description: 'Een informele setting om relaties te versterken. Ideaal voor netwerkevents, productlanceringen of seizoensborrels.',
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
    extras: [] as { id: string; label: string; description: string; price: number }[],
  },
  'zakelijke-bijeenkomst': {
    id: 'zakelijke-bijeenkomst',
    name: 'Zakelijke bijeenkomst',
    pricePerPerson: 65,
    description: 'Een productieve dag in een inspirerende omgeving. Perfect voor strategiesessies, trainingen, presentaties of workshops.',
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
    extras: [] as { id: string; label: string; description: string; price: number }[],
  },
  'zakelijk-diner': {
    id: 'zakelijk-diner',
    name: 'Zakelijk diner',
    pricePerPerson: 92.50,
    description: 'Versterk zakelijke relaties met een onvergetelijk diner. Combineer netwerken met excellent eten in een unieke setting.',
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
      { id: 'borrel-vooraf', label: 'Extra borrel vooraf', description: 'Bier, fris, wijn, warme dranken + 2 luxe hapjes p.p.', price: 15 },
      { id: 'borrel-achteraf', label: 'Extra borrel achteraf', description: 'Bier, fris, wijn, warme dranken + 2 bites p.p.', price: 15 },
    ],
  },
} as const

type ArrangementKey = keyof typeof ARRANGEMENTS

interface FormData {
  arrangement: ArrangementKey
  date: string
  guests: number
  extras: string[]
}

interface CostItem {
  label: string
  amount: number
}

interface Costs {
  arrangementName: string
  arrangementPerPerson: number
  arrangementTotal: number
  extras: CostItem[]
  extrasTotal: number
  subtotal: number
  total: number
  perPerson: number
}

// ============================================================
// HELPERS
// ============================================================
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',')
}

// ============================================================
// EVENTTYPE SELECTOR
// ============================================================
function EventTypeSelector({ value, onChange }: { value: ArrangementKey; onChange: (v: ArrangementKey) => void }) {
  return (
    <div className="space-y-3">
      {(Object.keys(ARRANGEMENTS) as ArrangementKey[]).map((key) => {
        const a = ARRANGEMENTS[key]
        const selected = value === key
        return (
          <label key={key} className="flex items-start space-x-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="radio"
                name="arrangement"
                value={key}
                checked={selected}
                onChange={() => onChange(key)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                selected ? 'border-accent bg-accent' : 'border-primary-light group-hover:border-accent'
              }`}>
                {selected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium text-primary-darkest">{a.name}</span>
                <span className="text-sm font-semibold text-primary-darkest whitespace-nowrap">
                  &euro;{formatPrice(a.pricePerPerson)} p.p.
                </span>
              </div>
              <p className="text-xs text-primary mt-1">{a.description}</p>
            </div>
          </label>
        )
      })}
    </div>
  )
}

// ============================================================
// GUEST FORM
// ============================================================
function GuestForm({ data, onChange }: { data: FormData; onChange: (d: FormData) => void }) {
  const arrangement = ARRANGEMENTS[data.arrangement]

  const toggleExtra = (id: string, checked: boolean) => {
    const next = checked ? [...data.extras, id] : data.extras.filter((e) => e !== id)
    onChange({ ...data, extras: next })
  }

  return (
    <div className="space-y-6">
      {/* Soort event */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-primary-darkest">Soort event</label>
        <EventTypeSelector
          value={data.arrangement}
          onChange={(v) => onChange({ ...data, arrangement: v, extras: [] })}
        />
      </div>

      {/* Datum */}
      <div className="space-y-3 pt-4 border-t border-primary-lighter">
        <label htmlFor="eventDate" className="text-sm font-medium text-primary-darkest">
          Datum event
        </label>
        <input
          id="eventDate"
          type="date"
          value={data.date}
          onChange={(e) => onChange({ ...data, date: e.target.value })}
          className="w-full text-lg h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
        />
        <p className="text-xs text-primary">Optioneel &mdash; handig voor een check op beschikbaarheid.</p>
      </div>

      {/* Aantal personen */}
      <div className="space-y-3 pt-4 border-t border-primary-lighter">
        <label htmlFor="guests" className="text-sm font-medium text-primary-darkest">
          Aantal personen
        </label>
        <input
          id="guests"
          type="number"
          min="0"
          max="150"
          value={data.guests || ''}
          onChange={(e) => onChange({ ...data, guests: Math.max(0, parseInt(e.target.value) || 0) })}
          placeholder="Bijv. 50"
          className="w-full text-lg h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
        />
        <p className="text-xs text-primary">Max. 150 gasten bij een staande ontvangst, max. 120 bij diner.</p>
      </div>

      {/* Extras */}
      {arrangement.extras.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-primary-lighter">
          <label className="text-sm font-medium text-primary-darkest">Optionele uitbreidingen</label>
          <div className="space-y-3">
            {arrangement.extras.map((extra) => {
              const checked = data.extras.includes(extra.id)
              return (
                <label key={extra.id} className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => toggleExtra(extra.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 transition-colors flex items-center justify-center ${
                      checked ? 'border-accent bg-accent' : 'border-primary-light group-hover:border-accent'
                    }`}>
                      {checked && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-medium text-primary-darkest">{extra.label}</span>
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-accent/20 text-accent-hover whitespace-nowrap">
                        +&euro;{extra.price} p.p.
                      </span>
                    </div>
                    <p className="text-xs text-primary mt-1">{extra.description}</p>
                  </div>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Samenvatting keuze */}
      {data.guests > 0 && (
        <div className="p-4 bg-primary-lightest border border-primary-lighter">
          <h3 className="font-medium text-primary-darkest mb-2">Jouw keuze</h3>
          <div className="space-y-1 text-sm text-primary">
            <p>Arrangement: {arrangement.name}</p>
            <p>Aantal personen: {data.guests}</p>
            {data.date && <p>Datum: {new Date(data.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// COST OVERVIEW
// ============================================================
function CostOverview({ costs, guests }: { costs: Costs; guests: number }) {
  return (
    <div className="card p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <h2 className="font-heading text-2xl font-medium text-primary-darkest">Kostenoverzicht</h2>
      </div>

      {/* Arrangement */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-primary-darkest flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
          </svg>
          Arrangement
        </h3>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-primary">
            {costs.arrangementName}
            {guests > 0 && ` (${guests} × €${formatPrice(costs.arrangementPerPerson)})`}
          </span>
          <span className="font-medium text-primary-darkest">{formatCurrency(costs.arrangementTotal)}</span>
        </div>
      </div>

      {/* Extras */}
      {costs.extras.length > 0 && (
        <>
          <hr className="my-6 border-primary-lighter" />
          <div className="space-y-4 mb-6">
            <h3 className="font-medium text-primary-darkest flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Uitbreidingen
            </h3>
            <div className="space-y-3">
              {costs.extras.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <span className="text-sm text-primary">{item.label}</span>
                  <span className="font-medium text-primary-darkest">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Subtotaal */}
      <div className="flex items-center justify-between py-3 bg-primary-lightest px-4 border border-primary-lighter mb-6">
        <span className="font-medium text-primary-darkest">Subtotaal (excl. btw)</span>
        <span className="font-semibold text-primary-darkest text-lg">{formatCurrency(costs.subtotal)}</span>
      </div>

      <hr className="my-6 border-primary-lighter" />

      {/* Totaal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-accent/10 border-2 border-accent/30">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="font-heading text-xl font-medium text-primary-darkest">Totale investering</span>
          </div>
          <span className="font-heading text-2xl font-semibold text-primary-darkest">{formatCurrency(costs.total)}</span>
        </div>

        {costs.perPerson > 0 && (
          <div className="p-3 bg-primary-lightest border border-primary-lighter text-center mt-4">
            <p className="text-xs text-primary mb-1">Per persoon</p>
            <p className="font-semibold text-primary-darkest">{formatCurrency(costs.perPerson)}</p>
          </div>
        )}

        {costs.total === 0 && (
          <div className="text-center py-8">
            <p className="text-primary">Kies een eventtype en vul het aantal personen in om de kosten te berekenen</p>
          </div>
        )}

        <p className="text-xs text-primary text-center italic mt-4">
          Alle bedragen zijn exclusief btw. Prijzen 2026, ter indicatie.
        </p>
      </div>
    </div>
  )
}

// ============================================================
// MAIN CALCULATOR
// ============================================================
export default function ZakelijkCalculator() {
  const [formData, setFormData] = useState<FormData>({
    arrangement: 'netwerkborrel',
    date: '',
    guests: 0,
    extras: [],
  })

  const [costs, setCosts] = useState<Costs>({
    arrangementName: ARRANGEMENTS.netwerkborrel.name,
    arrangementPerPerson: ARRANGEMENTS.netwerkborrel.pricePerPerson,
    arrangementTotal: 0,
    extras: [],
    extrasTotal: 0,
    subtotal: 0,
    total: 0,
    perPerson: 0,
  })

  useEffect(() => {
    const arrangement = ARRANGEMENTS[formData.arrangement]
    const arrangementTotal = arrangement.pricePerPerson * formData.guests

    const extrasItems: CostItem[] = arrangement.extras
      .filter((e) => formData.extras.includes(e.id))
      .map((e) => ({
        label: formData.guests > 0
          ? `${e.label} (${formData.guests} × €${e.price})`
          : e.label,
        amount: e.price * formData.guests,
      }))

    const extrasTotal = extrasItems.reduce((sum, e) => sum + e.amount, 0)
    const subtotal = arrangementTotal + extrasTotal
    const total = subtotal
    const perPerson = formData.guests > 0 ? total / formData.guests : 0

    setCosts({
      arrangementName: arrangement.name,
      arrangementPerPerson: arrangement.pricePerPerson,
      arrangementTotal,
      extras: extrasItems,
      extrasTotal,
      subtotal,
      total,
      perPerson,
    })
  }, [formData])

  const currentArrangement = ARRANGEMENTS[formData.arrangement]

  return (
    <section className="section-padding bg-offwhite" id="configurator">
      <div className="container">
        <div className="section-header">
          <h2>Stel je arrangement samen</h2>
          <p>Kies een eventtype, bepaal je datum en aantal gasten, en ontdek direct de mogelijkheden en richtprijzen.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-12">
          {/* Left: Form */}
          <div className="space-y-6">
            <div className="card p-6 lg:p-8">
              <h3 className="font-heading text-2xl font-medium text-primary-darkest mb-6">
                Jouw event samenstellen
              </h3>
              <GuestForm data={formData} onChange={setFormData} />
            </div>
          </div>

          {/* Right: Cost Overview */}
          <div>
            <div className="lg:sticky lg:top-8 space-y-6">
              <CostOverview costs={costs} guests={formData.guests} />
              <div className="text-center">
                <Link href="#contact" className="btn btn-primary">
                  Vrijblijvende offerte aanvragen
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Inbegrepen + Programma */}
        <div className="mt-12 max-w-7xl mx-auto">
          <div className="card p-6 lg:p-8">
            <h3 className="font-heading text-2xl font-medium text-primary-darkest mb-2">
              {currentArrangement.name} &mdash; wat is inbegrepen?
            </h3>
            <p className="text-sm text-primary mb-6">{currentArrangement.description}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-heading text-lg font-medium text-primary-darkest mb-3">Inbegrepen</h4>
                <ul className="space-y-2">
                  {currentArrangement.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-primary">
                      <svg className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading text-lg font-medium text-primary-darkest mb-3">Voorbeeldprogramma</h4>
                <ul className="space-y-3">
                  {currentArrangement.program.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="font-semibold text-accent w-14 flex-shrink-0">{item.time}</span>
                      <span className="text-primary">{item.activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
