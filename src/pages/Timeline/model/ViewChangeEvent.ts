export type ViewChangeEvent = {
  endDate: Date
  events: any[] // idk what should be here
  startDate: Date
  view: 'day' | 'week' | 'month' | 'year' | 'years'
  week: number
}
