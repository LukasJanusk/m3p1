import { test, expect, Page, BrowserContext } from '@playwright/test'
import habits from './fixtures/habitsFix'

test.skip('Calendar is displayed in calendar view', async ({ page }) => {
  page.goto('/calendar')
})

test.skip('Navigates between calendar and Day components', async ({ page }) => {
  page.goto('/calendar')
})

test.skip('Changes made in calendar view persist in home view', async ({
  page,
}) => {
  page.goto('/calendar')
})
