import { NavLink, Outlet, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/plan', label: '훈련계획', icon: '📅' },
  { to: '/shoes', label: '신발', icon: '👟' },
  { to: '/stretch', label: '스트레칭', icon: '🧘' },
  { to: '/injury', label: '부상', icon: '🩹' },
]

export default function Layout() {
  const location = useLocation()
  const onOnboarding = location.pathname === '/onboarding'

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white shadow-soft">
      <main className="flex-1 px-5 pb-28 pt-6">
        <Outlet />
      </main>

      {!onOnboarding && (
        <nav className="pb-safe fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-md items-stretch justify-around border-t border-slate-100 bg-white/95 px-2 pt-2 backdrop-blur">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-brand-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`
              }
            >
              <span className="text-lg leading-none">{t.icon}</span>
              {t.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
