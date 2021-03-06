
interface AdminLoginData {
  password: string
  username: string
}

interface ManageResult<T = {}> {
  code?: number
  data: T
  errno?: number
  // message: string
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