<script setup lang="ts">
import { ref } from 'vue'
import type { CalendarEvent } from '@entities/event'
import { date } from 'quasar'

const props = defineProps<{ event: CalendarEvent; tags: string[] }>()
const emits = defineEmits<{ create: [event: Partial<CalendarEvent>]; cancel: [] }>()

const event = ref<Partial<CalendarEvent>>(props.event)
const start = ref<string>(date.formatDate(event.value.start, 'HH:mm'))
const end = ref<string>(date.formatDate(event.value.end, 'HH:mm'))

const changeStartTime = (value: string | null | number) => {
  start.value = value?.toString() ?? ''
  if (!value) return
  const extractedDate = date.extractDate(value.toString(), 'HH:mm')
  if (extractedDate.getHours() === 0) return
  event.value.start = date.adjustDate(event.value.start ?? new Date(), {
    hour: extractedDate.getHours(),
    minute: extractedDate.getMinutes(),
  })
  event.value.startTimeMinutes = extractedDate.getHours() * 60 + extractedDate.getMinutes()
}
const changeEndTime = (value: string | null | number) => {
  end.value = value?.toString() ?? ''
  if (!value) return
  const extractedDate = date.extractDate(value.toString(), 'HH:mm')
  if (extractedDate.getHours() === 0) return
  event.value.end = date.adjustDate(event.value.end ?? new Date(), {
    hour: extractedDate.getHours(),
    minute: extractedDate.getMinutes(),
  })
  event.value.endTimeMinutes = extractedDate.getHours() * 60 + extractedDate.getMinutes()
}
</script>
<template>
  <q-card flat class="popup">
    <q-card-section class="text-h3"> Добавление новой ?активности? </q-card-section>
    <q-card-section>
      <q-form greedy @submit="emits('create', event)" @reset="emits('cancel')">
        <q-select outlined v-model="event.title" :options="tags" :rules="[(v) => !!v]" />
        <div>
          <label>Начало</label>
          <q-input
            dense
            outlined
            autofocus
            class="text-input"
            placeholder="Введите время начала"
            lazy-rules
            :rules="[(v) => !!v, 'time']"
            no-error-icon
            hide-bottom-space
            mask="time"
            v-model="start"
            @update:model-value="changeStartTime"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="start" format24h @update:model-value="changeStartTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <label>Конец</label>
          <q-input
            dense
            outlined
            autofocus
            class="text-input"
            placeholder="Введите время начала"
            lazy-rules
            :rules="[(v) => !!v]"
            no-error-icon
            hide-bottom-space
            mask="##:##"
            v-model="end"
            @update:model-value="changeEndTime"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="end" format24h @update:model-value="changeEndTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <q-btn label="Подтвердить" type="submit" />
          <q-btn label="Отменить" type="reset" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
