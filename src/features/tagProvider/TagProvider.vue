<script setup lang="ts">
import { getTags } from '@/shared/api'
import { ref } from 'vue'

const tags = ref<string[]>(['oleg', 'igor'])
// getTags().then(
//   (res) => (tags.value = res.data.message.map<string>((t) => [t.project, t.subject].join(', '))),
// )
</script>
<template>
  <slot :tags />
</template>
