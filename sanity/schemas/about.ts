import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'About Me' }),
    defineField({ name: 'story', title: 'Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          defineField({ name: 'stat', title: 'Stat', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'locationBadge', title: 'Location Badge', type: 'string' }),
  ],
})
