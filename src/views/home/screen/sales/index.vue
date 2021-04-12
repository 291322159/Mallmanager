<template>
  <div class="chartBox">
      <div id="sales" style="width: 100%; height: 100%"></div>
      <!-- <div>
          <img src="@/assets/img/back.png" class="screen" @click="isScreen">
      </div> -->
  </div>
</template>
<script>
export default{
  data() {
    return{
      data: [
        {name: '商家1', value: 148},
        {name: '商家2', value: 115},
        {name: '商家3', value: 210},
        {name: '商家4', value: 120}, 
        {name: '商家5', value: 145},
        {name: '商家6', value: 183},
        {name: '商家7', value: 176},
        {name: '商家8', value: 116},
        {name: '商家9', value: 197},
        {name: '商家10', value: 164},
        {name: '商家11', value: 157},
        {name: '商家12', value: 99},
        {name: '商家13', value: 170},
        {name: '商家14', value: 110},
        {name: '商家15', value: 129},
        {name: '商家16', value: 164},
        {name: '商家17', value: 120},
        {name: '商家18', value: 164},
      ],
      merchantData: [],
      merchantValue: [],
      flag: 0,
      amount: 6,
      timerId: '',
      salesOption: {}
    }
  },
  mounted() {
    this.userEchart()
    this.setData()
  },
  methods: {
    isScreen() {
      console.log('点击了');
    },
    setData() {
      clearInterval(this.timerId)
      for (let i = 0; i < this.amount; i++) {
        this.merchantData.push(this.data[i + this.flag * this.amount].name)
        this.merchantValue.push(this.data[i + this.flag * this.amount].value)
      }
      this.userEchart()
      this.timerId = setInterval(() => {
        if(this.flag === 3) {
          this.flag = 0
        }
        this.merchantData = []
        this.merchantValue = []
        for (let i = 0; i < this.amount; i++) {
          this.merchantData.push(this.data[i + this.flag * this.amount].name)
          this.merchantValue.push(this.data[i + this.flag * this.amount].value)
        }
        this.userEchart()
        this.flag++
      }, 3000)
    },
    userEchart() {
      var salesChart = this.$echarts.init(document.getElementById('sales'))
      this.salesOption = {
        title: {
            text: '商家销售统计',
            textStyle:{
                color:'#ccc',
            }
        },
        xAxis: {
            type: 'value',
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
            type: 'category',
            data: this.merchantData,
            axisLine: { // 坐标轴刻度相关设置。
                show: true ,
                inside: false ,
                lineStyle: { // 刻度线的样式设置。
                    color: "#ccc", // 刻度线的颜色，默认取 axisTick.lineStyle.color。
                },
            }, 
        },
        series: [{
            data: this.merchantValue,
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
                emphasis: { 
                    barBorderRadius: 0
                },
                normal: {
                    barBorderRadius: 7,
                    color: new this.$echarts.graphic.LinearGradient(
                      0, 0, 1, 0,
                      [
                          {offset: 0, color: '#4169E1'},
                          {offset: .5, color: '#8A2BE2'}

                      ]
                    ),
                    label: {
                      show: true,
                      position: 'right',
                      textStyle: {
                          color: '#ccc'
                      }
                      
                  }
                }
            },
            howBackground: true
        }]
      }
      salesChart.setOption(this.salesOption)
      //根据窗口的大小变动图表 --- 重点
      window.onresize = function(){
        salesChart.resize();
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