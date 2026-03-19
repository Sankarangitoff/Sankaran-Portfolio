import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()
  })

  test('should display contact form', async ({ page }) => {
    const form = page.locator('#contact form')
    await expect(form).toBeVisible()
  })

  test('should have required form fields', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /send/i })).toBeVisible()
  })

  test('should validate empty form submission', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /send/i })
    await submitButton.click()

    // Check for HTML5 validation
    const nameInput = page.getByLabel(/name/i)
    await expect(nameInput).toHaveAttribute('required')
  })

  test('should allow form input', async ({ page }) => {
    const nameInput = page.getByLabel(/name/i)
    const emailInput = page.getByLabel(/email/i)
    const messageInput = page.getByLabel(/message/i)

    await nameInput.fill('John Doe')
    await emailInput.fill('john@example.com')
    await messageInput.fill('This is a test message.')

    await expect(nameInput).toHaveValue('John Doe')
    await expect(emailInput).toHaveValue('john@example.com')
    await expect(messageInput).toHaveValue('This is a test message.')
  })

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByLabel(/email/i)
    await expect(emailInput).toHaveAttribute('type', 'email')
  })

  test('should display contact information cards', async ({ page }) => {
    // Check for email card
    const emailLink = page.locator('#contact a[href^="mailto:"]')
    await expect(emailLink).toBeVisible()

    // Check for location info
    await expect(page.getByText(/location/i)).toBeVisible()
  })
})
