<script setup>
import WeekDayButtons from '@/components/WeekDayButtons.vue'
import SelectedDay from '@/components/SelectedDay.vue'
import DayHabitList from '@/components/DayHabitList.vue'
// import { useCurrentWeek } from '@/stores/week'

// const { dayWeek, activeIndex } = useCurrentWeek()
const handleDateSelected = dateObj => {
  console.log(dateObj)
}
// const handleHabitActivity = habit => {
//   const habitToToggle = dayWeek[activeIndex.index].habits.find(h => {
//     h.id === habit.id
//   })
//   if (habitToToggle) {
//     habitToToggle.active = !habitToToggle.active
//   }
// }
</script>

<template>
  <main>
    <div id="weekday-buttons">
      <SelectedDay id="selected-day"></SelectedDay>
      <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
    </div>
    <DayHabitList id="habit-list"></DayHabitList>
  </main>
</template>

<style scoped>
#selected-day {
  margin-left: 10px;
  margin-bottom: 5px;
}
#habit-list {
  padding: 10px;
  height: 500px;
  min-width: 320px;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.7),
    rgba(164, 191, 82, 0.5)
  );
  width: auto;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
#weekday-buttons {
  min-width: 320px;
  height: 100px;
  background: linear-gradient(
    135deg,
    rgba(81, 80, 80, 0.7),
    rgba(112, 118, 95, 0.5)
  );
  border-radius: 20px 20px 0px 0px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
