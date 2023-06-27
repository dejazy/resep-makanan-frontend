<template>
  <q-dialog v-model="dialogs.update">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Edit Bahan</div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner inline-actions class="text-white bg-red">
          {{ message }}
        </q-banner>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit="postUpdateIngredient">
          <q-input filled v-model="ingredient.name" label="Nama Bahan" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary q-ma-md">
        <q-btn flat label="CANCEL" v-close-popup />
        <q-btn color="primary" icon="edit" label="Edit" @click="postUpdateIngredient" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useIngredientStore } from "src/stores/ingredient";
import { fetchUpdateIngredient } from "src/repositories/ingredient"

const store = useIngredientStore()
const { dialogs, ingredient } = storeToRefs(store)
const { getListIngredient } = store

const loading = ref(false)
const message = ref("")

function setLoading(value) {
  loading.value = value
}

async function postUpdateIngredient() {
  message.value = ""
  setLoading(true);
  try {
    const res = await fetchUpdateIngredient({ id: ingredient.value.id, name: ingredient.value.name })
    getListIngredient()
    dialogs.value.update = false
  } catch (err) {
    message.value = err.data.message
  } finally {
    setLoading(false);
  }
}
</script>