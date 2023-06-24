<template>
  <Suspense>
    <template #default>
      <VisitorChangeForm :id="id" />
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import VisitorChangeForm from '@/components/VisitorChangeForm.vue'

const props = defineProps(['id'])
</script>
