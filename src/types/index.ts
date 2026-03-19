export interface SiteSettings {
  siteName: string
  siteDescription: string
  profileImage?: SanityImage
  resumePDF?: SanityFile
  email: string
  phone?: string
  location: string
  availability: string
  githubUrl?: string
  linkedinUrl?: string
  showTestimonials: boolean
  showTechCredit: boolean
}

export interface Hero {
  greeting: string
  name: string
  title: string
  tagline: string
  ctaButtons: CTAButton[]
}

export interface CTAButton {
  label: string
  link: string
  style: 'primary' | 'secondary' | 'ghost'
}

export interface About {
  heading: string
  story: PortableTextBlock[]
  quickFacts: QuickFact[]
  locationBadge: string
}

export interface QuickFact {
  icon: string
  stat: string
  label: string
}

export interface Skills {
  heading: string
  subheading: string
  categories: SkillCategory[]
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Skill {
  name: string
  isPrimary: boolean
}

export interface Projects {
  heading: string
  subheading: string
  items: Project[]
}

export interface Project {
  title: string
  image?: SanityImage
  challenge: string
  solution: string
  techStack: string[]
  impacts: Impact[]
  githubUrl?: string
  liveUrl?: string
  order: number
}

export interface Impact {
  icon: string
  metric: string
  description: string
}

export interface Experience {
  heading: string
  subheading?: string
  entries: ExperienceEntry[]
}

export interface ExperienceEntry {
  role: string
  company: string
  companyLogo?: SanityImage
  startDate: string
  endDate?: string
  isPresent: boolean
  achievements: string[]
  order: number
}

export interface Achievements {
  heading: string
  subheading: string
  items: Achievement[]
}

export interface Achievement {
  icon: string
  metric: string
  label: string
  description: string
  size: 'small' | 'medium' | 'large'
}

export interface Testimonials {
  heading: string
  subheading: string
  items: Testimonial[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar?: SanityImage
}

// Sanity types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  children: { text: string }[]
  style?: string
}
