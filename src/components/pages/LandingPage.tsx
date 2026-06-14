'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  CheckCircle, Shield, Star, ShieldCheck, Heart, Smartphone, TrendingUp,
  MapPin, Video, Building2, Dumbbell, Brain, Flower2, Baby, HeartPulse,
  HandHeart, Moon, Ribbon, Stethoscope, Menu, X, Phone, Mail, MessageCircle,
  Quote, Activity, BookOpen, ClipboardCheck, FileText, Pill, TestTube,
  Calendar, Instagram, Facebook, Linkedin, Twitter,
} from 'lucide-react'
import type { ViewMode } from '@/lib/types'
import { SPECIALISTS } from '@/lib/nivi/specialists'
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion'

const NAV_LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'doctors', label: 'Doctors' },
  { id: 'why-newmi', label: 'Why Newmi' },
  { id: 'care-plans', label: 'Care Plans' },
  { id: 'contact', label: 'Contact' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('')
}

const FAQ_ITEMS = [
  {
    q: 'What is the cost of PCOS treatment at Newmi Care?',
    a: 'PCOS treatment consultation at Newmi Care starts from ₹800. The exact cost depends on the diagnostic tests and treatment plan recommended by our specialists.',
  },
  {
    q: 'Does Newmi Care offer IVF treatment?',
    a: 'Yes, Newmi Care offers comprehensive fertility and IVF treatment with experienced specialists. IVF treatment costs range from ₹1.2L to ₹2.5L depending on the treatment protocol.',
  },
  {
    q: 'Where are Newmi Care clinics located?',
    a: 'Newmi Care has clinics in Gurugram — at Spaze Corporate Park, Sector 69 and Bestech Central Square Mall, Sector 57. We also offer pan-India digital consultations.',
  },
  {
    q: 'Can I book an online consultation with a gynecologist?',
    a: 'Yes, Newmi Care offers secure video consultations with experienced gynecologists. You can book instantly through our platform and consult from the comfort of your home.',
  },
  {
    q: "What women's health services does Newmi Care provide?",
    a: 'Comprehensive services including PCOS/PCOD management, fertility treatment, IVF, pregnancy care, post-pregnancy support, menopause treatment, mental health support, and preventive health screenings.',
  },
  {
    q: 'Is Newmi Care safe and confidential?',
    a: 'Absolutely. Newmi Care is HIPAA-compliant. All consultations, medical records, and personal information are encrypted and securely stored.',
  },
]

const TESTIMONIALS = [
  { name: 'Neha Gupta', location: '', text: 'Thank you doctor for your support! Very caring and polite.' },
  { name: 'Priya Mehta', location: 'Gurugram', text: 'We always get clear guidance and confidence after her consultation.' },
  { name: 'Sneha Kapoor', location: 'Gurugram', text: 'Highly professional and listens carefully. Would definitely recommend.' },
  { name: 'Mohit Jain', location: 'Gurugram', text: 'Really happy with her explanation and treatment plan. Thank you so much!' },
  { name: 'Shreya', location: 'Gurugram', text: "I've struggled with really intense period pain and irregular periods for years. Newmi finally gave me a care plan that works." },
  { name: 'Bimla Agarwal', location: 'Pune', text: 'Went for my menopause related symptoms. Dr Anupama explained all the issues and guided all the measures beautifully.' },
]

