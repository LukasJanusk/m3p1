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
    <SelectedDay id="selected-day"></SelectedDay>
    <div id="weekday-buttons">
      <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
    </div>
    <HabitList id="habit-list"></HabitList>
  </main>
</template>
<style scoped>
.main {
  position: absolute;
  top: 0;
}
#selected-day {
  margin-left: 10px;
  margin-bottom: 5px;
}
#habit-list {
  padding: 10px;
  height: 500px;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.7),
    rgba(164, 191, 82, 0.5)
  );
  width: auto;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
#weekday-buttons {
  background: linear-gradient(
    135deg,
    rgba(81, 80, 80, 0.7),
    rgba(112, 118, 95, 0.5)
  );
  border-radius: 20px 20px 0px 0px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
