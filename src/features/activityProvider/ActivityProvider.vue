<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Activity, ActivityWeek } from './Activity'
import type { CalendarEvent } from '@/entities/event'
import { date as qDate } from 'quasar'
import { getActivities, getTimelines, type Timeline } from '@/shared/api/manicTimeMetods'
import { manicAuth } from '@/shared/api/config'

// const timelines = ref<Timeline[]>([])
// getTimelines()
//   .then(
//     (res) =>
//       (timelines.value = res.data.timelines.filter((t) => t.owner.username == manicAuth.username)),
//   )
//   .catch(console.log)

// timelines.value.forEach((t) => {
//   getActivities(t.timelineKey, new Date()).then()
// })

const props = defineProps<{ date: Date }>()

const allActivities: ActivityWeek[] = [
  {
    mon: [
      { from: 9 * 60, to: 13 * 60, class: 'active-hours' },
      { from: 13 * 60, to: 14 * 60, class: 'away-hours' },
      { from: 14 * 60, to: 18 * 60, class: 'active-hours' },
    ],
    tue: { from: 9 * 60, to: 18 * 60, class: 'away-hours' },
    wed: [
      { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
      { from: 14 * 60, to: 18 * 60, class: 'business-hours' },
    ],
    thu: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
    fri: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
    sat: [{ from: 8 * 60, to: 20 * 60, class: 'away-hours' }],
    sun: [{ from: 8 * 60, to: 20 * 60, class: 'away-hours' }],
  },
  {
    wed: [{ from: 9 * 60, to: 12 * 60, class: 'business-hours' }],
  },
  {
    wed: [{ from: 8 * 60, to: 20 * 60, class: 'away-hours' }],
  },
]

const extractWeekShift = (from: Date, to: Date = new Date()): number =>
  Math.floor(qDate.getDateDiff(to, from) / 7)
const shift = computed(() => {
  console.log(props.date)
  return extractWeekShift(props.date)
})

const getActivity = (weekShift: number): ActivityWeek => allActivities[weekShift]
const activities = computed<ActivityWeek>(() => getActivity(shift.value))

const events = ref<Partial<CalendarEvent>[]>([
  {
    start: new Date(),
    end: qDate.addToDate(new Date(), { hours: 2 }),
    title: 'default',
  },
])
</script>
<template>
  <slot :activities :events />
</template>
