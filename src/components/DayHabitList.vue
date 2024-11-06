<template>
  <div v-if="dayWeek[activeIndex.index].active === true" id="habits-container">
    <div
      v-for="habit in dayWeek[activeIndex.index].habits"
      :key="habit.id"
      :title="habit.description"
      class="habit-item"
      :class="{ active: habit.active }"
      @click="toggleCheckbox(habit.id)"
    >
      <label @click="toggleCheckbox(habit.id)" :for="`checkbox-${habit.id}`">{{
        habit.name
      }}</label>
      <input
        class="checkbox"
        type="checkbox"
        :id="`checkbox-${habit.id}`"
        :checked="habit.active"
        @click.stop="toggleCheckbox(habit.id)"
      />
    </div>
  </div>
  <div v-else id="habits-container-inactive">
    <div
      v-for="habit in dayWeek[activeIndex.index].habits"
      :key="habit.id"
      class="habit-item-inactive"
      title="Cannot toggle habits for the future days"
    >
      <label :for="`checkbox-${habit.id}`">{{ habit.name }}</label>
      <input
        hidden
        class="checkbox"
        type="checkbox"
        :id="`checkbox-${habit.id}`"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'
import Day from '@/utils/day'

export default defineComponent({
  name: 'DayHabitList',
  props: {},
  setup() {
    const { dayWeek, activeIndex } = useCurrentWeek()
    function toggleCheckbox(id) {
      for (const habit of dayWeek[activeIndex.index].habits) {
        if (habit.id === id) {
          habit.active = !habit.active
          Day.saveWeekdays(dayWeek)
        }
      }
    }
    return { dayWeek, toggleCheckbox, activeIndex }
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
.habit-item-inactive {
  display: flex;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.495),
    rgba(0, 0, 0, 0.262)
  );
  border-radius: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 5px;
  box-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
  transition: transform 0.2s ease;
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
