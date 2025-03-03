<template>
  <div :data-test="props.dataTest" :style="[`width:${props.width}px`]">
    <!-- <div v-if="!props.hideLabel" class="row justify-start"> -->
    <div class="row justify-start">
      <span :data-test="props.dataTestLabel" v-if="!slots.topLabel">
        {{ props.label }}
        <span v-if="props.requiredSign" class="text-negative" style="font-size: 0.9em">*</span>
      </span>
      <slot name="topLabel" />
    </div>
    <q-input
      ref="InputRef"
      :data-test="props.dataTestField"
      rounded
      stack-label
      class="super-small"
      :outlined="props.outlined"
      :filled="props.filled"
      dense
      v-model="modelValueComputed"
      :rules="props.rules"
      :lazy-rules="props.lazyRules"
      :reactive-rules="props.reactiveRules"
      :disable="props.disable"
      :readonly="props.readonly"
      :clearable="props.clearable"
      :autofocus="props.autofocus"
      :type="props.type"
      :placeholder="props.placeholder"
      no-error-icon
      :hide-bottom-space="props.hideBottomSpace"
      :hide-hint="false"
      :bg-color="props.bgColor"
      :color="props.color"
      :debounce="props.debounce"
      :error="props.error"
      :error-message="props.errorMessage"
      :mask="props.mask"
      :unmasked-value="props.unmaskedValue"
      bottom-slots
      :min="props.min"
      :max="props.max"
      @blur="(e: any) => emits('blur', e)"
      :input-style="[
        props.readonly ? 'cursor: not-allowed' : '',
        props.disable ? 'cursor: not-allowed' : '',
        props.inputStyle ? props.inputStyle : '',
      ]"
    >
      <template v-if="slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
      <template v-if="slots.append" #append>
        <slot name="append" />
      </template>

      <template v-if="slots.after" #after>
        <slot name="after" />
      </template>
      <template v-if="slots.before" #before>
        <slot name="before" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { QInput, type ValidationRule } from 'quasar'
import { computed, ref, useSlots, defineExpose } from 'vue'
const slots: any = useSlots()

interface IInputField {
  label?: string | undefined
  errorMessage?: string
  type?:
    | 'number'
    | 'text'
    | 'date'
    | 'time'
    | 'email'
    | 'search'
    | 'textarea'
    | 'password'
    | 'tel'
    | 'file'
    | 'url'
    | undefined
  bgColor?: string | undefined
  color?: string
  modelValue?: string | number | null
  placeholder?: string
  lazyRules?: boolean | 'ondemand' | undefined
  reactiveRules?: boolean | undefined
  disable?: boolean
  readonly?: boolean
  clearable?: boolean
  outlined?: boolean
  filled?: boolean
  autofocus?: boolean
  dense?: boolean
  hideLabel?: boolean
  hideBottomSpace?: boolean
  rules?: ValidationRule[]
  width?: string | undefined
  height?: string
  debounce?: string | number
  error?: boolean
  dataTest: string | undefined
  dataTestLabel: string | undefined
  dataTestField: string | undefined
  mask?: string
  unmaskedValue?: boolean
  min?: number
  max?: number
  requiredSign?: boolean
  inputStyle?: string | string[] | undefined
}
/**
 * Поле ввода
 * @param {any} defineProps<IInputField>(
 * @returns {any}
 */
const props = withDefaults(defineProps<IInputField>(), {
  label: undefined,
  errorMessage: undefined,
  error: undefined,
  type: 'text',
  color: 'primary',
  bgColor: undefined,
  modelValue: '',
  placeholder: 'input text',
  lazyRules: false,
  reactiveRules: false,
  disable: false,
  readonly: false,
  clearable: false,
  hideLabel: false,
  hideBottomSpace: false,
  autofocus: false,
  dense: true,
  outlined: true,
  filled: false,
  dataTest: undefined,
  dataTestLabel: undefined,
  dataTestField: undefined,
  width: '',
  debounce: undefined,
  min: 0,
  max: 9999,
  rules: () => {
    return [() => true]
  },
  requiredSign: false,
  inputStyle: undefined,
})

const emits = defineEmits<{
  (e: 'update:model-value', value: string | number | null): void
  (e: 'blur', value: Event): void
}>()

const modelValueComputed = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // const setTypeValue = props.type === 'number' ? val!==null?Number(val):null : val
    emits('update:model-value', val)
  },
})
const InputRef = ref<InstanceType<typeof QInput> | null>(null)

defineExpose({
  focus: () => InputRef.value?.focus(),
  validate: () => InputRef.value?.validate(),
  resetValidation: () => InputRef.value?.resetValidation(),
  blur: () => InputRef.value?.blur(),
  select: () => InputRef.value?.select(),
  getNativeElement: () => InputRef.value?.getNativeElement(),
})
</script>
