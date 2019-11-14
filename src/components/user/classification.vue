<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
      <div class="default_primary">
        <el-row>
          <el-button type="primary" @click="dialogVisible =true">添加分类</el-button>
        </el-row>
      </div>
      <!-- 添加 -->
      <el-dialog
        title="添加新角色"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose"
      >
        <div>
          <span>*分类名称</span>
          <el-input placeholder="用户名" v-model="jiao"></el-input>
        </div>
        <div>
          <span>父级分类</span>
          <el-input placeholder="用户名" v-model="jiao1"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qux">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 数据 -->
      <div class="shuju">
        <el-table
          :data="list"
          style="width: 100%;margin-bottom: 20px;"
          :row-key="cat_id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="分类名称" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.cat_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="是否有效">
            <template slot-scope="scope">
              <p>{{ scope.row.cat_deleted }}</p>
            </template>
          </el-table-column>
          <el-table-column label="排序">
            <template slot-scope="scope">
              <p>{{ scope.row.cat_level }}</p>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit1(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleEdit2(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <div>
          <!-- 编辑 -->
          <el-dialog
            title="编辑角色"
            :visible.sync="dialogVisible1"
            width="35%"
            :before-close="handleClose"
          >
            <div>
              <span>*分类名称</span>
              <el-input placeholder="用户名" v-model="dialog1.cat_name"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="qux">取 消</el-button>
              <el-button type="primary" @click="add1">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 删除 -->
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible2"
            width="30%"
            :before-close="handleClose"
          >
            <span>此操作将永久删除该用户, 是否继续?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="qux">取 消</el-button>
              <el-button type="primary" @click="qued1">确 定</el-button>
            </span>
          </el-dialog>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[2, 5, 10, 20]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="zong"
            ></el-pagination>
          </div>
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
      dialogVisible: false,
      tiao: 5,
      ye: 1,
      zong: 0,
      //   添加
      jiao: "",
      jiao1: "",
      //编辑
      dialogVisible1: false,
      dialog1: "",
      //删除
      dialogVisible2: false,
      dialog2: ""
    };
  },
  methods: {
    //确认删除
    qued1() {
      let list = JSON.parse(stor.get("token"));
      console.log(this.dialog2);
      let obj = {
        cat_id: this.dialog2.cat_id,
        token: list.token
      };
      _http.del1(obj).then(d => {
        if (d.data.meta.status == 200) {
          this.dialogVisible2 = false;
          this.reload();
          this.$message("删除成功");
        }
      });
      // /api/private/v1/categories/6
    },
    //点击编辑完成
    add1() {
      let list = JSON.parse(stor.get("token"));
      let obj = {
        token: list.token,
        cat_name: this.dialog1.cat_name
      };
      _http.classifi1(obj).then(d => {
        // console.log(d);
        if (d.data.meta.status == 200) {
          this.dialogVisible1 = false;
          this.reload();
          this.$message("添加成功");
        }
      });
    },
    //点击删除
    handleEdit2(i, v) {
      this.dialogVisible2 = true;
      this.dialog2 = v;
    },
    //点击编辑
    handleEdit1(i, v) {
      this.dialogVisible1 = true;
      this.dialog1 = v;
    },
    //确认添加商品
    add() {
      let list = JSON.parse(stor.get("token"));
      let obj = {
        token: list.token,
        cat_pid: 0,
        cat_name: this.jiao,
        cat_level: 0
      };
      _http.classifi(obj).then(d => {
        console.log(d);
        if (d.data.meta.status == 201) {
          this.dialogVisible = false;
          this.reload();
          this.$message("添加成功");
        }
      });
    },
    //   切换条数
    handleSizeChange(val) {
      //   console.log(val);
      this.tiao = val;
      this.shuju();
    },
    //切换页数
    handleCurrentChange(val) {
      this.ye = val;
      this.shuju();
    },
    // 取消添加
    qux() {
      this.dialogVisible = false;
      this.reload();
      this.$message("已取消");
    },
    shuju() {
      let list = JSON.parse(stor.get("token"));
      axios({
        method: "get",
        url: `http://www.wyunfei.com:7001/api/private/v1/categories?type=${list.id}&pagenum=${this.ye}&pagesize=${this.tiao}`,
        headers: {
          Authorization: list.token
        }
      }).then(d => {
        // console.log(d);
        this.list = d.data.data.result;
        this.zong = d.data.data.total;
      });
    }
  },
  components: {
    Top
  },
  created() {
    let list = JSON.parse(stor.get("token"));
    axios({
      method: "get",
      url: `http://www.wyunfei.com:7001/api/private/v1/categories?type=${list.id}&pagenum=${this.ye}&pagesize=${this.tiao}`,
      headers: {
        Authorization: list.token
      }
    }).then(d => {
        console.log(d);
      this.list = d.data.data.result;
      this.zong = d.data.data.total;
    });
  }
};
</script>
<style  scoped>
.el-dialog {
  height: 800px !important;
}
.el-dialog__body div {
  height: 100px;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
}
.el-dialog__body span {
  width: 30%;
  box-sizing: border-box;
  text-align: right;
  padding-right: 50px;
  line-height: 80px;
  margin: 10px 0px;
}
.el-dialog__body div >>> .el-input__inner {
  width: 80%;
  height: 100%;
  padding-right: 10px;
}
</style>