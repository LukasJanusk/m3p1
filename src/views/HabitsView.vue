<template>
  <div class="habit-container">
    <h1>My habits</h1>
    <img id="add-habit" title="Add new habit" src="../assets/add.svg" />
  </div>
</template>

<style scoped>
#add-habit {
  height: 60px;
  position: absolute;
  left: 80%;
  border-radius: 20px;
}
#add-habit:hover {
  background-color: aquamarine;
}
@media (min-width: 1024px) {
  .habit-container {
    border: 1px solid red;
    height: 500px;
  }
}
</style>
