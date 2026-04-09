import {useEffect, useState} from 'react'
import {client} from '../lib/sanity'
import {qPeople, qAlumni} from '../lib/queries'

type Person = {
  _id: string
  name: string
  role?: string
  email?: string
  instagram?: string
  bio?: string
  graduationYear?: string
  coverImage?: {alt?: string; asset?: {url?: string}}
}

type Alum = {
  _id: string
  name: string
  role?: string
  graduationYear?: string
  coverImage?: {alt?: string; asset?: {url?: string}}
}

function PersonCard({ p }: { p: Person }) {
  const img = p.coverImage?.asset?.url;
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
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
        {p.graduationYear ? <div className="mt-1 text-sm text-gray-500">Class of {p.graduationYear}</div> : null}
        {p.bio ? <p className="mt-3 line-clamp-6 text-sm text-gray-700">{p.bio}</p> : null}
        {p.email ? (
          <div className="mt-4 text-sm">
            <a className="text-blue-700 hover:underline" href={`mailto:${p.email}`}>
              {p.email}
            </a>
          </div>
        ) : null}
        {p.instagram ? (
          <div className="mt-2 text-sm">
            <a
              className="text-blue-700 hover:underline"
              href={`https://instagram.com/${p.instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              @{p.instagram}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function People() {
  const [people, setPeople] = useState<Person[]>([])
  const [alumni, setAlumni] = useState<Alum[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const [peopleData, alumniData] = await Promise.all([
          client.fetch<Person[]>(qPeople),
          client.fetch<Alum[]>(qAlumni),
        ])
        if (alive) {
          setPeople(peopleData || [])
          setAlumni(alumniData || [])
        }
      } catch (e: any) {
        if (alive) setErr(e?.message || 'Failed to load people')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  if (loading) return <div className="p-6">Loading…</div>
  if (err) return <div className="p-6 text-red-600">{err}</div>

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-semibold tracking-tight">People</h1>
      <p className="mt-2 text-gray-600">The team behind DSAU.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((p) => (
          <PersonCard key={p._id} p={p} />
        ))}
      </div>

      {/* Alumni section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">DSAU Alumni</h2>
        <p className="mt-1 text-gray-600">Dartmouth graduates who have been a part of the club.</p>

        {alumni.length === 0 ? (
          <p className="mt-6 text-slate-500">No alumni listed yet.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {alumni.map((a) => (
              <div key={a._id} className="flex items-center gap-4 rounded-xl border border-slate-200 px-5 py-3">
                {a.coverImage?.asset?.url ? (
                  <img
                    src={a.coverImage.asset.url}
                    alt={a.coverImage.alt || a.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 shrink-0" />
                )}
                <div className="min-w-0">
                  <span className="font-medium text-slate-900">{a.name}</span>
                  {(a.role || a.graduationYear) && (
                    <span className="ml-2 text-sm text-slate-500">
                      {[a.role, a.graduationYear && `'${a.graduationYear}`].filter(Boolean).join(' · ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
