import { test, expect, Page, BrowserContext } from '@playwright/test'
import { setLocalStorageItem, getLocalStorageItem } from './localStorage'
import habits from './fixtures/habitsFix'

test('Calendar is displayed in calendar view', async ({ page }) => {
  await page.goto('/calendar')
  await expect(page.getByRole('heading', { name: 'Calendar' })).toBeVisible()
  await expect(page.getByText('MonTueWedThuFriSatSun')).toBeVisible()
})

test('Navigates between CalendarBody and DayHabitList components', async ({
  page,
}) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/calendar')
  await expect(page.getByRole('heading', { name: 'Calendar' })).toBeVisible()
  await expect(page.getByText('MonTueWedThuFriSatSun')).toBeVisible()
  await page.locator('div').filter({ hasText: /^1$/ }).nth(1).click()
  await expect(page.getByText('Budgeting')).toBeVisible()
  await page.getByRole('img', { name: 'Back arrow' }).click()
  await expect(page.getByRole('heading', { name: 'Calendar' })).toBeVisible()
  await expect(page.getByText('MonTueWedThuFriSatSun')).toBeVisible()
})
