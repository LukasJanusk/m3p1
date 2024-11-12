<template>
  <div>
    <TopContainer id="top-container"
      ><h1 id="title">Calendar</h1>
      <Transition name="fade" mode="out-in">
        <SelectedMonth v-if="calendarView"></SelectedMonth>
        <h2 v-else>
          {{ dateToShow }}
        </h2>
      </Transition>
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
  </div>
</template>

<script>
import CalendarBody from '@/components/CalendarBody.vue'
import TopContainer from '@/components/TopContainer.vue'
import MainContainer from '@/components/MainContainer.vue'
import SelectedMonth from '@/components/SelectedMonth.vue'
import MonthNavigation from '@/components/MonthNavigation.vue'
import SelectedDayHabitList from '@/components/SelectedDayHabitList.vue'
import { useRouter, useRoute } from 'vue-router'
import {
  adjustDayIndex,
  formatDate,
  getCurrentDayString,
} from '@/utils/dateUtils'
import { useCurrentWeek } from '@/stores/dayStore'
import { ref, watch, computed } from 'vue'
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
  setup() {
    const store = useCurrentWeek()
    const router = useRouter()
    const route = useRoute()
    const calendarView = ref(true)
    const selectedDay = ref()
    const dateToShow = computed(() => {
      const dateString = getCurrentDayString(selectedDay.value.date)
      if (dateString) {
        return dateString
      } else {
        return 'Canno get selected Date'
      }
    })
    store.monthDays.forEach(day => {
      const matchedDay = store.dayWeek.find(
        d => d.date.toISOString() === day.date.toISOString(),
      )
      if (matchedDay) {
        day.habits = matchedDay.habits
      }
    })
    Day.saveWeekdays(store.monthDays)
    watch(
      () => route.params.date,
      newDate => {
        if (newDate) {
          const date = new Date(newDate)
          date.setHours(0, 0, 0, 0)
          const current = store.monthDays.find(
            day => formatDate(day.date) === formatDate(date),
          )
          if (current) {
            selectedDay.value = current
          } else {
            const day = new Day(date)
            const dayIndex = adjustDayIndex(date)
            day.habits = store.habits.filter(habit =>
              habit.weekdays.includes(dayIndex),
            )
            if (day.date > new Date()) {
              day.active = false
            }
            selectedDay.value = day
          }
          calendarView.value = false
        }
      },
      { immediate: true }, // Trigger this watch immediately on component setup
    )
    // Toggle view and set the selected day
    const toggleDayView = day => {
      calendarView.value = !calendarView.value
      selectedDay.value = day
      const dateString = formatDate(day.date)
      router.push({ name: 'CalendarView', params: { date: dateString } })
    }
    return {
      store,
      calendarView,
      selectedDay,
      dateToShow,
      toggleDayView,
    }
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
