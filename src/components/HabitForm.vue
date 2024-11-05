<template>
  <div>
    <form id="add-habit-form" @submit.prevent="addHabit">
      <label for="name" required>Habit name</label><br />
      <input id="name" type="text" maxlength="30" v-model="habitName" /><br />
      <label for="description">Description</label><br />
      <textarea
        @click="(isHidden = !isHidden), (isFocused = !isFocused)"
        value="description"
        :class="{ focused: isFocused }"
        v-model="habitDescription"
      ></textarea
      ><br />
      <label :class="{ hidden: isHidden }" for="category">Category</label><br />
      <select
        :class="{ hidden: isHidden }"
        id="category"
        v-model="habitCategory"
      >
        <option value="sport">Sport</option>
        <option value="food">Eating</option>
        <option value="sleep">Sleep</option>
        <option value="learning">Learning</option></select
      ><br />
      <label :class="{ hidden: isHidden }" for="weekday-select"
        >Select habit activity days</label
      >
      <div
        :class="{ hidden: isHidden }"
        id="weekday-select"
        v-for="(day, index) in weekdays"
        :key="index"
      >
        <label>
          <input
            :class="{ hidden: isHidden }"
            type="checkbox"
            :value="index"
            v-model="selectedDays"
          />
          {{ day }}
        </label>
      </div>
      <button
        :class="{ hidden: isHidden }"
        @click.stop
        type="submit"
        id="submit"
      >
        Add Habit
      </button>
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
import NotificationMessage from './NotificationSuccessMessage.vue'
import Habit from '@/utils/habits'
import { useCurrentWeek } from '@/stores/dayStore'
import Day from '@/utils/day'

export default defineComponent({
  name: 'HabitForm',
  components: {
    NotificationMessage,
  },
  setup() {
    const { habits, saveHabits } = useHabits()
    const { dayWeek } = useCurrentWeek()
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]
    const { updateHabits } = useCurrentWeek()
    const message = ref('Habit added succesfully')
    const success = ref(false)
    const userId = 1 // Placeholder
    const habitName = ref('')
    const habitDescription = ref('')
    const selectedDays = ref([])
    const habitCategory = ref('')
    const isHidden = ref(false)
    const isFocused = ref(false)
    const addHabit = () => {
      const habit = new Habit(
        habits.length + 1,
        habitName.value,
        userId,
        habitCategory.value,
        habitDescription.value,
        selectedDays.value,
      )
      // update for runtime
      updateHabits(
        habits.length + 1,
        habitName.value,
        userId,
        habitCategory.value,
        habitDescription.value,
        selectedDays.value,
      )
      habits.push(habit)
      // update for the future
      saveHabits()
      Day.saveWeekdays(dayWeek)
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
      habits,
      success,
      message,
      weekdays,
      selectedDays,
      habitName,
      habitDescription,
      habitCategory,
      isHidden,
      isFocused,
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
