<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/habits"><img src="./assets/list.svg" /></RouterLink>
        <RouterLink to="/"><img src="./assets/home.svg" /></RouterLink>
        <RouterLink to="/calendar"
          ><img src="./assets/calendar.svg"
        /></RouterLink>
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
img {
  max-width: 60px;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  justify-items: center;
  align-items: center;
  background-color: rgba(204, 213, 176, 0.352);
  width: auto;
  border-radius: 50px;
  border: 2px solid black;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
  padding: 5px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  border-radius: 60px;
}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
