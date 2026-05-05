import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer'
import React from 'react'

export type DinnerType = 'three-course' | 'four-course' | 'shared'

export interface CalculatorPdfData {
  customerName: string
  weddingDate?: string
  dayGuests: number
  eveningGuests: number
  dinnerType: DinnerType
  discounts: string[]
  costs: {
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
  }
}

const DEAL_LABELS: Record<string, string> = {
  'bruiloft-2026': 'Trouwen in 2026 (30%)',
  winterdeal: 'Winterdeal okt-apr (50%)',
  zondag: 'Zondag trouwen (50%)',
}

function dinnerLabel(type: DinnerType): string {
  if (type === 'four-course') return '4-gangen diner'
  if (type === 'shared') return 'Shared diner'
  return '3-gangen diner'
}

function euro(n: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(n)
}

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, fontFamily: 'Helvetica', color: '#2c3a36' },
  header: { borderBottom: '2pt solid #b89968', paddingBottom: 16, marginBottom: 24 },
  brand: { fontSize: 9, letterSpacing: 2, color: '#b89968', marginBottom: 6 },
  title: { fontSize: 22, marginBottom: 4, color: '#1a2724' },
  subtitle: { fontSize: 10, color: '#5a6864' },
  meta: { marginBottom: 20, fontSize: 10 },
  metaRow: { flexDirection: 'row', marginBottom: 3 },
  metaLabel: { width: 110, color: '#5a6864' },
  metaValue: { color: '#1a2724', fontFamily: 'Helvetica-Bold' },
  sectionTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#1a2724', marginTop: 14, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottom: '0.5pt solid #e6e2d8' },
  label: { color: '#5a6864' },
  value: { color: '#1a2724' },
  subtotalRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f5f1e8', paddingVertical: 8, paddingHorizontal: 10, marginTop: 8 },
  subtotalLabel: { fontFamily: 'Helvetica-Bold', color: '#1a2724' },
  totalBox: { marginTop: 18, padding: 14, backgroundColor: '#1a2724', flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: '#fff' },
  totalValue: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#b89968' },
  perGuest: { flexDirection: 'row', marginTop: 12, gap: 10 },
  perGuestBox: { flex: 1, padding: 10, backgroundColor: '#f5f1e8' },
  perGuestLabel: { fontSize: 9, color: '#5a6864', marginBottom: 3 },
  perGuestValue: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: '#1a2724' },
  discount: { color: '#a04040' },
  strike: { textDecoration: 'line-through', color: '#8a8a8a' },
  footer: { position: 'absolute', bottom: 32, left: 48, right: 48, fontSize: 8, color: '#8a8a8a', textAlign: 'center', borderTop: '0.5pt solid #e6e2d8', paddingTop: 8 },
  disclaimer: { marginTop: 18, fontSize: 9, color: '#5a6864', fontStyle: 'italic' },
})

export function CalculatorPdf({ data }: { data: CalculatorPdfData }) {
  const { customerName, weddingDate, dayGuests, eveningGuests, dinnerType, discounts, costs } = data
  const today = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>VILLA 1855</Text>
          <Text style={styles.title}>Kostenindicatie bruiloft</Text>
          <Text style={styles.subtitle}>Een eerste schatting op maat — opgesteld op {today}</Text>
        </View>

        <View style={styles.meta}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Voor:</Text>
            <Text style={styles.metaValue}>{customerName}</Text>
          </View>
          {weddingDate && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Trouwdatum:</Text>
              <Text style={styles.metaValue}>{weddingDate}</Text>
            </View>
          )}
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Daggasten:</Text>
            <Text style={styles.metaValue}>{dayGuests}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Avondgasten:</Text>
            <Text style={styles.metaValue}>{eveningGuests}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Dinerkeuze:</Text>
            <Text style={styles.metaValue}>{dinnerLabel(dinnerType)}</Text>
          </View>
          {discounts.length > 0 && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Kortingen:</Text>
              <Text style={styles.metaValue}>{discounts.map((d) => DEAL_LABELS[d] || d).join(', ')}</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Dagprogramma</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Borrelplank</Text>
          <Text style={styles.value}>{euro(costs.borrelplank)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dranken dagprogramma</Text>
          <Text style={styles.value}>{euro(costs.drinksDay)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{dinnerLabel(dinnerType)}</Text>
          <Text style={styles.value}>{euro(costs.dinner)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Feestavond</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Hapjesarrangement</Text>
          <Text style={styles.value}>{euro(costs.partyFood)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dranken avondprogramma</Text>
          <Text style={styles.value}>{euro(costs.drinksEvening)}</Text>
        </View>

        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotaal arrangementen</Text>
          <Text style={styles.subtotalLabel}>{euro(costs.subtotal)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Huur villa</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Standaard huur (incl. btw)</Text>
          <Text style={costs.discount > 0 ? styles.strike : styles.value}>{euro(costs.houseRentalOriginal)}</Text>
        </View>
        {costs.discount > 0 && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Korting</Text>
              <Text style={styles.discount}>-{euro(costs.discount)}</Text>
            </View>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Huur na korting</Text>
              <Text style={styles.subtotalLabel}>{euro(costs.houseRental)}</Text>
            </View>
          </>
        )}

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Totale kosten</Text>
          <Text style={styles.totalValue}>{euro(costs.total)}</Text>
        </View>

        {(costs.costPerDayGuest > 0 || costs.costPerEveningGuest > 0) && (
          <View style={styles.perGuest}>
            {costs.costPerDayGuest > 0 && (
              <View style={styles.perGuestBox}>
                <Text style={styles.perGuestLabel}>Per daggast</Text>
                <Text style={styles.perGuestValue}>{euro(costs.costPerDayGuest)}</Text>
              </View>
            )}
            {costs.costPerEveningGuest > 0 && (
              <View style={styles.perGuestBox}>
                <Text style={styles.perGuestLabel}>Per avondgast</Text>
                <Text style={styles.perGuestValue}>{euro(costs.costPerEveningGuest)}</Text>
              </View>
            )}
          </View>
        )}

        <Text style={styles.disclaimer}>
          Deze berekening is een eerste indicatie. De definitieve offerte stellen wij persoonlijk met jullie op,
          afgestemd op jullie wensen en de specifieke datum. Aan deze indicatie kunnen geen rechten worden ontleend.
        </Text>

        <Text style={styles.footer}>
          Villa 1855  •  info@villa1855.nl  •  villa1855.nl
        </Text>
      </Page>
    </Document>
  )
}

export async function generateCalculatorPdf(data: CalculatorPdfData): Promise<Buffer> {
  return await renderToBuffer(<CalculatorPdf data={data} />)
}
