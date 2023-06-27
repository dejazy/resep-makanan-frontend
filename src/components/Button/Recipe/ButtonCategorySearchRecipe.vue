<template>
  <q-btn-dropdown v-model="menu" icon="restaurant_menu" color="red" label="Kategori" :disabled="disabled">
    <q-list>
      <template v-for="(item, i) in filter.categories" :key="i">
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
import { computed, ref } from "vue";

const store = useRecipeStore()

const { filter } = storeToRefs(store)

const { getListRecipe } = store

const menu = ref(false)

function activate(i) {
  if (!disabled.value)
    filter.value.categories[i].active = true
  menu.value = false
  getListRecipe()
}

const disabled = computed(() => filter.value.categories.some(el => el.active === true))
</script>