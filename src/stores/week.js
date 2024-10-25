// stores/week.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentWeek, getCurrentDayIndex } from '@/utils/dateUtils'

export const useCurrentWeek = defineStore('weekStore', () => {
  const week = ref(getCurrentWeek())
  const activeIndex = ref({ index: getCurrentDayIndex() })

  return { week, activeIndex }
})
