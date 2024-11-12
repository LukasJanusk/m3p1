<template>
  <div class="top-container"><slot></slot></div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopContainer',
  setup() {
    return {}
  },
})
</script>
<style scoped>
.top-container {
  height: 100px;
  background: linear-gradient(
    135deg,
    rgba(81, 80, 80, 0.7),
    rgba(112, 118, 95, 0.5)
  );
  border-radius: 20px 20px 0px 0px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  min-width: 320px;
}
</style>
