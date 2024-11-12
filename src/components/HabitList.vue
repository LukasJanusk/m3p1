<template>
  <div id="habits-container">
    <div
      v-for="habit in habitList"
      :key="habit.id"
      :title="habit.description"
      class="habit-item"
      :class="{
        delete: deleteHover[habit.id],
        edit: editHover[habit.id],
        stop: stopHover[habit.id],
      }"
    >
      <div id="habit-name-container">
        <span class="habit-name">{{ habit.name }}</span
        ><span v-if="habit.stopped === true" class="stopped-text"
          >--stopped--</span
        >
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
            v-if="!habit.stopped"
            id="stop-button"
            @mouseenter="setStopHover(habit.id, true)"
            @mouseleave="setStopHover(habit.id, false)"
            @touchstart="setStopHover(habit.id, true)"
            @touchend="setStopHover(habit.id, false)"
            src="../assets/stop.svg"
            title="Toggle Stop habit"
            alt="Stop sign"
            @click="handleHabitStopToggle(habit.id)"
          />
          <img
            v-if="habit.stopped"
            id="stop-button-active"
            @mouseenter="setStopHover(habit.id, true)"
            @mouseleave="setStopHover(habit.id, false)"
            @touchstart="setStopHover(habit.id, true)"
            @touchend="setStopHover(habit.id, false)"
            src="../assets/stop2.svg"
            title="Toggle Stop habit"
            alt="Stop sign"
            @click="handleHabitStopToggle(habit.id)"
          />

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
            @click="handleDeleteHabit(habit.id)"
            src="../assets/trash1.svg"
            alt="trashcan"
            title="Remove Habit"
          />
        </div>
      </div>
      <Transition name="fade" mode="out-in">
        <EditHabitForm
          id="edit-habit-form"
          v-if="editHabitId === habit.id"
          :habit="habit"
          :categories="store.categories"
          @close-form="editHabitId = null"
          @update="handleHabitUpdate"
        ></EditHabitForm
      ></Transition>
    </div>
  </div>
  <NotificationSuccessMessage
    v-if="success"
    :message="message"
  ></NotificationSuccessMessage>
  <ErrorMessage v-if="error" :message="message"></ErrorMessage>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'
import EditHabitForm from './EditHabitForm.vue'
import NotificationSuccessMessage from './NotificationSuccessMessage.vue'
import ErrorMessage from './ErrorMessage.vue'

export default defineComponent({
  name: 'HabitList',
  components: { EditHabitForm, NotificationSuccessMessage, ErrorMessage },
  props: {
    category: {
      category: 'category',
      type: String,
    },
  },
  setup(props) {
    const store = useCurrentWeek()
    const deleteHover = ref({})
    const editHover = ref({})
    const stopHover = ref({})
    const editHabitId = ref(null)
    const success = ref(false)
    const error = ref(false)
    const message = ref('')
    const habitList = computed(() => {
      if (props.category) {
        if (props.category === 'All habits') {
          return store.habits
        }
        return store.habits.filter(habit => habit.category === props.category)
      } else {
        return store.habits
      }
    })
    const handleHabitUpdate = newHabit => {
      editHabitId.value = null
      const updated = store.editHabit(newHabit)
      if (updated) {
        message.value = 'Habit updated succesfuly!'
        success.value = true
        setTimeout(() => {
          success.value = false
        }, 3000)
      } else {
        console.log(updated)
        message.value = 'Failed to update habit!'
        error.value = true
        setTimeout(() => {
          error.value = false
        }, 3000)
      }
    }
    const handleHabitStopToggle = habitId => {
      const matchHabit = store.habits.find(habit => habit.id === habitId)
      if (matchHabit) {
        if (matchHabit.stopped === false) {
          const stopped = store.stopHabit(habitId)
          if (stopped === true) {
            message.value = 'Habit stopped succesfully!'
            success.value = true
            setTimeout(() => {
              success.value = false
            }, 3000)
          } else {
            message.value = 'Failed to stop habit!'
            setTimeout(() => {
              error.value = false
            }, 3000)
          }
        } else if (matchHabit.stopped === true) {
          const activated = store.activateStoppedHabit(habitId)
          if (activated === true) {
            message.value = 'Habit activated succesfully!'
            success.value = true
            setTimeout(() => {
              success.value = false
            }, 3000)
          } else {
            message.value = 'Failed to activate habit!'
            error.value = true
            setTimeout(() => {
              error.value = false
            }, 3000)
          }
        }
      }
    }
    const handleDeleteHabit = habitId => {
      const deleted = store.deleteHabit(habitId)
      if (deleted === true) {
        message.value = 'Habit removed successfuly!'
        success.value = true
        setTimeout(() => {
          success.value = false
        }, 3000)
      } else {
        message.value = 'Failed to remove Habit!'
        error.value = true
        setTimeout(() => {
          error.value = false
        }, 3000)
      }
    }
    const setDeleteHover = (id, state) => {
      deleteHover.value = { ...deleteHover.value, [id]: state }
    }
    const setStopHover = (id, state) => {
      stopHover.value = { ...stopHover.value, [id]: state }
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
      success,
      error,
      message,
      habitList,
      deleteHover,
      editHover,
      stopHover,
      setDeleteHover,
      setEditHover,
      setStopHover,
      handleDeleteHabit,
      handleHabitUpdate,
      handleHabitStopToggle,
      weekDayToggles,
      isActive,
      editHabitId,
    }
  },
})
</script>

<style scoped>
#habits-container {
  height: 470px;
  overflow-y: auto;
  scrollbar-width: none;
  border: 2px solid rgba(0, 0, 0, 0.035);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.041);
}
#habits-container::-webkit-scrollbar {
  display: none;
}
#edit-button,
#delete-button,
#stop-button,
#stop-button-active {
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
.stop {
  background-color: rgba(209, 167, 18, 0.489);
}
.stopped-text {
  color: rgba(126, 24, 24, 0.749);
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
