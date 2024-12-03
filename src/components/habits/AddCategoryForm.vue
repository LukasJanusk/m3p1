<template>
  <div>
    <form id="add-category-form" @submit.prevent="updateCategories">
      <h2>Add Category</h2>
      <label for="category-name">Name*</label>
      <img
        id="close-button"
        src="/src/assets/close.svg"
        alt="X symbol"
        title="close"
        @click="closeForm"
      /><br />
      <input
        type="text"
        maxlength="30"
        id="category-name"
        v-model="categoryName"
      /><br />
      <label for="description">Description</label><br />
      <textarea id="description" v-model="categoryDescription"></textarea><br />
      <button
        class="submit-button"
        id="submit-button"
        type="submit"
        @click.stop
      >
        Add Category
      </button>
    </form>
    <ErrorMessage
      v-if="error"
      :message="message"
      @dismiss="resetError"
    ></ErrorMessage>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'
import Category from '@/utils/category'
import ErrorMessage from '../reusable/ErrorMessage.vue'

export default defineComponent({
  name: 'AddCategoryForm',
  components: { ErrorMessage },
  emits: ['category-added', 'close-form'],
  setup(_props, { emit }) {
    const store = useCurrentWeek()
    const categoryName = ref('')
    const categoryDescription = ref('')
    const error = ref(false)
    const message = ref('')
    const updateCategories = (): void => {
      if (!categoryName.value) {
        error.value = true
        message.value = 'Invalid category name!'
      } else if (
        store.categories.some(
          (category: Category) => category.name === categoryName.value,
        )
      ) {
        message.value = 'Category already exist!'
        error.value = true
      } else {
        const category = new Category(
          store.categories.length + 1,
          categoryName.value,
          categoryDescription.value,
        )
        store.categories.push(category)
        Category.save(store.categories)
        categoryAdded(category)
      }
    }
    const categoryAdded = (category: Category): void => {
      emit('category-added', category)
    }
    const closeForm = (): void => {
      emit('close-form')
    }
    const resetError = (): void => {
      message.value = ''
      error.value = false
    }
    return {
      error,
      message,
      categoryName,
      categoryDescription,
      updateCategories,
      closeForm,
      resetError,
    }
  },
})
</script>
<style scoped>
#submit-button {
  margin-top: 15px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
}
#close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  height: 20px;
  border-radius: 0.3rem;
  transition: transform 0.3s ease;
}
#close-button:hover {
  background-color: rgba(241, 31, 31, 0.489);
  transform: scale(1.05);
}
#close-button:active {
  background-color: rgba(241, 31, 31, 0.489);
  transform: scale(0.99);
}
textarea {
  max-width: 95%;
  width: 90%;
  width: 200px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.37);
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 10px;
}
input {
  max-width: 95%;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.37);
  border: 1px solid #ccc;
  border-radius: 18px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
}
#add-category-form {
  position: fixed;
  padding: 10px;
  min-width: 200px;
  max-width: 90vw;
  border: 2px solid black;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.95),
    rgba(104, 149, 65, 0.95)
  );
  width: auto;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
#submit-button {
  width: 100%;
}
@media (max-width: 500px) {
  #add-category-form {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  input {
    width: 80vw;
  }
  textarea {
    width: 80vw;
  }
}
@media (max-height: 750px) {
  #add-category-form {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
