import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentWeek, getCurrentDayIndex } from '@/utils/dateUtils'
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
  const dayWeek = Day.getWeekdays(week.value, habits.value)
  return { week, activeIndex, selectedDay, setSelectedDay, dayWeek }
})
