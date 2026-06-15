'use client'

import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion'
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/shared/ScrollReveal'

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

export default function FaqSection() {
  return (
    <ScrollReveal as="section" className="lp-section" id="faq" aria-labelledby="faq-title">
      <div className="lp-container" style={{ maxWidth: 800 }}>
        <h2 id="faq-title" className="lp-title">Frequently Asked Questions</h2>
        <p className="lp-subtitle">Quick answers to common questions about our services.</p>
        <Accordion type="single" collapsible>
          <StaggerContainer>
            {FAQ_ITEMS.map((item, i) => (
              <StaggerItem key={i}>
                <AccordionItem value={`faq-${i}`}>
                  <AccordionTrigger style={{ fontSize: '0.9rem', color: '#111827' }}>{item.q}</AccordionTrigger>
                  <AccordionContent style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.a}</AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Accordion>
      </div>
    </ScrollReveal>
  )
}
