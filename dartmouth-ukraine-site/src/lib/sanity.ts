import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string;
const dataset = import.meta.env.VITE_SANITY_DATASET as string;

// keep apiVersion stable; any valid date string is fine
const apiVersion = "2025-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast + cached; set false if you need instant drafts in prod
});

// Backwards-compatible alias if some files still import { sanity }
export const sanity = client;