'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ============================================================
// PRIJZEN - Villa 1855
// ============================================================
const PRICES = {
  // Daggasten
  borrelplank: 8.00,              // Borrelplank per persoon
  drinksDay: 42.50,               // Dranken dagprogramma (ontvangst, ceremonie, receptie, diner)
  dinnerThreeCourse: 49.50,       // 3-gangen diner per persoon
  dinnerFourCourse: 54.50,        // 4-gangen diner per persoon
  dinnerShared: 59.50,            // Shared diner per persoon
  // Avondgasten
  partyFood: 14.50,               // Hapjesarrangement per persoon
  drinksEvening: 38.25,           // Dranken avondprogramma per persoon
  // Vast
  houseRental: 2950,              // Huur villa incl. btw
}

// ============================================================
// DEALS - Villa 1855
// ============================================================
const DEALS = [
  {
    id: 'bruiloft-2026',
    label: 'Trouwen in 2026',
    discount: '30%',
    description: '30% korting op de locatiehuur voor bruiloften die plaatsvinden in 2026.',
  },
  {
    id: 'winterdeal',
    label: 'Oktober t/m april',
    discount: '50%',
    description: '50% korting op de locatiehuur voor bruiloften tussen oktober en april.',
  },
  {
    id: 'zondag',
    label: 'Zondag trouwen',
    discount: '50%',
    description: '50% korting op de locatiehuur voor bruiloften op zondag.',
  },
]

// ============================================================
// TYPES
// ============================================================
type DinnerType = 'three-course' | 'four-course' | 'shared'

interface FormData {
  dayGuests: number
  eveningGuests: number
  dinnerType: DinnerType
  discounts: string[]
}

