<script setup lang="ts">
import { getTags } from '@/shared/api'
import { onMounted, ref } from 'vue'

const tags = ref<string[]>([])

onMounted(() => {
  getTags().then(
    (res) => (tags.value = res.message.map<string>((t) => [t.project, t.subject].join(', '))),
  )
})
</script>
<template>
  <slot :tags />
</template>
