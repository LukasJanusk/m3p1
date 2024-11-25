<template>
  <div>
    <Transition name="bounce" mode="out-in" appear>
      <div id="notification" v-if="visible">
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue'
export default defineComponent({
  name: 'SuccessMessage',
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
    return { visible }
  },
})
</script>

<style scoped>
#notification {
  font-size: 26px;
  color: white;
  border-radius: 30px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 10%;
  height: 100px;
  width: 300px;
  border: 3px solid;
  transform: translate(-50%, -50%);
  background: rgba(38, 155, 46, 0.708);
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.4);
  border-color: #14e587;
  background-color: rgba(66, 185, 131, 0.911);
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.683);
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
