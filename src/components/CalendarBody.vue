<template>
  <div id="weekday-container">
    <div class="tag-item" v-for="(tag, index) in weekdayTags" :key="index">
      <p>{{ tag }}</p>
    </div>
  </div>
  <div id="calendar-container">
    <div
      class="empty-day"
      v-for="index in getEmptyDaysStart()"
      :key="'empty-' + index"
    ></div>
    <div class="day-item" v-for="date in monthDates" :key="date.toISOString()">
      <p>{{ date.getDate() }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'

export default defineComponent({
  name: 'CalendarBody',
  props: {},
  setup() {
    const { monthDates, startIndex } = useCurrentWeek()
    console.log(monthDates)
    const weekdayTags = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    function getEmptyDaysStart() {
      return Array.from({ length: startIndex })
    }

    return { monthDates, weekdayTags, startIndex, getEmptyDaysStart }
  },
})
</script>

<style scoped>
#calendar-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
#weekday-container {
  display: flex;
  justify-content: space-around;
}
.tag-item {
  display: flex;
  margin: 10px;
  font-weight: 800;
  justify-content: flex-end;
}
.day-item {
  border: 1px solid black;
  transition: transform 0.5s ease;
  border-radius: 20px;
}
.day-item:hover {
  scale: 1.05;
}
.empty-day {
  margin: 1px;
}
</style>
