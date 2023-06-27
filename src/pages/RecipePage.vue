<template>
  <q-page padding>
    <CardRecipeSearch />
    <div class="q-pa-md row items-start q-col-gutter-md">
      <template v-for="(item, index) in recipes" :key="index">
        <CardRecipeSingle :recipe="item" />
      </template>
    </div>

  </q-page>
  <DialogCreateRecipe />
</template>
<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRecipeStore } from "src/stores/recipe";
import CardRecipeSearch from "src/components/Card/Recipe/CardRecipeSearch.vue"
import CardRecipeSingle from "src/components/Card/Recipe/CardRecipeSingle.vue"
import DialogCreateRecipe from "src/components/Dialog/Recipe/DialogCreateRecipe.vue"

import { useCategoryStore } from "src/stores/category"
import { useIngredientStore } from "src/stores/ingredient"

const store = useRecipeStore()
const categoryStore = useCategoryStore()
const ingredientStore = useIngredientStore()

const { recipes, filter } = storeToRefs(store)
const { categories } = storeToRefs(categoryStore)
const { ingredients } = storeToRefs(ingredientStore)

const { getListRecipe } = store
const { getListCategory } = categoryStore
const { getListIngredient } = ingredientStore

function setFilterCategory() {
  filter.value.categories = categories.value.map(value => ({ ...value, active: false }))
}

function setFilterIngredient() {
  filter.value.ingredients = ingredients.value.map(value => ({ ...value, active: false }))
}
onMounted(async () => {
  getListRecipe()
  await getListCategory()
  await getListIngredient()

  setFilterCategory()
  setFilterIngredient()
})
</script>