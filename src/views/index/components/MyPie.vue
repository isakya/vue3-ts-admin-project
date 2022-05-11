<template>
  <el-radio-group v-model="selectLabel" size="large" @change="dayChange">
    <el-radio-button label="sale_">销量</el-radio-button>
    <el-radio-button label="_money">销售额</el-radio-button>
  </el-radio-group>
  <el-select v-model="selectDay" class="m-2" placeholder="Select" size="large" @change="dayChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
  <div id="pie" style="width: 50%;height:50%;float: right;"></div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, onMounted, watch } from "vue"
import * as echarts from 'echarts' 
const props = defineProps<{
  data: {}[]
}>()

const state = reactive({
  selectLabel: '_money',
  selectDay: 'today',
  options: [
    {name: '今天', value: 'today'},
    {name: '昨天', value: 'yesterday'},
    {name: '前3天', value: 'three_days'},
    {name: '前7天', value: 'seven_days'}
  ]
})


const { selectDay, selectLabel, options } = toRefs(state)

const dayChange = () => {
  initPie()
}
let myChart: echarts.EChartsType
const initPie = () => {
  let key = ''
  if(selectLabel.value === '_money') {
    key = selectDay.value + selectLabel.value
  } else {
    key = selectLabel.value + selectDay.value

  }
  const arr = props.data.map((item: {[key: string]: string}) => ({value: item[key], name: item.name}))

  // 初始化实例
  if(!myChart) {
    // 初始化实例
    myChart = echarts.init(document.getElementById('pie') as HTMLElement);
  }

  // 指定图表的配置项和数据
  const option: echarts.EChartOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      right: 10,
      top: 20,
      width: 300,
      height: 100,
      orient: 'vertical'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '45%'],
        data: arr
      }
    ]
  };
  myChart.setOption(option);
}

watch(() => props.data, () => {
  initPie()
})




// 使用刚指定的配置项和数据显示图表。
</script>

<style lang="less" scoped>
  
</style>