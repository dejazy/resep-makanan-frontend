import { defineStore } from "pinia";
import { fetchListRecipes } from "src/repositories/recipe";
import { ref } from "vue";

export const useRecipeCreateStore = defineStore("recipe_create_store", () => {
  const loading = ref(false);

  const recipes = ref([]);

  const dialogs = ref({
    create: false,
  });

  return {
    loading,
    recipes,
    dialogs,
  };
});
