<template>
  <div>
    <form id="add-habit-form" @submit.prevent="createHabit">
      <label for="category">Category*</label><br />
      <div id="category-select-container">
        <CategorySelect
          v-model="habitCategory"
          :categories="store.categories"
          :showAll="false"
          :showSelectCategory="true"
        ></CategorySelect>
        <img
          id="add-category-button"
          class="nav-button"
          src="../assets/add2.svg"
          title="Add category"
          alt="Plus sign"
          @click="addingCategory = !addingCategory"
        />
        <img
          id="remove-category-button"
          class="nav-button"
          src="../assets/trash1.svg"
          title="Remove category"
          alt="Trashcan"
          @click="handleCategoryRemove"
        />
        <Transition name="fade" mode="out-in">
          <AddCategoryForm
            v-if="addingCategory"
            @close-form="addingCategory = false"
            @category-added="handleCategoryAdded"
          ></AddCategoryForm
        ></Transition>
      </div>
      <label for="name" required>Habit name*</label><br />
      <input
        placeholder="e.g. Running"
        id="name"
        type="text"
        maxlength="20"
        v-model="habitName"
      /><br />
      <label for="description">Description</label><br />
      <textarea
        id="description"
        placeholder="description"
        v-model="habitDescription"
      ></textarea
      ><br />

      <label for="weekday-select">Select habit activity days*</label>
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
      <button class="submit-button" @click.stop type="submit" id="submit">
        Add Habit
      </button>
    </form>
    <SuccessMessage
      :message="message"
      v-if="success"
      @dismiss="resetSuccess"
    ></SuccessMessage>
    <ErrorMessage
      v-if="error"
      :message="message"
      @dismiss="resetError"
    ></ErrorMessage>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SuccessMessage from './SuccessMessage.vue'
import Habit from '@/utils/habits'
import { useCurrentWeek } from '@/stores/dayStore'
import CategorySelect from './CategorySelect.vue'
import AddCategoryForm from './AddCategoryForm.vue'
import ErrorMessage from './ErrorMessage.vue'

export default defineComponent({
  name: 'HabitForm',
  components: {
    SuccessMessage,
    CategorySelect,
    AddCategoryForm,
    ErrorMessage,
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
    const error = ref(false)
    const userId = 1 // Placeholder
    const habitName = ref('')
    const habitDescription = ref('')
    const selectedDays = ref([])
    const habitCategory = ref('Select a category')
    const isHidden = ref(false)
    const isFocused = ref(false)
    const addingCategory = ref(false)
    const handleCategoryAdded = category => {
      habitCategory.value = category.name
      addingCategory.value = false
      message.value = 'Category added succesfuly!'
      success.value = true
    }
    const handleCategoryRemove = () => {
      const categoryToDelete = store.categories.find(
        category => category.name === habitCategory.value,
      )
      if (categoryToDelete) {
        store.categories = store.categories.filter(
          category => category.id !== categoryToDelete.id,
        )
        message.value = 'Category Removed Succesfuly!'
        success.value = true
      } else {
        message.value = 'Select a category to remove!'
        error.value = true
      }
    }
    const createHabit = () => {
      let habitId = store.habits.length + 1
      while (store.habits.some(habit => habit.id === habitId)) {
        habitId++
      }
      if (!habitName.value || !habitCategory.value || !selectedDays.value) {
        message.value = 'Please fill all required fields!'
        error.value = true
      } else {
        const habit = new Habit(
          habitId,
          habitName.value,
          userId,
          habitCategory.value,
          habitDescription.value,
          selectedDays.value,
        )
        // update for runtime and save to local storage
        const added = store.addHabit(habit, selectedDays.value)
        if (added === true) {
          // reset form values
          message.value = 'Habit added successfuly!'
          success.value = true
          habitName.value = ''
          habitDescription.value = ''
          selectedDays.value = []
          habitCategory.value = ''
        } else {
          message.value = 'Failed to save Habit!'
          error.value = true
        }
      }
    }
    const resetError = () => {
      message.value = ''
      error.value = false
    }
    const resetSuccess = () => {
      message.value = ''
      success.value = false
    }
    return {
      store,
      success,
      error,
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
      handleCategoryAdded,
      handleCategoryRemove,
      resetError,
      resetSuccess,
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
