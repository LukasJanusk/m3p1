<template>
  <TopContainer id="top-container"
    ><h1 id="title">Calendar</h1>
    <Transition name="fade" mode="out-in">
      <SelectedMonth></SelectedMonth
    ></Transition>
    <MonthNavigation
      @next="store.nextMonth"
      @previous="store.previousMonth"
    ></MonthNavigation>
  </TopContainer>
  <MainContainer
    ><CalendarBody
      :startIndex="store.startIndex"
      :monthDays="monthToDisplay"
    ></CalendarBody
  ></MainContainer>
</template>

<script setup>
import CalendarBody from '@/components/CalendarBody.vue'
import TopContainer from '@/components/TopContainer.vue'
import MainContainer from '@/components/MainContainer.vue'
import SelectedMonth from '@/components/SelectedMonth.vue'
import MonthNavigation from '@/components/MonthNavigation.vue'
import { useCurrentWeek } from '@/stores/dayStore'
import { computed } from 'vue'

const store = useCurrentWeek()
const monthToDisplay = computed(() => {
  return store.monthDays
})
</script>
<style scoped>
#top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img {
  width: 100%;
}
#navigation {
  display: flex;
  flex-wrap: nowrap;
}
@media (max-width: 550px) {
  #title {
    display: none;
  }
}
@media (min-width: 1024px) {
  .calendar {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
