export function getCurrentWeek(): Date[] {
  const today = new Date()
  const currentDayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  const week = []
  startOfWeek.setDate(
    today.getDate() - (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1),
  )
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setHours(0, 0, 0, 0)
    date.setDate(startOfWeek.getDate() + i)
    date.setHours(0, 0, 0, 0)
    week.push(date)
  }
  return week
}
export function getWeekDates(date: Date): Date[] {
  const currentDayOfWeek = date.getDay()
  const startOfWeek = new Date(date)
  const week = []
  startOfWeek.setDate(
    date.getDate() - (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1),
  )
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek)
    d.setHours(0, 0, 0, 0)
    d.setDate(startOfWeek.getDate() + i)
    d.setHours(0, 0, 0, 0)
    week.push(d)
  }
  return week
}
export function getCurrentDay(): number {
  const date = new Date()
  return date.getDate()
}

export function getCurrentWeekDay(): string {
  const date = new Date()
  const shortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return shortNames[date.getDay()]
}

export function getWeekDay(dateObject: Date): string {
  const shortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return shortNames[dateObject.getDay()]
}

export function getDate(dateObject: Date): string {
  return dateObject.toISOString().split('T')[0]
}

export function getCurrentDayIndex(): number {
  const currentDate = new Date()
  const dayIndex = currentDate.getDay()
  const adjustedIndex = (dayIndex + 6) % 7
  return adjustedIndex
}

export function getCurrentDayString(dateObject: Date): string {
  const longNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const month = dateObject.toLocaleString('default', { month: 'long' })
  const date = dateObject.getDate()
  const day = dateObject.getDay()
  return `${longNames[day]}, ${month} ${date}`
}

export function adjustDayIndex(date: Date): number {
  const dayIndex = date.getDay()
  return dayIndex === 0 ? 6 : dayIndex - 1
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function getCurrentMonthDates(): Date[] {
  const dates: Date[] = []
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    dates.push(date)
  }
  return dates
}

export function getMonthDates(year: number, month: number): Date[] {
  const dates = []
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    dates.push(date)
  }
  return dates
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function validateDate(date: string): boolean {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
  if (!dateRegex.test(date)) return false
  const [year, month, day] = date.split('-').map(Number)
  const parsedDate = new Date(year, month - 1, day)
  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  )
}
