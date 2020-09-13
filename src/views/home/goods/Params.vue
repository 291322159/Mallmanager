<template>
  <div>
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="参数列表"></my-bread>

    <el-card class="box-card searchRow">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon>
      </el-alert>

      <!-- 搜索栏 -->
      <el-form label-position="left" label-width="110px" class="paramsForm">
        <el-form-item label="选择商品分类：">
          <el-cascader
            :show-all-levels="false"
            clearable
            v-model="selectedOptions"
            :options="options"
            expand-trigger="hover"
            :props="defaultProp"
            @change="handleChange"></el-cascader>
        </el-form-item>
      </el-form>




      <!-- 标签页 -->
      <el-tabs v-model="active">
        <el-tab-pane label="动态参数" name="1">
          <el-button type="primary" class="paramsBtn">设置动态参数</el-button>
          <el-table
              :data="arrDtparams"
              style="width: 100%">
              <el-table-column type="expand" label="#">
                <template slot-scope="scope">
                  <el-tag
                    :key="tag"
                    v-for="tag in scope.row.attr_vals"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(scope.row, tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="属性名称"
                prop="attr_name">
              </el-table-column>
              <el-table-column
                label="操作"
                prop="desc">
                <template slot-scope="scope">
                	<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditGoodsDia(scope.row)"></el-button>
                	<el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDelGoods(scope.row.goods_id)"></el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="2">
          <el-button type="primary" class="paramsBtn">设置静态参数</el-button>
          <el-table
            :data="arrStaticoarams"
            style="width: 100%">
            <el-table-column
              label="#"
              type="index">
            </el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name">
            </el-table-column>
            <el-table-column
              label="属性值"
              prop="attr_vals">
            </el-table-column>
            <el-table-column
              label="操作"
              prop="desc">
              <template slot-scope="scope">
              	<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditGoodsDia(scope.row)"></el-button>
              	<el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDelGoods(scope.row.goods_id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!-- 表格 -->


    </el-card>
  </div>
</template>

<script>

  export default {
    name: "Params",
    data() {
      return {
        // 选择商品分类
        select: '',
        // 级联选择器绑定的数据
        options: [],
        selectedOptions: [1, 3, 5],
        defaultProp: {
          label: 'cat_name',
          value: 'cat_id',
          children: 'children'
        },
        active: '1',
        arrDtparams: [],
        arrStaticoarams: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    created() {
      // 获取参数列表
    	this.getParamsList()
    },
    methods: {
      async getParamsList() {
        const res = await this.$http.get('categories')
        this.options = res.data.data

      },
      // 级联选择器改变
      async handleChange() {
        if(this.selectedOptions.length === 3) {
          const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=many')
          this.arrDtparams = res.data.data
          this.arrDtparams.forEach(item => {
            item.attr_vals === 0 ? [] : item.attr_vals = item.attr_vals.trim().split(',')
          })
          const res1 = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=only')
          this.arrStaticoarams = res1.data.data
        }
      },
      // 点击x按钮
      async handleClose(arrDtparams, tag) {
        arrDtparams.attr_vals.splice(arrDtparams.attr_vals.indexOf(tag), 1);
        let putData = {
          attr_name: arrDtparams.attr_name,
          attr_sel: 'many',
          attr_vals: arrDtparams.attr_vals.join(',')
        }
        const res = await this.$http.put('categories/' + this.selectedOptions[2] + '/attributes/' + arrDtparams.attr_id, putData)
      },
      // 点击 newTag+ 按钮
      showInput(attr_vals) {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      // 回车键or 失去焦点
      async handleInputConfirm(arrDtparams) {
        let inputValue = this.inputValue;
        if (inputValue) {
          arrDtparams.attr_vals.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
        let putData = {
          attr_name: arrDtparams.attr_name,
          attr_sel: 'many',
          attr_vals: arrDtparams.attr_vals.join(',')
        }
        const res = await this.$http.put('categories/' + this.selectedOptions[2] + '/attributes/' + arrDtparams.attr_id, putData)
      }
    }
  }
</script>

<style scoped>
  .paramsBtn{
    padding: 7px 15px;
  }
  .paramsForm{
    display: inline-block;
    margin-top: 20px;
  }
</style>
