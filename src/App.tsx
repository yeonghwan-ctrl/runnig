import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import PlanPage from './pages/PlanPage'
import ShoesPage from './pages/ShoesPage'
import StretchPage from './pages/StretchPage'
import InjuryPage from './pages/InjuryPage'
import { StoreProvider, useStore } from './store'

/** 프로필이 없으면 온보딩으로 보낸다 */
function RequireProfile({ children }: { children: JSX.Element }) {
  const { profile } = useStore()
  if (!profile) return <Navigate to="/onboarding" replace />
  return children
}

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/plan"
            element={
              <RequireProfile>
                <PlanPage />
              </RequireProfile>
            }
          />
          <Route path="/shoes" element={<ShoesPage />} />
          <Route path="/stretch" element={<StretchPage />} />
          <Route path="/injury" element={<InjuryPage />} />
          <Route path="*" element={<Navigate to="/plan" replace />} />
        </Route>
      </Routes>
    </StoreProvider>
  )
}
