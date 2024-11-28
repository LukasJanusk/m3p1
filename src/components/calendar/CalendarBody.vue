<template>
  <div id="calendar-body">
    <div id="weekday-container">
      <div class="tag-item" v-for="(tag, index) in weekdayTags" :key="index">
        <p class="day-text">{{ tag }}</p>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div :key="calendarKey" id="calendar-container">
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
        </DayOfMonth></div
    ></transition>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import DayOfMonth from './DayOfMonth.vue'

export default defineComponent({
  name: 'CalendarBody',
  emits: ['daySelected'],
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
    const calendarKey = computed(() => {
      return props.monthDays.map(day => day.date.toISOString()).join('-')
    })
    const skip = computed(() => {
      return Array.from({ length: props.startIndex })
    })
    const daySelected = day => {
      emit('daySelected', day)
    }
    return {
      weekdayTags,
      skip,
      daySelected,
      calendarKey,
    }
  },
})
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-leave-to {
  opacity: 0;
}
#calendar-body {
  padding: 5px;
  height: 490px;
  border: 2px solid rgba(0, 0, 0, 0.035);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.041);
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
