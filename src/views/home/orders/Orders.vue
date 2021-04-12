<template>
  <div>
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>

    <el-card class="box-card searchRow">
      <!-- 表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay == 0">已付款</el-tag>
            <el-tag type="dangr" v-else-if="scope.row.order_pay == 1">未付款</el-tag>
            <el-tag type="dangr" v-else-if="scope.row.order_pay == 2">微信</el-tag>
            <el-tag type="dangr" v-else-if="scope.row.order_pay == 3">银行卡</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">{{scope.row.create_time | showDate()}}</template>
        </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
          	<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditdia()"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 对话框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="省市区" label-width="120px">
          <el-cascader
          expand-trigger="hove"
          clearable
          :options="catlist"
          v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="form.address" autocomplrtr="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrders">确 定</el-button>
      </div>
    </el-dialog>
    <div id="box">
      <el-input  placeholder="请输入内容"></el-input>
    </div>
    <el-button @click="btn(true)">增加高度{{this.height}}</el-button>
    <el-button @click="btn(false)">减少高度{{this.height}}</el-button>
  </div>
</template>

<script>
  import { formatDate } from "@/common/utils";
  import catList from "@/assets/city_data2017_element.js"

  export default {
    name: "orders",
    data() {
      return {
        list: [],
        dialogFormVisible: false,
        form: {
          address: ''
        },
        catlist: [],
        selectedOptions: [],
        height: 40,
      }
    },
    created() {
      // 获取订单列表
    	this.getOrdersList()
    },
    methods: {
      async getOrdersList() {
        const res = await this.$http.get('orders?pagenum=1&pagesize=10')
        this.list = res.data.data.goods
      },
      // 打开对话框 - 获取数据
      showEditdia() {
        this.dialogFormVisible = true
        this.catlist = catList
      },
      // 打开对话框 - 提交数据
      addOrders() {
        this.dialogFormVisible = false
      },
      btn(flag) {
        flag ? this.height++ : this.height--
        document.querySelector('#box').children[0].children[0].style.height = this.height + 'px'
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

</style>
