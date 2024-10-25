<script setup>
import WeekDayButtons from '@/components/WeekDayButtons.vue'
// import { ref } from 'vue'
// import { getCurrentWeek } from '@/utils/dateUtils'

// const currentWeek = ref(getCurrentWeek())
const handleDateSelected = date => {
  console.log('Selected Date:', date)
}
</script>

<template>
  <main>
    <div>
      <WeekDayButtons @dateSelected="handleDateSelected"></WeekDayButtons>
    </div>
  </main>
</template>
