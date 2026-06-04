import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generatePlan } from './lib/planGenerator'
import type { RunnerProfile, Shoe, WeekPlan } from './types'

interface Store {
  profile: RunnerProfile | null
  setProfile: (p: RunnerProfile) => void
  clearProfile: () => void
  shoes: Shoe[]
  addShoe: (s: Shoe) => void
  removeShoe: (id: string) => void
  plan: WeekPlan[]
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileRaw, clearProfile] =
    useLocalStorage<RunnerProfile | null>('runplan.profile', null)
  const [shoes, setShoes] = useLocalStorage<Shoe[]>('runplan.shoes', [])

  const plan = useMemo(
    () => (profile ? generatePlan(profile) : []),
    [profile],
  )

  const value: Store = {
    profile,
    setProfile: (p) => setProfileRaw(p),
    clearProfile,
    shoes,
    addShoe: (s) => setShoes((prev) => [...prev, s]),
    removeShoe: (id) => setShoes((prev) => prev.filter((x) => x.id !== id)),
    plan,
  }

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  )
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
