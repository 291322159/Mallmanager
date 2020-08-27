<template>
  <el-container class="container">
    <el-header class="header">
			<child-header></child-header>
		</el-header>
    <el-container>
      <el-aside width="200px" class="aside">
				<child-aside></child-aside>
			</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
	import childHeader from './childCome/Header.vue'
	import childAside from './childCome/Aside.vue'
	import childMain from './childCome/Main.vue'
	
	
	
  export default {
    name: "home",
		components: {
			childHeader,
			childAside,
			childMain
		}
  }
</script>

<style scoped>
  .container{
		height: 100%;
	}
	.header{
		background-color: #b3c0d1;
	}
	.aside{
		background-color: #d3dce6;
	}
	.main{
		background-color: #e9eef3;
		height: 100%;
	}
</style>
