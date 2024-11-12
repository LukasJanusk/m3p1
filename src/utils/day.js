import { adjustDayIndex, isSameDay, getMonthDates } from './dateUtils'

export default class Day {
  constructor(date) {
    this.date = date //Date object
    this.habits = [] // Array of Habit objects
    this.active = true
  }
  // Creates new object Array of days of current week
  static getWeekdays(week, allHabits) {
    const habits = allHabits.filter(habit => habit.stopped === false)
    const weekDays = this.getCurrentWeekSavedDays(week)
    const dayIndexes = weekDays.map(day => day.date.getDay())
    for (const day of week) {
      if (!dayIndexes.includes(day.getDay())) {
        const newDay = new Day(day)
        const dayIndex = adjustDayIndex(newDay.date)
        const habitsToAdd = habits.filter(habit =>
          habit.weekdays.includes(dayIndex),
        )
        if (habitsToAdd.length > 0) {
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
      } else {
        day.active = true
      }
    }
    return weekDays
  }
  // Generates day objects for a month from local storage filling empty days with new objects
  static getMonthDays(year, month, allHabits) {
    const habits = allHabits.filter(habit => habit.stopped === false)
    const days = this.loadWeekdays()
    const currentMonthDays = []
    if (days.length > 0) {
      currentMonthDays.push(
        ...days.filter(
          day =>
            day.date.getMonth() === month && day.date.getFullYear() === year,
        ),
      )
    }
    const currentMonthDates = getMonthDates(year, month)
    const datesToAdd = currentMonthDates.filter(date => {
      return !currentMonthDays.some(
        day => day.date.toISOString() === date.toISOString(),
      )
    })
    console.log('datesToAdd:', datesToAdd)
    for (const date of datesToAdd) {
      const newDay = new Day(date)
      const dayIndex = adjustDayIndex(newDay.date)
      const habitsToAdd = habits.filter(habit =>
        habit.weekdays.includes(dayIndex),
      )
      if (habitsToAdd.length > 0) {
        habitsToAdd.forEach(habit => {
          newDay.habits.push(habit.clone())
        })
      }
      currentMonthDays.push(newDay)
    }
    console.log('currentMonthDates:', currentMonthDates)
    console.log('currentMonthDays:', currentMonthDays)

    const today = new Date()
    currentMonthDays.forEach(day => {
      if (day.date > today) {
        day.active = false
      }
    })
    return currentMonthDays.sort((a, b) => a.date - b.date)
  }
  static saveWeekdays(weekDays) {
    const savedDays = this.loadWeekdays() || []
    for (const d of weekDays) {
      const existingDay = savedDays.find(
        day => day.date.toISOString() === d.date.toISOString(),
      )
      if (existingDay) {
        existingDay.habits = d.habits
        existingDay.active = d.active
      } else {
        savedDays.push(d)
      }
    }
    localStorage.setItem('days', JSON.stringify(savedDays))
  }
  // Returns Day objects from local storage
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
