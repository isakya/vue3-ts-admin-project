<template>
  <div class="home_container">
    <div class="home_header">头部</div>
    <div class="home_menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        :unique-opened="true"
        text-color="#fff"
        :router="true"
      >
        <el-sub-menu :index="menu.id + ''" v-for="menu in newMenus" :key="menu.id">
          <template #title>
            <span>{{menu.title}}</span>
          </template>
          <template v-for="submenu in menu.children" :key="submenu.id">
            <el-menu-item :index="'/' + menu.name + '/'+ submenu.name" v-if="!submenu.hidden">{{submenu.title}}</el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="home_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs, ref, computed } from "vue" 
import { useStore } from "vuex";
// [{title:'一级菜单', children:[{二级菜单对象}, {二级菜单对象}]}]
// { 一级菜单id: {title: '一级菜单标题', children: [{二级菜单对象}, {二级菜单对象}]}}
const store = useStore()
interface MenuObj {
  parentId: number
  id: number
  title: string,
  hidden: 0 | 1,
  name: string
  children?: MenuObj[]
}
interface NewMenus {
  [key: number]: MenuObj
}
// 改用计算属性，防止请求返回的数据改变但页面不重新渲染问题
const newMenus = computed<NewMenus>(() => {
  return  store.getters.getNewMenus
})

</script>

<style lang="less" scoped>
  .home_container {
    position: relative;
    height: 100%;
    .home_header {
      height: 70px;
      background: rgb(101, 101, 212);
    }
    .home_menu {
      position: absolute;
      top: 70px;
      left: 0;
      bottom: 0;
      width: 250px;
      background-color: #545c64;
      .el-menu{
        border:0!important;
      }
    }
    .home_content {
      position: absolute;
      top: 70px;
      right: 0;
      left: 250px;
      bottom: 0;
      background-color: aquamarine;
    }
  }
</style>