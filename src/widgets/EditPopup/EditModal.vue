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
        <q-select
          outlined
          v-model="event.title"
          :options="tags"
          :rules="[(v) => !!v]"
          class="select"
        />
        <div class="date-panel">
          <div class="date-picker">
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
          </div>
          <div class="date-picker">
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
        </div>
        <div class="control-panel">
          <q-btn label="Отменить" type="reset" flat outline class="cancel btn btn-stroke big" />
          <q-btn label="Подтвердить" type="submit" flat outline class="submit btn btn-stroke big" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<style lang="sass">

.date-panel
  display: flex
  flex-direction: row
  justify-content: space-between
  .date-picker
    width:240px

.control-panel
  display: flex
  flex-direction: row
  justify-content: space-between
  padding-top: 10px

.btn.cancel.cancel
    color: #f80000
    &:hover
      color: #f80000

.btn.submit.submit
  background: linear-gradient(157.69deg, #14A470 0.72%, #149FA4 37.16%, #149FA4 67.19%, #1481A4 99.2%)
  color: white
  &.btn-stroke::before
    border-width: 0
  &:hover
    color: white

.q-btn.btn
  font-size: 10px
  border-radius: 10px
  &::before
    font-weight: inherit

  &
    color: var(--blue1)
  &:hover
    color: var(--blue4)
  &.disabled
    color: var(--grey5)

  &.btn-stroke
    &::before
      border: 1px solid currentColor

    &:hover .q-focus-helper
      background-color: var(--background) !important

  &.btn-fill
    background-color: currentColor !important
    .q-btn__content
      color: var(--button-text)

  &.small
    min-width: 90px
    height: 24px

  &.medium
    min-width: 240px
    height: 32px

  &.big
    min-width: 240px
    height: 40px

  &.btn-link
    &:hover .q-focus-helper
      background-color: var(--background) !important

.q-icon.fill
  font-variation-settings: 'FILL' 1

.q-btn-group.toggle
  padding: 2px
  border-radius: 12px
  background-color: var(--blue3)
  color: var(--blue1)

  button
    padding: 3px
    height: 24px
    width: 24px
    min-height: 14px
    &.bg-primary
      background-color: var(--blue1) !important
    &.q-button-item
      border-radius: inherit
    &.q-btn-item
      border-radius: inherit

    .q-btn__content
      height: 24px !important

    .q-focus-helper
      height: 0
      width: 0
.q-select.select.select
  border-radius: 8px
  .q-field__control
    border-radius: 8px
    min-height: 34px
    // height: 24px
    &
      color: #D4D9E5
    &:hover
      color: #B7BFD1
    &::before
      border: 1px solid currentColor
    &::after
      border-width: 1px

    .q-field__native
      min-height: inherit
      line-height: inherit
      padding: 0
    .q-icon
      font-size: 1em
  .q-field__marginal
    height: 24px
  .q-field__append
    align-self: center

.q-field.text-input.text-input
  border-radius: 8px
  .q-field__control
    height: 34px
    min-width: 100px
    font-size: 12px
    border-radius: 8px
    color: #2D8DFE
    &.q-field__control::after
      border-width: 1px
    &::before
      border: 1px solid #D4D9E5

    &:hover::before
      border-color: #B7BFD1
    &.text-negative
      color: #FB0000 !important

  .q-field__bottom
    color: #FB0000
    padding: 5px 0 0 0

  .q-field__marginal
    height: inherit
</style>
