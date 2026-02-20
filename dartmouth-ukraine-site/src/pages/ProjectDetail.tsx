import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { sanity } from "../lib/sanity.ts";
import { qProjectBySlug } from "../lib/queries.ts";
import type { ProjectFull } from "../types/cms.ts";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<ProjectFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    sanity
      .fetch<ProjectFull | null>(qProjectBySlug, { slug })
      .then((res: any) => setData(res))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-slate-600">Loading…</div>;

  if (!data) {
    return (
      <div className="space-y-4">
        <div className="text-slate-700">Not found.</div>
        <Link className="text-slate-900 underline" to="/projects">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article className="prose prose-slate max-w-none">
      <Link to="/projects" className="no-underline text-sm text-slate-600 hover:text-slate-900">
        ← Back
      </Link>
      <h1>{data.title}</h1>
      {data.date ? (
        <p className="text-sm text-slate-500">{new Date(data.date).toLocaleDateString()}</p>
      ) : null}
      {data.body ? <PortableText value={data.body} /> : null}
    </article>
  );
}
