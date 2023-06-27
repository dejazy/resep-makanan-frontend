import { defineStore } from "pinia";
import { fetchListIngredient } from "src/repositories/ingredient";
import { ref } from "vue";

export const useIngredientStore = defineStore("ingredient_store", () => {
  const loading = ref(false);

  const ingredients = ref([]);
  const ingredient = ref({});

  const dialogs = ref({
    create: false,
    update: false,
    delete: false,
  });

  function setLoading(value) {
    loading.value = value;
  }

  async function getListIngredient() {
    setLoading(true);
    try {
      const res = await fetchListIngredient();
      ingredients.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    ingredients,
    ingredient,
    dialogs,

    setLoading,
    getListIngredient,
  };
});
