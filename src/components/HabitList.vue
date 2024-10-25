<template>
  <div>{{}}</div>
</template>

<script>
import { defineComponent } from 'vue'
import Habit from '@/utils/habits'

export default defineComponent({
  name: 'HabitList',

  // Define props for dynamic data
  props: {
    habit: {
      type: Habit,
      Required: true,
    },
  },

  // Using the setup function for state and methods
  setup() {},
})
</script>

<style scoped></style>
