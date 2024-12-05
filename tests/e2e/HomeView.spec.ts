import { test, expect } from '@playwright/test'
import habits from './fixtures/habitsFix'
import { setLocalStorageItem, getLocalStorageItem } from './localStorage'
import Habit from '../../src/utils/habits'

test('Toggles habit done/undone', async ({ page }) => {
  interface DayData {
    date: string
    active?: boolean
    habits?: Habit[]
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/')
  await page.getByLabel('Budgeting').click()
  let daysLocal = await getLocalStorageItem('days', page)
  let toggledDay = daysLocal.find((day: DayData) => {
    return day.date === today.toISOString()
  })
  let toggledHabits = toggledDay.habits.filter((habit: Habit) => {
    return habit.active === true && habit.id === 2
  })
  expect(toggledHabits.length).toBe(1)
  await page.getByLabel('Budgeting').click()
  daysLocal = await getLocalStorageItem('days', page)
  toggledDay = daysLocal.find((day: DayData) => {
    return day.date === today.toISOString()
  })
  toggledHabits = toggledDay.habits.filter((habit: Habit) => {
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

test('Removes stopped habit from current day, when habit stop is toggled', async ({
  page,
}) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/')
  await expect(page.getByText('Budgeting')).toBeVisible()
  await page.getByRole('link', { name: 'Habits' }).click()
  await page
    .getByTitle('Track daily expenses and')
    .locator('#stop-button')
    .click()
  await expect(page.getByText('Habit stopped successfully!')).toBeVisible()
  await expect(
    page.getByText('Budgeting-stoppedMonTueWedThuFriSatSun'),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Home' }).click()
  await expect(page.getByText('Budgeting')).not.toBeVisible()
})
