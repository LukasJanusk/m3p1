<template>
  <div id="habits-container">
    <div
      v-for="habit in habits"
      :key="habit.id"
      :title="habit.description"
      class="habit-item"
      :class="{ active: isActive }"
      @click="toggleCheckbox(habit.id)"
    >
      <label :for="`checkbox-${habit.id}`">{{ habit.name }}</label>
      <input
        class="checkbox"
        type="checkbox"
        :id="`checkbox-${habit.id}`"
        :checked="habit.checked"
        @click.stop
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import Habit from '@/utils/habits'
import { useHabits } from '@/stores/habitsStore'

export default defineComponent({
  name: 'HabitList',

  // Define props for dynamic data
  props: {
    habit: {
      type: [Habit],
      Required: true,
    },
  },

  // Using the setup function for state and methods
  setup() {
    const isActive = ref(true)
    const { habits } = useHabits()
    function toggleCheckbox(id) {
      for (const habit of habits) {
        if ((habit.id = id)) {
          isActive.value = !isActive.value
        }
      }
    }
    return { habits, toggleCheckbox, isActive }
  },
})
</script>

<style scoped>
#habits-container {
  list-style: none;
  padding: 0;
  margin: 0;
}

.habit-item {
  display: flex;
  background-color: aquamarine;
  border-radius: 50px;
  justify-content: space-between; /* Pushes checkbox to the right */
  align-items: center; /* Vertically aligns items */
  padding: 0.5rem;
  margin-top: 5px;
}
.habit-item:hover {
  background-color: rgb(96, 199, 165);
}
.checkbox {
  margin-left: auto; /* Extra margin on the left side, if needed */
}
.active {
  text-decoration: line-through;
  color: gray;
}
</style>
