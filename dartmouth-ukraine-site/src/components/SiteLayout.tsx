import {useState} from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import Footer from './SiteFooter'

const BLUE = '#1e3a8a'

function NavItem({to, label, onClick}: {to: string; label: string; onClick?: () => void}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({isActive}) =>
        [
          'px-3 py-2 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'bg-white/20 text-white font-semibold'
            : 'text-white hover:bg-white/10',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header style={{backgroundColor: BLUE}}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-white">
            Dartmouth Student Alliance for Ukraine
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1">
            <NavItem to="/news" label="News" />
            <NavItem to="/projects" label="Projects" />
            <NavItem to="/academics" label="Classes" />
            <NavItem to="/help" label="How to Help" />
            <NavItem to="/people" label="People" />
            <NavItem to="/contact" label="Contact" />
          </nav>

          {/* Hamburger button */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-3 flex flex-col gap-1" style={{backgroundColor: BLUE}}>
            <NavItem to="/news" label="News" onClick={close} />
            <NavItem to="/projects" label="Projects" onClick={close} />
            <NavItem to="/academics" label="Classes" onClick={close} />
            <NavItem to="/help" label="How to Help" onClick={close} />
            <NavItem to="/people" label="People" onClick={close} />
            <NavItem to="/contact" label="Contact" onClick={close} />
          </div>
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
