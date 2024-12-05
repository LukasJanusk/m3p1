import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  getCurrentWeek,
  getCurrentDayIndex,
  adjustDayIndex,
} from '@/utils/dateUtils'
import Category from '@/utils/category'
import Habit from '@/utils/habits'
import Day from '@/utils/day'

export const useCurrentWeek = defineStore('weekStore', () => {
  // Habits
  const habits = ref(Habit.getHabits())
  watch(
    habits,
    () => {
      saveHabits()
    },
    { deep: true },
  )
  const addHabit = (newHabit: Habit, selectedDays: number[]): boolean => {
    try {
      habits.value.push(newHabit)
      dayWeek.value.forEach((day, index) => {
        if (selectedDays.includes(index)) {
          const clone = newHabit.clone()
          if (!day.habits.some(habit => habit.id === clone.id))
            day.habits.push(clone)
        }
      })
      monthDays.value.forEach(day => {
        const dayIndex = adjustDayIndex(day.date)
        if (newHabit.weekdays.includes(dayIndex)) {
          const clone = newHabit.clone()
          if (!day.habits.some(habit => habit.id === clone.id))
            day.habits.push(clone)
        }
      })
      return true
    } catch (error: any) {
      console.error(`Failed to add habit: ${error.message}`)
      return false
    }
  }
  const saveHabits = (): void => {
    try {
      const habitsJson = JSON.stringify(habits.value)
      localStorage.setItem('habits', habitsJson)
    } catch (error: any) {
      console.error(`Failed to save Habits: ${error.message}`)
    }
  }
  const editHabit = (habit: Habit): boolean => {
    try {
      const habitToEdit = habits.value.find(h => habit.id === h.id)
      if (habitToEdit) {
        habitToEdit.name = habit.name
        habitToEdit.description = habit.description
        habitToEdit.category = habit.category
        habitToEdit.weekdays = habit.weekdays
        habitToEdit.stopped = habit.stopped
        Day.addHabitToDays(dayWeek.value, habitToEdit)
        Day.addHabitToDays(monthDays.value, habitToEdit)
        const allDays = Day.loadWeekdays()
        Day.addHabitToDays(allDays, habitToEdit)
        Day.saveWeekdays(allDays)
      }
      return true
    } catch (error: any) {
      console.error(`Failed to edit Habit: ${error.message}`)
      return false
    }
  }

  const stopHabit = (habitId: number): boolean => {
    const habitToStop = habits.value.find(h => habitId === h.id)
    if (!habitToStop) {
      console.error(`Habit with id ${habitId} not found.`)
      return false
    }
    habitToStop.stopped = true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    dayWeek.value.forEach(day => {
      if (day.date >= today) {
        day.habits = day.habits.filter(habit => habit.id !== habitId)
      }
    })
    monthDays.value.forEach(day => {
      if (day.date >= today) {
        day.habits = day.habits.filter(habit => habit.id !== habitId)
      }
    })
    const allDays = Day.loadWeekdays()
    allDays.forEach(day => {
      if (day.date >= today) {
        day.habits = day.habits.filter(habit => habit.id !== habitId)
      }
    })
    Day.saveWeekdays(allDays)
    return true
  }

  const activateStoppedHabit = (habitId: number): boolean => {
    const habitToActivate = habits.value.find(h => habitId === h.id)
    if (!habitToActivate) {
      console.error(`Habit with id ${habitId} not found.`)
      return false
    }
    habitToActivate.stopped = false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    dayWeek.value.forEach(day => {
      const dayIndex = adjustDayIndex(day.date)
      if (
        day.date >= today &&
        !day.habits.some(habit => habit.id === habitId) &&
        habitToActivate.weekdays.includes(dayIndex)
      ) {
        day.habits.push(habitToActivate.clone())
      }
    })
    monthDays.value.forEach(day => {
      const dayIndex = adjustDayIndex(day.date)
      if (
        day.date >= today &&
        !day.habits.some(habit => habit.id === habitId) &&
        habitToActivate.weekdays.includes(dayIndex)
      ) {
        day.habits.push(habitToActivate.clone())
      }
    })
    const allDays = Day.loadWeekdays()
    allDays.forEach(day => {
      const dayIndex = adjustDayIndex(day.date)
      if (
        day.date >= today &&
        !day.habits.some(habit => habit.id === habitId) &&
        habitToActivate.weekdays.includes(dayIndex)
      ) {
        day.habits.push(habitToActivate.clone())
      }
    })
    Day.saveWeekdays(allDays)
    return true
  }
  const deleteHabit = (habitId: number) => {
    const days = Day.loadWeekdays()
    days.forEach(day => {
      day.habits = day.habits.filter(habit => habit.id !== habitId)
    })
    habits.value = habits.value.filter(habit => habit.id !== habitId)
    dayWeek.value.forEach(day => {
      day.habits = day.habits.filter(habit => habit.id !== habitId)
    })
    monthDays.value.forEach(day => {
      day.habits = day.habits.filter(habit => habit.id !== habitId)
    })
    const allDays = Day.loadWeekdays()
    allDays.forEach(day => {
      day.habits = day.habits.filter(habit => habit.id !== habitId)
    })
    Day.saveWeekdays(allDays)
    return true
  }

  // categories
  const categories = ref(Category.load())
  watch(categories, () => {
    Category.save(categories.value)
  })

  //week
  const week = ref(getCurrentWeek())
  const activeIndex = ref({ index: getCurrentDayIndex() })
  const selectedDay = ref(new Date())
  selectedDay.value.setHours(0, 0, 0, 0)
  const setSelectedDay = (newDate: Date) => {
    selectedDay.value = newDate
  }
  const dayWeek = ref(Day.getWeekdays(week.value, habits.value))
  watch(
    dayWeek,
    () => {
      Day.saveWeekdays(dayWeek.value)
    },
    { deep: true },
  )
  const updateWeek = (day: Day): void => {
    const match = dayWeek.value.find(d => {
      return d.date.toISOString() === day.date.toISOString()
    })
    if (match) {
      match.habits = day.habits
      match.active = day.active
    }
  }

  //month
  const selectedMonth = ref(new Date().getMonth())
  const monthDays = ref(
    Day.getMonthDays(
      new Date().getFullYear(),
      selectedMonth.value,
      habits.value,
    ),
  )
  watch(
    monthDays,
    () => {
      Day.saveWeekdays(monthDays.value)
    },
    { deep: true },
  )
  const startIndex = ref(adjustDayIndex(monthDays.value[0].date))
  const updateMonth = (day: Day): void => {
    const match = monthDays.value.find(d => {
      return d.date.toISOString() === day.date.toISOString()
    })
    if (match) {
      match.habits = day.habits
      match.active = day.active
    }
  }
  const nextMonth = (): void => {
    const nextMonthDate = new Date(monthDays.value[0].date)
    nextMonthDate.setMonth(monthDays.value[0].date.getMonth() + 1)
    const year = nextMonthDate.getFullYear()
    const month = nextMonthDate.getMonth()
    selectedMonth.value = month + 1
    monthDays.value = Day.getMonthDays(year, month, habits.value)
    startIndex.value = adjustDayIndex(monthDays.value[0].date)
  }
  const previousMonth = (): void => {
    const previousMonthDate = new Date(monthDays.value[0].date)
    previousMonthDate.setMonth(monthDays.value[0].date.getMonth() - 1)
    const year = previousMonthDate.getFullYear()
    const month = previousMonthDate.getMonth()
    selectedMonth.value = month - 1
    monthDays.value = Day.getMonthDays(year, month, habits.value)
    startIndex.value = adjustDayIndex(monthDays.value[0].date)
  }

  return {
    week,
    habits,
    categories,
    activeIndex,
    selectedDay,
    setSelectedDay,
    addHabit,
    editHabit,
    deleteHabit,
    saveHabits,
    activateStoppedHabit,
    stopHabit,
    updateWeek,
    updateMonth,
    nextMonth,
    previousMonth,
    dayWeek,
    startIndex,
    monthDays,
    selectedMonth,
  }
})
