<template>
  <div>
    <Transition mode="out-in" name="fade">
      <h2 :key="month">{{ month }}{{ year }}</h2>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'

export default defineComponent({
  name: 'SelectedMonth',

  setup() {
    const store = useCurrentWeek()
    const month = computed((): string => {
      return store.monthDays[0].date.toLocaleString('default', {
        month: 'long',
      })
    })
    const year = computed((): string => {
      return ' ' + store.monthDays[0].date.getFullYear()
    })
    return { month, year }
  },
})
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
</style>
