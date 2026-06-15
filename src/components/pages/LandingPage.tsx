'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Image from 'next/image'
import {
  CheckCircle, Shield, Star, ShieldCheck, Heart, Smartphone, TrendingUp,
  MapPin, Video, Building2, Dumbbell, Brain, Flower2, Baby, HeartPulse,
  HandHeart, Moon, Ribbon, Stethoscope, Menu, X, Phone, Mail, MessageCircle,
  Quote, Activity, BookOpen, ClipboardCheck, FileText, Pill, TestTube,
  Calendar,   Instagram, Facebook, Linkedin, Twitter, MessageSquare, Lock, Search, Sparkles, Clock, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { captureUTM, persistUTM } from '@/lib/utm'
import { SPECIALISTS } from '@/lib/nivi/specialists'
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion'
import { BookingModal } from '@/components/BookingModal'
import { SymptomCheckerWidget } from '@/components/SymptomCheckerWidget'
import { HealthScoreQuiz } from '@/components/HealthScoreQuiz'
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
  window.open(url, '_blank', 'noopener,noreferrer')
}

const FAQ_ITEMS = [
  { q: "What conditions does Newmi Care treat?", a: "Newmi Care specializes in women's health across every life stage — from puberty to menopause. Our care plans cover PCOS/PCOD, fertility issues, pregnancy and postpartum care, mental health, weight management, menopause, cancer support, pediatric care, and sexual health. Each plan is designed by specialist gynecologists, endocrinologists, and therapists." },
  { q: "Do I need a referral to book a consultation?", a: "No referral is needed. You can book a consultation directly through our website, app, or by calling +91-8929345355. Our team will match you with the right specialist based on your concern." },
  { q: "Are online consultations available?", a: "Yes, Newmi offers secure video consultations with qualified specialists across women's health. You can book a digital consultation through the Newmi app or website, available Monday to Saturday, 9 AM to 9 PM. All consultations are private and HIPAA-compliant." },
  { q: "What are Newmi's clinic locations?", a: "Newmi currently operates clinics in Gurugram — at Sector 69 (Spaze Corporate Park) and Sector 57 (Bestech Central Square Mall). Both clinics offer consultation, pathology, radiology, medicines, vaccination, wellness, and physiotherapy services. We are expanding to more cities soon." },
  { q: "Is my health information kept private?", a: "Absolutely. Newmi Care is HIPAA, GDPR, and ISO compliant. Your health data is encrypted, and we follow the highest standards of data privacy. We never share your information without your explicit consent." },
  { q: "How much does a consultation cost?", a: "Consultation fees vary by specialist and condition. Our care plans are designed to be affordable, and we offer both in-clinic and digital consultation options. Contact us at +91-8929345355 or care@newmi.in for specific pricing." },
  { q: "Can I use Newmi for pregnancy care from the beginning?", a: "Yes, Newmi provides end-to-end prenatal care from the first trimester through delivery and postpartum. Our pregnancy care plan includes regular check-ups, ultrasound scheduling, nutrition planning, high-risk monitoring, prenatal yoga, and emergency support." },
  { q: "Does Newmi accept insurance?", a: "Newmi works with employers and insurance providers through our Smart OPD program to make outpatient care accessible and affordable. Contact our team to check if your insurance plan covers Newmi services." },
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

interface CarePlanDetail {
  condition: string
  description: string
  includes: string[]
  symptoms: string[]
  expectation: string
  docIdx: number
}

const CARE_PLANS_DATA: Record<string, CarePlanDetail> = {
  'Weight Loss': { condition: 'Weight Loss', description: 'Personalized weight management with nutritionists, fitness experts, and medical supervision for sustainable, healthy results.', includes: ['Custom diet plans', 'Yoga & fitness sessions', 'Weekly check-ins', 'Metabolic profiling', 'Behavioral coaching', 'Progress tracking'], symptoms: ['Unexplained weight gain', 'Difficulty losing weight', 'Metabolic concerns', 'Hormonal weight changes'], expectation: 'Personalised nutrition and fitness plan with medical supervision.', docIdx: 2 },
  'Mental Health': { condition: 'Mental Health', description: 'Compassionate mental health support with licensed therapists and psychiatrists specializing in women\'s emotional wellbeing.', includes: ['Therapy sessions', 'Anxiety & depression management', 'Stress management tools', 'Mindfulness programs', 'Psychiatric consultation', 'Crisis support resources'], symptoms: ['Anxiety and depression', 'Postpartum emotional changes', 'Pregnancy-related stress', 'Body image concerns'], expectation: 'Private counselling sessions with therapists specialised in women\'s mental health.', docIdx: 0 },
  'PCOS/PCOD': { condition: 'PCOS/PCOD', description: 'Comprehensive PCOS management addressing hormonal imbalance, irregular periods, and metabolic concerns with specialist guidance.', includes: ['Hormonal profiling', 'Period regulation plan', 'Diet & lifestyle coaching', 'Fertility guidance', 'Insulin resistance management', 'Dermatological support'], symptoms: ['Irregular or missed periods', 'Excess hair growth or hair loss', 'Weight gain and fatigue', 'Acne and skin changes'], expectation: 'Initial consultation includes blood work, ultrasound, and a personalised treatment plan.', docIdx: 2 },
  'Fertility': { condition: 'Fertility/IVF', description: 'Evidence-based fertility support from evaluation through treatment, with empathetic care at every step of your journey.', includes: ['Fertility assessment', 'Ovulation tracking', 'IUI/IVF counseling', 'Partner testing', 'Emotional support', 'Treatment coordination'], symptoms: ['Difficulty conceiving after 6+ months', 'Irregular ovulation cycles', 'Previous pregnancy loss', 'Male factor infertility'], expectation: 'Comprehensive fertility assessment followed by a customised treatment roadmap.', docIdx: 1 },
  'Pregnancy': { condition: 'Pregnancy Care', description: 'End-to-end prenatal care ensuring a healthy pregnancy with regular monitoring, nutrition guidance, and expert consultations.', includes: ['Prenatal check-ups', 'Ultrasound scheduling', 'Nutrition planning', 'High-risk monitoring', 'Prenatal yoga', 'Emergency support line'], symptoms: ['First trimester guidance', 'Nutrition and lifestyle planning', 'High-risk pregnancy monitoring', 'Birth planning support'], expectation: 'Regular check-ups, screenings, and 24/7 access to your care team.', docIdx: 0 },
  'Post Pregnancy': { condition: 'Post Pregnancy', description: 'Postpartum recovery and newborn care support designed for new mothers navigating the fourth trimester.', includes: ['Postnatal check-ups', 'Breastfeeding support', 'Baby massage sessions', 'Postpartum yoga', 'Mental health screening', 'Vaccination tracking'], symptoms: ['Postpartum recovery concerns', 'Breastfeeding challenges', 'Weight management after birth', 'Emotional adjustment'], expectation: 'Comprehensive postpartum support including physical and emotional wellness.', docIdx: 0 },
  'Menopause': { condition: 'Menopause', description: 'Compassionate menopause management helping you navigate hot flashes, mood changes, and long-term health with expert care.', includes: ['Symptom management', 'Hormone therapy guidance', 'Bone health screening', 'Heart health monitoring', 'Emotional support', 'Lifestyle modification'], symptoms: ['Hot flashes and night sweats', 'Mood swings and sleep issues', 'Vaginal dryness', 'Weight and metabolism changes'], expectation: 'Personalised symptom management plan including lifestyle and medical options.', docIdx: 2 },
  'Cancer Support': { condition: 'Gynecologic Cancer', description: 'Specialized oncology support with a women-focused approach from diagnosis through recovery and survivorship.', includes: ['Oncologist consultations', 'Treatment coordination', 'Emotional counseling', 'Nutrition during treatment', 'Pain management', 'Survivorship program'], symptoms: ['Abnormal bleeding', 'Pelvic pain or pressure', 'Post-menopausal bleeding', 'Family history of cancer'], expectation: 'Comprehensive cancer screening, diagnosis, and treatment planning.', docIdx: 4 },
  'Pediatric Care': { condition: 'Pediatric Care', description: 'Expert pediatric care for your child\'s health, growth, and development in a safe, child-friendly environment.', includes: ['Growth monitoring', 'Vaccination schedule', 'Developmental assessments', 'Nutrition guidance', 'Illness management', 'Parent counseling'], symptoms: ['Childhood developmental concerns', 'Nutrition and growth tracking', 'Vaccination schedules', 'Common childhood illnesses'], expectation: 'Family-centered pediatric care with preventive health focus.', docIdx: 0 },
  'Sexual Health': { condition: 'Sexual Health', description: 'Confidential, judgment-free sexual health consultations addressing concerns from intimacy to infections.', includes: ['Discreet consultations', 'STI screening', 'Hormonal evaluation', 'Relationship counseling', 'Treatment plans', 'Follow-up care'], symptoms: ['Pain during intercourse', 'Low libido', 'Recurrent infections', 'Contraception counselling'], expectation: 'Confidential, non-judgmental consultation with expert guidance.', docIdx: 3 },
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
  { label: 'Women Served', value: 50000, suffix: '+', format: (v: number) => v >= 1000 ? Math.round(v / 1000) + 'K' : String(v) },
  { label: 'Cities Covered', value: 25, suffix: '+', format: (v: number) => String(v) },
  { label: 'App Rating', value: 5, suffix: '', format: (v: number) => v < 1 ? '0' : v < 5 ? String(Math.max(v, 1)) : '4.9+' },
  { label: 'Safe & Secure', value: 100, suffix: '%', format: (v: number) => String(v) },
]

const TRUST_BADGES = [
  { label: 'HIPAA Compliant', img: '/images/newmi/hipaa-logo.jpg' },
  { label: '4.9+ App Rating', img: '/images/newmi/practo-logo.jpeg' },
  { label: 'ISO Certified', img: '/images/newmi/iso-logo.png' },
  { label: '10,000+ Consults', icon: Heart, img: null },
  { label: '5 Specialists', icon: Stethoscope, img: null },
]

const TRIAGE_STEPS = [
  { question: 'What brings you here today?', options: ['Irregular periods', 'Difficulty conceiving', 'Pregnancy care', 'Weight concerns', 'Mood & anxiety', 'Menopause symptoms'] },
  { question: 'How long has this been affecting you?', options: ['Just started (days)', 'A few weeks', 'A few months', 'Over a year'] },
  { question: 'What type of care do you prefer?', options: ['Online consultation', 'In-clinic visit', 'Care plan with specialist', 'Just exploring'] },
]

const TRIAGE_RESULTS: Record<string, string> = {
  'Irregular periods': 'PCOS/PCOD',
  'Difficulty conceiving': 'Fertility',
  'Pregnancy care': 'Pregnancy',
  'Weight concerns': 'Weight Management',
  'Mood & anxiety': 'Mental Health',
  'Menopause symptoms': 'Menopause',
}

const FOUNDERS = [
  { name: 'Sanchit Agarwal', title: 'Co-Founder & CEO', image: '/images/newmi/sanchit-agarwal.jpg', story: 'Survived a fatal accident and turned recovery into purpose', credential: '25+ years in Healthcare & Finance. Ex-Global MD at Accenture, Deloitte, Barclays' },
  { name: 'Aditi Mittal', title: 'Co-Founder & COO', image: '/images/newmi/Aditi Mittal.jpg', story: 'Conquered cancer twice and gave birth with courage', credential: '2X Cancer Survivor. Public Speaker on Cancer. Ex-Head Designer at Sabyasachi' },
  { name: 'Anushri Agarwal', title: 'Co-Founder & CBO', image: '/images/newmi/Anushri Agarwal.jpg', story: 'Making healthcare accessible through innovative insurance solutions', credential: '17+ years in Business Development, Technology & Healthcare. Insurance & Employee Benefits Expert' },
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

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(2)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [concernIdx, setConcernIdx] = useState(0)
  const [concernFade, setConcernFade] = useState(true)
  const [liveCount, setLiveCount] = useState(0)
  const [expandedPathway, setExpandedPathway] = useState<string | null>(null)
  const [showSticky, setShowSticky] = useState(false)
  const [stickyCtaLabel, setStickyCtaLabel] = useState("Talk to a Specialist")
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    if (!email.trim()) { setEmailError('Please enter your email'); return }
    if (!isValidEmail(email.trim())) { setEmailError('Please enter a valid email address'); return }
    setSubscribing(true)
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim() }) })
      if (!res.ok) throw new Error()
      setSubscribed(true); setEmail('')
    } catch { setEmailError('Something went wrong. Please try again.') }
    setSubscribing(false)
  }
  const [stickyVisible, setStickyVisible] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [preSelectedCondition, setPreSelectedCondition] = useState<string | undefined>(undefined)
  const [exitOpen, setExitOpen] = useState(false)
  const [carePlanDetail, setCarePlanDetail] = useState<string | null>(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0])
  const [availabilityDot, setAvailabilityDot] = useState<'green' | 'yellow' | 'red'>('green')
  const [availabilityText, setAvailabilityText] = useState('')
  const [socialToast, setSocialToast] = useState({ show: false, message: '', id: 0 })
  const [triageOpen, setTriageOpen] = useState(false)
  const [symptomCheckOpen, setSymptomCheckOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [heroTagline, setHeroTagline] = useState("India's Most Trusted Women's Health Platform")
  const [heroHeading, setHeroHeading] = useState('Newmi Care — India\'s Trusted Women\'s Health Platform')
  const [heroSubtext, setHeroSubtext] = useState("India's most trusted women's health platform — from puberty to menopause, we're with you at every stage.")
  const [tickerMessages] = useState([
    'Priya from Gurugram just booked a fertility consult',
    'Anjali from Noida started her pregnancy care plan',
    'Sneha from Pune scheduled a menopause consultation',
    'Riya from Delhi booked a PCOS care plan',
    'Meera from Mumbai started her weight management plan',
  ])
  const [tickerIdx, setTickerIdx] = useState(0)

  useEffect(() => {
    const utm = captureUTM()
    if (utm.utmCampaign?.includes('fertility')) {
      setHeroTagline('Starting a Family? We Can Help.')
      setHeroHeading('Your fertility journey\nstarts here.')
      setHeroSubtext('Specialized fertility care with India\'s top reproductive specialists. Book a consultation today.')
    } else if (utm.utmSource === 'instagram') {
      setHeroTagline('Welcome from Instagram')
      setHeroHeading('You deserve answers,\nnot guesswork.')
      setHeroSubtext('Exclusive offer for our Instagram community — get 10% off your first consultation.')
    } else if (utm.utmSource === 'google') {
      setHeroTagline('You searched for answers. We have them.')
      setHeroHeading('Expert care for\nevery concern.')
      setHeroSubtext("India's most trusted women's health platform — book a consultation in under 2 minutes.")
    }
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setTickerIdx(p => (p + 1) % tickerMessages.length), 5000)
    return () => clearInterval(iv)
  }, [tickerMessages.length])

  const [triageStep, setTriageStep] = useState(0)
  const [triageAnswers, setTriageAnswers] = useState<string[]>([])
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
    const utm = captureUTM()
    persistUTM(utm)
    const q = utm.utmContent || utm.utmTerm || ''
    if (q.toLowerCase().includes('fertility') || q.toLowerCase().includes('ivf') || q.toLowerCase().includes('conceive')) {
      setHeroTagline('Starting a family? We can help.')
      setHeroHeading('Your fertility journey\nstarts here.')
      setHeroSubtext('Expert fertility specialists, personalized treatment plans, and compassionate care — all in one place.')
    } else if (q.toLowerCase().includes('pcos') || q.toLowerCase().includes('period') || q.toLowerCase().includes('pcod')) {
      setHeroTagline('PCOS? You\'re not alone.')
      setHeroHeading('Life with PCOS\ndoesn\'t have to be hard.')
      setHeroSubtext('Get expert care, real answers, and a plan that works for your body.')
    } else if (q.toLowerCase().includes('pregnan') || q.toLowerCase().includes('baby')) {
      setHeroTagline('Expecting? We\'re with you.')
      setHeroHeading('From bump to baby\nand beyond.')
      setHeroSubtext('Complete prenatal care, expert guidance, and support through every trimester.')
    }
  }, [])

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
        const duration = 1200
        const start = performance.now()
        const raf = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setLiveCount(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
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
        const current = [0, 0, 0, 0]
        const duration = 1500
        const startTime = performance.now()
        let rafId: number
        const animate = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          for (let i = 0; i < targets.length; i++) {
            current[i] = Math.round(eased * targets[i])
          }
          setAnimatedStats([...current])
          if (progress < 1) {
            rafId = requestAnimationFrame(animate)
          }
        }
        rafId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafId)
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
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(([entry]) => {
      setStickyVisible(!entry.isIntersecting)
    }, { threshold: 0 })
    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const updateAvailability = () => {
      const now = new Date()
      const istOffset = 5.5 * 60 * 60 * 1000
      const ist = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000)
      const hour = ist.getHours()
      const day = ist.getDay()
      const isWeekday = day >= 1 && day <= 6
      if (!isWeekday) { setAvailabilityDot('red'); setAvailabilityText('Clinic closed — Book for Monday'); return }
      if (hour >= 9 && hour < 19) { setAvailabilityDot('green'); setAvailabilityText(`${2 + Math.floor(Math.random() * 4)} doctors available now`); return }
      if (hour >= 19 && hour < 21) { setAvailabilityDot('yellow'); setAvailabilityText('Next slot available in approx 30 min'); return }
      setAvailabilityDot('red'); setAvailabilityText('Clinic closed — Book for tomorrow')
    }
    updateAvailability()
    const iv = setInterval(updateAvailability, 60000)
    return () => clearInterval(iv)
  }, [])

  const socialMessages = [
    'Someone in Gurugram just booked a PCOS consultation',
    '3 women booked fertility consultations today',
    'Dr. Priya Sharma has 2 slots left this week',
    '12 consultations booked in the last hour',
    'Someone in Noida just started their pregnancy care plan',
  ]
  const socialToastRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toastCountRef = useRef(0)

  useEffect(() => {
    const showToast = () => {
      if (toastCountRef.current >= 5) return
      const msg = socialMessages[Math.floor(Math.random() * socialMessages.length)]
      setSocialToast({ show: true, message: msg, id: Date.now() })
      toastCountRef.current++
      socialToastRef.current = setTimeout(() => setSocialToast(prev => ({ ...prev, show: false })), 4000)
    }
    const initialTimer = setTimeout(showToast, 5000)
    const iv = setInterval(() => {
      if (toastCountRef.current < 5) showToast()
    }, 10000 + Math.random() * 4000)
    return () => { clearTimeout(initialTimer); clearInterval(iv); if (socialToastRef.current) clearTimeout(socialToastRef.current) }
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
      <SymptomCheckerWidget open={symptomCheckOpen} onOpenChange={setSymptomCheckOpen} onBook={(c) => { setPreSelectedCondition(c); setBookingOpen(true) }} />
      <HealthScoreQuiz open={quizOpen} onOpenChange={setQuizOpen} onBook={() => openBooking()} />

      {/* Triage Wizard */}
      <Dialog open={triageOpen} onOpenChange={(v) => { setTriageOpen(v); if (!v) { setTriageStep(0); setTriageAnswers([]) } }}>
        <DialogContent className="sm:max-w-sm" style={{ padding: '28px 24px' }}>
          {triageStep < 3 ? (
            <>
              <DialogTitle style={{ fontSize: '1.05rem', color: '#111827' }}>{TRIAGE_STEPS[triageStep].question}</DialogTitle>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TRIAGE_STEPS[triageStep].options.map(opt => (
                  <button key={opt} onClick={() => { setTriageAnswers(prev => [...prev, opt]); setTriageStep(prev => prev + 1) }}
                    style={{ padding: '12px 16px', borderRadius: 10, fontSize: '0.88rem', fontWeight: 500, textAlign: 'left', border: '1.5px solid #E5E7EB', background: 'white', color: '#374151', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#BB2026')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E7EB')}>
                    {opt}
                  </button>
                ))}
              </div>
              <p style={{ marginTop: 16, fontSize: '0.8rem', color: '#9CA3AF', textAlign: 'center' }}>Step {triageStep + 1} of 3</p>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <HeartPulse size={28} color="#BB2026" />
              </div>
              <DialogTitle style={{ fontSize: '1.1rem', color: '#111827' }}>We recommend</DialogTitle>
              <div style={{ marginTop: 12, padding: '12px 20px', background: '#FEF2F2', borderRadius: 10, fontSize: '1.05rem', fontWeight: 700, color: '#BB2026', display: 'inline-block' }}>
                {TRIAGE_RESULTS[triageAnswers[0]] || 'General Consultation'}
              </div>
              <p style={{ marginTop: 12, color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Based on your answers, this care plan may be the best fit. Our specialists can help you get started.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={() => { const plan = TRIAGE_RESULTS[triageAnswers[0]] || 'General'; openBooking(plan); setTriageOpen(false) }}
                  className="lp-cta-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 10 }}>
                  Book Now
                </button>
                <button onClick={() => { setTriageStep(0); setTriageAnswers([]) }}
                  style={{ padding: '12px 20px', background: 'white', color: '#6B7280', border: '1px solid #D1D5DB', borderRadius: 10, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={exitOpen} onOpenChange={setExitOpen}>
        <DialogContent className="sm:max-w-sm" style={{ textAlign: 'center', padding: '32px 24px' }}>
          <Image src="/images/newmi/newmi-logo.svg" alt="Newmi Care logo" width={80} height={22} style={{ margin: '0 auto 12px', height: 22, width: 'auto' }} />
          <DialogTitle style={{ fontSize: '1.2rem', color: '#111827' }}>Wait! Don&apos;t leave without your free consultation</DialogTitle>
          <p style={{ color: '#6B7280', fontSize: '0.88rem', marginTop: 8, lineHeight: 1.5 }}>
            Book a free consultation with a women&apos;s health specialist. Limited slots available.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #D1D5DB', borderRadius: 10, padding: '2px 12px', marginTop: 16 }}>
            <span style={{ fontSize: '0.88rem', color: '#6B7280', fontWeight: 500 }}>+91</span>
            <input type="tel" placeholder="Enter your phone number" style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 8px', fontSize: '0.88rem', fontFamily: 'inherit' }} />
          </div>
          <button onClick={() => { setExitOpen(false); openBooking() }}
            style={{ marginTop: 14, width: '100%', padding: '14px 0', background: '#BB2026', color: 'white', borderRadius: 10, fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            Book Free Consultation
          </button>
          <button onClick={() => setExitOpen(false)}
            style={{ marginTop: 10, background: 'none', border: 'none', color: '#9CA3AF', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            No thanks
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!carePlanDetail} onOpenChange={(v) => { if (!v) setCarePlanDetail(null) }}>
        {selectedCarePlan && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{carePlanDetail} Care Plan</DialogTitle>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: 4, lineHeight: 1.5 }}>{selectedCarePlan.description}</p>
            </DialogHeader>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#BB2026', marginBottom: 6 }}>What&apos;s Included</p>
              <ul style={{ fontSize: '0.85rem', color: '#374151', paddingLeft: 16, marginBottom: 14, lineHeight: 1.9 }}>
                {selectedCarePlan.includes.map(s => <li key={s}>{s}</li>)}
              </ul>
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
                    <Image src={DOCTOR_PORTRAITS[selectedCarePlan.docIdx]} alt={`${doc.name} — ${doc.title} at Newmi Care`} width={48} height={48} className="rounded-full ring-2 ring-white shadow-md" style={{ objectFit: 'cover', borderRadius: '50%' }} />
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

      <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}
        onFocus={(e) => { e.currentTarget.style.position = 'fixed'; e.currentTarget.style.top = '8px'; e.currentTarget.style.left = '8px'; e.currentTarget.style.width = 'auto'; e.currentTarget.style.height = 'auto'; e.currentTarget.style.background = '#BB2026'; e.currentTarget.style.color = 'white'; e.currentTarget.style.padding = '12px 24px'; e.currentTarget.style.zIndex = '9999'; e.currentTarget.style.borderRadius = '8px'; e.currentTarget.style.textDecoration = 'none'; e.currentTarget.style.fontWeight = '600' }}
        onBlur={(e) => { e.currentTarget.style.position = 'absolute'; e.currentTarget.style.left = '-9999px'; e.currentTarget.style.width = '1px'; e.currentTarget.style.height = '1px' }}>Skip to main content</a>
      <header className="lp-navbar" role="banner">
        <div className="lp-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Image src="/images/newmi/newmi-logo.svg" alt="Newmi Care logo" width={100} height={28} priority style={{ height: 28, width: 'auto' }} />
          <nav className="lp-nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center' }} aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }} aria-label={l.label}>{l.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>Admin</button>
            <button onClick={() => window.location.href = '/dashboard?tab=riya'} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px' }}>Riya</button>
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

      <main id="main-content">
        <section className="lp-hero" id="hero" aria-labelledby="hero-title">
          <div className="lp-container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center', position: 'relative' }}>
            <span style={{ background: '#FEF2F2', color: '#BB2026', border: '1px solid #FBCFE8', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600, padding: '4px 14px', display: 'inline-block', letterSpacing: '0.02em' }}>
              {heroTagline}
            </span>
            <h1 id="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#111827', lineHeight: 1.15, marginTop: 20, letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>{heroHeading}</h1>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', marginTop: 12, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              {heroSubtext}
            </p>

            <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => openBooking()} style={{ padding: '10px 24px', background: '#BB2026', color: 'white', fontWeight: 600, fontSize: '0.85rem', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                <MessageSquare size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Book Free Consultation
              </button>
              <button onClick={() => setQuizOpen(true)} style={{ padding: '10px 20px', background: '#FFFFFF', color: '#374151', fontWeight: 500, fontSize: '0.85rem', borderRadius: 10, border: '1px solid #D1D5DB', cursor: 'pointer', fontFamily: 'inherit' }}>
                <Activity size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Check Your Health Score
              </button>
            </div>
            <div style={{ marginTop: 28, padding: '14px 20px', background: '#F9FAFB', borderRadius: 14, border: '1px solid #F3F4F6', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap', fontSize: '0.82rem', color: '#6B7280' }}>
                <span ref={countRef} style={{ fontWeight: 700, color: '#BB2026' }}>{liveCount}</span> women consulted today
                <span style={{ width: 1, height: 12, background: '#D1D5DB', margin: '0 8px' }} />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: availabilityDot === 'green' ? '#22C55E' : availabilityDot === 'yellow' ? '#EAB308' : '#EF4444', display: 'inline-block' }} />
                  {availabilityText}
                </span>
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap', fontSize: '0.78rem', color: '#9CA3AF' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{[0,1,2,3,4].map(i => <Star key={i} size={11} fill="#D97706" color="#D97706" />)}<strong style={{ color: '#374151', marginLeft: 2 }}>4.9+</strong> App Rating</span>
                <span style={{ width: 1, height: 10, background: '#D1D5DB', margin: '0 8px' }} />
                <Shield size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3, color: '#9CA3AF' }} /> HIPAA Compliant
                <span style={{ width: 1, height: 10, background: '#D1D5DB', margin: '0 8px' }} />
                10,000+ women helped
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.78rem', color: '#9CA3AF', borderTop: '1px solid #F3F4F6', paddingTop: 10 }}>
                <Activity size={12} color="#22C55E" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tickerMessages[tickerIdx]}</span>
              </div>
            </div>
          </div>
        </section>

        {/* How Newmi Supports You */}
        <section className="lp-section" id="how-we-help" aria-labelledby="help-title" style={{ background: '#FFFFFF', borderBottom: '1px solid #F3F4F6' }}>
          <div className="lp-container">
            <h2 id="help-title" className="lp-title">How Newmi Supports You</h2>
            <p className="lp-subtitle">Three ways to get the care you need, when you need it.</p>
            <div className="lp-grid-3">
              {[
                { img: '/images/newmi/support-clinic.png', title: 'Visit Clinics', desc: 'In-Person Care, Near You. Get personalized support at our women and child clinics in Gurugram.', cta: 'Find a Clinic', href: '#find-clinic' },
                { img: '/images/newmi/support-digital.png', title: 'Digital Consultations', desc: 'Experts On Call, Always. Instant access to top specialists from puberty to menopause.', cta: 'Consult Online', href: 'https://clinic.newmi.in' },
                { img: '/images/newmi/support-smartopd.png', title: 'Smart OPD', desc: 'Preventive & Proactive care for employers, insurers, and government health programs.', cta: 'Learn More', href: '#conditions' },
              ].map((item) => (
                <article key={item.title} style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <Image src={item.img} alt={item.title} width={64} height={64} style={{ objectFit: 'contain', margin: '0 auto 16px' }} />
                  <h3 style={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>{item.title}</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5, marginTop: 8 }}>{item.desc}</p>
                  <a href={item.href} onClick={(e) => { if (item.href.startsWith('#')) { e.preventDefault(); scrollTo(item.href.slice(1)) } }}
                    style={{ display: 'inline-block', marginTop: 16, padding: '8px 20px', background: '#BB2026', color: 'white', fontWeight: 600, fontSize: '0.82rem', borderRadius: 8, textDecoration: 'none' }}>
                    {item.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>



        {/* Social Proof Toast */}
        {socialToast.show && (
          <div key={socialToast.id} style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: '#1F2937', color: 'white', padding: '12px 24px', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', fontSize: '0.85rem', whiteSpace: 'nowrap', maxWidth: '90vw', overflow: 'hidden', textOverflow: 'ellipsis', animation: 'fadeInUp 0.4s ease-out' }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#22C55E', marginRight: 10, verticalAlign: 'middle' }} />
            {socialToast.message}
          </div>
        )}

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
                            <Image src={DOCTOR_PORTRAITS[p.docIdx]} alt={`${doc.name} — ${doc.title} at Newmi Care`} width={32} height={32} className="rounded-full ring-2 ring-white shadow-sm" style={{ objectFit: 'cover', borderRadius: '50%' }} />
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
                <article key={doc.id} style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Image src={DOCTOR_PORTRAITS[idx]} alt={`${doc.name} — ${doc.title} at Newmi Care`} width={96} height={96} priority={idx < 2}
                      style={{ objectFit: 'cover', borderRadius: '50%', width: 96, height: 96, border: '2px solid #F3F4F6' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', lineHeight: 1.3 }}>{doc.name}</h3>
                      <p style={{ color: '#BB2026', fontSize: '0.78rem', fontWeight: 600, marginTop: 1 }}>{doc.title}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, padding: '10px 12px', background: '#F9FAFB', borderRadius: 10, fontSize: '0.8rem', color: '#374151', lineHeight: 1.4 }}>{doc.qualifications}</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 16, fontSize: '0.78rem', color: '#6B7280' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {doc.experience}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={14} /> {doc.languages.join(', ')}</span>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    {dayAvail(doc.availableDays) ? (
                      <span style={{ background: '#ECFDF5', color: '#166534', fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} /> Available Today
                      </span>
                    ) : (
                      <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>Next: {doc.availableDays[0]}</span>
                    )}
                  </div>
                  <button style={{ marginTop: 14, padding: '10px 0', width: '100%', background: '#BB2026', color: 'white', fontWeight: 600, fontSize: '0.85rem', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    onClick={() => openBooking(doc.specialization[0])}>
                    Book with {doc.name.split(' ').slice(-1)[0]}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="live-stats" aria-labelledby="stats-title" style={{ background: '#FFFFFF', borderBottom: '1px solid #F3F4F6' }}>
          <div className="lp-container" style={{ textAlign: 'center' }}>
            <h2 id="stats-title" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111827' }}>Trusted by Thousands of Women</h2>
            <p style={{ color: '#6B7280', marginTop: 8, fontSize: '0.9rem' }}>Real outcomes from real women across India.</p>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
              {LIVE_STATS.map((stat, i) => (
                <div key={stat.label} style={{ background: '#F9FAFB', borderRadius: 16, padding: '28px 16px', border: '1px solid #F3F4F6' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827' }}>
                    {stat.format(animatedStats[i] || 0)}
                    <span style={{ fontSize: '1rem', fontWeight: 400, color: '#9CA3AF' }}>{stat.suffix}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', alignItems: 'center' }}>
                {TRUST_BADGES.map((badge) => {
                  if (badge.img) {
                    return (
                      <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: '0.82rem', fontWeight: 500 }}>
                        <Image src={badge.img} alt={badge.label} width={22} height={22} style={{ objectFit: 'contain', borderRadius: 2 }} /> {badge.label}
                      </div>
                    )
                  }
                  const BIcon = badge.icon!
                  return (
                    <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: '0.82rem', fontWeight: 500 }}>
                      <BIcon size={16} color="#9CA3AF" /> {badge.label}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" id="app" aria-labelledby="app-title" style={{ background: '#FFFFFF', borderBottom: '1px solid #F3F4F6' }}>
          <div className="lp-container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h2 id="app-title" style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Your Health in Your Pocket</h2>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', maxWidth: 440 }}>Book appointments, access records, and chat with doctors — all from your phone.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center', marginTop: 40 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ position: 'absolute', inset: -4, borderRadius: 24, background: 'linear-gradient(135deg, #BB2026 0%, #9c151c 50%, #6B21A8 100%)', opacity: 0.15 }} />
                  <Image src="/images/newmi/app-mockup.png" alt="Newmi Care mobile app" width={240} height={480} priority style={{ objectFit: 'contain', width: 240, height: 'auto', position: 'relative', zIndex: 1, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href="https://apps.apple.com/in/app/newmi-care/id6745163798" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.15s' }}>
                    <Image src="/images/newmi/app-store-btn.png" alt="Download on the App Store" width={130} height={40} style={{ objectFit: 'contain', height: 38, width: 'auto' }} />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.kahealthcare.newmicare1" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.15s' }}>
                    <Image src="/images/newmi/play-store-btn.png" alt="Get it on Google Play" width={130} height={40} style={{ objectFit: 'contain', height: 38, width: 'auto' }} />
                  </a>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                {APP_FEATURES.map((f) => {
                  const FIcon = f.icon
                  return (
                    <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 16px', background: '#F9FAFB', borderRadius: 12, border: '1px solid #F3F4F6' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#BB2026' }}><FIcon size={20} /></div>
                      <div>
                        <h3 style={{ fontWeight: 600, color: '#111827', fontSize: '0.88rem' }}>{f.title}</h3>
                        <p style={{ color: '#6B7280', fontSize: '0.8rem', lineHeight: 1.5, marginTop: 2 }}>{f.desc}</p>
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
                          <button onClick={() => scrollTo('app')} style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 9999, border: '1px solid #E5E7EB', background: '#F9FAFB', color: '#6B7280', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' }}>
                            <Lock size={12} /> Login to access
                          </button>
                        </TooltipTrigger>
                        <TooltipContent style={{ maxWidth: 280, fontSize: '0.82rem', lineHeight: 1.5 }}>
                          Download the Newmi app to access this feature.
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
            <div style={{ marginTop: 32, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.012345678901!2d77.012345!3d28.012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDAwJzQ0LjQiTiA3N8KwMDAnNDQuNCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="320"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Newmi Care clinic locations in Gurugram"
                aria-label="Map showing Newmi Care clinic locations in Gurugram"
              />
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt" id="testimonials" aria-labelledby="testimonials-title">
          <div className="lp-container" style={{ textAlign: 'center' }}>
            <h2 id="testimonials-title" className="lp-title">Patient Stories</h2>
            <p className="lp-subtitle">Real experiences from women who trust Newmi Care.</p>
            <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
              {(() => {
                const t = TESTIMONIALS[testimonialIdx]
                return (
                  <div key={testimonialIdx} style={{ animation: 'fadeIn 0.35s ease' }}>
                    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '32px 36px', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 12 }}>{renderStars(t.rating)}</div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#F0FDF4', color: '#166534', fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 9999, marginBottom: 14 }}>
                        <CheckCircle size={10} /> Verified
                      </div>
                      <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.7, margin: '0 auto' }}>&ldquo;{t.text}&rdquo;</p>
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                        <p style={{ color: '#111827', fontWeight: 600, fontSize: '0.88rem' }}>{t.name}{t.location ? `, ${t.location}` : ''}</p>
                        <p style={{ color: '#BB2026', fontSize: '0.78rem', fontWeight: 500, marginTop: 2 }}>{t.condition}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                      {TESTIMONIALS.map((_, i) => (
                        <button key={i} onClick={() => setTestimonialIdx(i)}
                          style={{ width: i === testimonialIdx ? 20 : 6, height: 6, borderRadius: 9999, border: 'none', background: i === testimonialIdx ? '#BB2026' : '#D1D5DB', cursor: 'pointer', padding: 0, transition: 'all 0.2s ease' }} />
                      ))}
                    </div>
                  </div>
                )
              })()}
              <button onClick={testPrev} aria-label="Previous" style={{ position: 'absolute', left: -14, top: '42%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #E5E7EB', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', color: '#374151', padding: 0 }}><ChevronLeft size={18} /></button>
              <button onClick={testNext} aria-label="Next" style={{ position: 'absolute', right: -14, top: '42%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #E5E7EB', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', color: '#374151', padding: 0 }}><ChevronRight size={18} /></button>
            </div>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Image src="/images/newmi/google-reviews-badge.png" alt="Google" width={80} height={26} style={{ objectFit: 'contain', height: 24, width: 'auto' }} />
              <span style={{ color: '#6B7280', fontSize: '0.78rem' }}><strong style={{ color: '#374151' }}>4.9+</strong> App Rating</span>
            </div>
          </div>
        </section>

        <section className="lp-section" id="founders" aria-labelledby="founders-title" style={{ background: '#F9FAFB' }}>
          <div className="lp-container" style={{ textAlign: 'center' }}>
            <h2 id="founders-title" className="lp-title">Built by Those Who Understand</h2>
            <p className="lp-subtitle" style={{ marginBottom: 32 }}>Our founders turned personal health battles into a mission for every woman.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              {FOUNDERS.map((f) => (
                  <article key={f.name} className="lp-card" style={{ padding: 28, textAlign: 'center', border: '1px solid #E5E7EB' }}>
                    <Image src={f.image} alt={f.name} width={72} height={72} style={{ borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px' }} />
                    <h3 style={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>{f.name}</h3>
                    <p style={{ color: '#BB2026', fontSize: '0.82rem', fontWeight: 600, marginTop: 2 }}>{f.title}</p>
                    <div style={{ marginTop: 12, padding: '8px 12px', background: '#FEF2F2', borderRadius: 8, fontSize: '0.85rem', color: '#BB2026', fontWeight: 500, lineHeight: 1.4 }}>{f.story}</div>
                    <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: 12, lineHeight: 1.5 }}>{f.credential}</p>
                  </article>
              ))}
            </div>
            <div style={{ marginTop: 28, borderTop: '1px solid #E5E7EB', paddingTop: 20 }}>
              <p style={{ color: '#6B7280', fontSize: '0.85rem', fontStyle: 'italic' }}>&ldquo;Every woman deserves complete, compassionate care.&rdquo;</p>
              <p style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: 4 }}>&mdash; The Newmi Team</p>
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

        <section id="contact" style={{ background: 'linear-gradient(135deg, #BB2026 0%, #9c151c 100%)', padding: '72px 0', textAlign: 'center', color: 'white' }} aria-labelledby="cta-title">
          <div className="lp-container" style={{ maxWidth: 640 }}>
            <h2 id="cta-title" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.3 }}>Book Your Consultation Today</h2>
            <p style={{ marginTop: 10, fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.5 }}>Take the first step towards better health. Our specialists are just a click away.</p>
            <button style={{ marginTop: 28, background: 'white', color: '#BB2026', borderRadius: 12, padding: '14px 36px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', fontFamily: 'inherit', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onClick={() => openBooking()}>
              Book Now &mdash; It&apos;s Free
            </button>
            <div style={{ marginTop: 28, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem', opacity: 0.9 }}>
              <a href="tel:+918929345355" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'inherit', textDecoration: 'none' }}><Phone size={14} /> +91-8929345355</a>
              <a href="mailto:care@newmi.in" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'inherit', textDecoration: 'none' }}><Mail size={14} /> care@newmi.in</a>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => openBooking()}><MessageCircle size={14} /> Chat on WhatsApp</span>
            </div>
          </div>
        </section>

        {/* Smart Newsletter Section (B8) */}
        <section className="lp-section" id="newsletter" aria-labelledby="nl-title" style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
          <div className="lp-container" style={{ textAlign: 'center', maxWidth: 520 }}>
            <h2 id="nl-title" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Stay Informed</h2>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.5, marginBottom: 20 }}>Weekly tips, expert articles, and updates on women&apos;s health straight to your inbox.</p>
            {subscribed ? (
              <div style={{ padding: '14px 20px', background: '#F0FDF4', borderRadius: 10, display: 'inline-block', fontSize: '0.88rem', color: '#166534', fontWeight: 500 }}>
                ✅ You&apos;re subscribed! Check your inbox for our welcome email.
              </div>
            ) : (
              <form onSubmit={subscribe} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <input type="email" placeholder="Enter your email" value={email} onChange={e => { setEmail(e.target.value); setEmailError('') }}
                    style={{ padding: '11px 16px', borderRadius: 10, border: emailError ? '2px solid #FCA5A5' : '1px solid #D1D5DB', width: 240, fontSize: '0.88rem', color: '#111827', fontFamily: 'inherit', outline: 'none' }} />
                  {emailError && <p style={{ color: '#DC2626', fontSize: '0.72rem', marginTop: 4, textAlign: 'left', position: 'absolute' }}>{emailError}</p>}
                </div>
                <button type="submit" disabled={subscribing} style={{ padding: '11px 22px', background: '#BB2026', color: 'white', fontWeight: 600, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'inherit', opacity: subscribing ? 0.7 : 1 }}>
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: 10 }}>We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>

      <div style={{ display: showSticky && !bookingOpen && stickyVisible ? 'flex' : 'none', position: 'fixed', bottom: 0, left: 0, right: 0, background: '#BB2026', padding: '8px 16px', zIndex: 40, boxShadow: '0 -4px 20px rgba(0,0,0,0.15)', alignItems: 'center', justifyContent: 'center', height: 56, gap: 8 }}
        className="lp-sticky-mobile md:hidden">
        <button onClick={() => openBooking()} style={{ background: 'white', color: '#BB2026', padding: '10px 24px', fontWeight: 700, fontSize: '0.95rem', borderRadius: 10, border: 'none', cursor: 'pointer', flex: 1, maxWidth: 400, fontFamily: 'inherit' }}>
          {stickyCtaLabel}
        </button>
        <a href="tel:+918929345535" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, flexShrink: 0 }}>
          <Phone size={20} />
        </a>
      </div>

      <button onClick={() => openWhatsApp()} aria-label="Chat on WhatsApp"
        style={{ position: 'fixed', bottom: showSticky ? 72 : 24, right: 20, width: 56, height: 56, borderRadius: '50%', background: '#25D366', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,211,102,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'bottom 0.3s ease', fontSize: 28 }}>
        <MessageCircle size={28} />
      </button>

      <button onClick={() => setSymptomCheckOpen(true)} aria-label="Chat with Nivi AI"
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
              {[{ l: 'About', id: 'founders' }, { l: 'Our Specialities', id: 'conditions' }, { l: 'Meet Our Doctors', id: 'doctors' }, { l: 'How It Works', id: 'how-we-help' }, { l: 'Why Newmi Care', id: 'why-newmi' }].map(({ l, id }) => <p key={l} style={{ marginBottom: 6 }}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id) }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.82rem', cursor: 'pointer' }}>{l}</a></p>)}
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>Services</h4>
              {[{ l: 'PCOS/PCOD', id: 'conditions' }, { l: 'Fertility', id: 'conditions' }, { l: 'Pregnancy', id: 'conditions' }, { l: 'Menopause', id: 'conditions' }, { l: 'Mental Health', id: 'conditions' }].map(({ l, id }) => <p key={l} style={{ marginBottom: 6 }}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id) }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.82rem', cursor: 'pointer' }}>{l}</a></p>)}
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
                <a href="https://www.instagram.com/newmicare/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.6)' }}><Instagram size={20} /></a>
                <a href="https://www.facebook.com/in.newmi" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.6)' }}><Facebook size={20} /></a>
                <a href="https://www.linkedin.com/company/newmi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'rgba(255,255,255,0.6)' }}><Linkedin size={20} /></a>
                <a href="https://twitter.com/newmicare" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{ color: 'rgba(255,255,255,0.6)' }}><Twitter size={20} /></a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 32, paddingTop: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            <span>&copy; 2025 Newmi Care. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="https://newmi.in/policies/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="https://newmi.in/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms of Service</a>
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
