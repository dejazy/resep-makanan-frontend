<template>
  <q-dialog v-model="dialogs.delete" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-negative text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Hapus Resep</div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner inline-actions class="text-white bg-red">
          {{ message }}
        </q-banner>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Yakin ingin menghapus resep {{ recipe.name }}?
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn flat label="Batal" v-close-popup />
        <q-btn color="negative" icon="delete" label="Hapus" @click="postDeleteRecipe" :loading="loading"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { storeToRefs } from "pinia";
import { useRecipeStore } from "src/stores/recipe";
import { fetchDeleteRecipe } from "src/repositories/recipe"

const router = useRouter()

const store = useRecipeStore()
const { dialogs, recipe } = storeToRefs(store)
const { getListRecipe } = store

const loading = ref(false)
const message = ref("")

function setLoading(value) {
  loading.value = value
}

async function postDeleteRecipe() {
  message.value = ""
  setLoading(true);
  try {
    await fetchDeleteRecipe({ id: recipe.value.id })
    dialogs.value.delete = false
    router.push({ path: '/' })
  } catch (err) {
    message.value = err.data.message
  } finally {
    setLoading(false);
  }
}
</script>