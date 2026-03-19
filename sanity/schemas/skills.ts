import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Technical Skills' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Category Name', type: 'string' }),
          defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Skill Name', type: 'string' }),
                defineField({ name: 'isPrimary', title: 'Is Primary', type: 'boolean', initialValue: false }),
              ],
            }],
          }),
        ],
      }],
    }),
  ],
})
