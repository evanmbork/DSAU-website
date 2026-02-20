import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanity } from "../lib/sanity.ts";
import { qProjects } from "../lib/queries.ts";
import type { ProjectCard } from "../types/cms.ts";

export default function ProjectsIndex() {
  const [items, setItems] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanity
      .fetch<ProjectCard[]>(qProjects)
      .then((res: any) => setItems(res ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Previous Projects</h1>
        <p className="text-slate-700">A gallery of past initiatives and outcomes.</p>
      </header>

      {loading ? (
        <div className="text-slate-600">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-slate-700">
          No projects yet. Add your first one in the admin portal.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((p) => (
            <Link
              key={p._id}
              to={`/projects/${p.slug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:bg-slate-50"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-900">{p.title}</h2>
                {p.date ? (
                  <span className="text-sm text-slate-500">
                    {new Date(p.date).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
              {p.summary ? <p className="mt-2 text-slate-700">{p.summary}</p> : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
