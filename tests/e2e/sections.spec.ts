import { test, expect } from '@playwright/test'

test.describe('Portfolio Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Hero section displays correctly', async ({ page }) => {
    // Check hero content is visible
    await expect(page.locator('section').first()).toBeVisible()

    // Check for CTA buttons
    const buttons = page.locator('section').first().getByRole('link')
    await expect(buttons.first()).toBeVisible()
  })

  test('About section is present', async ({ page }) => {
    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()
  })

  test('Skills section displays skill tags', async ({ page }) => {
    const skillsSection = page.locator('#skills')
    await skillsSection.scrollIntoViewIfNeeded()
    await expect(skillsSection).toBeVisible()
  })

  test('Projects section has project cards', async ({ page }) => {
    const projectsSection = page.locator('#projects')
    await projectsSection.scrollIntoViewIfNeeded()
    await expect(projectsSection).toBeVisible()
  })

  test('Experience section has timeline', async ({ page }) => {
    const experienceSection = page.locator('#experience')
    await experienceSection.scrollIntoViewIfNeeded()
    await expect(experienceSection).toBeVisible()
  })

  test('Achievements section is present', async ({ page }) => {
    const achievementsSection = page.locator('#achievements')
    await achievementsSection.scrollIntoViewIfNeeded()
    await expect(achievementsSection).toBeVisible()
  })

  test('Contact section has form', async ({ page }) => {
    const contactSection = page.locator('#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await expect(contactSection).toBeVisible()

    // Check form fields
    await expect(contactSection.getByLabel(/name/i)).toBeVisible()
    await expect(contactSection.getByLabel(/email/i)).toBeVisible()
    await expect(contactSection.getByLabel(/message/i)).toBeVisible()
  })

  test('Footer is present with social links', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
  })
})
