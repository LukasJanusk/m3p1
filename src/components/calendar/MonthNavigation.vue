<template>
  <div id="navigation">
    <div class="nav-button">
      <img
        @click="returnPrevious"
        src="/src/assets/left.svg"
        title="previous month"
        alt="Arrow left"
      />
    </div>
    <div class="nav-button">
      <img
        @click="returnNext"
        src="/src/assets/right.svg"
        title="next month"
        alt="Arrow right"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MonthNavigation',
  emits: ['next', 'previous'],

  setup(props, { emit }) {
    const returnNext = () => {
      emit('next')
    }
    const returnPrevious = () => {
      emit('previous')
    }

    return { returnNext, returnPrevious }
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
img {
  width: 100%;
}
#navigation {
  display: flex;
  flex-wrap: nowrap;
}
</style>
