'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Image from 'next/image'
import {
  CheckCircle, Shield, Star, ShieldCheck, Heart, Smartphone, TrendingUp,
  MapPin, Video, Building2, Dumbbell, Brain, Flower2, Baby, HeartPulse,
  HandHeart, Moon, Ribbon, Stethoscope, Menu, X, Phone, Mail, MessageCircle,
  Quote, Activity, BookOpen, ClipboardCheck, FileText, Pill, TestTube,
  Calendar, Instagram, Facebook, Linkedin, Twitter, MessageSquare,
} from 'lucide-react'
import type { ViewMode } from '@/lib/types'
import { SPECIALISTS } from '@/lib/nivi/specialists'
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion'
import { BookingModal } from '@/components/BookingModal'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'

const NAV_LINKS = [
  { id: 'conditions', label: 'What We Treat' },
  { id: 'doctors', label: 'Doctors' },
  { id: 'care-plans', label: 'Care Plans' },
  { id: 'live-stats', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const WHATSAPP_URL = 'https://wa.me/918929345355?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Newmi%20Care'

function openWhatsApp(msg?: string) {
  const url = msg
    ? `https://wa.me/918929345355?text=${encodeURIComponent(msg)}`
    : WHATSAPP_URL
  window.open(url, '_blank')
}

const FAQ_ITEMS = [
  { q: 'What is the cost of PCOS treatment at Newmi Care?', a: 'PCOS treatment consultation at Newmi Care starts from ₹800. The exact cost depends on the diagnostic tests and treatment plan recommended by our specialists.' },
  { q: 'Does Newmi Care offer IVF treatment?', a: 'Yes, Newmi Care offers comprehensive fertility and IVF treatment with experienced specialists. IVF treatment costs range from ₹1.2L to ₹2.5L depending on the treatment protocol.' },
  { q: 'Where are Newmi Care clinics located?', a: 'Newmi Care has clinics in Gurugram — at Spaze Corporate Park, Sector 69 and Bestech Central Square Mall, Sector 57. We also offer pan-India digital consultations.' },
  { q: 'Can I book an online consultation with a gynecologist?', a: 'Yes, Newmi Care offers secure video consultations with experienced gynecologists. You can book instantly through our platform and consult from the comfort of your home.' },
  { q: "What women's health services does Newmi Care provide?", a: 'Comprehensive services including PCOS/PCOD management, fertility treatment, IVF, pregnancy care, post-pregnancy support, menopause treatment, mental health support, and preventive health screenings.' },
  { q: 'Is Newmi Care safe and confidential?', a: 'Absolutely. Newmi Care is HIPAA-compliant. All consultations, medical records, and personal information are encrypted and securely stored.' },
]

const TESTIMONIALS = [
  { name: 'Neha Gupta', location: 'Gurugram', text: 'Thank you doctor for your support! Very caring and polite.', rating: 4.7, condition: 'PCOS Treatment' },
  { name: 'Priya Mehta', location: 'Gurugram', text: 'We always get clear guidance and confidence after her consultation.', rating: 4.9, condition: 'Pregnancy Care' },
  { name: 'Sneha Kapoor', location: 'Gurugram', text: 'Highly professional and listens carefully. Would definitely recommend.', rating: 5.0, condition: 'Fertility Support' },
  { name: 'Mohit Jain', location: 'Gurugram', text: 'Really happy with her explanation and treatment plan. Thank you so much!', rating: 4.8, condition: 'IVF Treatment' },
  { name: 'Shreya', location: 'Gurugram', text: "I've struggled with really intense period pain and irregular periods for years. Newmi finally gave me a care plan that works.", rating: 4.9, condition: 'PCOS Treatment' },
  { name: 'Bimla Agarwal', location: 'Pune', text: 'Went for my menopause related symptoms. Dr Anupama explained all the issues and guided all the measures beautifully.', rating: 5.0, condition: 'Menopause Care' },
]

const WHY_NEWMI = [
  { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Your privacy and security are our top priorities with HIPAA-compliant care.' },
  { icon: Heart, title: 'Women-Focused Care', desc: "Specialized healthcare designed specifically for women's unique needs." },
  { icon: Smartphone, title: 'Easy Access, Anytime', desc: 'All your health information and care interactions in one place.' },
  { icon: TrendingUp, title: 'Proven Results', desc: 'Trusted by thousands of women across the country for their healthcare needs.' },
]

const CARE_PLANS_DATA: Record<string, { condition: string; symptoms: string[]; expectation: string; docIdx: number }> = {
  'Weight Loss': { condition: 'Weight Loss', symptoms: ['Unexplained weight gain', 'Difficulty losing weight', 'Metabolic concerns', 'Hormonal weight changes'], expectation: 'Personalised nutrition and fitness plan with medical supervision.', docIdx: 2 },
  'Mental Health': { condition: 'Mental Health', symptoms: ['Anxiety and depression', 'Postpartum emotional changes', 'Pregnancy-related stress', 'Body image concerns'], expectation: 'Private counselling sessions with therapists specialised in women\'s mental health.', docIdx: 0 },
  'PCOS/PCOD': { condition: 'PCOS/PCOD', symptoms: ['Irregular or missed periods', 'Excess hair growth or hair loss', 'Weight gain and fatigue', 'Acne and skin changes'], expectation: 'Initial consultation includes blood work, ultrasound, and a personalised treatment plan.', docIdx: 2 },
  'Fertility': { condition: 'Fertility/IVF', symptoms: ['Difficulty conceiving after 6+ months', 'Irregular ovulation cycles', 'Previous pregnancy loss', 'Male factor infertility'], expectation: 'Comprehensive fertility assessment followed by a customised treatment roadmap.', docIdx: 1 },
  'Pregnancy': { condition: 'Pregnancy Care', symptoms: ['First trimester guidance', 'Nutrition and lifestyle planning', 'High-risk pregnancy monitoring', 'Birth planning support'], expectation: 'Regular check-ups, screenings, and 24/7 access to your care team.', docIdx: 0 },
  'Post Pregnancy': { condition: 'Post Pregnancy', symptoms: ['Postpartum recovery concerns', 'Breastfeeding challenges', 'Weight management after birth', 'Emotional adjustment'], expectation: 'Comprehensive postpartum support including physical and emotional wellness.', docIdx: 0 },
  'Menopause': { condition: 'Menopause', symptoms: ['Hot flashes and night sweats', 'Mood swings and sleep issues', 'Vaginal dryness', 'Weight and metabolism changes'], expectation: 'Personalised symptom management plan including lifestyle and medical options.', docIdx: 2 },
  'Cancer Support': { condition: 'Gynecologic Cancer', symptoms: ['Abnormal bleeding', 'Pelvic pain or pressure', 'Post-menopausal bleeding', 'Family history of cancer'], expectation: 'Comprehensive cancer screening, diagnosis, and treatment planning.', docIdx: 4 },
  'Pediatric Care': { condition: 'Pediatric Care', symptoms: ['Childhood developmental concerns', 'Nutrition and growth tracking', 'Vaccination schedules', 'Common childhood illnesses'], expectation: 'Family-centered pediatric care with preventive health focus.', docIdx: 0 },
  'Sexual Health': { condition: 'Sexual Health', symptoms: ['Pain during intercourse', 'Low libido', 'Recurrent infections', 'Contraception counselling'], expectation: 'Confidential, non-judgmental consultation with expert guidance.', docIdx: 3 },
}

const CARE_PLANS_ITEMS = [
  { icon: Dumbbell, title: 'Weight Loss', desc: 'Sustainable weight management plans', popular: false, img: null },
  { icon: Brain, title: 'Mental Health', desc: 'Emotional and psychological support', popular: false, img: null },
  { icon: Flower2, title: 'PCOS/PCOD', desc: 'Comprehensive PCOS management', popular: true, img: null },
  { icon: Baby, title: 'Fertility', desc: 'Fertility consultation and IVF', popular: false, img: null },
  { icon: HeartPulse, title: 'Pregnancy', desc: 'Full-spectrum pregnancy care', popular: false, img: null },
  { icon: HandHeart, title: 'Post Pregnancy', desc: 'Recovery and wellness support', popular: false, img: null },
  { icon: Moon, title: 'Menopause', desc: 'Menopause symptom management', popular: false, img: null },
  { icon: Ribbon, title: 'Cancer Support', desc: 'Gynecologic cancer care', popular: false, img: null },
  { icon: Stethoscope, title: 'Pediatric Care', desc: 'Child health and wellness', popular: false, img: null },
  { icon: ShieldCheck, title: 'Sexual Health', desc: 'Confidential sexual health care', popular: false, img: null },
]

const CARE_ESSENTIALS = [
  { icon: Activity, title: 'Trackers & Tools', img: '/images/newmi/tool-trackers.svg' },
  { icon: BookOpen, title: 'Self Help', img: '/images/newmi/tool-selfhelp.svg' },
  { icon: ClipboardCheck, title: 'Health Assessments', img: '/images/newmi/tool-health-assessment.svg' },
  { icon: FileText, title: 'Medical Records', img: '/images/newmi/tool-records.svg' },
  { icon: Pill, title: 'Medicines', img: '/images/newmi/tool-medicines.svg' },
  { icon: TestTube, title: 'Labs & Vaccinations', img: '/images/newmi/tool-lab.svg' },
]

const SUPPORT_SERVICES = [
  { icon: MapPin, title: 'Visit Clinics', subtitle: 'In-Person Care, Near You', desc: 'Get personalized support at our women and child clinics in Gurugram.', link: 'Find a clinic near you', img: '/images/newmi/support-clinic.png' },
  { icon: Video, title: 'Digital Consultations', subtitle: 'Experts On Call, Always', desc: 'Instant access to top specialists from puberty to menopause.', link: 'Book a consultation', img: '/images/newmi/support-digital.png' },
  { icon: Building2, title: 'Smart OPD', subtitle: 'Preventive & Proactive Care', desc: 'Women-first care helping employers, insurers, and government drive healthier outcomes.', link: 'Learn more', img: '/images/newmi/support-smartopd.png' },
]

const LOCATIONS = [
  { name: 'Spaze Corporate Park, Sector 69, Gurugram', hours: 'Open Mon-Sat 9AM-7PM', img: '/images/newmi/clinic-reception.jpg', maps: 'https://maps.google.com/?q=Spaze+Corporate+Park+Sector+69+Gurugram' },
  { name: 'Bestech Central Square Mall, Sector 57, Gurugram', hours: 'Open Mon-Sat 9AM-7PM', img: '/images/newmi/clinic-ivf-center.jpg', maps: 'https://maps.google.com/?q=Bestech+Central+Square+Mall+Sector+57+Gurugram' },
]

const CONDITION_PATHWAYS = [
  { id: 'pcos', label: 'My periods are irregular', sub: 'Specialists in PCOS management with 15+ years of experience', icon: Flower2, condition: 'PCOS/PCOD', symptoms: ['Irregular or missed periods', 'Excess hair growth or hair loss', 'Weight gain and fatigue', 'Acne and skin changes'], expectation: 'Initial consultation includes blood work, ultrasound, and a personalised treatment plan.', docIdx: 2 },
  { id: 'fertility', label: "We've been trying for a baby", sub: 'Fertility specialists with advanced IVF and IUI expertise', icon: Baby, condition: 'Fertility/IVF', symptoms: ['Difficulty conceiving after 6+ months', 'Irregular ovulation cycles', 'Previous pregnancy loss', 'Male factor infertility'], expectation: 'Comprehensive fertility assessment followed by a customised treatment roadmap.', docIdx: 1 },
  { id: 'pregnancy', label: "I'm pregnant and need support", sub: 'Full-spectrum pregnancy care from conception to postpartum', icon: HeartPulse, condition: 'Pregnancy Care', symptoms: ['First trimester guidance', 'Nutrition and lifestyle planning', 'High-risk pregnancy monitoring', 'Birth planning support'], expectation: 'Regular check-ups, screenings, and 24/7 access to your care team.', docIdx: 0 },
  { id: 'menopause', label: "I'm going through changes", sub: 'Expert menopause symptom management and hormone therapy', icon: Moon, condition: 'Menopause', symptoms: ['Hot flashes and night sweats', 'Mood swings and sleep issues', 'Vaginal dryness', 'Weight and metabolism changes'], expectation: 'Personalised symptom management plan including lifestyle and medical options.', docIdx: 2 },
  { id: 'mental', label: 'I just need someone to talk to', sub: 'Confidential mental health support for women at every stage', icon: Brain, condition: 'Mental Health', symptoms: ['Anxiety and overwhelm', 'Postpartum emotional changes', 'Pregnancy-related stress', 'Body image concerns'], expectation: 'Private counselling sessions with therapists specialised in women\'s mental health.', docIdx: 0 },
  { id: 'wellness', label: 'I want to take charge of my health', sub: 'Preventive care and wellness screenings for proactive health', icon: ShieldCheck, condition: 'General Wellness', symptoms: ['Annual health check-ups', 'Nutrition and fitness guidance', 'Preventive screenings', 'Vaccination and immunity'], expectation: 'Comprehensive wellness assessment with a personalised prevention plan.', docIdx: 3 },
]

const LIVE_STATS = [
  { label: 'consultations today', value: 47, suffix: '' },
  { label: 'avg response time', value: 3.2, suffix: ' min' },
  { label: 'patient satisfaction', value: 92, suffix: '%' },
  { label: 'conversions this month', value: 38, suffix: '' },
]

const TRUST_BADGES = [
  { label: 'HIPAA Compliant', img: '/images/newmi/hipaa-logo.jpg' },
  { label: '4.8 on Practo', img: '/images/newmi/practo-logo.jpeg' },
  { label: 'ISO Certified', img: '/images/newmi/iso-logo.png' },
  { label: '10,000+ Consults', icon: Heart, img: null },
  { label: '5 Specialists', icon: Stethoscope, img: null },
]

const QUICK_LINKS = ['About', 'Our Specialities', 'Meet Our Doctors', 'How It Works', 'Why Newmi Care']
const SERVICES_LINKS = ['PCOS/PCOD', 'Fertility', 'Pregnancy', 'Menopause', 'Mental Health']

const CONCERNS = [
  "I've been trying to conceive for 2 years...",
  'My periods have been irregular for months...',
  'I need to talk to someone who understands...',
  'Is IVF right for me?',
  "I'm pregnant and I want the best care",
]

const APP_FEATURES = [
  { icon: Calendar, title: 'Book Appointments', desc: 'Schedule consultations in seconds with your preferred specialist.' },
  { icon: ClipboardCheck, title: 'Health Records', desc: 'Access your medical history, reports, and prescriptions anytime.' },
  { icon: Activity, title: 'Track Symptoms', desc: 'Log and monitor your health symptoms for better diagnosis.' },
  { icon: Video, title: 'Chat with Doctors', desc: 'Secure messaging and video consultations from home.' },
  { icon: HeartPulse, title: 'Get Reminders', desc: 'Never miss an appointment or medication with smart reminders.' },
  { icon: FileText, title: 'Access Reports', desc: 'View lab results and diagnostic reports in real time.' },
]

const DOCTOR_PORTRAITS = [
  '/images/newmi/doctor-portrait-1.jpg',
  '/images/newmi/doctor-portrait-2.jpg',
  '/images/newmi/doctor-portrait-3.jpg',
  '/images/newmi/doctor-portrait-4.jpg',
  '/images/newmi/doctor-portrait-5.jpg',
]

function renderStars(rating: number) {
  const full = Math.floor(rating)
  const stars: React.ReactNode[] = []
  for (let i = 0; i < 5; i++) {
    const fill = i < full ? '#D97706' : '#E5E7EB'
    stars.push(<Star key={i} size={14} fill={fill} color={fill} />)
  }
  return stars
}

export function LandingPage({ onViewChange }: { onViewChange: (v: ViewMode) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(2)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [concernIdx, setConcernIdx] = useState(0)
  const [concernFade, setConcernFade] = useState(true)
  const [liveCount, setLiveCount] = useState(0)
  const [expandedPathway, setExpandedPathway] = useState<string | null>(null)
  const [showSticky, setShowSticky] = useState(false)
  const [stickyCtaLabel, setStickyCtaLabel] = useState("Talk to a Specialist")
  const [bookingOpen, setBookingOpen] = useState(false)
  const [preSelectedCondition, setPreSelectedCondition] = useState<string | undefined>(undefined)
  const [exitOpen, setExitOpen] = useState(false)
  const [carePlanDetail, setCarePlanDetail] = useState<string | null>(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0])
  const countRef = useRef<HTMLSpanElement>(null)
  const counted = useRef(false)
  const statsAnimated = useRef(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [carouselW, setCarouselW] = useState(0)

  const openBooking = (condition?: string) => {
    if (condition) setPreSelectedCondition(condition)
    else setPreSelectedCondition(undefined)
    setBookingOpen(true)
  }

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

  useEffect(() => {
    const t = setInterval(() => {
      setConcernFade(false)
      setTimeout(() => {
        setConcernIdx(p => (p + 1) % CONCERNS.length)
        setConcernFade(true)
      }, 400)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!countRef.current || counted.current) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !counted.current) {
        counted.current = true
        const target = 47
        let current = 0
        const step = Math.ceil(target / 30)
        const iv = setInterval(() => {
          current += step
          if (current >= target) { current = target; clearInterval(iv) }
          setLiveCount(current)
        }, 60)
      }
    }, { threshold: 0.5 })
    obs.observe(countRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const statsEl = document.getElementById('live-stats')
    if (!statsEl || statsAnimated.current) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !statsAnimated.current) {
        statsAnimated.current = true
        const targets = LIVE_STATS.map(s => s.value)
        const steps = targets.map(t => Math.ceil(t / 25))
        const current = [0, 0, 0, 0]
        const iv = setInterval(() => {
          let done = true
          for (let i = 0; i < targets.length; i++) {
            current[i] = Math.min(current[i] + steps[i], targets[i])
            if (current[i] < targets[i]) done = false
          }
          setAnimatedStats([...current])
          if (done) clearInterval(iv)
        }, 50)
      }
    }, { threshold: 0.3 })
    obs.observe(statsEl)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? scrollY / docHeight : 0
      setShowSticky(scrollY > 500)
      if (pct < 0.25) setStickyCtaLabel("Talk to a Specialist")
      else if (pct < 0.75) setStickyCtaLabel("See Your Treatment Options")
      else setStickyCtaLabel("Book Your Free Consultation")
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const shown = localStorage.getItem('newmi_exit_shown')
    if (shown === 'true') return
    let timer: ReturnType<typeof setTimeout>
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) {
        const shownNow = localStorage.getItem('newmi_exit_shown')
        if (shownNow !== 'true') {
          localStorage.setItem('newmi_exit_shown', 'true')
          setExitOpen(true)
        }
      }
    }
    let lastActivity = Date.now()
    const activityHandler = () => { lastActivity = Date.now() }
    const idleCheck = () => {
      if (Date.now() - lastActivity > 20000) {
        const shownNow = localStorage.getItem('newmi_exit_shown')
        if (shownNow !== 'true') {
          localStorage.setItem('newmi_exit_shown', 'true')
          setExitOpen(true)
        }
      }
    }
    if (window.innerWidth >= 768) {
      document.addEventListener('mouseleave', handleMouseLeave)
    } else {
      document.addEventListener('touchstart', activityHandler)
      document.addEventListener('scroll', activityHandler)
      timer = setInterval(idleCheck, 5000)
    }
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('touchstart', activityHandler)
      document.removeEventListener('scroll', activityHandler)
      clearInterval(timer)
    }
  }, [])

  const cardDist = useCallback((a: number, b: number) => {
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
    setMetaProp('og:image', '/images/newmi/why-section.png')
    setMetaProp('og:type', 'website')
    setMetaProp('og:url', 'https://www.newmicare.com/')
    setMetaProp('og:locale', 'en_IN')
    setMetaProp('og:site_name', 'Newmi Care')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Newmi Care — Women\'s Health Clinic in Gurugram')
    setMeta('twitter:description', 'India\'s leading women\'s health platform. Expert care for PCOS, IVF, pregnancy, and menopause.')
    setMeta('twitter:image', '/images/newmi/why-section.png')

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

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx(p => (p + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const dayAvail = (days: string[]) => days.includes(todayName)

  const testPrev = () => setTestimonialIdx(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const testNext = () => setTestimonialIdx(p => (p + 1) % TESTIMONIALS.length)

  const selectedCarePlan = carePlanDetail ? CARE_PLANS_DATA[carePlanDetail] : null

  return (
    <>
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} preSelectedCondition={preSelectedCondition} />

      <Dialog open={exitOpen} onOpenChange={setExitOpen}>
        <DialogContent className="sm:max-w-sm" style={{ textAlign: 'center', padding: '32px 24px' }}>
          <Heart size={48} color="#BB2026" style={{ margin: '0 auto 12px' }} />
          <DialogTitle style={{ fontSize: '1.3rem', color: '#111827' }}>Wait — don&apos;t leave without answers</DialogTitle>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: 8, lineHeight: 1.6 }}>
            Book a free 10-minute screening call with our specialists. Available today.
          </p>
          <button onClick={() => { setExitOpen(false); openBooking() }}
            style={{ marginTop: 20, width: '100%', padding: '14px 0', background: '#BB2026', color: 'white', borderRadius: 10, fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            Claim My Free Call
          </button>
          <button onClick={() => setExitOpen(false)}
            style={{ marginTop: 10, background: 'none', border: 'none', color: '#9CA3AF', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            I&apos;ll come back later
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!carePlanDetail} onOpenChange={(v) => { if (!v) setCarePlanDetail(null) }}>
        {selectedCarePlan && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{carePlanDetail}</DialogTitle>
            </DialogHeader>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#BB2026', marginBottom: 6 }}>Common symptoms we treat:</p>
              <ul style={{ fontSize: '0.85rem', color: '#374151', paddingLeft: 16, marginBottom: 14, lineHeight: 1.8 }}>
                {selectedCarePlan.symptoms.map(s => <li key={s}>{s}</li>)}
              </ul>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#BB2026', marginBottom: 4 }}>What to expect:</p>
              <p style={{ fontSize: '0.85rem', color: '#374151', marginBottom: 14, lineHeight: 1.6 }}>{selectedCarePlan.expectation}</p>
              {(() => {
                const doc = SPECIALISTS[selectedCarePlan.docIdx]
                return doc ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: '#F9FAFB', borderRadius: 10, marginBottom: 14 }}>
                    <Image src={DOCTOR_PORTRAITS[selectedCarePlan.docIdx]} alt={`Dr. ${doc.name} — ${doc.title} at Newmi Care`} width={48} height={48} className="rounded-full ring-2 ring-white shadow-md" style={{ objectFit: 'cover', borderRadius: '50%' }} />
                    <div>
                      <p style={{ fontWeight: 600, color: '#111827', fontSize: '0.85rem' }}>{doc.name}</p>
                      <p style={{ color: '#6B7280', fontSize: '0.78rem' }}>{doc.title} &middot; {doc.experience}</p>
                    </div>
                  </div>
                ) : null
              })()}
              <button onClick={() => { setCarePlanDetail(null); openBooking(selectedCarePlan.condition) }}
                className="lp-cta-primary" style={{ width: '100%', padding: '12px 0', fontSize: '0.9rem', borderRadius: 10, border: 'none' }}>
                Book a Consultation
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <header className="lp-navbar" role="banner">
        <div className="lp-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Image src="/images/newmi/newmi-logo.svg" alt="Newmi Care logo" width={100} height={28} priority style={{ height: 28, width: 'auto' }} />
          <nav className="lp-nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center' }} aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }} aria-label={l.label}>{l.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => onViewChange('admin')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>Admin</button>
            <button onClick={() => onViewChange('riya')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>Riya</button>
            <button className="lp-cta-primary" onClick={() => openBooking()} style={{ padding: '8px 20px', fontSize: 14 }}>Book Consultation</button>
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
          <div className="lp-container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center', position: 'relative' }}>
            <span style={{ background: '#FEF2F2', color: '#BB2026', border: '1px solid #FBCFE8', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600, padding: '4px 14px', display: 'inline-block', letterSpacing: '0.02em' }}>
              India&apos;s Most Trusted Women&apos;s Health Platform
            </span>
            <h1 id="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#111827', lineHeight: 1.15, marginTop: 20, letterSpacing: '-0.02em' }}>You deserve answers,<br />not guesswork.</h1>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', marginTop: 12, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              India&apos;s most trusted women&apos;s health platform — from puberty to menopause, we&apos;re with you at every stage.
            </p>
            <div style={{ marginTop: 20, minHeight: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1rem', color: '#6B7280', transition: 'opacity 0.4s ease', opacity: concernFade ? 1 : 0 }}>
                <span style={{ color: '#BB2026', fontWeight: 600 }}>&ldquo;{CONCERNS[concernIdx]}&rdquo;</span>
              </span>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="lp-cta-primary" onClick={() => openBooking()} style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 12 }}>
                <MessageSquare size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Talk to a Specialist Now
              </button>
              <button className="lp-cta-secondary" onClick={() => scrollTo('conditions')} style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 12 }}>
                Explore Our Care
              </button>
            </div>
            <div style={{ marginTop: 20, color: '#6B7280', fontSize: '0.9rem' }}>
              <span ref={countRef} style={{ fontWeight: 700, color: '#BB2026', fontSize: '1.1rem' }}>{liveCount}</span> women consulted today
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 24, justifyContent: 'center', color: '#6B7280', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={16} color="#059669" /> 10,000+ Women Helped (since 2021)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={16} color="#059669" /> HIPAA-Compliant Care</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Star size={16} color="#D97706" /> 4.8 Rating on Practo</span>
            </div>
            <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '12px 20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ color: '#D97706', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>⭐⭐⭐⭐⭐</div>
              <div style={{ fontSize: '0.82rem', color: '#374151', textAlign: 'left' }}>
                <em>&ldquo;Newmi made me feel heard for the first time&rdquo;</em>
                <span style={{ display: 'block', color: '#6B7280', fontSize: '0.75rem', marginTop: 2 }}>— Priya M., Gurugram</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" id="conditions" aria-labelledby="conditions-title" style={{ background: '#F9FAFB' }}>
          <div className="lp-container">
            <h2 id="conditions-title" className="lp-title">What brings you here?</h2>
            <p className="lp-subtitle">Tell us what you&apos;re going through — we&apos;ll guide you to the right care.</p>
            <div className="lp-grid-3">
              {CONDITION_PATHWAYS.map((p) => {
                const PIcon = p.icon
                const isExpanded = expandedPathway === p.id
                const doc = SPECIALISTS[p.docIdx]
                return (
                  <article key={p.id} className="lp-card" style={{ padding: 24, cursor: 'pointer', border: isExpanded ? '2px solid #BB2026' : '1px solid #E5E7EB', transition: 'border 0.2s ease, box-shadow 0.2s ease' }}
                    onClick={() => setExpandedPathway(isExpanded ? null : p.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="lp-icon-circle" style={{ width: 44, height: 44 }}><PIcon size={22} /></div>
                      <div>
                        <h3 style={{ fontWeight: 600, color: '#111827', fontSize: '1rem' }}>{p.label}</h3>
                        <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: 2 }}>{p.sub}</p>
                      </div>
                    </div>
                    {isExpanded && (
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #E5E7EB' }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#BB2026', marginBottom: 6 }}>Symptoms we treat:</p>
                        <ul style={{ fontSize: '0.8rem', color: '#374151', paddingLeft: 16, marginBottom: 10, lineHeight: 1.7 }}>
                          {p.symptoms.map(s => <li key={s}>{s}</li>)}
                        </ul>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#BB2026', marginBottom: 4 }}>What to expect:</p>
                        <p style={{ fontSize: '0.8rem', color: '#374151', marginBottom: 12 }}>{p.expectation}</p>
                        {doc && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#6B7280', marginBottom: 12, padding: 8, background: '#F9FAFB', borderRadius: 8 }}>
                            <Image src={DOCTOR_PORTRAITS[p.docIdx]} alt={`Dr. ${doc.name} — ${doc.title} at Newmi Care`} width={32} height={32} className="rounded-full ring-2 ring-white shadow-sm" style={{ objectFit: 'cover', borderRadius: '50%' }} />
                            <div>
                              <span style={{ fontWeight: 600 }}>{doc.name}</span> — {doc.experience}
                            </div>
                          </div>
                        )}
                        <button className="lp-cta-primary" style={{ width: '100%', padding: '10px 0', fontSize: '0.85rem', borderRadius: 8, border: 'none' }}
                          onClick={(e) => { e.stopPropagation(); openBooking(p.condition) }}>
                          Book a Consultation for {p.condition}
                        </button>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp-section" id="why-newmi" aria-labelledby="why-title">
          <div className="lp-container">
            <h2 id="why-title" className="lp-title">Why Choose Newmi Care?</h2>
            <p className="lp-subtitle">We provide compassionate, expert care tailored to every woman&apos;s health journey.</p>
            <div className="lp-grid-2" style={{ alignItems: 'center', gap: 40 }}>
              <div>
                <Image src="/images/newmi/why-section.png" alt="Newmi Care — Women's health clinic" width={540} height={400} priority className="rounded-xl shadow-lg" style={{ objectFit: 'cover', borderRadius: 16, width: '100%', height: 'auto' }} />
              </div>
              <div className="lp-grid-2" style={{ gap: 16 }}>
                {WHY_NEWMI.map((item) => {
                  const Icon = item.icon
                  return (
                    <article key={item.title} className="lp-card" style={{ padding: 20 }}>
                      <div className="lp-icon-circle"><Icon size={22} /></div>
                      <h3 style={{ marginTop: 10, fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>{item.title}</h3>
                      <p style={{ marginTop: 4, color: '#6B7280', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.desc}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt" id="services" aria-labelledby="services-title">
          <div className="lp-container">
            <h2 id="services-title" className="lp-title">How Newmi Supports You</h2>
            <p className="lp-subtitle">Comprehensive care across every channel — in-clinic, online, and preventive.</p>
            <div className="lp-grid-3">
              {SUPPORT_SERVICES.map((item) => (
                <article key={item.title} className="lp-card" style={{ padding: 24 }}>
                  <Image src={item.img} alt={`${item.title} at Newmi Care`} width={48} height={48} className="rounded-lg" style={{ objectFit: 'contain' }} />
                  <h3 style={{ marginTop: 12, fontWeight: 600, color: '#111827', fontSize: '1rem' }}>{item.title}</h3>
                  <p style={{ marginTop: 2, color: '#6B7280', fontSize: '0.8rem', fontWeight: 500 }}>{item.subtitle}</p>
                  <p style={{ marginTop: 8, color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.desc}</p>
                  <button style={{ marginTop: 12, background: 'none', border: 'none', color: '#BB2026', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={() => openBooking()}>
                    {item.link} &rarr;
                  </button>
                </article>
              ))}
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
                  const d = cardDist(i, carouselIdx)
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
                      <button className="lp-carousel-btn" onClick={(e) => { e.stopPropagation(); setCarePlanDetail(item.title) }}>Learn More</button>
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
              {SPECIALISTS.map((doc, idx) => (
                <article key={doc.id} className="lp-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Image
                      src={DOCTOR_PORTRAITS[idx]}
                      alt={`Dr. ${doc.name} — ${doc.title} at Newmi Care`}
                      width={80} height={80}
                      className="ring-2 ring-white shadow-md"
                      style={{ objectFit: 'cover', borderRadius: '50%', width: 80, height: 80 }}
                      priority={idx < 2}
                    />
                    <div>
                      <h3 style={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>{doc.name}</h3>
                      <p style={{ color: '#BB2026', fontSize: '0.8rem', fontWeight: 600 }}>{doc.title}</p>
                    </div>
                  </div>
                  <p style={{ marginTop: 10, color: '#374151', fontSize: '0.82rem' }}>{doc.qualifications}</p>
                  <div style={{ marginTop: 6, display: 'flex', gap: 12, fontSize: '0.78rem', color: '#6B7280' }}>
                    <span>🕐 {doc.experience}</span>
                    <span>🗣️ {doc.languages.join(', ')}</span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    {dayAvail(doc.availableDays) ? (
                      <span style={{ background: '#ECFDF5', color: '#065F46', fontSize: '0.72rem', fontWeight: 600, padding: '2px 10px', borderRadius: 4, display: 'inline-block' }}>Available Today</span>
                    ) : (
                      <span style={{ color: '#6B7280', fontSize: '0.72rem' }}>Next available: {doc.availableDays[0]}</span>
                    )}
                  </div>
                  <button className="lp-cta-primary" style={{ marginTop: 14, width: '100%', padding: '10px 0', fontSize: '0.85rem', borderRadius: 10, border: 'none' }}
                    onClick={() => openBooking(doc.specialization[0])}>
                    Book with {doc.name.split(' ').slice(-1)[0]}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="live-stats" aria-labelledby="stats-title" style={{ background: 'linear-gradient(135deg, #111827 0%, #2D2D4E 100%)', color: 'white' }}>
          <div className="lp-container" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 9999, padding: '4px 14px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <Activity size={12} /> POWERED BY NEWMI MARKETING OS
            </div>
            <h2 id="stats-title" style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>Newmi by the Numbers — Live</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.95rem' }}>Real-time metrics from our practice management platform.</p>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
              {LIVE_STATS.map((stat, i) => (
                <div key={stat.label} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '28px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>
                    {animatedStats[i] || 0}
                    <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.7 }}>{stat.suffix}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="trust-badges" style={{ padding: '24px 0', background: '#F9FAFB' }}>
          <div className="lp-container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'center' }}>
              {TRUST_BADGES.map((badge) => {
                if (badge.img) {
                  return (
                    <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: '0.85rem', fontWeight: 500 }}>
                      <Image src={badge.img} alt={badge.label} width={24} height={24} style={{ objectFit: 'contain', borderRadius: 2 }} /> {badge.label}
                    </div>
                  )
                }
                const BIcon = badge.icon!
                return (
                  <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: '0.85rem', fontWeight: 500 }}>
                    <BIcon size={18} color="#BB2026" /> {badge.label}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp-section" id="app" aria-labelledby="app-title">
          <div className="lp-container">
            <h2 id="app-title" className="lp-title">Your Health in Your Pocket</h2>
            <p className="lp-subtitle">Book appointments in seconds, access health records anytime.</p>
            <div className="lp-grid-2" style={{ alignItems: 'center', gap: 40 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <Image src="/images/newmi/app-mockup.png" alt="Newmi Care mobile app" width={280} height={560} priority className="rounded-2xl shadow-xl" style={{ objectFit: 'contain', maxWidth: 260, height: 'auto' }} />
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href="#app-store" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/newmi/app-store-btn.png" alt="Download on the App Store" width={140} height={42} style={{ objectFit: 'contain', height: 42, width: 'auto' }} />
                  </a>
                  <a href="#play-store" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/newmi/play-store-btn.png" alt="Get it on Google Play" width={140} height={42} style={{ objectFit: 'contain', height: 42, width: 'auto' }} />
                  </a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 280 }}>
                  {['Book Appointments', 'View Health Records', 'Track Symptoms', 'Chat with Doctors', 'Get Reminders', 'Access Reports'].map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#111827' }}>
                      <CheckCircle size={14} color="#BB2026" /> {f}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {APP_FEATURES.map((f) => {
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
                  <TooltipProvider key={item.title}>
                    <article className="lp-card" style={{ padding: 20, textAlign: 'center' }}>
                      <Image src={item.img} alt={`${item.title} at Newmi Care`} width={40} height={40} className="mx-auto" style={{ objectFit: 'contain' }} />
                      <h3 style={{ marginTop: 10, fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>{item.title}</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button style={{ marginTop: 6, background: 'none', border: 'none', color: '#BB2026', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Login to access
                          </button>
                        </TooltipTrigger>
                        <TooltipContent style={{ maxWidth: 260, fontSize: '0.82rem', lineHeight: 1.5 }}>
                          This feature is available for registered patients. Download the Newmi Care app to get started.
                        </TooltipContent>
                      </Tooltip>
                    </article>
                  </TooltipProvider>
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
                <article key={loc.name} className="lp-card" style={{ overflow: 'hidden' }}>
                  <Image src={loc.img} alt={`Newmi Care clinic at ${loc.name}`} width={540} height={200} className="w-full" style={{ objectFit: 'cover', width: '100%', height: 200 }} loading="lazy" />
                  <div style={{ padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div className="lp-icon-circle" style={{ width: 36, height: 36, flexShrink: 0 }}><MapPin size={18} /></div>
                    <div>
                      <p style={{ color: '#111827', fontWeight: 600, fontSize: '0.9rem' }}>{loc.name}</p>
                      <p style={{ color: '#6B7280', fontSize: '0.82rem', marginTop: 4 }}>{loc.hours}</p>
                      <button style={{ marginTop: 8, background: 'none', border: 'none', color: '#BB2026', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                        onClick={() => window.open(loc.maps, '_blank', 'noopener,noreferrer')}>Get Directions &rarr;</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt" id="testimonials" aria-labelledby="testimonials-title">
          <div className="lp-container" style={{ textAlign: 'center' }}>
            <h2 id="testimonials-title" className="lp-title">But don&apos;t just take our word for it...</h2>
            <p className="lp-subtitle">Hear from women who trusted Newmi Care with their health journey.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
              <Image src="/images/newmi/google-reviews-badge.png" alt="Google Reviews" width={120} height={40} style={{ objectFit: 'contain', height: 36, width: 'auto' }} />
              <span style={{ color: '#6B7280', fontSize: '0.82rem' }}>4.8 average rating from 1,200+ reviews</span>
            </div>
            <div style={{ position: 'relative', maxWidth: 500, margin: '0 auto' }}>
              <button onClick={testPrev} style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #E5E7EB', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>&lsaquo;</button>
              {(() => {
                const t = TESTIMONIALS[testimonialIdx]
                return (
                  <div key={testimonialIdx} className="lp-card" style={{ padding: 28, textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 8 }}>
                      {renderStars(t.rating)}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FEF2F2', color: '#BB2026', fontSize: '0.7rem', fontWeight: 600, padding: '2px 10px', borderRadius: 9999, marginBottom: 8 }}>
                      <CheckCircle size={10} /> Verified Patient
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6, fontStyle: 'italic', maxWidth: 400, margin: '0 auto' }}>&ldquo;{t.text}&rdquo;</p>
                    <p style={{ marginTop: 12, color: '#111827', fontWeight: 600, fontSize: '0.88rem' }}>{t.name}{t.location ? `, ${t.location}` : ''}</p>
                    <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>{t.condition}</span>
                    <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, fontSize: '0.7rem', color: '#9CA3AF' }}>
                      <Image src="/images/newmi/google-reviews-badge.png" alt="Google" width={16} height={16} style={{ objectFit: 'contain' }} /> Source: Google Reviews
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 4 }}>
                      {TESTIMONIALS.map((_, i) => (
                        <button key={i} onClick={() => setTestimonialIdx(i)}
                          style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', background: i === testimonialIdx ? '#BB2026' : '#D1D5DB', cursor: 'pointer', padding: 0 }} />
                      ))}
                    </div>
                  </div>
                )
              })()}
              <button onClick={testNext} style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #E5E7EB', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>&rsaquo;</button>
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
            <button style={{ marginTop: 24, background: 'white', color: '#BB2026', borderRadius: 12, padding: '14px 32px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', fontFamily: 'inherit' }}
              onClick={() => openBooking()}>
              Book Now &mdash; It&apos;s Free
            </button>
            <div style={{ marginTop: 24, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.9rem' }}>
              <a href="tel:+918929345355" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'inherit', textDecoration: 'none' }}><Phone size={16} /> +91-8929345355</a>
              <a href="mailto:care@newmi.in" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'inherit', textDecoration: 'none' }}><Mail size={16} /> care@newmi.in</a>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => openBooking()}><MessageCircle size={16} /> Chat on WhatsApp</span>
            </div>
          </div>
        </section>
      </main>

      <div style={{ display: showSticky ? 'flex' : 'none', position: 'fixed', bottom: 0, left: 0, right: 0, background: '#BB2026', padding: '8px 16px', zIndex: 100, boxShadow: '0 -4px 20px rgba(0,0,0,0.15)', alignItems: 'center', justifyContent: 'center', height: 56 }}
        className="lp-sticky-mobile">
        <button onClick={() => openBooking()} style={{ background: 'white', color: '#BB2026', padding: '10px 24px', fontWeight: 700, fontSize: '0.95rem', borderRadius: 10, border: 'none', cursor: 'pointer', flex: 1, maxWidth: 400, fontFamily: 'inherit' }}>
          {stickyCtaLabel}
        </button>
      </div>

      <button onClick={() => openWhatsApp()} aria-label="Chat on WhatsApp"
        style={{ position: 'fixed', bottom: showSticky ? 72 : 24, right: 20, width: 56, height: 56, borderRadius: '50%', background: '#25D366', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,211,102,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'bottom 0.3s ease', fontSize: 28 }}>
        <MessageCircle size={28} />
      </button>

      <button onClick={() => onViewChange('riya')} aria-label="Chat with Nivi AI"
        style={{ position: 'fixed', bottom: showSticky ? 136 : 88, right: 20, width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #BB2026, #9c151c)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(187,32,38,0.3)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'bottom 0.3s ease', fontSize: 24 }}>
        <MessageSquare size={24} />
      </button>

      <footer className="lp-footer" role="contentinfo">
        <div className="lp-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 240 }}>
              <Image src="/images/newmi/newmi-logo.svg" alt="Newmi Care logo" width={120} height={32} style={{ filter: 'brightness(0) invert(1)', height: 32, width: 'auto' }} />
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
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: 4 }}>+91-8929343555</p>
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

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (min-width: 769px) { .lp-sticky-mobile { display: none !important; } }
      `}</style>
    </>
  )
}
