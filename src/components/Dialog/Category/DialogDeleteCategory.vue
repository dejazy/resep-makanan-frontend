<template>
  <q-dialog v-model="dialogs.delete" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-negative text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Hapus Kategori</div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner inline-actions class="text-white bg-red">
          {{ message }}
        </q-banner>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Yakin ingin menghapus kategori {{ category.name }}?
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn flat label="Batal" v-close-popup />
        <q-btn color="negative" icon="delete" label="Hapus" @click="postDeleteCategory" :loading="loading"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useCategoryStore } from "src/stores/category";
import { fetchDeleteCategory } from "src/repositories/category"

const store = useCategoryStore()
const { dialogs, category } = storeToRefs(store)
const { getListCategory } = store

const loading = ref(false)
const message = ref("")

function setLoading(value) {
  loading.value = value
}

async function postDeleteCategory() {
  message.value = ""
  setLoading(true);
  try {
    const res = await fetchDeleteCategory({ id: category.value.id })
    getListCategory()
    dialogs.value.delete = false
  } catch (err) {
    message.value = err.data.message
  } finally {
    setLoading(false);
  }
}
</script>