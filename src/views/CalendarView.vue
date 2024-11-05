<template>
  <div class="calendar">
    <h1>This is an calendar page</h1>
  </div>
  <CalendarBody></CalendarBody>
</template>

<script setup>
import CalendarBody from '@/components/CalendarBody.vue'
</script>
<style>
@media (min-width: 1024px) {
  .calendar {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
