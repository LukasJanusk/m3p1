<script setup>
import WeekDayButtons from '@/components/WeekDayButtons.vue'
import SelectedDay from '@/components/SelectedDay.vue'
import DayHabitList from '@/components/DayHabitList.vue'
import MainContainer from '@/components/MainContainer.vue'
import TopContainer from '@/components/TopContainer.vue'
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
    <TopContainer>
      <SelectedDay id="selected-day"></SelectedDay>
      <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
    </TopContainer>
    <MainContainer>
      <DayHabitList id="habit-list"></DayHabitList
    ></MainContainer>
  </main>
</template>

<style scoped>
#selected-day {
  margin-left: 10px;
  margin-bottom: 5px;
}
</style>
