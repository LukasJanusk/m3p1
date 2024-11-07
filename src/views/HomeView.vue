<script setup>
import WeekDayButtons from '@/components/WeekDayButtons.vue'
import SelectedDay from '@/components/SelectedDay.vue'
import DayHabitList from '@/components/DayHabitList.vue'
import MainContainer from '@/components/MainContainer.vue'
import TopContainer from '@/components/TopContainer.vue'

const handleDateSelected = dateObj => {
  console.log(dateObj)
}
</script>

<template>
  <main>
    <TopContainer>
      <Transition name="fade" mode="out-in">
        <SelectedDay id="selected-day"></SelectedDay>
      </Transition>
      <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
    </TopContainer>
    <MainContainer>
      <Transition name="fade" mode="out-in">
        <DayHabitList id="habit-list"></DayHabitList> </Transition
    ></MainContainer>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#selected-day {
  margin-left: 10px;
  margin-bottom: 5px;
}
</style>
