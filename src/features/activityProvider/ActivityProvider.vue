<script setup lang="ts">
import { ref } from 'vue'
import type { ActivityWeek } from './Activity'
import type { CalendarEvent } from '@/entities/event'

const getActivity = (): ActivityWeek => ({
  1: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  2: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  3: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 18 * 60, class: 'business-hours' },
  ],
  4: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  5: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
})

const events = ref<CalendarEvent[]>([])
const activities = ref<ActivityWeek>(getActivity())
</script>
<template>
  <slot :activities :events />
</template>
