import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import { qPeople } from "../lib/queries";

type Person = {
  _id: string;
  name: string;
  role?: string;
  email?: string;
  bio?: string;
  coverImage?: { alt?: string; asset?: { url?: string } };
};

export default function People() {
  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch<Person[]>(qPeople);
        if (alive) setItems(data || []);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Failed to load people");
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
      <h1 className="text-3xl font-semibold tracking-tight">People</h1>
      <p className="mt-2 text-gray-600">
        The team behind DSAU.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const img = p.coverImage?.asset?.url;
          return (
            <div key={p._id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              {img ? (
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={img}
                    alt={p.coverImage?.alt || p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-gray-100" />
              )}

              <div className="p-5">
                <div className="text-lg font-semibold">{p.name}</div>
                {p.role ? <div className="mt-1 text-sm text-gray-600">{p.role}</div> : null}

                {p.bio ? <p className="mt-3 line-clamp-6 text-sm text-gray-700">{p.bio}</p> : null}

                {p.email ? (
                  <div className="mt-4 text-sm">
                    <a className="text-blue-700 hover:underline" href={`mailto:${p.email}`}>
                      {p.email}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}