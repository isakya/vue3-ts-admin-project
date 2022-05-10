import request from './request'
import qs from 'qs'

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
type PromiseRes<T = {}> = Promise<ManageResult<T>>

// 登陆返回接口
interface AdminLoginRes {
  token: string,
  tokenHead: string
}

// 当前用户信息接口
interface AdminInfoRes {
  menus: []
}

// 用户列表请求参数
interface AdminListParams {
  keyword: string,
  pageNum: number, 
  pageSize: number
}



// 登陆返回token
 export const adminLoginApi= (data: AdminLoginData):PromiseRes<AdminLoginRes> => request.post('/admin/login', data)


//  获取当前登陆用户信息
export const getAdminInfoApi = ():PromiseRes<AdminInfoRes> => request.get('/admin/info')

// 获取用户数据列表
export const getAdminLists = (data: AdminListParams):PromiseRes<{ list: {}[] }> => request.get('/admin/list', { params: data })

// 修改用户信息
export const updateAdmin = (id: number, data: AdminObjItf):PromiseRes => request.post('admin/update/' + id, data)

// 获取所有角色
export const getRoleListAll = ():PromiseRes<RoleObjItf[]> => request.get('/role/listAll')

// 根据用户id获取角色
export const getAdminRoleById = (id: number):PromiseRes<RoleObjItf[]> => request.get('/admin/role/' + id)

// 分配用户角色
// export const updateAdminRole = (data: {adminId: number, roleIds: string}):PromiseRes => request.post('/admin/role/update', null, { params: data })

// form-data传参形式
// export const updateAdminRole = (data: {adminId: number, roleIds: number[]}):PromiseRes => request.post('/admin/role/update', data, { headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"} })

// qs将data转换为 a=xxx&b=xxx 的形式，这样浏览器就会自动将请求形式转换为form-data类型
console.log(qs.stringify({roleId: 12, adminId: 222}))
export const updateAdminRole = (data: {adminId: number, roleIds: string}):PromiseRes => request.post('/admin/role/update', qs.stringify(data))