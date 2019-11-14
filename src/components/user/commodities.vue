<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="shuju">
      <div class="default_primary">
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" @click="suo"></el-button>
        <el-button type="primary">
          <router-link
            :to="{path:'go',query:{item:this.$route.query.item,v:this.$route.query.v}}"
          >添加商品</router-link>
        </el-button>
      </div>
      <el-table :data="list" border="true" fit="true">
        <!-- 数量 -->
        <el-table-column type="index" width="50"></el-table-column>
        <!-- 姓名 -->
        <el-table-column label="商品名称" width="1200">
          <template slot-scope="scope">
            <p>{{ scope.row.goods_name }}</p>
          </template>
        </el-table-column>
        <!-- 邮箱 -->
        <el-table-column label="商品价格">
          <template slot-scope="scope">
            <p>{{ scope.row.goods_price }}</p>
          </template>
        </el-table-column>
        <!-- 电话 -->
        <el-table-column label="商品重量">
          <template slot-scope="scope">
            <p>{{ scope.row.goods_weight }}</p>
          </template>
        </el-table-column>
        <!-- 角色-->
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <p>{{ scope.row.role_name }}</p>
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
              @click="handleEdit1(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="num"
        ></el-pagination>
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
    //删除商品
    handleEdit1(i, v) {
      let list = JSON.parse(stor.get("token"));
      let obj = {
        goods_id: v.goods_id,
        token: list.token
      };
      // console.log(obj);
      _http.scsp(obj).then(d => {
        // console.log(d);
        if (d.data.meta.status == 200) {
          this.$message("删除成功");
          this.reload();
        }
      });
    },
    //切换条数
    handleSizeChange(val) {
      this.tiao = val;
      this.shuju(this.ye, val);
       console.log(val)
    },
    //切换页数
    handleCurrentChange(val) {
      this.ye = val;
      this.shuju(val, this.tiao);
       console.log(val)
      // console.log(`当前页: ${val}`);
    },
    //重新请求数据
    shuju(v, i) {
      let list = stor.get("token");
      list = JSON.parse(list);
      //用户列表
      axios({
        method: "get",
        url: `http://www.wyunfei.com:7001/api/private/v1/goods?pagenum=${v}&pagesize=${i}`,
        headers: {
          Authorization: list.token
        }
      }).then(d => {
        // console.log(d);
        this.list = d.data.data.goods;
        // console.log(this.list);
      });
    }
  },
  components: {
    Top
  },
  computed: {},
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    let obj = {
      pagenum: 1,
      pagesize: 10,
      token: list.token
    };
    axios({
      method: "get",
      url:
        "http://www.wyunfei.com:7001/api/private/v1/goods?pagenum=1&pagesize=10",
      headers: {
        Authorization: list.token
      }
    }).then(d => {
      // console.log(d);
      this.list = d.data.data.goods;
      this.num = d.data.data.total;
    });
  }
};
</script>
<style  scoped>
.default_primary{
  display: flex;
}
.default_primary>>>input{
  width: 300px !important;
}
.default_primary>>>.el-input{
  width: 300px !important;
}
</style>