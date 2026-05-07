'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, Users, CalendarDays, Sparkles, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

type BookingStatus = 'available' | 'option' | 'booked' | 'limited' | 'closed'
interface DayStatus {
  date: string
  status: BookingStatus
}

const WEEKDAYS_SHORT = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
function getMonthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number): number {
  const firstDay = new Date(year, month, 1).getDay()
  return firstDay === 0 ? 6 : firstDay - 1
}
function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}
function isPastDate(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return parseDate(dateStr) < today
}
function isTodayDate(dateStr: string): boolean {
  const t = new Date()
  return formatDateString(t.getFullYear(), t.getMonth(), t.getDate()) === dateStr
}
function isThursdayDate(dateStr: string): boolean {
  return parseDate(dateStr).getDay() === 4
}
function formatMonthYear(year: number, month: number): string {
  return new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric' }).format(new Date(year, month, 1))
}
function formatDisplayDate(dateStr: string): string {
  return new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(parseDate(dateStr))
}

const STATUS_STYLE: Record<BookingStatus, { bg: string; border: string; text: string; dot: string; tooltip: string }> = {
  available: { bg: 'bg-available-light', border: 'border-available', text: 'text-available', dot: 'bg-available', tooltip: 'Beschikbaar — klik om te selecteren' },
  option: { bg: 'bg-option-light', border: 'border-option', text: 'text-option', dot: 'bg-option', tooltip: 'In optie — vraag naar mogelijkheden' },
  booked: { bg: 'bg-booked-light', border: 'border-booked', text: 'text-booked', dot: 'bg-booked', tooltip: 'Geboekt' },
  limited: { bg: 'bg-limited-light', border: 'border-limited', text: 'text-limited', dot: 'bg-limited', tooltip: 'Beschikbaar vanaf 18:00' },
  closed: { bg: 'bg-closed-light', border: 'border-closed', text: 'text-closed', dot: 'bg-closed', tooltip: 'Gesloten — ma, di, wo' },
}

