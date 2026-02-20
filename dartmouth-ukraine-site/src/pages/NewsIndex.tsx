import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanity } from "../lib/sanity.ts";
import { qLatestArticles } from "../lib/queries.ts";
import type { ArticleCard } from "../types/cms.ts";

export default function NewsIndex() {
  const [items, setItems] = useState<ArticleCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanity
      .fetch<ArticleCard[]>(qLatestArticles)
      .then((res: any) => setItems(res ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Articles / News</h1>
        <p className="text-slate-700">Announcements and updates from the club.</p>
      </header>

      {loading ? (
        <div className="text-slate-600">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-slate-700">
          No posts yet. Add your first one in the admin portal.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((a) => (
            <Link
              key={a._id}
              to={`/news/${a.slug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:bg-slate-50"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-900">{a.title}</h2>
                {a.publishedAt ? (
                  <span className="text-sm text-slate-500">
                    {new Date(a.publishedAt).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
              {a.excerpt ? <p className="mt-2 text-slate-700">{a.excerpt}</p> : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
