export type ViewChangeEvent = {
  id: 'day' | 'week' | 'month' | 'year' | 'years'
  title: string
  start: Date
  end: Date
  extendedStart: Date
  extendedEnd: Date
  cellDates: object[]
  containsToday: boolean
  events: object[]
}
