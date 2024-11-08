<template>
  <div id="habits-container">
    <div
      v-for="habit in store.habits"
      :key="habit.id"
      :title="habit.description"
      class="habit-item"
      :class="{ delete: deleteHover[habit.id], edit: editHover[habit.id] }"
    >
      <div id="habit-name-container">
        <span class="habit-name">{{ habit.name }}</span>
      </div>

      <div id="edit-tools-container">
        <div id="weekday-toggles-container">
          <span
            v-for="(day, index) in weekDayToggles"
            class="day-toggle"
            :class="{ toggled: isActive(habit, index) }"
            :key="index"
            >{{ day }}</span
          >
        </div>
        <div id="habit-buttons-container">
          <img
            id="edit-button"
            @mouseenter="setEditHover(habit.id, true)"
            @mouseleave="setEditHover(habit.id, false)"
            @touchstart="setEditHover(habit.id, true)"
            @touchend="setEditHover(habit.id, false)"
            src="../assets/edit5.svg"
            alt="edit pencil"
            title="Edit Habit"
            @click="editHabitId = habit.id"
          /><img
            id="delete-button"
            @mouseenter="setDeleteHover(habit.id, true)"
            @mouseleave="setDeleteHover(habit.id, false)"
            @touchstart="setDeleteHover(habit.id, true)"
            @touchend="setDeleteHover(habit.id, false)"
            @click="store.deleteHabit(habit.id)"
            src="../assets/trash1.svg"
            alt="trashcan"
            title="Remove Habit"
          />
        </div>
      </div>
      <EditHabitForm
        id="edit-habit-form"
        v-if="editHabitId === habit.id"
        :habit="habit"
        :categories="store.categories"
        @close-form="editHabitId = null"
        @update="
          newHabit => {
            editHabitId = null
            store.editHabit(newHabit)
          }
        "
      ></EditHabitForm>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'
import EditHabitForm from './EditHabitForm.vue'

export default defineComponent({
  name: 'HabitList',
  components: { EditHabitForm },
  setup() {
    const store = useCurrentWeek()
    const deleteHover = ref({})
    const editHover = ref({})
    const editHabitId = ref(null) // Store the id of the habit being edited
    // const editActive = ref(false)
    const setDeleteHover = (id, state) => {
      deleteHover.value = { ...deleteHover.value, [id]: state }
    }
    const setEditHover = (id, state) => {
      editHover.value = { ...editHover.value, [id]: state }
    }
    const isActive = (habit, index) => {
      return habit.weekdays.includes(index)
    }
    const weekDayToggles = ref([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ])

    return {
      store,
      deleteHover,
      editHover,
      setDeleteHover,
      setEditHover,
      weekDayToggles,
      isActive,
      // editActive,
      editHabitId,
    }
  },
})
</script>

<style scoped>
#edit-button,
#delete-button {
  cursor: pointer;
  height: 30px;
  cursor: pointer;
  height: 30px;
  border: 1px solid transparent;
  border-radius: 10px;
  margin-right: 5px;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}
img:hover {
  scale: 1.2;
}
img:active {
  scale: 0.99;
}
#delete-button:active {
  background-color: rgba(241, 31, 31, 0.489);
  border-color: red;
}
.delete {
  background-color: rgba(241, 31, 31, 0.489);
}
.edit {
  background-color: rgba(41, 79, 201, 0.489);
}
.habit-name {
  margin-left: 20px;
}
#edit-button:active {
  background-color: rgba(31, 87, 241, 0.489);
  border-color: blue;
}
.habit-item {
  display: flex;
  flex-wrap: wrap;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
  border-radius: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 5px;
  box-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
  transition: background-color 0.3s ease;
}
#edit-tools-container {
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  justify-self: flex-end;
}
#edit-tools-container div {
  margin-left: 20px;
}
#habit-buttons-container {
  display: flex;
  justify-content: flex-end;
}
.day-toggle {
  padding: 4px;
  font-size: 20px;
  border-radius: 5px;
  margin-left: 5px;
  width: 15px;
  background: linear-gradient(30deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  box-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
}
.toggled {
  background-color: rgba(46, 199, 148, 0.619);
}
/* .habit-item:hover {
  background-color: rgb(80, 168, 139);
} */
/* .habit-item:active {
  background-color: rgb(94, 192, 159);
} */
/* Fade Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* #edit-habit-form {
  position: absolute;
  top: 10px;
  left: 10px;
  justify-self: center;
  align-self: center;
} */
@media (max-width: 600px) {
  .day-toggle {
    font-size: 16px;
  }
  .habit-name {
    margin-left: 10px;
  }
  #edit-tools-container div {
    margin-left: 10px;
  }
}
@media (max-width: 510px) {
  #habit-name-container {
    font-size: 20px;
  }
  .day-toggle {
    font-size: 10px;
  }
  img {
    height: 20px;
  }
  #edit-button,
  #delete-button {
    height: 30px;
    cursor: pointer;
  }
}
</style>
