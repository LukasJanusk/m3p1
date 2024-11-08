<template>
  <form id="edit-habit-form" @submit.prevent="updateHabit">
    <h2>Edit Habit</h2>
    <label for="habit-name">Name</label>
    <img
      id="close-button"
      src="../assets/close.svg"
      alt="x symbol in a square"
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
      <CategorySelect
        id="category"
        v-model="habitCategory"
        :categories="categories"
      ></CategorySelect>
    </div>
    <label for="weekday-select">Select habit activity days</label>
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
    <button @click.stop type="submit" id="submit">Save Habit</button>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Habit from '@/utils/habits'
import CategorySelect from './CategorySelect.vue'
export default defineComponent({
  name: 'EditHabitForm',
  components: { CategorySelect },
  props: {
    habit: {
      type: Habit,
      required: true,
    },
    categories: {
      type: Array,
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
    const habitName = ref(props.habit.name)
    const habitDescription = ref(props.habit.description)
    const habitWeekdays = ref(props.habit.weekdays)
    const habitCategory = ref(props.habit.category)
    const updateHabit = () => {
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

    const closeForm = () => {
      emit('close-form')
    }
    return {
      weekdays,
      habitName,
      habitDescription,
      habitWeekdays,
      habitCategory,
      closeForm,
      updateHabit,
    }
  },
})
</script>
<style scoped>
#submit {
  border-radius: 0.5rem;
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
textarea {
  max-width: 99%;
  width: 90%;
  width: 200px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.37);
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
  color: #333;
}
input {
  background-color: rgba(255, 255, 255, 0.37);
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
}
#edit-habit-form {
  position: fixed;
  padding: 10px;
  min-width: 200px;
  max-width: 90vw;
  border: 2px solid black;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.9),
    rgba(122, 143, 60, 0.9)
  );
  width: auto;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
@media (max-width: 500px) {
  #edit-habit-form {
    position: absolute;
    top: 140px;
    left: 10px;
    width: 90vw;
    height: 500px;
  }
  #habit-name {
    width: 80vw;
  }
  textarea {
    width: 80vw;
  }
  #category {
    width: 80vw;
  }
  #submit {
    width: 100%;
    height: 30px;
    padding: 5px;
    margin-top: 20px;
    margin-right: 20px;
  }
}
@media (max-width: 1279px) {
  #add-habit-form {
    left: auto;
    top: 310px;
  }
}
@media (min-width: 1280px) {
  #add-habit-form {
    left: calc(50% - 640px + 190px);
  }
}
</style>
