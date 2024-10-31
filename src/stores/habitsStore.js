import { ref } from 'vue'
import { defineStore } from 'pinia'
import Habit from '../utils/habits'

export const useHabits = defineStore('habits', () => {
  const habits = ref(Habit.getHabits())
  const saveHabits = () => {
    const habitsJson = JSON.stringify(habits.value)
    localStorage.setItem('habits', habitsJson)
  }
  return { habits, saveHabits }
})
