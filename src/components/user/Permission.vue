<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
       <div class="shuju">
      <el-table :data="list" border="true" style="width: 100%">
        <!-- 数量 -->
        <el-table-column type="index" width="50"></el-table-column>
        <!-- 姓名 -->
        <el-table-column label="权限名称" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.authName }}</p>
          </template>
        </el-table-column>
        <!-- 邮箱 -->
        <el-table-column label="路径">
          <template slot-scope="scope">
            <p>{{ scope.row.path }}</p>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag :type="scope.row.level==0?'':scope.row.level==1?'success':'warning'">{{scope.row.level==0?'一级':scope.row.level==1?'二级':'三级'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      
    </div>
    </div>
   
  </div>
</template>

<script>
import Top from "../usertop";
import HTTP from "../../services/product-service.js";
const _http = new HTTP();
import stor from "../../model/storage.js";
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  components: {
    Top
  },
  computed: {},
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    let obj = {
      token: list.token
    };
    _http.tree(obj).then(d => {
      console.log(d);
      this.list = d.data.data;
    });
  }
};
</script>
<style  scoped>
.bian{
  height: 1000px;
  overflow: auto;
}
</style>