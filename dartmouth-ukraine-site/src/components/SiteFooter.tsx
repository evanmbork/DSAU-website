import {Link} from 'react-router-dom'
import UkrainianBorder from './UkrainianBorder'

const BLUE = '#1e3a8a'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between text-sm text-slate-600">
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} DSAU</span>
          <a
            className="hover:text-slate-900"
            href="https://www.instagram.com/dartmouth.ukraine.alliance/"
            target="_blank"
            rel="noreferrer"
          >
            Member Login
          </Link>
        </div>

        {/* Discreet admin link */}
        <Link
          to="/admin"
          className="opacity-50 hover:opacity-100 hover:text-slate-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Admin login"
          title="Admin"
        >
          •
        </Link>
      </div>
    </footer>
  )
}
