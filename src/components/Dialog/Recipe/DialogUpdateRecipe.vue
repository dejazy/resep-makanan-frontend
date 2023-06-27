<template>
  <q-dialog v-model="dialogs.update">
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Edit Resep</div>
      </q-card-section>
      <q-card-section class="q-pt-none row">
        <q-banner inline-actions class="text-white bg-red col-md-12 q-mb-md" v-if="message">
          {{ message }}
        </q-banner>
        <div class="col-md-6">
          <q-form @submit="postUpdateRecipe" class="q-gutter-md">
            <q-select filled v-model="updateRecipe.category_id" :options="categoryOptions" label="Kategori" emit-value
              map-options />

            <q-input filled v-model="updateRecipe.name" label="Nama Resep *" hint="Nama resep makanan" lazy-rules
              :rules="[val => val && val.length > 0 || 'Nama resep tidak boleh kosong']" />

            <q-input filled type="number" v-model="updateRecipe.time" label="Estimasi Waktu (menit) *" lazy-rules :rules="[
              val => val !== null && val !== '' || 'Tolong masukkan estimasi memasak',
              val => val > 0 && val < 1000 || 'Estimasi waktu tidak masuk akal'
            ]" />

            <q-input filled type="number" v-model="updateRecipe.portion" label="Porsi Masakan *" lazy-rules :rules="[
              val => val !== null && val !== '' || 'Tolong masukkan estimasi memasak',
              val => val > 0 && val < 1000 || 'Estimasi waktu tidak masuk akal'
            ]" />

            <q-input filled type="textarea" v-model="updateRecipe.description" label="Deskripsi *" hint="Nama resep makanan"
              lazy-rules :rules="[val => val && val.length > 0 || 'Nama resep tidak boleh kosong']" />

            <q-file filled v-model="updateRecipe.photo" label="Gambar" hint="Nama resep makanan" accept=".jpg, image/*">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template></q-file>
          </q-form>
        </div>
        <div class="col-md-6 q-px-md q-gutter-md">
          <q-select filled v-model="selectIngredient" :options="ingredientOptions" label="Bahan" hint="Tambahkan bahan">
            <template v-slot:after>
              <q-btn round dense flat icon="add" @click="pushIngredient" :disabled="selectIngredient == ''" />
            </template>
          </q-select>
          <q-list bordered separator>
            <q-item-label header>Daftar Bahan</q-item-label>

            <template v-for="(item, i) in updateRecipe.ingredients" :key="i">
              <q-item v-ripple>
                <q-item-section>
                  <q-input outlined v-model="updateRecipe.ingredients[i].measurement" :label="item.label" dense lazy-rules
                    :rules="[val => val && val.length > 0 || 'Ukuran bahan tidak boleh kosong']">
                    <template v-slot:after>
                      <q-btn round dense flat icon="close" @click="removeIngredient(item)" />
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>
        <div class="col-md-12 q-gutter-md q-mt-md">
          <q-list bordered separator>
            <q-item class="flex items-center justify-between">
              <q-item-label header>Langkah-Langkah Memasak</q-item-label>

              <q-item-section side top>
                <q-item-label caption>
                  <q-btn icon="add" flat color="primary" @click="addStep"></q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>

            <template v-for="(item, i) in updateRecipe.steps" :key="i">
              <q-item v-ripple>
                <q-item-section>
                  <q-input outlined v-model="updateRecipe.steps[i]" :label="`Step ${i + 1}`">
                    <template v-slot:after>
                      <q-btn round dense flat icon="close" @click="removeStep(i)" />
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal q-pa-md">
        <q-btn label="Batal" color="primary" flat class="q-ml-sm" v-close-popup />
        <q-btn label="Edit" icon="edit" type="submit" color="primary" @click="postUpdateRecipe" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, computed } from "vue"
import { storeToRefs } from "pinia";
import { useRecipeStore } from "src/stores/recipe"
import { useCategoryStore } from "src/stores/category"
import { useIngredientStore } from "src/stores/ingredient"
import { fetchUpdateRecipe } from "src/repositories/recipe"

const store = useRecipeStore()
const categoryStore = useCategoryStore()
const ingredientStore = useIngredientStore()

const { dialogs, updateRecipe } = storeToRefs(store)
const { categories } = storeToRefs(categoryStore)
const { ingredients } = storeToRefs(ingredientStore)

const { getListRecipe, getRecipe } = store
const { getListCategory } = categoryStore
const { getListIngredient } = ingredientStore

const selectIngredient = ref("")
const message = ref("")
const loading = ref(false)

const categoryOptions = computed(() => categories.value.map((value) => ({ label: value.name, value: value.id })))
const ingredientOptions = computed(() => ingredients.value
  .filter(value => !updateRecipe.value.ingredients.some(el => el.value === value.id))
  .map((value) => ({ label: value.name, value: value.id })))

function setLoading(value) {
  loading.value = value
}

function pushIngredient() {
  updateRecipe.value.ingredients.push({
    ...selectIngredient.value,
    id: selectIngredient.value.value,
    measurement: ""
  })
  selectIngredient.value = ""
}

function removeIngredient(ingredient) {
  updateRecipe.value.ingredients = updateRecipe.value.ingredients.filter(value => value.value !== ingredient.value)
}

function addStep() {
  updateRecipe.value.steps.push("")
}

function removeStep(index) {
  updateRecipe.value.steps.splice(index, 1)
}

async function postUpdateRecipe() {
  message.value = ""
  setLoading(true)
  try {
    const res = await fetchUpdateRecipe(updateRecipe.value)
    getRecipe(updateRecipe.value.id)
    getListRecipe()
  } catch (err) {
    console.log(err)
    message.value = err.data.message
  } finally {
    setLoading(false)
  }
}

onMounted(() => {
  getListCategory()
  getListIngredient()
})
</script>