<template>
  <q-dialog v-model="dialogs.delete" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-negative text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Hapus Bahan</div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner inline-actions class="text-white bg-red">
          {{ message }}
        </q-banner>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Yakin ingin menghapus bahan {{ ingredient.name }}?
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn flat label="Batal" v-close-popup />
        <q-btn color="negative" icon="delete" label="Hapus" @click="postDeleteIngredient" :loading="loading"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useIngredientStore } from "src/stores/ingredient";
import { fetchDeleteIngredient } from "src/repositories/ingredient"

const store = useIngredientStore()
const { dialogs, ingredient } = storeToRefs(store)
const { getListIngredient } = store

const loading = ref(false)
const message = ref("")

function setLoading(value) {
  loading.value = value
}

async function postDeleteIngredient() {
  message.value = ""
  setLoading(true);
  try {
    const res = await fetchDeleteIngredient({ id: ingredient.value.id })
    getListIngredient()
    dialogs.value.delete = false
  } catch (err) {
    message.value = err.data.message
  } finally {
    setLoading(false);
  }
}
</script>