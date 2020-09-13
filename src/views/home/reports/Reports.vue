<template>
  <div>
    <!-- 面包屑 -->
    <my-bread level1="数据统计" level2="数据列表"></my-bread>

    <el-card class="box-card searchRow">
      <div id="main" style="width: 600px;height:400px;">

      </div>
    </el-card>
  </div>
</template>

<script>
  var echarts = require("echarts")

  export default {
    name: "reports",
    data() {
      return{
        // option1: {}
      }
    },
    created() {
      // 获取参数列表
    	this.useEchart()
    },
    methods: {
      async useEchart() {
        const res = await this.$http.get('reports/type/1')

        var myChart = echarts.init(document.getElementById('main'))
        let option1 = res.data.data

        let option2 = {
          title: {
            text: '堆叠区域图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
        }
        let option = {...option1, ...option2}
        myChart.setOption(option)
      }

    },
    mounted() {

    },


  }
</script>

<style scoped>

</style>
