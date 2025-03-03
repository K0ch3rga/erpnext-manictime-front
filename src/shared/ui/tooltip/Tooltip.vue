<template>
  <q-tooltip
    :style="{ color: $q.dark.isActive ? 'white' : 'black' }"
    :anchor="anchor"
    :self="self"
    :max-width="props.maxWidth"
    :class="
      $q.dark.isActive
        ? props.position === 'bottom'
          ? 'arrow_box_top_dark'
          : 'arrow_box_bottom_dark'
        : props.position === 'bottom'
          ? 'arrow_box_top'
          : 'arrow_box_bottom'
    "
  >
    {{ props.text }}
  </q-tooltip>
</template>

<script setup lang="ts">
import type { QTooltipProps } from 'quasar'
import { computed } from 'vue'
interface ITooltipComponent extends QTooltipProps {
  text?: string | undefined
  position: 'top' | 'bottom'
  maxWidth?: string
}
const props = withDefaults(defineProps<ITooltipComponent>(), {
  text: '',
  anchor: 'bottom middle',
  position: 'top',
  maxWidth: '20rem',
})

const self = computed(() => {
  return props.position === 'top' ? 'bottom middle' : 'top middle'
})
const anchor = computed(() => {
  return props.position === 'top' ? 'top middle' : 'bottom middle'
})
</script>
