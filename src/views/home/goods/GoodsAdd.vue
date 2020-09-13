<template>
  <div>
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <el-card class="box-card searchRow">
      <el-alert title="添加商品信息"  type="success"  center show-icon> </el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="1*active" finish-status="success" class="goodsSteps">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>

      <!-- 表单元素 -->
      <el-form label-position="top" label-width="80px" :model="form">
        <el-tabs v-model="active" tab-position="left" @tab-click="tabChange()">
          <el-tab-pane name="1" label="基本信息">
            <el-form-item label="名称">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                clearable
                expand-trigger="hover"
                v-model="selectedOptions"
                :options="options"
                :props="defaulProp"
                @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品参数">
            <el-form-item :label="item1.attr_name" v-for="(item1, index) in arrDtparams" :key="index">
              <el-checkbox-group v-model="item1.attr_vals">
                <el-checkbox :label="item2" v-for="(item2, index) in item1.attr_vals" :key="index" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品属性">
            <el-form-item :label="item.attr_name" v-for="(item, index) in arrStaticoarams" :key="index" >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="4" label="商品图片">
            <el-form-item>
              <el-upload
                action="http://www.ysqorz.top:8888/api/private/v1/"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="5" label="商品内容">
            <el-form-item>
              <el-button type="primary" @click="addGoods">添加商品</el-button>
              <quill-editor class="editor" v-model="form.goods_introduce"></quill-editor>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>


    </el-card>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: "goodsadd",
    components: {
      quillEditor
    },
    data() {
      return {
        active: '1',
        // 添加商品的表单数据
        // goods_name 	商品名称 	不能为空
        // goods_cat 	以为','分割的分类列表 	不能为空
        // goods_price 	价格 	不能为空
        // goods_number 	数量 	不能为空
        // goods_weight 	重量 	不能为空
        // goods_introduce 	介绍 	可以为空
        // pics 	上传的图片临时路径（对象） 	可以为空
        // attrs 	商品的参数（数组） 	可以为空
        form: {
          goods_name: '',
          goods_cat: '',
          goods_price: '',
          goods_number: '',
          goods_weight: '',
          goods_introduce: '',
          pics: [],
          attrs: []
        },
        // 级联选择机器的数据
        options: [],
        selectedOptions: [1, 3, 6],
        defaulProp: {
          label: 'cat_name',
          value: 'cat_id',
          children: 'children'
        },
        // 动态参数的数据数组
        arrDtparams: [],
        // 静态参数的数据数组
        arrStaticoarams: [],
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    },
    created() {
      // 获取级联选择器的数据
    	this.getGoodsAddList()
    },
    methods: {
      async getGoodsAddList() {
        const res = await this.$http.get('categories?type=3')
        this.options = res.data.data
      },
      async tabChange() {
        if(this.active === '2') {
          if(this.selectedOptions.length !== 3) {
            this.$message.warning('请先选择商品的三级分类')
            return
          }
          const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=many')
          this.arrDtparams = res.data.data
          this.arrDtparams.forEach(item => {
            item.attr_vals === 0 ? [] : item.attr_vals = item.attr_vals.trim().split(',')
          })
        }else if(this.active === '3') {
          if(this.selectedOptions.length !== 3) {
            this.$message.warning('请先选择商品的三级分类')
            return
          }
          const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=only')
          this.arrStaticoarams = res.data.data
        }
      },
      handleChange() {

      },
      // 图片上传时的方法
      // 预览时触发
      handlePreview(file) {},
      // 点击关闭时触发
      handleRemove(file) {
        // 法一
        // let Index = this.form.pics.findIndex(item => {
        //   return item.pic === file.response.data.tmp_path
        // })
        // this.form.pics.splice(Index, 1)
        // 法二
        this.form.pics = this.form.pics.filter(item => {
          return item.pic !== file.response.data.tmp_path
        })
        // console.log(this.form.pics)
      },
      // 上传成功时触发
      handleSuccess(file) {
        this.form.pics.push({
          pic: file.data.tmp_path
        })
      },
      // 添加商品
      async addGoods() {
        this.form.goods_cat = this.selectedOptions.join(',')
        let arr1 = this.arrDtparams.map(item => {
          return {attr_id: item.attr_id, attr_value: item.attr_vals}
        })
        let arr2 = this.arrStaticoarams.map(item => {
          return {attr_id: item.attr_id, attr_value: item.attr_vals}
        })
        this.form.attrs = [...arr1, ...arr2]
        const res = await this.$http.post('goods', this.form)
        this.$router.push({name: 'goodsList'})
      }
    }
  }
</script>

<style scoped>
  .goodsSteps{
    margin: 20px 0;
  }
  .editor{
    margin-top: 20px;
  }
  .editor >>> .ql-editor{
    min-height: 300px;
  }
</style>
