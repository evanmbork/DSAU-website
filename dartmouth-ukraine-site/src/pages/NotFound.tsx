import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <Link to="/" className="text-slate-900 underline">
        Go home
      </Link>
    </div>
  );
}
