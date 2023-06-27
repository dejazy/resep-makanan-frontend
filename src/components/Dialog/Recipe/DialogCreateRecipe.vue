<template>
  <q-dialog v-model="dialogs.create">
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Buat Resep Baru</div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <q-banner inline-actions class="text-white bg-red col-md-12 q-mb-md" v-if="message">
          {{ message }}
        </q-banner>
        <div class="col-md-6">
          <q-form @submit="postCreateRecipe" class="q-gutter-md">
            <q-select filled v-model="form.category_id" :options="categoryOptions" label="Kategori" emit-value
              map-options />

            <q-input filled v-model="form.name" label="Nama Resep *" hint="Nama resep makanan" lazy-rules
              :rules="[val => val && val.length > 0 || 'Nama resep tidak boleh kosong']" />

            <q-input filled type="number" v-model="form.time" label="Estimasi Waktu (menit) *" lazy-rules :rules="[
              val => val !== null && val !== '' || 'Tolong masukkan estimasi memasak',
              val => val > 0 && val < 1000 || 'Estimasi waktu tidak masuk akal'
            ]" />

            <q-input filled type="number" v-model="form.portion" label="Porsi Masakan *" lazy-rules :rules="[
              val => val !== null && val !== '' || 'Tolong masukkan estimasi memasak',
              val => val > 0 && val < 1000 || 'Estimasi waktu tidak masuk akal'
            ]" />

            <q-input filled type="textarea" v-model="form.description" label="Deskripsi *" hint="Nama resep makanan"
              lazy-rules :rules="[val => val && val.length > 0 || 'Nama resep tidak boleh kosong']" />

            <q-file filled v-model="form.photo" label="Gambar *" hint="Nama resep makanan" accept=".jpg, image/*">
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

            <template v-for="(item, i) in form.ingredients" :key="i">
              <q-item v-ripple>
                <q-item-section>
                  <q-input outlined v-model="form.ingredients[i].measurement" :label="item.label" dense lazy-rules
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

            <template v-for="(item, i) in form.steps" :key="i">
              <q-item v-ripple>
                <q-item-section>
                  <q-input outlined v-model="form.steps[i]" :label="`Step ${i + 1}`">
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

      <q-card-actions align="right" class="bg-white text-amber-10 q-pa-md">
        <q-btn label="Batal" color="amber-10" flat class="q-ml-sm" v-close-popup />
        <q-btn label="Buat" icon="add" type="submit" color="amber-10" @click="postCreateRecipe" :loading="loading" />
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
import { fetchCreateRecipes } from "src/repositories/recipe"

const store = useRecipeStore()
const categoryStore = useCategoryStore()
const ingredientStore = useIngredientStore()

const { dialogs } = storeToRefs(store)
const { categories } = storeToRefs(categoryStore)
const { ingredients } = storeToRefs(ingredientStore)

const { getListRecipe } = store
const { getListCategory } = categoryStore
const { getListIngredient } = ingredientStore

const selectIngredient = ref("")
const message = ref("")
const loading = ref(false)

const initForm = {
  category_id: "",
  name: "",
  time: 0,
  portion: 1,
  description: "",
  photo: null,
  steps: [],
  ingredients: [],
}
const form = ref({ ...initForm })

const categoryOptions = computed(() => categories.value.map((value) => ({ label: value.name, value: value.id })))
const ingredientOptions = computed(() => ingredients.value
  .filter(value => !form.value.ingredients.some(el => el.value === value.id))
  .map((value) => ({ label: value.name, value: value.id })))

function setLoading(value) {
  loading.value = value
}

function pushIngredient() {
  form.value.ingredients.push({
    ...selectIngredient.value,
    id: selectIngredient.value.value,
    measurement: ""
  })
  selectIngredient.value = ""
}

function removeIngredient(ingredient) {
  form.value.ingredients = form.value.ingredients.filter(value => value.value !== ingredient.value)
}

function addStep() {
  form.value.steps.push("")
}

function removeStep(index) {
  form.value.steps.splice(index, 1)
}

async function postCreateRecipe() {
  message.value = ""
  setLoading(true)
  try {
    const res = await fetchCreateRecipes(form.value)
    getListRecipe()
    form.value = { ...initForm }
    dialogs.value.create = false
  } catch (err) {
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