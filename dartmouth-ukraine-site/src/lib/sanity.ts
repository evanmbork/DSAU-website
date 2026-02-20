import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string;
const dataset = import.meta.env.VITE_SANITY_DATASET as string;
const apiVersion = "2025-01-01";

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
