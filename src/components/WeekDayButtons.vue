<template>
  <div class="week-container">
    <button
      v-for="(day, index) in dayWeek"
      class="week-day"
      :class="{ active: activeIndex.index === index }"
      :key="day.date"
      @click="handleClick(day, index)"
    >
      {{ getWeekDay(day.date) }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getWeekDay } from '@/utils/dateUtils'
import { useCurrentWeek } from '@/stores/dayStore'

export default defineComponent({
  name: 'WeekdayButtons',
  setup(props, { emit }) {
    const { week, activeIndex, selectedDay, setSelectedDay, dayWeek } =
      useCurrentWeek()
    function handleClick(day, index) {
      activeIndex.index = index
      setSelectedDay(day.date)
      emit('dateSelected', day) // Emit the clicked date object
    }

    return { activeIndex, week, selectedDay, getWeekDay, handleClick, dayWeek }
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
  background-color: #42b983;
  border: none;
  border-radius: 15px;
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
  transform: scale(0.98);
  box-shadow: 0px 4px 10px rgba(34, 97, 68, 0.5);
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
