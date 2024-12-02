<template>
  <div id="form-container">
    <form id="add-habit-form" @submit.prevent="createHabit">
      <label for="category">Category*</label>
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
          src="/src/assets/add2.svg"
          title="Add category"
          alt="Plus sign"
          @click="addingCategory = !addingCategory"
        />
        <img
          id="remove-category-button"
          class="nav-button"
          src="/src/assets/trash1.svg"
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
      <label for="name" required>Habit name*</label>
      <input
        placeholder="e.g. Running"
        id="name"
        type="text"
        maxlength="20"
        v-model="habitName"
      />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="description"
        v-model="habitDescription"
      ></textarea>
      <label for="weekday-select-container">Select habit activity days*</label>
      <div id="weekday-select-container">
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SuccessMessage from '../reusable/SuccessMessage.vue'
import Habit from '@/utils/habits'
import { useCurrentWeek } from '@/stores/dayStore'
import CategorySelect from '../reusable/CategorySelect.vue'
import AddCategoryForm from './AddCategoryForm.vue'
import ErrorMessage from '../reusable/ErrorMessage.vue'
import Category from '@/utils/category'

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
    const userId = 1 // Placeholder - will need updates if app needs accept multiple users
    const habitName = ref('')
    const habitDescription = ref('')
    const selectedDays = ref([])
    const habitCategory = ref('Select a category')
    const addingCategory = ref(false)
    const handleCategoryAdded = (category: Category): void => {
      habitCategory.value = category.name
      addingCategory.value = false
      message.value = 'Category added succesfuly!'
      success.value = true
    }
    const handleCategoryRemove = (): void => {
      const categoryToDelete = store.categories.find(
        (category: Category) => category.name === habitCategory.value,
      )
      if (categoryToDelete) {
        store.categories = store.categories.filter(
          (category: Category) => category.id !== categoryToDelete.id,
        )
        message.value = 'Category Removed Succesfuly!'
        success.value = true
      } else {
        message.value = 'Select a category to remove!'
        error.value = true
      }
    }
    const createHabit = (): void => {
      let habitId = store.habits.length + 1
      while (store.habits.some((habit: Habit) => habit.id === habitId)) {
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
        const added = store.addHabit(habit, selectedDays.value)
        if (added === true) {
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
    const resetError = (): void => {
      message.value = ''
      error.value = false
    }
    const resetSuccess = (): void => {
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
#name {
  width: 95%;
  max-width: 500px;
}
#description {
  width: 95%;
  height: auto;
  min-height: 100px;
  max-height: 100px;
  max-width: 475px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
  color: #333;
  box-sizing: border-box;
}
#category-select-container {
  display: flex;
  width: 95%;
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
.submit-button {
  max-width: 463px;
  width: 463px;
  border-radius: 10px;
  margin-top: 10px;
  height: 40px;
  bottom: 10px;
  justify-self: flex-end;
}
#form-container {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  height: 490px;
  border: 2px solid rgba(0, 0, 0, 0.035);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.041);
}
form {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}
@media (max-width: 500px) {
  #form-container {
    width: auto;
  }
  form {
    width: 100%;
  }
  .submit-button {
    width: 100%;
  }
  #description {
    max-width: 95%;
  }
}
</style>
