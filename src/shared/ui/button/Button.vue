<template>
  <q-btn
    v-bind="props"
    no-caps
    dense
    :type="props.type"
    :flat="props.flat"
    :icon="props.icon"
    :icon-right="props.iconRight"
    :size="props.size"
    :padding="props.padding"
    :disable="props.disable"
    :label="props.label"
    :loading="props.loading"
    :data-test="dataTest"
    :outline="props.outline"
    :style="props.btnIcon || `width: ${props.width}px`"
    :color="
      hovering && props.hoverColor !== undefined
        ? props.hoverColor
        : props.disable
          ? 'accent'
          : props.color
    "
    @mouseover="setHovering(true)"
    @mouseout="setHovering(false)"
  >
    <slot name="popup" />
    <slot name="menu" />
    <Tooltip v-if="props.tooltip !== ''" :text="props.tooltip" position="bottom" />

    <template v-if="slots.loading" #loading>
      <slot name="loading" />
    </template>
  </q-btn>
</template>

<script setup lang="ts">
import type { QBtnProps } from 'quasar'
import { ref, useSlots } from 'vue'
import { Tooltip } from '..'
const slots = useSlots()
/**
 * Description
 * @returns {any}
 */

interface IButtonComponent extends QBtnProps {
  label?: string | undefined
  tooltip?: string
  icon?: string | undefined
  iconRight?: string | undefined
  btnIcon?: boolean
  type?: 'submit' | 'reset' | undefined
  color?: string
  hoverColor?: string | undefined
  disable?: boolean
  padding?: string
  outline?: boolean
  flat?: boolean
  size?: string
  width?: string | undefined
  dataTest?: string
  loading?: boolean
}

/**
 * Компонент кнопки
 * @param {any} defineProps<IButtonComponent>(
 * @returns {any}
 */
const props = withDefaults(defineProps<IButtonComponent>(), {
  label: undefined,
  tooltip: '',
  padding: 'xs',
  icon: undefined,
  iconRight: undefined,
  btnIcon: false,
  loading: false,
  type: undefined,
  color: 'primary',
  hoverColor: 'blue-4',
  disable: false,
  outline: false,
  flat: false,
  size: 'md',
  width: '90',
  dataTest: undefined,
})

const hovering = ref<boolean>(false)

function setHovering(val: boolean) {
  if (!props.disable && hovering.value != val) {
    hovering.value = val
  }
}
</script>
<style scoped></style>
