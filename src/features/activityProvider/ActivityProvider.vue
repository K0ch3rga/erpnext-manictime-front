<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { date as qDate } from 'quasar'
import type { Activity, ActivityWeek } from './Activity'
import type { CalendarEvent } from '@/entities/event'
import { getActivitiesAndUsage } from '@/shared/api'

const props = defineProps<{ date: Date }>()

const allActivities = ref<Record<string, ActivityWeek>>({})
const allEvents = ref<CalendarEvent[]>([])

const timelineId = ref<string>('')
const syncId = ref<string>('')

const getActivity = (dataStorage: Record<string, ActivityWeek>, weekStart: Date): ActivityWeek => {
  return dataStorage[weekStart.toDateString()] ?? {}
}

const getEvents = (): CalendarEvent[] => allEvents.value

const activities = computed<ActivityWeek>(() => getActivity(allActivities.value, props.date))
const events = computed<CalendarEvent[]>(() => getEvents())

const dayNames = new Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>(
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
)

const updateValues = async () => {
  await getActivitiesAndUsage(qDate.addToDate(props.date, { days: -6 })).then((res) => {
    timelineId.value = res.message.timelineId
    allEvents.value = res.message.activities.map(
      (e) =>
        ({
          title: e.values.name,
          id: e.entityId,
          start: new Date(e.values.timeInterval.start),
          end: new Date(
            Date.parse(e.values.timeInterval.start) + e.values.timeInterval.duration * 100 * 40, // or 60 idk
          ),
          class: e.values.name.split(', ')[0],
        }) as unknown as CalendarEvent,
    )

    const collectedActivities: Record<string, ActivityWeek> = {}
    res.message.usages.forEach((u) => {
      const date = new Date(u.values.timeInterval.start.split('T')[0])
      const datetime = new Date(u.values.timeInterval.start)
      const startTime = datetime.getHours() * 60 + datetime.getMinutes()
      const activity: Activity = {
        from: startTime,
        to: startTime + Math.ceil(u.values.timeInterval.duration / 60),
        class:
          u.values.name.split(' ').join('-').toLowerCase() +
          '-hours' +
          ' ' +
          u.values.timeInterval.start.split('T')[0].split('-')[2],
      }
      const weekStart = qDate.addToDate(date, {
        day: -(date.getDay() === 0 ? 6 : date.getDay() - 1),
      })

      if (!collectedActivities[weekStart.toDateString()])
        collectedActivities[weekStart.toDateString()] = {}
      const week = collectedActivities[weekStart.toDateString()]
      const curDay = week[dayNames[date.getDay()]]
      if (curDay) curDay.push(activity)
      else week[dayNames[date.getDay()]] = [activity]
    })
    allActivities.value = collectedActivities
  })
}

watch(() => props.date, updateValues)
onMounted(updateValues)
</script>
<template>
  <slot :activities :events :timelineId :syncId />
</template>
