<template>
  <el-container class="container">
    <el-header class="header">
			<el-row class="childheader">
			  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
			  <el-col :span="16">
					<div class="grid-content bg-purple-light">
						<h3>优乐购电商后台管理系统</h3>
					</div>
				</el-col>
			  <el-col :span="4" class="user">
					<div class="userName">欢迎您：{{userName}}</div>
					<div class="grid-content bg-purple login" @click="handleSignout">退出</div>
				</el-col>
			</el-row>
		</el-header>

    <el-container>
      <el-aside width="200px" class="aside">
				<el-menu
					:unique-opened="true"
					:router="true"
					 background-color="#373d41"
					 text-color="#fff">
				  <el-submenu index="1">
				    <template slot="title">
				      <i class="el-icon-user-solid"></i>
				      <span>用户管理</span>
				    </template>
				    <el-menu-item index="users">
								<i class="el-icon-menu"></i>
								<span>用户列表</span>
				    </el-menu-item>
				  </el-submenu>

					<el-submenu index="2">
						<template slot="title">
						  <i class="el-icon-s-tools"></i>
						  <span>权限管理</span>
						</template>
					  <el-menu-item index="role">
							<i class="el-icon-menu"></i>
							<span>角色列表</span>
						</el-menu-item>
						<el-menu-item index="rights">
							<i class="el-icon-menu"></i>
							<span>权限列表</span>
						</el-menu-item>
					</el-submenu>

					<el-submenu index="3">
						<template slot="title">
						  <i class="el-icon-s-goods"></i>
						  <span>商品管理</span>
						</template>
					  <el-menu-item index="goodsList">
					  	<i class="el-icon-menu"></i>
					  	<span>商品列表</span>
					  </el-menu-item>
						<el-menu-item index="Params">
							<i class="el-icon-menu"></i>
							<span>分类参数</span>
						</el-menu-item>
						<el-menu-item index="categories">
							<i class="el-icon-menu"></i>
							<span>商品分类</span>
						</el-menu-item>
					</el-submenu>

					<el-submenu index="4">
						<template slot="title">
						  <i class="el-icon-s-order"></i>
						  <span>订单管理</span>
						</template>
					  <el-menu-item index="orders">
					  	<i class="el-icon-menu"></i>
					  	<span>订单列表</span>
					  </el-menu-item>
					</el-submenu>

					<!-- <el-submenu index="5">
					  <template slot="title">
					    <i class="el-icon-s-marketing"></i>
					    <span>数据统计</span>
					  </template>
					  <el-menu-item index="reports">
					  	<i class="el-icon-menu"></i>
					  	<span>数据列表</span>
					  </el-menu-item>
					</el-submenu> -->

					<el-submenu index="6">
					  <template slot="title">
					    <i class="el-icon-s-marketing"></i>
					    <span>大屏数据</span>
					  </template>
					  <el-menu-item index="screen">
					  	<i class="el-icon-menu"></i>
					  	<span>大屏视图</span>
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
		data() {
			return {
				userName: ''
			}
		},
		components: {

		},
		mounted() {
			this.userName = localStorage.getItem('userName')
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
  }
</script>

<style scoped>
  .container{
		height: 100%;
	}
	.header{
		background-color: #373d41;
	}
	.aside{
		background-color: #373d41;
	}
	.main{
		background-color: #e9eef3;
		height: 100%;
	}

	.childheader{
		height: 100%;
		text-align: center;
		color: #fff;
	}
	.childheader div{
		height: 100%;
	}
	.login{
		line-height: 60px;
		cursor: pointer;
	}
	.user{
		display: flex;
	}
	.userName{
		margin-right: 20px;
		display: flex;
		align-items: center;
	}
</style>
