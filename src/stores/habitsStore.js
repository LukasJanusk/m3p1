import { ref } from 'vue'
import { defineStore } from 'pinia'
import Habit from '../utils/habits'

export const useHabits = defineStore('habits', () => {
  const habit1 = new Habit(1, 'Run', 1, 1, 'I love running')
  const habit2 = new Habit(
    2,
    'Sleep',
    2,
    2,
    'I love sleeping',
    [0, 1, 2, 3, 4, 5, 6],
  )
  const habits = ref([habit1, habit2])
  const saveHabits = () => {
    const habitsJson = JSON.stringify(habits.value)
    localStorage.setItem('habits', habitsJson)
  }
  // const habitsJson = localStorage.getItem(habits)
  // const habits = ref(JSON.parse(habitsJson) || [])
  // habits.value.push(habit1)
  // console.log('wtf')

  return { habits, saveHabits }
})
