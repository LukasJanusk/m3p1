<template>
  <div id="habits-container">
    <div
      v-for="habit in habits"
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
          /><img
            id="delete-button"
            @mouseenter="setDeleteHover(habit.id, true)"
            @mouseleave="setDeleteHover(habit.id, false)"
            @touchstart="setDeleteHover(habit.id, true)"
            @touchend="setDeleteHover(habit.id, false)"
            src="../assets/trash1.svg"
            alt="trashcan"
            title="Remove Habit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useHabits } from '@/stores/habitsStore'

export default defineComponent({
  name: 'HabitList',
  setup() {
    const { habits } = useHabits()
    const deleteHover = ref({})
    const editHover = ref({})

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
      habits,
      deleteHover,
      editHover,
      setDeleteHover,
      setEditHover,
      weekDayToggles,
      isActive,
    }
  },
})
</script>

<style scoped>
img {
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
  transition: transform 0.2s ease;
}
#edit-tools-container {
  display: flex;
  margin-left: auto; /* Pushes it to the right */
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
  .day-toggle {
    font-size: 12px;
  }
  img {
    height: 20px;
  }
}
</style>
