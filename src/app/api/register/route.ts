import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Lazy initialization to avoid build errors when env var is not set
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

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

    // Build UTM info string if present
    const utmInfo = [
      data.utm_source && `Source: ${data.utm_source}`,
      data.utm_medium && `Medium: ${data.utm_medium}`,
      data.utm_campaign && `Campaign: ${data.utm_campaign}`,
      data.utm_content && `Content: ${data.utm_content}`,
      data.utm_term && `Term: ${data.utm_term}`,
    ].filter(Boolean).join('\n')

    // Create email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe Open Trouw Route Aanmelding</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F7F8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F7F8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #102B2A; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: normal;">
                Open Trouw Route
              </h1>
              <p style="margin: 10px 0 0; color: #B58C67; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
                Nieuwe Aanmelding
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #6F8281; font-size: 16px; line-height: 1.6;">
                Er is een nieuwe aanmelding binnengekomen voor de Open Trouw Route op 31 januari 2026.
              </p>

              <!-- Contact Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #E7ECEC; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h2 style="margin: 0 0 15px; color: #102B2A; font-size: 18px; font-weight: normal;">
                      Contactgegevens
                    </h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6F8281; font-size: 14px; width: 120px;">Namen:</td>
                        <td style="padding: 8px 0; color: #102B2A; font-size: 14px; font-weight: 500;">${data.names}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6F8281; font-size: 14px;">E-mail:</td>
                        <td style="padding: 8px 0; color: #102B2A; font-size: 14px;">
                          <a href="mailto:${data.email}" style="color: #B58C67; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6F8281; font-size: 14px;">Telefoon:</td>
                        <td style="padding: 8px 0; color: #102B2A; font-size: 14px;">
                          <a href="tel:${data.phone}" style="color: #B58C67; text-decoration: none;">${data.phone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Event Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #102B2A; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h2 style="margin: 0 0 15px; color: #ffffff; font-size: 18px; font-weight: normal;">
                      Afspraakdetails
                    </h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #9FADAD; font-size: 14px; width: 120px;">Datum:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">31 januari 2026</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #9FADAD; font-size: 14px;">Tijdslot:</td>
                        <td style="padding: 8px 0; color: #B58C67; font-size: 14px; font-weight: 500;">${timeSlotLabel}</td>
                      </tr>
                      ${data.weddingDate ? `
                      <tr>
                        <td style="padding: 8px 0; color: #9FADAD; font-size: 14px;">Trouwdatum:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${new Date(data.weddingDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      </tr>
                      ` : ''}
                      ${data.guestCount ? `
                      <tr>
                        <td style="padding: 8px 0; color: #9FADAD; font-size: 14px;">Aantal gasten:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${data.guestCount} personen</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              ${data.message ? `
              <!-- Message Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-left: 3px solid #B58C67; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <h3 style="margin: 0 0 10px; color: #102B2A; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      Bericht
                    </h3>
                    <p style="margin: 0; color: #6F8281; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${utmInfo ? `
              <!-- UTM Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #CED8D8; margin-top: 20px;">
                <tr>
                  <td style="padding-top: 20px;">
                    <p style="margin: 0 0 10px; color: #9FADAD; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      Marketing bron
                    </p>
                    <p style="margin: 0; color: #6F8281; font-size: 12px; line-height: 1.8; white-space: pre-wrap;">${utmInfo}</p>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #102B2A; padding: 25px 40px; text-align: center;">
              <p style="margin: 0; color: #6F8281; font-size: 12px;">
                Dit is een automatisch gegenereerd bericht van de Villa 1855 website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    // Create plain text version
    const emailText = `
NIEUWE OPEN TROUW ROUTE AANMELDING
==================================

Contactgegevens:
- Namen: ${data.names}
- E-mail: ${data.email}
- Telefoon: ${data.phone}

Afspraakdetails:
- Datum: 31 januari 2026
- Tijdslot: ${timeSlotLabel}
${data.weddingDate ? `- Gewenste trouwdatum: ${new Date(data.weddingDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}
${data.guestCount ? `- Verwacht aantal gasten: ${data.guestCount}` : ''}

${data.message ? `Bericht:\n${data.message}` : ''}

${utmInfo ? `\nMarketing bron:\n${utmInfo}` : ''}

---
Dit is een automatisch gegenereerd bericht van de Villa 1855 website.
`

    // Send email via Resend
    const resendClient = getResendClient()

    if (!resendClient) {
      console.error('Resend API key not configured')
      return NextResponse.json(
        { success: false, message: 'Email service niet geconfigureerd. Neem contact op via telefoon.' },
        { status: 500 }
      )
    }

    // Use verified domain or Resend's test domain
    // After verifying villa1855.nl in Resend, change to: 'Villa 1855 <noreply@villa1855.nl>'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Villa 1855 <onboarding@resend.dev>'

    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: ['nick@cookaholics.nl'],
      replyTo: data.email,
      subject: `Open Trouw Route Aanmelding: ${data.names} - ${timeSlotLabel}`,
      html: emailHtml,
      text: emailText,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, message: 'Er ging iets mis bij het versturen. Probeer het opnieuw.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Bedankt voor je aanmelding! We nemen binnen 24 uur contact met je op.',
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
