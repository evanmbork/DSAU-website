import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string) || "production";
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string) || "2025-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Backwards-compatible alias (in case some files still import `sanity`)
export const sanity = client;