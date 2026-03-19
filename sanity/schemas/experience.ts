import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Experience' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'entries',
      title: 'Entries',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'role', title: 'Role', type: 'string' }),
          defineField({ name: 'company', title: 'Company', type: 'string' }),
          defineField({ name: 'companyLogo', title: 'Company Logo', type: 'image' }),
          defineField({ name: 'startDate', title: 'Start Date', type: 'date' }),
          defineField({ name: 'endDate', title: 'End Date', type: 'date' }),
          defineField({ name: 'isPresent', title: 'Currently Working', type: 'boolean', initialValue: false }),
          defineField({ name: 'achievements', title: 'Achievements', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'order', title: 'Order', type: 'number' }),
        ],
      }],
    }),
  ],
})
