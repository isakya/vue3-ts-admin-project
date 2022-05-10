<template>
  <el-dialog v-model="visible" title="Shipping address" :before-close="close">
    <el-form :model="form">
      <el-form-item>
        <el-select multiple v-model="roles" placeholder="Please select a zone">
          <el-option v-for="role in form.roleLists" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="updateRole"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { updateAdminRole } from '../../../request/api';
import { reactive, toRefs, ref, watch } from "vue" 

const roles = ref<number[]>([])

const props = defineProps<{
  visible?: boolean
  form: AdminRoleFormData
}>()

const emits = defineEmits<{
  (enent: 'close'): void
}>()

watch(() => props.form.userRoles, () => {
  roles.value = props.form.userRoles.map(item => item.id)
})

const close = () => {
  emits('close')
}
const updateRole = () => {
  updateAdminRole({adminId: props.form.adminId, roleIds: roles.value.join(',')}).then(res => {
    if(res.code === 200) {
      close()
    }
  })
}

</script>

<style lang="less" scoped>
  
</style>