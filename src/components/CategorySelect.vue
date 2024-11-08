<template>
  <select :value="modelValue" @input="handleInput">
    <option disabled selected value="">Select a category</option>
    <option
      v-for="category in categories"
      :key="category.id"
      :value="category.name"
      @input="$emit(category.name)"
    >
      {{ category.name }}
    </option></select
  ><br />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CategorySelect',
  props: {
    categories: {
      type: Array,
      required: true,
    },
    modelValue: {
      // This is for v-model binding
      type: String,
      required: true,
    },
  },
  methods: {
    handleInput(event) {
      // Emit the selected category name to parent via update:modelValue
      this.$emit('update:modelValue', event.target.value)
    },
  },
  setup() {},
})
</script>

<style scoped>
select {
  background-color: transparent;
  align-self: center;
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
  color: #333;
}
option {
  background-color: rgba(255, 255, 255, 0.409);
  color: #333;
  padding: 10px;
  border-radius: 18px;
}
@media (max-width: 500px) {
  select {
    width: 100%;
  }
}
</style>
