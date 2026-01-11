import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

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
  anders: 'Anders',
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Vul alle verplichte velden in.' },
        { status: 400 }
      )
    }

    const subjectLabel = data.subject ? subjectLabels[data.subject] || data.subject : 'Algemeen'

    // Create email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuw Contactformulier Bericht</title>
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
                Villa 1855
              </h1>
              <p style="margin: 10px 0 0; color: #B58C67; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
                Nieuw Contactbericht
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #6F8281; font-size: 16px; line-height: 1.6;">
                Er is een nieuw bericht binnengekomen via het contactformulier.
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
                        <td style="padding: 8px 0; color: #6F8281; font-size: 14px; width: 120px;">Naam:</td>
                        <td style="padding: 8px 0; color: #102B2A; font-size: 14px; font-weight: 500;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6F8281; font-size: 14px;">E-mail:</td>
                        <td style="padding: 8px 0; color: #102B2A; font-size: 14px;">
                          <a href="mailto:${data.email}" style="color: #B58C67; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6F8281; font-size: 14px;">Telefoon:</td>
                        <td style="padding: 8px 0; color: #102B2A; font-size: 14px;">
                          <a href="tel:${data.phone}" style="color: #B58C67; text-decoration: none;">${data.phone}</a>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0; color: #6F8281; font-size: 14px;">Onderwerp:</td>
                        <td style="padding: 8px 0; color: #102B2A; font-size: 14px;">${subjectLabel}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

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
NIEUW CONTACTFORMULIER BERICHT
==============================

Contactgegevens:
- Naam: ${data.name}
- E-mail: ${data.email}
${data.phone ? `- Telefoon: ${data.phone}` : ''}
- Onderwerp: ${subjectLabel}

Bericht:
${data.message}

---
Dit is een automatisch gegenereerd bericht van de Villa 1855 website.
`

    // Send email via Resend
    const resendClient = getResendClient()

    if (!resendClient) {
      console.error('Resend API key not configured')
      return NextResponse.json(
        { success: false, message: 'Email service niet geconfigureerd.' },
        { status: 500 }
      )
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Villa 1855 <onboarding@resend.dev>'

    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: ['info@villa1855.nl'],
      replyTo: data.email,
      subject: `Contact: ${subjectLabel} - ${data.name}`,
      html: emailHtml,
      text: emailText,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, message: `Email error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
