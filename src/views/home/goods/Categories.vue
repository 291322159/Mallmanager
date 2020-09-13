<template>
  <div>
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>

    <el-card class="box-card searchRow">
      <el-button type="primary" @click="addGoodsCate()" >添加分类</el-button>

      <!-- 表格 -->
      <el-table :data="categoriesList" style="width: 100%">
        <el-tree-grid
          prop="cat_name"
          label="分类名称"
          treeKey="cat_id"
          parentKey="cat_pid"
          levelKey="cat_level"
          childKey="children">
        </el-tree-grid>
        <el-table-column prop="email" label="级别">
          <template slot-scope="scope">
            <span v-if="scope.row.cat_level === 0">一级</span>
            <span v-else-if="scope.row.cat_level === 1">二级</span>
            <span v-else-if="scope.row.cat_level === 2">三级</span>
          </template>
        </el-table-column>
      	<el-table-column prop="mobile" label="是否有效">
          <template slot-scope="scope">
            <span v-if="scope.row.cat_deleted === false">有效</span>
            <span v-else-if="scope.row.cat_deleted === true">无效</span>
          </template>
        </el-table-column>
      	<el-table-column label="操作">
          <template slot-scope="scope">
          	<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditDia(scope.row)"></el-button>
          	<el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDelefirm(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

			<!-- 分页 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pagenum"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>

    </el-card>


    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120px">
          <el-cascader
            :show-all-levels="true"
            clearable
            :props.checkStrictly = "true"
            v-model="selectedOptions"
            :options="caslist"
            expand-trigger="hover"
            :props="defaultProp"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addcate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 引入element-tree-grid
  var ElTreeGrid = require('element-tree-grid')

  export default {
    name: "categories",
    components: {
      ElTreeGrid
    },
    data() {
      return{
        categoriesList: [],
        pagenum: 1,
        pagesize: 10,
        total: 1,
        dialogFormVisibleAdd: false,
        form: {
          cat_pid: -1,
          cat_name: '',
          cat_level: -1
        },
        // 级联选择器要用的数据
        caslist: [],
        // 级联选择器选中的数据
        selectedOptions: [],
        defaultProp: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        }
      }
    },
    created() {
      // 获取分类列表
    	this.getCategoriesList()
    },
    methods: {
      async getCategoriesList() {

        const res = await this.$http.get('categories?type=3&pagenum=' + this.pagenum + '&pagesize=' + this.pagesize)
        this.categoriesList = res.data.data.result
        this.total = res.data.data.total
      },

      async addGoodsCate() {
        this.dialogFormVisibleAdd = true
        const res = await this.$http.get('categories?type=2')
        this.caslist = res.data.data
      },

      async addcate() {
        if(this.selectedOptions.length === 0) {
          this.form.cat_pid = 0
          this.form.cat_level = 0
        }else if(this.selectedOptions.length === 1) {
          this.form.cat_pid = this.selectedOptions[0]
          this.form.cat_level = 1
        }else if(this.selectedOptions.length === 2) {
          this.form.cat_pid = this.selectedOptions[1]
          this.form.cat_level = 2
        }
        const res = await this.$http.post('categories', this.form)
        this.getCategoriesList()
        this.dialogFormVisibleAdd = false
        this.form = {}
      },
      // 分页相关的方法
      handleSizeChange(val) {
      	this.pagesize = val
      	this.pagenum = 1
      	this.getCategoriesList()
      },
      handleCurrentChange(val) {
      	this.pagenum = val
      	this.getCategoriesList()
      },

      handleClose() {},

      showEditGoodsDia() {

      },
      showDelGoods() {}
    }
  }
</script>

<style scoped>

</style>
