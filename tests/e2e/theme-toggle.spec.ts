import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have theme toggle button', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await expect(themeToggle).toBeVisible()
  })

  test('should start in dark mode by default', async ({ page }) => {
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })

  test('should toggle to light mode on click', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await themeToggle.click()

    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)
  })

  test('should toggle back to dark mode', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })

    // Toggle to light
    await themeToggle.click()
    await expect(page.locator('html')).toHaveClass(/light/)

    // Toggle back to dark
    await themeToggle.click()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('should persist theme preference', async ({ page, context }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await themeToggle.click()

    // Reload page
    await page.reload()

    // Check theme persisted
    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)
  })
})
