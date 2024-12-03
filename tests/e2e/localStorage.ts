import { Page } from '@playwright/test'

export async function getLocalStorageItem(item: string, page: Page) {
  return await page.evaluate(key => {
    const itemToCheck = localStorage.getItem(key)
    return itemToCheck ? JSON.parse(itemToCheck) : null
  }, item)
}

export async function setLocalStorageItem(key: string, value: any, page: Page) {
  const context = page.context()
  await context.addInitScript(
    ([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [key, value],
  )
}
