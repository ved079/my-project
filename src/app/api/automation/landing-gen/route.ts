import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { serviceSlug, practiceName } = await req.json()
    if (!serviceSlug || !practiceName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    let ZAI: typeof import('z-ai-web-dev-sdk').default
    try {
      ZAI = (await import('z-ai-web-dev-sdk')).default
    } catch {
      return NextResponse.json(generateMockLanding(serviceSlug, practiceName))
    }
    const zai = await ZAI.create()
    const prompt = `Generate a landing page for "${practiceName}" for the service "${serviceSlug}". Return ONLY valid JSON with these fields:
{
  "heroHeadline": "string (short, benefit-driven, max 12 words)",
  "heroSubheadline": "string (supporting sentence, max 20 words)",
  "features": [
    { "title": "string (feature name, max 5 words)", "description": "string (feature explanation, max 15 words)" }
  ] (exactly 4 features),
  "ctas": { "primary": "string (action text, max 5 words)", "secondary": "string (alternative action, max 5 words)" },
  "colorPalette": { "primary": "hex color", "secondary": "hex color", "accent": "hex color" },
  "fontPairing": { "heading": "string (Google font name)", "body": "string (Google font name)" }
}`
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a marketing copywriter. Return ONLY valid JSON without markdown fences.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 600,
    })
    const raw = completion.choices[0]?.message?.content || ''
    const json = JSON.parse(raw)
    return NextResponse.json(json)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    console.error('Landing gen error:', message)
    const fallback = generateMockLanding('General Wellness', 'Newmi Care')
    return NextResponse.json(fallback)
  }
}

function generateMockLanding(serviceSlug: string, practiceName: string) {
  const features = [
    { title: 'Expert-Led Care', description: 'Top specialists for every women\'s health need' },
    { title: 'Personalized Plans', description: 'Treatment tailored to your unique body' },
    { title: 'Affordable Pricing', description: 'Quality healthcare at transparent rates' },
    { title: 'Digital-First Access', description: 'Consult from home with easy scheduling' },
  ]
  return {
    heroHeadline: `${serviceSlug} – Expert Care at ${practiceName}`,
    heroSubheadline: `Compassionate, evidence-based ${serviceSlug.toLowerCase()} services tailored for you.`,
    features,
    ctas: { primary: 'Book a Consultation', secondary: 'Learn More' },
    colorPalette: { primary: '#BB2026', secondary: '#111827', accent: '#F87171' },
    fontPairing: { heading: 'Inter', body: 'Inter' },
  }
}
