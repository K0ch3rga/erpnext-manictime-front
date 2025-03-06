<script setup lang="ts">
import TagProvider from '@features/tagProvider/TagProvider.vue'
import EditModal from './EditModal.vue'
import type { CalendarEvent } from '@entities/event'
import { useDialogPluginComponent } from 'quasar'

const { event } = defineProps<{ event: CalendarEvent }>()
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()
</script>
<template>
  <TagProvider v-slot="{ tags }">
    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <EditModal :event :tags @create="onDialogOK" @cancel="onDialogHide" />
    </q-dialog>
  </TagProvider>
</template>
