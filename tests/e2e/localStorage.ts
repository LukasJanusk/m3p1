import { Page } from '@playwright/test'
import Habit from '../../src/utils/habits'
import Day from '../../src/utils/day'

export async function getLocalStorageItem(item: string, page: Page) {
  return await page.evaluate(key => {
    const itemToCheck = localStorage.getItem(key)
    return itemToCheck ? JSON.parse(itemToCheck) : null
  }, item)
}

export async function setLocalStorageItem(
  key: string,
  value: Day[] | Habit[],
  page: Page,
) {
  const context = page.context()
  const valueString = JSON.stringify(value)
  await context.addInitScript(
    ([key, valueString]) => {
      localStorage.setItem(key, valueString)
    },
    [key, valueString],
  )
}
