<script setup lang="ts">
// @ts-expect-error no dts in this package
import { VueCal } from 'vue-cal'
import 'vue-cal/style'
import type { CalendarEvent } from '@/entities/event'
import type { ActivityWeek } from '@/features/activityProvider/Activity'
import type { ViewChangeEvent } from './model/ViewChangeEvent'
import { createActivity, updateActivity } from '@/shared/api'
const { specialHours, events, timelineId, syncId, showDialog } = defineProps<{
  specialHours: ActivityWeek
  events: CalendarEvent[]
  timelineId: string
  syncId: string
  showDialog: (
    event: CalendarEvent,
    onOk: (e: Partial<CalendarEvent>) => void,
    onCancel: () => void,
  ) => void
}>()
const emits = defineEmits<{ viewChange: [event: ViewChangeEvent] }>()

const handleCreateEvent = ({
  event,
  resolve,
}: {
  event: CalendarEvent
  resolve: (eventOrCancel: Partial<CalendarEvent> | boolean) => void
}) =>
  showDialog(
    event,
    (eventData: Partial<CalendarEvent>) => {
      resolve(eventData)
      createActivity(
        timelineId,
        {
          name: event.title,
          timeInterval: {
            start: event.start,
            duration: (event.end.getTime() - event.start.getTime()) / 1000,
          },
        },
        syncId,
      )
    },
    () => resolve(false),
  )

const handleUpdateEvent = ({ event }: { event: CalendarEvent }) => {
  showDialog(
    event,
    (eventData: Partial<CalendarEvent>) => {
      Object.assign(event, eventData)
      updateActivity(
        timelineId,
        parseInt(event.id),
        {
          name: event.title,
          timeInterval: {
            start: event.start,
            duration: (event.end.getTime() - event.start.getTime()) / 1000,
          },
        },
        syncId,
      )
    },
    console.log,
  )
}

const handleChangeWeek = (event: ViewChangeEvent) => emits('viewChange', event)
</script>
<template>
  <VueCal
    class="vuecal--erp-theme"
    locale="ru"
    :time-from="7 * 60"
    :time-to="20 * 60"
    :time-cell-height="70"
    events-on-month-view
    active-view="week"
    :views="['days', 'week', 'month']"
    :snap-to-interval="5"
    :editable-events="{ drag: false, resize: false, delete: false, create: true }"
    @view-change="handleChangeWeek"
    @event-create="handleCreateEvent"
    @event-dblclick="handleUpdateEvent"
    :specialHours="specialHours"
    :events="[...events]"
  >
    <template #header="{ view, availableViews, vuecal }">
      <div class="vuecal__header">
        <header class="text-h2"><span> Учёт времени сотрудника </span></header>
        <div class="vuecal__views-bar">
          <button
            class="vuecal__view-button"
            type="button"
            v-for="(dim, av) in availableViews as Record<string, string>"
            :key="av"
            :class="
              view[`is${av[0].toUpperCase() + av.slice(1).toLowerCase()}`] &&
              'vuecal__view-button--active'
            "
            @click="() => view.switch(av)"
          >
            {{ vuecal.texts[av] }}
          </button>
        </div>
        <nav class="vuecal__title-bar">
          <button
            class="vuecal__nav vuecal__nav--prev vuecal__nav--default"
            type="button"
            @click="view.previous"
          ></button>
          <div class="vuecal__transition-wrap">
            <div>
              <div class="vuecal__title" v-html="view.title" />
            </div>
            <button
              class="vuecal__nav vuecal__nav--today vuecal__nav--default vuecal__nav--active"
              :disabled="view.containsToday"
              type="button"
              @click="view.goToToday"
            >
              Сегодня
            </button>
          </div>
          <button
            class="vuecal__nav vuecal__nav--next vuecal__nav--default"
            type="button"
            @click="view.next"
          ></button>
        </nav>
      </div>
    </template>
  </VueCal>
</template>
<style scoped lang="scss">
@use 'ui/calendar-theme.scss';

header {
  padding: 5px;
}

.vuecal {
  --vuecal-border-radius: 0;
  height: 100%;
}
</style>
