<template>
  <q-page padding>
    <TableCategory />
  </q-page>
</template>

<script setup>
import TableCategory from "src/components/Table/TableCategory.vue"
import { useCategoryStore } from "src/stores/category";
import { onMounted } from "vue";

const store = useCategoryStore()

const { getListCategory } = store

onMounted(() => {
  getListCategory()
})
</script>