const WHY_NEWMI = [
  { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Your privacy and security are our top priorities with HIPAA-compliant care.' },
  { icon: Heart, title: 'Women-Focused Care', desc: "Specialized healthcare designed specifically for women's unique needs." },
  { icon: Smartphone, title: 'Easy Access, Anytime', desc: 'All your health information and care interactions in one place.' },
  { icon: TrendingUp, title: 'Proven Results', desc: 'Trusted by thousands of women across the country for their healthcare needs.' },
]

const SUPPORT_SERVICES = [
  { icon: MapPin, title: 'Visit Clinics', subtitle: 'In-Person Care, Near You', desc: 'Get personalized support at our women and child clinics in Gurugram.', link: 'Find a clinic near you' },
  { icon: Video, title: 'Digital Consultations', subtitle: 'Experts On Call, Always', desc: 'Instant access to top specialists from puberty to menopause.', link: 'Book a consultation' },
  { icon: Building2, title: 'Smart OPD', subtitle: 'Preventive & Proactive Care', desc: 'Women-first care helping employers, insurers, and government drive healthier outcomes.', link: 'Learn more' },
]

const CARE_PLANS_ITEMS = [
  { icon: Dumbbell, title: 'Weight Loss', desc: 'Sustainable weight management plans', popular: false },
  { icon: Brain, title: 'Mental Health', desc: 'Emotional and psychological support', popular: false },
  { icon: Flower2, title: 'PCOS/PCOD', desc: 'Comprehensive PCOS management', popular: true },
  { icon: Baby, title: 'Fertility', desc: 'Fertility consultation and IVF', popular: false },
  { icon: HeartPulse, title: 'Pregnancy', desc: 'Full-spectrum pregnancy care', popular: false },
  { icon: HandHeart, title: 'Post Pregnancy', desc: 'Recovery and wellness support', popular: false },
  { icon: Moon, title: 'Menopause', desc: 'Menopause symptom management', popular: false },
  { icon: Ribbon, title: 'Cancer Support', desc: 'Gynecologic cancer care', popular: false },
  { icon: Stethoscope, title: 'Pediatric Care', desc: 'Child health and wellness', popular: false },
  { icon: ShieldCheck, title: 'Sexual Health', desc: 'Confidential sexual health care', popular: false },
]

const CARE_ESSENTIALS = [
  { icon: Activity, title: 'Trackers & Tools' },
  { icon: BookOpen, title: 'Self Help' },
  { icon: ClipboardCheck, title: 'Health Assessments' },
  { icon: FileText, title: 'Medical Records' },
  { icon: Pill, title: 'Medicines' },
  { icon: TestTube, title: 'Labs & Vaccinations' },
]

const LOCATIONS = [
  { name: 'Spaze Corporate Park, Sector 69, Gurugram', hours: 'Open Mon-Sat 9AM-7PM' },
  { name: 'Bestech Central Square Mall, Sector 57, Gurugram', hours: 'Open Mon-Sat 9AM-7PM' },
]

const QUICK_LINKS = ['About', 'Our Specialities', 'Meet Our Doctors', 'How It Works', 'Why Newmi Care']
const SERVICES_LINKS = ['PCOS/PCOD', 'Fertility', 'Pregnancy', 'Menopause', 'Mental Health']

export function LandingPage({ onViewChange }: { onViewChange: (v: ViewMode) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(2)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [carouselW, setCarouselW] = useState(0)

  useEffect(() => {
    const el = carouselRef.current?.parentElement?.parentElement
    if (!el) return
    const ro = new ResizeObserver(entries => { for (const e of entries) { setCarouselW(e.contentRect.width) } })
    ro.observe(el)
    setCarouselW(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  const N = CARE_PLANS_ITEMS.length
  const ITEM_W = 240, GAP = 16

  const stripX = carouselW > 0 ? carouselW / 2 - carouselIdx * (ITEM_W + GAP) - ITEM_W / 2 : 0

  useEffect(() => {
    if (carouselPaused || N <= 1) return
    const t = setInterval(() => setCarouselIdx(p => (p + 1) % N), 4000)
    return () => clearInterval(t)
  }, [carouselPaused, N])

  const circDist = useCallback((a: number, b: number) => {
    const d = Math.abs(a - b)
    return Math.min(d, N - d)
  }, [N])

  useEffect(() => {
    document.title = 'PCOS Treatment, Fertility & Women\'s Health Clinic in Gurugram | Newmi Care'

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    const setMetaProp = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Newmi Care — India\'s leading women\'s health platform. Expert gynecologists for PCOS/PCOD, IVF, fertility, pregnancy, and menopause care in Gurugram. Book your free consultation today.')
    setMeta('keywords', 'PCOS treatment Gurugram, IVF clinic Gurugram, women\'s health clinic, fertility specialist, pregnancy care Gurugram, menopause treatment, gynecologist Gurugram, Newmi Care, PCOD doctor, women health platform India')
    setMeta('robots', 'index, follow')
    setMetaProp('og:title', 'Newmi Care — Women\'s Health Clinic in Gurugram')
    setMetaProp('og:description', 'India\'s leading women\'s health platform. Expert care for PCOS, IVF, pregnancy, and menopause.')
    setMetaProp('og:type', 'website')
    setMetaProp('og:url', 'https://www.newmicare.com/')
    setMetaProp('og:locale', 'en_IN')
    setMetaProp('og:site_name', 'Newmi Care')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Newmi Care — Women\'s Health Clinic in Gurugram')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical) }
    canonical.setAttribute('href', 'https://www.newmicare.com/')

    const ldScript = document.createElement('script')
    ldScript.id = 'newmi-ld'
    ldScript.type = 'application/ld+json'
    ldScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalBusiness',
          name: 'Newmi Care',
          address: [
            { '@type': 'PostalAddress', streetAddress: 'Spaze Corporate Park, Sector 69', addressLocality: 'Gurugram', addressRegion: 'Haryana', postalCode: '122001', addressCountry: 'IN' },
            { '@type': 'PostalAddress', streetAddress: 'Bestech Central Square Mall, Sector 57', addressLocality: 'Gurugram', addressRegion: 'Haryana', postalCode: '122002', addressCountry: 'IN' },
          ],
          geo: { '@type': 'GeoCoordinates', latitude: 28.4595, longitude: 77.0266 },
          medicalSpecialty: ['Gynecology', 'Obstetrics', 'Fertility', 'Endocrinology', 'Oncology'],
          availableService: ['PCOS Treatment', 'IVF', 'Pregnancy Care', 'Menopause Treatment', 'Mental Health'],
          aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 1200 },
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question', name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
        ...SPECIALISTS.map((doc) => ({
          '@type': 'Physician',
          name: doc.name,
          medicalSpecialty: doc.specialization.join(', '),
          hospitalAffiliation: { '@type': 'Hospital', name: 'Newmi Care' },
          address: { '@type': 'PostalAddress', addressLocality: 'Gurugram', addressRegion: 'Haryana', addressCountry: 'IN' },
        })),
      ],
    })
    document.head.appendChild(ldScript)

    return () => {
      const s = document.getElementById('newmi-ld')
      if (s) s.remove()
      document.title = 'Newmi Marketing OS'
    }
  }, [])

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const dayAvail = (days: string[]) => days.includes(todayName)

  return (
    <>
      <header className="lp-navbar" role="banner">
        <div className="lp-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <img src="/logo.svg" alt="Newmi Care" style={{ height: 28 }} />
          <nav className="lp-nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center' }} aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }} aria-label={l.label}>{l.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => onViewChange('admin')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>Admin</button>
            <button onClick={() => onViewChange('riya')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>Riya</button>
            <button className="lp-cta-primary" onClick={() => scrollTo('contact')} style={{ padding: '8px 20px', fontSize: 14 }}>Book Consultation</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#111827' }} className="lp-mobile-menu-btn" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ padding: '8px 24px 16px', borderTop: '1px solid #E5E7EB', background: 'white' }}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => { scrollTo(l.id); setMenuOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 0', background: 'none', border: 'none', color: '#6B7280', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{l.label}</button>
            ))}
          </div>
        )}
      </header>

      <main>
        <section className="lp-hero" id="hero" aria-labelledby="hero-title">
          <div className="lp-container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
            <span style={{ background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 500, padding: '4px 14px', display: 'inline-block' }}>
              India&apos;s Leading Women&apos;s Health Platform
            </span>
            <h1 id="hero-title" style={{ fontSize: '3rem', fontWeight: 700, color: '#111827', lineHeight: 1.15, marginTop: 16 }}>Prioritising Women&apos;s Health</h1>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', marginTop: 12, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              One-stop platform for all women&apos;s health and wellness needs. From puberty to menopause, we&apos;re with you at every stage.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="lp-cta-primary" onClick={() => scrollTo('contact')}>Book Consultation</button>
              <button className="lp-cta-secondary" onClick={() => scrollTo('services')}>Explore Services</button>
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 24, justifyContent: 'center', color: '#6B7280', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={16} color="#059669" /> 10,000+ Women Helped</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={16} color="#059669" /> HIPAA-Compliant Care</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Star size={16} color="#D97706" /> 4.8 Rating on Practo</span>
            </div>
          </div>
        </section>

        <section className="lp-section" id="why-newmi" aria-labelledby="why-title">
          <div className="lp-container">
            <h2 id="why-title" className="lp-title">Why Choose Newmi Care?</h2>
            <p className="lp-subtitle">We provide compassionate, expert care tailored to every woman&apos;s health journey.</p>
            <div className="lp-grid-4">
              {WHY_NEWMI.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="lp-card" style={{ padding: 24 }}>
                    <div className="lp-icon-circle"><Icon size={24} /></div>
                    <h3 style={{ marginTop: 12, fontWeight: 600, color: '#111827', fontSize: '1rem' }}>{item.title}</h3>
                    <p style={{ marginTop: 4, color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.desc}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt" id="services" aria-labelledby="services-title">
          <div className="lp-container">
            <h2 id="services-title" className="lp-title">How Newmi Supports You</h2>
            <p className="lp-subtitle">Comprehensive care across every channel — in-clinic, online, and preventive.</p>
            <div className="lp-grid-3">
              {SUPPORT_SERVICES.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="lp-card" style={{ padding: 24 }}>
                    <div className="lp-icon-circle"><Icon size={24} /></div>
                    <h3 style={{ marginTop: 12, fontWeight: 600, color: '#111827', fontSize: '1rem' }}>{item.title}</h3>
                    <p style={{ marginTop: 2, color: '#6B7280', fontSize: '0.8rem', fontWeight: 500 }}>{item.subtitle}</p>
                    <p style={{ marginTop: 8, color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.desc}</p>
                    <button style={{ marginTop: 12, background: 'none', border: 'none', color: '#BB2026', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {item.link} &rarr;
                    </button>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp-section" id="care-plans" aria-labelledby="care-title">
          <div className="lp-container">
            <h2 id="care-title" className="lp-title">Care Plans</h2>
            <p className="lp-subtitle">Personalised care plans designed for every stage of your health journey.</p>
            <div className="lp-carousel"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}>
              <div className="lp-carousel-strip" style={{ transform: `translateX(${stripX}px)` }} ref={carouselRef}>
                {CARE_PLANS_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  const d = circDist(i, carouselIdx)
                  const s = d === 0 ? 1.15 : d === 1 ? 0.85 : 0.7
                  const o = d === 0 ? 1 : d === 1 ? 0.85 : 0
                  const p = d <= 1 ? 'auto' : 'none'
                  const isCenter = d === 0
                  return (
                    <article key={item.title} className="lp-carousel-card"
                      data-center={isCenter || undefined}
                      style={{ transform: `scale(${s})`, opacity: o, zIndex: N - d, pointerEvents: p, cursor: d === 1 ? 'pointer' : 'default' }}
                      onClick={() => d === 1 && setCarouselIdx(i)}>
                      {item.popular && isCenter && (
                        <span className="lp-carousel-badge">Most Popular</span>
                      )}
                      <div className="lp-icon-circle" style={{ width: 40, height: 40 }}><Icon size={20} /></div>
                      <h3 className="lp-carousel-title">{item.title}</h3>
                      <p className="lp-carousel-desc">{item.desc}</p>
                      <button className="lp-carousel-btn">Learn More</button>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt" id="doctors" aria-labelledby="doctors-title">
          <div className="lp-container">
            <h2 id="doctors-title" className="lp-title">Our Specialists</h2>
            <p className="lp-subtitle">Experienced and compassionate doctors dedicated to your well-being.</p>
            <div className="lp-grid-3">
              {SPECIALISTS.map((doc) => (
                <article key={doc.id} className="lp-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="lp-icon-circle"><span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{initials(doc.name)}</span></div>
                    <div>
                      <h3 style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>{doc.name}</h3>
                      <p style={{ color: '#6B7280', fontSize: '0.8rem' }}>{doc.title}</p>
                    </div>
                  </div>
                  <p style={{ marginTop: 10, color: '#6B7280', fontSize: '0.82rem' }}>{doc.experience} experience</p>
                  <p style={{ color: '#6B7280', fontSize: '0.78rem' }}>{doc.languages.join(', ')}</p>
                  <div style={{ marginTop: 8 }}>
                    {dayAvail(doc.availableDays) ? (
                      <span style={{ background: '#ECFDF5', color: '#065F46', fontSize: '0.72rem', fontWeight: 600, padding: '2px 10px', borderRadius: 4, display: 'inline-block' }}>Available Today</span>
                    ) : (
                      <span style={{ color: '#6B7280', fontSize: '0.72rem' }}>Next: {doc.availableDays[0]}</span>
                    )}
                  </div>
                  <button style={{ marginTop: 12, width: '100%', border: '1.5px solid #BB2026', color: '#BB2026', background: 'white', borderRadius: 10, padding: '10px 0', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Book with Dr. {doc.name.split(' ')[1]}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="app" aria-labelledby="app-title">
          <div className="lp-container">
            <h2 id="app-title" className="lp-title">Your Health in Your Pocket</h2>
            <p className="lp-subtitle">Book appointments in seconds, access health records anytime.</p>
            <div className="lp-grid-2" style={{ alignItems: 'center' }}>
              <div className="lp-phone-mockup" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Book Appointments', 'View Health Records', 'Track Symptoms', 'Chat with Doctors', 'Get Reminders', 'Access Reports'].map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#111827' }}>
                      <CheckCircle size={14} color="#BB2026" /> {f}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: Calendar, title: 'Book Appointments', desc: 'Schedule consultations in seconds with your preferred specialist.' },
                  { icon: ClipboardCheck, title: 'Health Records', desc: 'Access your medical history, reports, and prescriptions anytime.' },
                  { icon: Activity, title: 'Track Symptoms', desc: 'Log and monitor your health symptoms for better diagnosis.' },
                  { icon: Video, title: 'Chat with Doctors', desc: 'Secure messaging and video consultations from home.' },
                  { icon: HeartPulse, title: 'Get Reminders', desc: 'Never miss an appointment or medication with smart reminders.' },
                  { icon: FileText, title: 'Access Reports', desc: 'View lab results and diagnostic reports in real time.' },
                ].map((f) => {
                  const FIcon = f.icon
                  return (
                    <div key={f.title} style={{ display: 'flex', gap: 12 }}>
                      <div className="lp-icon-circle" style={{ width: 40, height: 40 }}><FIcon size={20} /></div>
                      <div>
                        <h3 style={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>{f.title}</h3>
                        <p style={{ color: '#6B7280', fontSize: '0.82rem', lineHeight: 1.4 }}>{f.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt" id="essentials" aria-labelledby="essentials-title">
          <div className="lp-container">
            <h2 id="essentials-title" className="lp-title">Care Essentials</h2>
            <p className="lp-subtitle">Everything you need to manage your health journey.</p>
            <div className="lp-grid-6">
              {CARE_ESSENTIALS.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="lp-card" style={{ padding: 20, textAlign: 'center' }}>
                    <div className="lp-icon-circle" style={{ margin: '0 auto' }}><Icon size={24} /></div>
                    <h3 style={{ marginTop: 10, fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>{item.title}</h3>
                    <button style={{ marginTop: 6, background: 'none', border: 'none', color: '#BB2026', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Login to access</button>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp-section" id="locations" aria-labelledby="locations-title">
          <div className="lp-container">
            <h2 id="locations-title" className="lp-title">Find A Clinic Near You</h2>
            <p className="lp-subtitle">Safe Space for Women and Child&apos;s health. Compassionate Care, Without Judgment.</p>
            <div className="lp-grid-2">
              {LOCATIONS.map((loc) => (
                <article key={loc.name} className="lp-card" style={{ padding: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div className="lp-icon-circle"><MapPin size={24} /></div>
                  <div>
                    <p style={{ color: '#111827', fontWeight: 600, fontSize: '0.9rem' }}>{loc.name}</p>
                    <p style={{ color: '#6B7280', fontSize: '0.82rem', marginTop: 4 }}>{loc.hours}</p>
                    <button style={{ marginTop: 8, background: 'none', border: 'none', color: '#BB2026', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Get Directions &rarr;</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt" id="testimonials" aria-labelledby="testimonials-title">
          <div className="lp-container">
            <h2 id="testimonials-title" className="lp-title">But don&apos;t just take our word for it...</h2>
            <p className="lp-subtitle">Hear from women who trusted Newmi Care with their health journey.</p>
            <div className="lp-grid-6">
              {TESTIMONIALS.map((t, i) => (
                <article key={i} className="lp-card" style={{ padding: 20 }}>
                  <Quote size={20} color="#BB2026" style={{ opacity: 0.4 }} />
                  <p style={{ marginTop: 8, color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
                  <p style={{ marginTop: 10, color: '#111827', fontWeight: 600, fontSize: '0.85rem' }}>{t.name}{t.location ? `, ${t.location}` : ''}</p>
                  <div style={{ marginTop: 4, display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="#D97706" color="#D97706" />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="faq" aria-labelledby="faq-title">
          <div className="lp-container" style={{ maxWidth: 800 }}>
            <h2 id="faq-title" className="lp-title">Frequently Asked Questions</h2>
            <p className="lp-subtitle">Quick answers to common questions about our services.</p>
            <Accordion type="single" collapsible>
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger style={{ fontSize: '0.9rem', color: '#111827' }}>{item.q}</AccordionTrigger>
                  <AccordionContent style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" style={{ background: 'linear-gradient(135deg, #BB2026 0%, #9c151c 100%)', padding: '80px 0', textAlign: 'center', color: 'white' }} aria-labelledby="cta-title">
          <div className="lp-container">
            <h2 id="cta-title" style={{ fontSize: '2rem', fontWeight: 700 }}>Book Your Consultation Today</h2>
            <p style={{ marginTop: 8, fontSize: '1rem', opacity: 0.9 }}>Take the first step towards better health. Our specialists are just a click away.</p>
            <button style={{ marginTop: 24, background: 'white', color: '#BB2026', borderRadius: 12, padding: '14px 32px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', fontFamily: 'inherit' }}>
              Book Now &mdash; It&apos;s Free
            </button>
            <div style={{ marginTop: 24, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={16} /> +91-8929345355</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={16} /> care@newmi.in</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MessageCircle size={16} /> Chat on WhatsApp</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer" role="contentinfo">
        <div className="lp-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 240 }}>
              <img src="/logo.svg" alt="Newmi Care" style={{ height: 28, filter: 'brightness(0) invert(1)' }} />
              <p style={{ marginTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>India&apos;s leading women&apos;s health platform</p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>Quick Links</h4>
              {QUICK_LINKS.map((l) => <p key={l} style={{ marginBottom: 6 }}><a href="#">{l}</a></p>)}
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>Services</h4>
              {SERVICES_LINKS.map((l) => <p key={l} style={{ marginBottom: 6 }}><a href="#">{l}</a></p>)}
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>Contact</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: 4 }}>+91-8929345355</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: 4 }}>care@newmi.in</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>Gurugram, Haryana</p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 32, paddingTop: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            <span>&copy; 2025 Newmi Care. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
