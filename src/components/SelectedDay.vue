<template>
  <div>{{ dateToDisplay }}</div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { getCurrentDayString } from '@/utils/dateUtils'
import { useCurrentWeek } from '@/stores/week'

export default defineComponent({
  name: 'SelectedDate',

  setup() {
    const currentWeek = useCurrentWeek()
    const dateToDisplay = computed(() => {
      return getCurrentDayString(currentWeek.selectedDay)
    })
    return { dateToDisplay }
  },
})
</script>

<style scoped></style>
