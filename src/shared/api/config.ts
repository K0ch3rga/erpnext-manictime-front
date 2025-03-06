import type { AuthVariant } from './erpMethods'
import type { ManicTimeAuth } from './manicTimeMetods'

export const erpPath = 'http://192.168.56.102:8000'
const erpLogin = 'admin@example.com'
const erpPassword = 'admin'
export const auth: AuthVariant = { usr: erpLogin, pwd: erpPassword }

export const manicTimePath = 'http://192.168.56.101:8080'
const manicLogin = 'Administrator'
const manicPassword = 'asdf1234'
export const manicAuth: ManicTimeAuth = {
  grant_type: 'password',
  username: manicLogin,
  password: manicPassword,
}
