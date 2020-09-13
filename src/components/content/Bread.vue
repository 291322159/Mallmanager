<template>
  <!--面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "bread",
		props: ['level1', 'level2']
  }
</script>

<style scoped>
  .bread{
		margin-bottom: 25px;
	}
</style>
