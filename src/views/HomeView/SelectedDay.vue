<template>
  <div>
    <transition name="fade" tag="div" mode="out-in">
      <div v-if="dateToDisplay" class="date-container">
        {{ dateToDisplay }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { getCurrentDayString } from '@/utils/dateUtils'
import { useCurrentWeek } from '@/stores/dayStore'

export default defineComponent({
  name: 'SelectedDate',

  setup() {
    const store = useCurrentWeek()
    const dateToDisplay = computed((): string => {
      return getCurrentDayString(store.dayWeek[store.activeIndex.index].date)
    })
    return { dateToDisplay }
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
