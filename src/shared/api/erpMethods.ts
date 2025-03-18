import { auth, erpPath } from './config'

const setupErpMetods = (erpPath: string, auth: AuthVariant) => {
  let authHeader: string

  const checkAuthHeader = async () => {
    if (!authHeader) {
      if ('usr' in auth && 'pwd' in auth) {
        const response = await fetch(
          `${erpPath}/api/method/login?usr=${auth.usr}&pwd=${auth.pwd}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(auth),
            credentials: 'same-origin',
            mode: 'no-cors',
          },
        )
          .then((r) => r.json())
          .then((r) => r as AuthenticateResponse)
          .catch(console.log)
        console.log(response)
      } else {
        authHeader = `token ${auth.apiKey}:${auth.apiSecret}`
        // 'token fe9c7f83128d0b4:fd674cf11600677'
      }
    }
  }

  const getTags = async () => {
    await checkAuthHeader()
    return await fetch(`${erpPath}/api/method/manictime_integration.api.app.get_tags`, {
      headers: { Authorization: authHeader },
    })
      .then((r) => r.json())
      .then((r) => r as GetTagsResponse)
  }

  const getActivities = async (fromDate: Date, toDate?: Date) => {
    await checkAuthHeader()
    const query = new URLSearchParams()
    query.set('from_time', fromDate.toISOString().slice(0, 10))
    if (toDate) query.set('to_time', toDate.toISOString().slice(0, 10))
    return await fetch(
      `${erpPath}/api/method/manictime_integration.api.app.get_user_activities?${query.toString()}`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    )
      .then((r) => r.json())
      .then((r) => r as GetActivitiesResponse)
  }

  const getActivitiesAndUsage = async (fromDate: Date, toDate?: Date) => {
    await checkAuthHeader()
    const query = new URLSearchParams()
    query.set('from_time', fromDate.toISOString().slice(0, 10))
    if (toDate) query.set('to_time', toDate.toISOString().slice(0, 10))
    return await fetch(
      `${erpPath}/api/method/manictime_integration.api.app.get_user_usage_and_activities?${query.toString()}`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    )
      .then((r) => r.json())
      .then((r) => r as GetActivitiesResponse)
  }

  const createActivity = async (
    newActivity: NewActivityDto,
    syncId: string,
    timelineId: string,
  ) => {
    await checkAuthHeader()
    return await fetch(`${erpPath}/api/method/manictime_integration.api.app.create_activity`, {
      headers: {
        Authorization: authHeader,
      },
      body: JSON.stringify({ expectedLastChangeId: syncId, values: newActivity, timelineId }),
    })
      .then((r) => r.json())
      .then((r) => r as GetActivitiesResponse)
  }

  const updateActivity = async (
    newActivity: NewActivityDto,
    syncId: string,
    timelineId: string,
  ) => {
    await checkAuthHeader()
    return await fetch(`${erpPath}/api/method/manictime_integration.api.app.create_activity`, {
      headers: {
        Authorization: authHeader,
      },
      body: JSON.stringify({ expectedLastChangeId: syncId, values: newActivity, timelineId }),
    })
      .then((r) => r.json())
      .then((r) => r as GetActivitiesResponse)
  }

  return [getTags, getActivities, getActivitiesAndUsage, createActivity, updateActivity] as const
}

type NewActivityDto = {
  name: string
  notes?: string
  timeInterval: {
    start: Date
    duration: number
  }
}

export type AppSecret = {
  apiKey: string
  apiSecret: string
}
export type PasswordAuth = {
  usr: string
  pwd: string
}
export type AuthVariant = PasswordAuth | AppSecret

export const [getTags, getActivities, getActivitiesAndUsage] = setupErpMetods(erpPath, auth)

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

type AuthenticateResponse = {
  home_page: string
  full_name: string
  message: string
}
