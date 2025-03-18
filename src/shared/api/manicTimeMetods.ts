import { manicAuth, manicTimePath } from './config'

const setupManicMethods = (manicTimePath: string, auth: ManicTimeAuth) => {
  const authForm = new URLSearchParams()
  Object.entries(auth).forEach(([k, v]) => {
    authForm.append(k, v)
  })

  let authHeader = '' //`Bearer ${response.data.token}`

  const checkAuthHeader = async () => {
    if (!authHeader)
      await fetch(`${manicTimePath}auth/token`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/vnd.manictime.v3+json',
        },
        body: authForm,
      })
        .then((res) => res.json())
        .then((res) => res as AuthResponse)
        .then((response) => (authHeader = response.token))
  }

  const createActivity = async (timelineId: string, activity: CreateActivityDto, sync: string) => {
    await checkAuthHeader()

    return fetch(`${manicTimePath}api/timelines/${timelineId}/activities`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/vnd.manictime.v3+json',
        Authorization: authHeader,
      },
      mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify({ expectedLastChangeId: sync, values: activity }),
    }).then((res) => res.json())
  }

  const updateActivity = async (
    timelineId: string,
    id: number,
    activity: CreateActivityDto,
    sync: string,
  ) => {
    await checkAuthHeader()

    return fetch(`${manicTimePath}api/timelines/${timelineId}/activities/${id}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/vnd.manictime.v3+json',
        Authorization: authHeader,
      },
      mode: 'no-cors',
      method: 'PUT',
      body: JSON.stringify({ expectedLastChangeId: sync, values: activity }),
    }).then((res) => res.json())
  }

  return [createActivity, updateActivity] as const
}

export const [createActivity, updateActivity] = setupManicMethods(manicTimePath, manicAuth)

type CreateActivityDto = {
  name: string
  notes?: string
  timeInterval: {
    start: Date
    duration: number
  }
}

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
