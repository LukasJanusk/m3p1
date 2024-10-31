import { adjustDayIndex } from './dateUtils'

export default class Day {
  constructor(date) {
    this.date = date //Date object
    this.habits = [] // Array of Habit objects
    this.active = true
  }
  // Creates new object Array of days of current week
  static getWeekdays(week, habits) {
    const weekDays = []
    const today = new Date()
    const todayIndex = adjustDayIndex(today)
    for (const day of week) {
      const dayIndex = adjustDayIndex(day)
      const dayObject = new Day(day)
      if (dayIndex > todayIndex) {
        dayObject.active = false
      }
      dayObject.habits = habits.filter(habit =>
        habit.weekdays.includes(dayIndex),
      )
      weekDays.push(dayObject)
    }
    return weekDays
  }
}
