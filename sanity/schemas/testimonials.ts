import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'What People Say' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'text' }),
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role', type: 'string' }),
          defineField({ name: 'company', title: 'Company', type: 'string' }),
          defineField({ name: 'avatar', title: 'Avatar', type: 'image' }),
        ],
      }],
    }),
  ],
})
