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

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeekDayButtons from '@/components/home/WeekDayButtons.vue'
import SelectedDay from '@/components/home/SelectedDay.vue'
import MainContainer from '@/components/reusable/MainContainer.vue'
import TopContainer from '@/components/reusable/TopContainer.vue'
import { useCurrentWeek } from '@/stores/dayStore'
import { adjustDayIndex, validateDate, formatDate } from '@/utils/dateUtils'
import DayHabitList from '@/components/reusable/DayHabitList.vue'

export default {
  components: {
    WeekDayButtons,
    SelectedDay,
    MainContainer,
    TopContainer,
    DayHabitList,
  },
  setup() {
    const store = useCurrentWeek()
    const route = useRoute()
    const router = useRouter()
    const date = ref(
      route.params.date || new Date().toISOString().split('T')[0],
    )
    onMounted(() => {
      const urlDate = new Date(date.value)
      if (!isNaN(urlDate.getTime())) {
        store.activeIndex.index = adjustDayIndex(urlDate)
        store.setSelectedDay(urlDate)
      }
    })
    const handleDateSelected = date => {
      router.push({ name: 'HomeView', params: { date } })
    }
    watch(
      () => route.params.date,
      newDate => {
        if (validateDate(newDate)) {
          const date = new Date(newDate)
          date.setHours(0, 0, 0, 0)
          const current = store.dayWeek.find(
            day => formatDate(day.date) === formatDate(date),
          )
          if (current) {
            store.selectedDay.value = date
            store.activeIndex.index = adjustDayIndex(date)
          }
        } else {
          router.push({ name: 'home' })
          const updatedDate = new Date()
          updatedDate.setHours(0, 0, 0, 0)
          store.selectedDay = updatedDate
          store.activeIndex.index = adjustDayIndex(updatedDate)
        }
      },
      { immediate: true },
    )
    return { store, date, handleDateSelected }
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
