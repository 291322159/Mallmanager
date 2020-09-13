<template>
  <div id="goods">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <el-card class="box-card searchRow">
      <!-- 搜索栏 -->
      <el-row>
        <el-col :span="24">
      		<el-input placeholder="请输入内容" v-model="searchvalue" class="searchInput" clearable @clear="loadGoodsList">
      		  <el-button @click="handleSearch()" slot="append" icon="el-icon-search"></el-button>
      		</el-input>
      		<el-button type="success" @click="$router.push({name:'goodsadd'})" >添加商品</el-button>
      	</el-col>
      </el-row>

      <!-- 3.列表 -->
      <el-table :data="goodslist" class="goodsTable" border>
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
      	<el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      	<el-table-column prop="goods_number" label="商品数量"></el-table-column>
      	<el-table-column label="创建日期">
          <template slot-scope="scope">{{scope.row.add_time | showDate()}}</template>
        </el-table-column>
      	<el-table-column  label="操作">
      		<template slot-scope="scope">
      			  <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDelGoods(scope.row.goods_id)"></el-button>
      		</template>
      	</el-table-column>
      </el-table>

      <!-- 4.分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
  import { formatDate } from "@/common/utils";

  export default {
    name: "goodsList",
    data() {
      return {
        // 分页相关数据
        queryInfo: {
        	query: '',
        	pagenum: 1,
        	pagesize: 5
        },
        // 获取用户列表的参数对象
        goodslist: [],
        total: 0,
        searchvalue: '',
      }
    },
    created() {
      // 获取商品列表
    	this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        const {data: res} = await this.$http.get('goods',{
					 params: this.queryInfo
				})

        if(res.meta.status === 200) {
        	// 1.给表格数据赋值
        	this.goodslist = res.data.goods
        	// 2.给total赋值
        	this.total = res.data.total
        	// 3.提示框
        	this.$message.success(res.meta.msg)
        }else {
        	this.$message.error(res.meta.msg)
        }
      },
      async showDelGoods(goodsId) {
         const res = await this.$http.delete('goods/' + goodsId)
         // 刷新商品列表
         this.getGoodsList()
      },
      loadGoodsList() {

      },
      showAddGoodsDia() {

      },
      // 分页相关的方法
      handleSizeChange(val) {
      	this.queryInfo.pagesize = val
      	this.queryInfo.pagenum = 1
      	this.getGoodsList()
      },
      handleCurrentChange(val) {
      	this.queryInfo.pagenum = val
      	this.getGoodsList()
      },
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
  .searchInput{
    width: 300px;
  }
  .goodsTable{
    width: 100%;
    margin-top: 25px;
  }
</style>
