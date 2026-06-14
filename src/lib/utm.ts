export interface UTMParams {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export function captureUTM(): UTMParams {
  if (typeof window === 'undefined') return {}
  const sp = new URLSearchParams(window.location.search)
  return {
    utmSource: sp.get('utm_source') || undefined,
    utmMedium: sp.get('utm_medium') || undefined,
    utmCampaign: sp.get('utm_campaign') || undefined,
    utmTerm: sp.get('utm_term') || undefined,
    utmContent: sp.get('utm_content') || undefined,
  }
}

export function getStoredUTM(): UTMParams {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem('newmi_utm')
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function persistUTM(params: UTMParams): void {
  if (typeof window === 'undefined') return
  const existing = getStoredUTM()
  if (!params.utmSource && !params.utmMedium && !params.utmCampaign) return
  sessionStorage.setItem('newmi_utm', JSON.stringify({ ...existing, ...params }))
}
