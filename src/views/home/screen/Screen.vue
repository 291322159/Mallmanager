<template>
  <div class="container">
    <header class="screenHeader">
      <img src="@/assets/img/header_border_dark.png" class="headerBack">
      <div class="headerTxt" @click="back">返回<img src="@/assets/img/back.png" class="back"></div>
      <div class="headerTxt" style="margin-top: 10px; font-size: 25px">大屏实时监测系统</div>
      <div class="headerTxt">{{time}}</div>
    </header>
    <div class="content">
      <trend class="chart"/>
      <distribution class="chart"/>
      <hot class="chart"/>
      <sales class="chart"/>
      <region class="chart"/>
      <analyse class="chart"/>
    </div>
  </div>
</template>
<script>
import trend from './trend/index'
import sales from './sales/index'
import hot from './hot/index'
import analyse from './analyse/index'
import region from './region/index'
import distribution from './distribution/index'
export default{
  name: 'Screen',
  data() {
    return {
      time: ''
    }
  },
  components: {
    trend,
    sales,
    hot,
    analyse,
    region,
    distribution
  },
  mounted() {
    this.isInterval()
  },
  methods: {
    back() {
      this.$router.push('users')
    },
    isInterval() {
      this.getTime()
      clearInterval(dataTime)
      var dataTime = setInterval(() => {
        this.getTime()
      }, 1000)
    },
    getTime() {
      var d = new Date()
      this.time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
    }
  }
}
</script>
<style  scoped>
.container{
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgb(22, 21, 34);
}
.screenHeader{
  width: 100%;
  height: 72px;
  background-size: cover;
  background-position: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
.headerBack{
  width: 100%;
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.headerTxt{
  font-size: 20px;
  display: flex;
  z-index: 9;
}
.back{
  margin-left: 10px;
  width: 25px;
  height: 25px;
}
.content{
  display: flex;
  flex-wrap: wrap;
}
.chart{
  width: 33.33%;
  height: calc(50vh - 46px);
}
</style>