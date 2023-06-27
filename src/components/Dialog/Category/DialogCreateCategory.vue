<template>
  <q-dialog v-model="dialogs.create">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Tambah Kategori</div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner inline-actions class="text-white bg-red">
          {{ message }}
        </q-banner>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit="postCreateCategory">
          <q-input filled v-model="name" label="Nama Kategori" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-amber-10 q-ma-md">
        <q-btn flat label="CANCEL" v-close-popup />
        <q-btn color="amber-10" icon="add" label="Buat" @click="postCreateCategory" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useCategoryStore } from "src/stores/category";
import { fetchAddCategory } from "src/repositories/category"

const store = useCategoryStore()
const { dialogs } = storeToRefs(store)
const { getListCategory } = store

const loading = ref(false)
const message = ref("")

const name = ref("")

function setLoading(value) {
  loading.value = value
}

async function postCreateCategory() {
  message.value = ""
  setLoading(true);
  try {
    const res = await fetchAddCategory({ name: name.value })
    getListCategory()
    dialogs.value.create = false
    name.value = ""
  } catch (err) {
    message.value = err.data.message
  } finally {
    setLoading(false);
  }
}
</script>