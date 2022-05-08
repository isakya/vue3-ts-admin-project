import request from './request'

interface AdminLoginData {
  password: string
  username: string
}

interface ManageResult<T = {}> {
  code: number
  data: T
  message: string
}

// 设置类型别名 提取公共代码
type PromiseRes<T> = Promise<ManageResult<T>>

// 登陆返回接口
interface AdminLoginRes {
  token: string,
  tokenHead: string
}

// 当前用户信息接口
interface AdminInfoRes {
  menus: []
}

// 登陆返回token
 export const adminLoginApi= (data: AdminLoginData):PromiseRes<AdminLoginRes> => request.post('/admin/login', data)


//  获取当前登陆用户信息
export const getAdminInfoApi = ():PromiseRes<AdminInfoRes> => request.get('/admin/info')