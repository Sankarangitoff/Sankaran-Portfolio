import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the navigation bar', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByText('SANKARAN')).toBeVisible()
  })

  test('should have all navigation links', async ({ page }) => {
    const links = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact']

    for (const link of links) {
      await expect(page.getByRole('link', { name: link })).toBeVisible()
    }
  })

  test('should navigate to sections on click', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/#about/)

    await page.getByRole('link', { name: 'Skills' }).click()
    await expect(page).toHaveURL(/#skills/)
  })

  test('should highlight active section on scroll', async ({ page }) => {
    // Scroll to About section
    await page.locator('#about').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const aboutLink = page.getByRole('link', { name: 'About' })
    await expect(aboutLink).toHaveClass(/text-accent/)
  })

  test('should show sticky navigation on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 200))
    await page.waitForTimeout(300)

    const header = page.locator('header')
    await expect(header).toHaveClass(/glass/)
  })
})
