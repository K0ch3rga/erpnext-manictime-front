export type CalendarEvent = {
  start: Date
  end: Date
  id: string
  title: string
  draggable: boolean
  resizable: boolean
  deletable: boolean
  allDay: boolean
  recurring: Recurring
  schedule: number
  background: boolean
  class: string
}

type Recurring = {
  frequency: string
  amount: number
  start: string
}
