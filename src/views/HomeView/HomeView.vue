<template>
  <div>
    <TopContainer>
      <SelectedDay id="selected-day"></SelectedDay>
      <div class="top-container-item">
        <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
      </div>
    </TopContainer>
    <MainContainer id="main-container">
      <div class="main-container-item">
        <DayHabitList
          :day="store.dayWeek[store.activeIndex.index]"
        ></DayHabitList>
      </div>
    </MainContainer>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeekDayButtons from './WeekDayButtons.vue'
import SelectedDay from './SelectedDay.vue'
import TopContainer from '@/components/TopContainer.vue'
import MainContainer from '@/components/MainContainer.vue'
import { useCurrentWeek } from '@/stores/dayStore'
import {
  adjustDayIndex,
  validateDate,
  isSameDay,
  getWeekDates,
} from '@/utils/dateUtils'
import DayHabitList from '@/components/DayHabitList.vue'
import Day from '@/utils/day'

export default {
  components: {
    WeekDayButtons,
    SelectedDay,
    MainContainer,
    TopContainer,
    DayHabitList,
  },
  props: {
    date: {
      type: String,
      required: false,
    },
  },
  setup() {
    const store = useCurrentWeek()
    const route = useRoute()
    const router = useRouter()
    const handleDateSelected = (date: string) => {
      router.push({ name: 'HomeView', params: { date } })
    }
    watch(
      () => route.params.date,
      newDate => {
        if (Array.isArray(newDate)) {
          newDate = newDate[0]
        }
        if (validateDate(newDate)) {
          const date = new Date(newDate)
          date.setHours(0, 0, 0, 0)
          const current = store.dayWeek.find(day => isSameDay(day.date, date))
          if (current) {
            store.setSelectedDay(date)
            store.activeIndex.index = adjustDayIndex(date)
          } else {
            store.dayWeek = Day.getWeekdays(getWeekDates(date), store.habits)
            store.setSelectedDay(date)
            store.activeIndex.index = adjustDayIndex(date)
          }
        } else {
          router.push({ name: 'home' })
          const updatedDate = new Date()
          updatedDate.setHours(0, 0, 0, 0)
          store.activeIndex.index = adjustDayIndex(updatedDate)
          const newDay = new Day(updatedDate)
          store.habits.forEach(habit => {
            Day.addHabitToDays([newDay], habit)
          })
          Day.saveWeekdays([newDay])
        }
      },
      { immediate: true },
    )
    return { store, handleDateSelected }
  },
}
</script>

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
#habit-list::-webkit-scrollbar {
  display: none;
}
#main-container {
  display: flex;
  justify-content: center;
}
.main-container-item {
  max-width: 500px;
  width: 100%;
}
.top-container-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
