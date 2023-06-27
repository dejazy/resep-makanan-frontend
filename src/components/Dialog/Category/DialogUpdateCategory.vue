<template>
  <q-dialog v-model="dialogs.update">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Edit Kategori</div>
      </q-card-section>

      <q-card-section v-if="message">
        <q-banner inline-actions class="text-white bg-red">
          {{ message }}
        </q-banner>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md" @submit="postUpdateCategory">
          <q-input filled v-model="category.name" label="Nama Kategori" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary q-ma-md">
        <q-btn flat label="CANCEL" v-close-popup />
        <q-btn color="primary" icon="edit" label="Edit" @click="postUpdateCategory" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useCategoryStore } from "src/stores/category";
import { fetchUpdateCategory } from "src/repositories/category"

const store = useCategoryStore()
const { dialogs, category } = storeToRefs(store)
const { getListCategory } = store

const loading = ref(false)
const message = ref("")

function setLoading(value) {
  loading.value = value
}

async function postUpdateCategory() {
  message.value = ""
  setLoading(true);
  try {
    const res = await fetchUpdateCategory({ id: category.value.id, name: category.value.name })
    getListCategory()
    dialogs.value.update = false
  } catch (err) {
    message.value = err.data.message
  } finally {
    setLoading(false);
  }
}
</script>