<template>
  <Transition name="fade" mode="out-in"></Transition>
  <div id="error">
    {{ message }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>
<style scoped>
#error {
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
  background: rgba(155, 38, 38, 0.708);
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.4);
  border-color: #e51414;
  background-color: rgba(185, 66, 66, 0.911);
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.683);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
