<template>
  <el-dialog v-model="visible" title="Shipping address" :before-close="close">
    <el-form :model="newForm" :label-width="formLabelWidth">
      <el-form-item label="账号：">
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="newForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="newForm.note" type="textarea"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-radio v-model="newForm.status" :label="1" size="large">是</el-radio>
        <el-radio v-model="newForm.status" :label="0" size="large">否</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, watch } from "vue"
const props = defineProps<{
  visible: boolean,
  form: AdminObjItf
}>()
const state = reactive<{
    formLabelWidth: string;
    newForm: AdminObjItf
}>({
  formLabelWidth: '120px',
  newForm: {}
})



const { formLabelWidth, newForm } = toRefs(state)

// 拷贝form
// props.form是普通的值，并非响应式，所以要用箭头函数返回值形式写
watch(() => props.form, () => {
  newForm.value = { ...props.form }
})

const emit = defineEmits<{
  (event: 'close'): void
}>()
// 确定按钮
const modifyAdmin = () => {
  close()
}
// 点击关闭
const close = () => {
  // 传到父组件
  emit('close')
}

</script>

<style lang="less" scoped>
  
</style>