<template>
  <h1>Add New Habit</h1>
  <form>
    <label for="name" required>Habit name</label><br />
    <input id="name" type="text" /><br />
    <label for="description">Description</label><br />
    <textarea id="description>"></textarea><br />
    <label for="category">Category</label><br />
    <select>
      <option value="sport">Sport</option>
      <option value="food">Eating</option>
      <option value="sleep">Sleep</option>
      <option value="learning">Learning</option>
    </select>
    <h2>Select active days</h2>
    <div v-for="(day, index) in weekdays" :key="index">
      <label>
        <input type="checkbox" :value="day" v-model="selectedDays" />
        {{ day }}
      </label>
    </div>
  </form>
  <p>{{ habits }}</p>
</template>
<script>
import { useHabits } from '@/stores/habitsStore.js'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HabitForm',

  setup() {
    const { habits } = useHabits()
    console.log(habits[0].name)
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]
    const selectedDays = ref([])
    return { habits, weekdays, selectedDays }
  },
})
</script>
<style scoped></style>
