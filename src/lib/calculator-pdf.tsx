// ============================================================================
// Villa 1855 — Kostenindicatie bruiloft (PDF)
//
// Wordt aangeroepen vanuit src/app/api/calculator/send/route.ts via
// generateCalculatorPdf(legacyData) — die converteert naar de nieuwe
// OfferteData en rendert via CalculatorPDF.
// ============================================================================

import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer"
import React from "react"
import fs from "node:fs"
import path from "node:path"

// ============================================================================
// FONTS — Lora (serif) + Public Sans (sans), 2 fonts max per brand guide
// Fontsource CDN levert betrouwbare TTF-files voor react-pdf.
// ============================================================================

Font.register({
  family: "Lora",
  fonts: [
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/lora@latest/latin-400-normal.ttf", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/lora@latest/latin-500-normal.ttf", fontWeight: 500 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/lora@latest/latin-400-italic.ttf", fontWeight: 400, fontStyle: "italic" },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/lora@latest/latin-500-italic.ttf", fontWeight: 500, fontStyle: "italic" },
  ],
})

Font.register({
  family: "Public Sans",
  fonts: [
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/public-sans@latest/latin-400-normal.ttf", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/public-sans@latest/latin-500-normal.ttf", fontWeight: 500 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/public-sans@latest/latin-700-normal.ttf", fontWeight: 700 },
  ],
})

// Voorkomt dat react-pdf woorden afbreekt met hyphens
Font.registerHyphenationCallback((word) => [word])

// ============================================================================
// BRAND TOKENS
// ============================================================================

const COLOR = {
  donkerGroen: "#102B2A",
  koper: "#B58C67",
  koperDeep: "#8E6A48",
  zand: "#F5F1E8",
  zandDeep: "#EBE5D4",
  grijs: "#5A6864",
  grijsSoft: "#8C9794",
  rule: "#D8D2C0",
  wit: "#FFFFFF",
} as const

// ============================================================================
// TYPES — nieuwe OfferteData (gebruikt door CalculatorPDF)
// ============================================================================

export interface OfferteRegel {
  label: string
  amount: number
}

export interface OfferteData {
  customerName: string
  weddingDate: string
  dayGuests: number
  eveningGuests: number
  generatedDate: string
  dayProgram: OfferteRegel[]
  eveningProgram: OfferteRegel[]
  rentalStandard: number
  discount?: {
    name: string
    amount: number
  } | null
  /** Optioneel — als niet opgegeven wordt logo-pdf.png van disk gelezen */
  logoSrc?: string
}

// ============================================================================
// TYPES — legacy CalculatorPdfData (gebruikt door /api/calculator/send/route.ts)
// ============================================================================

export type DinnerType = 'three-course' | 'four-course' | 'shared'
export type ReceptionType = 'a' | 'b'
export type PartyFoodType = 'a' | 'b'
export type LateNightType = 'none' | 'a' | 'b' | 'c'

export interface CalculatorPdfData {
  customerName: string
  weddingDate?: string
  dayGuests: number
  eveningGuests: number
  receptionType: ReceptionType
  dinnerType: DinnerType
  partyFoodType: PartyFoodType
  lateNightType: LateNightType
  discounts: string[]
  costs: {
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
  }
}

const DEAL_LABELS: Record<string, string> = {
  'bruiloft-2026': 'Trouwen in 2026 (50%)',
  winterdeal: 'Winterdeal okt-apr (25%)',
  zondag: 'Zondag trouwen (25%)',
}

function dinnerLabel(type: DinnerType): string {
  if (type === 'four-course') return '4-gangen diner'
  if (type === 'shared') return 'Shared diner'
  return '3-gangen diner'
}

function receptionLabel(type: ReceptionType): string {
  if (type === 'b') return 'Hapjes assortiment borrel | tafelgarnituur en 2 luxe hapjes'
  return 'Borrelplanken'
}

