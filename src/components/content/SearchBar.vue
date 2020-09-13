<template>
  <div>
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
  </div>
</template>

<script>

  export default {
    name: "",
    methods: {
      showAddUserDia() {
        console.log(1)
      }
    }
  }
</script>

<style scoped>

</style>
