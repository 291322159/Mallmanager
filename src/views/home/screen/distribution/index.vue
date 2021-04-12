<template>
  <div class="chartBox">
      <div id="distribution" style="width: 100%; height: 100%"></div>
      <!-- <div>
          <img src="@/assets/img/back.png" class="screen" @click="isScreen">
      </div> -->
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data() {
    return{
      distributionOption: {},
      // 图表的实例对象
      chartInstance: null,
      // 中国地图数据
      chinaMapData: null,
      allData: [
        {
          name: '黄金用户',
          children: [
            {name: '河南', value: [113.81, 34]},
            {name: '上海', value: [120.31, 31.52]}
          ]
        },
        {
          name: '白银用户',
          children: [
            {name: '广东', value: [113.31, 23.52]}
          ]
        },
        {
          name: '砖石用户',
          children: [
            {name: '四川', value: [104.31, 30.52]}
          ]
        }
      ]
    }
  },
  created() {
    this.axiosInstance = axios.create({
      baseURL:'http://120.53.120.229:8997'
    })

    // this.$socket.registerCallBack('mapData', this.getData)
  },
  mounted() {
    this.userEchart()
    this.updateChart()
  },
  methods: {
    isScreen() {
      console.log('点击了');
    },
      
    userEchart() {
      var distributionChart = this.$echarts.init(document.getElementById('distribution'))
      
      // 初始化配置项
      const initOption = {
        title: {
          text: '商家分布',
          textStyle:{
                color:'#ccc',
          }
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          //允许拖动及缩放
          roam: true,
          // zoom: 1.1, //默认缩放比例
          itemStyle: {
            // 地图的填充色
            areaColor: '#2E72BF',
            // 省份的边框色
            borderColor: '#333',
          },
          label: {
            show: true,
            color: 'white',
            formatter: `{a}`,
          },
        },
      }
      distributionChart.setOption(initOption)
      
      //根据窗口的大小变动图表 --- 重点
      window.onresize = function(){
        distributionChart.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
      }
    },
    
    async updateChart() {
      var distributionChart = this.$echarts.init(document.getElementById('distribution'))

      // 初始化图表的方法
      // this.chartInstance = this.$echarts.init(this.$refs.mapRef, this.theme)
      // 获取中国地图的矢量数据： 可以通过发送网络请求获取,staic/map/china.json 的数据
      // 由于配置了基础路径，所以不能直接 this.$http.get 来请求 static下的资源

      if(!this.chinaMapData){
        const { data: res } = await this.axiosInstance.get('/map/china.json')
        this.chinaMapData = res
      }

      // 注册地图数据
      this.$echarts.registerMap('china', this.chinaMapData)
      // 图例的数据
      const legendArr = this.allData.map(item => {
        return item.name
      })
      // 散点图的数据
      const seriesArr = this.allData.map(item => {
        // return 一个类别下的所有散点数据
        return {
          type: 'effectScatter',
          // 图例的name需要与series的name相同
          name: item.name,
          data: item.children,
          // 让散点图使用地图坐标系统
          coordinateSystem: 'geo',
          // 涟漪动画效果配置
          rippleEffect: {
            // 涟漪效果直径
            scale: 10,
            // 空心的涟漪动画效果
            brushType: 'stroke',
          },
        }
      })
      // 数据配置项
      const dataOption = {
        legend: {
          left: '2%',
          bottom: '5%',
          textStyle:{
            color:'#ccc',
          },
          // 图例的方向
          orient: 'verticle',
          data: legendArr.reverse(),
        },
        series: seriesArr,
      }
      distributionChart.setOption(dataOption)
    }
  }
}
</script>

<style scoped>
  .chartBox{
    color: #fff;
    position: relative;
  }
  .screen{
      width: 20px;
      height: 20px;
      z-index: 999;
      position: absolute;
      top: 10px;
      right: 10px;
  }
</style>