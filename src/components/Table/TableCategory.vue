<template>
  <div class="q-pa-md">
    <q-table style="height: 400px" flat bordered title="🥪 Kategori Makanan" :rows="categories" :columns="columns"
      row-key="index" virtual-scroll :rows-per-page-options="[20, 50]" :loading="loading">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props" auto-width>
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props" style="font-size: 14px">
            {{ props.row.name }}
          </q-td>
          <q-td key="date" :props="props" auto-width>
            {{ formatDate(props.row.created_at) }}
          </q-td>
          <q-td key="action" :props="props" auto-width>
            <q-btn-group>
              <q-btn color="secondary" icon="edit" @click="onUpdateDialog(props.row)" />
              <q-btn color="red" icon="delete" @click="onDeleteDialog(props.row)" />
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-right>
        <q-btn-group>
          <q-btn color="primary" icon="add" label="Tambah" @click="onCreateDialog" />
        </q-btn-group>
      </template>
    </q-table>

    <DialogCreateCategory />
    <DialogUpdateCategory />
    <DialogDeleteCategory />
  </div>
</template>

<script setup>
import { formatDate } from 'src/helpers/date'
import { useCategoryStore } from 'src/stores/category';
import { storeToRefs } from 'pinia';
import DialogCreateCategory from 'src/components/Dialog/Category/DialogCreateCategory.vue'
import DialogUpdateCategory from 'src/components/Dialog/Category/DialogUpdateCategory.vue'
import DialogDeleteCategory from 'src/components/Dialog/Category/DialogDeleteCategory.vue'

const columns = [
  { name: 'id', required: true, label: 'ID', align: 'center', field: 'id', sortable: true },
  {
    name: 'name',
    required: true,
    label: 'Kategori',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  { name: 'date', label: 'Tanggal', align: 'center', field: 'date', sortable: true },
  { name: 'action', label: 'Action', align: 'center', field: 'action' },
]

const store = useCategoryStore()

const { categories, loading, dialogs, category } = storeToRefs(store)

function onCreateDialog() {
  dialogs.value.create = true
}

function onUpdateDialog(item) {
  category.value = { ...item }
  dialogs.value.update = true
}

function onDeleteDialog(item) {
  category.value = { ...item }
  dialogs.value.delete = true
}
</script>