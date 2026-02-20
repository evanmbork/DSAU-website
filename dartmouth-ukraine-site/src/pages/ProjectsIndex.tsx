import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { qProjects } from "../lib/queries";

type Project = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  status?: string;
  coverImage?: { alt?: string; asset?: { url?: string } };
};

export default function ProjectsIndex() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch<Project[]>(qProjects);
        if (alive) setItems(data || []);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Failed to load projects");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((p) => {
          const img = p.coverImage?.asset?.url;
          return (
            <Link
              key={p._id}
              to={`/projects/${p.slug}`}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              {img ? (
                <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={img}
                    alt={p.coverImage?.alt || p.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] w-full bg-gray-100" />
              )}

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                  {p.category ? <span className="rounded-full border px-2 py-0.5">{p.category}</span> : null}
                  {p.status ? <span className="rounded-full border px-2 py-0.5">{p.status}</span> : null}
                </div>
                <div className="mt-2 text-lg font-semibold">{p.title}</div>
                {p.excerpt ? <p className="mt-2 line-clamp-3 text-sm text-gray-600">{p.excerpt}</p> : null}
                <div className="mt-4 text-sm font-medium text-gray-900 group-hover:underline">
                  View →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}