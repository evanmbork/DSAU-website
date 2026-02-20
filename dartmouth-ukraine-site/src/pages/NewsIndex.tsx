import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { qArticles } from "../lib/queries";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: { alt?: string; asset?: { url?: string } };
};

export default function NewsIndex() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch<Article[]>(qArticles);
        if (alive) setItems(data || []);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Failed to load articles");
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
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">News</h1>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((a) => {
          const img = a.coverImage?.asset?.url;
          return (
            <Link
              key={a._id}
              to={`/news/${a.slug}`}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              {img ? (
                <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={img}
                    alt={a.coverImage?.alt || a.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] w-full bg-gray-100" />
              )}

              <div className="p-5">
                <div className="text-xs text-gray-500">
                  {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : ""}
                </div>
                <div className="mt-2 text-lg font-semibold">{a.title}</div>
                {a.excerpt ? <p className="mt-2 line-clamp-3 text-sm text-gray-600">{a.excerpt}</p> : null}
                <div className="mt-4 text-sm font-medium text-gray-900 group-hover:underline">
                  Read →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}