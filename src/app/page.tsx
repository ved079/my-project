'use client'

import { useState, useEffect, useCallback } from 'react'
import { Command } from 'lucide-react'
import type { Page, DateRange, ToastType, ViewMode, RiyaTab } from '@/lib/types'
import { useToastStore } from '@/store/toast-store'
import { ToastContainer } from '@/components/shared/ToastContainer'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { RiyaSidebar } from '@/components/layout/RiyaSidebar'
import { RiyaTopbar } from '@/components/layout/RiyaTopbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { OverviewPage } from '@/components/pages/OverviewPage'
import { ChannelsPage } from '@/components/pages/ChannelsPage'
import { RevenuePage } from '@/components/pages/RevenuePage'
import { LeadsPage } from '@/components/pages/LeadsPage'
import { PipelinePage } from '@/components/pages/PipelinePage'
import { AssignPage } from '@/components/pages/AssignPage'
import { SEOPage } from '@/components/pages/SEOPage'
import { AutomationPage } from '@/components/pages/AutomationPage'
import { AlertsPage } from '@/components/pages/AlertsPage'
import { SettingsPage } from '@/components/pages/SettingsPage'
import { GoalsPage } from '@/components/pages/GoalsPage'
import { SLAPage } from '@/components/pages/SLAPage'
import { BudgetPage } from '@/components/pages/BudgetPage'
import { WhatsAppPage } from '@/components/pages/WhatsAppPage'
import { CalendarPage } from '@/components/pages/CalendarPage'
import { CohortPage } from '@/components/pages/CohortPage'
import { CompetitionPage } from '@/components/pages/CompetitionPage'
import { RulesPage } from '@/components/pages/RulesPage'
import { AttributionPage } from '@/components/pages/AttributionPage'
import { ROICalcPage } from '@/components/pages/ROICalcPage'
import { CommandCenterPage } from '@/components/riya/CommandCenterPage'
import { MyTasksPage } from '@/components/riya/MyTasksPage'
import { MyInquiriesPage } from '@/components/riya/MyInquiriesPage'
import { LeadScoringPage } from '@/components/riya/LeadScoringPage'
import { PipelineHealthPage } from '@/components/riya/PipelineHealthPage'
import { MyPerformancePage } from '@/components/riya/MyPerformancePage'
import { MyActivityPage } from '@/components/riya/MyActivityPage'
import { NotificationsPage } from '@/components/riya/NotificationsPage'

function RiyaDashboard({ activeTab, onTabChange }: { activeTab: RiyaTab; onTabChange: (t: RiyaTab) => void }) {
  const [teamMemberId, setTeamMemberId] = useState('')

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.json())
      .then((members: Array<{id: string; name: string}>) => {
        const riya = members.find((m) => m.name === 'Riya Sharma')
        if (riya) setTeamMemberId(riya.id)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      {activeTab === 'command' && <CommandCenterPage />}
      {activeTab === 'tasks' && <MyTasksPage />}
      {activeTab === 'inquiries' && <MyInquiriesPage />}
      {activeTab === 'scoring' && <LeadScoringPage />}
      {activeTab === 'pipeline' && <PipelineHealthPage />}
      {activeTab === 'performance' && <MyPerformancePage />}
      {activeTab === 'activity' && <MyActivityPage teamMemberId={teamMemberId} />}
      {activeTab === 'notifications' && <NotificationsPage />}
      <MobileBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </>
  )
}

export default function NewmiMarketingOS() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('newmi-view') as ViewMode) || 'admin'
    return 'admin'
  })
  const [activePage, setActivePage] = useState<Page>('overview')
  const [dateRange, setDateRange] = useState<DateRange>('30D')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('newmi-dark') === 'true'
    return false
  })
  const [riyaTab, setRiyaTab] = useState<RiyaTab>('command')
  const [cmdOpen, setCmdOpen] = useState(false)
  const toasts = useToastStore(s => s.toasts)

  useEffect(() => {
    localStorage.setItem('newmi-view', viewMode)
  }, [viewMode])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('newmi-dark', String(darkMode))
  }, [darkMode])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(true) }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const addToast = useCallback((message: string, type: ToastType) => {
    useToastStore.getState().addToast(message, type)
  }, [])

  const renderPage = () => {
    switch (activePage) {
      case 'overview': return <OverviewPage />
      case 'channels': return <ChannelsPage />
      case 'revenue': return <RevenuePage />
      case 'leads': return <LeadsPage />
      case 'pipeline': return <PipelinePage />
      case 'assign': return <AssignPage />
      case 'seo': return <SEOPage />
      case 'automation': return <AutomationPage />
      case 'alerts': return <AlertsPage />
      case 'settings': return <SettingsPage />
      case 'goals': return <GoalsPage />
      case 'sla': return <SLAPage />
      case 'budget': return <BudgetPage />
      case 'whatsapp': return <WhatsAppPage />
      case 'calendar': return <CalendarPage />
      case 'cohort': return <CohortPage />
      case 'competition': return <CompetitionPage />
      case 'rules': return <RulesPage />
      case 'attribution': return <AttributionPage />
      case 'roi-calc': return <ROICalcPage />
    }
  }

  return (
    <div className="app-root">
      <ToastContainer toasts={toasts} />
      {viewMode === 'admin' && (
        <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={p => { setActivePage(p); setCmdOpen(false) }} onLeadSelect={lead => { setActivePage('leads'); setCmdOpen(false) }} />
      )}
      <div className="dash-shell">
        {viewMode === 'admin' ? (
          <Sidebar active={activePage} onNavigate={setActivePage} />
        ) : (
          <RiyaSidebar activeTab={riyaTab} onTabChange={setRiyaTab} />
        )}
        <div className="dash-main">
          {viewMode === 'admin' ? (
            <Topbar active={activePage} dateRange={dateRange} onDateRangeChange={setDateRange} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} onOpenCmd={() => setCmdOpen(true)} addToast={addToast} viewMode={viewMode} onViewChange={setViewMode} />
          ) : (
            <RiyaTopbar activeTab={riyaTab} viewMode={viewMode} onViewChange={setViewMode} />
          )}
          <main className="dash-content" style={{ paddingBottom: viewMode === 'riya' ? '72px' : undefined }}>
            {viewMode === 'admin' ? renderPage() : <RiyaDashboard activeTab={riyaTab} onTabChange={setRiyaTab} />}
          </main>
        </div>
      </div>
    </div>
  )
}
