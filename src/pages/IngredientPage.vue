<template>
  <q-page padding>
    <TableIngredient />
    <div></div>
  </q-page>
</template>

<script setup>
import TableIngredient from "src/components/Table/TableIngredient.vue"
import { useIngredientStore } from "src/stores/ingredient";
import { onMounted } from "vue";

const store = useIngredientStore()

const { getListIngredient } = store

onMounted(() => {
  getListIngredient()
})
</script>