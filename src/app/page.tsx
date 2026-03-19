import { client, isSanityConfigured } from '@/lib/sanity/client'
import { allContentQuery } from '@/lib/sanity/queries'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Achievements from '@/components/sections/Achievements'
import Testimonials from '@/components/sections/Testimonials'
import Resume from '@/components/sections/Resume'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export const revalidate = 60

// Demo content for when Sanity is not configured
const demoContent = {
  siteSettings: {
    siteName: 'Sankaran Rajendran',
    siteDescription: 'Backend Software Engineer',
    email: 'hello@sankaran.dev',
    location: 'India',
    availability: 'Open to opportunities',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    showTestimonials: false,
    showTechCredit: true,
  },
  hero: {
    greeting: 'Hello, I\'m',
    name: 'Sankaran Rajendran',
    title: 'Backend Software Engineer',
    tagline: 'Building scalable systems and crafting elegant solutions with Ruby on Rails, Golang, and AWS.',
    ctaButtons: [
      { label: 'View Projects', link: '#projects', style: 'primary' as const },
      { label: 'Contact Me', link: '#contact', style: 'secondary' as const },
    ],
  },
  about: {
    heading: 'About Me',
    story: [{ _type: 'block' as const, _key: '1', children: [{ text: 'Configure Sanity CMS to add your story here. Visit /studio to get started.' }] }],
    quickFacts: [
      { icon: '💼', stat: '5+', label: 'Years Experience' },
      { icon: '🚀', stat: '10+', label: 'Projects Delivered' },
      { icon: '👥', stat: '10K+', label: 'Users Served' },
      { icon: '☕', stat: '∞', label: 'Cups of Coffee' },
    ],
    locationBadge: 'Based in India',
  },
  skills: {
    heading: 'Skills & Technologies',
    subheading: 'Technologies I work with on a daily basis',
    categories: [
      { name: 'Backend', skills: [{ name: 'Ruby on Rails', isPrimary: true }, { name: 'Golang', isPrimary: true }, { name: 'Node.js', isPrimary: false }] },
      { name: 'Cloud & DevOps', skills: [{ name: 'AWS', isPrimary: true }, { name: 'Docker', isPrimary: false }, { name: 'Kubernetes', isPrimary: false }] },
      { name: 'Databases', skills: [{ name: 'PostgreSQL', isPrimary: true }, { name: 'Redis', isPrimary: false }, { name: 'MongoDB', isPrimary: false }] },
      { name: 'Tools', skills: [{ name: 'Git', isPrimary: false }, { name: 'CI/CD', isPrimary: false }, { name: 'Linux', isPrimary: false }] },
    ],
  },
  projects: {
    heading: 'Featured Projects',
    subheading: 'Some of the projects I\'ve worked on',
    items: [
      {
        title: 'Sample Project',
        challenge: 'Add your projects via Sanity Studio at /studio',
        solution: 'Configure your Sanity project ID in .env.local',
        techStack: ['Ruby on Rails', 'PostgreSQL', 'AWS'],
        impacts: [{ icon: '📈', metric: '50%', description: 'Performance gain' }],
        order: 1,
      },
    ],
  },
  experience: {
    heading: 'Experience',
    subheading: 'My professional journey',
    entries: [
      {
        role: 'Backend Software Engineer',
        company: 'Your Company',
        startDate: '2020',
        isPresent: true,
        achievements: ['Add your experience via Sanity Studio', 'Configure .env.local with your Sanity project ID'],
        order: 1,
      },
    ],
  },
  achievements: {
    heading: 'Achievements',
    subheading: 'Milestones and accomplishments',
    items: [
      { icon: '🏆', metric: '10+', label: 'Projects Completed' },
      { icon: '⭐', metric: '5+', label: 'Years Experience' },
      { icon: '🎯', metric: '100%', label: 'Client Satisfaction' },
      { icon: '🔥', metric: '24/7', label: 'Dedication' },
    ],
  },
  testimonials: {
    heading: 'Testimonials',
    subheading: 'What people say',
    items: [],
  },
}

export default async function Home() {
  let content = demoContent

  if (isSanityConfigured && client) {
    try {
      const sanityContent = await client.fetch(allContentQuery)
      if (sanityContent) {
        content = {
          siteSettings: sanityContent.siteSettings || demoContent.siteSettings,
          hero: sanityContent.hero || demoContent.hero,
          about: sanityContent.about || demoContent.about,
          skills: sanityContent.skills || demoContent.skills,
          projects: sanityContent.projects || demoContent.projects,
          experience: sanityContent.experience || demoContent.experience,
          achievements: sanityContent.achievements || demoContent.achievements,
          testimonials: sanityContent.testimonials || demoContent.testimonials,
        }
      }
    } catch (error) {
      console.error('Failed to fetch from Sanity:', error)
    }
  }

  return (
    <>
      <Hero data={content.hero} settings={content.siteSettings} />
      <About data={content.about} settings={content.siteSettings} />
      <Skills data={content.skills} />
      <Projects data={content.projects} />
      <Experience data={content.experience} />
      <Achievements data={content.achievements} />
      {content.siteSettings?.showTestimonials && (
        <Testimonials data={content.testimonials} />
      )}
      <Resume settings={content.siteSettings} />
      <Contact settings={content.siteSettings} />
      <Footer settings={content.siteSettings} />
    </>
  )
}
