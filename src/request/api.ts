import request from './request'

interface AdminLoginData {
  password: string
  username: string
}
interface AdminLoginRes {
  code: number
  data: {
    token: string,
    tokenHead: string
  }
  message: string
}
// 登陆返回token
 export const adminLoginApi= (data: AdminLoginData):Promise<AdminLoginRes> => request.post('/admin/login', data)

