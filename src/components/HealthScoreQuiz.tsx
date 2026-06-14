'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Activity, ArrowLeft, HeartPulse, Sparkles, CheckCircle } from 'lucide-react'

const QUIZ = [
  { q: 'How would you rate your energy levels lately?', options: ['Very low — tired all the time', 'Lower than usual', 'Normal', 'High — feeling great'] },
  { q: 'How is your menstrual cycle?', options: ['Irregular or painful', 'Some changes recently', 'Regular and normal', 'Not applicable'] },
  { q: 'How is your stress level?', options: ['Very high — affecting daily life', 'Moderate — manageable', 'Low — feeling balanced', 'Minimal stress'] },
  { q: 'How is your sleep quality?', options: ['Poor — trouble sleeping most nights', 'Fair — occasional disruptions', 'Good — sleep well most nights', 'Excellent — restful sleep'] },
  { q: 'Any physical discomfort or symptoms?', options: ['Multiple symptoms affecting me', 'One or two mild symptoms', 'Occasional discomfort', 'No physical concerns'] },
]

interface QuizResult { score: number; label: string; color: string; recommendation: string }

function computeResult(answers: number[]): QuizResult {
  const total = answers.reduce((a, b) => a + b, 0)
  const max = answers.length * 3
  const pct = Math.round((total / max) * 100)
  if (pct >= 80) return { score: pct, label: 'Excellent', color: '#16A34A', recommendation: 'You\'re doing great! Keep up your wellness routine and schedule an annual checkup.' }
  if (pct >= 60) return { score: pct, label: 'Good', color: '#22C55E', recommendation: 'Mostly healthy. A few areas could use attention — consider a wellness consultation.' }
  if (pct >= 40) return { score: pct, label: 'Fair', color: '#EAB308', recommendation: 'Some areas need attention. Book a consultation to discuss your symptoms.' }
  return { score: pct, label: 'Needs Attention', color: '#EF4444', recommendation: 'Your responses suggest you may benefit from a medical consultation soon.' }
}

export function HealthScoreQuiz({ open, onOpenChange, onBook }: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onBook: (condition?: string) => void
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<QuizResult | null>(null)

  const answer = (idx: number) => {
    const newAnswers = [...answers, idx]
    setAnswers(newAnswers)
    if (step < QUIZ.length - 1) {
      setStep(step + 1)
    } else {
      setResult(computeResult(newAnswers))
    }
  }

  const reset = () => { setStep(0); setAnswers([]); setResult(null) }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v) }}>
      <DialogContent className="sm:max-w-md" style={{ padding: '28px 24px' }}>
        {!result ? (
          <>
            <DialogHeader>
              <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem' }}>
                <Activity size={18} color="#BB2026" /> Health Score Check
              </DialogTitle>
              <DialogDescription>Answer 5 quick questions for a personalized health assessment.</DialogDescription>
            </DialogHeader>
            <div style={{ marginTop: 8, height: 4, background: '#F3F4F6', borderRadius: 2 }}>
              <div style={{ height: 4, background: '#BB2026', borderRadius: 2, width: `${((step + 1) / QUIZ.length) * 100}%`, transition: 'width 0.3s ease' }} />
            </div>
            <p style={{ marginTop: 12, fontSize: '0.9rem', fontWeight: 600, color: '#111827' }}>{QUIZ[step].q}</p>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {QUIZ[step].options.map((opt, i) => (
                <button key={i} onClick={() => answer(i)}
                  style={{ padding: '11px 14px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 500, textAlign: 'left', border: '1.5px solid #E5E7EB', background: 'white', color: '#374151', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#BB2026'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                  {opt}
                </button>
              ))}
            </div>
            <p style={{ marginTop: 14, fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center' }}>{step + 1} of {QUIZ.length}</p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: result.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <HeartPulse size={32} color={result.color} />
            </div>
            <DialogTitle style={{ fontSize: '1.15rem' }}>Your HealthScore</DialogTitle>
            <div style={{ marginTop: 12, fontSize: '2.5rem', fontWeight: 800, color: result.color }}>{result.score}<span style={{ fontSize: '1rem', fontWeight: 400, color: '#9CA3AF' }}>%</span></div>
            <div style={{ marginTop: 4, fontSize: '0.9rem', fontWeight: 600, color: result.color }}>{result.label}</div>
            <p style={{ marginTop: 12, fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.5, maxWidth: 340, margin: '12px auto 0' }}>{result.recommendation}</p>
            <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button onClick={() => { onBook(); onOpenChange(false) }}
                style={{ padding: '11px 24px', background: '#BB2026', color: 'white', fontWeight: 600, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'inherit' }}>
                Book a Consultation
              </button>
              <button onClick={reset}
                style={{ padding: '11px 20px', background: 'white', color: '#6B7280', border: '1px solid #D1D5DB', borderRadius: 10, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Retake
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
