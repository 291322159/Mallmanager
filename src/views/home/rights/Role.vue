<template>
  <div>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>

		<el-card class="box-card searchRow">
			<el-row>
				<el-col>
					<el-button type="primary" plain>添加角色</el-button>
				</el-col>
			</el-row>

			<!-- 3.列表 -->
			<el-table :data="roleList" class="roleTable" style="width: 100%" height="500px" border>
				<el-table-column type="expand" width="50">
          <template slot-scope="scope">
          		<el-row v-for="(item1, index) in scope.row.children" :key="index">
                <el-col :span="4">
                  <el-tag @close="deleRight(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="(item2, index) in item1.children" :key="index">
                    <el-col :span="4">
                      <el-tag @close="deleRight(scope.row, item2.id)" type="success" closable>{{item2.authName}}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                      <el-tag @close="deleRight(scope.row, item3.id)" type="warning" closable v-for="(item3, index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
          </template>
				</el-table-column>
				<el-table-column type="index" label="#" width="60"></el-table-column>
				<el-table-column prop="roleName" label="角色名称" ></el-table-column>
				<el-table-column prop="roleDesc" label="角色描述"></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
							<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
							<el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDelMsgbox(scope.row.id)"></el-button>
							<el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showSetRightDia(scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>



    <!-- 对话框 -->
    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <el-tree
        ref="tree"
        :data="resslist"
        show-checkbox
        node-key="id"
        :default-expanded-keys="arrexpand"
        :default-checked-keys="arrcheck"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "role",
		data() {
			return {
				roleList: [],
        dialogFormVisibleRight: false,
        // 树形结构的数据
        resslist: '',
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        arrexpand: [],
        arrcheck: [],
        currRoleId: ''
			}
		},
		methods: {
			async getRolelist() {
				const res = await this.$http.get('roles')
				this.roleList = res.data.data
			},
      // 取消权限
      async deleRight(role, rightId) {
        // roles/:roleId/rights/:rightId
        const res = await this.$http.delete('roles/' + role.id + '/rights/' + rightId)
        role.children = res.data.data
      },
      // 修改分配权限 - 打开对话框
      async showSetRightDia(role) {
        // 给currRoleId赋值
        this.currRoleId = role.id

        const res = await this.$http.get('rights/tree')
        this.resslist = res.data.data
        this.resslist.forEach(item1 => {
          this.resslist.forEach(item2 => {
            this.resslist.forEach(item3 => {
              this.arrexpand.push(item3.id)
            })
          })
        })
        let arrtemp2 = []
        role.children.forEach(item1 => {
          role.children.forEach(item2 => {
            role.children.forEach(item3 => {
              arrtemp2.push(item3.id)
            })
          })
        })
        this.arrcheck = arrtemp2
        this.dialogFormVisibleRight = true

      },
      // 修改分配权限 - 角色授权
      async setRoleRight() {
        let arr1 = this.$refs.tree.getCheckedKeys()
        let arr2 = this.$refs.tree.getHalfCheckedKeys()
        let arr = [...arr1, ...arr2]
        const res = await this.$http.post('roles/' + this.currRoleId + '/rights', {
          rids: arr.join(',')
        })
        this.getRolelist()
        this.dialogFormVisibleRight = false
      }
		},
		created() {
			this.getRolelist()
		}
  }
</script>

<style scoped>
  .roleTable{
    margin-top: 20px;
  }
</style>
