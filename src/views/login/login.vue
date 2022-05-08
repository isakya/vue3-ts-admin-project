<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
  >
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input
        v-model="ruleForm.pwd"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loginFn()"
        >登陆</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { reactive, toRefs, ref } from "vue" 
import { adminLoginApi, getAdminInfoApi } from '../../request/api'
import Cookie from 'js-cookie'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 自定义校验密码函数
const validatePwd = (rule: unknown, value: string | undefined, cb: (msg?: string) => void) => {
  if(!value) {
    cb('密码不能为空')
  } else {
    cb()
  }
}
// 数据
const { ruleForm, rules } = toRefs(reactive({
  ruleForm: {
    username: '',
    pwd: ''
  },
  // 校验规则
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '长度为3~20个字符', trigger: 'blur' },
    ],
    pwd: [{ validator: validatePwd, trigger: 'blur'}]
  }
}))
// 获取el-form组件对象 同vue2 $refs方法
let ruleFormRef = ref()

// 获取项目路由对象
let router = useRouter()

// 获取当前项目的vuex对象
let store = useStore()

// 登陆
const loginFn = () => {
  ruleFormRef.value.validate().then(() => {
    console.log('then校验通过')
    // 登陆请求
    adminLoginApi({
    username: ruleForm.value.username,
    password: ruleForm.value.pwd
    }).then(res => {
      if(res.code === 200) {
        // 先存储token
        // 用 js-cookie 第三方库
        Cookie.set('token', res.data.tokenHead + res.data.token, {expires: 7})
        // 获取用户信息请求
        store.dispatch('getAdminInfo').then(res => {
          router.push('/home')
        })
        // getAdminInfoApi().then(res => {
        //   if(res.code === 200) {

        //     // res.data.menus
        //     store.commit('updateMenus', res.data.menus)
        //     // 跳转到主页面
        //     router.push('/home')
        //   }
        // })
      }
    })
  }).catch(() => {
    console.log('catch校验不通过')
  })
}
</script>

<style lang="less" scoped>
  
</style>