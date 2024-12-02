import { test, expect } from '@playwright/test'

test('Adds habit', async ({ page }) => {
  await page.goto('/habits')
  await page.getByRole('img', { name: 'Plus sign' }).click()
  await page.getByRole('combobox').selectOption('Fitness')
  await page.getByLabel('name').click()
  await page.getByLabel('name').fill('Test')
  await page.getByLabel('description').click()
  await page.getByLabel('description').fill('Test description')
  await page.getByLabel('Monday').click()
  await page.getByRole('button', { name: 'Add Habit' }).click()
  await expect(page.getByText('Habit added successfuly!')).toBeVisible()
  await page.getByRole('img', { name: 'Back arrow' }).click()
  await expect(page.getByText('testMonTueWedThuFriSatSun')).toBeVisible()
  const habitInLocalStorage = await page.evaluate(() => {
    const habits = localStorage.getItem('habits')
    return habits ? JSON.parse(habits) : []
  })
  expect(habitInLocalStorage.length).toBe(1)
})
