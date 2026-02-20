import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '../lib/sanity'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      const alt = value?.alt || ''
      const caption = value?.caption

      const src = urlFor(value).width(1400).auto('format').quality(80).url()

      return (
        <figure className="my-6">
          <img
            src={src}
            alt={alt}
            className="w-full rounded-xl border border-slate-200"
            loading="lazy"
          />
          {caption ? (
            <figcaption className="mt-2 text-sm text-slate-600">{caption}</figcaption>
          ) : null}
        </figure>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="mt-8 mb-3 text-3xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 mb-3 text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="my-4 leading-7 text-slate-800">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-slate-300 pl-4 italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
    number: ({ children }) => <li className="my-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined
      const isExternal = href?.startsWith('http')
      return (
        <a
          href={href}
          className="underline underline-offset-4"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

export default function RichText({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}