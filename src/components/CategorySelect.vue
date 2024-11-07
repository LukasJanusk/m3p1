<template>
  <select :value="modelValue" @input="handleInput">
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

<style scoped></style>
