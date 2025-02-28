export type CalendarEvent = {
  _eid: string
  start: Date
  startTimeMinutes: number
  end: Date
  endTimeMinutes: number
  title: string
  content: string
  background: boolean
  allDay: boolean
  segments: null
  repeat: null
  daysCount: number
  deletable: boolean
  deleting: boolean
  titleEditable: boolean
  resizable: boolean
  resizing: boolean
  draggable: boolean
  dragging: boolean
  draggingStatic: boolean
  focused: boolean
  class: string
  split: null
}
