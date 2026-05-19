import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'
import fs from 'node:fs'
import path from 'node:path'

interface ContactData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

const subjectLabels: Record<string, string> = {
  bruiloft: 'Bruiloft',
  zakelijk: 'Zakelijk event',
  bezichtiging: 'Bezichtiging aanvragen',
  brochure: 'Brochure aanvraag',
  anders: 'Anders',
}

async function getGoogleSheetsClient() {
  const credentialsBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentialsBase64) {
    throw new Error('Google Service Account credentials not configured')
  }

  const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'))

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

// Probeer de brochure-PDF van disk te lezen. Komt later — als bestand ontbreekt,
// vallen we automatisch terug op "Lotte stuurt 'm persoonlijk" flow.
let brochureBufferCache: Buffer | null = null
let brochureLoadAttempted = false
function getBrochureBuffer(): Buffer | null {
  if (brochureLoadAttempted) return brochureBufferCache
  brochureLoadAttempted = true
  try {
    const brochurePath = path.join(process.cwd(), 'public', 'brochures', 'villa1855-trouwen.pdf')
    brochureBufferCache = fs.readFileSync(brochurePath)
    return brochureBufferCache
  } catch {
    return null
  }
}

function customerAutoReplyHtml(data: ContactData, brochureAttached: boolean): string {
  const isBrochure = data.subject === 'brochure'
  const title = isBrochure ? 'Jullie trouwbrochure komt eraan!' : 'We hebben je bericht ontvangen'
  const intro = isBrochure
    ? (brochureAttached
        ? 'Bedankt voor jullie interesse in Villa 1855. In de bijlage vinden jullie onze trouwbrochure met alle informatie. Ik neem binnen één werkdag persoonlijk contact op om jullie wensen te bespreken en eventueel een vrijblijvende kennismaking in te plannen.'
        : 'Bedankt voor jullie interesse in Villa 1855. Ik stuur jullie persoonlijk de brochure toe en neem binnen één werkdag contact op om jullie wensen te bespreken.')
    : 'Bedankt voor je bericht. Ik kijk er even goed naar en neem binnen één werkdag contact met je op.'

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F1E8;font-family:Helvetica,Arial,sans-serif;color:#102B2A;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="padding:40px 40px 24px;border-bottom:2px solid #B58C67;">
      <p style="font-size:11px;letter-spacing:2px;color:#B58C67;margin:0;text-transform:uppercase;">Villa 1855</p>
      <h1 style="font-size:24px;margin:8px 0 0;line-height:1.2;color:#102B2A;">${title}</h1>
    </div>

    <div style="padding:32px 40px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hallo ${data.name},</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">${intro}</p>

      <div style="background:#F5F1E8;padding:20px;margin:24px 0;border-left:3px solid #B58C67;">
        <p style="margin:0 0 8px;font-size:14px;color:#5A6864;"><em>Jullie aanspreekpunt:</em></p>
        <p style="margin:0;font-size:16px;font-weight:bold;color:#102B2A;">Lotte Willems</p>
        <p style="margin:4px 0 0;font-size:14px;color:#5A6864;">Heb je iets dringends? Bel gerust direct: <a href="tel:+310852736709" style="color:#B58C67;text-decoration:none;">085 273 6709</a></p>
      </div>

      <p style="margin:24px 0 8px;font-size:15px;line-height:1.6;">Tot snel!</p>
      <p style="margin:0;font-size:15px;line-height:1.6;">Lotte &amp; team Villa 1855</p>
    </div>

    <div style="padding:24px 40px;background:#102B2A;color:#9FADAD;text-align:center;">
      <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;">
        Villa 1855 &nbsp;·&nbsp; Noordstraat 36, Tilburg &nbsp;·&nbsp; <a href="mailto:info@villa1855.nl" style="color:#B58C67;text-decoration:none;">info@villa1855.nl</a>
      </p>
      <p style="margin:8px 0 0;font-size:11px;color:#6F8281;">
        <a href="https://www.villa1855.nl" style="color:#6F8281;text-decoration:none;">villa1855.nl</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function notificationEmailHtml(data: ContactData): string {
  const subjectLabel = data.subject ? subjectLabels[data.subject] || data.subject : 'Algemeen'
  return `<!DOCTYPE html>
<html lang="nl">
<body style="font-family:Helvetica,Arial,sans-serif;color:#1a2724;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="border-bottom:2px solid #B58C67;padding-bottom:8px;">Nieuwe ${subjectLabel.toLowerCase()}-aanvraag</h2>
  <table style="border-collapse:collapse;width:100%;margin-top:16px;">
    <tr><td style="padding:6px 0;color:#5a6864;width:120px;">Naam</td><td style="padding:6px 0;"><strong>${data.name}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">E-mail</td><td style="padding:6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">Telefoon</td><td style="padding:6px 0;">${data.phone || '-'}</td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">Onderwerp</td><td style="padding:6px 0;">${subjectLabel}</td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;vertical-align:top;">Bericht</td><td style="padding:6px 0;white-space:pre-wrap;">${data.message.replace(/\n/g, '<br/>')}</td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json()

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Vul alle verplichte velden in.' },
        { status: 400 }
      )
    }

    const subjectLabel = data.subject ? subjectLabels[data.subject] || data.subject : 'Algemeen'

    // Get current timestamp
    const timestamp = new Date().toLocaleString('nl-NL', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.phone || '',
      subjectLabel,
      data.message,
    ]

    // 1. Log to Google Sheet (non-fatal if fails)
    try {
      const sheets = await getGoogleSheetsClient()
      const spreadsheetId = process.env.GOOGLE_SHEET_ID
      if (spreadsheetId) {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Contact!A:F',
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [rowData] },
        })
      }
    } catch (sheetError) {
      console.error('Sheet logging failed (non-fatal):', sheetError)
    }

    // 2. Send mails via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const fromAddress = process.env.RESEND_FROM_EMAIL || 'Villa 1855 <info@villa1855.nl>'
      const notifyTo = process.env.NOTIFY_EMAIL || 'info@villa1855.nl'

      const isBrochure = data.subject === 'brochure'
      const brochureBuffer = isBrochure ? getBrochureBuffer() : null
      const brochureAttached = brochureBuffer !== null

      const customerSubject = isBrochure
        ? (brochureAttached
            ? 'Jullie trouwbrochure — Villa 1855'
            : 'Jullie trouwbrochure komt eraan — Villa 1855')
        : 'We hebben je bericht ontvangen — Villa 1855'

      // Customer auto-reply
      try {
        await resend.emails.send({
          from: fromAddress,
          to: data.email,
          replyTo: notifyTo,
          subject: customerSubject,
          html: customerAutoReplyHtml(data, brochureAttached),
          attachments: brochureBuffer
            ? [{ filename: 'villa1855-trouwbrochure.pdf', content: brochureBuffer.toString('base64') }]
            : undefined,
        })
      } catch (mailError) {
        console.error('Customer auto-reply failed (non-fatal):', mailError)
      }

      // Internal notification
      try {
        await resend.emails.send({
          from: fromAddress,
          to: notifyTo,
          replyTo: data.email,
          subject: `${subjectLabel}-aanvraag: ${data.name}`,
          html: notificationEmailHtml(data),
        })
      } catch (mailError) {
        console.error('Notification email failed (non-fatal):', mailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Bedankt voor je bericht! We nemen binnen 1 werkdag contact met je op.',
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