function partyFoodLabel(type: PartyFoodType): string {
  if (type === 'b') return 'Hapjes assortiment feestavond | luxe | tafelgarnituur | 3 bites | 3 gefrituurd'
  return 'Hapjes assortiment feestavond | basis | tafelgarnituur | 2 bites | 4 gefrituurd'
}

function lateNightLabel(type: LateNightType): string {
  if (type === 'a') return 'Worstenbroodje'
  if (type === 'b') return 'Puntzak friet'
  if (type === 'c') return 'Midi burger'
  return ''
}

// ============================================================================
// HELPERS
// ============================================================================

const euroFormatter = new Intl.NumberFormat("nl-NL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const fmtEuro = (n: number) => `€ ${euroFormatter.format(n)}`
const fmtEuroBig = (n: number) => euroFormatter.format(n)

// Logo wordt vanuit disk gelezen; WebP-bestanden in public werken niet
// met react-pdf, dus public/images/logo-pdf.png is een echte PNG.
let logoBufferCache: Buffer | null = null
function getLogoBuffer(): Buffer | null {
  if (logoBufferCache) return logoBufferCache
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo-pdf.png')
    logoBufferCache = fs.readFileSync(logoPath)
    return logoBufferCache
  } catch {
    return null
  }
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLOR.wit,
    paddingTop: 44,
    paddingBottom: 56,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Public Sans",
    fontSize: 10,
    color: COLOR.donkerGroen,
    lineHeight: 1.5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.rule,
    borderBottomStyle: "solid",
    marginBottom: 22,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerMeta: {
    textAlign: "right",
  },
  headerKicker: {
    fontFamily: "Public Sans",
    fontWeight: 700,
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: COLOR.donkerGroen,
    marginBottom: 4,
  },
  headerDate: {
    fontFamily: "Public Sans",
    fontWeight: 400,
    fontSize: 9,
    color: COLOR.grijs,
    letterSpacing: 0.5,
  },

  titleBlock: {
    marginBottom: 22,
  },
  title: {
    fontFamily: "Lora",
    fontWeight: 400,
    fontSize: 26,
    color: COLOR.donkerGroen,
    lineHeight: 1.15,
    marginBottom: 6,
  },
  titleItalic: {
    fontFamily: "Lora",
    fontWeight: 500,
    fontStyle: "italic",
    color: COLOR.koper,
  },
  lead: {
    fontFamily: "Lora",
    fontStyle: "italic",
    fontSize: 11,
    color: COLOR.grijs,
  },

  klant: {
    flexDirection: "row",
    backgroundColor: COLOR.zand,
    padding: 14,
    paddingLeft: 18,
    marginBottom: 22,
    borderLeftWidth: 2,
    borderLeftColor: COLOR.koper,
    borderLeftStyle: "solid",
  },
  klantCol: {
    flex: 1,
    paddingRight: 10,
  },
  klantLabel: {
    fontFamily: "Public Sans",
    fontWeight: 700,
    fontSize: 7.5,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: COLOR.grijs,
    marginBottom: 4,
  },
  klantValue: {
    fontFamily: "Lora",
    fontWeight: 400,
    fontSize: 13,
    color: COLOR.donkerGroen,
    lineHeight: 1.2,
  },

  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 4,
  },
  sectionLabel: {
    fontFamily: "Public Sans",
    fontWeight: 700,
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: COLOR.donkerGroen,
    marginRight: 10,
  },
  sectionLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: COLOR.koper,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.rule,
    borderBottomStyle: "dotted",
  },
  rowDesc: {
    fontFamily: "Public Sans",
    fontWeight: 400,
    fontSize: 10,
    color: COLOR.donkerGroen,
    flex: 1,
    paddingRight: 12,
  },
  rowAmount: {
    fontFamily: "Public Sans",
    fontWeight: 500,
    fontSize: 10,
    color: COLOR.donkerGroen,
  },

  rowStrikeDesc: {
    fontFamily: "Public Sans",
    fontWeight: 400,
    fontSize: 10,
    color: COLOR.grijsSoft,
    textDecoration: "line-through",
    flex: 1,
    paddingRight: 12,
  },
  rowStrikeAmount: {
    fontFamily: "Public Sans",
    fontWeight: 500,
    fontSize: 10,
    color: COLOR.grijsSoft,
    textDecoration: "line-through",
  },

  rowDiscountDesc: {
    fontFamily: "Public Sans",
    fontWeight: 500,
    fontSize: 10,
    color: COLOR.koper,
    flex: 1,
    paddingRight: 12,
  },
  rowDiscountAmount: {
    fontFamily: "Public Sans",
    fontWeight: 500,
    fontSize: 10,
    color: COLOR.koper,
  },

  subtotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: COLOR.zand,
    marginTop: 6,
  },
  subtotalDesc: {
    fontFamily: "Public Sans",
    fontWeight: 700,
    fontSize: 9.5,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: COLOR.donkerGroen,
  },
  subtotalAmount: {
    fontFamily: "Lora",
    fontWeight: 500,
    fontSize: 13,
    color: COLOR.donkerGroen,
  },

  totalBand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: COLOR.donkerGroen,
    marginTop: 10,
  },
  totalBandDesc: {
    fontFamily: "Public Sans",
    fontWeight: 700,
    fontSize: 10,
    letterSpacing: 2.2,
    textTransform: "uppercase",
    color: COLOR.koper,
  },
  totalBandAmount: {
    fontFamily: "Lora",
    fontWeight: 500,
    fontSize: 18,
    color: COLOR.koper,
  },
  totalBandCurrency: {
    fontFamily: "Lora",
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginRight: 2,
  },

  perGast: {
    flexDirection: "row",
    marginTop: 6,
  },
  perGastTile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: COLOR.zand,
  },
  perGastTileLeft: {
    marginRight: 6,
  },
  perGastLabel: {
    fontFamily: "Public Sans",
    fontWeight: 700,
    fontSize: 9,
    letterSpacing: 2.2,
    textTransform: "uppercase",
    color: COLOR.grijs,
  },
  perGastValue: {
    fontFamily: "Lora",
    fontWeight: 500,
    fontSize: 14,
    color: COLOR.donkerGroen,
  },
  perGastCurrency: {
    fontFamily: "Lora",
    fontSize: 11,
    color: COLOR.grijsSoft,
    marginRight: 2,
  },

  disclaimer: {
    marginTop: 22,
    fontFamily: "Lora",
    fontStyle: "italic",
    fontSize: 8.5,
    lineHeight: 1.55,
    color: COLOR.grijs,
    maxWidth: "90%",
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: COLOR.rule,
    borderTopStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    fontFamily: "Public Sans",
    fontWeight: 500,
    fontSize: 8,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: COLOR.grijs,
  },
  footerRight: {
    fontFamily: "Public Sans",
    fontWeight: 500,
    fontSize: 8,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: COLOR.koper,
  },
})

