<template>
  <div class="chartBox">
      <div id="main" style="width: 100%; height: 100%"></div>
      <!-- <div>
          <img src="@/assets/img/back.png" class="screen" @click="isScreen">
      </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: {},
      xAxis: ['一月', '二月','三月', '四月','五月', '六月','七月', '八月','九月', '十月', '十一月', '十二月'],
      
    }
  },
  mounted() {
    this.userEchart()
  },
  methods: {
    isScreen() {
        console.log('被点击了');
    },
    userEchart() {
      var myChart = this.$echarts.init(document.getElementById('main'))

      this.option = {
        title: {
            text: '地区销售趋势',
            textStyle:{
                color:'#ccc',
            }
        },
        legend: {
            textStyle:{
                color:'#ccc'
            },
            data: ['上海', '广东', '深圳', '北京']
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
        xAxis: {
            type: 'category',
            // boundaryGap: [0, 0],
            splitLine: {
                show: false
            },
            axisLine: { // 坐标轴刻度相关设置。
                show: true ,
                inside: false ,
                lineStyle: { // 刻度线的样式设置。
                    color: "#ccc", // 刻度线的颜色，默认取 axisTick.lineStyle.color。
                },
            }, 
            axisLabel: {
                textStyle: {
                  color: '#ccc',
                },
            },
            data: this.xAxis
        },
        yAxis: {
            type: 'value',
            axisLine: { // 坐标轴刻度相关设置。
                show: true ,
                inside: false ,
                lineStyle: { // 刻度线的样式设置。
                    color: "#ccc", // 刻度线的颜色，默认取 axisTick.lineStyle.color。
                } ,
            } , 
            axisTick: {
                inside: true
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                inside: true,
                formatter: '{value}\n',
                textStyle: {
                  color: '#ccc',
                },
            },
            z: 10
        },
        // 全屏具体实现
      myFull: {
        show: true,
        title: '全屏查看',
        icon: `@/assets/img/back.png`,
        onclick: (e) => {
          const element = document.getElementById(e.option.value);
          if (element.requestFullScreen) { // HTML W3C 提议
            element.requestFullScreen();
          } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullScreen();
          } else if (element.webkitRequestFullScreen) { // Webkit (works in Safari5.1 and Chrome 15)
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) { // Firefox (works in nightly)
            element.mozRequestFullScreen();
          }
          // 退出全屏
          if (element.requestFullScreen) {
            document.exitFullscreen();
          } else if (element.msRequestFullScreen) {
            document.msExitFullscreen();
          } else if (element.webkitRequestFullScreen) {
            document.webkitCancelFullScreen();
          } else if (element.mozRequestFullScreen) {
            document.mozCancelFullScreen();
          }
        },
      },

        grid: {
            top: 60,
            left: 15,
            right: 15,
            // height: 160
        },
        series: [
            {
                name: '上海',
                type: 'line',
                smooth: true,
                stack: 'a',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: '#2C6EFF'
                },
                stack: 'a',
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(44, 110, 255, 0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(44, 110, 255, 0)'
                    }])
                },
                data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '广东',
                type: 'line',
                smooth: true,
                stack: 'a',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: '#16F2D9'
                },
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(22, 242, 217, 0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(22, 242, 217, 0)'
                    }])
                },
                data: [111, 13, 161, 143, 130, 260, 211, 13, 21, 124, 190, 54, 81]
            },
            {
                name: '深圳',
                type: 'line',
                smooth: true,
                stack: 'a',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: '#FE211E'
                },
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(254, 33, 30, 0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(254, 33, 30, 0)'
                    }])
                },
                data: [11, 233, 171, 139, 110, 120, 231, 113, 21, 14, 10, 239, 21]
            },
            {
                name: '北京',
                type: 'line',
                smooth: true,
                stack: 'a',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: '#9164F0'
                },
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(145, 100, 240, 0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(145, 100, 240, 0)'
                    }])
                },
                data: [56, 96, 77, 83, 156, 87, 43, 86, 21, 124, 90, 78, 99]
            }
        ]
      }
      myChart.setOption(this.option)
      //根据窗口的大小变动图表 --- 重点
      window.onresize = function(){
        myChart.resize();
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