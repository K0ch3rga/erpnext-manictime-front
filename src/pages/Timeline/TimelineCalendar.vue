<script setup lang="ts">
// @ts-expect-error no dts in this package
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { EditEventPopup } from '@/widgets/EditPopup'
import type { CalendarEvent } from '@entities/event'
import { ref } from 'vue'
import { useQuasar, date } from 'quasar'
import { ActivityProvider } from '@/features/activityProvider'
import type { ViewChangeEvent } from './model/ViewChangeEvent'

const $q = useQuasar()

// const showEventCreationDialog = ref(false)
const selectedEvent = ref<CalendarEvent>()
const delEventFunc = ref<() => void>()
const selectedDate = ref(date.adjustDate(new Date(), { date: 2 }))

const onEventCreate = (event: CalendarEvent, deleteEventFunction: () => void) => {
  selectedEvent.value = event
  delEventFunc.value = deleteEventFunction
  return event
}

const showDialog = (event: CalendarEvent, onOk: (e: CalendarEvent) => void, onCancel: () => void) =>
  $q
    .dialog({ component: EditEventPopup, componentProps: { event: event } })
    .onOk(onOk)
    .onCancel(onCancel)

const cancelActivity = () => {
  if (!selectedEvent.value?.title) delEventFunc.value?.()
  selectedEvent.value = undefined
}

const handleCreateEvent = (event: CalendarEvent) =>
  showDialog(selectedEvent.value ?? event, console.log, cancelActivity)

const handleEditEvent = (event: CalendarEvent) => showDialog(event, console.log, cancelActivity)

const handleChangeWeek = (event: ViewChangeEvent) => {
  if (event.view === 'week') {
    selectedDate.value = event.startDate
  }
}
</script>
<template>
  <div class="container">
    <!-- Учёт времени сотрудника -->
    <ActivityProvider :date="selectedDate" v-slot="{ activities, events }">
      <VueCal
        events-on-month-view="short"
        :events="events"
        locale="ru"
        :time-from="7 * 60"
        :time-to="20 * 60"
        active-view="week"
        :disable-views="['years', 'year', 'day']"
        :snapToTime="5"
        :editable-events="{ title: false, drag: false, delete: false, create: true, resize: false }"
        :on-event-create="onEventCreate"
        @event-drag-create="handleCreateEvent"
        :on-event-dblclick="handleEditEvent"
        :dblclick-to-navigate="false"
        :timeCellHeight="69"
        :specialHours="activities"
        class="vuecal--erp-theme"
        @view-change="handleChangeWeek"
      />
    </ActivityProvider>
  </div>
</template>
<style scoped lang="scss">
@use 'ui/calendar-theme.scss';

.container {
  height: 100svh;
}
</style>
