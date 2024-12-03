import { test, expect } from '@playwright/test'
import habits from './fixtures/habitsFix'
import { getLocalStorageItem, setLocalStorageItem } from './localStorage'

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
  await expect(page.getByText('Habit added successfully!')).toBeVisible()
  await page.getByRole('img', { name: 'Back arrow' }).click()
  await expect(page.getByText('testMonTueWedThuFriSatSun')).toBeVisible()
  const habitInLocalStorage = await getLocalStorageItem('habits', page)
  expect(habitInLocalStorage.length).toBe(1)
})

test('Prevents to add incomplete habit', async ({ page }) => {
  await page.goto('/habits')
  await page.getByRole('img', { name: 'Plus sign' }).click()
  await page.getByRole('combobox').selectOption('Spiritual')
  await page.getByRole('button', { name: 'Add Habit' }).click()
  await expect(page.getByText('Please fill all required fields!')).toBeVisible()
})

test('Adds and removes habit category', async ({ page }) => {
  await page.goto('/habits')
  await page.getByRole('img', { name: 'Plus sign' }).click()
  await page.getByRole('img', { name: 'Plus sign' }).click()
  await page.getByLabel('Name*', { exact: true }).click()
  await page.getByLabel('Name*', { exact: true }).fill('Test category')
  await page.getByLabel('Description').click()
  await page.getByLabel('Description').fill('Test description')
  await page.getByRole('button', { name: 'Add Category' }).click()
  await expect(page.getByText('Category added successfully!')).toBeVisible()
  const categoryName = await page.getByRole('combobox').textContent()
  expect(categoryName).toContain('Test category')
  let categoriesInLocalStorage = await getLocalStorageItem('categories', page)
  expect(categoriesInLocalStorage.length).toBe(8)
  await page.getByRole('img', { name: 'Trashcan' }).click()
  await expect(page.getByText('Category removed successfully!')).toBeVisible()
  categoriesInLocalStorage = await getLocalStorageItem('categories', page)
  expect(categoriesInLocalStorage.length).toBe(7)
})

test('Navigates between habit categories', async ({ page }) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/habits')
  await page.getByRole('combobox').selectOption('Spiritual')
  await expect(page.getByText('MeditationMonTueWedThuFriSatSun')).toBeVisible()
  await page.getByRole('combobox').selectOption('Lifestyle')
  await expect(page.getByText('Meal PrepMonTueWedThuFriSatSun')).toBeVisible()
  await page.getByRole('combobox').selectOption('Financial')
  await expect(page.getByText('BudgetingMonTueWedThuFriSatSun')).toBeVisible()
  await expect(
    page.getByText('Saving GoalsMonTueWedThuFriSatSun'),
  ).toBeVisible()
  await page.getByRole('combobox').selectOption('Social')
  await expect(page.getByText('NetworkingMonTueWedThuFriSatSun')).toBeVisible()
  await page.getByRole('combobox').selectOption('Productivity')
  await expect(
    page.getByText('Work PlanningMonTueWedThuFriSatSun'),
  ).toBeVisible()
  await expect(
    page.getByText('Public SpeakingMonTueWedThuFriSatSun'),
  ).toBeVisible()
  await page.getByRole('combobox').selectOption('Fitness')
  await expect(page.getByText('Morning RunMonTueWedThuFriSatSun')).toBeVisible()
  await expect(page.getByText('CyclingMonTueWedThuFriSatSun')).toBeVisible()
  await expect(page.getByText('YogaMonTueWedThuFriSatSun')).toBeVisible()
})

test('Edits habit', async ({ page }) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/habits')
  await page.getByTitle('Run 5km every morning').locator('#edit-button').click()
  await expect(page.getByRole('heading', { name: 'Edit Habit' })).toBeVisible()
  await page.getByLabel('Description').click()
  await page.getByLabel('Description').fill('Run 10km in the morning.')
  await page.getByRole('button', { name: 'Save Habit' }).click()
  await expect(page.getByText('Habit updated successfully!')).toBeVisible()
  const habitsEdited = await getLocalStorageItem('habits', page)
  const description = habitsEdited.find(
    (habit: any) => habit.id === 1,
  ).description
  expect(description).toBe('Run 10km in the morning.')
})

test('Prevents to submit incomplete edited habit', async ({ page }) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/habits')
  await page
    .getByTitle('Meditate for 20 minutes daily')
    .locator('#edit-button')
    .click()
  await page.getByLabel('Name*').click()
  await page.getByLabel('Name*').fill('')
  await page.getByRole('button', { name: 'Save Habit' }).click()
  await expect(page.getByText('Please fill all required fields!')).toBeVisible()
  await page.getByLabel('Name*').click()
  await page.getByLabel('Name*').fill('Meditate')
  await page.getByLabel('Monday').uncheck()
  await page.getByLabel('Wednesday').uncheck()
  await page.getByLabel('Friday').uncheck()
  await page.getByLabel('Sunday').uncheck()
  await page.getByRole('button', { name: 'Save Habit' }).click()
  await expect(page.getByText('Please fill all required fields!')).toBeVisible()
})

test('Deletes habit', async ({ page }) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/habits')
  await page
    .getByTitle('Run 5km every morning')
    .locator('#delete-button')
    .click()
  await expect(page.getByText('Habit removed successfully!')).toBeVisible()
  const habitsLocal = await getLocalStorageItem('habits', page)
  const deletedHabitFound = habitsLocal.some((habit: any) => habit.id === 1)
  expect(habitsLocal.length).toBe(9)
  expect(deletedHabitFound).toBe(false)
})

test('Toggles habit stop', async ({ page }) => {
  await setLocalStorageItem('habits', habits, page)
  await page.goto('/habits')
  await page.getByTitle('Run 5km every morning').locator('#stop-button').click()
  await expect(page.getByText('Habit stopped successfully!')).toBeVisible()
  let habitsLocal = await getLocalStorageItem('habits', page)
  let stoppedHabit = habitsLocal.find((habit: any) => {
    return habit.id === 1
  })
  expect(stoppedHabit.stopped).toBe(true)
  await expect(
    page.getByText('Morning Run-stoppedMonTueWedThuFriSatSun'),
  ).toBeVisible()
  await page.getByRole('img', { name: 'Hand sign stop filled' }).click()
  await expect(page.getByText('Habit activated successfully!')).toBeVisible()
  await expect(page.getByText('Morning RunMonTueWedThuFriSatSun')).toBeVisible()
  habitsLocal = await getLocalStorageItem('habits', page)
  stoppedHabit = habitsLocal.find((habit: any) => {
    return habit.id === 1
  })
  expect(stoppedHabit.stopped).toBe(false)
})
