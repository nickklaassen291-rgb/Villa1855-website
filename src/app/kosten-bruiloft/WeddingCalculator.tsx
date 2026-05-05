'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ============================================================
// PRIJZEN - Villa 1855
// ============================================================
const PRICES = {
  // Dagprogramma
  receptionA: 6.00,
  receptionB: 9.00,
  receptionC: 11.00,
  drinksDay: 42.50,
  dinnerThreeCourse: 49.50,
  dinnerFourCourse: 54.50,
  dinnerShared: 59.50,
  // Avondprogramma
  partyFoodA: 12.50,
  partyFoodB: 15.00,
  drinksEvening: 38.25,
  lateNightA: 8.00,
  lateNightB: 10.00,
  // Vast
  houseRental: 2950,
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
type ReceptionType = 'a' | 'b' | 'c'
type PartyFoodType = 'a' | 'b'
type LateNightType = 'none' | 'a' | 'b'

interface FormData {
  dayGuests: number
  eveningGuests: number
  receptionType: ReceptionType
  dinnerType: DinnerType
  partyFoodType: PartyFoodType
  lateNightType: LateNightType
  discounts: string[]
}

interface Costs {
  reception: number
  drinksDay: number
  dinner: number
  partyFood: number
  drinksEvening: number
  lateNight: number
  subtotal: number
  houseRental: number
  houseRentalOriginal: number
  discount: number
  total: number
  costPerDayGuest: number
  costPerEveningGuest: number
  receptionType: ReceptionType
  dinnerType: DinnerType
  partyFoodType: PartyFoodType
  lateNightType: LateNightType
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

function getReceptionLabel(type: ReceptionType): string {
  switch (type) {
    case 'b': return 'Receptie hapjes B'
    case 'c': return 'Receptie hapjes C'
    default: return 'Receptie hapjes A'
  }
}

function getReceptionPrice(type: ReceptionType): number {
  switch (type) {
    case 'b': return PRICES.receptionB
    case 'c': return PRICES.receptionC
    default: return PRICES.receptionA
  }
}

function getReceptionPriceFormatted(type: ReceptionType): string {
  switch (type) {
    case 'b': return '9,00'
    case 'c': return '11,00'
    default: return '6,00'
  }
}

function getPartyFoodLabel(type: PartyFoodType): string {
  return type === 'b' ? 'Feestavond hapjes B' : 'Feestavond hapjes A'
}

function getPartyFoodPrice(type: PartyFoodType): number {
  return type === 'b' ? PRICES.partyFoodB : PRICES.partyFoodA
}

function getPartyFoodPriceFormatted(type: PartyFoodType): string {
  return type === 'b' ? '15,00' : '12,50'
}

function getLateNightLabel(type: LateNightType): string {
  if (type === 'a') return 'Late night snack A'
  if (type === 'b') return 'Late night snack B'
  return 'Geen late night snack'
}

function getLateNightPrice(type: LateNightType): number {
  if (type === 'a') return PRICES.lateNightA
  if (type === 'b') return PRICES.lateNightB
  return 0
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
          <p>&bull; Dranken dagprogramma: ontvangst, ceremonie, receptie &amp; diner (&euro;42,50 p.p.)</p>
        </div>
      </div>

      {/* Keuze receptie hapjes */}
      <div className="space-y-3 pt-4 border-t border-primary-lighter">
        <label className="text-sm font-medium text-primary-darkest">Keuze receptie hapjes</label>
        <div className="space-y-3">
          {([
            { value: 'a' as ReceptionType, label: 'Hapjes A (€6,00)' },
            { value: 'b' as ReceptionType, label: 'Hapjes B (€9,00)' },
            { value: 'c' as ReceptionType, label: 'Hapjes C (€11,00)' },
          ]).map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="receptionType"
                  value={option.value}
                  checked={data.receptionType === option.value}
                  onChange={() => onChange({ ...data, receptionType: option.value })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                  data.receptionType === option.value
                    ? 'border-accent bg-accent'
                    : 'border-primary-light group-hover:border-accent'
                }`}>
                  {data.receptionType === option.value && (
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
          <p>&bull; Dranken avondprogramma (&euro;38,25 p.p.)</p>
        </div>
      </div>

      {/* Keuze feestavond hapjes */}
      <div className="space-y-3 pt-4 border-t border-primary-lighter">
        <label className="text-sm font-medium text-primary-darkest">Keuze feestavond hapjes</label>
        <div className="space-y-3">
          {([
            { value: 'a' as PartyFoodType, label: 'Hapjes A (€12,50)' },
            { value: 'b' as PartyFoodType, label: 'Hapjes B (€15,00)' },
          ]).map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="partyFoodType"
                  value={option.value}
                  checked={data.partyFoodType === option.value}
                  onChange={() => onChange({ ...data, partyFoodType: option.value })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                  data.partyFoodType === option.value
                    ? 'border-accent bg-accent'
                    : 'border-primary-light group-hover:border-accent'
                }`}>
                  {data.partyFoodType === option.value && (
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

      {/* Late night snack */}
      <div className="space-y-3 pt-4 border-t border-primary-lighter">
        <label className="text-sm font-medium text-primary-darkest">Late night snack (optioneel)</label>
        <div className="space-y-3">
          {([
            { value: 'none' as LateNightType, label: 'Geen late night snack' },
            { value: 'a' as LateNightType, label: 'Snack A (€8,00)' },
            { value: 'b' as LateNightType, label: 'Snack B (€10,00)' },
          ]).map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="lateNightType"
                  value={option.value}
                  checked={data.lateNightType === option.value}
                  onChange={() => onChange({ ...data, lateNightType: option.value })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                  data.lateNightType === option.value
                    ? 'border-accent bg-accent'
                    : 'border-primary-light group-hover:border-accent'
                }`}>
                  {data.lateNightType === option.value && (
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
    { label: 'Dranken dagprogramma', amount: costs.drinksDay },
    { label: getReceptionLabel(costs.receptionType), amount: costs.reception },
    { label: getDinnerLabel(costs.dinnerType), amount: costs.dinner },
  ]

  const eveningItems = [
    { label: 'Dranken avondprogramma', amount: costs.drinksEvening },
    { label: getPartyFoodLabel(costs.partyFoodType), amount: costs.partyFood },
    ...(costs.lateNightType !== 'none'
      ? [{ label: getLateNightLabel(costs.lateNightType), amount: costs.lateNight }]
      : []),
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
// SEND CALCULATION FORM
// ============================================================
function SendCalculationForm({
  formData,
  costs,
}: {
  formData: FormData
  costs: Costs
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  })

  const canSubmit = costs.total > 0
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !validEmail || !canSubmit) return

    setSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const res = await fetch('/api/calculator/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          weddingDate: weddingDate || undefined,
          message: message.trim() || undefined,
          dayGuests: formData.dayGuests,
          eveningGuests: formData.eveningGuests,
          receptionType: formData.receptionType,
          dinnerType: formData.dinnerType,
          partyFoodType: formData.partyFoodType,
          lateNightType: formData.lateNightType,
          discounts: formData.discounts,
          costs: {
            reception: costs.reception,
            drinksDay: costs.drinksDay,
            dinner: costs.dinner,
            partyFood: costs.partyFood,
            drinksEvening: costs.drinksEvening,
            lateNight: costs.lateNight,
            subtotal: costs.subtotal,
            houseRental: costs.houseRental,
            houseRentalOriginal: costs.houseRentalOriginal,
            discount: costs.discount,
            total: costs.total,
            costPerDayGuest: costs.costPerDayGuest,
            costPerEveningGuest: costs.costPerEveningGuest,
          },
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus({ type: 'success', message: json.message })
      } else {
        setStatus({ type: 'error', message: json.message || 'Er ging iets mis.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Er ging iets mis. Probeer het later opnieuw.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (status.type === 'success') {
    return (
      <div className="card p-6 lg:p-8 mt-6 bg-accent/5 border-2 border-accent/30">
        <div className="flex items-start gap-3">
          <svg className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div>
            <h3 className="font-heading text-xl font-medium text-primary-darkest mb-2">Verstuurd!</h3>
            <p className="text-sm text-primary">{status.message}</p>
            <p className="text-sm text-primary mt-2">Check ook even de spam-map. We nemen binnenkort contact met je op.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!open) {
    return (
      <div className="card p-6 lg:p-8 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-medium text-primary-darkest mb-1">
              Tevreden met deze berekening?
            </h3>
            <p className="text-sm text-primary">
              Ontvang de complete berekening per e-mail (PDF) zodat je alles rustig kunt nalezen.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={!canSubmit}
            className="btn btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Stuur naar mijn e-mail
          </button>
        </div>
        {!canSubmit && (
          <p className="text-xs text-primary mt-3 italic">Vul eerst het aantal gasten in.</p>
        )}
      </div>
    )
  }

  return (
    <div className="card p-6 lg:p-8 mt-6">
      <h3 className="font-heading text-xl font-medium text-primary-darkest mb-2">
        Stuur de berekening naar mijn e-mail
      </h3>
      <p className="text-sm text-primary mb-6">
        Je ontvangt de berekening als PDF. Wij krijgen ook een melding zodat we je persoonlijk verder kunnen helpen.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="calc-name" className="text-sm font-medium text-primary-darkest block mb-2">
              Naam *
            </label>
            <input
              id="calc-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="calc-email" className="text-sm font-medium text-primary-darkest block mb-2">
              E-mailadres *
            </label>
            <input
              id="calc-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="calc-phone" className="text-sm font-medium text-primary-darkest block mb-2">
              Telefoon
            </label>
            <input
              id="calc-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="calc-date" className="text-sm font-medium text-primary-darkest block mb-2">
              Trouwdatum (indien bekend)
            </label>
            <input
              id="calc-date"
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full h-12 px-4 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="calc-message" className="text-sm font-medium text-primary-darkest block mb-2">
            Bericht (optioneel)
          </label>
          <textarea
            id="calc-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Vragen of bijzondere wensen?"
            className="w-full px-4 py-3 border border-primary-light rounded-none bg-white text-primary-darkest focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        {status.type === 'error' && (
          <div className="p-3 bg-red-50 border border-red-200 text-sm text-red-700">
            {status.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting || !name.trim() || !validEmail}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Versturen...' : 'Verstuur berekening'}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={submitting}
            className="btn btn-outline"
          >
            Annuleren
          </button>
        </div>
        <p className="text-xs text-primary italic">
          We gebruiken je gegevens uitsluitend om je de berekening te sturen en eventueel persoonlijk contact op te nemen.
        </p>
      </form>
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
    receptionType: 'a',
    dinnerType: 'three-course',
    partyFoodType: 'a',
    lateNightType: 'none',
    discounts: [],
  })

  const [costs, setCosts] = useState<Costs>({
    reception: 0,
    drinksDay: 0,
    dinner: 0,
    partyFood: 0,
    drinksEvening: 0,
    lateNight: 0,
    subtotal: 0,
    houseRental: PRICES.houseRental,
    houseRentalOriginal: PRICES.houseRental,
    discount: 0,
    total: 0,
    costPerDayGuest: 0,
    costPerEveningGuest: 0,
    receptionType: 'a',
    dinnerType: 'three-course',
    partyFoodType: 'a',
    lateNightType: 'none',
  })

  useEffect(() => {
    const { dayGuests, eveningGuests, receptionType, dinnerType, partyFoodType, lateNightType, discounts } = formData

    const receptionPrice = getReceptionPrice(receptionType)
    const dinnerPrice = getDinnerPrice(dinnerType)
    const partyFoodPrice = getPartyFoodPrice(partyFoodType)
    const lateNightPrice = getLateNightPrice(lateNightType)

    const reception = dayGuests * receptionPrice
    const drinksDay = dayGuests * PRICES.drinksDay
    const dinner = dayGuests * dinnerPrice

    const partyFood = eveningGuests * partyFoodPrice
    const drinksEvening = eveningGuests * PRICES.drinksEvening
    const lateNight = eveningGuests * lateNightPrice

    const subtotal = reception + drinksDay + dinner + partyFood + drinksEvening + lateNight

    const discountPercent = getDiscountPercentage(discounts)
    const discountAmount = PRICES.houseRental * discountPercent / 100
    const houseRental = PRICES.houseRental - discountAmount

    const total = subtotal + houseRental

    const costPerDayGuest = dayGuests > 0
      ? (reception + drinksDay + dinner) / dayGuests
      : 0
    const costPerEveningGuest = partyFoodPrice + PRICES.drinksEvening + lateNightPrice

    setCosts({
      reception,
      drinksDay,
      dinner,
      partyFood,
      drinksEvening,
      lateNight,
      subtotal,
      houseRental,
      houseRentalOriginal: PRICES.houseRental,
      discount: discountAmount,
      total,
      costPerDayGuest,
      costPerEveningGuest,
      receptionType,
      dinnerType,
      partyFoodType,
      lateNightType,
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
                <div className="lg:sticky lg:top-8 space-y-6">
                  <CostOverview costs={costs} />
                  <SendCalculationForm formData={formData} costs={costs} />
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
