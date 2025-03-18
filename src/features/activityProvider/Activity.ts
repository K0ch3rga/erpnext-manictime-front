export type Activity = {
  from: number
  to: number
  class: string
}

export type ActivityWeek = {
  mon?: Activity[]
  tue?: Activity[]
  wed?: Activity[]
  thu?: Activity[]
  fri?: Activity[]
  sat?: Activity[]
  sun?: Activity[]
}
