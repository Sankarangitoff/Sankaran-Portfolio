import { getAllContent } from '@/lib/content'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Achievements from '@/components/sections/Achievements'
import Testimonials from '@/components/sections/Testimonials'
import Resume from '@/components/sections/Resume'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import dynamic from 'next/dynamic'

const GameCanvas3D = dynamic(() => import('@/components/game-world/GameCanvas'), { ssr: false })

export const revalidate = 0

export default async function Home() {
  const content = getAllContent()

  return (
    <>
      <Hero data={content.hero} settings={content.siteSettings} />
      <About data={content.about} settings={content.siteSettings} />
      <section id="skills">
        <GameCanvas3D
          skills={content.skills}
          projects={content.projects}
          experience={content.experience}
        />
      </section>
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
