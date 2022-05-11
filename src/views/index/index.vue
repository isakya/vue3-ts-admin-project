<template>
  <MyPie :data="state.salePie"></MyPie>
  <MyMap :data="state.saleMap"></MyMap>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from "vue"
import MyPie from './components/MyPie.vue'
import MyMap from './components/MyMap.vue'
import { getAdminStat } from "../../request/api"

const state = reactive<{
  salePie: {}[]
  saleMap: {}[]
}>({
  salePie: [],
  saleMap: []
})

getAdminStat().then(res => {
  if(res.errno === 0) {
    state.salePie = res.data.salePie
    state.saleMap = res.data.saleMap
  }
})

  
</script>

<style lang="less" scoped>
  
</style>