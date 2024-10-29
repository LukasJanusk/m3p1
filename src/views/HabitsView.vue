<script setup>
import HabitForm from '@/components/HabitForm.vue'
</script>
<template>
  <div id="title">
    <h1>My habits</h1>
    <div id="add-habit">
      <img title="Add new habit" src="../assets/add.svg" />
    </div>
  </div>
  <HabitForm></HabitForm>
  <div class="habit-container"></div>
</template>

<style scoped>
#title {
  display: flex;
  justify-content: space-between;
}
#add-habit img {
  width: 100%;
}
#add-habit {
  margin-top: 10px;
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
.habit-container {
  border: 1px solid red;
  height: 500px;
}
@media (min-width: 1024px) {
  .habit-container {
    height: 500px;
  }
}
</style>
