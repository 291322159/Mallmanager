<template>
  <div class="login-wrap">
    <el-form 
		:label-position="labelPosition" 
		label-width="80px" 
		:model="formData"
		class="login-form">
			<h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
			<el-button 
			type="primary" 
			class="login-btn" 
			@click.prevent="handLeLogin"
			>登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "login",
		data() {
		  return {
		    labelPosition: 'top',
		    formData: {
		      username: '',
		      password: '',
		    }
		  }
		},
		methods: {
			async handLeLogin() {
				const res = await this.$http.post('login', this.formData).then(res => {
					console.log(res)
					const {
						data,
						meta:{msg, status}
					} = res.data
					
					if (status === 200) {
						// 登录成功
						// 0.保存token
						// 保存正确用户的token
						localStorage.setItem('token', data.token)
						// 1.跳转 home 页面
						this.$router.push({name: 'home'})
						// 2.登录成功提示
						this.$message.success(msg);
					}else {
						// 不成功
						// 不成功提示
						this.$message.warning(msg);
					}
				})
			}
		}
  }
</script>

<style scoped>
  .login-wrap{
		height: 100%;
		background-color: #324152;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.login-wrap .login-form{
		width: 400px;
		background-color: #fff;
		border-radius: 5px;
		padding: 30px;
	}
	.login-wrap .login-btn{
		width: 100%;
	}
</style>
