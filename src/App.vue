<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink title="habits" to="/habits" active-class="active-link">
          <img src="./assets/list.svg" />
        </RouterLink>
        <RouterLink title="home" to="/" active-class="active-link">
          <img src="./assets/home.svg" />
        </RouterLink>
        <RouterLink title="calendar" to="/calendar" active-class="active-link">
          <img src="./assets/calendar.svg" />
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
nav {
  width: 100vw;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
  padding: 0 1rem;
}
nav img {
  max-width: 50px;
  padding: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.4);
  transition:
    transform 0.2s ease,
    border-color 0.3s ease;
}

/* Hover effect for img buttons */
nav img:hover {
  transform: scale(1.1);
  background-color: #466e9e8b;
}

/* Active (clicked) effect for img buttons */
nav img:active {
  transform: scale(0.95);
  border-color: #42b983;
  background-color: #42b983;
}
.active-link img {
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.3);
}
/* @media (min-width: 1024px) {
} */
</style>
