import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { qProjects } from "../lib/queries";

type ProjectListItem = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  coverImage?: { alt?: string; asset?: { url?: string } };
};

export default function ProjectsIndex() {
  const [items, setItems] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    client
      .fetch<ProjectListItem[]>(qProjects)
      .then((data) => {
        if (!alive) return;
        setItems(data || []);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mt-2 text-slate-600">Previous initiatives, fundraisers, and collaborations.</p>

      {loading ? (
        <p className="mt-6 text-slate-600">Loading…</p>
      ) : items.length === 0 ? (
        <div className="mt-6 rounded-xl border p-5 text-slate-700">
          <p className="font-medium">No projects yet.</p>
          <p className="mt-1 text-sm text-slate-600">
            In Studio, create a <code>project</code> and click <b>Publish</b>.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((p) => (
            <Link
              key={p._id}
              to={`/projects/${p.slug}`}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              {p.coverImage?.asset?.url ? (
                <img
                  src={p.coverImage.asset.url}
                  alt={p.coverImage.alt || p.title}
                  className="mb-4 h-40 w-full rounded-xl object-cover"
                />
              ) : null}
              <div className="text-lg font-semibold">{p.title}</div>
              {p.summary ? <p className="mt-2 text-slate-600">{p.summary}</p> : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
