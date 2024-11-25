<template>
  <div>
    <Transition name="bounce" mode="out-in" appear>
      <div v-if="visible" class="error-wrapper">
        <div v-if="visible" id="error">
          {{ message }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue'

export default defineComponent({
  name: 'ErrorMessage',
  emits: ['dismiss'],
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props, { emit }) {
    const visible = ref(true)
    const timer = setTimeout(() => {
      visible.value = false
      setTimeout(() => {
        emit('dismiss')
      }, 500)
    }, props.duration)
    onUnmounted(() => {
      clearTimeout(timer)
      visible.value = false
    })

    return {
      visible,
    }
  },
})
</script>
<style scoped>
.error-wrapper {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
}
#error {
  font-size: 26px;
  color: white;
  border-radius: 30px;
  text-align: center;
  height: 100px;
  width: 300px;
  border: 3px solid;
  background: rgba(155, 38, 38, 0.708);
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.4);
  border-color: #e51414;
  background-color: rgba(185, 66, 66, 0.911);
  display: flex;
  justify-content: center;
  align-items: center;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.25);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
  }
}
</style>
