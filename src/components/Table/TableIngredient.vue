<template>
  <div class="q-pa-md">
    <q-table style="height: 400px" flat bordered title="🍒 Bahan Makanan" :rows="ingredients" :columns="columns"
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

    <DialogCreateIngredient />
    <DialogUpdateIngredient />
    <DialogDeleteIngredient />
  </div>
</template>

<script setup>
import { formatDate } from 'src/helpers/date'
import { useIngredientStore } from 'src/stores/ingredient';
import { storeToRefs } from 'pinia';
import DialogCreateIngredient from 'src/components/Dialog/Ingredient/DialogCreateIngredient.vue'
import DialogUpdateIngredient from 'src/components/Dialog/Ingredient/DialogUpdateIngredient.vue'
import DialogDeleteIngredient from 'src/components/Dialog/Ingredient/DialogDeleteIngredient.vue'

const columns = [
  { name: 'id', required: true, label: 'ID', align: 'center', field: 'id', sortable: true },
  {
    name: 'name',
    required: true,
    label: 'Bahan',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  { name: 'date', label: 'Tanggal', align: 'center', field: 'date', sortable: true },
  { name: 'action', label: 'Action', align: 'center', field: 'action' },
]

const store = useIngredientStore()

const { ingredients, loading, dialogs, ingredient } = storeToRefs(store)

function onCreateDialog() {
  dialogs.value.create = true
}

function onUpdateDialog(item) {
  ingredient.value = { ...item }
  dialogs.value.update = true
}

function onDeleteDialog(item) {
  ingredient.value = { ...item }
  dialogs.value.delete = true
}
</script>