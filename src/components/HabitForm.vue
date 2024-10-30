<template>
  <div>
    <form id="add-habit-form" @submit.prevent="addHabit">
      <label for="name" required>Habit name</label><br />
      <input id="name" type="text" v-model="habitName" /><br />
      <label for="description">Description</label><br />
      <textarea id="description" v-model="habitDescription"></textarea><br />
      <label for="category">Category</label><br />
      <select id="category" v-model="habitCategory">
        <option value="sport">Sport</option>
        <option value="food">Eating</option>
        <option value="sleep">Sleep</option>
        <option value="learning">Learning</option></select
      ><br />
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
import { useHabits } from '@/stores/habitsStore.js'
import { defineComponent, ref } from 'vue'
import NotificationMessage from './NotificationMessage.vue'
import Habit from '@/utils/habits'

export default defineComponent({
  name: 'HabitForm',
  components: {
    NotificationMessage,
  },
  setup() {
    const { habits, saveHabits } = useHabits()
    console.log(habits[0].name)
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
    const userId = 1
    const habitName = ref('')
    const habitDescription = ref('')
    const selectedDays = ref([])
    const habitCategory = ref('')
    const addHabit = () => {
      console.log(habits.length)
      const habit = new Habit(
        habits.length + 1,
        habitName.value,
        userId,
        habitCategory.value,
        habitDescription.value,
        selectedDays.value,
      )
      habits.push(habit)
      saveHabits()
      success.value = true
      habitName.value = ''
      habitDescription.value = ''
      selectedDays.value = []
      habitCategory.value = ''
      setTimeout(() => {
        success.value = false
      }, 4000)
    }
    return {
      habits,
      success,
      message,
      weekdays,
      selectedDays,
      habitName,
      habitDescription,
      habitCategory,
      addHabit,
      NotificationMessage,
    }
  },
})
</script>

<style scoped>
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
#description:focus {
  width: 90%;
  height: 300px;
  scale: 1;
  justify-self: center;
  align-self: center;
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
