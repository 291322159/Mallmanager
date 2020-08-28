<template>
  <div>
		
		<!-- 1.面包屑 -->
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>首页</el-breadcrumb-item>
			  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
			</el-breadcrumb>
			
    <el-card class="box-card searchRow">	
			<!-- 2.搜索栏 -->
			<el-row>
			  <el-col>
					<el-input placeholder="请输入内容" v-model="queryInfo.query" class="inputSearch" clearable @clear="loadUserList">
					  <el-button @click="searchUser()" slot="append" icon="el-icon-search"
						></el-button>
					</el-input>
					<el-button type="success" @click="showAddUserDia">添加用户</el-button>
					<!-- <el-button type="text" @click="dialogFormVisibleAdd = true">打开嵌套表单的 Dialog</el-button> -->
						
						
				</el-col>
			</el-row>
			
			<!-- 3.列表 -->
			<el-table :data="userlist" style="width: 100%">
			  <el-table-column type="index" label="#" width="40"></el-table-column>
			  <el-table-column prop="username" label="姓名" width="80"></el-table-column>
			  <el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="mobile" label="电话"></el-table-column>
				<el-table-column prop="role_name" label="角色"></el-table-column>
				<el-table-column label="创建时间">
					<!-- 在单元格内显示非文本数据，需要给被显示的内容外层包裹一个 template -->
					<!-- template 内部要用数据 设置 slot-scope 属性，该属性的值是要用的数据 create_time 的数据源 userlist -->
					<!-- slot-scope 的值 userlist 其实就是 el-table 绑定的数据 userlist，userkist.row数组中的每个对象 -->
					<template slot-scope="scope">{{scope.row.create_time | showDate()}}</template>
				</el-table-column>
				<el-table-column prop="mg_state" label="用户状态">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.mg_state"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
					</template>
					
				</el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						  <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
						  <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
							<el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<!-- 4.分页 -->
			<el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="queryInfo.pagenum"
			  :page-sizes="[2, 4, 6, 8]"
			  :page-size="2"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="total">
			</el-pagination>
		</el-card>
		
		
		
		
		<!-- 对话框 -->
		<!-- 添加用户的对话框 -->
		
		<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
		  <el-form :model="form">
		    <el-form-item label="用户名" label-width="60px">
		      <el-input v-model="form.username" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" label-width="60px">
		      <el-input v-model="form.password" autocomplete="off"></el-input>
		    </el-form-item>
				<el-form-item label="邮箱" label-width="60px">
				  <el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="60px">
				  <el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
		    <el-button type="primary" @click="addUser">确 定</el-button>
		  </div>
		</el-dialog>
		
		
		
		
  </div>
</template>

<script>
	import { formatDate } from "@/common/utils";
	
  export default {
    name: "users",
		data() {
			return {
				// 分页相关数据
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 2
				},	
			// 获取用户列表的参数对象				
				userlist: [],					
				total: 0,
				
				
				// 添加对话框的属性
				dialogFormVisibleAdd: false,
				// 添加用户的表单数据
				 form: {},
			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			async getUserList() {				
				// 需要授权的 API ,必须在请求头中使用 Authorization 字段提供 token 令牌
				const AUTH_TOKEN = localStorage.getItem('token')
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
				
				const {data: res} = await this.$http.get('users', {
					 params: this.queryInfo 
				})
				if(res.meta.status === 200) {
					// 1.给表格数据赋值
					this.userlist = res.data.users
					// 2.给total赋值
					this.total = res.data.total
					// 3.提示框
					this.$message.success(res.meta.msg)
				}else {
					this.$message.error(res.meta.msg)
				}
			},
			
			// 分页相关的方法
			handleSizeChange(val) {
				console.log(`每页${val}条`)
				this.queryInfo.pagesize = val
				this.queryInfo.pagenum = 1
				this.getUserList()
			},
			handleCurrentChange(val) {
				console.log(`当前页：${val}`)
				this.queryInfo.pagenum = val
				this.getUserList()
			},
			// 搜索用户
			searchUser() {
				this.getUserList()
			},
			// 清空搜索框,重新获取数据
			loadUserList() {
				this.getUserList()
			},
			// 添加用户
			showAddUserDia() {
				this.dialogFormVisibleAdd = true
			},
			// 添加用户 - 发送请求
			async addUser() {
				
				const res = await this.$http.post('users', this.form)
				// const {meta: {status, msg}, data} = res.data
				if(res.data.meta.status === 201) {
					// 1.提示成功
					this.$message.success(res.data.meta.msg)
					// 2.关闭对话框
					this.dialogFormVisibleAdd = false
					// 3.更新试图
					this.getUserList()
					// 4.清空文本框
					this.form = {}
				}else {
					// 失败提示
					this.$message.success(res.data.meta.msg)
					// 清空文本框
					this.form = {}
				}
			}
		},
		filters: {
			showDate(value) {
				// 将时间戳转成Date对象
				const date = new Date(value * 1000)
				// 将date进行格式化
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		}
		

  }
</script>

<style scoped>
	.searchRow {
		margin-top: 25px;
	}
  .inputSearch{
		width: 300px;
	}
</style>
