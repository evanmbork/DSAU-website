import React from "react";
import { client, urlFor } from "../lib/sanity";
import groq from "groq";

type LatestArticle = {
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: any;
};

const latestNewsQuery = groq`*[_type == "newsArticle" && defined(slug.current)]
| order(coalesce(publishedAt, _createdAt) desc)[0]{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage
}`;

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function Home() {
  const [latest, setLatest] = React.useState<LatestArticle | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    client
      .fetch<LatestArticle | null>(latestNewsQuery)
      .then((doc) => {
        if (!mounted) return;
        setLatest(doc ?? null);
      })
      .catch((err) => {
        console.error("Failed to load latest news article:", err);
        if (!mounted) return;
        setLatest(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-30">
      {/* HERO */}
      <section className="text-center space-y-10 pt-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Dartmouth Student Alliance for Ukraine
        </h1>

        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Supporting Ukraine through advocacy and action
        </p>

        {/* LATEST ARTICLE PREVIEW */}
        <div className="max-w-3xl mx-auto pt-10">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm text-left overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
                  Latest update
                </h2>
                <a
                  href="/news"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4"
                >
                  View all
                </a>
              </div>

              {loading ? (
                <div className="mt-4 space-y-3">
                  <div className="h-5 w-3/4 bg-slate-100 rounded" />
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
              ) : !latest?.slug ? (
                <div className="mt-4 text-slate-600">
                  No articles yet. Add one in Sanity and it’ll show up here.
                </div>
              ) : (
                <a
                  href={`/news/${latest.slug}`}
                  className="mt-4 block rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="flex gap-4 items-start">
                    {latest.coverImage ? (
                      <img
                        src={urlFor(latest.coverImage).width(320).height(200).fit("crop").url()}
                        alt={latest.title ?? "Latest article"}
                        className="w-28 h-20 md:w-40 md:h-28 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-28 h-20 md:w-40 md:h-28 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0" />
                    )}

                    <div className="min-w-0">
                      <div className="text-lg md:text-xl font-semibold text-slate-900 leading-snug line-clamp-2">
                        {latest.title ?? "Untitled"}
                      </div>

                      {latest.publishedAt ? (
                        <div className="mt-1 text-sm text-slate-500">{formatDate(latest.publishedAt)}</div>
                      ) : null}

                      {latest.excerpt ? (
                        <p className="mt-2 text-slate-600 leading-relaxed line-clamp-3">
                          {latest.excerpt}
                        </p>
                      ) : (
                        <p className="mt-2 text-slate-600 leading-relaxed">
                          Read the latest update from DSAU.
                        </p>
                      )}

                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                        Read article <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>

          <p className="text-slate-600 leading-relaxed">
            We aim to raise awareness about the ongoing war in Ukraine, support humanitarian efforts,
            and create meaningful dialogue on campus about Ukrainian cluture and sovereignty.
          </p>

          <p className="text-slate-600 leading-relaxed">
            Through events, partnerships, and advocacy, we connect Dartmouth students to the realities
            of modern Ukraine.
          </p>
        </div>

        <div className="bg-slate-100 rounded-lg p-8">
          <h3 className="font-semibold text-slate-900 mb-4">What We Do</h3>

          <ul className="space-y-3 text-slate-600">
            <li>• Publish articles</li>
            <li>• Organize fundraisers and events</li>
            <li>• Partner with Ukrainian organizations</li>
            <li>• Support Ukrainian students</li>
          </ul>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-slate-900 text-white rounded-xl p-12 text-center space-y-10">
        <h2 className="text-3xl font-semibold">Stand with Ukraine.</h2>

        <p className="text-slate-300 max-w-xl mx-auto">
          Whether you're Ukrainian or simply care about democracy and sovereignty, there's a place for you in the club.
        </p>

        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-white text-slate-900 rounded-md font-medium hover:bg-slate-100 transition"
        >
          Join the Club
        </a>
      </section>
    </div>
  );
}