<template>
  <div id="habits-container">
    <transition-group name="fade" tag="div">
      <div
        v-for="habit in habits"
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
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Habit from '@/utils/habits'
import { useHabits } from '@/stores/habitsStore'

export default defineComponent({
  name: 'HabitList',
  props: {
    habit: {
      type: [Habit],
      Required: true,
    },
  },
  setup() {
    const { habits } = useHabits()
    function toggleCheckbox(id) {
      for (const habit of habits) {
        if (habit.id === id) {
          habit.active = !habit.active
        }
      }
    }
    return { habits, toggleCheckbox }
  },
})
</script>

<style scoped>
#habits-container {
  position: absolute;
  top: 0;
  padding: 0;
  margin: 0;
}

.habit-item {
  display: flex;
  background-color: rgba(255, 255, 255, 0.418);
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
  color: gray;
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
