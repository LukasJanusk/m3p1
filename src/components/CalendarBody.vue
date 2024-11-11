<template>
  <div id="calendar-body">
    <div id="weekday-container">
      <div class="tag-item" v-for="(tag, index) in weekdayTags" :key="index">
        <p class="day-text">{{ tag }}</p>
      </div>
    </div>
    <div id="calendar-container">
      <div
        class="empty-day"
        v-for="index in skip"
        :key="'empty-' + index"
      ></div>
      <DayOfMonth
        v-for="day in monthDays"
        :key="day.date.toISOString()"
        :dayObject="day"
        @click="daySelected(day)"
      >
      </DayOfMonth>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import DayOfMonth from './DayOfMonth.vue'

export default defineComponent({
  name: 'CalendarBody',
  components: { DayOfMonth },
  props: {
    startIndex: {
      type: Number,
      required: true,
    },
    monthDays: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const weekdayTags = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const skip = computed(() => {
      return Array.from({ length: props.startIndex })
    })
    const daySelected = day => {
      emit('daySelected', day)
      console.log(`Day selected: ${day}`)
    }
    return {
      weekdayTags,
      skip,
      daySelected,
    }
  },
})
</script>

<style scoped>
#calendar-body {
  height: inherit;
}
#calendar-container {
  display: grid;
  grid-template-columns: repeat(7, calc((100% - (6 * 10px)) / 7));
  grid-template-rows: repeat(6, calc((100% - (5 * 10px)) / 6));
  gap: 10px;
  height: 85%;
}
#weekday-container {
  display: flex;
  justify-content: space-around;
}
.tag-item {
  display: flex;
  font-size: 20px;
  font-weight: 800;
  justify-content: flex-end;
  text-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
}
/* .day-item {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  border: 2px solid black;
  transition:
    transform 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
  border-radius: 20px;
  padding: 5px;
  background: linear-gradient(30deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  box-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
}
.day-item:hover {
  transform: scale(1.05);
  background-color: #466e9e8b;
}
.day-item:active {
  transform: scale(0.99);
  border-color: #42b983;
  background-color: #42b983;
} */
.empty-day {
  margin: 1px;
}
@media (max-width: 550px) {
  .tag-item {
    font-size: 15px;
  }
  #calendar-container {
    gap: 4px;
    grid-template-columns: repeat(7, calc((100% - (6 * 4px)) / 7));
    grid-template-rows: repeat(6, calc((100% - (5 * 4px)) / 6));
    gap: 4;
  }
}
@media (max-width: 1000px) {
  .day-item {
    border-radius: 15px;
  }
}
</style>
