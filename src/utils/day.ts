import { adjustDayIndex, isSameDay, getMonthDates } from './dateUtils'
import Habit from './habits'

export default class Day {
  date: Date
  habits: Habit[]
  active: boolean
  constructor(date: Date) {
    this.date = date
    this.habits = []
    this.active = true
  }

  static getWeekdays(week: Date[], allHabits: Habit[]): Day[] {
    const habits = allHabits
    const weekDays = this.getCurrentWeekSavedDays(week)
    const dayIndexes = weekDays.map(day => day.date.getDay())
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    for (const day of week) {
      if (!dayIndexes.includes(day.getDay())) {
        const newDay = new Day(day)
        weekDays.push(newDay)
      }
    }
    weekDays.sort((a, b) => a.date.getTime() - b.date.getTime())

    for (const day of weekDays) {
      const dayIndex = adjustDayIndex(day.date)
      if (isSameDay(day.date, today)) {
        day.active = true
        const habitsToAdd = habits.filter(
          habit => habit.weekdays.includes(dayIndex) && !habit.stopped,
        )
        if (habitsToAdd.length > 0) {
          habitsToAdd.forEach(habit => {
            if (!day.habits.some(h => h.id === habit.id)) {
              day.habits.push(habit.clone())
            }
          })
        }
        day.active = true
      } else if (day.date > today) {
        day.active = false
        const habitsToAdd = habits.filter(
          habit => habit.weekdays.includes(dayIndex) && !habit.stopped,
        )
        if (habitsToAdd.length > 0) {
          habitsToAdd.forEach(habit => {
            if (!day.habits.some(h => h.id === habit.id))
              day.habits.push(habit.clone())
          })
        }
      } else {
        day.active = true
        const habitsToAdd = habits.filter(
          habit => habit.weekdays.includes(dayIndex) && !habit.stopped,
        )
        if (habitsToAdd.length > 0) {
          habitsToAdd.forEach(habit => {
            if (!day.habits.some(h => h.id === habit.id)) {
              day.habits.push(habit.clone())
            }
          })
        }
      }
    }
    return weekDays
  }

  static getMonthDays(year: number, month: number, allHabits: Habit[]): Day[] {
    const habits = allHabits.filter(habit => habit.stopped === false)
    const days = this.loadWeekdays()
    const currentMonthDays: Day[] = []
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
    for (const date of datesToAdd) {
      const newDay = new Day(date)
      currentMonthDays.push(newDay)
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    currentMonthDays.forEach(day => {
      const dayIndex = adjustDayIndex(day.date)
      if (isSameDay(day.date, today)) {
        day.active = true
        const habitsToAdd = habits.filter(
          habit => habit.weekdays.includes(dayIndex) && !habit.stopped,
        )
        if (habitsToAdd.length > 0) {
          habitsToAdd.forEach(habit => {
            if (!day.habits.some(h => h.id === habit.id)) {
              day.habits.push(habit.clone())
            }
          })
        }
        day.active = true
      } else if (day.date > today) {
        day.active = false
        const habitsToAdd = habits.filter(
          habit => habit.weekdays.includes(dayIndex) && !habit.stopped,
        )
        if (habitsToAdd.length > 0) {
          habitsToAdd.forEach(habit => {
            if (!day.habits.some(h => h.id === habit.id))
              day.habits.push(habit.clone())
          })
        }
      } else if (day.date < today) {
        day.active = true
        const habitsToAdd = habits.filter(
          habit => habit.weekdays.includes(dayIndex) && !habit.stopped,
        )
        if (habitsToAdd.length > 0) {
          habitsToAdd.forEach(habit => {
            if (!day.habits.some(h => h.id === habit.id)) {
              day.habits.push(habit.clone())
            }
          })
        }
      }
    })
    return currentMonthDays.sort((a: any, b: any) => a.date - b.date)
  }

  static saveWeekdays(weekDays: Day[]): void {
    try {
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
    } catch (error: any) {
      console.error(`Could not save Days to localStorage: ${error.message}`)
    }
  }

  static loadWeekdays(): Day[] {
    try {
      const savedData = localStorage.getItem('days')
      if (!savedData) return []
      interface DayData {
        date: string
        active?: boolean
        habits?: Habit[]
      }
      const parsedData: DayData[] = JSON.parse(savedData)

      return parsedData.map(dayData => {
        const dateObject = new Date(dayData.date)
        return Object.assign(new Day(dateObject), {
          ...dayData,
          date: dateObject,
        })
      })
    } catch (error: any) {
      console.error(`Could not load Days from localStorage: ${error.message}`)
      return []
    }
  }
  static getCurrentWeekSavedDays(week: Date[]): Day[] {
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
  static addHabitToDays(days: Day[], habit: Habit): void {
    days.forEach(day => {
      const dayIndex = adjustDayIndex(day.date)
      if (
        habit.weekdays.includes(dayIndex) &&
        !day.habits.some(h => h.id === habit.id)
      ) {
        day.habits.push(habit.clone())
      } else {
        day.habits.forEach(h => {
          if (h.id === habit.id) {
            if (!habit.weekdays.includes(dayIndex)) {
              day.habits = day.habits.filter(habit => habit.id !== h.id)
            } else {
              h.name = habit.name
              h.description = habit.description
              h.category = habit.category
              h.userId = habit.userId
              h.active = habit.active
              h.weekdays = habit.weekdays
              h.stopped = habit.stopped
            }
          }
        })
      }
    })
  }
}
