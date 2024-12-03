<template>
  <div>
    <form id="edit-habit-form" @submit.prevent="updateHabit">
      <h2>Edit Habit</h2>
      <label for="habit-name">Name*</label>
      <img
        id="close-button"
        src="/src/assets/close.svg"
        alt="X symbol"
        title="close"
        @click="closeForm"
      /><br />
      <input
        type="text"
        maxlength="30"
        id="habit-name"
        v-model="habitName"
      /><br />
      <label for="description">Description</label><br />
      <textarea id="description" v-model="habitDescription"></textarea><br />
      <div id="category-select-container">
        <p id="category-label" for="category">Category*</p>
        <CategorySelect
          v-model="habitCategory"
          :categories="categories"
          :showAll="false"
        ></CategorySelect>
      </div>
      <div id="weekday-select-container">
        <p>Weekdays*</p>
        <div id="weekday-select" v-for="(day, index) in weekdays" :key="index">
          <label>
            <input
              class="checkbox"
              type="checkbox"
              :value="index"
              v-model="habitWeekdays"
            />
            {{ day }}
          </label>
        </div>
      </div>
      <button class="submit-button" @click.stop type="submit" id="submit">
        Save Habit
      </button>
      <ErrorMessage
        v-if="error"
        :message="message"
        @dismiss="resetError"
      ></ErrorMessage>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import Habit from '@/utils/habits'
import CategorySelect from '../reusable/CategorySelect.vue'
import Category from '@/utils/category'
import ErrorMessage from '../reusable/ErrorMessage.vue'

export default defineComponent({
  name: 'EditHabitForm',
  emits: ['update', 'close-form'],
  components: { CategorySelect, ErrorMessage },
  props: {
    habit: {
      type: Habit,
      required: true,
    },
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]
    const message = ref('')
    const error = ref(false)
    const habitName = ref(props.habit.name)
    const habitDescription = ref(props.habit.description)
    const habitWeekdays = ref(props.habit.weekdays)
    const habitCategory = ref(props.habit.category)
    const updateHabit = (): void => {
      if (
        habitName.value.length < 1 ||
        habitWeekdays.value.length < 1 ||
        habitCategory.value.length < 1
      ) {
        message.value = 'Please fill all required fields!'
        error.value = true
        return
      }
      emit(
        'update',
        new Habit(
          props.habit.id,
          habitName.value,
          1,
          habitCategory.value,
          habitDescription.value,
          habitWeekdays.value,
        ),
      )
    }
    const resetError = () => {
      message.value = ''
      error.value = false
    }
    const closeForm = (): void => {
      emit('close-form')
    }
    return {
      message,
      error,
      weekdays,
      habitName,
      habitDescription,
      habitWeekdays,
      habitCategory,
      closeForm,
      updateHabit,
      resetError,
    }
  },
})
</script>

<style scoped>
#edit-habit-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  min-width: 200px;
  max-width: 90vw;
  width: 350px;
  border: 2px solid black;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.95),
    rgba(104, 149, 65, 0.95)
  );
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
#submit {
  border-radius: 0.5rem;
  width: 100%;
  margin-top: 10px;
}
#close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  height: 20px;
  border-radius: 0.3rem;
  transition: transform 0.3s ease;
}
#close-button:hover {
  background-color: rgba(241, 31, 31, 0.489);
  transform: scale(1.05);
}
#close-button:active {
  background-color: rgba(241, 31, 31, 0.489);
  transform: scale(0.99);
}
#habit-name {
  width: 95%;
  margin-top: 5px;
  margin-bottom: 10px;
}
textarea {
  max-width: 99%;
  width: 95%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.37);
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
  color: #333;
  margin-top: 10px;
  margin-bottom: 5px;
}
#category-select-container {
  width: 95%;
  margin-top: 10px;
  margin-bottom: 5px;
}
#category-label {
  margin-top: 10px;
  margin-bottom: 10px;
}
#weekday-select-container {
  margin-top: 10px;
  margin-bottom: 15px;
}
input {
  background-color: rgba(255, 255, 255, 0.37);
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
</style>
