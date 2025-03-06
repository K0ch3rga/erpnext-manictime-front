import axios from 'axios'
import { manicAuth, manicTimePath } from './config'

const setupManicMethods = async (manicTimePath: string, auth: ManicTimeAuth) => {
  const authForm = new URLSearchParams()
  Object.entries(auth).forEach(([k, v]) => {
    authForm.append(k, v)
  })
  const response = await axios.post<AuthResponse>(`${manicTimePath}/api/token`, auth, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/vnd.manictime.v3+json',
    },
  })

  const authHeader = `Bearer ${response.data.token}`
  const api = axios.create({
    baseURL: manicTimePath,
    headers: { Authorization: authHeader, Accept: 'application/vnd.manictime.v3+json' },
  })

  const getTimelines = () => api.get<GetTimelinesResponse>('/api/timelines')

  const getActivities = (timelineId: string, fromTime: Date, toTime: Date = new Date()) =>
    api.get<GetActivitiesResponse>(
      `/api/timelines/${timelineId}/activities?fromTime=${fromTime.toUTCString()}&toTime=${toTime}`,
    )

  const createActivity = (timelineId: string, activity: CreateActivityRequest) =>
    api.post<GetActivitiesResponse>(`/api/timelines/${timelineId}/activities`, activity)

  return [getTimelines, getActivities, createActivity] as const
}

export const [getTimelines, getActivities, createActivity] = await setupManicMethods(
  manicTimePath,
  manicAuth,
)

export type ManicTimeAuth = {
  grant_type: string
  username: string
  password: string
}

type AuthResponse = {
  token: string
}

export type CreateActivityRequest = {
  expectedLastChangeId: string
  values: Values
}

export type GetActivitiesResponse = {
  timelineKey: string
  publishKey: string
  owner: Owner
  schema: Schema
  homeEnvironment: Environment
  deviceDisplayName: string
  lastUpdate: LastUpdate
  lastChangeId: string
  updateProtocol: string
  timestamp: string
  links: Link[]
  entities: Entity[]
}

type Entity = {
  entityType: string
  entityId: number
  values: Values
}

type Values = {
  groupListId?: number
  isActive?: boolean
  name?: string
  timeInterval?: TimeInterval
  groupIds?: number[]
  color?: string
  key?: string
  skipColor?: boolean
}

type TimeInterval = {
  start: Date
  duration: number
}

export type GetTimelinesResponse = {
  timelines: Timeline[]
}

export type Timeline = {
  timelineKey: string
  publishKey: string
  owner: Owner
  schema: Schema
  homeEnvironment: Environment
  deviceDisplayName: string
  lastUpdate: LastUpdate
  lastChangeId: string
  updateProtocol: string
  timestamp: string
  links: Link[]
}

type Environment = {
  environmentId: string
  deviceName: string
}

type LastUpdate = {
  updatedUtcTime: Date
  environment: Environment
}

type Link = {
  rel: string
  href: string
}

type Owner = {
  username: string
  displayName: string
}

type Schema = {
  name: string
  version: string
  baseSchema: BaseSchema
}

type BaseSchema = {
  name: string
  version: string
}
