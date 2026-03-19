import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Projects Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Featured Projects' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Projects',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'challenge', title: 'Challenge', type: 'text' }),
          defineField({ name: 'solution', title: 'Solution', type: 'text' }),
          defineField({ name: 'techStack', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] }),
          defineField({
            name: 'impacts',
            title: 'Impacts',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Icon', type: 'string' }),
                defineField({ name: 'metric', title: 'Metric', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'string' }),
              ],
            }],
          }),
          defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
          defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
          defineField({ name: 'order', title: 'Order', type: 'number' }),
        ],
      }],
    }),
  ],
})
