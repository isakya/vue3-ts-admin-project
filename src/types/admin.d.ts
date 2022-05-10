interface AdminObjItf {
  username?: string
  nickName?: string
  email?: string
  password?: string
  note?: string
  status?: number
  id?: number
}

interface AdminRoleFormData {
  roleLists: RoleObjItf[]
  userRoles: RoleObjItf[]
  adminId: number
}