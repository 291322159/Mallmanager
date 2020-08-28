<template>
  <el-container class="container">
    <el-header class="header">
			<el-row class="childheader">
			  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
			  <el-col :span="16">
					<div class="grid-content bg-purple-light">
						<h3>电商后台管理系统</h3>
					</div>
				</el-col>
			  <el-col :span="4">
					<div class="grid-content bg-purple login" @click="handleSignout">退出</div>
				</el-col>
			</el-row>
		</el-header>
		
    <el-container>
      <el-aside width="200px" class="aside">
				<el-menu
					:unique-opened="true"
					:router="true">
				  <el-submenu index="1">
				    <template slot="title">
				      <i class="el-icon-location"></i>
				      <span>用户管理</span>
				    </template>
				    <el-menu-item index="users">
								<i class="el-icon-menu"></i>
								<span>用户列表</span>       
				    </el-menu-item>
				  </el-submenu>
					
					<el-submenu index="2">
						<template slot="title">
						  <i class="el-icon-location"></i>
						  <span>权限管理</span>
						</template>
					  <el-menu-item>
							<i class="el-icon-menu"></i>
							<span index="2-1">角色列表</span>
						</el-menu-item>
						<el-menu-item>
							<i class="el-icon-menu"></i>
							<span index="2-2">权限列表</span>
						</el-menu-item>
					</el-submenu>
					
					<el-submenu index="3">
						<template slot="title">
						  <i class="el-icon-location"></i>
						  <span>商品管理</span>
						</template>
					  <el-menu-item>
					  	<i class="el-icon-menu"></i>
					  	<span index="3-1">商品列表</span>
					  </el-menu-item>
						<el-menu-item>
							<i class="el-icon-menu"></i>
							<span index="3-2">分类参数</span>
						</el-menu-item>
						<el-menu-item>
							<i class="el-icon-menu"></i>
							<span index="3-3">商品分类</span>
						</el-menu-item>
					</el-submenu>
					
					<el-submenu index="4">
						<template slot="title">
						  <i class="el-icon-location"></i>
						  <span>订单管理</span>
						</template>
					  <el-menu-item>
					  	<i class="el-icon-menu"></i>
					  	<span index="4-1">订单列表</span>
					  </el-menu-item>
					</el-submenu>
					
					<el-submenu index="5">
					  <template slot="title">
					    <i class="el-icon-location"></i>
					    <span>数据统计</span>
					  </template>
					  <el-menu-item>
					  	<i class="el-icon-menu"></i>
					  	<span index="5-1">数据列表</span>
					  </el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			
      <el-main class="main">
				<router-view></router-view>
			</el-main>
    </el-container>
  </el-container>
</template>

<script>
	
	
	
  export default {
    name: "home",
		components: {
			
		},
		methods: {
			handleSignout() {
				// 1.清楚token
				localStorage.clear()
				// 2.提示
				this.$message.success('退出成功')
				// 3.来到login组件
				this.$router.push({ name: 'login' })
			}
		},
		beforeCreate() {
			// 判断token值,如果没有就不能进入home
			const token = localStorage.getItem('token')			
			if(!token) {
				this.$router.push({name: 'login'})
			}
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
	
	.childheader{
		height: 100%;
		text-align: center;
	}
	.childheader div{
		height: 100%;
	}
	.login{
		line-height: 60px;
		cursor: pointer;
	}
</style>
