import { ref } from 'vue'
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
  //habits
  const habits = ref(Habit.getHabits())
  const updateHabits = (
    habitsId,
    habitName,
    userId,
    habitCategory,
    habitDescription,
    selectedDays,
  ) => {
    dayWeek.value.forEach((day, index) => {
      if (selectedDays.includes(index)) {
        const habit = new Habit(
          habitsId,
          habitName,
          userId,
          habitCategory,
          habitDescription,
          selectedDays,
        )
        day.habits.push(habit)
      }
    })
  }
  const saveHabits = () => {
    const habitsJson = JSON.stringify(habits.value)
    localStorage.setItem('habits', habitsJson)
  }
  // categories
  const categories = ref(Category.load())
  //week
  const week = ref(getCurrentWeek())
  const activeIndex = ref({ index: getCurrentDayIndex() })
  const selectedDay = ref(new Date())
  const setSelectedDay = newDate => {
    selectedDay.value = newDate
  }
  const dayWeek = ref(Day.getWeekdays(week.value, habits.value))
  //month
  const selectedMonth = ref(new Date().getMonth() + 1)
  const monthDays = ref(
    Day.getMonthDays(
      new Date().getFullYear(),
      selectedMonth.value,
      habits.value,
    ),
  )
  const startIndex = ref(adjustDayIndex(monthDays.value[0].date))
  const nextMonth = () => {
    const nextMonthDate = new Date(monthDays.value[0].date)
    nextMonthDate.setMonth(monthDays.value[0].date.getMonth() + 1)
    const year = nextMonthDate.getFullYear()
    const month = nextMonthDate.getMonth()
    selectedMonth.value = month + 1
    monthDays.value = [...Day.getMonthDays(year, month + 1, habits.value)]
    startIndex.value = adjustDayIndex(monthDays.value[0].date)
  }
  const previousMonth = () => {
    const previousMonthDate = new Date(monthDays.value[0].date)
    previousMonthDate.setMonth(monthDays.value[0].date.getMonth() - 1)
    const year = previousMonthDate.getFullYear()
    const month = previousMonthDate.getMonth()
    selectedMonth.value = month + 1
    monthDays.value = [...Day.getMonthDays(year, month + 1, habits.value)]
    startIndex.value = adjustDayIndex(monthDays.value[0].date)
  }

  return {
    week,
    habits,
    categories,
    activeIndex,
    selectedDay,
    setSelectedDay,
    updateHabits,
    saveHabits,
    nextMonth,
    previousMonth,
    dayWeek,
    startIndex,
    monthDays,
    selectedMonth,
  }
})
