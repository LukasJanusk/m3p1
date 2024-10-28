import { adjustDayIndex } from './dateUtils'

export default class Day {
  constructor(date) {
    this.date = date //Date object
    this.habits = [] // Array of Habit objects
    this.active = false
  }
  // Creates new object Array of days of current week
  getWeekdays(week, habits) {
    const weekDays = []
    const today = new Date()
    const todayIndex = adjustDayIndex(today)
    for (const d of week) {
      const day = new Day(d)
      const dayIndex = adjustDayIndex(day)
      if (dayIndex > todayIndex) {
        day.active = false
      }
      day.habits = habits.filter(habit => habit.weekdays.includes(dayIndex))
      weekDays.push(day)
    }
    return weekDays
  }
}
