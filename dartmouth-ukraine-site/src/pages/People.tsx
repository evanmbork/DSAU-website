import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { qPeople } from "../lib/queries";

type Person = {
  _id: string;
  name: string;
  role?: string;
  bio?: any;
  photo?: { alt?: string; asset?: { url?: string } };
  links?: { label?: string; url?: string }[];
};

export default function People() {
  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    client
      .fetch<Person[]>(qPeople)
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
      <h1 className="text-3xl font-semibold">People</h1>

      {loading ? (
        <p className="mt-6 text-slate-600">Loading…</p>
      ) : items.length === 0 ? (
        <div className="mt-6 rounded-xl border p-5 text-slate-700">
          <p className="font-medium">No people yet.</p>
          <p className="mt-1 text-sm text-slate-600">
            In Studio, create a <code>person</code> and click <b>Publish</b>.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p._id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                {p.photo?.asset?.url ? (
                  <img
                    src={p.photo.asset.url}
                    alt={p.photo.alt || p.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-slate-200" />
                )}

                <div>
                  <div className="font-semibold">{p.name}</div>
                  {p.role ? <div className="text-sm text-slate-600">{p.role}</div> : null}
                </div>
              </div>

              {p.links?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {l.label || "Link"}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
