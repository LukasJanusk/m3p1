<script setup lang="ts">
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
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" class="view" />
    </transition>
  </router-view>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.1, 0.1, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
