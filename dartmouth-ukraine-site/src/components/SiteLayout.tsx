import {useState} from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import Footer from './SiteFooter'

const BLUE = '#1e3a8a'

const navItems = [
  {to: '/news', label: 'News'},
  {to: '/projects', label: 'Projects'},
  {to: '/academics', label: 'Classes'},
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
          isActive ? 'bg-white/20 text-white font-semibold' : 'text-white hover:bg-white/10',
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
      <header style={{backgroundColor: BLUE}}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-semibold text-white text-sm leading-tight shrink-0">
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
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
          <nav className="md:hidden px-4 pb-3" style={{backgroundColor: BLUE}}>
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} onClick={() => setMenuOpen(false)} />
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-36">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}
