<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item>
					<i class="el-icon-menu"></i>
					<span index="1-1">选项1</span>
        
      </el-menu-item>
    </el-submenu>
		
		<el-submenu index="2">
		  <template slot="title">
		    <i class="el-icon-location"></i>
		    <span>导航一</span>
		  </template>
		  <el-menu-item-group>
		    <i class="el-icon-menu"></i>
		    <span index="2-1">选项1</span>
		  </el-menu-item-group>
		</el-submenu>
		
		<el-submenu index="3">
		  <template slot="title">
		    <i class="el-icon-location"></i>
		    <span>导航二</span>
		  </template>
		  <el-menu-item-group>
		    <i class="el-icon-menu"></i>
		    <span index="3-1">选项1</span>
		  </el-menu-item-group>
		</el-submenu>
		
		<el-submenu index="4">
		  <template slot="title">
		    <i class="el-icon-location"></i>
		    <span>导航三</span>
		  </template>
		  <el-menu-item-group>
		    <i class="el-icon-menu"></i>
		    <span index="4-1">选项1</span>
		  </el-menu-item-group>
		</el-submenu>
		
		<el-submenu index="5">
		  <template slot="title">
		    <i class="el-icon-location"></i>
		    <span>导航四</span>
		  </template>
		  <el-menu-item-group>
		    <i class="el-icon-menu"></i>
		    <span index="5-1">选项1</span>
		  </el-menu-item-group>
		</el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "Aside",
		methods: {
		  handleOpen(key, keyPath) {
		    console.log(key, keyPath);
		  },
		  handleClose(key, keyPath) {
		    console.log(key, keyPath);
		  }
		}
  }
</script>

<style scoped>
  
</style>
