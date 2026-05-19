import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'

interface RegistrationData {
  names: string
  email: string
  phone: string
  weddingDate?: string
  timeSlot: string
  guestCount?: string
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

const OPEN_DAY_DATE = 'zondag 28 juni 2026'

function customerAutoReplyHtml(data: RegistrationData, timeSlotLabel: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><title>Bedankt voor jullie aanmelding</title></head>
<body style="margin:0;padding:0;background-color:#F5F1E8;font-family:Helvetica,Arial,sans-serif;color:#102B2A;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="padding:40px 40px 24px;border-bottom:2px solid #B58C67;">
      <p style="font-size:11px;letter-spacing:2px;color:#B58C67;margin:0;text-transform:uppercase;">Villa 1855 — Open Dag</p>
      <h1 style="font-size:24px;margin:8px 0 0;line-height:1.2;color:#102B2A;">Bedankt voor jullie aanmelding!</h1>
    </div>

    <div style="padding:32px 40px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hallo ${data.names},</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">Wat leuk dat jullie langskomen op onze Open Dag. Jullie tijdslot is gereserveerd — hieronder de praktische info zodat jullie weten waar en hoe laat.</p>

      <div style="background:#F5F1E8;padding:20px;margin:24px 0;border-left:3px solid #B58C67;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;color:#5A6864;text-transform:uppercase;">Jullie reservering</p>
        <p style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#102B2A;">${OPEN_DAY_DATE}</p>
        <p style="margin:0;font-size:15px;color:#102B2A;">Tijdslot: ${timeSlotLabel}</p>
      </div>

      <h2 style="font-size:16px;margin:24px 0 8px;color:#102B2A;">Adres &amp; bereikbaarheid</h2>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#5A6864;">
        Villa 1855<br>
        Noordstraat 36, Tilburg (centrum)
      </p>
      <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#5A6864;">
        <strong>Auto:</strong> Parkeergarage De Knegtel (Gasthuisring 60), 5 min lopen.<br>
        <strong>Trein:</strong> Vanaf Station Tilburg is het 5 min lopen.<br>
        <strong>Fiets:</strong> Direct voor de deur te stallen.
      </p>

      <h2 style="font-size:16px;margin:24px 0 8px;color:#102B2A;">Wat kunnen jullie verwachten?</h2>
      <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.6;color:#5A6864;">
        <li>Rondleiding door de monumentale ruimtes en binnentuin</li>
        <li>Culinaire proeverij van Cookaholics</li>
        <li>Kennismaking met onze vaste trouwpartners (DJ, fotograaf, bloemist)</li>
        <li>Vrijblijvend prijsindicatie op maat</li>
      </ul>

      <p style="margin:24px 0 8px;font-size:15px;line-height:1.6;">Tot dan!</p>
      <p style="margin:0;font-size:15px;line-height:1.6;">Lotte &amp; team Villa 1855</p>

      <p style="margin:24px 0 0;font-size:13px;color:#5A6864;font-style:italic;">
        Vragen? Mail naar <a href="mailto:info@villa1855.nl" style="color:#B58C67;">info@villa1855.nl</a> of bel <a href="tel:+310852736709" style="color:#B58C67;">085 273 6709</a>.
      </p>
    </div>

    <div style="padding:24px 40px;background:#102B2A;color:#9FADAD;text-align:center;">
      <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;">
        Villa 1855 &nbsp;·&nbsp; Noordstraat 36, Tilburg
      </p>
      <p style="margin:8px 0 0;font-size:11px;color:#6F8281;">
        <a href="https://www.villa1855.nl" style="color:#6F8281;text-decoration:none;">villa1855.nl</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function notificationEmailHtml(data: RegistrationData, timeSlotLabel: string, formattedWeddingDate: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<body style="font-family:Helvetica,Arial,sans-serif;color:#1a2724;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="border-bottom:2px solid #B58C67;padding-bottom:8px;">Nieuwe Open Dag-aanmelding</h2>
  <table style="border-collapse:collapse;width:100%;margin-top:16px;">
    <tr><td style="padding:6px 0;color:#5a6864;width:140px;">Namen</td><td style="padding:6px 0;"><strong>${data.names}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">E-mail</td><td style="padding:6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">Telefoon</td><td style="padding:6px 0;">${data.phone}</td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">Tijdslot</td><td style="padding:6px 0;"><strong>${timeSlotLabel}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">Trouwdatum</td><td style="padding:6px 0;">${formattedWeddingDate || '-'}</td></tr>
    <tr><td style="padding:6px 0;color:#5a6864;">Aantal gasten</td><td style="padding:6px 0;">${data.guestCount || '-'}</td></tr>
    ${data.message ? `<tr><td style="padding:6px 0;color:#5a6864;vertical-align:top;">Bericht</td><td style="padding:6px 0;white-space:pre-wrap;">${data.message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
    ${data.utm_source ? `<tr><td style="padding:6px 0;color:#5a6864;">UTM source</td><td style="padding:6px 0;">${data.utm_source}</td></tr>` : ''}
  </table>
</body>
</html>`
}

async function getGoogleSheetsClient() {
  const credentialsBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentialsBase64) {
    throw new Error('Google Service Account credentials not configured')
  }

  // Decode base64 credentials
  const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'))

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json()

    // Validate required fields
    if (!data.names || !data.email || !data.phone || !data.timeSlot) {
      return NextResponse.json(
        { success: false, message: 'Vul alle verplichte velden in.' },
        { status: 400 }
      )
    }

    // Format the time slot for display
    const timeSlotLabels: Record<string, string> = {
      '10:00': '10:00 - 11:00',
      '11:00': '11:00 - 12:00',
      '12:00': '12:00 - 13:00',
      '13:00': '13:00 - 14:00',
      '14:00': '14:00 - 15:00',
      '15:00': '15:00 - 16:00',
      '16:00': '16:00 - 17:00',
    }

    const timeSlotLabel = timeSlotLabels[data.timeSlot] || data.timeSlot

    // Format wedding date if provided
    const formattedWeddingDate = data.weddingDate
      ? new Date(data.weddingDate).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : ''

    // Get current timestamp
    const timestamp = new Date().toLocaleString('nl-NL', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

    // Prepare row data for Google Sheets
    const rowData = [
      timestamp,
      data.names,
      data.email,
      data.phone,
      timeSlotLabel,
      formattedWeddingDate,
      data.guestCount || '',
      data.message || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
      data.utm_term || '',
    ]

    // Get Google Sheets client
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      console.error('Google Sheet ID not configured')
      return NextResponse.json(
        { success: false, message: 'Service niet geconfigureerd. Neem contact op via telefoon.' },
        { status: 500 }
      )
    }

    // Append the row to the sheet (non-fatal if fails)
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Aanmeldingen!A:M',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData],
        },
      })
    } catch (sheetError) {
      console.error('Sheet logging failed (non-fatal):', sheetError)
    }

    // Send mails via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const fromAddress = process.env.RESEND_FROM_EMAIL || 'Villa 1855 <info@villa1855.nl>'
      const notifyTo = process.env.NOTIFY_EMAIL || 'info@villa1855.nl'

      try {
        await resend.emails.send({
          from: fromAddress,
          to: data.email,
          replyTo: notifyTo,
          subject: `Jullie aanmelding voor de Open Dag — ${OPEN_DAY_DATE}`,
          html: customerAutoReplyHtml(data, timeSlotLabel),
        })
      } catch (mailError) {
        console.error('Customer auto-reply failed (non-fatal):', mailError)
      }

      try {
        await resend.emails.send({
          from: fromAddress,
          to: notifyTo,
          replyTo: data.email,
          subject: `Open Dag aanmelding: ${data.names} (${timeSlotLabel})`,
          html: notificationEmailHtml(data, timeSlotLabel, formattedWeddingDate),
        })
      } catch (mailError) {
        console.error('Notification email failed (non-fatal):', mailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Bedankt voor je aanmelding! We hebben je een bevestigingsmail gestuurd met alle details.',
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
