<script setup lang="ts">
import { ref } from 'vue'
import { date, useQuasar } from 'quasar'
import type { CalendarEvent } from '@entities/event'
import { ActivityProvider } from '@features/activityProvider'
import { EditEventPopup } from '@widgets/EditPopup'
import EventCalendar from '@/widgets/CalendarWidget/EventCalendar.vue'
const $q = useQuasar()

const selectedDate = ref<Date>(date.addToDate(new Date(), { day: -new Date().getDay() + 1 }))
const showDialog = (
  event: CalendarEvent,
  onOk: (e: Partial<CalendarEvent>) => void,
  onCancel: () => void,
) =>
  $q
    .dialog({ component: EditEventPopup, componentProps: { event: event } })
    .onOk(onOk)
    .onCancel(onCancel)
</script>
<template>
  <div class="container">
    <ActivityProvider
      :date="selectedDate"
      v-slot="{ activities: specialHours, events, syncId, timelineId }"
    >
      <EventCalendar
        :specialHours
        :events
        :syncId
        :timeline-id
        :show-dialog
        @view-change="(event) =>
            event.id == 'week'
              ? (selectedDate = event.start)
              : (selectedDate = new Date(new Date().setFullYear(1971)))
        "
      />
    </ActivityProvider>
  </div>
</template>
<style scoped lang="scss">
.container {
  height: 100svh;
}

header {
  height: 5%;
  align-content: center;
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
