export type Activity = {
  from: number
  to: number
  class: string
}

export type ActivityWeek = {
  1: Activity | Activity[]
  2: Activity | Activity[]
  3: Activity | Activity[]
  4: Activity | Activity[]
  5: Activity | Activity[]
}
