import type { LeadSource, LeadStatus } from '@/lib/types'

export const ACCENT = '#BB2026'
export const ACCENT_HOVER = '#9c151c'
export const ACCENT_LIGHT = '#F87171'
export const AMBER = '#D97706'
export const ORANGE = '#C05621'
export const GRAY = '#6B7280'
export const HEADING = '#111827'
export const CHART_1 = '#BB2026'
export const CHART_2 = '#6B7280'
export const CHART_3 = '#D97706'
export const CHART_4 = '#111827'
export const CHART_5 = '#059669'

export const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  color: '#111827',
  fontSize: '0.78rem',
  padding: '8px 12px',
  boxShadow: '0 2px 8px rgba(17,24,39,0.08)',
} as const

export const KPI_DATA = [
  { label: 'Total Leads', value: '312', delta: '23%', deltaDir: 'up' as const, spark: [30, 35, 28, 42, 38, 45, 47] },
  { label: 'Leads Today', value: '47', delta: '12%', deltaDir: 'up' as const, spark: [5, 8, 12, 7, 9, 11, 47] },
  { label: 'Cost Per Lead', value: '\u20B9285', delta: '8%', deltaDir: 'down' as const, spark: [380, 340, 310, 300, 295, 290, 285] },
  { label: 'Consultation Rate', value: '14.2%', delta: '1.8%', deltaDir: 'up' as const, spark: [10, 11, 12, 12.5, 13, 13.5, 14.2] },
  { label: 'Converted (Month)', value: '38', delta: '31%', deltaDir: 'up' as const, spark: [20, 24, 28, 30, 32, 35, 38] },
  { label: 'Revenue Influenced', value: '\u20B98.4L', delta: '18%', deltaDir: 'up' as const, spark: [5.2, 5.8, 6.4, 6.9, 7.2, 7.8, 8.4] },
]

export const DAILY_LEAD_VOLUME = [
  { day: 'Mon', google: 16, meta: 12, organic: 8, practo: 5, whatsapp: 4 },
  { day: 'Tue', google: 14, meta: 14, organic: 7, practo: 4, whatsapp: 3 },
  { day: 'Wed', google: 18, meta: 10, organic: 9, practo: 6, whatsapp: 5 },
  { day: 'Thu', google: 20, meta: 16, organic: 10, practo: 7, whatsapp: 6 },
  { day: 'Fri', google: 15, meta: 13, organic: 8, practo: 5, whatsapp: 4 },
  { day: 'Sat', google: 12, meta: 11, organic: 7, practo: 6, whatsapp: 3 },
  { day: 'Sun', google: 11, meta: 11, organic: 7, practo: 5, whatsapp: 0 },
]

export const SOURCE_MIX = [
  { name: 'Google Ads', value: 106, color: CHART_1 },
  { name: 'Meta Ads', value: 87, color: CHART_3 },
  { name: 'Organic SEO', value: 56, color: CHART_2 },
  { name: 'Practo', value: 38, color: ORANGE },
  { name: 'WhatsApp', value: 25, color: CHART_5 },
]

export const FUNNEL_DATA = [
  { name: 'Leads Received', count: 312, pct: '100%' },
  { name: 'Contacted', count: 248, pct: '79.5%' },
  { name: 'Consultation', count: 89, pct: '28.5%' },
  { name: 'Converted', count: 38, pct: '12.2%' },
]

export const CHANNEL_TABLE = [
  { channel: 'Google Ads', budget: '\u20B950,000', spend: '\u20B945,000', leads: 106, cpl: '\u20B9425', contacts: 84, consultations: 31, converted: 13, cvr: '12.3%', roi: '340%', trend: 'up' as const, roiVal: 340 },
  { channel: 'Meta Ads', budget: '\u20B940,000', spend: '\u20B938,000', leads: 87, cpl: '\u20B9437', contacts: 71, consultations: 26, converted: 10, cvr: '11.5%', roi: '290%', trend: 'up' as const, roiVal: 290 },
  { channel: 'Organic SEO', budget: '\u2014', spend: '\u20B90', leads: 56, cpl: '\u20B90', contacts: 48, consultations: 19, converted: 10, cvr: '17.9%', roi: '\u221E', trend: 'neutral' as const, roiVal: 9999 },
  { channel: 'Practo', budget: '\u20B915,000', spend: '\u20B912,000', leads: 38, cpl: '\u20B9316', contacts: 32, consultations: 14, converted: 4, cvr: '10.5%', roi: '520%', trend: 'up' as const, roiVal: 520 },
  { channel: 'WhatsApp', budget: '\u20B93,000', spend: '\u20B92,500', leads: 25, cpl: '\u20B9100', contacts: 22, consultations: 10, converted: 5, cvr: '20.0%', roi: '890%', trend: 'up' as const, roiVal: 890 },
]

export const CHANNEL_BAR_DATA = [
  { channel: 'Google Ads', spend: 45000, leads: 106 },
  { channel: 'Meta Ads', spend: 38000, leads: 87 },
  { channel: 'Organic', spend: 0, leads: 56 },
  { channel: 'Practo', spend: 12000, leads: 38 },
  { channel: 'WhatsApp', spend: 2500, leads: 25 },
]

export const ROI_BAR_DATA = [
  { channel: 'Google Ads', roi: 340 },
  { channel: 'Meta Ads', roi: 290 },
  { channel: 'Organic', roi: 999 },
  { channel: 'Practo', roi: 520 },
  { channel: 'WhatsApp', roi: 890 },
]

export const REVENUE_SERVICES = [
  { service: 'Pregnancy Care', patients: 18, avgTicket: '\u20B928,000', revenue: '\u20B95,04,000' },
  { service: 'PCOS Management', patients: 11, avgTicket: '\u20B915,000', revenue: '\u20B91,65,000' },
  { service: 'Fertility Consult', patients: 6, avgTicket: '\u20B935,000', revenue: '\u20B92,10,000' },
  { service: 'Period Care', patients: 8, avgTicket: '\u20B95,000', revenue: '\u20B940,000' },
  { service: 'Sexual Health', patients: 5, avgTicket: '\u20B912,000', revenue: '\u20B960,000' },
  { service: 'Menopause Support', patients: 3, avgTicket: '\u20B918,000', revenue: '\u20B954,000' },
  { service: 'Hormonal Health', patients: 4, avgTicket: '\u20B98,000', revenue: '\u20B932,000' },
  { service: 'General Wellness', patients: null, avgTicket: null, revenue: null },
]

export const REVENUE_TREND = [
  { week: 'W1', revenue: 45000 }, { week: 'W2', revenue: 62000 }, { week: 'W3', revenue: 58000 },
  { week: 'W4', revenue: 71000 }, { week: 'W5', revenue: 55000 }, { week: 'W6', revenue: 82000 },
  { week: 'W7', revenue: 78000 }, { week: 'W8', revenue: 90000 }, { week: 'W9', revenue: 95000 },
  { week: 'W10', revenue: 88000 }, { week: 'W11', revenue: 102000 }, { week: 'W12', revenue: 115000 },
]

