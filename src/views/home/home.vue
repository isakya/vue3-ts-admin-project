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
            <el-menu-item index="1-4-1" v-if="!submenu.hidden">{{submenu.title}}</el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="home_content">右侧内容</div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs, ref } from "vue" 
import { useStore } from "vuex";
// [{title:'一级菜单', children:[{二级菜单对象}, {二级菜单对象}]}]
// { 一级菜单id: {title: '一级菜单标题', children: [{二级菜单对象}, {二级菜单对象}]}}
const store = useStore()
interface MenuObj {
  parentId: number
  id: number
  title: string,
  hidden: 0 | 1
  children?: MenuObj[]
}
interface NewMenus {
  [key: number]: MenuObj
}
const newMenus: NewMenus = store.getters.getNewMenus

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
      background-color: rgb(215, 66, 185);
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