<template>
  <div class="chartBox">
      <div id="analyse" style="width: 100%; height: 100%"></div>
      <!-- <div>
          <img src="@/assets/img/back.png" class="screen" @click="isScreen">
      </div> -->
  </div>
</template>
<script>
export default{
  data() {
    return{
      analyseOption: {},
      data: [{"name":"IPhone 11","stock":2310,"sales":2103},
      {"name":"长筒靴系带","stock":34312,"sales":23509},
      {"name":"打底毛衣宽松","stock":22140,"sales":12830},
      {"name":"厚款羽绒服","stock":10842,"sales":5492},
      {"name":"牛仔裤","stock":68102,"sales":44043},
      {"name":"加厚卫衣","stock":12032,"sales":8603},
      {"name":"衬衫","stock":9890,"sales":8960},
      {"name":"HUAWEI P30","stock":20130,"sales":12302},
      {"name":"手机壳","stock":89342,"sales":42948},
      {"name":"打底裤","stock":5034,"sales":1220}],
      // 圆环的坐标
      radius: [
        ['25%', '30%'],
        ['50%', '30%'],
        ['75%', '30%'],
        ['37.5%', '75%'],
        ['62.5%', '75%'],
      ],
      // 圆环渐变色
      colorArr: [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF'],
      ],
      flag: 0,
      amount: 5,
      newData: []
    }
  },
  mounted() {
    this.isInterval()
    // this.userEchart()
  },
  methods: {
    isScreen() {
      console.log('点击了');
    },
    isInterval() {
      this.setData()
      clearInterval(dataTime)
      var dataTime = setInterval(() => {
        this.setData()
      }, 3000)
    },
    setData() {
      this.flag == 2 && (this.flag = 0)
      this.newData = this.data.slice(this.flag * this.amount, (this.flag + 1) * this.amount)
      this.userEchart()
      this.flag++
    },
    userEchart() {
      var analyseChart = this.$echarts.init(document.getElementById('analyse'))
      this.analyseOption = {
        title: {
            text: '库存和销量分析',
            textStyle:{
                color:'#ccc',
            },
        },
        color : [ '#6959CD', '#aaa' ],
        series: this.newData.map((item, i) => {
          return {
            type: 'pie',
            radius: ['25%', '30%'],
            center: this.radius[i],
            // 关闭鼠标移入到饼图的动画效果
            hoverAnimation: false,
            // 隐藏指示线条
            labelLine: {
              show: false,
            },
            label: {
              position: 'center',
              color: this.colorArr[i][0],
            },
            data: [
              // 销量
              {
                name: item.name + '\n\n' + item.sales,
                value: item.sales,
                itemStyle: {
                  // 创建线性渐变的颜色 从下往上
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    // 0%
                    { offset: 0, color: this.colorArr[i][0] },
                    // 100%
                    { offset: 1, color: this.colorArr[i][1] },
                  ]),
                },
                // 内部的提示框 c数值 d百分比
                tooltip: {
                  formatter: `${item.name} <br/>销量：{c} <br/>占比：{d}%`,
                },
              },
              // 库存
              {
                value: item.stock,
                itemStyle: {
                  color: '#bbb',
                },
                // 内部的提示框
                tooltip: {
                  formatter: `${item.name} <br/>库存：{c} <br>占比：{d}%`,
                },
              },
            ]
           
          }
        })
      }
      analyseChart.setOption(this.analyseOption)
      //根据窗口的大小变动图表 --- 重点
      window.onresize = function(){
        analyseChart.resize();
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