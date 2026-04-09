import {Link} from 'react-router-dom'
import UkrainianBorder from './UkrainianBorder'

const BLUE = '#1e3a8a'

export default function Footer() {
  return (
    <footer>
      <UkrainianBorder id="ua-footer" />

      <div
        style={{backgroundColor: BLUE}}
        className="max-w-full px-4 py-6"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-white/70">
          <div className="flex gap-4">
            <span className="text-white font-medium">© {new Date().getFullYear()} DSAU</span>
            <a
              className="text-white font-medium hover:text-white/70 transition-colors"
              href="https://www.instagram.com/dartmouth.ukraine.alliance/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>

          <Link
            to="/admin"
            className="opacity-30 hover:opacity-70 text-white transition-opacity"
            aria-label="Admin login"
            title="Admin"
          >
            Member Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
