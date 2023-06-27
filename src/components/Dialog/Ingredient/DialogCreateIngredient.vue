<template>
  <q-dialog v-model="dialogs.create">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Tambah Bahan</div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner inline-actions class="text-white bg-red">
          {{ message }}
        </q-banner>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit="postCreateIngredient">
          <q-input filled v-model="name" label="Nama Bahan" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-amber-10 q-ma-md">
        <q-btn flat label="CANCEL" v-close-popup />
        <q-btn color="amber-10" icon="add" label="Buat" @click="postCreateIngredient" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useIngredientStore } from "src/stores/ingredient";
import { fetchAddIngredient } from "src/repositories/ingredient"

const store = useIngredientStore()
const { dialogs } = storeToRefs(store)
const { getListIngredient } = store

const loading = ref(false)
const message = ref("")

const name = ref("")

function setLoading(value) {
  loading.value = value
}

async function postCreateIngredient() {
  message.value = ""
  setLoading(true);
  try {
    const res = await fetchAddIngredient({ name: name.value })
    getListIngredient()
    dialogs.value.create = false
    name.value = ""
  } catch (err) {
    message.value = err.data.message
  } finally {
    setLoading(false);
  }
}
</script>