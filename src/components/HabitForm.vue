<template>
  <div>
    <form id="add-habit-form" @submit.prevent="addHabit">
      <label for="name" required>Habit name</label><br />
      <input id="name" type="text" maxlength="30" v-model="habitName" /><br />
      <label for="description">Description</label><br />
      <textarea value="description" v-model="habitDescription"></textarea><br />
      <label for="category">Category</label><br />
      <div id="category-select-container">
        <CategorySelect
          id="category"
          v-model="habitCategory"
          :categories="store.categories"
        ></CategorySelect>
        <img
          id="add-category-button"
          class="nav-button"
          src="../assets/add2.svg"
          title="Add category"
          alt="Plus symbol inside rounded square"
          @click="addingCategory = !addingCategory"
        />
        <Transition name="fade" mode="out-in">
          <AddCategoryForm
            v-if="addingCategory"
            @close-form="addingCategory = false"
          ></AddCategoryForm
        ></Transition>
      </div>
      <label for="weekday-select">Select habit activity days</label>
      <div id="weekday-select" v-for="(day, index) in weekdays" :key="index">
        <label>
          <input type="checkbox" :value="index" v-model="selectedDays" />
          {{ day }}
        </label>
      </div>
      <button @click.stop type="submit" id="submit">Add Habit</button>
    </form>
    <NotificationMessage
      :message="message"
      v-if="success"
    ></NotificationMessage>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NotificationMessage from './NotificationSuccessMessage.vue'
import Habit from '@/utils/habits'
import { useCurrentWeek } from '@/stores/dayStore'
import Day from '@/utils/day'
import CategorySelect from './CategorySelect.vue'
import AddCategoryForm from './AddCategoryForm.vue'

export default defineComponent({
  name: 'HabitForm',
  components: {
    NotificationMessage,
    CategorySelect,
    AddCategoryForm,
  },
  setup() {
    const store = useCurrentWeek()
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]
    const message = ref('Habit added succesfully')
    const success = ref(false)
    const userId = 1 // Placeholder
    const habitName = ref('')
    const habitDescription = ref('')
    const selectedDays = ref([])
    const habitCategory = ref('')
    const isHidden = ref(false)
    const isFocused = ref(false)
    const addingCategory = ref(false)
    const addHabit = () => {
      const habit = new Habit(
        store.habits.length + 1,
        habitName.value,
        userId,
        habitCategory.value,
        habitDescription.value,
        selectedDays.value,
      )
      // update for runtime
      store.updateHabits(
        store.habits.length + 1,
        habitName.value,
        userId,
        habitCategory.value,
        habitDescription.value,
        selectedDays.value,
      )
      store.habits.push(habit)
      // update for the future
      store.saveHabits()
      Day.saveWeekdays(store.dayWeek)
      // reset form values
      success.value = true
      habitName.value = ''
      habitDescription.value = ''
      selectedDays.value = []
      habitCategory.value = ''
      // reset popup
      setTimeout(() => {
        success.value = false
      }, 4000)
    }
    return {
      store,
      success,
      message,
      weekdays,
      selectedDays,
      habitName,
      habitDescription,
      habitCategory,
      isHidden,
      isFocused,
      addingCategory,
      addHabit,
      NotificationMessage,
    }
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
textarea:hover {
  scale: 1.05;
}
input:hover,
select:hover {
  scale: 1.05;
}
#description {
  width: 200px;
  height: 50px;
  transition:
    width 0.3s ease,
    height 0.3s ease;
}
#category-select-container {
  display: flex;
}
#add-category-button {
  height: 22px;
  margin-left: 10px;
  border-radius: 0.5rem;
  /* box-shadow: 0px 2px 4px; */
  /* background: linear-gradient(30deg, rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0)); */
}
.focused {
  width: 80%;
  height: 300px;
  padding-left: 50px;
  scale: 1;
  justify-self: center;
  align-self: center;
}
.hidden {
  display: none;
}
.fade-enter-active {
  transition: opacity 0.5s ease-in;
}
.fade-leave-active {
  transition: opacity 1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
