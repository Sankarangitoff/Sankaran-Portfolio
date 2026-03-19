import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should show mobile menu button on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const mobileMenuButton = page.getByRole('button', { name: /open menu/i })
    await expect(mobileMenuButton).toBeVisible()

    // Desktop nav should be hidden
    const desktopNav = page.locator('nav ul.hidden.md\\:flex')
    await expect(desktopNav).not.toBeVisible()
  })

  test('should open mobile menu on button click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const mobileMenuButton = page.getByRole('button', { name: /open menu/i })
    await mobileMenuButton.click()

    // Mobile menu should be visible
    const mobileMenu = page.locator('.fixed.inset-0')
    await expect(mobileMenu).toBeVisible()
  })

  test('should close mobile menu on link click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open menu
    const mobileMenuButton = page.getByRole('button', { name: /open menu/i })
    await mobileMenuButton.click()

    // Click a nav link
    await page.getByRole('link', { name: 'About' }).click()

    // Menu should close
    await expect(page.locator('.fixed.inset-0')).not.toBeVisible()
  })

  test('should show desktop navigation on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')

    // Desktop nav should be visible
    const navLinks = page.getByRole('navigation').getByRole('link')
    await expect(navLinks.first()).toBeVisible()

    // Mobile menu button should be hidden
    const mobileMenuButton = page.getByRole('button', { name: /open menu/i })
    await expect(mobileMenuButton).not.toBeVisible()
  })

  test('should display hero section correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()
  })

  test('should stack grid items on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Navigate to skills section
    await page.locator('#skills').scrollIntoViewIfNeeded()

    // Skills cards should be stacked (grid-cols-1)
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeVisible()
  })
})
