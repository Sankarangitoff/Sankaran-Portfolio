import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'achievements',
  title: 'Achievements Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Achievements & Highlights' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          defineField({ name: 'metric', title: 'Metric', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string' }),
          defineField({
            name: 'size',
            title: 'Card Size',
            type: 'string',
            options: { list: ['small', 'medium', 'large'] },
            initialValue: 'medium',
          }),
        ],
      }],
    }),
  ],
})
