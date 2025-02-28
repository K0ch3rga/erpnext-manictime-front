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
        class="vuecal--erp-theme"
      />
    </ActivityProvider>
  </div>
</template>
<style scoped lang="scss">
div {
  height: 100svh;
}

.vuecal--erp-theme:deep(.business-hours) {
  background-color: rgba(255, 255, 0, 0.15);
  border: solid rgba(255, 210, 0, 0.3);
  border-width: 2px 0;
}
.vuecal--erp-theme:deep(.vuecal__menu, .vuecal__cell-events-count) {
  padding: 8px 0;
  background: linear-gradient(
    157.69deg,
    #14a470 0.72%,
    #149fa4 37.16%,
    #149fa4 67.19%,
    #1481a4 99.2%
  );
}
.vuecal--erp-theme:deep(.vuecal__title-bar) {
  background-color: #d4efe1;
}
.vuecal--erp-theme:deep(.vuecal__view-btn--active) {
  border-radius: 10px;
  border-bottom: 0;
  background: linear-gradient(
    88.54deg,
    rgba(244, 252, 255, 0.3) 1.52%,
    rgba(246, 253, 255, 0.4) 27.54%,
    rgba(249, 253, 255, 0.2) 65.82%,
    rgba(255, 255, 255, 0.05) 99.69%
  );
}
.vuecal--erp-theme:deep(.vuecal__view-btn) {
  transition: 0s;
  color: #ffffff;
}
.vuecal--erp-theme:deep(.vuecal__body) {
  background-color: #eef5f5;
}
.vuecal--erp-theme:deep(.vuecal__weekdays-headings) {
  background-color: #eef5f5;
}
.vuecal--erp-theme:deep(.vuecal__cell--today, .vuecal__cell--current) {
  background-color: rgba(240, 240, 255, 0.4);
}
.vuecal--erp-theme:deep(.vuecal:not(.vuecal--day-view) .vuecal__cell--selected) {
  background-color: rgba(235, 255, 245, 0.4);
}
.vuecal--erp-theme:deep(.vuecal__cell--selected:before) {
  border-color: rgba(66, 185, 131, 0.5);
}
</style>
