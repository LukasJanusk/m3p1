<template>
  <div>
    <div class="day-item" :class="getActiveClass()" :title="getPercentage()">
      <p>{{ dayObject.date.getDate() }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Day from '@/utils/day'

export default defineComponent({
  name: 'DayOfMonth',
  props: {
    dayObject: {
      type: Day,
      required: true,
    },
  },
  setup(props) {
    const day = props.dayObject
    const totalHabits = ref(day.habits ? day.habits.length : 0)
    const activeCount = ref(
      day.habits ? day.habits.filter(habit => habit.active).length : 0,
    )
    const activePercentage = computed((): number => {
      return Math.floor((activeCount.value / totalHabits.value) * 100)
    })
    const getActiveClass = (): string => {
      if (activePercentage.value >= 20 && activePercentage.value < 40) {
        return 'twenty'
      } else if (activePercentage.value >= 40 && activePercentage.value < 60) {
        return 'fourty'
      } else if (activePercentage.value >= 60 && activePercentage.value < 80) {
        return 'sixty'
      } else if (activePercentage.value >= 80 && activePercentage.value < 100) {
        return 'eighty'
      } else if (activePercentage.value === 100) {
        return 'hundred'
      } else {
        return ''
      }
    }
    const getPercentage = (): string => {
      return `Completed ${activePercentage.value}% of Habits`
    }

    return { getActiveClass, getPercentage }
  },
})
</script>

<style scoped>
.day-item {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  border: 2px solid black;
  transition:
    transform 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
  border-radius: 20px;
  padding: 5px;
  background: linear-gradient(30deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  box-shadow: 0px 2px 8px rgba(34, 97, 68, 0.3);
}
.twenty {
  background: linear-gradient(
    30deg,
    rgba(66, 185, 131, 0.2),
    rgba(66, 185, 131, 0.4)
  );
}
.fourty {
  background: linear-gradient(
    30deg,
    rgba(66, 185, 131, 0.4),
    rgba(66, 185, 131, 0.6)
  );
}
.sixty {
  background: linear-gradient(
    30deg,
    rgba(66, 185, 131, 0.6),
    rgba(66, 185, 131, 0.8)
  );
}
.eighty {
  background: linear-gradient(
    30deg,
    rgba(66, 185, 131, 0.8),
    rgba(66, 185, 131, 1)
  );
}
.hundred {
  background: linear-gradient(
    30deg,
    rgba(66, 185, 131, 1),
    rgba(66, 185, 131, 1)
  );
}
.day-item:hover {
  transform: scale(1.05);
  background-color: #466e9e8b;
  border-color: transparent;
}
.day-item:active {
  transform: scale(0.99);
  border-color: #42b983;
  background-color: #42b983;
}

@media (max-width: 1000px) {
  .day-item {
    border-radius: 15px;
  }
}
</style>