export const ALL_LEADS: Array<{
  id: number; name: string; phone: string; phoneUnmasked: string;
  source: LeadSource; service: string; location: string;
  status: LeadStatus; assignedTo: string; created: string;
  lastActivity: string; utm?: string;
}> = [
  { id: 1, name: 'Priya Mehta', phone: '+91 98XXX XX789', phoneUnmasked: '+91 98765 43789', source: 'Google Ads', service: 'Pregnancy Care', location: 'Gurgaon', status: 'New', assignedTo: 'Unassigned', created: 'Jun 13, 10:34am', lastActivity: '2m ago', utm: 'utm_source=google&utm_medium=cpc&utm_campaign=pcos' },
  { id: 2, name: 'Kavya Sharma', phone: '+91 87XXX XX456', phoneUnmasked: '+91 87654 32456', source: 'Meta Ads', service: 'PCOS Management', location: 'Delhi', status: 'New', assignedTo: 'Riya Sharma', created: 'Jun 13, 9:15am', lastActivity: '1h ago', utm: 'utm_source=meta&utm_medium=social' },
  { id: 3, name: 'Ananya Reddy', phone: '+91 76XXX XX123', phoneUnmasked: '+91 76543 21123', source: 'Organic SEO', service: 'Fertility Consultation', location: 'Noida', status: 'Contacted', assignedTo: 'Anil Kapoor', created: 'Jun 12, 4:22pm', lastActivity: '3h ago' },
  { id: 4, name: 'Deepika Tyagi', phone: '+91 65XXX XX890', phoneUnmasked: '+91 65432 10890', source: 'Google Ads', service: 'Menopause Support', location: 'Gurgaon', status: 'New', assignedTo: 'Priya Singh', created: 'Jun 12, 2:10pm', lastActivity: '5h ago', utm: 'utm_source=google&utm_medium=cpc' },
  { id: 5, name: 'Sneha Patel', phone: '+91 54XXX XX567', phoneUnmasked: '+91 54321 09567', source: 'Practo', service: 'General Wellness', location: 'Delhi', status: 'Consultation Booked', assignedTo: 'Meena Patel', created: 'Jun 11, 11:30am', lastActivity: '1d ago' },
  { id: 6, name: 'Ritu Agarwal', phone: '+91 43XXX XX234', phoneUnmasked: '+91 43210 98234', source: 'Meta Ads', service: 'Post-Pregnancy Care', location: 'Gurgaon', status: 'Contacted', assignedTo: 'Riya Sharma', created: 'Jun 11, 9:45am', lastActivity: '1d ago', utm: 'utm_source=meta&utm_medium=social' },
  { id: 7, name: 'Meera Krishnan', phone: '+91 32XXX XX901', phoneUnmasked: '+91 32109 87901', source: 'WhatsApp', service: 'PCOS Management', location: 'Noida', status: 'Converted', assignedTo: 'Meena Patel', created: 'Jun 10, 3:15pm', lastActivity: '2d ago' },
  { id: 8, name: 'Pooja Negi', phone: '+91 21XXX XX678', phoneUnmasked: '+91 21098 76678', source: 'Google Ads', service: 'Pregnancy Care', location: 'Gurgaon', status: 'New', assignedTo: 'Unassigned', created: 'Jun 10, 1:20pm', lastActivity: '2d ago', utm: 'utm_source=google&utm_medium=cpc&utm_campaign=pregnancy' },
  { id: 9, name: 'Divya Lakshmi', phone: '+91 10XXX XX345', phoneUnmasked: '+91 10987 65345', source: 'Meta Ads', service: 'Fertility Consultation', location: 'Delhi', status: 'Contacted', assignedTo: 'Anil Kapoor', created: 'Jun 9, 5:00pm', lastActivity: '3d ago' },
  { id: 10, name: 'Swati Chauhan', phone: '+91 99XXX XX012', phoneUnmasked: '+91 99876 54012', source: 'Organic SEO', service: 'Menopause Support', location: 'Gurgaon', status: 'Consultation Booked', assignedTo: 'Priya Singh', created: 'Jun 9, 10:00am', lastActivity: '3d ago' },
  { id: 11, name: 'Neha Bhatia', phone: '+91 88XXX XX789', phoneUnmasked: '+91 88765 43789', source: 'Google Ads', service: 'General Wellness', location: 'Noida', status: 'Contacted', assignedTo: 'Riya Sharma', created: 'Jun 8, 2:30pm', lastActivity: '4d ago', utm: 'utm_source=google' },
  { id: 12, name: 'Asha Verma', phone: '+91 77XXX XX456', phoneUnmasked: '+91 77654 32456', source: 'Practo', service: 'PCOS Management', location: 'Delhi', status: 'Converted', assignedTo: 'Meena Patel', created: 'Jun 8, 11:00am', lastActivity: '4d ago' },
  { id: 13, name: 'Rekha Das', phone: '+91 66XXX XX123', phoneUnmasked: '+91 66543 21123', source: 'WhatsApp', service: 'Post-Pregnancy Care', location: 'Gurgaon', status: 'Lost', assignedTo: 'Anil Kapoor', created: 'Jun 7, 4:00pm', lastActivity: '5d ago' },
  { id: 14, name: 'Sunita Mishra', phone: '+91 55XXX XX890', phoneUnmasked: '+91 55432 10890', source: 'Meta Ads', service: 'Pregnancy Care', location: 'Delhi', status: 'Contacted', assignedTo: 'Priya Singh', created: 'Jun 7, 9:15am', lastActivity: '5d ago' },
  { id: 15, name: 'Lakshmi Gupta', phone: '+91 44XXX XX567', phoneUnmasked: '+91 44321 09567', source: 'Google Ads', service: 'Fertility Consultation', location: 'Gurgaon', status: 'Consultation Booked', assignedTo: 'Riya Sharma', created: 'Jun 6, 3:45pm', lastActivity: '6d ago', utm: 'utm_source=google&utm_medium=cpc' },
  { id: 16, name: 'Isha Kapoor', phone: '+91 33XXX XX234', phoneUnmasked: '+91 33210 98234', source: 'Organic SEO', service: 'Menopause Support', location: 'Noida', status: 'Converted', assignedTo: 'Meena Patel', created: 'Jun 6, 1:00pm', lastActivity: '6d ago' },
  { id: 17, name: 'Pallavi Joshi', phone: '+91 22XXX XX901', phoneUnmasked: '+91 22109 87901', source: 'WhatsApp', service: 'General Wellness', location: 'Delhi', status: 'No Response', assignedTo: 'Unassigned', created: 'Jun 5, 5:30pm', lastActivity: '7d ago' },
  { id: 18, name: 'Nidhi Saxena', phone: '+91 11XXX XX678', phoneUnmasked: '+91 11098 76678', source: 'Meta Ads', service: 'PCOS Management', location: 'Gurgaon', status: 'Contacted', assignedTo: 'Anil Kapoor', created: 'Jun 5, 10:20am', lastActivity: '7d ago' },
  { id: 19, name: 'Rashi Malhotra', phone: '+91 98XXX XX345', phoneUnmasked: '+91 98765 43345', source: 'Google Ads', service: 'Pregnancy Care', location: 'Delhi', status: 'Converted', assignedTo: 'Riya Sharma', created: 'Jun 4, 2:15pm', lastActivity: '8d ago', utm: 'utm_source=google' },
  { id: 20, name: 'Vidya Nair', phone: '+91 87XXX XX012', phoneUnmasked: '+91 87654 32012', source: 'Practo', service: 'Fertility Consultation', location: 'Noida', status: 'New', assignedTo: 'Unassigned', created: 'Jun 4, 9:00am', lastActivity: '8d ago' },
  { id: 21, name: 'Tanya Sethi', phone: '+91 76XXX XX789', phoneUnmasked: '+91 76543 21789', source: 'Organic SEO', service: 'PCOS Management', location: 'Gurgaon', status: 'Consultation Booked', assignedTo: 'Priya Singh', created: 'Jun 3, 4:30pm', lastActivity: '9d ago' },
  { id: 22, name: 'Shruti Rao', phone: '+91 65XXX XX456', phoneUnmasked: '+91 65432 10456', source: 'Meta Ads', service: 'Post-Pregnancy Care', location: 'Delhi', status: 'Contacted', assignedTo: 'Meena Patel', created: 'Jun 3, 11:45am', lastActivity: '9d ago' },
  { id: 23, name: 'Anjali Tiwari', phone: '+91 54XXX XX123', phoneUnmasked: '+91 54321 09123', source: 'Google Ads', service: 'Menopause Support', location: 'Noida', status: 'New', assignedTo: 'Unassigned', created: 'Jun 2, 3:20pm', lastActivity: '10d ago', utm: 'utm_source=google' },
  { id: 24, name: 'Komal Rana', phone: '+91 43XXX XX890', phoneUnmasked: '+91 43210 98890', source: 'WhatsApp', service: 'Pregnancy Care', location: 'Gurgaon', status: 'Converted', assignedTo: 'Riya Sharma', created: 'Jun 2, 10:00am', lastActivity: '10d ago' },
  { id: 25, name: 'Ritu Kapoor', phone: '+91 32XXX XX567', phoneUnmasked: '+91 32109 87567', source: 'Practo', service: 'Fertility Consultation', location: 'Delhi', status: 'Lost', assignedTo: 'Anil Kapoor', created: 'Jun 1, 1:30pm', lastActivity: '11d ago' },
]

