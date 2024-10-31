<script setup>
import HabitForm from '@/components/HabitForm.vue'
import HabitList from '@/components/HabitList.vue'
import { ref, computed } from 'vue'

const show = ref(false)
const title = computed(() => (show.value ? 'Add Habit' : 'My Habits'))
const showForm = () => {
  show.value = !show.value
}
</script>
<template>
  <div id="title">
    <Transition name="fade" mode="out-in">
      <h1 v-if="show">{{ title }}</h1>
      <h1 v-else>{{ title }}</h1>
    </Transition>
    <div id="add-habit" @click="showForm">
      <img v-if="!show" title="Add new habit" src="../assets/add2.svg" />
      <img v-if="show" title="Back to habits" src="../assets/back2.svg" />
    </div>
  </div>
  <div class="bottom-container">
    <Transition name="fade" mode="out-in">
      <HabitList v-if="!show"></HabitList>
      <HabitForm v-else></HabitForm>
    </Transition>
  </div>
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
  height: 100px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    135deg,
    rgba(81, 80, 80, 0.7),
    rgba(112, 118, 95, 0.5)
  );
  border-radius: 20px 20px 0px 0px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  min-width: 320px;
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
  border-radius: 30px;
  max-width: 50px;
  border: 2px solid transparent; /* Border for visual effect */
  cursor: pointer;
  border-radius: 1rem;
  transition:
    transform 0.2s ease,
    border-color 0.3s ease;
}
.bottom-container {
  min-width: 320px;
  padding: 10px;
  height: 500px;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.7),
    rgba(164, 191, 82, 0.5)
  );
  width: auto;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
#add-habit:hover {
  transform: scale(1.1);
  background-color: #466e9e8b;
  border-radius: 1rem;
}

/* Active (clicked) effect for img buttons */
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
