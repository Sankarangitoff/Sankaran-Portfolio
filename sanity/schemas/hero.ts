import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'greeting', title: 'Greeting', type: 'string', initialValue: "Hi, I'm" }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text' }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'link', title: 'Link', type: 'string' }),
          defineField({
            name: 'style',
            title: 'Style',
            type: 'string',
            options: { list: ['primary', 'secondary', 'ghost'] },
          }),
        ],
      }],
    }),
  ],
})