export const PIPELINE_LEADS: Array<{
  name: string; source: LeadSource; service: string;
  assignedTo: string; stageTime: string; urgency: 'red' | 'gold' | 'green';
  stage: 'New' | 'Contacted' | 'Consultation' | 'Converted';
}> = [
  { name: 'Priya Mehta', source: 'Google Ads', service: 'Pregnancy Care', assignedTo: 'Unassigned', stageTime: '4h', urgency: 'green', stage: 'New' },
  { name: 'Kavya Sharma', source: 'Meta Ads', service: 'PCOS Management', assignedTo: 'Riya Sharma', stageTime: '2h', urgency: 'green', stage: 'New' },
  { name: 'Deepika Tyagi', source: 'Google Ads', service: 'Menopause Support', assignedTo: 'Priya Singh', stageTime: '8h', urgency: 'gold', stage: 'New' },
  { name: 'Pooja Negi', source: 'Google Ads', service: 'Pregnancy Care', assignedTo: 'Unassigned', stageTime: '1d 2h', urgency: 'gold', stage: 'New' },
  { name: 'Vidya Nair', source: 'Practo', service: 'Fertility Consultation', assignedTo: 'Unassigned', stageTime: '5d', urgency: 'red', stage: 'New' },
  { name: 'Anjali Tiwari', source: 'Google Ads', service: 'Menopause Support', assignedTo: 'Unassigned', stageTime: '8d', urgency: 'red', stage: 'New' },
  { name: 'Pallavi Joshi', source: 'WhatsApp', service: 'General Wellness', assignedTo: 'Unassigned', stageTime: '7d', urgency: 'red', stage: 'New' },
  { name: 'Ritu Agarwal', source: 'Meta Ads', service: 'Post-Pregnancy Care', assignedTo: 'Riya Sharma', stageTime: '3h', urgency: 'green', stage: 'New' },
  { name: 'Ananya Reddy', source: 'Organic SEO', service: 'Fertility Consultation', assignedTo: 'Anil Kapoor', stageTime: '1d 4h', urgency: 'gold', stage: 'Contacted' },
  { name: 'Neha Bhatia', source: 'Google Ads', service: 'General Wellness', assignedTo: 'Riya Sharma', stageTime: '2d 6h', urgency: 'gold', stage: 'Contacted' },
  { name: 'Sunita Mishra', source: 'Meta Ads', service: 'Pregnancy Care', assignedTo: 'Priya Singh', stageTime: '4d', urgency: 'red', stage: 'Contacted' },
  { name: 'Nidhi Saxena', source: 'Meta Ads', service: 'PCOS Management', assignedTo: 'Anil Kapoor', stageTime: '1d', urgency: 'gold', stage: 'Contacted' },
  { name: 'Shruti Rao', source: 'Meta Ads', service: 'Post-Pregnancy Care', assignedTo: 'Meena Patel', stageTime: '6h', urgency: 'green', stage: 'Contacted' },
  { name: 'Divya Lakshmi', source: 'Meta Ads', service: 'Fertility Consultation', assignedTo: 'Anil Kapoor', stageTime: '3d', urgency: 'red', stage: 'Contacted' },
  { name: 'Sneha Patel', source: 'Practo', service: 'General Wellness', assignedTo: 'Meena Patel', stageTime: '1d 2h', urgency: 'gold', stage: 'Consultation' },
  { name: 'Swati Chauhan', source: 'Organic SEO', service: 'Menopause Support', assignedTo: 'Priya Singh', stageTime: '2d 4h', urgency: 'gold', stage: 'Consultation' },
  { name: 'Lakshmi Gupta', source: 'Google Ads', service: 'Fertility Consultation', assignedTo: 'Riya Sharma', stageTime: '5h', urgency: 'green', stage: 'Consultation' },
  { name: 'Tanya Sethi', source: 'Organic SEO', service: 'PCOS Management', assignedTo: 'Priya Singh', stageTime: '3d', urgency: 'red', stage: 'Consultation' },
  { name: 'Rashi Malhotra', source: 'Google Ads', service: 'Pregnancy Care', assignedTo: 'Riya Sharma', stageTime: '6d', urgency: 'red', stage: 'Consultation' },
  { name: 'Meera Krishnan', source: 'WhatsApp', service: 'PCOS Management', assignedTo: 'Meena Patel', stageTime: '2d', urgency: 'gold', stage: 'Converted' },
  { name: 'Asha Verma', source: 'Practo', service: 'PCOS Management', assignedTo: 'Meena Patel', stageTime: '3d', urgency: 'red', stage: 'Converted' },
  { name: 'Isha Kapoor', source: 'Organic SEO', service: 'Menopause Support', assignedTo: 'Meena Patel', stageTime: '1d', urgency: 'gold', stage: 'Converted' },
  { name: 'Komal Rana', source: 'WhatsApp', service: 'Pregnancy Care', assignedTo: 'Riya Sharma', stageTime: '5d', urgency: 'red', stage: 'Converted' },
]