function MiniCalendarDay({
  day,
  status,
  isToday,
  isPast,
  isThursday,
  isSelected,
  onClick,
}: {
  day: number
  status: BookingStatus
  isToday: boolean
  isPast: boolean
  isThursday: boolean
  isSelected: boolean
  onClick?: () => void
}) {
  const cfg = STATUS_STYLE[status]
  const clickable = !isPast && status !== 'closed' && status !== 'booked'
  const classes = [
    'aspect-square flex flex-col items-center justify-center border relative transition-all duration-200 group',
    isPast ? 'opacity-40 bg-gray-50 border-gray-100' : `${cfg.bg} ${cfg.border}`,
    clickable ? 'cursor-pointer hover:scale-105 hover:shadow-md hover:z-10' : !isPast ? 'cursor-not-allowed' : '',
    isSelected ? 'ring-2 ring-accent ring-offset-1 z-10' : '',
  ].join(' ')

  return (
    <div className={classes} onClick={clickable ? onClick : undefined}>
      <span className={`font-heading text-base ${isPast ? 'text-primary' : cfg.text}`}>{day}</span>
      {!isPast && isThursday && (status === 'limited' || status === 'option') && (
        <span className={`text-[9px] font-medium ${cfg.text}`}>18:00</span>
      )}
      {!isPast && status !== 'closed' && !isThursday && (
        <span className={`w-1 h-1 rounded-full mt-0.5 ${cfg.dot}`} />
      )}
      {isToday && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />}
    </div>
  )
}

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
// AVAILABILITY DATE PICKER (inline calendar)
// ============================================================
function AvailabilityPicker({
  value,
  onSelect,
}: {
  value: string
  onSelect: (date: string, status: BookingStatus) => void
}) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [days, setDays] = useState<DayStatus[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAvailability = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/availability?month=${month + 1}&year=${year}`)
      if (res.ok) {
        const data = await res.json()
        setDays(data.days || [])
      }
    } catch {
      // ignore — picker still works, statuses default to available
    } finally {
      setLoading(false)
    }
  }, [month, year])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  const goPrev = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }
  const goNext = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  const firstDay = getFirstDayOfMonth(year, month)
  const totalDays = getMonthDays(year, month)
  const dayStatusMap = days.reduce((acc, d) => {
    acc[d.date] = d.status
    return acc
  }, {} as Record<string, BookingStatus>)

  const legendItems: { status: BookingStatus; label: string; bg: string; border: string; dot: string }[] = [
    { status: 'available', label: 'Beschikbaar', bg: 'bg-available-light', border: 'border-available', dot: 'bg-available' },
    { status: 'limited', label: 'Vanaf 18:00', bg: 'bg-limited-light', border: 'border-limited', dot: 'bg-limited' },
    { status: 'option', label: 'In optie', bg: 'bg-option-light', border: 'border-option', dot: 'bg-option' },
    { status: 'booked', label: 'Geboekt', bg: 'bg-booked-light', border: 'border-booked', dot: 'bg-booked' },
    { status: 'closed', label: 'Gesloten', bg: 'bg-closed-light', border: 'border-closed', dot: 'bg-closed' },
  ]

  return (
    <div className="bg-white border border-primary-lighter">
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary-lighter">
        <button
          type="button"
          onClick={goPrev}
          className="w-9 h-9 flex items-center justify-center border border-primary-lighter hover:bg-primary-darkest hover:border-primary-darkest hover:text-white transition-colors"
          aria-label="Vorige maand"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-heading text-base text-primary-darkest capitalize">
          {formatMonthYear(year, month)}
        </span>
        <button
          type="button"
          onClick={goNext}
          className="w-9 h-9 flex items-center justify-center border border-primary-lighter hover:bg-primary-darkest hover:border-primary-darkest hover:text-white transition-colors"
          aria-label="Volgende maand"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS_SHORT.map((d) => (
            <div key={d} className="text-center text-[10px] font-medium tracking-wider uppercase text-primary py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {loading
            ? Array.from({ length: totalDays }).map((_, i) => (
                <div key={`s-${i}`} className="aspect-square bg-gray-100 animate-pulse" />
              ))
            : Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1
                const dateStr = formatDateString(year, month, day)
                const status: BookingStatus = dayStatusMap[dateStr] || 'available'
                return (
                  <MiniCalendarDay
                    key={dateStr}
                    day={day}
                    status={status}
                    isToday={isTodayDate(dateStr)}
                    isPast={isPastDate(dateStr)}
                    isThursday={isThursdayDate(dateStr)}
                    isSelected={dateStr === value}
                    onClick={() => onSelect(dateStr, status)}
                  />
                )
              })}
        </div>
      </div>

      <div className="border-t border-primary-lighter px-3 py-2 flex flex-wrap gap-x-4 gap-y-1.5">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center gap-1.5 text-[11px] text-primary">
            <span className={`w-3 h-3 border ${item.bg} ${item.border} flex items-center justify-center`}>
              <span className={`w-1 h-1 rounded-full ${item.dot}`} />
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
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

  const handleDateSelect = (date: string, status: BookingStatus) => {
    setForm((f) => ({ ...f, date }))
    if (status === 'available' || status === 'limited') setAvailability('available')
    else if (status === 'option') setAvailability('available')
    else setAvailability('unavailable')
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

      <div className="space-y-3">
        <label className="text-sm font-medium text-primary-darkest flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Kies een datum
        </label>
        <AvailabilityPicker value={form.date} onSelect={handleDateSelect} />
        {form.date && availability === 'available' && (
          <p className="text-xs text-green-700 font-medium">
            Geselecteerd: {formatDisplayDate(form.date)} — we bevestigen je optie na aanvraag.
          </p>
        )}
        {form.date && availability === 'unavailable' && (
          <p className="text-xs text-red-700 font-medium">
            {formatDisplayDate(form.date)} is niet beschikbaar. Kies een andere datum.
          </p>
        )}
        {!form.date && (
          <p className="text-xs text-primary">Klik op een beschikbare dag in de kalender hierboven.</p>
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
