import axios from 'axios'
import { auth, erpPath } from './config'

const setupErpMetods = async (erpPath: string, auth: AuthVariant) => {
  let authHeader
  if ('usr' in auth && 'pwd' in auth) {
    const response = axios.post<string>(
      `${erpPath}/api/method/login?usr=${auth.usr}&pwd=${auth.pwd}`,
      auth,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    response.then(console.log)
  } else {
    authHeader = `token ${auth.apiKey}:${auth.apiSecret}`
  }

  const api = axios.create({ baseURL: erpPath, headers: { Authorization: authHeader } })

  const getTags = () =>
    api.get<GetTagsResponse>('/api/method/manictime_integration.aaaaaaaaaaaa.api.app.get_tags')

  return [getTags] as const
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

export const [getTags] = await setupErpMetods(erpPath, auth)

export type GetTagsResponse = {
  message: Message[]
}

export type Message = {
  subject: string
  project: string
  description: null
  completed_on: Date | null
  status: string
  billable: boolean
}