export const TEAM_DATA = [
  { name: 'Riya Sharma', initials: 'RS', assigned: 28, contacted: 22, converted: 9, cvr: '32.1%', avgResponse: '4m', workload: 80 },
  { name: 'Anil Kapoor', initials: 'AK', assigned: 22, contacted: 18, converted: 6, cvr: '27.3%', avgResponse: '7m', workload: 70 },
  { name: 'Priya Singh', initials: 'PS', assigned: 31, contacted: 24, converted: 8, cvr: '25.8%', avgResponse: '12m', workload: 100 },
  { name: 'Meena Patel', initials: 'MP', assigned: 19, contacted: 16, converted: 7, cvr: '36.8%', avgResponse: '3m', workload: 50 },
]

export const SEO_METRICS = [
  { label: 'Pages Indexed', value: '8 of 38', severity: 'crit' as const, icon: null, spark: [3, 4, 4, 5] },
  { label: 'Core Web Vitals', value: '1/3 Passed', severity: 'high' as const, icon: null, spark: [2, 1, 2, 1] },
  { label: 'Schema Markup', value: '0 pages', severity: 'crit' as const, icon: null, spark: [0, 0, 0, 0] },
  { label: 'Mobile Score', value: '61/100', severity: 'high' as const, icon: null, spark: [55, 58, 60, 61] },
  { label: 'Broken Links', value: '14 found', severity: 'high' as const, icon: null, spark: [18, 16, 15, 14] },
  { label: 'GEO Readiness', value: 'Not Ready', severity: 'crit' as const, icon: null, spark: [0, 0, 0, 0] },
]

export const SEO_ISSUES: Array<{ priority: string; issue: string; page: string; fix: string; effort: string; impact: string }> = [
  { priority: 'Critical', issue: 'Zero server-side rendering for bots', page: 'All pages', fix: 'Enable SSR or static generation', effort: '2-3 days', impact: 'Critical' },
  { priority: 'Critical', issue: 'Broken geo pages returning 404', page: '/pcos-treatment-gurgaon', fix: 'Create 301 redirects or build pages', effort: '1-2 hours', impact: 'Critical' },
  { priority: 'Critical', issue: 'No XML sitemap', page: 'newmi.in/sitemap.xml', fix: 'Generate and submit sitemap', effort: '2 hours', impact: 'Critical' },
  { priority: 'High', issue: 'Title tags keyword-buried', page: 'All pages', fix: 'Restructure to keyword-first format', effort: '30 min', impact: 'High' },
  { priority: 'High', issue: 'Missing canonical tags', page: 'blog.newmi.in', fix: 'Add rel="canonical" tags', effort: '1 hour', impact: 'High' },
  { priority: 'High', issue: 'No schema markup', page: 'All pages', fix: 'Add MedicalClinic, Physician, FAQ schema', effort: '2-3 hours', impact: 'High' },
  { priority: 'Medium', issue: 'Page speed 4.2s LCP', page: 'Homepage', fix: 'Optimize images, defer JS, lazy loading', effort: '3-4 hours', impact: 'Medium' },
  { priority: 'Medium', issue: 'No hreflang tags', page: 'All pages', fix: 'Add hreflang="en-IN" tags', effort: '1 hour', impact: 'Medium' },
  { priority: 'Low', issue: 'Missing crawl-delay in robots.txt', page: 'newmi.in/robots.txt', fix: 'Add Crawl-delay: 1', effort: '5 min', impact: 'Low' },
]

export const ALERTS_DATA: Array<{ severity: 'crit' | 'high' | 'med' | 'low' | 'success'; title: string; desc: string; time: string; category: string }> = [
  { severity: 'crit', title: 'Rankings dropped 5 positions', desc: '"PCOS Gurgaon" fell #8 → #13', time: '2h ago', category: 'SEO' },
  { severity: 'crit', title: '0 pages have schema markup', desc: 'No rich results possible', time: '1d ago', category: 'SEO' },
  { severity: 'high', title: '15 leads unassigned >2 hours', desc: 'Response rate at risk', time: '45m ago', category: 'Leads' },
  { severity: 'high', title: 'Core Web Vitals failing', desc: 'LCP 6.2s, threshold 2.5s', time: '3d ago', category: 'SEO' },
  { severity: 'high', title: 'Priya Singh at 100% capacity', desc: '3 new leads have no owner', time: '1h ago', category: 'Leads' },
  { severity: 'med', title: 'Blog missing meta description', desc: '"PCOS Diet Guide" no desc', time: '4h ago', category: 'SEO' },
  { severity: 'med', title: 'Competitor new content', desc: 'Cloudnine ranked for "pcos specialist gurgaon"', time: '1d ago', category: 'Channels' },
  { severity: 'success', title: 'WhatsApp response time', desc: 'Avg now under 5 min', time: 'Today', category: 'Channels' },
]

export const AUTO_TOOLS = [
  {
    id: 'meta', title: 'Generate Meta Tags', desc: 'Generate SEO-optimized title tags and meta descriptions', icon: null,
    output: 'Generating meta tags for newmi.in...\n\nTitle: Best Gynecologist in Gurgaon | Women\'s Health - Newmi Care\nDesc: Expert gynecology care in Gurgaon. PCOS, pregnancy, fertility & menopause specialists. Book consultation today.\n\nDone. 3 meta tag pairs generated.'
  },
  {
    id: 'schema', title: 'Schema Markup Builder', desc: 'Create MedicalClinic, Physician, and FAQ schema', icon: null,
    output: 'Building schema markup for newmi.in...\n\nMedicalClinic Schema: { "@type": "MedicalClinic", "name": "Newmi Care" }\n\nDone. 3 schema types generated.'
  },
  {
    id: 'content', title: 'Content Gap Analyzer', desc: 'Find missing content opportunities vs competitors', icon: null,
    output: 'Analyzing content gaps vs competitors...\n\nGap 1: "pcod treatment gurgaon" (4,400/mo) - Cloudnine has dedicated page\nGap 2: "best gynecologist gurgaon" (8,100/mo)\nGap 3: "fertility clinic near me" (2,900/mo)\n\nPriority: 15 content gaps found.'
  },
  {
    id: 'geo', title: 'GEO Audit Tool', desc: 'Test AI engine visibility and citation readiness', icon: null,
    output: 'Running GEO audit for newmi.in...\n\nGoogle AI Overview: 0/5 queries visible\nChatGPT: 0/5 queries mentioned\nGemini: 0/5 queries featured\nPerplexity: 0/5 queries cited\n\nGEO Score: 0/100'
  },
]

