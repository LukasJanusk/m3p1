<script setup>
import HabitForm from '@/components/HabitForm.vue'
import HabitList from '@/components/HabitList.vue'
import TopContainer from '@/components/TopContainer.vue'
import MainContainer from '@/components/MainContainer.vue'
import { ref, computed } from 'vue'

const show = ref(false)
const title = computed(() => (show.value ? 'Add Habit' : 'My Habits'))
const showForm = () => {
  show.value = !show.value
}
</script>
<template>
  <TopContainer id="title">
    <Transition name="fade" mode="out-in">
      <h1 v-if="show">{{ title }}</h1>
      <h1 v-else>{{ title }}</h1>
    </Transition>
    <div id="add-habit" class="nav-button" @click="showForm">
      <img v-if="!show" title="Add new habit" src="../assets/add2.svg" />
      <img v-if="show" title="Back to habits" src="../assets/back2.svg" /></div
  ></TopContainer>
  <MainContainer>
    <Transition name="fade" mode="out-in">
      <HabitList v-if="!show"></HabitList>
      <HabitForm v-else></HabitForm>
    </Transition>
  </MainContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#title {
  display: flex;
  justify-content: space-between;
}
h1 {
  margin-left: 10px;
}
#add-habit img {
  width: 100%;
}
#add-habit {
  margin-top: 16px;
  height: 50px;
  max-width: 50px;
  border: 2px solid transparent;
  cursor: pointer;
  border-radius: 1rem;
  transition:
    transform 0.2s ease,
    border-color 0.3s ease;
}
#add-habit:hover {
  transform: scale(1.1);
  background-color: #466e9e8b;
  border-radius: 1rem;
}
#add-habit:active {
  transform: scale(0.95);
  border-color: #42b983;
  background-color: #42b983;
}
@media (min-width: 1024px) {
  .habit-container {
    height: 500px;
  }
}
</style>
