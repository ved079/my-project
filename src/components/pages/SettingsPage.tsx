'use client'

import {
  ACCENT,
} from '@/lib/data'

export function SettingsPage() {
  return (
    <div>
      <p className="section-label">SYSTEM</p>
      <h2 className="section-heading">Settings</h2>
      <p className="section-subtitle">Configure your Marketing OS preferences.</p>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">Notifications</div>
          <div className="settings-row"><span className="settings-row-label">Lead alerts</span><span className="settings-row-value">Enabled</span></div>
          <div className="settings-row"><span className="settings-row-label">SEO alerts</span><span className="settings-row-value">Enabled</span></div>
          <div className="settings-row"><span className="settings-row-label">Daily digest</span><span className="settings-row-value">9:00 AM</span></div>
          <div className="settings-row"><span className="settings-row-label">Slack integration</span><span className="settings-row-value">Not connected</span></div>
        </div>
        <div className="settings-card">
          <div className="settings-card-title">Team</div>
          <div className="settings-row"><span className="settings-row-label">Team members</span><span className="settings-row-value">4</span></div>
          <div className="settings-row"><span className="settings-row-label">Auto-assign</span><span className="settings-row-value">Round-robin</span></div>
          <div className="settings-row"><span className="settings-row-label">Max leads per person</span><span className="settings-row-value">30</span></div>
          <div className="settings-row"><span className="settings-row-label">Response SLA</span><span className="settings-row-value">15 minutes</span></div>
        </div>
        <div className="settings-card">
          <div className="settings-card-title">Data</div>
          <div className="settings-row"><span className="settings-row-label">Default date range</span><span className="settings-row-value">30 days</span></div>
          <div className="settings-row"><span className="settings-row-label">Currency</span><span className="settings-row-value">INR (\u20B9)</span></div>
          <div className="settings-row"><span className="settings-row-label">Phone masking</span><span className="settings-row-value">Enabled</span></div>
          <div className="settings-row"><span className="settings-row-label">Data retention</span><span className="settings-row-value">12 months</span></div>
        </div>
        <div className="settings-card">
          <div className="settings-card-title">Integrations</div>
          <div className="settings-row"><span className="settings-row-label">Google Ads</span><span className="settings-row-value" style={{ color: '#059669' }}>Connected</span></div>
          <div className="settings-row"><span className="settings-row-label">Meta Ads</span><span className="settings-row-value" style={{ color: '#059669' }}>Connected</span></div>
          <div className="settings-row"><span className="settings-row-label">Google Analytics</span><span className="settings-row-value" style={{ color: '#C05621' }}>Pending</span></div>
          <div className="settings-row"><span className="settings-row-label">Search Console</span><span className="settings-row-value" style={{ color: ACCENT }}>Not connected</span></div>
        </div>
      </div>
    </div>
  )
}
