import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = '2025-01-01'

if (!projectId || !dataset) {
  // Don’t crash builds silently—this makes it obvious why images/queries fail.
  // You can remove this if you prefer.
  // eslint-disable-next-line no-console
  console.warn('Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET in .env')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}