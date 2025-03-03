<script setup lang="ts">
import { ref } from 'vue'
import type { CalendarEvent } from '@entities/event'
import { date } from 'quasar'
import { AdvButton, AdvInput, AdvSelectInput } from '@/shared/ui'

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
    <q-card-section class="text-h4"> Добавление нового времени </q-card-section>
    <q-card-section>
      <q-form greedy @submit="emits('create', event)" @reset="emits('cancel')">
        <AdvSelectInput
          label="Название задачи"
          placeholder="Выберите задачу"
          v-model="event.title"
          :rules="[(v) => !!v, (v) => tags.includes(v)]"
          :options="tags"
          data-test="tag-input"
        />
        <div class="date-panel">
          <div class="date-picker">
            <AdvInput
              label="Начало"
              placeholder="Введите время начала"
              lazy-rules
              :rules="[(v) => !!v, 'time']"
              no-error-icon
              hide-bottom-space
              mask="time"
              v-model="start"
              @update:model-value="changeStartTime"
              dataTest="start-input"
              dataTestLabel="start-label"
              dataTestField="start-field"
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
            </AdvInput>
          </div>
          <div class="date-picker">
            <AdvInput
              label="Конец"
              placeholder="Введите время начала"
              lazy-rules
              :rules="[(v) => !!v]"
              no-error-icon
              hide-bottom-space
              mask="##:##"
              v-model="end"
              @update:model-value="changeEndTime"
              dataTest="end-input"
              dataTestLabel="end-label"
              dataTestField="end-field"
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
            </AdvInput>
          </div>
        </div>
        <div class="control-panel">
          <AdvButton
            label="Отменить"
            type="reset"
            outline
            color="red"
            hover-color="red"
            width="auto"
          />
          <AdvButton
            label="Подтвердить"
            type="submit"
            width="auto"
            color="green-gradient"
            hover-color="green-gradient"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<style lang="sass">

.date-panel, .control-panel
  display: flex
  flex-direction: row
  justify-content: space-between
  gap: 10px

.control-panel
  padding-top: 10px
</style>
