import { defineStore } from "pinia";
import { fetchGetRecipe, fetchListRecipes } from "src/repositories/recipe";
import { ref } from "vue";

export const useRecipeStore = defineStore("recipe_store", () => {
  const loading = ref(false);

  const recipes = ref([]);
  const recipe = ref({});

  const updateRecipe = ref({});

  const filter = ref({
    search: "",
    categories: [],
    ingredients: [],
  });

  const dialogs = ref({
    create: false,
    delete: false,
    update: false,
  });

  function setLoading(value) {
    loading.value = value;
  }

  async function getListRecipe() {
    setLoading(true);
    try {
      const catIdx = filter.value.categories.findIndex(
        (obj) => obj.active === true
      );
      const category_id =
        catIdx !== -1 ? filter.value.categories[catIdx].id : null;

      const ingredients = filter.value.ingredients
        .filter((value) => value.active)
        .map((value) => value.id);

      const res = await fetchListRecipes({
        search: filter.value.search,
        category_id,
        ingredients,
      });
      recipes.value = res.data;
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  }

  async function getRecipe(id) {
    try {
      const res = await fetchGetRecipe({ id });
      recipe.value = res.data;
    } catch (err) {
      //
    }
  }

  async function onDialogUpdate() {
    const { id, name, time, portion, description, steps } = recipe.value;
    const ingredients = recipe.value.ingredients.map((value) => ({
      ...value,
      label: value.name,
      value: value.id,
      measurement: value.pivot.measurement,
    }));
    updateRecipe.value = {
      id,
      category_id: recipe.value.category.id,
      name,
      time,
      portion,
      description,
      photo: null,
      steps,
      ingredients,
    };
    dialogs.value.update = true;
  }

  return {
    loading,
    recipes,
    recipe,
    dialogs,
    filter,
    updateRecipe,

    getListRecipe,
    getRecipe,

    onDialogUpdate,
  };
});
