<template>
  <div>
    <TopContainer id="top-container"
      ><h1 id="title">Calendar</h1>
      <Transition name="fade" mode="out-in">
        <SelectedMonth v-if="calendarView"></SelectedMonth>
        <div v-else>
          <Transition name="fade" mode="out-in">
            <div :key="dateToShow">
              <h2>{{ dateToShow }}</h2>
            </div>
          </Transition>
        </div>
      </Transition>
      <div v-if="calendarView" class="navigation-container">
        <MonthNavigation
          @next="store.nextMonth"
          @previous="store.previousMonth"
        ></MonthNavigation>
      </div>
      <div v-if="!calendarView" class="navigation-container">
        <img
          src="../../assets/back2.svg"
          title="Back to calendar"
          alt="Back arrow"
          class="nav-button"
          id="back-button"
          @click="toggleBacktoCalendar"
        />
      </div>
    </TopContainer>
    <MainContainer id="main-container">
      <Transition name="fade" mode="out-in">
        <CalendarBody
          class="main-container-item"
          v-if="calendarView"
          :startIndex="store.startIndex"
          :monthDays="store.monthDays"
          @daySelected="toggleDayView"
        ></CalendarBody>

        <DayHabitList
          class="main-container-item"
          v-else
          :day="selectedDay"
        ></DayHabitList
      ></Transition>
    </MainContainer>
  </div>
</template>

<script lang="ts">
import CalendarBody from './CalendarBody.vue'
import TopContainer from '@/components/TopContainer.vue'
import MainContainer from '@/components/MainContainer.vue'
import SelectedMonth from './SelectedMonth.vue'
import MonthNavigation from './MonthNavigation.vue'
import DayHabitList from '@/components/DayHabitList.vue'
import { useRouter, useRoute } from 'vue-router'
import {
  formatDate,
  getCurrentDayString,
  isSameDay,
  validateDate,
} from '@/utils/dateUtils'
import { useCurrentWeek } from '@/stores/dayStore'
import { Ref, ref, watch, computed } from 'vue'
import Day from '@/utils/day'

export default {
  components: {
    CalendarBody,
    TopContainer,
    MainContainer,
    SelectedMonth,
    MonthNavigation,
    DayHabitList,
  },
  props: ['date'],
  setup() {
    const store = useCurrentWeek()
    const router = useRouter()
    const route = useRoute()
    const calendarView = ref(true)
    const selectedDay: Ref<Day> = ref(new Day(new Date()))
    const dateToShow = computed(() => {
      const dateString = selectedDay.value
        ? getCurrentDayString(selectedDay.value.date)
        : getCurrentDayString(new Date())
      if (dateString) {
        return dateString
      } else {
        return 'Cannot get selected Date'
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
    watch(
      () => route.params.date,
      newDate => {
        if (Array.isArray(newDate)) {
          newDate = newDate[0]
        }
        if (validateDate(newDate)) {
          const date = new Date(newDate)
          date.setHours(0, 0, 0, 0)
          const current = store.monthDays.find(
            day => formatDate(day.date) === formatDate(date),
          )
          if (current) {
            selectedDay.value = current
          } else {
            store.monthDays = Day.getMonthDays(
              date.getFullYear(),
              date.getMonth(),
              store.habits,
            )
            selectedDay.value =
              store.monthDays.find(d => isSameDay(d.date, date)) ??
              new Day(new Date())
          }
          calendarView.value = false
        } else {
          router.push({ name: 'calendar' })
          calendarView.value = true
        }
      },
      { immediate: true },
    )

    const toggleDayView = (day: Day) => {
      calendarView.value = !calendarView.value
      selectedDay.value = day
      const dateString = formatDate(day.date)
      router.push({ name: 'CalendarView', params: { date: dateString } })
    }

    const toggleBacktoCalendar = () => {
      router.push({ name: 'calendar' })
      calendarView.value = true
    }
    return {
      store,
      calendarView,
      selectedDay,
      dateToShow,
      toggleDayView,
      toggleBacktoCalendar,
    }
  },
}
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
#main-container {
  display: flex;
  justify-content: center;
}
.main-container-item {
  max-width: 500px;
  width: 100%;
}
.navigation-container {
  display: flex;
  justify-content: end;
  align-content: end;
  min-width: 108px;
}
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
