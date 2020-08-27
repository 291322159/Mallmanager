<template>
  <el-row class="header">
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="16">
			<div class="grid-content bg-purple-light">
				<h3>电商后台管理系统</h3>
			</div>
		</el-col>
    <el-col :span="4">
			<div class="grid-content bg-purple login">退出</div>
		</el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .header{
		height: 100%;
		text-align: center;
	}
	.header div{
		height: 100%;
	}
	.login{
		line-height: 60px;
		cursor: pointer;
	}
</style>
