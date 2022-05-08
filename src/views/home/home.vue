<template>
  <div class="home_container">
    <div class="home_header">头部</div>
    <div class="home_menu">菜单</div>
    <div class="home_content">右侧内容</div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs, ref } from "vue" 
  
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