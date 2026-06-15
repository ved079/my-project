'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AlertTriangle, Search, Shield, HeartPulse, Sparkles, ArrowLeft, Clock, Loader2 } from 'lucide-react'

const COMMON_SYMPTOMS = [
  'Irregular periods', 'Heavy bleeding', 'Missed period', 'Weight gain',
  'Acne', 'Hair loss', 'Facial hair', 'Infertility',
  'Miscarriage', 'Morning sickness', 'Pelvic pain', 'Mood swings',
  'Anxiety', 'Depression', 'Insomnia', 'Hot flashes',
  'Night sweats', 'Vaginal dryness', 'Breast pain', 'Bloating',
  'Fatigue', 'Headaches', 'Back pain', 'Frequent urination',
]

interface SymptomResult {
  possibleCondition: string
  recommendedCarePlan: string
  urgency: string
  recommendation: string
  matches: Array<{ symptom: string; condition: string }>
  matchedCount: number
  urgent: boolean
  disclaimer: string
}

export function SymptomCheckerWidget({ open, onOpenChange, onBook }: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onBook: (condition?: string) => void
}) {
  const [step, setStep] = useState<'input' | 'result'>('input')
  const [selected, setSelected] = useState<string[]>([])
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SymptomResult | null>(null)

  const toggleSymptom = (s: string) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const analyze = async () => {
    if (selected.length === 0) return
    setLoading(true)
    try {
      const res = await fetch('/api/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selected, age: age || undefined }),
      })
      const data = await res.json()
      if (res.ok) setResult(data)
      else throw new Error()
      setStep('result')
    } catch {
      setResult({
        possibleCondition: selected[0] || 'General Health',
        recommendedCarePlan: 'General Consultation',
        urgency: 'routine',
        recommendation: 'Please book a consultation with our specialists for personalized advice.',
        matches: selected.map(s => ({ symptom: s, condition: s })),
        matchedCount: selected.length,
        urgent: false,
        disclaimer: 'This is not a medical diagnosis. Always consult with a qualified healthcare provider.',
      })
      setStep('result')
    }
    setLoading(false)
  }

  const reset = () => {
    setStep('input'); setSelected([]); setAge(''); setResult(null)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v) }}>
      <DialogContent className="sm:max-w-lg" style={{ padding: '28px 24px' }}>
        {step === 'input' ? (
          <>
            <DialogHeader>
              <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Search size={20} color="#BB2026" /> AI Symptom Checker
              </DialogTitle>
              <DialogDescription>
                Select the symptoms you&apos;re experiencing. Our AI will suggest the right care plan.
              </DialogDescription>
            </DialogHeader>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {COMMON_SYMPTOMS.map(s => (
                <button key={s} onClick={() => toggleSymptom(s)}
                  style={{
                    padding: '6px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 500,
                    border: selected.includes(s) ? '2px solid #BB2026' : '1px solid #D1D5DB',
                    background: selected.includes(s) ? '#FEF2F2' : 'white',
                    color: selected.includes(s) ? '#BB2026' : '#374151',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
                  }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <input type="number" placeholder="Age (optional)" value={age} onChange={e => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))}
                style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #D1D5DB', width: 100, fontSize: '0.9rem', fontFamily: 'inherit' }} />
              <button onClick={analyze} disabled={selected.length === 0 || loading}
                style={{
                  padding: '10px 24px', background: '#BB2026', color: 'white', borderRadius: 10, fontWeight: 700,
                  border: 'none', cursor: selected.length === 0 || loading ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem', fontFamily: 'inherit', opacity: selected.length === 0 || loading ? 0.6 : 1,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={16} />}
                {loading ? 'Analyzing...' : 'Analyze Symptoms'}
              </button>
            </div>
          </>
        ) : result && (
          <>
            <DialogHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 }}>
                  <ArrowLeft size={18} />
                </button>
                <DialogTitle style={{ fontSize: '1rem' }}>Analysis Result</DialogTitle>
              </div>
            </DialogHeader>
            <div style={{ marginTop: 12 }}>
              {result.urgent && (
                <div style={{ padding: '10px 14px', background: '#FEF2F2', borderRadius: 10, marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <AlertTriangle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontWeight: 700, color: '#DC2626', fontSize: '0.85rem' }}>Urgent — Please seek medical attention</p>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: 2 }}>Your symptoms require prompt evaluation.</p>
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ padding: '12px 16px', background: '#F9FAFB', borderRadius: 10 }}>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: 4 }}>Possible Condition</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>{result.possibleCondition}</p>
                </div>
                <div style={{ padding: '12px 16px', background: '#FEF2F2', borderRadius: 10 }}>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: 4 }}>Recommended Care Plan</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#BB2026' }}>{result.recommendedCarePlan}</p>
                </div>
              </div>
              <div style={{ marginTop: 12, padding: '12px 16px', background: '#F9FAFB', borderRadius: 10 }}>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: 4 }}>Recommendation</p>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.6 }}>{result.recommendation}</p>
              </div>
              {result.matches && result.matches.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {result.matches.map(m => (
                    <span key={m.symptom} style={{ padding: '3px 10px', background: '#F3F4F6', borderRadius: 12, fontSize: '0.75rem', color: '#6B7280' }}>
                      {m.symptom}
                    </span>
                  ))}
                </div>
              )}
              <p style={{ marginTop: 12, fontSize: '0.72rem', color: '#6B7280', fontStyle: 'italic' }}>{result.disclaimer}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button onClick={() => { onBook(result.recommendedCarePlan); onOpenChange(false) }}
                  className="lp-cta-primary" style={{ flex: 1, padding: '12px', fontSize: '0.9rem', borderRadius: 10 }}>
                  <HeartPulse size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Book {result.recommendedCarePlan}
                </button>
                <button onClick={reset}
                  style={{ padding: '12px 16px', background: 'white', color: '#6B7280', border: '1px solid #D1D5DB', borderRadius: 10, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Check Again
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
