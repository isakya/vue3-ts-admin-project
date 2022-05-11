<template>
  <div id="mymap" style="width: 50%; height: 50%; float: right;"></div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, watch } from "vue" 
import * as echarts from 'echarts'
import china from '../../../data/china.json'
import { map } from "lodash";
echarts.registerMap('china', china as any)

const props = defineProps<{
  data: {}[]
}>()

let myMap: echarts.EChartsType


watch(() => props.data, () => {
  const data = props.data.map((item: {[key: string]: string | number}) => ({name: item.areaName, value: item.saleNum}))
  console.log(data)
  if(!myMap) {
    myMap = echarts.init(document.getElementById('mymap') as HTMLElement)
    const options: any = {
      tooltip: {
        show: true,
        formatter: `{b0}<br />销量: {c0}`,
        backgroundColor: `rgba(50,50,50,0.7)`,
        textStyle: {
          color: '#fff'
        }
      },
      series: [{
        type: 'map',
        data: data,
        map: 'china',
        emphasis: {
          label: { show: false },
          itemStyle: { areaColor: 'red' }
        },
        itemStyle: {
          borderColor: '#fff'
        },
      }],
      visualMap: {
        type: 'continuous',
        min: 0,
        max: 10000000,
        // 两个手柄对应的数值是 4 和 15
        range: [4, 15],
        calculable: true,
        inRange: {
          color: ['#121122', 'rgba(3,4,5,0.4)', 'green', 'yellow', 'red'],
        }
      }
    }
    myMap.setOption(options)
  }
})

</script>

<style lang="less" scoped>
  
</style>