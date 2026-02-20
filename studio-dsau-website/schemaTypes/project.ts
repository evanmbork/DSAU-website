export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },

    { name: "orderRank", title: "Order (lower = earlier)", type: "number" },

    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Advocacy", "Education", "Fundraising", "Events", "Partnerships", "Other"] },
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Active", "Paused", "Completed"] },
    },

    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },

    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },

    { name: "content", title: "Content", type: "array", of: [{ type: "block" }] },

  ],
};