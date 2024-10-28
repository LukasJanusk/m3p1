<script setup>
import WeekDayButtons from '@/components/WeekDayButtons.vue'
import SelectedDay from '@/components/SelectedDay.vue'
import HabitList from '@/components/HabitList.vue'
// import { ref } from 'vue'
// import { getCurrentDayString } from '@/utils/dateUtils'

// import { getCurrentWeek } from '@/utils/dateUtils'

// const currentWeek = ref(getCurrentWeek())

const handleDateSelected = dateObj => {
  console.log(dateObj)
}
</script>

<template>
  <main>
    <h1>Hello, {user.name}!</h1>
    <SelectedDay></SelectedDay>
    <div id="weekday-buttons">
      <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
    </div>
    <HabitList id="habit-list"></HabitList>
    <!-- <div class="habit-container">
      <label class="switch">
        <span>This is habit example 1</span>
        <input type="checkbox" id="toggle-checkbox" />
        <span class="slider"></span> </label
      ><br />
      <label class="switch">
        <span>This is habit example 2</span>
        <input type="checkbox" id="toggle-checkbox" />
        <span class="slider"></span>
      </label>
    </div> -->
  </main>
</template>
<style scoped>
#habit-list {
  padding: 10px;
  height: 500px;
  background-color: rgb(233, 206, 174);
  border-radius: 0px 0px 20px 20px;
}
#weekday-buttons {
  background-color: bisque;
  border-radius: 20px 20px 0px 0px;
  padding: 10px;
}
</style>
