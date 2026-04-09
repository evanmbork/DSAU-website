import {useState} from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import Footer from './SiteFooter'

const navItems = [
  {to: '/news', label: 'Articles / News'},
  {to: '/projects', label: 'Projects'},
  {to: '/academics', label: 'Academics'},
  {to: '/help', label: 'How to Help'},
  {to: '/people', label: 'People'},
  {to: '/contact', label: 'Contact'},
]

function NavItem({to, label, onClick}: {to: string; label: string; onClick?: () => void}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({isActive}) =>
        [
          'block px-3 py-2.5 rounded-md text-sm font-medium min-h-[44px] flex items-center',
          isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-semibold text-slate-900 text-sm leading-tight shrink-0">
            Dartmouth Student Alliance for Ukraine
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-white px-4 pb-3">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} onClick={() => setMenuOpen(false)} />
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}
