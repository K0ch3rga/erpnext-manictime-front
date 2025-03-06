export type Activity = {
  from: number
  to: number
  class: string
}

export type ActivityWeek = {
  mon?: Activity | Activity[]
  tue?: Activity | Activity[]
  wed?: Activity | Activity[]
  thu?: Activity | Activity[]
  fri?: Activity | Activity[]
  sat?: Activity | Activity[]
  sun?: Activity | Activity[]
}
