<template>
  <TopContainer id="top-container"
    ><h1 id="title">Calendar</h1>
    <Transition name="fade" mode="out-in">
      <SelectedMonth></SelectedMonth
    ></Transition>
    <MonthNavigation
      v-if="calendarView"
      @next="store.nextMonth"
      @previous="store.previousMonth"
    ></MonthNavigation>
    <img
      v-if="!calendarView"
      src="../assets/back2.svg"
      title="Back to calendar"
      alt="arrow left"
      class="nav-button"
      id="back-button"
      @click="calendarView = true"
    />
  </TopContainer>
  <MainContainer
    ><CalendarBody
      v-if="calendarView"
      :startIndex="store.startIndex"
      :monthDays="store.monthDays"
      @daySelected="toggleDayView"
    ></CalendarBody>
    <SelectedDayHabitList
      v-if="!calendarView"
      :day="selectedDay"
    ></SelectedDayHabitList>
  </MainContainer>
</template>

<script>
import CalendarBody from '@/components/CalendarBody.vue'
import TopContainer from '@/components/TopContainer.vue'
import MainContainer from '@/components/MainContainer.vue'
import SelectedMonth from '@/components/SelectedMonth.vue'
import MonthNavigation from '@/components/MonthNavigation.vue'
import SelectedDayHabitList from '@/components/SelectedDayHabitList.vue'
import { useCurrentWeek } from '@/stores/dayStore'
import { ref } from 'vue'
import Day from '@/utils/day'

export default {
  components: {
    CalendarBody,
    TopContainer,
    MainContainer,
    SelectedMonth,
    MonthNavigation,
    SelectedDayHabitList,
  },
  props: ['date'],

  setup(props) {
    const store = useCurrentWeek()
    const calendarView = ref(true)
    const selectedDay = ref()
    store.monthDays.forEach(day => {
      const matchedDay = store.dayWeek.find(
        d => d.date.toISOString() === day.date.toISOString(),
      )
      if (matchedDay) {
        day.habits = matchedDay.habits
      }
    })
    Day.saveWeekdays(store.monthDays)

    // Toggle view and set the selected day
    const toggleDayView = day => {
      calendarView.value = !calendarView.value
      selectedDay.value = day
      console.log(day)
    }

    // Activate date based on URL parameter
    const setActiveDateFromUrl = () => {
      if (props.date) {
        const urlDate = new Date(props.date)
        urlDate.setHours(0, 0, 0, 0)
        if (!isNaN(urlDate.getTime())) {
          const allDays = Day.loadWeekdays()
          const match = allDays.find(
            day => new Date(day.date).toISOString() === urlDate.toISOString(),
          )
          if (match) {
            toggleDayView(match)
          }
        }
      }
    }

    return {
      store,
      calendarView,
      selectedDay,
      toggleDayView,
      setActiveDateFromUrl,
    }
  },

  mounted() {
    this.setActiveDateFromUrl()
  },
}
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
