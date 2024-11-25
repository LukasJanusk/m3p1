<template>
  <div class="week-container">
    <button
      v-for="(day, index) in store.dayWeek"
      class="week-day"
      :class="{ active: store.activeIndex.index === index }"
      :key="day.date"
      @click="handleClick(day, index)"
    >
      {{ getWeekDay(day.date) }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDate, getWeekDay } from '@/utils/dateUtils'
import { useCurrentWeek } from '@/stores/dayStore'

export default defineComponent({
  name: 'WeekdayButtons',
  emits: ['dateSelected'],
  setup(props, { emit }) {
    const store = useCurrentWeek()
    function handleClick(day, index) {
      store.activeIndex.index = index
      store.setSelectedDay(day.date)
      const dateString = formatDate(day.date)
      emit('dateSelected', dateString)
    }
    return { store, getWeekDay, handleClick }
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
  color: rgba(230, 230, 230, 0.895);
  background: linear-gradient(
    135deg,
    rgba(48, 162, 111, 1),
    rgba(27, 122, 78, 1)
  );
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin: 5px;
}

.week-day:hover {
  background: linear-gradient(
    135deg,
    rgba(70, 110, 158, 1),
    rgba(36, 82, 128, 1)
  );
  transform: scale(1.05);
}
.week-day:active {
  background: rgba(56, 183, 126, 1);
  border-color: transparent;
  transform: scale(0.95);
}
.active {
  background: linear-gradient(135deg, rgba(34, 97, 68, 1), rgba(20, 75, 50, 1));
  border: 2px solid rgba(0, 0, 0, 0.6);
  transform: scale(0.98);
  box-shadow: 0px 4px 10px rgba(34, 97, 68, 0.5);
}

@media (max-width: 600px) {
  .week-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
  }
  .week-day {
    padding: 20px 6px;
    font-size: 12px;
    min-width: 40px;
    margin: 2px;
    width: 1/7;
  }
}
@media (min-width: 600px) {
  .week-container {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
