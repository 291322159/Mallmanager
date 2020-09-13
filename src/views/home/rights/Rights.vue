<template>
  <div>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
		
		<el-card class="box-card searchRow">
			<!-- 3.列表 -->
			<el-table :data="rightsList" style="width: 100%" height="500px" border>
			  <el-table-column type="index" label="#" width="60"></el-table-column>
			  <el-table-column prop="authName" label="权限名称" ></el-table-column>
			  <el-table-column prop="path" label="路径"></el-table-column>
				<el-table-column prop="level" label="层级">
					<template slot-scope="scope">
						<span v-if="scope.row.level === '0'">一级</span>
						<span v-if="scope.row.level === '1'">二级</span>
						<span v-if="scope.row.level === '2'">三级</span>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		
  </div>
</template>

<script>

  export default {
    name: "Rights",
		components: {
			
		},
		data() {
			return {
				rightsList: [],
			}
		},
		methods: {
			async getRightlist() {
				const res = await this.$http.get('rights/list')
				this.rightsList = res.data.data
			}
		},
		created() {
			this.getRightlist()
		}
  }
</script>

<style scoped>
  
</style>
