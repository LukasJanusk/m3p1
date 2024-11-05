import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getCurrentWeek,
  getCurrentDayIndex,
  getCurrentMonthDates,
  adjustDayIndex,
} from '@/utils/dateUtils'
import Habit from '@/utils/habits'
import Day from '@/utils/day'

export const useCurrentWeek = defineStore('weekStore', () => {
  const week = ref(getCurrentWeek())
  const activeIndex = ref({ index: getCurrentDayIndex() })
  const selectedDay = ref(new Date())
  const setSelectedDay = newDate => {
    selectedDay.value = newDate
  }
  const habits = ref(Habit.getHabits())
  const dayWeek = ref(Day.getWeekdays(week.value, habits.value))
  const monthDates = ref(getCurrentMonthDates())
  const startIndex = ref(adjustDayIndex(monthDates.value[0]))
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
          selectedDay,
        )
        day.habits.push(habit)
      }
    })
  }
  return {
    week,
    activeIndex,
    selectedDay,
    setSelectedDay,
    updateHabits,
    dayWeek,
    monthDates,
    startIndex,
  }
})
