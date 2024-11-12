<template>
  <div v-if="day.active === true" id="habits-container">
    <div
      v-for="habit in day.habits"
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
      v-for="habit in day.habits"
      :key="habit.id"
      class="habit-item-inactive"
      title="Cannot toggle habits for the future days"
      @click="handleToggleInactive"
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
  <ErrorMessage :message="message" v-if="error"></ErrorMessage>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Day from '@/utils/day'
import { useCurrentWeek } from '@/stores/dayStore'
import ErrorMessage from './ErrorMessage.vue'

export default defineComponent({
  name: 'SelectedDayHabitList',
  components: { ErrorMessage },
  props: {
    day: {
      name: 'day',
      type: Day,
    },
  },
  setup(props) {
    const store = useCurrentWeek()
    const error = ref(false)
    const message = ref('')
    function toggleCheckbox(id) {
      for (const habit of props.day.habits) {
        if (habit.id === id) {
          habit.active = !habit.active
          store.updateWeek(props.day)
          store.updateMonth(props.day)
          Day.saveWeekdays([props.day])
        }
      }
    }
    const handleToggleInactive = () => {
      message.value = 'Cannot toggle habits in the future!'
      error.value = true
      setTimeout(() => {
        error.value = false
      }, 3000)
    }
    return { toggleCheckbox, handleToggleInactive, error, message }
  },
})
</script>

<style scoped>
#habits-container {
  height: 500px;
  overflow-y: auto;
  scrollbar-width: none;
  border: 2px solid rgba(0, 0, 0, 0.035);
  border-radius: 20px;
}
#habits-container-inactive {
  height: 500px;
  overflow-y: auto;
  scrollbar-width: none;
  border: 2px solid rgba(0, 0, 0, 0.035);
  border-radius: 20px;
}
.habit-item {
  display: flex;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
  border-radius: 50px;
  min-height: 30px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 5px;
  box-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
  transition: transform 0.2s ease;
  cursor: pointer;
}
.habit-item:hover {
  background-color: rgb(80, 168, 139);
  border-color: transparent;
  transform: scale(1.005);
}
.habit-item:active {
  transform: scale(0.99);
  background-color: rgb(94, 192, 159);
}
.habit-item-inactive {
  width: 98%;
  min-height: 30px;
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
  margin: 5px;
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
  color: rgb(69, 69, 69);
  background-color: rgb(96, 199, 165);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
