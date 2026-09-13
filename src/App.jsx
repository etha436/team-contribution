import { useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import DetailLayout from './components/DetailLayout'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import AddContribution from './pages/AddContribution'
import Players from './pages/Players'
import PlayerHistory from './pages/PlayerHistory'
import History from './pages/History'
import { useContributions } from './hooks/useContributions'
import { groupByPlayer } from './utils/aggregate'
import { ToastProvider } from './hooks/useToast'

function isOnboarded() {
  return localStorage.getItem('tc_onboarded') === '1'
}

function WelcomeGate() {
  return isOnboarded() ? <Navigate to="/dashboard" replace /> : <Welcome />
}

function DataOutlet() {
  const data = useContributions()
  const allPlayerNames = useMemo(
    () => groupByPlayer(data.contributions).map((p) => p.playerName),
    [data.contributions]
  )

  if (data.loading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="loading-screen__spinner" />
        <p>Loading your team&rsquo;s contributions…</p>
      </div>
    )
  }

  return <Outlet context={{ ...data, allPlayerNames }} />
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeGate />} />
          <Route element={<DataOutlet />}>
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/add"
              element={
                <DetailLayout>
                  <AddContribution />
                </DetailLayout>
              }
            />
            <Route
              path="/players"
              element={
                <MainLayout>
                  <Players />
                </MainLayout>
              }
            />
            <Route
              path="/players/:playerNameLower"
              element={
                <DetailLayout>
                  <PlayerHistory />
                </DetailLayout>
              }
            />
            <Route
              path="/history"
              element={
                <MainLayout>
                  <History />
                </MainLayout>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
