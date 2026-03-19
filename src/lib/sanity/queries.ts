import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const heroQuery = groq`*[_type == "hero"][0]`

export const aboutQuery = groq`*[_type == "about"][0]`

export const skillsQuery = groq`*[_type == "skills"][0]`

export const projectsQuery = groq`*[_type == "projects"][0]{
  heading,
  subheading,
  "items": items[] | order(order asc)
}`

export const experienceQuery = groq`*[_type == "experience"][0]{
  heading,
  subheading,
  "entries": entries[] | order(order asc)
}`

export const achievementsQuery = groq`*[_type == "achievements"][0]`

export const testimonialsQuery = groq`*[_type == "testimonials"][0]`

export const allContentQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0],
  "hero": *[_type == "hero"][0],
  "about": *[_type == "about"][0],
  "skills": *[_type == "skills"][0],
  "projects": *[_type == "projects"][0]{ heading, subheading, "items": items[] | order(order asc) },
  "experience": *[_type == "experience"][0]{ heading, subheading, "entries": entries[] | order(order asc) },
  "achievements": *[_type == "achievements"][0],
  "testimonials": *[_type == "testimonials"][0]
}`