export const GOALS_DATA = [
  { label: 'Leads', target: 200, current: 168, unit: '', icon: null, weeklyPace: [28, 35, 42, 38, 25] },
  { label: 'Conversions', target: 30, current: 27, unit: '', icon: null, weeklyPace: [4, 5, 6, 7, 5] },
  { label: 'Revenue', target: 100000, current: 84000, unit: '₹', icon: null, weeklyPace: [12000, 15000, 18000, 21000, 18000] },
  { label: 'Response Time', target: 15, current: 11, unit: 'min', icon: null, weeklyPace: [14, 13, 12, 11, 11] },
]

export const SLA_RULES = [
  { rule: 'New leads must be contacted within', threshold: '15 min', type: 'contact', compliance: 82 },
  { rule: 'Consultation must be booked within', threshold: '24 hr', type: 'consultation', compliance: 91 },
  { rule: 'Follow-up after consultation within', threshold: '48 hr', type: 'followup', compliance: 76 },
  { rule: 'Lost lead re-engagement within', threshold: '7 days', type: 'reengage', compliance: 64 },
]

export const SLA_BREACHES_LIVE = [
  { lead: 'Priya Mehta', thresholdMinutes: 15, elapsedMinutes: 42, assignedTo: 'Unassigned', severity: 'red' as const },
  { lead: 'Anjali Tiwari', thresholdMinutes: 15, elapsedMinutes: 11520, assignedTo: 'Unassigned', severity: 'red' as const },
  { lead: 'Pallavi Joshi', thresholdMinutes: 15, elapsedMinutes: 10080, assignedTo: 'Unassigned', severity: 'red' as const },
  { lead: 'Sunita Mishra', thresholdMinutes: 1440, elapsedMinutes: 5760, assignedTo: 'Priya Singh', severity: 'gold' as const },
  { lead: 'Deepika Tyagi', thresholdMinutes: 1440, elapsedMinutes: 480, assignedTo: 'Priya Singh', severity: 'gold' as const },
  { lead: 'Divya Lakshmi', thresholdMinutes: 1440, elapsedMinutes: 4320, assignedTo: 'Anil Kapoor', severity: 'gold' as const },
]

export const SLA_ESCALATIONS = [
  { level: 'Manager', count: 3, leads: ['Priya Mehta', 'Anjali Tiwari', 'Pallavi Joshi'] },
  { level: 'CEO', count: 1, leads: ['Vidya Nair'] },
]

export const BUDGET_CHANNELS = [
  { channel: 'Google Ads', budget: 50000, spent: 46000, pacing: 92, daysLeft: 8, status: 'warning' as const },
  { channel: 'Meta Ads', budget: 40000, spent: 34000, pacing: 85, daysLeft: 8, status: 'ok' as const },
  { channel: 'Practo', budget: 15000, spent: 11500, pacing: 77, daysLeft: 8, status: 'ok' as const },
  { channel: 'WhatsApp', budget: 3000, spent: 2400, pacing: 80, daysLeft: 8, status: 'ok' as const },
  { channel: 'Content/SEO', budget: 5000, spent: 2200, pacing: 44, daysLeft: 8, status: 'under' as const },
]

export const DAILY_SPEND_TREND = [
  { day: '1', google: 1800, meta: 1400, practo: 450, whatsapp: 100, content: 80 },
  { day: '5', google: 1900, meta: 1350, practo: 420, whatsapp: 90, content: 80 },
  { day: '10', google: 2100, meta: 1500, practo: 500, whatsapp: 110, content: 100 },
  { day: '15', google: 2000, meta: 1300, practo: 380, whatsapp: 95, content: 100 },
  { day: '20', google: 2200, meta: 1600, practo: 520, whatsapp: 120, content: 100 },
  { day: '25', google: 1900, meta: 1250, practo: 430, whatsapp: 85, content: 80 },
  { day: '30', google: 1700, meta: 1100, practo: 350, whatsapp: 80, content: 60 },
]

export const WA_CONVERSATIONS = [
  { name: 'Priya Mehta', lastMessage: 'Thank you, I will visit tomorrow', time: '2m ago', unread: true, service: 'Pregnancy Care' },
  { name: 'Kavya Sharma', lastMessage: 'What are the PCOS treatment options?', time: '1h ago', unread: true, service: 'PCOS Management' },
  { name: 'Meera Krishnan', lastMessage: 'Booking confirmed for 3pm', time: '3h ago', unread: false, service: 'PCOS Management' },
  { name: 'Komal Rana', lastMessage: 'Thanks for the information', time: '5h ago', unread: false, service: 'Pregnancy Care' },
  { name: 'Sneha Patel', lastMessage: 'Can I reschedule my appointment?', time: '1d ago', unread: false, service: 'General Wellness' },
  { name: 'Ritu Agarwal', lastMessage: 'Is there parking available?', time: '1d ago', unread: false, service: 'Post-Pregnancy Care' },
]

export const WA_TEMPLATES = [
  { name: 'Welcome', preview: 'Welcome to Newmi Care! Your health journey matters. How can we support you today?' },
  { name: 'Consultation Reminder', preview: 'Hi! This is a reminder for your consultation. Your health is our priority.' },
  { name: 'Follow-up', preview: 'We hope you are feeling better. Our team is here if you need anything.' },
  { name: 'Care Plan', preview: 'Explore personalised care plans designed for every stage of your health journey.' },
]

export const WA_MESSAGES: Record<string, Array<{ from: 'lead' | 'us'; text: string; time: string }>> = {
  'Priya Mehta': [
    { from: 'us', text: 'Hello Priya! Thank you for your interest in Newmi Care. How can we help you?', time: '10:30 AM' },
    { from: 'lead', text: 'Hi, I wanted to know about pregnancy care packages', time: '10:32 AM' },
    { from: 'us', text: 'We offer comprehensive pregnancy care starting at ₹15,000. Would you like to book a consultation?', time: '10:33 AM' },
    { from: 'lead', text: 'Yes, what timings are available?', time: '10:35 AM' },
    { from: 'us', text: 'We have slots tomorrow at 10am, 2pm, and 5pm. Which works for you?', time: '10:36 AM' },
    { from: 'lead', text: 'Thank you, I will visit tomorrow', time: '10:38 AM' },
  ],
  'Kavya Sharma': [
    { from: 'lead', text: 'What are the PCOS treatment options?', time: '9:10 AM' },
    { from: 'us', text: 'We offer personalized PCOS management plans including lifestyle coaching, medication, and regular monitoring. Shall I schedule a consult?', time: '9:12 AM' },
  ],
}

