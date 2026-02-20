import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "./SiteFooter";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-md text-sm font-medium",
          isActive
            ? "bg-slate-100 text-slate-900"
            : "text-slate-700 hover:bg-slate-50",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-slate-900">
            Dartmouth Student Alliance for Ukraine
          </Link>
          <nav className="flex gap-1">
            <NavItem to="/news" label="Articles / News" />
            <NavItem to="/projects" label="Projects" />
            <NavItem to="/help" label="How to Help" />
            <NavItem to="/people" label="People" />
            <NavItem to="/contact" label="Contact" />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
