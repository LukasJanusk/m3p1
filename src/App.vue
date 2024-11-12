<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink title="habits" to="/habits" active-class="active-link">
          <img src="./assets/list.svg" alt="Habits" />
        </RouterLink>
        <RouterLink title="home" to="/" active-class="active-link">
          <img src="./assets/home.svg" alt="Home" />
        </RouterLink>
        <RouterLink title="calendar" to="/calendar" active-class="active-link">
          <img src="./assets/calendar.svg" alt="Calendar" />
        </RouterLink>
      </nav>
    </div>
  </header>
  <Transition name="fade" mode="out-in"> <RouterView /></Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
