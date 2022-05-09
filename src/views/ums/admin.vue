<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="nickName" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="添加时间">
        <!-- <template v-slot:default="scope">
          {{new Date(scope.row.createTime).toLocaleDateString()}}
        </template> -->
        <template #default="scope">
          {{formateDate(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column label="最后登陆">
        <template #default="scope">
          {{formateDate(scope.row.loginTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否启用" align="center">
        <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="text">切换角色</el-button>
          <el-button type="text" @click="editAdmin(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditAdmin :visible="visible" @close="closeDialog" :form="rowData" />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue" 
import { getAdminLists } from '../../request/api'
import EditAdmin from './components/EditAdmin.vue'
let { tableData, visible, rowData } = toRefs(reactive<{
  tableData: {}[],
  visible: boolean,
  rowData: AdminObjItf
}>({
  tableData: [],
  visible: false,
  rowData: {}
}))

const fetchData = () => {
  getAdminLists({
    keyword: '',
    pageSize: 10,
    pageNum: 1
  }).then(res => {
    if(res.code === 200) {
      tableData.value = res.data.list
    }
  })
}
fetchData()


// 点击编辑按钮
const editAdmin = (row: AdminObjItf) => {
  rowData.value = row
  visible.value = true
}
// 隐藏弹框
const closeDialog = (r?: 'reload') => {
  visible.value = false
  if(r === 'reload') {
    // 重新获取数据
    fetchData()
  }
}

// 格式化时间
const formateDate = (time: string | undefined) => {
  if(!time) return ''
  const date = new Date(time)
  const year =  date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(min)}:${addZero(sec)}`
}

const addZero = (num: number) => {
  return num > 9 ? num : '0' + num
}

</script>

<style lang="less" scoped>
  
</style>