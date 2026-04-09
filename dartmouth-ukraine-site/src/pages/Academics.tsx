import {useEffect, useState} from 'react'
import {client} from '../lib/sanity'
import {qUkrainianClasses} from '../lib/queries'

type UkrainianClass = {
  _id: string
  title: string
  courseNumber?: string
  term?: string
  instructor?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
  description?: string
  schedule?: string
  registrationLink?: string
}

const levelLabel: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const levelColor: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
}

export default function Academics() {
  const [classes, setClasses] = useState<UkrainianClass[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await client.fetch<UkrainianClass[]>(qUkrainianClasses)
        if (alive) setClasses(data || [])
      } catch (e: any) {
        if (alive) setErr(e?.message || 'Failed to load classes')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Ukrainian Courses at Dartmouth</h1>

      <p className="mt-4 max-w-2xl text-slate-600 leading-7">
        Dartmouth offers Ukrainian courses through the East European, Eurasian, and Russian Studies Department (EEER). 
        These courses are open to all students and provide an opportunity to connect with Ukrainian culture,
        language, and literature. Whether you're a complete beginner or looking to deepen your proficiency, there's a course for you.
      </p>

      <div className="mt-10">
        {loading && <p className="text-slate-500">Loading courses…</p>}
        {err && <p className="text-red-600">{err}</p>}

        {!loading && !err && classes.length === 0 && (
          <p className="text-slate-500">No courses listed yet — check back soon.</p>
        )}

        {classes.length > 0 && (
          <div className="flex flex-col gap-4">
            {classes.map((c) => (
              <div key={c._id} className="rounded-xl border border-slate-200 px-4 md:px-6 py-4">
                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {c.courseNumber && (
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        {c.courseNumber}
                      </p>
                    )}
                    <h2 className="text-base font-semibold text-slate-900">{c.title}</h2>
                  </div>
                  {c.level && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${levelColor[c.level] ?? 'bg-slate-100 text-slate-700'}`}
                    >
                      {levelLabel[c.level] ?? c.level}
                    </span>
                  )}
                </div>

                {/* Meta — wraps naturally on mobile */}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                  {c.term && <span>📅 {c.term}</span>}
                  {c.instructor && <span>👤 {c.instructor}</span>}
                  {c.schedule && <span>🕐 {c.schedule}</span>}
                </div>

                {/* Description */}
                {c.description && (
                  <p className="mt-3 text-sm text-slate-600 leading-6">{c.description}</p>
                )}

                {c.registrationLink && (
                  <a
                    href={c.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center min-h-[44px] text-sm font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900"
                  >
                    View course →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
