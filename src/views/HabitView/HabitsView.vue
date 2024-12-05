<template>
  <div>
    <TopContainer id="title">
      <Transition name="fade" mode="out-in">
        <h1 v-if="formVisible">{{ title }}</h1>
        <h1 v-else>{{ title }}</h1>
      </Transition>
      <div id="add-habit" class="nav-button" @click="showForm">
        <img
          v-if="!formVisible"
          title="Add new habit"
          src="/src/assets/add2.svg"
          alt="Plus sign"
        />
        <img
          v-if="formVisible"
          title="Back to habits"
          src="/src/assets/back2.svg"
          alt="Back arrow"
        /></div
    ></TopContainer>
    <MainContainer id="main-container"
      ><Transition name="fade" mode="out-in"
        ><div class="main-container-item" v-if="!formVisible">
          <CategorySelect
            v-model="habitCategory"
            :categories="store.categories"
          ></CategorySelect>
          <HabitList :category="habitCategory" v-if="!formVisible"></HabitList>
        </div>
        <div class="main-container-item" v-else>
          <HabitForm></HabitForm>
        </div>
      </Transition>
    </MainContainer>
  </div>
</template>

<script setup lang="ts">
import HabitForm from './HabitForm.vue'
import HabitList from './HabitList.vue'
import TopContainer from '@/components/TopContainer.vue'
import MainContainer from '@/components/MainContainer.vue'
import CategorySelect from '@/components/CategorySelect.vue'
import { ref, computed } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'

const formVisible = ref(false)
const title = computed(() => (formVisible.value ? 'Add Habit' : 'My Habits'))
const showForm = () => {
  formVisible.value = !formVisible.value
}
const habitCategory = ref('All habits')
const store = useCurrentWeek()
</script>

<style>
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
#main-container {
  display: flex;
  justify-content: center;
}
.main-container-item {
  max-width: 500px;
  width: 100%;
}
@media (min-width: 1024px) {
  .habit-container {
    height: 500px;
  }
}
</style>
