<script>
import WeekDayButtons from '@/components/WeekDayButtons.vue'
import SelectedDay from '@/components/SelectedDay.vue'
import MainContainer from '@/components/MainContainer.vue'
import TopContainer from '@/components/TopContainer.vue'
import { useCurrentWeek } from '@/stores/dayStore'
import { adjustDayIndex } from '@/utils/dateUtils'
import SelectedDayHabitList from '@/components/SelectedDayHabitList.vue'

export default {
  components: {
    WeekDayButtons,
    SelectedDay,
    MainContainer,
    TopContainer,
    SelectedDayHabitList,
  },
  props: ['date'],
  mounted() {
    const store = useCurrentWeek()
    const urlDate = new Date(this.date)
    if (!isNaN(urlDate.getTime())) {
      store.activeIndex.index = adjustDayIndex(urlDate)
      store.setSelectedDay(urlDate)
    }
  },
  methods: {
    handleDateSelected(date) {
      const store = useCurrentWeek()
      store
      this.$router.push({ name: 'HomeView', params: { date } })
    },
  },
  setup() {
    const store = useCurrentWeek()
    return { store }
  },
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
        <SelectedDayHabitList
          id="habit-list"
          :day="store.dayWeek[store.activeIndex.index]"
        ></SelectedDayHabitList> </Transition
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
