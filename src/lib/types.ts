export type Page = 'overview' | 'channels' | 'revenue' | 'leads' | 'pipeline' | 'assign' | 'seo' | 'automation' | 'alerts' | 'settings' | 'goals' | 'sla' | 'budget' | 'whatsapp' | 'calendar' | 'cohort' | 'competition' | 'rules' | 'attribution' | 'roi-calc'

export type DateRange = '7D' | '30D' | '90D'

export type LeadStatus = 'New' | 'Contacted' | 'Consultation Booked' | 'Converted' | 'Lost' | 'No Response'

export type LeadSource = 'Google Ads' | 'Meta Ads' | 'Organic SEO' | 'Practo' | 'WhatsApp'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem { id: number; message: string; type: ToastType; exiting?: boolean }

export type ViewMode = 'admin' | 'riya'

export type RiyaTab = 'command' | 'tasks' | 'inquiries' | 'scoring' | 'pipeline' | 'performance' | 'activity' | 'notifications'
