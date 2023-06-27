<template>
  <q-item>
    <q-item-section class="col-3 gt-sm">
      <q-item-label><span class="text-weight-medium">{{ label }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <span class="text-grey-8">{{ value }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-separator spaced />
</template>

<script setup>
const props = defineProps({
  label: String,
  value: String
})
</script>