export const CALENDAR_ITEMS = [
  { day: 3, title: 'PCOS Awareness Blog', type: 'Blog', assignee: 'Riya S.', status: 'Published' },
  { day: 5, title: 'Instagram Reel - Pregnancy Tips', type: 'Social', assignee: 'Anil K.', status: 'Published' },
  { day: 7, title: 'GBP Update - New Services', type: 'GBP', assignee: 'Meena P.', status: 'Published' },
  { day: 8, title: 'Fertility FAQ Blog', type: 'Blog', assignee: 'Riya S.', status: 'Published' },
  { day: 10, title: 'Menopause Support Post', type: 'Social', assignee: 'Anil K.', status: 'Scheduled' },
  { day: 12, title: 'PCOS Diet Guide Blog', type: 'Blog', assignee: 'Riya S.', status: 'Scheduled' },
  { day: 14, title: 'Google Ads Copy Refresh', type: 'Ad', assignee: 'Priya S.', status: 'Scheduled' },
  { day: 16, title: 'Patient Testimonial Video', type: 'Social', assignee: 'Anil K.', status: 'Draft' },
  { day: 18, title: 'GBP Photos Update', type: 'GBP', assignee: 'Meena P.', status: 'Draft' },
  { day: 20, title: 'Pregnancy Care Landing Page', type: 'Web', assignee: 'Priya S.', status: 'Draft' },
  { day: 22, title: 'WhatsApp Broadcast - Offers', type: 'Social', assignee: 'Meena P.', status: 'Draft' },
  { day: 25, title: 'Monthly SEO Audit Report', type: 'Blog', assignee: 'Riya S.', status: 'Draft' },
]

export const COHORT_DATA = [
  { cohort: 'W1 (Jun 1-7)', day0: 42, day3: 38, day7: 28, day14: 18, day30: 12 },
  { cohort: 'W2 (Jun 8-14)', day0: 55, day3: 48, day7: 35, day14: 22, day30: 15 },
  { cohort: 'W3 (Jun 15-21)', day0: 68, day3: 60, day7: 44, day14: 30, day30: 20 },
  { cohort: 'W4 (Jun 22-28)', day0: 72, day3: 62, day7: 48, day14: 0, day30: 0 },
  { cohort: 'W5 (Jun 29-30)', day0: 28, day3: 22, day7: 0, day14: 0, day30: 0 },
]

export const COMPETITORS = [
  { name: 'Cloudnine', adSpend: '~₹8L/mo', keywords: 145, topKeywords: 'pregnancy care, gynecologist gurgaon, ivf clinic', threat: 'high' as const },
  { name: 'Artemis Hospital', adSpend: '~₹5L/mo', keywords: 98, topKeywords: 'best gynecologist, pcos treatment delhi', threat: 'medium' as const },
  { name: 'Fortis La Femme', adSpend: '~₹6L/mo', keywords: 112, topKeywords: 'women hospital, fertility clinic, maternity', threat: 'high' as const },
]

export const KEYWORD_OVERLAP = [
  { keyword: 'pcos treatment gurgaon', ourRank: 13, cloudnine: 3, artemis: 7, fortis: 5 },
  { keyword: 'best gynecologist gurgaon', ourRank: 18, cloudnine: 2, artemis: 5, fortis: 4 },
  { keyword: 'pregnancy care gurgaon', ourRank: 22, cloudnine: 1, artemis: 9, fortis: 3 },
  { keyword: 'fertility clinic delhi ncr', ourRank: 15, cloudnine: 6, artemis: 4, fortis: 2 },
  { keyword: 'ivf clinic gurgaon', ourRank: 20, cloudnine: 4, artemis: 8, fortis: 1 },
  { keyword: 'menopause specialist', ourRank: 10, cloudnine: 12, artemis: 15, fortis: 8 },
  { keyword: 'women health checkup', ourRank: 25, cloudnine: 5, artemis: 3, fortis: 6 },
]

export const COMPETITOR_ACTIVITY = [
  { competitor: 'Cloudnine', action: 'Launched new landing page for PCOS treatment', time: '3 days ago' },
  { competitor: 'Fortis La Femme', action: 'Increased Google Ads spend on "fertility clinic" keywords', time: '5 days ago' },
  { competitor: 'Artemis Hospital', action: 'New blog post ranking for "best gynecologist gurgaon"', time: '1 week ago' },
  { competitor: 'Cloudnine', action: 'Added 12 new Google Business Profile photos', time: '2 weeks ago' },
]

export const SHARED_KEYWORDS_DATA = [
  { name: 'Shared (All 4)', value: 18, color: '#BB2026' },
  { name: 'Cloudnine + Fortis', value: 25, color: '#D97706' },
  { name: 'Artemis Only', value: 15, color: '#6B7280' },
  { name: 'Newmi Unique', value: 8, color: '#059669' },
  { name: 'Others', value: 34, color: '#E5E7EB' },
]

export const ASSIGNMENT_RULES = [
  { id: 1, conditions: [{ field: 'source', op: '=', value: 'Google Ads' }, { field: 'service', op: '=', value: 'Pregnancy Care' }], action: 'Riya Sharma', active: true },
  { id: 2, conditions: [{ field: 'source', op: '=', value: 'Meta Ads' }], action: 'Anil Kapoor', active: true },
  { id: 3, conditions: [{ field: 'source', op: '=', value: 'Practo' }], action: 'Meena Patel', active: true },
  { id: 4, conditions: [{ field: 'location', op: '=', value: 'Delhi' }, { field: 'service', op: '=', value: 'PCOS' }], action: 'Priya Singh', active: true },
  { id: 5, conditions: [{ field: 'source', op: '=', value: 'WhatsApp' }], action: 'Meena Patel', active: false },
]

export const ATTRIBUTION_JOURNEYS = [
  { id: 1, touchpoints: ['Google Ad', 'WhatsApp', 'Consultation', 'Converted'], revenue: '₹28,000', converted: true },
  { id: 2, touchpoints: ['Meta Ad', 'Phone Call', 'Converted'], revenue: '₹15,000', converted: true },
  { id: 3, touchpoints: ['Organic SEO', 'WhatsApp', 'Consultation', 'Converted'], revenue: '₹35,000', converted: true },
  { id: 4, touchpoints: ['Google Ad', 'Direct Visit', 'Converted'], revenue: '₹18,000', converted: true },
  { id: 5, touchpoints: ['Practo', 'Phone Call', 'Lost'], revenue: '₹0', converted: false },
]

export const RIYA_URGENT_INQUIRIES = [
  { id: 'u1', name: 'Priya Mehta', service: 'Pregnancy Care', slaMinutes: 15, elapsedMinutes: 42, severity: 'breached' as const },
  { id: 'u2', name: 'Kavya Sharma', service: 'PCOS Management', slaMinutes: 15, elapsedMinutes: 11, severity: 'critical' as const },
  { id: 'u3', name: 'Ritu Agarwal', service: 'Post-Pregnancy Care', slaMinutes: 30, elapsedMinutes: 18, severity: 'warning' as const },
  { id: 'u4', name: 'Neha Bhatia', service: 'General Wellness', slaMinutes: 30, elapsedMinutes: 5, severity: 'safe' as const },
  { id: 'u5', name: 'Lakshmi Gupta', service: 'Fertility Consultation', slaMinutes: 60, elapsedMinutes: 22, severity: 'safe' as const },
]

