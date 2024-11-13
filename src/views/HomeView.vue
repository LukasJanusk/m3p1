<template>
  <div>
    <TopContainer>
      <SelectedDay id="selected-day"></SelectedDay>
      <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
    </TopContainer>
    <MainContainer>
      <DayHabitList
        :day="store.dayWeek[store.activeIndex.index]"
      ></DayHabitList>
    </MainContainer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeekDayButtons from '@/components/WeekDayButtons.vue'
import SelectedDay from '@/components/SelectedDay.vue'
import MainContainer from '@/components/MainContainer.vue'
import TopContainer from '@/components/TopContainer.vue'
import { useCurrentWeek } from '@/stores/dayStore'
import { adjustDayIndex } from '@/utils/dateUtils'
import DayHabitList from '@/components/DayHabitList.vue'

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
</style>
