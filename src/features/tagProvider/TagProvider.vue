<script setup lang="ts">
import { ref } from 'vue'

const getTags = (): string[] => ['oleg', 'igor']
const tags = ref<string[]>(getTags())
</script>
<template>
  <slot :tags />
</template>
