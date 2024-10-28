import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentWeek, getCurrentDayIndex } from '@/utils/dateUtils'

export const useCurrentWeek = defineStore('weekStore', () => {
  const week = ref(getCurrentWeek())
  const activeIndex = ref({ index: getCurrentDayIndex() })
  const selectedDay = ref(new Date())

  const setSelectedDay = newDate => {
    selectedDay.value = newDate
  }

  return { week, activeIndex, selectedDay, setSelectedDay }
})
