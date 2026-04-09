import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ukrainianClass',
  title: 'Ukrainian Class',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'courseNumber',
      title: 'Course Number',
      type: 'string',
      description: 'e.g. RUSS 1, RUSS 3',
    }),
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      description: 'e.g. Fall 2025, Winter 2026',
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'string',
      description: 'e.g. MWF 10:10–11:15am',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration / Course Link',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Term',
      name: 'termAsc',
      by: [{field: 'term', direction: 'asc'}],
    },
  ],
})