interface Costs {
  borrelplank: number
  drinksDay: number
  dinner: number
  partyFood: number
  drinksEvening: number
  subtotal: number
  houseRental: number
  houseRentalOriginal: number
  discount: number
  total: number
  costPerDayGuest: number
  costPerEveningGuest: number
  dinnerType: DinnerType
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

function getDiscountPercentage(discounts: string[]): number {
  // Hoogste korting wordt toegepast
  if (discounts.includes('winterdeal') || discounts.includes('zondag')) return 50
  if (discounts.includes('bruiloft-2026')) return 30
  return 0
}

function getDinnerLabel(type: DinnerType): string {
  switch (type) {
    case 'four-course': return 'Diner (4-gangen)'
    case 'shared': return 'Diner (shared)'
    default: return 'Diner (3-gangen)'
  }
}

function getDinnerPrice(type: DinnerType): number {
  switch (type) {
    case 'four-course': return PRICES.dinnerFourCourse
    case 'shared': return PRICES.dinnerShared
    default: return PRICES.dinnerThreeCourse
  }
}

function getDinnerPriceFormatted(type: DinnerType): string {
  switch (type) {
    case 'four-course': return '54,50'
    case 'shared': return '59,50'
    default: return '49,50'
  }
}

// ============================================================
// GUEST FORM COMPONENT
// ============================================================
function GuestForm({ data, onChange }: { data: FormData; onChange: (data: FormData) => void }) {
  return (
    <div className="space-y-6">
      {/* Aantal daggasten */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label htmlFor="dayGuests" className="text-sm font-medium text-primary-darkest">
            Aantal daggasten
          </label>
          <div className="group relative">
            <svg className="h-4 w-4 text-primary cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-primary-darkest text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Borrel, dranken dagprogramma &amp; diner
            </div>
          </div>
        </div>
        <input
          id="dayGuests"
          type="number"
          min="0"
          value={data.dayGuests || ''}
          onChange={(e) => onChange({ ...data, dayGuests: Math.max(0, parseInt(e.target.value) || 0) })}
          placeholder="0"
          className="w-full text-lg h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
        />
        <div className="text-xs text-primary space-y-1">
          <p className="font-medium mb-2">Inclusief:</p>
          <p>&bull; Borrelplank (&euro;8,00 p.p.)</p>
          <p>&bull; Dranken dagprogramma: ontvangst, ceremonie, receptie &amp; diner (&euro;42,50 p.p.)</p>
          <p>&bull; Diner: keuze menu (&euro;{getDinnerPriceFormatted(data.dinnerType)} p.p.)</p>
        </div>
      </div>

      {/* Keuze diner */}
      <div className="space-y-3 pt-4 border-t border-primary-lighter">
        <label className="text-sm font-medium text-primary-darkest">Keuze diner</label>
        <div className="space-y-3">
          {([
            { value: 'three-course' as DinnerType, label: '3-gangen diner (\u20AC49,50)' },
            { value: 'four-course' as DinnerType, label: '4-gangen diner (\u20AC54,50)' },
            { value: 'shared' as DinnerType, label: 'Shared diner (\u20AC59,50)' },
          ]).map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="dinnerType"
                  value={option.value}
                  checked={data.dinnerType === option.value}
                  onChange={() => onChange({ ...data, dinnerType: option.value })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                  data.dinnerType === option.value
                    ? 'border-accent bg-accent'
                    : 'border-primary-light group-hover:border-accent'
                }`}>
                  {data.dinnerType === option.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm text-primary-dark">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Aantal avondgasten */}
      <div className="space-y-3 pt-4 border-t border-primary-lighter">
        <div className="flex items-center gap-2">
          <label htmlFor="eveningGuests" className="text-sm font-medium text-primary-darkest">
            Aantal avondgasten (totaal)
          </label>
          <div className="group relative">
            <svg className="h-4 w-4 text-primary cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-primary-darkest text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Feestavond
            </div>
          </div>
        </div>
        <input
          id="eveningGuests"
          type="number"
          min="0"
          value={data.eveningGuests || ''}
          onChange={(e) => onChange({ ...data, eveningGuests: Math.max(0, parseInt(e.target.value) || 0) })}
          placeholder="0"
          className="w-full text-lg h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
        />
        <div className="text-xs text-primary space-y-1">
          <p className="font-medium mb-2">Inclusief:</p>
          <p>&bull; Hapjesarrangement (&euro;14,50 p.p.)</p>
          <p>&bull; Dranken avondprogramma (&euro;38,25 p.p.)</p>
        </div>
      </div>

      {/* Gastensamenstelling */}
      {(data.dayGuests > 0 || data.eveningGuests > 0) && (
        <div className="p-4 bg-primary-lightest border border-primary-lighter">
          <h3 className="font-medium text-primary-darkest mb-2">Gastensamenstelling</h3>
          <div className="space-y-1 text-sm text-primary">
            <p>Daggasten: {data.dayGuests}</p>
            <p>Avondgasten totaal: {data.eveningGuests}</p>
            {data.eveningGuests > data.dayGuests && (
              <p className="text-xs italic">
                Waarvan {data.eveningGuests - data.dayGuests} extra gast(en) alleen voor het feest
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// DEALS COMPONENT
// ============================================================
function DealsSection({ selectedDiscounts, onChange }: { selectedDiscounts: string[]; onChange: (discounts: string[]) => void }) {
  const handleToggle = (dealId: string, checked: boolean) => {
    if (checked) {
      const newDiscounts = [...selectedDiscounts, dealId]
      onChange(newDiscounts)
    } else {
      onChange(selectedDiscounts.filter((d) => d !== dealId))
    }
  }

  const highestDiscount = selectedDiscounts.some((d) => d === 'winterdeal' || d === 'zondag')
    ? 50
    : selectedDiscounts.includes('bruiloft-2026')
    ? 30
    : 0

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-primary-darkest">Beschikbare kortingen</h3>
      <div className="space-y-3">
        {DEALS.map((deal) => (
          <label key={deal.id} className="flex items-start space-x-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={selectedDiscounts.includes(deal.id)}
                onChange={(e) => handleToggle(deal.id, e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 transition-colors flex items-center justify-center ${
                selectedDiscounts.includes(deal.id)
                  ? 'border-accent bg-accent'
                  : 'border-primary-light group-hover:border-accent'
              }`}>
                {selectedDiscounts.includes(deal.id) && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary-darkest">{deal.label}</span>
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-accent/20 text-accent-hover">
                  {deal.discount}
                </span>
              </div>
              <p className="text-xs text-primary mt-1">{deal.description}</p>
            </div>
          </label>
        ))}
      </div>

      {highestDiscount > 0 && (
        <div className="p-3 bg-primary-lightest border border-primary-lighter">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-primary-darkest">Toegepaste korting</span>
          </div>
          <p className="text-xs text-primary">
            Hoogste korting van {highestDiscount}% wordt toegepast op de huur van de villa.
          </p>
          <p className="text-xs text-primary mt-1 italic">
            * Bij meerdere kortingen wordt automatisch de hoogste korting toegepast.
          </p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// COST OVERVIEW COMPONENT
// ============================================================
function CostOverview({ costs }: { costs: Costs }) {
  const dayItems = [
    { label: 'Borrelplank', amount: costs.borrelplank },
    { label: 'Dranken dagprogramma', amount: costs.drinksDay },
    { label: getDinnerLabel(costs.dinnerType), amount: costs.dinner },
  ]

  const eveningItems = [
    { label: 'Hapjesarrangement', amount: costs.partyFood },
    { label: 'Dranken avondprogramma', amount: costs.drinksEvening },
  ]

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

      {/* Dagarrangementen */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-primary-darkest flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          Dagprogramma
        </h3>
        <div className="space-y-3">
          {dayItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <span className="text-sm text-primary">{item.label}</span>
              <span className="font-medium text-primary-darkest">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-primary-lighter" />

      {/* Avondarrangementen */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-primary-darkest flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          Feestavond
        </h3>
        <div className="space-y-3">
          {eveningItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <span className="text-sm text-primary">{item.label}</span>
              <span className="font-medium text-primary-darkest">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtotaal */}
      <div className="flex items-center justify-between py-3 bg-primary-lightest px-4 border border-primary-lighter mb-6">
        <span className="font-medium text-primary-darkest">Subtotaal arrangementen</span>
        <span className="font-semibold text-primary-darkest text-lg">{formatCurrency(costs.subtotal)}</span>
      </div>

      {/* Divider */}
      <hr className="my-6 border-primary-lighter" />

      {/* Huur villa */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-primary-darkest flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Huur villa
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary">Standaard huur (incl. btw)</span>
            <span className={costs.discount > 0 ? 'line-through text-primary' : 'font-medium text-primary-darkest'}>
              {formatCurrency(costs.houseRentalOriginal)}
            </span>
          </div>
          {costs.discount > 0 && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary">Korting</span>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-accent/20 text-accent-hover">
                    -{Math.round(costs.discount / costs.houseRentalOriginal * 100)}%
                  </span>
                </div>
                <span className="font-medium text-red-600">-{formatCurrency(costs.discount)}</span>
              </div>
              <div className="flex items-center justify-between py-3 bg-primary-lightest px-4 border border-primary-lighter">
                <span className="font-medium text-primary-darkest">Huur na korting</span>
                <span className="font-semibold text-primary-darkest text-lg">{formatCurrency(costs.houseRental)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-primary-lighter" />

      {/* Totaal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-accent/10 border-2 border-accent/30">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="font-heading text-xl font-medium text-primary-darkest">Totale kosten</span>
          </div>
          <span className="font-heading text-2xl font-semibold text-primary-darkest">{formatCurrency(costs.total)}</span>
        </div>

        {/* Per gast */}
        {(costs.costPerDayGuest > 0 || costs.costPerEveningGuest > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {costs.costPerDayGuest > 0 && (
              <div className="p-3 bg-primary-lightest border border-primary-lighter text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <p className="text-xs text-primary">Per daggast</p>
                  <div className="group relative">
                    <svg className="h-3 w-3 text-primary cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-primary-darkest text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      Borrel + dranken dag + diner
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-primary-darkest">{formatCurrency(costs.costPerDayGuest)}</p>
              </div>
            )}
            {costs.costPerEveningGuest > 0 && (
              <div className="p-3 bg-primary-lightest border border-primary-lighter text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <p className="text-xs text-primary">Per avondgast</p>
                  <div className="group relative">
                    <svg className="h-3 w-3 text-primary cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-primary-darkest text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      Hapjes + dranken avond
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-primary-darkest">{formatCurrency(costs.costPerEveningGuest)}</p>
              </div>
            )}
          </div>
        )}

        {/* Leeg state */}
        {costs.total === 0 && (
          <div className="text-center py-8">
            <p className="text-primary">Voer het aantal gasten in om de kosten te berekenen</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// MAIN CALCULATOR COMPONENT
// ============================================================
export default function WeddingCalculator() {
  const [formData, setFormData] = useState<FormData>({
    dayGuests: 0,
    eveningGuests: 0,
    dinnerType: 'three-course',
    discounts: [],
  })

  const [costs, setCosts] = useState<Costs>({
    borrelplank: 0,
    drinksDay: 0,
    dinner: 0,
    partyFood: 0,
    drinksEvening: 0,
    subtotal: 0,
    houseRental: PRICES.houseRental,
    houseRentalOriginal: PRICES.houseRental,
    discount: 0,
    total: 0,
    costPerDayGuest: 0,
    costPerEveningGuest: 0,
    dinnerType: 'three-course',
  })

  useEffect(() => {
    const { dayGuests, eveningGuests, dinnerType, discounts } = formData

    const dinnerPrice = getDinnerPrice(dinnerType)

    // Daggasten kosten
    const borrelplank = dayGuests * PRICES.borrelplank
    const drinksDay = dayGuests * PRICES.drinksDay
    const dinner = dayGuests * dinnerPrice

    // Avondgasten kosten
    const partyFood = eveningGuests * PRICES.partyFood
    const drinksEvening = eveningGuests * PRICES.drinksEvening

    const subtotal = borrelplank + drinksDay + dinner + partyFood + drinksEvening

    // Huur + korting
    const discountPercent = getDiscountPercentage(discounts)
    const discountAmount = PRICES.houseRental * discountPercent / 100
    const houseRental = PRICES.houseRental - discountAmount

    const total = subtotal + houseRental

    // Per gast
    const costPerDayGuest = dayGuests > 0
      ? (borrelplank + drinksDay + dinner) / dayGuests
      : 0
    const costPerEveningGuest = PRICES.partyFood + PRICES.drinksEvening

    setCosts({
      borrelplank,
      drinksDay,
      dinner,
      partyFood,
      drinksEvening,
      subtotal,
      houseRental,
      houseRentalOriginal: PRICES.houseRental,
      discount: discountAmount,
      total,
      costPerDayGuest,
      costPerEveningGuest,
      dinnerType,
    })
  }, [formData])

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="page-hero-bg">
            <div className="page-hero-pattern" />
          </div>
          <div className="container">
            <div className="page-hero-content">
              <span className="label">Bruiloft planner</span>
              <h1>Bereken de kosten van jullie bruiloft</h1>
              <p>
                Reken uit hoe jullie perfecte dag bij Villa 1855 eruit kan zien. Pas het aantal gasten
                en wensen aan en bekijk meteen de bijbehorende kosten. Deze berekening is een eerste
                schatting van jullie trouwkosten &mdash; puur ter indicatie. De uiteindelijke offerte
                stellen we persoonlijk met jullie op, afgestemd op jullie dag.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="section-padding bg-offwhite">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Left: Form */}
              <div className="space-y-6">
                <div className="card p-6 lg:p-8">
                  <h2 className="font-heading text-2xl font-medium text-primary-darkest mb-6">
                    Jullie bruiloft samenstellen
                  </h2>
                  <GuestForm data={formData} onChange={setFormData} />
                  <div className="mt-8 pt-6 border-t border-primary-lighter">
                    <DealsSection
                      selectedDiscounts={formData.discounts}
                      onChange={(discounts) => setFormData({ ...formData, discounts })}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Cost Overview */}
              <div>
                <div className="lg:sticky lg:top-8">
                  <CostOverview costs={costs} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voorwaarden & Omzetgarantie */}
        <section className="section-padding">
          <div className="container">
            <div className="card p-6 lg:p-8 max-w-7xl mx-auto">
              <h2 className="font-heading text-2xl font-medium text-primary-darkest mb-6">
                Voorwaarden &amp; omzetgarantie
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Minimale omzetgarantie */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-medium text-primary-darkest mb-3">
                    Minimale omzetgarantie
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-primary-lightest">
                      <span className="text-primary">Mei t/m september:</span>
                      <span className="font-medium text-primary-darkest">&euro; 10.000 incl. btw</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary-lightest">
                      <span className="text-primary">Oktober t/m april:</span>
                      <span className="font-medium text-primary-darkest">&euro; 8.000 incl. btw</span>
                    </div>
                  </div>
                  <p className="text-xs text-primary mt-4">
                    Als de minimale omzet niet wordt gehaald, adviseren wij om extra eten, drinken en/of
                    decoratie mogelijkheden toe te voegen aan de offerte. Indien de omzetgarantie niet
                    wordt gehaald, verhogen wij de huur van de villa tot het minimale bedrag.
                  </p>
                </div>

                {/* Bruiloft deals voorwaarden */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-medium text-primary-darkest mb-3">
                    Bruiloft deals voorwaarden
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-primary">
                        Alleen van toepassing bij afname van alle dagdelen van een bruiloft
                      </span>
                    </div>
                    <div className="ml-5 text-xs text-primary">
                      (ceremonie - borrel - diner - feest*)
                    </div>
                    <div className="flex items-start space-x-3 mt-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-primary">Feest van minimaal 4 uur + drankafkoop</span>
                    </div>
                    <div className="flex items-start space-x-3 mt-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-primary">
                        Voor het diner bieden we volop mogelijkheden: van een 3- tot 4-gangenmenu
                        tot sfeervolle shared diners. Ook voor de hapjes is er ruime keuze.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Benieuwd naar de mogelijkheden?</h2>
              <p>
                Neem contact met ons op voor een vrijblijvend gesprek of plan direct een locatiebezoek in.
              </p>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-primary">
                  Contact opnemen
                </Link>
                <Link href="/beschikbaarheid" className="btn btn-outline">
                  Beschikbaarheid bekijken
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
