<template>
  <div class="chartBox">
      <div id="hot" style="width: 100%; height: 100%"></div>
      <!-- <div>
          <img src="@/assets/img/back.png" class="screen" @click="isScreen">
      </div> -->
  </div>
</template>
<script>
export default{
  data() {
    return{
      data: ['商家1', '商家2', '商家3', '商家4', '商家5', '商家6','商家7', '商家8', '商家9', '商家10', '商家11', '商家12'],
      hotOption: {}
    }
  },
  mounted() {
    this.userEchart()
  },
  methods: {
    isScreen() {
      console.log('点击了');
    },
    setData() {

    },
    userEchart() {
      var hotChart = this.$echarts.init(document.getElementById('hot'))
      this.hotOption = {
        title: {
            text: '热销商品占比',
            textStyle:{
                color:'#ccc',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '30px',
            left: 'center',
            textStyle:{
                color:'#ccc'
            },
        },
        //设置饼状图每个颜色块的颜色
        color : [ '#9370DB', '#80FFA5', '#37A2FF', '#FFBF00', '#FF0087' ],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '40%',
                data: [
                    {value: 1048, name: '裙装'},
                    {value: 735, name: '女士上衣'},
                    {value: 580, name: '外套'},
                    {value: 484, name: '裤装'},
                    {value: 300, name: '鞋'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      }
      hotChart.setOption(this.hotOption)
      //根据窗口的大小变动图表 --- 重点
      window.onresize = function(){
        hotChart.resize();
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