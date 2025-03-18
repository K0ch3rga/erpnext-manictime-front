import type { AuthVariant } from './erpMethods'
import type { ManicTimeAuth } from './manicTimeMetods'

export const erpPath = document.URL //'http://192.168.56.102:8000/'
const erpLogin = 'Administrator'
const erpPassword = 'admin'
export const auth: AuthVariant = { apiKey: 'fe9c7f83128d0b4', apiSecret: 'fd674cf11600677' } // { usr: erpLogin, pwd: erpPassword } не работает из-за same site lax

export const manicTimePath = 'http://192.168.56.101:8080'
const manicLogin = 'admin@example.com'
const manicPassword = 'asdf1234'
export const manicAuth: ManicTimeAuth = {
  grant_type: 'password',
  username: manicLogin,
  password: manicPassword,
}
