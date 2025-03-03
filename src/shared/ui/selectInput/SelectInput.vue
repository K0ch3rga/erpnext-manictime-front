<template>
  <div :data-test="props.dataTest" :style="`width:${props.width}px`">
    <div class="row justify-start">
      <span :data-test="props.dataTestLabel" v-if="!slots.topLabel">
        {{ props.label }}
      </span>
    </div>

    <q-select
      ref="SelectInputCmpRef"
      :data-test="props.dataTestField"
      outlined
      rounded
      stack-label
      class="super-small"
      :clearable="props.clearable"
      :disable="props.disable"
      :readonly="props.readonly"
      :emit-value="props.emitValue"
      :model-value="props.modelValue"
      @filter="filterFn"
      @input-value="emits('update:model-value', $event)"
      :hint="props.hint"
      :option-label="props.optionLabel"
      :option-value="props.optionValue"
      :options="options"
      :hide-bottom-space="props.hideBottomSpace"
      :hide-hint="props.hideBottomSpace"
      :rules="props.rules"
      :lazy-rules="props.lazyRules"
      :reactive-rules="props.reactiveRules"
      :autofocus="props.autofocus"
      :placeholder="props.placeholder"
      :multiple="props.multiple"
      :counter="props.counter"
      :filled="props.filed"
      :use-chips="props.useChips"
      no-error-icon
      dense
      use-input
      new-value-mode="add"
      hide-selected
      fill-input
      map-options
      options-dense
      :input-style="[
        props.readonly ? 'cursor: not-allowed' : '',
        props.disable ? 'cursor: not-allowed' : '',
      ]"
    >
      <template v-if="slots.append" #append>
        <slot name="append" />
      </template>
      <template v-if="slots.after" #after>
        <slot name="after" />
      </template>
      <template v-if="slots.before" #before>
        <slot name="before" />
      </template>
      <template v-if="slots.option" #option="scope">
        <slot name="option" :props="scope" />
      </template>
      <!-- <template v-if="!props.modelValue" v-slot:selected>
        <span style="font-size: 12px" class="text-grey-6">{{
          props.placeholder
        }}</span>
      </template> -->
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { QSelect, useQuasar, type ValidationRule } from 'quasar'
import { ref, useSlots } from 'vue'
const $q = useQuasar()
$q.iconSet.arrow.dropdown = 'keyboard_arrow_down'
const slots = useSlots()
interface ISelectFieldItem {
  label: string
  value: string
}

interface ISelectField {
  label?: string
  hint?: string
  optionLabel?: string | undefined
  optionValue?: string | undefined
  color?: string
  modelValue?: string | number
  placeholder?: string
  lazyRules?: boolean | 'ondemand' | undefined
  reactiveRules?: boolean | undefined
  disable?: boolean
  readonly?: boolean
  emitValue?: boolean
  clearable?: boolean
  autofocus?: boolean
  hideBottomSpace?: boolean
  options?: ISelectFieldItem[] | string[] | any[]
  rules?: ValidationRule[]
  width?: number | undefined
  dataTest: string | undefined
  dataTestLabel?: string | undefined
  dataTestField?: string | undefined
  customFilter?: void
  useCustomFilter?: boolean
  multiple?: boolean
  counter?: boolean
  filed?: boolean
  useChips?: boolean
}

/**
 * Поле выбора
 * @param {any} defineProps<IInputField>(
 * @returns {any}
 */
const props = withDefaults(defineProps<ISelectField>(), {
  label: 'Select Input',
  hint: '',
  optionLabel: undefined,
  optionValue: undefined,
  placeholder: 'Select value',
  color: 'primary',
  modelValue: '',
  lazyRules: false,
  reactiveRules: false,
  emitValue: false,
  disable: false,
  readonly: false,
  clearable: false,
  hideBottomSpace: false,
  useCustomFilter: false,
  autofocus: false,
  width: undefined,
  dataTest: undefined,
  dataTestLabel: undefined,
  dataTestField: undefined,
  multiple: undefined,
  counter: undefined,
  useChips: false,

  rules: () => [() => true],
})

const emits = defineEmits<{
  (e: 'update:model-value', value: string | number | null): void
  (
    e: 'customFilter',
    val: string,
    update: (callbackFn: () => void, afterFn?: ((ref: QSelect) => void) | undefined) => void,
  ): void
}>()

const options = ref(props.options)
/**
 * Фильтрация выпадающего списка
 * @param {any} val:string
 * @param {any} update
 * @returns {any}
 */
const filterFn = (
  val: string,
  update: (callbackFn: () => void, afterFn?: ((ref: QSelect) => void) | undefined) => void,
) => {
  if (!props.useCustomFilter) {
    if (val === '' && Array.isArray(props.options)) {
      update(() => {
        options.value = props.options
      })
      return
    }
    update(() => {
      const needle = val.toLowerCase()
      if (Array.isArray(props.options)) {
        options.value = props.options.filter((v) => v.toLowerCase().indexOf(needle) > -1)
      } else {
        options.value = []
      }
    })
  } else {
    emits('customFilter', val, update)
  }
}

const SelectInputCmpRef = ref()

const hidePopup = () => {
  SelectInputCmpRef.value?.hidePopup()
}
const showPopup = () => {
  SelectInputCmpRef.value?.showPopup()
}

defineExpose({
  hidePopup,
  showPopup,
})
</script>
