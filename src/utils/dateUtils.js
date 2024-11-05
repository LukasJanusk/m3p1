export function getCurrentWeek() {
  const today = new Date()
  const currentDayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  const week = []
  startOfWeek.setDate(
    today.getDate() - (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1),
  )
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    week.push(date)
  }
  return week
}

export function getCurrentDay() {
  const date = new Date()
  return date.getDate()
}
export function getCurrentWeekDay() {
  const date = new Date()
  const shortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return shortNames[date.getDay()]
}
export function getWeekDay(dateObject) {
  const shortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return shortNames[dateObject.getDay()]
}
export function getDate(dateObject) {
  return dateObject.toISOString().split('T')[0]
}
export function getCurrentDayIndex() {
  const currentDate = new Date()
  const dayIndex = currentDate.getDay()
  const adjustedIndex = (dayIndex + 6) % 7
  return adjustedIndex
}
export function getCurrentDayString(dateObject) {
  const longNames = [
    'Sunday',
    'Monday',
    'Tueday',
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
export function adjustDayIndex(date) {
  const dayIndex = date.getDay()
  return dayIndex === 0 ? 6 : dayIndex - 1
}
export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}
export function getCurrentMonthDates() {
  const dates = []
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day))
  }
  return dates
}
