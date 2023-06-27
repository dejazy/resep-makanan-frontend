<template>
  <q-page padding class="row q-col-gutter-md" v-if="Object.keys(recipe).length > 0">
    <div class="col-12 col-md-4">
      <q-card>
        <q-card-section>
          <q-img :src="image">
            <div class="absolute-bottom-right text-subtitle2">
              {{ recipe.name }}
            </div>
          </q-img>
        </q-card-section>
        <q-card-section class="q-px-lg">
          <span class="text-italic">{{ recipe.description }}</span>
        </q-card-section>
        <q-card-section>
          <q-list class="rounded-borders">
            <ListItemPartial label="Kategori" :value="`${recipe.category.name}`" />
            <ListItemPartial label="Waktu" :value="`${recipe.time} Menit`" />
            <ListItemPartial label="Porsi" :value="`${recipe.portion}`" />
          </q-list>
        </q-card-section>
        <q-card-actions class="flex justify-end q-pa-md">
          <q-btn icon="edit" color="secondary" @click="onDialogUpdate"> Edit </q-btn>
          <q-btn icon="delete" color="red" @click="onDialogDelete"> Hapus </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-md-8">
      <q-card>
        <q-card-section horizontal>
          <q-card-section class="col-6">
            <q-list rounded-borders separator>
              <q-item-label header>Bahan-bahan</q-item-label>
              <template v-for="(item, idx) in recipe.ingredients" :key="idx">
                <q-item clickable v-ripple>
                  <q-item-section>{{ item.name }} <span class="text-grey-8">{{ item.pivot.measurement
                  }}</span></q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-timeline color="secondary">
              <q-timeline-entry heading>
                Langkah - langkah
              </q-timeline-entry>

              <template v-for="(item, i) in recipe.steps" :key="i">
                <q-timeline-entry :title="`Langkah ${i + 1}`">
                  <div>
                    {{ item }}
                  </div>
                </q-timeline-entry>

              </template>


            </q-timeline>
          </q-card-section>

        </q-card-section>
      </q-card>
    </div>
    <DialogDeleteRecipe />
    <DialogUpdateRecipe />
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useRecipeStore } from 'src/stores/recipe';
import { onMounted, computed } from 'vue';
import ListItemPartial from "src/components/List/Recipe/ListItemPartial.vue"
import DialogDeleteRecipe from "src/components/Dialog/Recipe/DialogDeleteRecipe.vue"
import DialogUpdateRecipe from "src/components/Dialog/Recipe/DialogUpdateRecipe.vue"

const route = useRoute()
const store = useRecipeStore()

const { recipe, dialogs } = storeToRefs(store)

const { getRecipe, onDialogUpdate } = store

const image = computed(() => `http://localhost:8000/upload/${recipe.value.photo}`)

function onDialogDelete() {
  dialogs.value.delete = true
}

onMounted(() => {
  getRecipe(route.params.id)
})
</script>