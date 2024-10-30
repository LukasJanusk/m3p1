<template>
  <div id="habits-container">
    <div
      v-for="habit in dayWeek.habits"
      :key="habit.id"
      :title="habit.description"
      class="habit-item"
      :class="{ active: habit.active }"
      @click="toggleCheckbox(habit.id)"
    >
      <label :for="`checkbox-${habit.id}`">{{ habit.name }}</label>
      <input
        class="checkbox"
        type="checkbox"
        :id="`checkbox-${habit.id}`"
        :checked="habit.active"
        @click.stop="toggleCheckbox(habit.id)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Habit from '@/utils/habits'
import { useCurrentWeek } from '@/stores/week'

export default defineComponent({
  name: 'HabitList',
  props: {
    habit: {
      type: [Habit],
      Required: true,
    },
  },
  setup() {
    const { dayWeek } = useCurrentWeek()
    // const { habits } = useHabits()
    function toggleCheckbox(id) {
      for (const habit of dayWeek.habits) {
        if (habit.id === id) {
          habit.active = !habit.active
        }
      }
    }
    return { dayWeek, toggleCheckbox }
  },
})
</script>

<style scoped>
.habit-item {
  display: flex;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
  border-radius: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 5px;
  box-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
  transition: transform 0.2s ease;
}
.habit-item:hover {
  background-color: rgb(80, 168, 139);
  transform: scale(1.01);
}
.habit-item:active {
  transform: scale(0.99);
  background-color: rgb(94, 192, 159);
}
.checkbox {
  margin-left: auto;
  width: 20px;
  height: 20px;
  accent-color: rgb(96, 199, 165);
  cursor: pointer;
}
.checkbox:hover {
  accent-color: rgb(80, 168, 139);
}
.active {
  text-decoration: line-through;
  color: white;
  background-color: rgb(96, 199, 165);
}
/* Fade Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
