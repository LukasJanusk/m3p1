<template>
  <select :value="modelValue" @input="handleInput">
    <option v-if="showSelectCategory" value="Select a category" disabled>
      Select a category
    </option>
    <option
      v-for="category in categoriesFiltered"
      :key="category.id"
      :value="category.name"
    >
      {{ category.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import Category from '@/utils/category'

export default defineComponent({
  name: 'CategorySelect',
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
    showAll: {
      type: Boolean,
      required: false,
      default: true,
    },
    showSelectCategory: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }
    const categoriesFiltered = computed(() => {
      if (props.showAll === false) {
        return props.categories.filter(category => category.id !== 0)
      }
      return props.categories
    })
    return { categoriesFiltered, handleInput }
  },
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
  width: 100%;
}
option {
  background-color: rgba(255, 255, 255, 0.409);
  color: #333;
  padding: 10px;
  border-radius: 18px;
}
</style>
