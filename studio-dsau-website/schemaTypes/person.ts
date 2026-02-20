export default {
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "role", title: "Role", type: "string" },

    { name: "email", title: "Email", type: "string" },

    {
      name: "coverImage",
      title: "Photo / cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },

    { name: "bio", title: "Bio", type: "text", rows: 6 },
  ],
};