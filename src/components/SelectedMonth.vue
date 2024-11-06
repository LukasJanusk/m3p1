<template>
  <h2>{{ month }}{{ year }}</h2>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'

export default defineComponent({
  name: 'SelectedMonth',

  setup() {
    const { monthDays } = useCurrentWeek()
    const month = computed(() => {
      return monthDays[0].date.toLocaleString('default', { month: 'long' })
    })
    const year = computed(() => {
      return ' ' + monthDays[0].date.getFullYear()
    })
    return { month, year }
  },
})
</script>

<style scoped></style>
