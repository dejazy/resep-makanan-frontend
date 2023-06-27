<template>
  <q-card>
    <q-card-section class="q-pt-xs text-center q-pt-md">
      <div class="text-h5 q-mt-sm q-mb-xs">Cari Resep</div>
      <div class="text-caption text-grey">
        Ciptakan Sensasi Kulinermu dengan Ragam Resep Makanan Terpercaya di Website Resep Makanan Kami yang Menggugah
        Selera!
      </div>
    </q-card-section>
    <q-card-section>
      <q-form @submit="getListRecipe">
        <q-input dense standout="bg-amber-9 text-white" v-model="filter.search" class="q-ml-md q-pa-md" :loading="loading">
          <template v-slot:after>
            <q-btn round dense flat icon="search" :disabled="loading" @click="getListRecipe"/>
          </template>
        </q-input>
      </q-form>
      <div class="text-center">
        <template v-for="(item, i) in filter.categories" :key="i">
          <q-chip removable v-model="filter.categories[i].active" @remove="getListRecipe" color="red" text-color="white" icon="restaurant_menu">
            {{ item.name }}
          </q-chip>
        </template>
        <template v-for="(item, i) in filter.ingredients" :key="i">
          <q-chip removable v-model="filter.ingredients[i].active" @remove="getListRecipe" color="secondary" text-color="white"
            icon="soup_kitchen">
            {{ item.name }}
          </q-chip>
        </template>
      </div>
    </q-card-section>
    <q-card-actions class="q-pa-md flex justify-between">
      <div class="q-gutter-md">
        <ButtonCategorySearchRecipe />
        <ButtonIngredientSearchRecipe />
      </div>
      <q-btn icon="add" color="amber-10" @click="onDialogCreate">Buat Resep</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRecipeStore } from "src/stores/recipe"
import ButtonCategorySearchRecipe from "src/components/Button/Recipe/ButtonCategorySearchRecipe.vue"
import ButtonIngredientSearchRecipe from "src/components/Button/Recipe/ButtonIngredientSearchRecipe.vue"

const store = useRecipeStore()

const { dialogs, filter, loading } = storeToRefs(store)

const { getListRecipe } = store

function onDialogCreate() {
  dialogs.value.create = true
}
</script>