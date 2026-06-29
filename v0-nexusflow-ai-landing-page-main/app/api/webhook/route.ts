import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, companySize, industry, message, gdprConsent } = body

    // Server-side validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: first name, last name, and email are required.' },
        { status: 400 }
      )
    }

    if (!gdprConsent) {
      return NextResponse.json(
        { error: 'GDPR consent is required to request the roadmap.' },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL || process.env.N8N_WEBOOK_URL || process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('N8N contact webhook URL is not configured.')
      return NextResponse.json(
        { error: 'Server configuration error: contact webhook endpoint not set.' },
        { status: 500 }
      )
    }

    // Build the payload to forward
    const payload = {
      firstName,
      lastName,
      email,
      company: company || '',
      companySize: companySize || '',
      industry: industry || '',
      message: message || '',
      gdprConsent,
      submittedAt: new Date().toISOString(),
      source: 'NexusFlow AI Landing Page Form'
    }

    // Send data to n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('n8n Webhook Error:', errText)
      return NextResponse.json(
        { error: `n8n webhook error: ${response.status} ${response.statusText}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Error in api/webhook:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
