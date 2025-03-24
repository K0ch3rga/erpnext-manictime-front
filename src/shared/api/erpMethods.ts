import { erpPath } from './config'

export const getTags = async () => {
  return await fetch(`${erpPath}api/method/manictime_integration.api.app.get_tags`, {})
    .then((r) => r.json())
    .then((r) => r as GetTagsResponse)
}

export const getActivities = async (fromDate: Date, toDate?: Date) => {
  const query = new URLSearchParams()
  query.set('from_time', fromDate.toISOString().slice(0, 10))
  if (toDate) query.set('to_time', toDate.toISOString().slice(0, 10))
  return await fetch(
    `${erpPath}api/method/manictime_integration.api.app.get_user_activities?${query.toString()}`,
  )
    .then((r) => r.json())
    .then((r) => r as GetActivitiesResponse)
}

export const getActivitiesAndUsage = async (fromDate: Date, toDate?: Date) => {
  const query = new URLSearchParams()
  query.set('from_time', fromDate.toISOString().slice(0, 10))
  if (toDate) query.set('to_time', toDate.toISOString().slice(0, 10))
  return await fetch(
    `${erpPath}api/method/manictime_integration.api.app.get_user_usage_and_activities?${query.toString()}`,
  )
    .then((r) => r.json())
    .then((r) => r as GetActivitiesResponse)
}

export const createActivity = async (
  newActivity: NewActivityDto,
  syncId: string,
  timelineId: string,
) =>
  await fetch(`${erpPath}api/method/manictime_integration.api.app.create_activity`, {
    body: JSON.stringify({ expectedLastChangeId: syncId, values: newActivity, timelineId }),
  })
    .then((r) => r.json())
    .then((r) => r as GetActivitiesResponse)

export const updateActivity = async (
  newActivity: NewActivityDto,
  syncId: string,
  timelineId: string,
  activityId: number,
) =>
  await fetch(`${erpPath}api/method/manictime_integration.api.app.create_activity`, {
    body: JSON.stringify({
      expectedLastChangeId: syncId,
      values: newActivity,
      timelineId,
      activityId,
    }),
  })
    .then((r) => r.json())
    .then((r) => r as GetActivitiesResponse)

type NewActivityDto = {
  name: string
  notes?: string
  timeInterval: {
    start: Date
    duration: number
  }
}

export type GetTagsResponse = {
  message: TaskDto[]
}

type TaskDto = {
  subject: string
  project: string
  description: null
  completed_on: Date | null
  status: string
  billable: boolean
}

export type GetActivitiesResponse = {
  message: {
    activities: ActivityDto[]
    usages: ActivityDto[]
    timelineId: string
    syncId: string
  }
}

export type ActivityDto = {
  entityType: string
  entityId: number
  values: Values
}

type Values = {
  groupListId?: number
  isActive?: boolean
  name: string
  timeInterval: TimeInterval
  groupIds?: number[]
  color?: string
  key?: string
  skipColor?: boolean
}

type TimeInterval = {
  start: string // Date
  duration: number
}
