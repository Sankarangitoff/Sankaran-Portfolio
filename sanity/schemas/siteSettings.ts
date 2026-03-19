import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'siteDescription', title: 'Site Description', type: 'text' }),
    defineField({ name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'resumePDF', title: 'Resume PDF', type: 'file' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'availability', title: 'Availability', type: 'string' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'showTestimonials', title: 'Show Testimonials', type: 'boolean', initialValue: true }),
    defineField({ name: 'showTechCredit', title: 'Show Tech Credit', type: 'boolean', initialValue: true }),
  ],
})
