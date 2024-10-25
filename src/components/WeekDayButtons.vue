<template>
  <div>
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
    const { week, activeIndex } = useCurrentWeek()
    console.log(activeIndex)
    function handleClick(day, index) {
      activeIndex.index = index
      emit('dateSelected', day) // Emit the clicked date object
    }

    return { activeIndex, week, getWeekDay, handleClick }
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
