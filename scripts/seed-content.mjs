import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seedContent() {
  console.log('🚀 Starting content seeding...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

  try {
    // Site Settings
    console.log('📝 Creating Site Settings...')
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: 'Sankaran Rajendran',
      siteDescription: 'Backend Software Engineer specializing in Ruby on Rails, Golang, and AWS Cloud Infrastructure',
      email: 'sankarandhina@gmail.com',
      phone: '9677797357',
      location: 'Coimbatore, Tamil Nadu, India',
      availability: 'Open to opportunities',
      githubUrl: 'https://github.com/Sankarangitoff',
      linkedinUrl: 'https://www.linkedin.com/in/sankaran-rajendran/',
      showTestimonials: false,
      showTechCredit: true,
    })

    // Hero Section
    console.log('📝 Creating Hero Section...')
    await client.createOrReplace({
      _id: 'hero',
      _type: 'hero',
      greeting: "Hi, I'm",
      name: 'Sankaran Rajendran',
      title: 'Backend Software Engineer',
      tagline: 'Building scalable distributed systems serving 10,000+ users. Specialized in Ruby on Rails, Golang, and AWS cloud infrastructure.',
      ctaButtons: [
        { _key: 'btn1', label: 'View Projects', link: '#projects', style: 'primary' },
        { _key: 'btn2', label: 'Contact Me', link: '#contact', style: 'secondary' },
        { _key: 'btn3', label: 'Download Resume', link: '#resume', style: 'ghost' },
      ],
    })

    // About Section
    console.log('📝 Creating About Section...')
    await client.createOrReplace({
      _id: 'about',
      _type: 'about',
      heading: 'About Me',
      story: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: "I'm a results-driven Backend Software Engineer with experience architecting and optimizing scalable distributed systems for production gaming platforms. I specialize in Ruby on Rails and Golang with expertise in REST API development, Redis caching, background job processing, and AWS cloud infrastructure.",
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: "I've reduced API response times by 40% through Redis caching implementation and improved system reliability by 30% via Sidekiq optimization. I'm proficient in microservices architecture, PostgreSQL database optimization, third-party integrations, and CI/CD deployment pipelines.",
            },
          ],
        },
      ],
      quickFacts: [
        { _key: 'fact1', icon: '💼', stat: '1+', label: 'Years Experience' },
        { _key: 'fact2', icon: '🚀', stat: '10K+', label: 'Users Served' },
        { _key: 'fact3', icon: '⚡', stat: '40%', label: 'Faster APIs' },
        { _key: 'fact4', icon: '🏆', stat: '99.5%', label: 'Uptime' },
      ],
      locationBadge: 'Coimbatore, Tamil Nadu, India',
    })

    // Skills Section
    console.log('📝 Creating Skills Section...')
    await client.createOrReplace({
      _id: 'skills',
      _type: 'skills',
      heading: 'Skills & Technologies',
      subheading: 'Technologies I work with to build scalable backend systems',
      categories: [
        {
          _key: 'cat1',
          name: 'Backend Technologies',
          skills: [
            { _key: 's1', name: 'Ruby on Rails', isPrimary: true },
            { _key: 's2', name: 'Golang', isPrimary: true },
            { _key: 's3', name: 'Python', isPrimary: false },
            { _key: 's4', name: 'Django', isPrimary: false },
            { _key: 's5', name: 'REST API Design', isPrimary: true },
            { _key: 's6', name: 'GraphQL', isPrimary: false },
            { _key: 's7', name: 'Microservices', isPrimary: true },
          ],
        },
        {
          _key: 'cat2',
          name: 'Cloud & DevOps',
          skills: [
            { _key: 's8', name: 'AWS', isPrimary: true },
            { _key: 's9', name: 'EC2', isPrimary: false },
            { _key: 's10', name: 'Elastic Beanstalk', isPrimary: false },
            { _key: 's11', name: 'Aurora PostgreSQL', isPrimary: false },
            { _key: 's12', name: 'S3', isPrimary: false },
            { _key: 's13', name: 'Docker', isPrimary: true },
            { _key: 's14', name: 'CI/CD Pipelines', isPrimary: true },
          ],
        },
        {
          _key: 'cat3',
          name: 'Databases & Caching',
          skills: [
            { _key: 's15', name: 'PostgreSQL', isPrimary: true },
            { _key: 's16', name: 'Redis', isPrimary: true },
            { _key: 's17', name: 'Query Optimization', isPrimary: false },
            { _key: 's18', name: 'Indexing Strategies', isPrimary: false },
            { _key: 's19', name: 'Data Migration', isPrimary: false },
          ],
        },
        {
          _key: 'cat4',
          name: 'Tools & Practices',
          skills: [
            { _key: 's20', name: 'Git & GitHub', isPrimary: true },
            { _key: 's21', name: 'Linux', isPrimary: false },
            { _key: 's22', name: 'Sidekiq', isPrimary: true },
            { _key: 's23', name: 'Agile/Scrum', isPrimary: false },
            { _key: 's24', name: 'AI-Augmented Dev', isPrimary: false },
          ],
        },
      ],
    })

    // Projects Section
    console.log('📝 Creating Projects Section...')
    await client.createOrReplace({
      _id: 'projects',
      _type: 'projects',
      heading: 'Featured Projects',
      subheading: 'Production systems I\'ve architected and deployed',
      items: [
        {
          _key: 'proj1',
          title: 'Bracketology - Fantasy Gaming Platform',
          challenge: 'Build an enterprise-grade backend for a fantasy gaming platform supporting 10,000+ daily active users with real-time scoring and secure transactions.',
          solution: 'Engineered scalable Ruby on Rails microservices with Redis caching, Sidekiq job queuing, and AWS auto-scaling infrastructure. Implemented dual-currency virtual economy with 99.9% transaction accuracy.',
          techStack: ['Ruby on Rails', 'Golang', 'Redis', 'Sidekiq', 'AWS', 'PostgreSQL'],
          impacts: [
            { _key: 'i1', icon: '👥', metric: '10K+', description: 'Daily Active Users' },
            { _key: 'i2', icon: '💰', metric: '500K+', description: 'Transactions Processed' },
            { _key: 'i3', icon: '⚡', metric: '99.5%', description: 'System Uptime' },
            { _key: 'i4', icon: '🛡️', metric: '85%', description: 'Fraud Reduction' },
          ],
          order: 1,
        },
        {
          _key: 'proj2',
          title: 'SPARKFINCH - Full-Stack Application',
          challenge: 'Enhance application stability and deploy new features rapidly using modern development practices.',
          solution: 'Resolved 30+ frontend and backend bugs improving stability by 45%. Deployed 8+ new features using Django and GenAI-augmented development workflows, reducing development time by 35%.',
          techStack: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'GenAI'],
          impacts: [
            { _key: 'i5', icon: '🐛', metric: '30+', description: 'Bugs Resolved' },
            { _key: 'i6', icon: '📈', metric: '45%', description: 'Stability Improvement' },
            { _key: 'i7', icon: '🚀', metric: '8+', description: 'Features Deployed' },
            { _key: 'i8', icon: '⏱️', metric: '35%', description: 'Faster Development' },
          ],
          order: 2,
        },
      ],
    })

    // Experience Section
    console.log('📝 Creating Experience Section...')
    await client.createOrReplace({
      _id: 'experience',
      _type: 'experience',
      heading: 'Professional Experience',
      subheading: 'My journey as a software engineer',
      entries: [
        {
          _key: 'exp1',
          role: 'Software Engineer',
          company: 'Techjays',
          startDate: 'November 2024',
          isPresent: true,
          achievements: [
            'Architected scalable backend systems for fantasy gaming platform serving 10,000+ concurrent users with 99.5% uptime',
            'Optimized API response times by 40% through Redis caching and database query optimization',
            'Improved system reliability by 30% via Sidekiq background job processing handling 100,000+ jobs daily',
            'Integrated SOAP-based payment gateway and SEON fraud detection APIs reducing fraudulent transactions by 85%',
            'Engineered AWS cloud infrastructure supporting 3x traffic growth with zero downtime',
            'Led codebase migration from Ruby on Rails to Golang, improving API performance by 25%',
          ],
          order: 1,
        },
        {
          _key: 'exp2',
          role: 'Ruby on Rails Intern',
          company: 'Techjays',
          startDate: 'July 2024',
          endDate: 'October 2024',
          isPresent: false,
          achievements: [
            'Developed 20+ RESTful API endpoints improving data retrieval efficiency by 35%',
            'Resolved 45+ production bugs reducing application error rate by 60%',
            'Contributed to 10+ production releases with Git and CI/CD workflows',
          ],
          order: 2,
        },
        {
          _key: 'exp3',
          role: 'Data Science Intern',
          company: 'Brainovision Solutions',
          startDate: 'July 2023',
          endDate: 'September 2023',
          isPresent: false,
          achievements: [
            'Performed data preprocessing and EDA on datasets with 100,000+ records using Python',
            'Improved data quality by 40% through automated cleaning pipelines',
          ],
          order: 3,
        },
        {
          _key: 'exp4',
          role: 'Software Engineer Intern',
          company: 'Accent Techno Soft',
          startDate: 'February 2023',
          endDate: 'June 2023',
          isPresent: false,
          achievements: [
            'Contributed to backend development and resolved 25+ technical issues',
            'Strengthened understanding of SDLC and debugging methodologies',
          ],
          order: 4,
        },
      ],
    })

    // Achievements Section
    console.log('📝 Creating Achievements Section...')
    await client.createOrReplace({
      _id: 'achievements',
      _type: 'achievements',
      heading: 'Achievements & Recognition',
      subheading: 'Awards, metrics, and milestones',
      items: [
        { _key: 'ach1', icon: '🏆', metric: 'High Flyer 2025', label: 'Best Team Player Award - Techjays' },
        { _key: 'ach2', icon: '👥', metric: '10,000+', label: 'Users Served' },
        { _key: 'ach3', icon: '⚡', metric: '40%', label: 'API Performance Boost' },
        { _key: 'ach4', icon: '🛡️', metric: '85%', label: 'Fraud Reduction' },
        { _key: 'ach5', icon: '📊', metric: '100K+', label: 'Daily Jobs Processed' },
        { _key: 'ach6', icon: '🎓', metric: '8.8 CGPA', label: 'Master of IT' },
        { _key: 'ach7', icon: '💼', metric: '95%', label: 'On-Time Delivery' },
        { _key: 'ach8', icon: '🎤', metric: 'Secretary', label: 'IT Department - SRCAS' },
      ],
    })

    // Testimonials Section (empty for now)
    console.log('📝 Creating Testimonials Section...')
    await client.createOrReplace({
      _id: 'testimonials',
      _type: 'testimonials',
      heading: 'Testimonials',
      subheading: 'What colleagues say about working with me',
      items: [],
    })

    console.log('✅ All content seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding content:', error)
    process.exit(1)
  }
}

seedContent()
