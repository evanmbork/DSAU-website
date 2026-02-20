import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import RichText from '../components/RichText'
import groq from 'groq'

type Project = {
  title: string
  summary?: string
  coverImage?: any
  body?: any
}

const q = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    summary,
    coverImage,
    body
  }
`

export default function ProjectDetail() {
  const { slug } = useParams()
  const [data, setData] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function run() {
      setLoading(true)
      const res = await client.fetch(q, { slug })
      if (mounted) {
        setData(res ?? null)
        setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [slug])

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-10">Loading…</div>
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="mt-3">
          <Link className="underline" to="/projects">
            Back to Projects
          </Link>
        </p>
      </div>
    )
  }

  const cover =
    data.coverImage?.asset ? urlFor(data.coverImage).width(1600).auto('format').quality(80).url() : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <Link to="/projects" className="text-sm underline underline-offset-4">
          ← Back to Projects
        </Link>
      </div>

      <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>

      {data.summary ? <p className="mt-4 text-lg text-slate-700">{data.summary}</p> : null}

      {cover ? (
        <img
          src={cover}
          alt=""
          className="mt-8 w-full rounded-2xl border border-slate-200"
          loading="lazy"
        />
      ) : null}

      <div className="prose prose-slate mt-8 max-w-none">
        <RichText value={data.body} />
      </div>
    </article>
  )
}