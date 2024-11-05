import { adjustDayIndex, isSameDay } from './dateUtils'

export default class Day {
  constructor(date) {
    this.date = date //Date object
    this.habits = [] // Array of Habit objects
    this.active = true
  }
  // Creates new object Array of days of current week
  static getWeekdays(week, habits) {
    const weekDays = this.getCurrentWeekSavedDays(week)
    const dayIndexes = weekDays.map(day => day.date.getDay())
    for (const day of week) {
      if (!dayIndexes.includes(day.getDay())) {
        const newDay = new Day(day)
        const dayIndex = adjustDayIndex(newDay.date)
        const habitsToAdd = habits.filter(habit =>
          habit.weekdays.includes(dayIndex),
        )
        if (habitsToAdd > 0) {
          habitsToAdd.forEach(habit => {
            newDay.habits.push(habit.clone())
          })
        }
        weekDays.push(newDay)
      }
    }
    weekDays.sort((a, b) => a.date - b.date)
    const today = new Date()
    const todayIndex = adjustDayIndex(today)
    for (const day of weekDays) {
      const dayIndex = adjustDayIndex(day.date)
      if (dayIndex > todayIndex) {
        day.active = false
      }
    }
    return weekDays
  }
  static saveWeekdays(weekDays) {
    const toSave = JSON.stringify(weekDays)
    localStorage.setItem('days', toSave)
  }
  static loadWeekdays() {
    const savedData = localStorage.getItem('days')
    if (!savedData) return []

    const parsedData = JSON.parse(savedData)
    return parsedData.map(dayData => {
      const dateObject = new Date(dayData.date)
      return Object.assign(new Day(dateObject), {
        ...dayData,
        date: dateObject,
      })
    })
  }
  static getCurrentWeekSavedDays(week) {
    const loadedWeekdays = this.loadWeekdays()
    const currentWeek = []
    if (!loadedWeekdays) {
      return []
    } else {
      for (const dayObject of loadedWeekdays) {
        for (const day of week) {
          if (isSameDay(day, dayObject.date)) {
            currentWeek.push(dayObject)
          }
        }
      }
      return currentWeek
    }
  }
}
