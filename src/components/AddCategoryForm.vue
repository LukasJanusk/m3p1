<template>
  <form id="add-habit-form" @submit.prevent="updateCategories">
    <h2>Add Category</h2>
    <label for="category-name">Name</label>
    <img
      id="close-button"
      src="../assets/close.svg"
      alt="x symbol in a square"
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
    <textarea
      value="desciption"
      id="description"
      v-model="categoryDescription"
    ></textarea
    ><br />
    <button id="submit-button" type="submit" @click.stop>Add Category</button>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useCurrentWeek } from '@/stores/dayStore'
import Category from '@/utils/category'

export default defineComponent({
  name: 'AddCategoryForm',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useCurrentWeek()
    const categoryName = ref('')
    const categoryDescription = ref('')
    const updateCategories = () => {
      const category = new Category(
        store.categories.length + 1,
        categoryName.value,
        categoryDescription.value,
      )
      store.categories.push(category)
      Category.save(store.categories)
    }
    const closeForm = () => {
      emit('close-form')
    }
    return { categoryName, categoryDescription, updateCategories, closeForm }
  },
})
</script>
<style scoped>
#submit-button {
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
  max-width: 99%;
  width: 90%;
}
#add-habit-form {
  position: fixed;
  padding: 10px;
  /* left: 200px; */
  /* width: 350px; */
  min-width: 200px;
  max-width: 90vw;
  border: 2px solid black;
  background: linear-gradient(
    135deg,
    rgba(142, 141, 141, 0.9),
    rgba(122, 143, 60, 0.9)
  );
  width: auto;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
@media (max-width: 500px) {
  #add-habit-form {
    left: auto;
    width: 85vw;
    top: 310px;
  }
  input {
    width: 80vw;
  }
  textarea {
    width: 80vw;
  }
  #submit-button {
    width: 100%;
    height: 30px;
    padding: 5px;
    margin-top: 20px;
    margin-right: 20px;
  }
}
@media (max-width: 1279px) {
  #add-habit-form {
    left: auto;
    top: 310px;
  }
}
@media (min-width: 1280px) {
  #add-habit-form {
    left: calc(50% - 640px + 190px);
  }
}
</style>
