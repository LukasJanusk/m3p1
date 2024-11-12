<template>
  <div class="main-container"><slot></slot></div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainContainer',
  setup() {
    return {}
  },
})
</script>
<style scoped>
.main-container {
  min-width: 350px;
  padding: 10px;
  height: 500px;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.7),
    rgba(164, 191, 82, 0.5)
  );
  width: auto;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
