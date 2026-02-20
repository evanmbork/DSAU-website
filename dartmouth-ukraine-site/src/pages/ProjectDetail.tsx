import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { qProjectBySlug } from "../lib/queries";
import { PortableText } from "@portabletext/react";

type ProjectFull = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  timeline?: string[];
  impact?: string[];
  links?: { label?: string; url?: string }[];
  coverImage?: { alt?: string; asset?: { url?: string } };
  body?: any;
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState<ProjectFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    client
      .fetch<ProjectFull>(qProjectBySlug, { slug })
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
      <Link to="/projects" className="text-sm text-slate-600 hover:underline">
        ← Back to projects
      </Link>

      {loading ? (
        <p className="mt-6 text-slate-600">Loading…</p>
      ) : !item ? (
        <div className="mt-6 rounded-xl border p-5">
          <p className="font-medium">Not found.</p>
          <p className="mt-1 text-sm text-slate-600">
            If you just created it, make sure it’s <b>Published</b> and has a slug.
          </p>
        </div>
      ) : (
        <article className="mt-6">
          {item.coverImage?.asset?.url ? (
            <img
              src={item.coverImage.asset.url}
              alt={item.coverImage.alt || item.title}
              className="mb-6 h-56 w-full rounded-2xl object-cover"
            />
          ) : null}

          <h1 className="text-3xl font-semibold">{item.title}</h1>
          {item.summary ? <p className="mt-3 text-slate-700">{item.summary}</p> : null}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {item.timeline?.length ? (
              <section className="rounded-2xl border bg-white p-5">
                <h2 className="font-semibold">Timeline</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {item.timeline.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {item.impact?.length ? (
              <section className="rounded-2xl border bg-white p-5">
                <h2 className="font-semibold">Impact</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {item.impact.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {item.links?.length ? (
            <section className="mt-6 rounded-2xl border bg-white p-5">
              <h2 className="font-semibold">Links</h2>
              <ul className="mt-3 space-y-2">
                {item.links.map((l, i) => (
                  <li key={i}>
                    <a className="text-blue-700 hover:underline" href={l.url || "#"} target="_blank" rel="noreferrer">
                      {l.label || l.url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="prose prose-slate mt-10 max-w-none">
            {item.body ? <PortableText value={item.body} /> : <p>(No body yet)</p>}
          </div>
        </article>
      )}
    </div>
  );
}
