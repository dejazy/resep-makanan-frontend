<template>
  <div class="col-md-3">
    <q-card class="my-card" :to="link">
      <img :src="image(recipe.photo)">

      <q-card-section>
        <div class="text-h6">{{ recipe.name }}</div>
        <div class="text-subtitle2">{{ recipe.time }} Menit</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ recipe.description }}
      </q-card-section>
      <q-card-actions class="flex justify-end q-pa-md">
        <q-btn icon="restaurant" color="red" :to="link">
          Lihat Resep
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from "vue"
const props = defineProps({
  recipe: Object
})

const image = (image) => `http://localhost:8000/upload/${image}`

const link = computed(() => `/recipe/${props.recipe.id}`)
</script>