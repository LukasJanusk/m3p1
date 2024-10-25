<template>
  <div>
    <button
      v-for="day in currentWeek"
      class="week-day"
      :class="{ active: activeIndex === index }"
      :key="day.date"
      @click="handleClick(index)"
    >
      {{ getWeekDay(day.date) }}
    </button>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { getWeekDay, getCurrentWeek } from '@/utils/dateUtils'

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
  setup() {
    const currentWeek = ref(getCurrentWeek())
    const activeIndex = ref(null)
    const weekDay = ref(getWeekDay(date))
    function handleClick(index) {
      activeIndex.value = index
    }

    return { activeIndex, currentWeek }
  },
})
</script>

<style scoped>
.week-day {
  padding: 10px 15px;
  font-size: 15px;
  min-width: 50px;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 3rem;
  cursor: pointer;
}
.week-day:hover {
  background-color: #6c9fdd;
}
.active {
  background-color: #1e513b;
}
.active:hover {
  background-color: #466e9e;
}
</style>
