import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import RichText from '../components/RichText'
import groq from 'groq'

type Article = {
  title: string
  publishedAt?: string
  excerpt?: string
  coverImage?: any
  body?: any
}

const q = groq`
  *[_type == "newsArticle" && slug.current == $slug][0]{
    title,
    publishedAt,
    excerpt,
    coverImage,
    body
  }
`

export default function NewsArticle() {
  const { slug } = useParams()
  const [data, setData] = useState<Article | null>(null)
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
        <h1 className="text-2xl font-bold">Article not found</h1>
        <p className="mt-3">
          <Link className="underline" to="/news">
            Back to News
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
        <Link to="/news" className="text-sm underline underline-offset-4">
          ← Back to News
        </Link>
      </div>

      <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>

      {data.publishedAt ? (
        <p className="mt-2 text-sm text-slate-600">
          {new Date(data.publishedAt).toLocaleDateString()}
        </p>
      ) : null}

      {data.excerpt ? <p className="mt-4 text-lg text-slate-700">{data.excerpt}</p> : null}

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