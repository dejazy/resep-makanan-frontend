<template>
  <q-btn-dropdown v-model="menu" icon="soup_kitchen" color="secondary" label="Bahan">
    <q-list>
      <template v-for="(item, i) in filter.ingredients" :key="i">
        <q-item clickable v-close-popup @click="activate(i)" v-if="!item.active">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRecipeStore } from "src/stores/recipe";
import { ref } from "vue";

const store = useRecipeStore()

const { filter } = storeToRefs(store)

const { getListRecipe } = store

const menu = ref(false)

function activate(i) {
  filter.value.ingredients[i].active = true
  menu.value = false
  getListRecipe()
}
</script>