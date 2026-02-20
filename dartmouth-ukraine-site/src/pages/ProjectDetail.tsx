import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { qProjectBySlug } from "../lib/queries";
import { PortableText } from "@portabletext/react";

type Project = {
  title: string;
  excerpt?: string;
  category?: string;
  status?: string;
  content?: any[];
  coverImage?: { alt?: string; asset?: { url?: string } };
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch<Project>(qProjectBySlug, { slug });
        if (alive) setItem(data || null);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Failed to load project");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!item) return <div className="p-6">Not found.</div>;

  const img = item.coverImage?.asset?.url;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/projects" className="text-sm text-gray-600 hover:underline">
        ← Back to Projects
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{item.title}</h1>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
        {item.category ? <span className="rounded-full border px-2 py-0.5">{item.category}</span> : null}
        {item.status ? <span className="rounded-full border px-2 py-0.5">{item.status}</span> : null}
      </div>

      {img ? (
        <div className="mt-6 overflow-hidden rounded-2xl border bg-gray-100">
          <img
            src={img}
            alt={item.coverImage?.alt || item.title}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      {item.excerpt ? <p className="mt-6 text-gray-700">{item.excerpt}</p> : null}

      <div className="prose prose-gray mt-8 max-w-none">
        {item.content ? <PortableText value={item.content} /> : null}
      </div>

    </div>
  );
}