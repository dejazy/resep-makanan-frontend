import { defineStore } from "pinia";
import { fetchListCategory } from "src/repositories/category";
import { ref } from "vue";

export const useCategoryStore = defineStore("category_store", () => {
  const loading = ref(false);

  const categories = ref([]);
  const category = ref({});

  const dialogs = ref({
    create: false,
    update: false,
    delete: false,
  });

  function setLoading(value) {
    loading.value = value;
  }

  async function getListCategory() {
    setLoading(true);
    try {
      const res = await fetchListCategory();
      categories.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    categories,
    category,
    dialogs,

    setLoading,
    getListCategory,
  };
});