// ============================================================================
// COMPONENT
// ============================================================================

interface Props {
  data: OfferteData
}

export function CalculatorPDF({ data }: Props) {
  const subtotalArrangementen =
    data.dayProgram.reduce((sum, r) => sum + r.amount, 0) +
    data.eveningProgram.reduce((sum, r) => sum + r.amount, 0)

  const huurNaKorting = data.discount
    ? data.rentalStandard - data.discount.amount
    : data.rentalStandard

  const totaal = subtotalArrangementen + huurNaKorting

  const perDaggast = data.dayGuests > 0 ? totaal / data.dayGuests : 0
  const perAvondgast = data.eveningGuests > 0 ? totaal / data.eveningGuests : 0

  return (
    <Document
      title={`Kostenindicatie bruiloft — ${data.customerName}`}
      author="Villa 1855"
      subject="Eerste kostenindicatie voor uw dag bij Villa 1855"
    >
      <Page size="A4" style={styles.page} wrap={false}>

        <View style={styles.header} fixed>
          {(() => {
            const logoSrc = data.logoSrc || getLogoBuffer()
            return logoSrc ? <Image src={logoSrc as any} style={styles.logo} /> : null
          })()}
          <View style={styles.headerMeta}>
            <Text style={styles.headerKicker}>Kostenindicatie bruiloft bij Villa 1855</Text>
            <Text style={styles.headerDate}>Opgesteld op {data.generatedDate}</Text>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            Een eerste <Text style={styles.titleItalic}>schatting</Text> op maat.
          </Text>
          <Text style={styles.lead}>
            Een vrijblijvende indicatie van de kosten voor jullie dag bij Villa 1855.
          </Text>
        </View>

        <View style={styles.klant}>
          <View style={styles.klantCol}>
            <Text style={styles.klantLabel}>Voor</Text>
            <Text style={styles.klantValue}>{data.customerName}</Text>
          </View>
          <View style={styles.klantCol}>
            <Text style={styles.klantLabel}>Trouwdatum</Text>
            <Text style={styles.klantValue}>{data.weddingDate}</Text>
          </View>
          <View style={styles.klantCol}>
            <Text style={styles.klantLabel}>Daggasten</Text>
            <Text style={styles.klantValue}>{data.dayGuests} personen</Text>
          </View>
          <View style={styles.klantCol}>
            <Text style={styles.klantLabel}>Avondgasten</Text>
            <Text style={styles.klantValue}>{data.eveningGuests} personen</Text>
          </View>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionLabel}>Dagprogramma</Text>
          <View style={styles.sectionLine} />
        </View>

        {data.dayProgram.map((regel, i) => (
          <View key={`day-${i}`} style={styles.row}>
            <Text style={styles.rowDesc}>{regel.label}</Text>
            <Text style={styles.rowAmount}>{fmtEuro(regel.amount)}</Text>
          </View>
        ))}

        <View style={styles.sectionHead}>
          <Text style={styles.sectionLabel}>Feestavond</Text>
          <View style={styles.sectionLine} />
        </View>

        {data.eveningProgram.map((regel, i) => (
          <View key={`eve-${i}`} style={styles.row}>
            <Text style={styles.rowDesc}>{regel.label}</Text>
            <Text style={styles.rowAmount}>{fmtEuro(regel.amount)}</Text>
          </View>
        ))}

        <View style={styles.subtotal}>
          <Text style={styles.subtotalDesc}>Subtotaal arrangementen</Text>
          <Text style={styles.subtotalAmount}>{fmtEuro(subtotalArrangementen)}</Text>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionLabel}>Huur villa</Text>
          <View style={styles.sectionLine} />
        </View>

        {data.discount ? (
          <>
            <View style={styles.row}>
              <Text style={styles.rowStrikeDesc}>Standaard huur (incl. btw)</Text>
              <Text style={styles.rowStrikeAmount}>{fmtEuro(data.rentalStandard)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowDiscountDesc}>Korting: {data.discount.name}</Text>
              <Text style={styles.rowDiscountAmount}>− {fmtEuro(data.discount.amount)}</Text>
            </View>
            <View style={styles.subtotal}>
              <Text style={styles.subtotalDesc}>Huur na korting</Text>
              <Text style={styles.subtotalAmount}>{fmtEuro(huurNaKorting)}</Text>
            </View>
          </>
        ) : (
          <View style={styles.row}>
            <Text style={styles.rowDesc}>Standaard huur (incl. btw)</Text>
            <Text style={styles.rowAmount}>{fmtEuro(data.rentalStandard)}</Text>
          </View>
        )}

        <View style={styles.totalBand}>
          <Text style={styles.totalBandDesc}>Totale kosten</Text>
          <Text style={styles.totalBandAmount}>
            <Text style={styles.totalBandCurrency}>€ </Text>
            {fmtEuroBig(totaal)}
          </Text>
        </View>

        <View style={styles.perGast}>
          <View style={[styles.perGastTile, styles.perGastTileLeft]}>
            <Text style={styles.perGastLabel}>Per daggast</Text>
            <Text style={styles.perGastValue}>
              <Text style={styles.perGastCurrency}>€ </Text>
              {fmtEuroBig(perDaggast)}
            </Text>
          </View>
          <View style={styles.perGastTile}>
            <Text style={styles.perGastLabel}>Per avondgast</Text>
            <Text style={styles.perGastValue}>
              <Text style={styles.perGastCurrency}>€ </Text>
              {fmtEuroBig(perAvondgast)}
            </Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Deze berekening is een eerste indicatie, gebaseerd op de keuzes uit onze
          online kostencalculator. De definitieve offerte stellen we persoonlijk
          met jullie op, afgestemd op jullie wensen en de specifieke datum. Aan
          deze indicatie kunnen geen rechten worden ontleend.
        </Text>

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>Villa 1855 — Noordstraat 36, Tilburg</Text>
          <Text style={styles.footerRight}>info@villa1855.nl · villa1855.nl</Text>
        </View>

      </Page>
    </Document>
  )
}

