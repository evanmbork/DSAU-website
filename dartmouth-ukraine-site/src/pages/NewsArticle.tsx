import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { qNewsArticleBySlug } from "../lib/queries";
import { PortableText } from "@portabletext/react";

type NewsFull = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  body?: any;
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function NewsArticle() {
  const { slug } = useParams();
  const [item, setItem] = useState<NewsFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    client
      .fetch<NewsFull>(qNewsArticleBySlug, { slug })
      .then((data) => {
        if (!alive) return;
        setItem(data || null);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/news" className="text-sm text-slate-600 hover:underline">
        ← Back to news
      </Link>

      {loading ? (
        <p className="mt-6 text-slate-600">Loading…</p>
      ) : !item ? (
        <div className="mt-6 rounded-xl border p-5">
          <p className="font-medium">Not found.</p>
          <p className="mt-1 text-sm text-slate-600">
            If you just created it in Studio, make sure you clicked <b>Publish</b> and that the slug matches the URL.
          </p>
        </div>
      ) : (
        <article className="mt-6">
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          <div className="mt-2 text-sm text-slate-500">{fmtDate(item.publishedAt)}</div>
          {item.excerpt ? <p className="mt-4 text-slate-700">{item.excerpt}</p> : null}

          <div className="prose prose-slate mt-8 max-w-none">
            {item.body ? <PortableText value={item.body} /> : <p>(No body yet)</p>}
          </div>
        </article>
      )}
    </div>
  );
}
