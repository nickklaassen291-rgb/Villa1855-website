import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'
import { generateCalculatorPdf, type CalculatorPdfData, type DinnerType } from '@/lib/calculator-pdf'

export const runtime = 'nodejs'
export const maxDuration = 30

interface CalculatorSendData {
  name: string
  email: string
  phone?: string
  weddingDate?: string
  message?: string
  dayGuests: number
  eveningGuests: number
  dinnerType: DinnerType
  discounts: string[]
  costs: CalculatorPdfData['costs']
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
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

async function getGoogleSheetsClient() {
  const credentialsBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentialsBase64) throw new Error('Google Service Account credentials not configured')
  const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'))
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

async function logToSheet(data: CalculatorSendData) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  if (!spreadsheetId) return

  const timestamp = new Date().toLocaleString('nl-NL', { dateStyle: 'short', timeStyle: 'short' })
  const formattedDate = data.weddingDate
    ? new Date(data.weddingDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  const rowData = [
    timestamp,
    data.name,
    data.email,
    data.phone || '',
    formattedDate,
    String(data.dayGuests),
    String(data.eveningGuests),
    dinnerLabel(data.dinnerType),
    data.discounts.map((d) => DEAL_LABELS[d] || d).join(', '),
    euro(data.costs.subtotal),
    euro(data.costs.houseRental),
    euro(data.costs.discount),
    euro(data.costs.total),
    data.message || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
  ]

  const sheets = await getGoogleSheetsClient()
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Calculator!A:Q',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [rowData] },
  })
}

function customerEmailHtml(data: CalculatorSendData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><title>Jullie kostenindicatie</title></head>
<body style="font-family: Helvetica, Arial, sans-serif; color: #1a2724; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="border-bottom: 2px solid #b89968; padding-bottom: 12px; margin-bottom: 24px;">
    <p style="font-size: 11px; letter-spacing: 2px; color: #b89968; margin: 0;">VILLA 1855</p>
    <h1 style="font-size: 22px; margin: 4px 0 0;">Jullie kostenindicatie</h1>
  </div>
  <p>Hallo ${data.name},</p>
  <p>Bedankt voor het samenstellen van jullie bruiloft via onze online calculator. In de bijlage vinden jullie een PDF met de volledige berekening.</p>

  <div style="background: #f5f1e8; padding: 16px; margin: 20px 0;">
    <p style="margin: 0 0 8px;"><strong>Korte samenvatting:</strong></p>
    <p style="margin: 0;">Daggasten: ${data.dayGuests} &nbsp;•&nbsp; Avondgasten: ${data.eveningGuests}</p>
    <p style="margin: 4px 0;">${dinnerLabel(data.dinnerType)}</p>
    <p style="margin: 8px 0 0; font-size: 18px;"><strong>Totaal: ${euro(data.costs.total)}</strong></p>
  </div>

  <p>Deze berekening is een eerste indicatie. De definitieve offerte stellen wij graag persoonlijk met jullie op, afgestemd op jullie wensen.</p>

  <p>Wil je een afspraak inplannen of heb je vragen? Reageer op deze e-mail of plan een bezichtiging via <a href="https://villa1855.nl/contact" style="color: #b89968;">villa1855.nl/contact</a>.</p>

  <p>Hartelijke groet,<br/>Team Villa 1855</p>

  <hr style="border: none; border-top: 1px solid #e6e2d8; margin: 24px 0;"/>
  <p style="font-size: 11px; color: #8a8a8a; text-align: center; margin: 0;">
    Villa 1855 &nbsp;•&nbsp; info@villa1855.nl &nbsp;•&nbsp; villa1855.nl
  </p>
</body>
</html>`
}

function notificationEmailHtml(data: CalculatorSendData): string {
  const formattedDate = data.weddingDate
    ? new Date(data.weddingDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
    : '-'
  return `
<!DOCTYPE html>
<html lang="nl"><body style="font-family: Helvetica, Arial, sans-serif; color: #1a2724; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h2>Nieuwe calculator-aanvraag</h2>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 6px 0; color: #5a6864;">Naam</td><td style="padding: 6px 0;"><strong>${data.name}</strong></td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">E-mail</td><td style="padding: 6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">Telefoon</td><td style="padding: 6px 0;">${data.phone || '-'}</td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">Trouwdatum</td><td style="padding: 6px 0;">${formattedDate}</td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">Daggasten</td><td style="padding: 6px 0;">${data.dayGuests}</td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">Avondgasten</td><td style="padding: 6px 0;">${data.eveningGuests}</td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">Diner</td><td style="padding: 6px 0;">${dinnerLabel(data.dinnerType)}</td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">Kortingen</td><td style="padding: 6px 0;">${data.discounts.map((d) => DEAL_LABELS[d] || d).join(', ') || '-'}</td></tr>
    <tr><td style="padding: 6px 0; color: #5a6864;">Totaal</td><td style="padding: 6px 0;"><strong>${euro(data.costs.total)}</strong></td></tr>
    ${data.message ? `<tr><td style="padding: 6px 0; color: #5a6864; vertical-align: top;">Bericht</td><td style="padding: 6px 0;">${data.message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
  </table>
  <p style="margin-top: 16px; font-size: 12px; color: #8a8a8a;">PDF met volledige berekening zit als bijlage. Klant heeft een eigen kopie ontvangen.</p>
</body></html>`
}

export async function POST(request: NextRequest) {
  try {
    const data: CalculatorSendData = await request.json()

    if (!data.name || !data.email || !data.costs || typeof data.costs.total !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Vul alle verplichte velden in.' },
        { status: 400 }
      )
    }

    const resendKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Villa 1855 <noreply@villa1855.nl>'
    const notifyTo = process.env.NOTIFY_EMAIL || 'info@villa1855.nl'

    if (!resendKey) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { success: false, message: 'E-mailservice niet geconfigureerd.' },
        { status: 500 }
      )
    }

    const formattedDate = data.weddingDate
      ? new Date(data.weddingDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
      : undefined

    const pdfBuffer = await generateCalculatorPdf({
      customerName: data.name,
      weddingDate: formattedDate,
      dayGuests: data.dayGuests,
      eveningGuests: data.eveningGuests,
      dinnerType: data.dinnerType,
      discounts: data.discounts,
      costs: data.costs,
    })

    const pdfBase64 = pdfBuffer.toString('base64')
    const filename = `villa1855-kostenindicatie-${data.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`

    const resend = new Resend(resendKey)

    const customerResult = await resend.emails.send({
      from: fromAddress,
      to: data.email,
      replyTo: notifyTo,
      subject: 'Jullie kostenindicatie van Villa 1855',
      html: customerEmailHtml(data),
      attachments: [{ filename, content: pdfBase64 }],
    })

    if (customerResult.error) {
      console.error('Customer email failed:', customerResult.error)
      return NextResponse.json(
        { success: false, message: 'Kon e-mail niet versturen. Probeer het later opnieuw.' },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: fromAddress,
      to: notifyTo,
      replyTo: data.email,
      subject: `Calculator-aanvraag: ${data.name} (${euro(data.costs.total)})`,
      html: notificationEmailHtml(data),
      attachments: [{ filename, content: pdfBase64 }],
    })

    try {
      await logToSheet(data)
    } catch (sheetError) {
      console.error('Sheet logging failed (non-fatal):', sheetError)
    }

    return NextResponse.json({
      success: true,
      message: 'De berekening is verstuurd naar je e-mail.',
    })
  } catch (error) {
    console.error('Calculator send error:', error)
    return NextResponse.json(
      { success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
