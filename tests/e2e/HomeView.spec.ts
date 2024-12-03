import { test, expect, Page, BrowserContext } from '@playwright/test'
import habits from './fixtures/habitsFix'
import { setLocalStorageItem, getLocalStorageItem } from './localStorage'
import { toDisplayString } from 'vue'

const fixedDate = '2024-12-02T00:00:00Z'

async function setDate(page: Page, fixedDate: string) {
  await page.context().addInitScript(fixedDate => {
    const OriginalDate = Date
    global.Date = class extends OriginalDate {
      constructor() {
        super(fixedDate)
      }
      static now() {
        return new OriginalDate(fixedDate).getTime()
      }
    } as DateConstructor
  }, fixedDate)
}

test('Toggles habit done/undone', async ({ page }) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/')
  await page.getByLabel('Budgeting').click()
  let daysLocal = await getLocalStorageItem('days', page)
  let toggledDay = daysLocal.find((day: any) => {
    return day.date === today.toISOString()
  })
  let toggledHabits = toggledDay.habits.filter((habit: any) => {
    return habit.active === true && habit.id === 2
  })
  expect(toggledHabits.length).toBe(1)
  await page.getByLabel('Budgeting').click()
  daysLocal = await getLocalStorageItem('days', page)
  toggledDay = daysLocal.find((day: any) => {
    return day.date === today.toISOString()
  })
  toggledHabits = toggledDay.habits.filter((habit: any) => {
    return habit.active === true && habit.id === 2
  })
  expect(toggledHabits.length).toBe(0)
})

test('Prevents toggle in the future', async ({ page }) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/day/2030-12-05')
  await page
    .locator('div')
    .filter({ hasText: /^Morning Run$/ })
    .click()
  await expect(
    page.getByText('Cannot toggle habits in the future!'),
  ).toBeVisible()
})

test('Navigates between weekdays', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Mon' }).click()
  await expect(page.getByText(/^Monday/)).toBeVisible()
  await page.getByRole('button', { name: 'Tue' }).click()
  await expect(page.getByText(/^Tuesday/)).toBeVisible()
  await page.getByRole('button', { name: 'Wed' }).click()
  await expect(page.getByText(/^Wednesday/)).toBeVisible()
  await page.getByRole('button', { name: 'Thu' }).click()
  await expect(page.getByText(/^Thursday/)).toBeVisible()
  await page.getByRole('button', { name: 'Fri' }).click()
  await expect(page.getByText(/^Friday/)).toBeVisible()
  await page.getByRole('button', { name: 'Sat' }).click()
  await expect(page.getByText(/^Saturday/)).toBeVisible()
  await page.getByRole('button', { name: 'Sun' }).click()
  await expect(page.getByText(/^Sunday/)).toBeVisible()
})

test('Removes stopped habit from future days, but not the past days or current day', async ({
  page,
}) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/habits')
  await page
    .getByTitle('Track daily expenses and')
    .locator('#stop-button')
    .click()
  await page.goto('/day/2012-12-01')
  await expect(page.getByText('Budgeting')).toBeVisible()
  // await page.goto('/day/2030-12-01')
})