export const RIYA_PULSE_STATS = [
  { label: 'My Inquiries Today', value: '8', delta: '+2 vs yesterday', deltaDir: 'up' as const, icon: 'Inbox', color: '#BB2026', bg: '#FEF2F2', spark: [3, 5, 7, 6, 8, 7, 8] },
  { label: 'Pending Follow-ups', value: '5', delta: '-1 vs yesterday', deltaDir: 'down' as const, icon: 'Clock', color: '#D97706', bg: '#FFFBEB', spark: [7, 6, 5, 4, 6, 5, 5] },
  { label: 'Consultations Booked', value: '3', delta: '+1 this week', deltaDir: 'up' as const, icon: 'CheckCircle', color: '#059669', bg: '#ECFDF5', spark: [1, 0, 2, 1, 2, 3, 3] },
  { label: 'My Avg Response', value: '3.2', delta: 'min · -0.8 vs avg', deltaDir: 'up' as const, icon: 'Timer', color: '#2563EB', bg: '#EFF6FF', spark: [5.1, 4.5, 4.0, 3.8, 3.5, 3.3, 3.2] },
]

export const RIYA_SERVICE_MIX = [
  { name: 'Pregnancy Care', value: 12, color: '#BB2026' },
  { name: 'PCOS', value: 8, color: '#D97706' },
  { name: 'Fertility', value: 5, color: '#059669' },
  { name: 'Menopause', value: 3, color: '#6B7280' },
  { name: 'Wellness', value: 4, color: '#C05621' },
]

export const RIYA_WEEKLY_TARGETS = [
  { label: 'Inquiries Handled', current: 42, target: 50, pct: 84 },
  { label: 'Consultations Booked', current: 6, target: 8, pct: 75 },
]

export const RIYA_PERFORMANCE_SCORECARD = [
  { metric: 'Inquiries Handled', mine: '42', target: '50', teamAvg: '38', status: 'above' as const },
  { metric: 'Conversion Rate', mine: '32.1%', target: '25%', teamAvg: '27.8%', status: 'above' as const },
  { metric: 'Avg Response Time', mine: '3.2 min', target: '5 min', teamAvg: '6.5 min', status: 'above' as const },
  { metric: 'SLA Compliance', mine: '91%', target: '85%', teamAvg: '82%', status: 'above' as const },
  { metric: 'Consultations Booked', mine: '6', target: '8', teamAvg: '5', status: 'on-track' as const },
  { metric: 'Patient Satisfaction', mine: '4.6/5', target: '4.5/5', teamAvg: '4.3/5', status: 'above' as const },
]

export const RIYA_SERVICE_BREAKDOWN = [
  { service: 'Pregnancy Care', inquiries: 12, converted: 4, revenue: '\u20B91,12,000', cvr: '33.3%' },
  { service: 'PCOS Management', inquiries: 8, converted: 2, revenue: '\u20B930,000', cvr: '25.0%' },
  { service: 'Fertility Consult', inquiries: 5, converted: 2, revenue: '\u20B970,000', cvr: '40.0%' },
  { service: 'Period Care', inquiries: 6, converted: 2, revenue: '\u20B910,000', cvr: '33.3%' },
  { service: 'Sexual Health', inquiries: 4, converted: 1, revenue: '\u20B912,000', cvr: '25.0%' },
  { service: 'Menopause Support', inquiries: 3, converted: 1, revenue: '\u20B918,000', cvr: '33.3%' },
  { service: 'Hormonal Health', inquiries: 3, converted: 1, revenue: '\u20B98,000', cvr: '33.3%' },
  { service: 'General Wellness', inquiries: 4, converted: 0, revenue: '\u20B90', cvr: '0%' },
]

export const RIYA_RESPONSE_TREND = [
  { day: 'Mon', riya: 4.2, team: 6.8 },
  { day: 'Tue', riya: 3.8, team: 7.2 },
  { day: 'Wed', riya: 3.5, team: 6.5 },
  { day: 'Thu', riya: 3.2, team: 5.9 },
  { day: 'Fri', riya: 2.9, team: 6.1 },
  { day: 'Sat', riya: 3.1, team: 7.0 },
  { day: 'Sun', riya: 3.2, team: 6.8 },
]

export const RIYA_NOTIFICATIONS = [
  { id: 'n1', type: 'inquiry' as const, title: 'New inquiry assigned: Kavya Sharma', detail: 'PCOS Management · Meta Ads', time: '2m ago', read: false },
  { id: 'n2', type: 'sla' as const, title: 'SLA Warning: Priya Mehta', detail: 'Only 3 min remaining to respond', time: '5m ago', read: false },
  { id: 'n3', type: 'escalation' as const, title: 'Escalation: Anjali Tiwari inquiry', detail: 'Overdue by 8 days · Manager notified', time: '1h ago', read: false },
  { id: 'n4', type: 'transfer' as const, title: 'Transfer received: Deepika Tyagi', detail: 'From Priya Singh · Menopause Support', time: '2h ago', read: true },
  { id: 'n5', type: 'consultation' as const, title: 'Consultation confirmed: Lakshmi Gupta', detail: 'Fertility Consultation · Tomorrow 2pm', time: '3h ago', read: true },
  { id: 'n6', type: 'digest' as const, title: 'Daily Digest', detail: '8 inquiries · 3 booked · 1 converted', time: '9:00 AM', read: true },
  { id: 'n7', type: 'sla' as const, title: 'SLA Breached: Anjali Tiwari', detail: 'Overdue by 8 days · Immediate action needed', time: '1d ago', read: true },
]

export const SERVICE_INTELLIGENCE: Record<string, { tip: string; preferred: string; avgValue: string }> = {
  'Pregnancy Care': { tip: 'Patients often ask about trimester-specific care packages and delivery options.', preferred: 'Phone + WhatsApp', avgValue: '\u20B928,000' },
  'PCOS Management': { tip: 'Common concern: long-term management plan and lifestyle changes.', preferred: 'WhatsApp + Call', avgValue: '\u20B915,000' },
  'Fertility Consultation': { tip: 'Sensitive inquiries. Preferred contact: WhatsApp for privacy.', preferred: 'WhatsApp', avgValue: '\u20B935,000' },
  'Menopause Support': { tip: 'Patients seek reassurance and long-term care plans.', preferred: 'Phone', avgValue: '\u20B918,000' },
  'Period Care': { tip: 'Young patients seek judgement-free guidance. Build trust first.', preferred: 'WhatsApp', avgValue: '\u20B95,000' },
  'Sexual Health': { tip: 'Privacy is paramount. Ensure confidential communication channels.', preferred: 'WhatsApp', avgValue: '\u20B912,000' },
  'Hormonal Health': { tip: 'Patients need clear, jargon-free explanations of treatment options.', preferred: 'Phone + WhatsApp', avgValue: '\u20B98,000' },
  'General Wellness': { tip: 'Routine check-ups. Quick consult scheduling works best.', preferred: 'Any channel', avgValue: '\u20B95,000' },
  'Post-Pregnancy Care': { tip: 'Follow-up focused. Patients prefer WhatsApp for updates.', preferred: 'WhatsApp', avgValue: '\u20B912,000' },
}