// Backwards-compat alias zodat oude imports blijven werken
export const CalculatorPdf = CalculatorPDF

// ============================================================================
// LEGACY ADAPTER — converteert CalculatorPdfData → OfferteData
// ============================================================================

function convertLegacyData(data: CalculatorPdfData): OfferteData {
  const dayProgram: OfferteRegel[] = [
    { label: 'Dranken dagprogramma', amount: data.costs.drinksDay },
    { label: receptionLabel(data.receptionType), amount: data.costs.reception },
    { label: dinnerLabel(data.dinnerType), amount: data.costs.dinner },
  ]

  const eveningProgram: OfferteRegel[] = [
    { label: 'Dranken avondprogramma', amount: data.costs.drinksEvening },
    { label: partyFoodLabel(data.partyFoodType), amount: data.costs.partyFood },
  ]
  if (data.lateNightType !== 'none') {
    eveningProgram.push({ label: lateNightLabel(data.lateNightType), amount: data.costs.lateNight })
  }

  const discountName = data.discounts.length > 0
    ? data.discounts.map((d) => DEAL_LABELS[d] || d).join(' + ')
    : null

  const discount = data.costs.discount > 0 && discountName
    ? { name: discountName, amount: data.costs.discount }
    : null

  const today = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return {
    customerName: data.customerName,
    weddingDate: data.weddingDate || '—',
    dayGuests: data.dayGuests,
    eveningGuests: data.eveningGuests,
    generatedDate: today,
    dayProgram,
    eveningProgram,
    rentalStandard: data.costs.houseRentalOriginal,
    discount,
  }
}

export async function generateCalculatorPdf(data: CalculatorPdfData): Promise<Buffer> {
  const offerteData = convertLegacyData(data)
  return await renderToBuffer(<CalculatorPDF data={offerteData} />)
}

// ============================================================================
// SAMPLE DATA — voor lokale tests
// ============================================================================

export const sampleOfferteData: OfferteData = {
  customerName: 'Familie Jansen',
  weddingDate: '15 augustus 2027',
  dayGuests: 60,
  eveningGuests: 100,
  generatedDate: '18 mei 2026',
  dayProgram: [
    { label: 'Dranken dagprogramma', amount: 900 },
    { label: 'Borrelplanken', amount: 720 },
    { label: '3-gangen diner', amount: 4200 },
  ],
  eveningProgram: [
    { label: 'Dranken avondprogramma', amount: 1250 },
    { label: 'Hapjes assortiment feestavond | luxe | tafelgarnituur | 3 bites | 3 gefrituurd', amount: 840 },
    { label: 'Worstenbroodje', amount: 480 },
  ],
  rentalStandard: 5000,
  discount: {
    name: 'Trouwen in 2026 (50%)',
    amount: 2500,
  },
}

export default CalculatorPDF
