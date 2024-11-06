<template>
  <div id="navigation">
    <div class="nav-button">
      <img
        @click="previousMonth"
        src="../assets/left.svg"
        title="previous month"
        alt="arrow left"
      />
    </div>
    <div class="nav-button">
      <img
        @click="nextMonth"
        src="../assets/right.svg"
        title="next month"
        alt="arrow right"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'

export default defineComponent({
  name: 'MonthNavigation',

  setup() {
    const { previousMonth, nextMonth } = useCurrentWeek()
    return { previousMonth, nextMonth }
  },
})
</script>

<style scoped>
img {
  width: 100%;
}
#navigation {
  display: flex;
  flex-wrap: nowrap;
}
</style>
