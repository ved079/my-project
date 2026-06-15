'use client'

import { useState, useEffect } from 'react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { CheckCircle, Phone, MessageCircle, ArrowLeft } from 'lucide-react'
import { captureUTM, persistUTM, getStoredUTM } from '@/lib/utm'

const CONDITIONS = [
  { id: 'pcos', label: 'PCOS/PCOD' },
  { id: 'fertility', label: 'Fertility' },
  { id: 'pregnancy', label: 'Pregnancy' },
  { id: 'menopause', label: 'Menopause' },
  { id: 'mental', label: 'Mental Health' },
  { id: 'other', label: 'Other' },
]

const DURATIONS = ['Just started', 'A few months', 'Over a year', 'Not sure']

const TIMING_OPTIONS = [
  { value: 'today', label: 'Today', msg: 'Our specialists are available today.' },
  { value: 'week', label: 'This week', msg: 'Our specialists are available this week.' },
  { value: 'exploring', label: 'Just exploring', msg: 'No rush — explore care options at your pace.' },
]

export function BookingModal({
  open, onOpenChange, preSelectedCondition,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  preSelectedCondition?: string
}) {
  const [step, setStep] = useState(1)
  const [condition, setCondition] = useState(preSelectedCondition || '')
  const [duration, setDuration] = useState('')
  const [timing, setTiming] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsappOptin, setWhatsappOptin] = useState(true)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (open) {
      setCondition(preSelectedCondition || '')
      setStep(1)
      setDuration('')
      setTiming('')
      setPhone('')
      setWhatsappOptin(true)
      setConfirmed(false)
    }
  }, [open, preSelectedCondition])

  const reset = () => {
    setStep(1); setCondition(preSelectedCondition || ''); setDuration('')
    setTiming(''); setPhone(''); setWhatsappOptin(true); setConfirmed(false)
  }

  const handleOpenChange = (v: boolean) => {
    if (!v) reset()
    onOpenChange(v)
  }

  const confirmBooking = async () => {
    setConfirmed(true)
    if (phone) {
      const msg = encodeURIComponent(
        `Hi Newmi Care! I'd like to book a consultation for ${condition || 'a health concern'}. My number is ${phone}.`
      )
      const utm = { ...getStoredUTM(), ...captureUTM() }
      if (utm.utmSource || utm.utmMedium || utm.utmCampaign) persistUTM(utm)
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Booking: ${condition || 'General'}`,
          phone,
          email: '',
          service: condition || 'General',
          source: 'booking_modal',
          location: 'Website',
          inquiryTime: new Date().toISOString(),
          slaDeadline: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          utmSource: utm.utmSource || '',
          utmMedium: utm.utmMedium || '',
          utmCampaign: utm.utmCampaign || '',
        }),
      }).catch(() => {})
      window.open(`https://wa.me/918929345355?text=${msg}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={!confirmed}>
        {confirmed ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={36} color="#059669" />
              </div>
            </div>
            <DialogTitle style={{ fontSize: '1.25rem', color: '#111827' }}>You&apos;re all set!</DialogTitle>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: 8, lineHeight: 1.5 }}>
              Our team will contact you within 10 minutes.
            </p>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <div style={{ padding: '12px 16px', background: '#F9FAFB', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: '#111827' }}>
                <Phone size={16} color="#BB2026" />
                <a href="tel:+918929345355" style={{ color: '#111827', textDecoration: 'none', fontWeight: 600 }}>+91-8929345355</a>
              </div>
              <a
                href={`https://wa.me/918929345355?text=${encodeURIComponent(`Hi Newmi Care! I just booked a consultation for ${condition || 'a health concern'}.`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ padding: '10px 20px', background: '#25D366', color: 'white', borderRadius: 10, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit' }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
            <button
              onClick={() => handleOpenChange(false)}
              style={{ marginTop: 12, background: 'none', border: 'none', color: '#6B7280', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {step > 1 && (
                  <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 }}>
                    <ArrowLeft size={18} />
                  </button>
                )}
                <DialogTitle>
                  {step === 1 && "What's your concern?"}
                  {step === 2 && 'How long have you been experiencing this?'}
                  {step === 3 && 'When would you like to consult?'}
                  {step === 4 && 'Almost there!'}
                </DialogTitle>
              </div>
              <DialogDescription>
                {step === 1 && 'Select the area you need help with.'}
                {step === 2 && 'This helps us match you with the right specialist.'}
                {step === 3 && "Choose a timeframe that works for you."}
                {step === 4 && 'Share your contact details to confirm the booking.'}
              </DialogDescription>
            </DialogHeader>

            <div style={{ padding: '8px 0' }}>
              {step === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {CONDITIONS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setCondition(c.label); setStep(2) }}
                      style={{
                        padding: '14px 12px', borderRadius: 10, fontSize: '0.88rem', fontWeight: 600,
                        border: condition === c.label ? '2px solid #BB2026' : '1.5px solid #D1D5DB',
                        background: condition === c.label ? '#FEF2F2' : 'white',
                        color: condition === c.label ? '#BB2026' : '#374151',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {DURATIONS.map(d => (
                    <button
                      key={d}
                      onClick={() => { setDuration(d); setStep(3) }}
                      style={{
                        padding: '14px 16px', borderRadius: 10, fontSize: '0.88rem', fontWeight: 500, textAlign: 'left',
                        border: duration === d ? '2px solid #BB2026' : '1.5px solid #E5E7EB',
                        background: duration === d ? '#FEF2F2' : 'white',
                        color: '#374151', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {TIMING_OPTIONS.map(t => (
                    <button
                      key={t.value}
                      onClick={() => { setTiming(t.value); setStep(4) }}
                      style={{
                        padding: '14px 16px', borderRadius: 10, fontSize: '0.88rem', fontWeight: 500, textAlign: 'left',
                        border: timing === t.value ? '2px solid #BB2026' : '1.5px solid #E5E7EB',
                        background: timing === t.value ? '#FEF2F2' : 'white',
                        color: '#374151', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{t.label}</div>
                      <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: 2 }}>{t.msg}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div>
                  <div style={{ padding: '10px 14px', background: '#F9FAFB', borderRadius: 10, marginBottom: 16, fontSize: '0.85rem', color: '#6B7280' }}>
                    <span style={{ fontWeight: 600, color: '#111827' }}>Concern:</span> {condition || 'Not specified'} &middot;
                    <span style={{ fontWeight: 600, color: '#111827', marginLeft: 4 }}>Duration:</span> {duration} &middot;
                    <span style={{ fontWeight: 600, color: '#111827', marginLeft: 4 }}>Timing:</span> {timing}
                  </div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Phone Number
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #D1D5DB', borderRadius: 10, padding: '2px 12px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500 }}>+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter your phone number"
                      style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 8px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                    />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: '0.85rem', color: '#374151', cursor: 'pointer' }}>
                    <input type="checkbox" checked={whatsappOptin} onChange={e => setWhatsappOptin(e.target.checked)}
                      style={{ width: 18, height: 18, accentColor: '#BB2026' }} />
                    Send me updates on WhatsApp
                  </label>
                  <button
                    onClick={confirmBooking}
                    style={{
                      marginTop: 20, width: '100%', padding: '14px 0', background: '#BB2026', color: 'white',
                      borderRadius: 10, fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    <MessageCircle size={18} /> Confirm Booking
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
