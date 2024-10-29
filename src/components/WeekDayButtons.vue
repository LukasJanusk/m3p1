<template>
  <div class="week-container">
    <button
      v-for="(day, index) in week"
      class="week-day"
      :class="{ active: activeIndex.index === index }"
      :key="day.date"
      @click="handleClick(day, index)"
    >
      {{ getWeekDay(day) }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getWeekDay } from '@/utils/dateUtils'
import { useCurrentWeek } from '@/stores/week'

export default defineComponent({
  name: 'WeekdayButtons',

  // Define props for dynamic data
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    },
  },

  // Using the setup function for state and methods
  setup(props, { emit }) {
    const { week, activeIndex, selectedDay, setSelectedDay } = useCurrentWeek()
    function handleClick(day, index) {
      activeIndex.index = index
      setSelectedDay(day)
      emit('dateSelected', day) // Emit the clicked date object
    }

    return { activeIndex, week, selectedDay, getWeekDay, handleClick }
  },
})
</script>

<style scoped>
.week-container {
  display: flex;
  justify-content: space-between;
}
.week-day {
  font-weight: bold;
  padding: 12px 20px;
  font-size: 16px;
  min-width: 60px;
  color: #ffffff;
  background-color: #42b983; /* Default color */
  border: none;
  border-radius: 25px; /* Rounded corners */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin: 5px;
}

.week-day:hover {
  background-color: #5a9fd7;
  transform: scale(1.05);
}
.week-day:active {
  border-color: #226144;
  transform: scale(0.95);
  background-color: #4dd698;
}
.active {
  background-color: #226144;
  color: #ffffff;
  box-shadow: 0px 4px 10px rgba(34, 97, 68, 0.5); /* Shadow for active state */
  border-radius: 25px 25px 25px 25px; /* Rounded top corners */
}

.active:hover {
  background-color: #466e9e;
}
@media (max-width: 600px) {
  .week-container {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .week-day {
    padding: 8px 12px;
    font-size: 12px;
    min-width: 30px;
    margin: 2px;
  }
}
@media (min-width: 500px) {
  .week-container {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
