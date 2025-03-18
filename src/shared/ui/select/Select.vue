<template>
  <div :data-test="props.dataTest" :style="[`width:${props.width}px`]">
    <div class="row justify-start">
      <span :data-test="props.dataTestLabel" v-if="!slots.topLabel">
        {{ props.label }}
        <span v-if="props.requiredSign" class="text-negative" style="font-size: 0.9em">*</span>
      </span>
      <slot name="topLabel" />
    </div>

    <q-select
      ref="SelectCmpRef"
      :data-test="props.dataTestField"
      outlined
      rounded
      stack-label
      class="super-small single-line-value-select"
      :clearable="props.clearable"
      :disable="props.disable"
      :readonly="props.readonly"
      :emit-value="props.emitValue"
      :model-value="props.modelValue"
      @update:model-value="(event: typeof props.modelValue) => $emit('update:model-value', event)"
      :hint="props.hint"
      :option-label="props.optionLabel"
      :option-value="props.optionValue"
      :option-disable="props.optionDisable"
      :options="props.options"
      :hide-bottom-space="props.hideBottomSpace"
      :hide-hint="props.hideBottomSpace"
      :rules="props.rules"
      :lazy-rules="props.lazyRules"
      :reactive-rules="props.reactiveRules"
      :autofocus="props.autofocus"
      :placeholder="props.placeholder"
      :multiple="props.multiple"
      :counter="props.counter"
      :use-chips="props.useChips"
      dense
      no-error-icon
      options-dense
      map-options
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
        <slot name="option" v-bind="scope" />
      </template>
      <template v-if="!props.modelValue && props.modelValue !== 0" #selected>
        <div
          class="size-limited-selected-item"
          :style="[
            props.readonly ? 'cursor: not-allowed' : '',
            props.disable ? 'cursor: not-allowed' : '',
          ]"
        >
          <span
            :data-test="props.dataTestField"
            :class="!props.modelValue && props.modelValue !== 0 ? 'text-grey-6 ' : ''"
            >{{ props.placeholder }}</span
          >
        </div>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { useQuasar, type ValidationRule } from 'quasar'
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
  optionDisable?: string
  color?: string
  modelValue?: string | number | boolean | object | undefined | null
  placeholder?: string
  lazyRules?: boolean | 'ondemand' | undefined
  reactiveRules?: boolean | undefined
  disable?: boolean
  readonly?: boolean
  emitValue?: boolean
  clearable?: boolean
  autofocus?: boolean
  options?: ISelectFieldItem[] | string[] | any[]
  hideBottomSpace?: boolean
  rules?: ValidationRule[]
  width?: number | undefined
  dataTest: string | undefined
  dataTestLabel?: string | undefined
  dataTestField?: string | undefined
  multiple?: boolean
  counter?: boolean
  useChips?: boolean
  requiredSign?: boolean
}
/**
 * Поле выбора
 * @param {any} defineProps<IInputField>(
 * @returns {any}
 */
const props = withDefaults(defineProps<ISelectField>(), {
  label: 'Select',
  hint: undefined,
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
  autofocus: false,
  width: undefined,
  dataTest: undefined,
  dataTestLabel: undefined,
  dataTestField: undefined,
  useChips: false,
  rules: () => [() => true],
  requiredSign: false,
})

const SelectCmpRef = ref()

const hidePopup = () => {
  SelectCmpRef.value?.hidePopup()
}
const showPopup = () => {
  SelectCmpRef.value?.showPopup()
}

defineExpose({
  hidePopup,
  showPopup,
})
</script>
<style>
.single-line-value-select .q-field__native {
  flex-wrap: nowrap;
}
.single-line-value-select .q-field__native > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.size-limited-selected-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
