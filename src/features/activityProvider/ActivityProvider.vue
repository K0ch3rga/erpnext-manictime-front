<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Activity, ActivityWeek } from './Activity'
import type { CalendarEvent } from '@/entities/event'
import { date as qDate } from 'quasar'

const props = defineProps<{ date: Date }>()

const allActivities: ActivityWeek[] = [
  {
    1: [
      { from: 9 * 60, to: 13 * 60, class: 'active-hours' },
      { from: 13 * 60, to: 14 * 60, class: 'away-hours' },
      { from: 14 * 60, to: 18 * 60, class: 'active-hours' },
    ],
    2: { from: 9 * 60, to: 18 * 60, class: 'away-hours' },
    3: [
      { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
      { from: 14 * 60, to: 18 * 60, class: 'business-hours' },
    ],
    4: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
    5: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  },
  {
    1: [] as Activity[],
    2: [] as Activity[],
    4: [] as Activity[],
    5: [] as Activity[],
    3: [{ from: 9 * 60, to: 12 * 60, class: 'business-hours' }],
  },
  {
    1: [] as Activity[],
    2: [] as Activity[],
    4: [] as Activity[],
    5: [] as Activity[],
    3: [{ from: 8 * 60, to: 20 * 60, class: 'away-hours' }],
  },
]

const extractWeekShift = (from: Date, to: Date = new Date()): number =>
  Math.floor(qDate.getDateDiff(to, from) / 7)
const shift = computed(() => extractWeekShift(props.date))

const getActivity = (weekShift: number): ActivityWeek => allActivities[weekShift]
const activities = computed<ActivityWeek>(() => getActivity(shift.value))

const events = ref<CalendarEvent[]>([])
</script>
<template>
  <slot :activities :events />
</template>
