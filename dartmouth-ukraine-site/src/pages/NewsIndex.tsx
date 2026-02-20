import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { qLatestNewsArticles } from "../lib/queries";

type NewsListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function NewsIndex() {
  const [items, setItems] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    client
      .fetch<NewsListItem[]>(qLatestNewsArticles)
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
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Articles / News</h1>
        <p className="mt-2 text-slate-600">
          Announcements, statements, and event recaps.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-600">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border p-5 text-slate-700">
          <p className="font-medium">No articles yet.</p>
          <p className="mt-1 text-sm text-slate-600">
            In Sanity Studio, create a <code>newsArticle</code> and make sure you click <b>Publish</b>.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((a) => (
            <Link
              key={a._id}
              to={`/news/${a.slug}`}
              className="block rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold">{a.title}</h2>
                <span className="shrink-0 text-sm text-slate-500">
                  {fmtDate(a.publishedAt)}
                </span>
              </div>
              {a.excerpt ? (
                <p className="mt-2 text-slate-600">{a.excerpt}</p>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
