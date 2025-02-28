<script setup lang="ts">
// @ts-expect-error no dts in this package
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { EditEventPopup } from '@/widgets/EditPopup'
import type { CalendarEvent } from '@entities/event'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { ActivityProvider } from '@/features/activityProvider'

const $q = useQuasar()

// const showEventCreationDialog = ref(false)
const selectedEvent = ref<CalendarEvent>()
const delEventFunc = ref<() => void>()

const onEventCreate = (event: CalendarEvent, deleteEventFunction: () => void) => {
  selectedEvent.value = event
  delEventFunc.value = deleteEventFunction
  return event
}

const showDialog = (
  event: CalendarEvent,
  onOk: (e: CalendarEvent) => void,
  onCancel: () => void,
) => {
  $q.dialog({ component: EditEventPopup, componentProps: { event: event } })
    .onOk(onOk)
    .onCancel(onCancel)
}

const cancelActivity = () => {
  if (!selectedEvent.value?.title) delEventFunc.value?.()
  selectedEvent.value = undefined
}

const handleCreateEvent = (event: CalendarEvent) => {
  showDialog(selectedEvent.value ?? event, console.log, cancelActivity)
}

const handleEditEvent = (event: CalendarEvent) => {
  showDialog(event, console.log, cancelActivity)
}
</script>
<template>
  <div>
    <ActivityProvider v-slot="{ activities, events }">
      <VueCal
        :events="events"
        locale="ru"
        :time-from="8 * 60"
        :time-to="20 * 60"
        active-view="week"
        :disable-views="['years', 'year']"
        :snapToTime="5"
        hide-weekends
        :editable-events="{ title: false, drag: false, delete: false, create: true, resize: false }"
        :on-event-create="onEventCreate"
        @event-drag-create="handleCreateEvent"
        :on-event-dblclick="handleEditEvent"
        :dblclick-to-navigate="false"
        :timeCellHeight="69"
        :specialHours="activities"
      />
    </ActivityProvider>
  </div>
</template>
<style scoped lang="scss">
div {
  height: 100svh;
}

.vuecal:deep(.business-hours) {
  background-color: rgba(255, 255, 0, 0.15);
  border: solid rgba(255, 210, 0, 0.3);
  border-width: 2px 0;
}
</style>
