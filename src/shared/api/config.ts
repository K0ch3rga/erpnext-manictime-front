import type { AuthVariant } from './erpMethods'

export const erpPath = document.URL //'http://192.168.56.102:8000/'
const erpLogin = 'Administrator'
const erpPassword = 'admin'
export const auth: AuthVariant = { apiKey: 'fe9c7f83128d0b4', apiSecret: 'fd674cf11600677' } // { usr: erpLogin, pwd: erpPassword } не работает из-за same site lax
