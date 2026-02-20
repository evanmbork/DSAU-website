import { useEffect } from "react";

const SANITY_STUDIO_URL = "http://localhost:3333/";

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = SANITY_STUDIO_URL;
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="text-slate-900 font-semibold">Redirecting…</div>
      <p className="text-slate-700 mt-2">
        If nothing happens, open the admin portal directly:
      </p>
      <a className="text-slate-900 underline" href={SANITY_STUDIO_URL}>
        {SANITY_STUDIO_URL}
      </a>
    </div>
  );
}
