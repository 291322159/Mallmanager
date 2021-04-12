<template>
  <div class="chartBox">
      <div id="region" style="width: 100%; height: 100%"></div>
      <!-- <div>
          <img src="@/assets/img/back.png" class="screen" @click="isScreen">
      </div> -->
  </div>
</template>
<script>
export default{
  data() {
    return {
      data: [
        {"name":"广东","value":230},
        {"name":"福建","value":214},
        {"name":"浙江","value":203},
        {"name":"上海","value":310},
        {"name":"北京","value":289},
        {"name":"江苏","value":207},
        {"name":"四川","value":189},
        {"name":"重庆","value":195},
        {"name":"陕西","value":160},
        {"name":"湖南","value":140},
        {"name":"河北","value":170},
        {"name":"辽宁","value":106},
        {"name":"湖北","value":120},
        {"name":"江西","value":99},
        {"name":"天津","value":107},
        {"name":"吉林","value":143},
        {"name":"青海","value":65},
        {"name":"山东","value":166},
        {"name":"山西","value":134},
        {"name":"云南","value":87},
        {"name":"安徽","value":79}
      ],
      newData: [],
      newDataName: [],
      newDataValue: [],
      flag: 0,
      amount: 6
    }
  },
  mounted() {
    this.isInterval()
    this.userEchart()
    
  },
  methods: {
    isScreen() {
      console.log('点击了');
    },
    // 排序
    compare(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;//升序,降序为value2 - value1
      }
    },
    isInterval() {
      // 排序
      this.data.sort(this.compare('value'))
      this.setData()
      clearInterval(this.dataTime)
      var dataTime = setInterval(() => {
        this.setData()
      }, 3000)
    },
    setData() {
      // if(this.data.length - 6 == this.flag) {
      //   this.flag = 0
      // }
      this.data.length - this.amount == this.flag && (this.flag = 0)
      // 每次开始清空一下数组，然后存入新的数组
      this.newData = []
      this.newData.push(this.newData = this.data.slice(this.flag, this.flag + this.amount))
      this.newDataName = []
      this.newDataValue = []
      this.newData.forEach(item => {
        this.newDataName.push(item.name)
        this.newDataValue.push(item.value)
      })
      this.flag++
      this.userEchart()
    },
    userEchart() {
      var regionChart = this.$echarts.init(document.getElementById('region'))
      this.regionOption = {
        title: {
            text: '地区销售排行',
            textStyle:{
                color:'#ccc',
            },
        },
        xAxis: {
            type: 'category',
            data: this.newDataName,
            boundaryGap: [0, 0.01],
            splitLine:{show: false},
            axisLine: { // 坐标轴刻度相关设置。
                show: true ,
                inside: false ,
                lineStyle: { // 刻度线的样式设置。
                    color: "#ccc", // 刻度线的颜色，默认取 axisTick.lineStyle.color。
                },
            }, 
        },
        yAxis: {
            type: 'value',
            splitLine:{show: false},
            axisLine: { // 坐标轴刻度相关设置。
                show: true ,
                inside: false ,
                lineStyle: { // 刻度线的样式设置。
                    color: "#ccc", // 刻度线的颜色，默认取 axisTick.lineStyle.color。
                },
            }, 
        },
        series: [{
            data: this.newDataValue,
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
                emphasis: { 
                    barBorderRadius: 0
                },
                normal: {
                    barBorderRadius: 0,
                    color: new this.$echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                          {offset: 0, color: '#4169E1'},
                          {offset: .5, color: '#8A2BE2'}

                      ]
                    ),
                    label: {
                      show: true,
                      position: 'top',
                      textStyle: {
                          color: '#ccc'
                      }
                      
                  }
                }
            },
            howBackground: true
        }]
      }
      regionChart.setOption(this.regionOption)
      //根据窗口的大小变动图表 --- 重点
      window.onresize = function(){
        regionChart.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
      }
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