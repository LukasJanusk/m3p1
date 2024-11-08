<template>
  <div>
    <form id="add-habit-form" @submit.prevent="createHabit">
      <label for="name" required>Habit name</label><br />
      <input
        placeholder="e.g. Running"
        id="name"
        type="text"
        maxlength="30"
        v-model="habitName"
      /><br />
      <label for="description">Description</label><br />
      <textarea
        id="description"
        placeholder="description"
        v-model="habitDescription"
      ></textarea
      ><br />
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
        <img
          id="edit-category-button"
          class="nav-button"
          src="../assets/edit5.svg"
          title="Edit category"
          alt="Pencil"
        />
        <img
          id="remove-category-button"
          class="nav-button"
          src="../assets/trash1.svg"
          title="Remove category"
          alt="Trashcan symbol"
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
          <input
            class="checkbox"
            type="checkbox"
            :value="index"
            v-model="selectedDays"
          />
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
    const createHabit = () => {
      let habitId = store.habits.length + 1
      while (store.habits.some(habit => habit.id === habitId)) {
        habitId++
      }
      const habit = new Habit(
        habitId,
        habitName.value,
        userId,
        habitCategory.value,
        habitDescription.value,
        selectedDays.value,
      )
      // update for runtime and save to local storage
      store.addHabit(habit, selectedDays.value)
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
      createHabit,
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
#add-habit-form > input,
textarea,
#category-select-container {
  margin-top: 5px;
  margin-bottom: 5px;
}
input {
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
}
.checkbox {
  margin-left: auto;
  width: 20px;
  height: 20px;
  accent-color: rgb(96, 199, 165);
  cursor: pointer;
}
.checkbox:hover {
  accent-color: rgb(80, 168, 139);
}
#description {
  width: 200px;
  height: 50px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
  color: #333;
}
#category-select-container {
  display: flex;
}
#remove-category-button {
  height: 22px;
  margin-left: 5px;
  border-radius: 0.5rem;
}
#edit-category-button {
  height: 22px;
  margin-left: 5px;
  border-radius: 0.5rem;
}
#remove-category-button:hover {
  background: rgba(201, 37, 37, 0.637);
}
#remove-category-button:active {
  background: rgba(255, 0, 0, 0.662);
  border-color: red;
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
@media (max-width: 500px) {
  #name {
    width: 95%;
  }
  #description {
    width: 95%;
  }
  #submit {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
  }
}
@media (min-width: 1280px) {
  #weekday-select {
    display: flex;
    flex-direction: row;
  }
}
</style>