export const RIYA_ACTIVITY_MOCK = [
  { id: 'a1', action: 'status_change', detail: 'Changed status from New → Contacted for Lakshmi Gupta', createdAt: new Date(Date.now() - 10 * 60000).toISOString(), lead: { name: 'Lakshmi Gupta', id: 'l1' } },
  { id: 'a2', action: 'note_added', detail: 'Added note to Kavya Sharma: "Patient prefers WhatsApp communication"', createdAt: new Date(Date.now() - 25 * 60000).toISOString(), lead: { name: 'Kavya Sharma', id: 'l2' } },
  { id: 'a3', action: 'flag_added', detail: 'Flagged Priya Mehta as "Needs Attention"', createdAt: new Date(Date.now() - 60 * 60000).toISOString(), lead: { name: 'Priya Mehta', id: 'l3' } },
  { id: 'a4', action: 'lead_assigned', detail: 'New inquiry assigned: Deepika Tyagi (Menopause Support)', createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), lead: { name: 'Deepika Tyagi', id: 'l4' } },
  { id: 'a5', action: 'status_change', detail: 'Changed status from Contacted → Consultation Booked for Rashi Malhotra', createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), lead: { name: 'Rashi Malhotra', id: 'l5' } },
  { id: 'a6', action: 'note_added', detail: 'Added note to Neha Bhatia: "Follow up on Thursday"', createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), lead: { name: 'Neha Bhatia', id: 'l6' } },
  { id: 'a7', action: 'status_change', detail: 'Changed status from New → Contacted for Ritu Agarwal', createdAt: new Date(Date.now() - 5 * 3600000).toISOString(), lead: { name: 'Ritu Agarwal', id: 'l7' } },
  { id: 'a8', action: 'flag_added', detail: 'Flagged as Duplicate: Similar inquiry from same number', createdAt: new Date(Date.now() - 6 * 3600000).toISOString(), lead: null },
  { id: 'a9', action: 'status_change', detail: 'Changed status from Consultation Booked → Converted for Komal Rana', createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), lead: { name: 'Komal Rana', id: 'l9' } },
  { id: 'a10', action: 'note_added', detail: 'Added note: "Patient confirmed consultation for tomorrow 3pm"', createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), lead: { name: 'Lakshmi Gupta', id: 'l1' } },
]

export const RIYA_DAILY_TASKS = [
  { id: 't1', type: 'sla_response', title: 'Respond to Priya Mehta', service: 'Pregnancy Care', priority: 'critical', dueIn: '2m', status: 'overdue' as const },
  { id: 't2', type: 'sla_response', title: 'Respond to Kavya Sharma', service: 'PCOS Management', priority: 'critical', dueIn: '4m', status: 'pending' as const },
  { id: 't3', type: 'follow_up', title: 'Follow up with Ritu Agarwal', service: 'Post-Pregnancy Care', priority: 'high', dueIn: '2h', status: 'pending' as const },
  { id: 't4', type: 'consultation_prep', title: 'Prep for Lakshmi Gupta consultation', service: 'Fertility', priority: 'high', dueIn: '3h', status: 'pending' as const },
  { id: 't5', type: 'consultation_confirm', title: 'Confirm Rashi Malhotra appointment', service: 'Pregnancy Care', priority: 'medium', dueIn: '4h', status: 'pending' as const },
  { id: 't6', type: 'callback', title: 'Callback Neha Bhatia', service: 'General Wellness', priority: 'medium', dueIn: '5h', status: 'pending' as const },
  { id: 't7', type: 'note_followup', title: 'Follow up on Komal Rana note', service: 'Pregnancy Care', priority: 'low', dueIn: 'EOD', status: 'pending' as const },
  { id: 't8', type: 'daily_digest', title: 'Complete shift handoff notes', service: '', priority: 'low', dueIn: 'EOD', status: 'pending' as const },
]

export const RIYA_SHIFT_GOALS = [
  { label: 'Inquiries to Handle', current: 5, target: 8, icon: null },
  { label: 'Calls to Make', current: 3, target: 6, icon: null },
  { label: 'Consultations to Book', current: 1, target: 2, icon: null },
  { label: 'Notes to Add', current: 2, target: 4, icon: null },
]

export const RIYA_ADMIN_CORRELATION = [
  { metric: 'My Leads', mine: 28, total: 312, pct: '9.0%' },
  { metric: 'My Conversions', mine: 9, total: 38, pct: '23.7%' },
  { metric: 'My Revenue', mine: '₹2.3L', total: '₹8.4L', pct: '27.4%' },
  { metric: 'My SLA Score', mine: '91%', total: '82%', pct: '+9pts' },
]

export const RIYA_PIPELINE_VELOCITY = [
  { stage: 'New → Contacted', avgHours: 2.1, teamAvg: 4.5 },
  { stage: 'Contacted → Consult', avgHours: 18, teamAvg: 28 },
  { stage: 'Consult → Converted', avgHours: 36, teamAvg: 52 },
]

export const RIYA_SOURCE_EFFECTIVENESS = [
  { source: 'Google Ads', inquiries: 12, converted: 4, cvr: '33.3%', avgResponse: '2.8 min', revenue: '₹1.12L' },
  { source: 'Meta Ads', inquiries: 8, converted: 2, cvr: '25.0%', avgResponse: '3.5 min', revenue: '₹45K' },
  { source: 'WhatsApp', inquiries: 5, converted: 2, cvr: '40.0%', avgResponse: '1.2 min', revenue: '₹70K' },
  { source: 'Organic SEO', inquiries: 3, converted: 1, cvr: '33.3%', avgResponse: '5.0 min', revenue: '₹28K' },
  { source: 'Practo', inquiries: 2, converted: 0, cvr: '0%', avgResponse: '4.2 min', revenue: '₹0' },
]

export const RIYA_REVENUE_CORRELATION = [
  { week: 'W1', riya: 28000, team: 45000 },
  { week: 'W2', riya: 35000, team: 62000 },
  { week: 'W3', riya: 42000, team: 58000 },
  { week: 'W4', riya: 38000, team: 71000 },
  { week: 'W5', riya: 45000, team: 55000 },
  { week: 'W6', riya: 52000, team: 82000 },
]

export const RIYA_FUNNEL = [
  { stage: 'Inquiries', count: 42 },
  { stage: 'Contacted', count: 34 },
  { stage: 'Consultation', count: 12 },
  { stage: 'Converted', count: 9 },
]

export const sourcePillClass = (s: LeadSource) => {
  switch (s) {
    case 'Google Ads': return 'source-google'
    case 'Meta Ads': return 'source-meta'
    case 'Organic SEO': return 'source-organic'
    case 'Practo': return 'source-practo'
    case 'WhatsApp': return 'source-whatsapp'
  }
}

export const statusPillClass = (s: LeadStatus) => {
  switch (s) {
    case 'New': return 'status-new'
    case 'Contacted': return 'status-contacted'
    case 'Consultation Booked': return 'status-consultation'
    case 'Converted': return 'status-converted'
    case 'Lost': return 'status-lost'
    case 'No Response': return 'status-noresponse'
  }
}

export const initials = (name: string) => name.split(' ').map(w => w[0]).join('')
