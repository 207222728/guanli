<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
      <div class="shuju">
        <el-table :data="list" border="true" fit="true">
          <!-- 数量 -->
          <el-table-column type="index" width="50"></el-table-column>
          <!-- 姓名 -->
          <el-table-column label="订单编号" width="600">
            <template slot-scope="scope">
              <p>{{ scope.row.order_number }}</p>
            </template>
          </el-table-column>
          <!-- 邮箱 -->
          <el-table-column label="订单价格">
            <template slot-scope="scope">
              <p>{{ scope.row.order_price }}</p>
            </template>
          </el-table-column>
          <!-- 电话 -->
          <el-table-column label="是否付款">
            <template slot-scope="scope">
              <p>{{ scope.row.is_send }}</p>
            </template>
          </el-table-column>
          <!-- 角色-->
          <el-table-column label="是否发货">
            <template slot-scope="scope">
              <p>{{ scope.row.is_send }}</p>
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column label="下单时间">
            <template slot-scope="scope">
              <p>{{ scope.row.update_time }}</p>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" class="caozuo" width="500px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="num"
          ></el-pagination>
        </div>
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
  inject: ["reload"],
  data() {
    return {
      list: [],
      num: "",
      tiao: 10,
      ye: 1
    };
  },
  methods: {
    //切换条数
    handleSizeChange(val) {
      this.tiao = val;
      this.shuju(this.ye, val);
    },
    //切换页数
    handleCurrentChange(val) {
      this.ye = val;
      this.shuju(val, this.tiao);
      // console.log(`当前页: ${val}`);
    },
    //重新请求数据
    shuju(v, i) {
      let list = stor.get("token");
      list = JSON.parse(list);
      //用户列表
      axios({
        method: "get",
        url: `http://www.wyunfei.com:7001/api/private/v1/users?query=&pagenum=${v}&pagesize=${i}`,
        headers: {
          Authorization: list.token
        }
      }).then(d => {
        // console.log(d);
        
        this.list = d.data.data.users;
        // console.log(this.list);
      });
    }
  },
  components: {
    Top
  },
  computed: {
    // /api/private/v1/orders?=&pagenum=1&pagesize=10
  },
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    axios({
      method: "get",
      url:
        "http://www.wyunfei.com:7001/api/private/v1/orders?=&pagenum=1&pagesize=10",
      headers: {
        Authorization: list.token
      }
    }).then(d => {
      console.log(d);
      this.list = d.data.data.goods;
      this.num = d.data.data.total;
    });
  }
};
</script>
<style  scoped>
</style>