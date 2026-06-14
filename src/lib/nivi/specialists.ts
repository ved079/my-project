export interface Specialist {
  id: string
  name: string
  title: string
  qualifications: string
  specialization: string[]
  experience: string
  languages: string[]
  availableDays: string[]
}

export const SPECIALISTS: Specialist[] = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    title: 'OB-GYN',
    qualifications: 'MBBS, MS — Obstetrics & Gynaecology',
    specialization: ['pregnancy', 'prenatal', 'delivery', 'general gynecology'],
    experience: '14 years',
    languages: ['Hindi', 'English'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  {
    id: 'doc-2',
    name: 'Dr. Anita Rao',
    title: 'Fertility Specialist',
    qualifications: 'MBBS, MD — Reproductive Medicine',
    specialization: ['IVF', 'IUI', 'fertility', 'egg freezing', 'PCOS'],
    experience: '11 years',
    languages: ['Hindi', 'Telugu', 'English'],
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  {
    id: 'doc-3',
    name: 'Dr. Kavitha Menon',
    title: 'Reproductive Endocrinologist',
    qualifications: 'MBBS, DNB — Endocrinology',
    specialization: ['PCOS', 'hormonal disorders', 'thyroid', 'menopause'],
    experience: '9 years',
    languages: ['Hindi', 'Malayalam', 'English'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: 'doc-4',
    name: 'Dr. Sneha Agarwal',
    title: 'Fetal Medicine Specialist',
    qualifications: 'MBBS, MD — Fetal Medicine',
    specialization: ['high-risk pregnancy', 'fetal anomaly', 'NIPT', 'amniocentesis'],
    experience: '8 years',
    languages: ['Hindi', 'English'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  {
    id: 'doc-5',
    name: 'Dr. Ritu Nair',
    title: 'Gynecologic Oncologist',
    qualifications: 'MBBS, DM — Gynecologic Oncology',
    specialization: ['cervical cancer', 'ovarian cancer', 'colposcopy', 'LEEP'],
    experience: '16 years',
    languages: ['Hindi', 'Malayalam', 'English'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  },
]

export function findSpecialist(service: string): Specialist | undefined {
  const lower = service.toLowerCase()
  return SPECIALISTS.find((s) =>
    s.specialization.some((area) => lower.includes(area))
  )
}
