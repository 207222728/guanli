<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
      <div class="bian1">注意：只允许为第三级分类设置相关参数！</div>
      <div class="bian2">
        选择商品分类：
        <el-cascader
          v-model="cat_name"
          :label="cat_name"
          :options="list"
          :props="defaultProps"
          ref="shang"
          @change="dee"
          clearable
        ></el-cascader>
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first">
            <div>
              <el-button type="primary" @click="dialogVisible = true">添加参数</el-button>
            </div>
            <!-- 动态参数 -->
            <el-table :data="list2" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label>
                      <el-tag
                        v-for="tag in Array(props.row.attr_vals)"
                        :key="tag.name"
                        closable
                        :type="success"
                      >{{tag}}</el-tag>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="参数名称" prop="attr_name"></el-table-column>
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
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second">
            <div>
              <el-button type="primary" @click="dialogVisible1 = true">添加属性</el-button>
            </div>
            <!-- 静态属性 -->
            <el-table :data="list1" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label>
                      <el-tag
                        v-for="tag in Array(props.row.attr_vals)"
                        :key="tag.name"
                        closable
                        :type="success"
                      >{{tag}}</el-tag>
                      <!-- <span>{{ props.row.attr_vals }}</span> -->
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="商品 ID" prop="attr_name"></el-table-column>
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
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 弹出框 -->
      <div>
        <!-- 动态参数添加 -->
        <el-dialog
          title="添加动态参数"
          :visible.sync="dialogVisible"
          width="35%"
          :before-close="handleClose"
        >
          <div>
            <span>*动态参数</span>
            <el-input placeholder="用户名" v-model="dtcs"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="qux1">取 消</el-button>
            <el-button type="primary" @click="add1()">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog
          title="添加动态参数"
          :visible.sync="dialogVisible1"
          width="35%"
          :before-close="handleClose"
        >
          <div>确定要删除么？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="qux1">取 消</el-button>
            <el-button type="primary" @click="add2()">确 定</el-button>
          </span>
        </el-dialog>
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
      defaultProps: {
        children: "children",
        label: "cat_name",
        value: "cat_id"
      },
      cat_name: [],
      activeName: "first",
      list1: [],
      list2: [],
      dialogVisible: false,
      dialogVisible1: false,
      dtcs: "",
      jtcs: "",
      v: ""
    };
  },
  methods: {
    //静态添加

    //确认删除
    add2() {
      this.dialogVisible1 = false;
      let v = this.v;
      let list = JSON.parse(stor.get("token"));
      let id = this.$refs.shang.getCheckedNodes()[0].value;
      let obj = {
        id: id,
        attr_id: v.attr_id,
        token: list.token
      };
      _http.sctd(obj).then(d => {
        if (d.data.meta.status == 200) {
          this.$message("删除成功");
          this.dee();
        }
      });
    },
    //取消弹出框
    qux1() {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      this.$message("已取消");
    },
    //点击删除
    handleEdit2(i, v) {
      this.dialogVisible1 = true;
      this.v = v;
    },
    //添加动态
    add1() {
      this.dialogVisible = false;
      let list = JSON.parse(stor.get("token"));
      let id = this.$refs.shang.getCheckedNodes()[0].value;
      let obj = {
        token: list.token,
        id: id,
        attr_name: this.dtcs,
        attr_sel: "many"
      };
      _http.dtcs(obj).then(d => {
        if (d.data.meta.status == 201) {
          this.$message("添加成功");
          this.dee();
        }
        // console.log(d);
      });
    },
    //商品静态属性\动态参数
    dee() {
      let id = this.$refs.shang.getCheckedNodes()[0].value;
      console.log(this.$refs.shang.getCheckedNodes());
      let list = JSON.parse(stor.get("token"));
      let obj = {
        id: id,
        token: list.token
      };
      // 静态属性
      _http.dee(obj).then(d => {
        this.list1 = d.data.data;
        // console.log(this.list1);
      });
      // 动态参数
      _http.dee1(obj).then(d => {
        console.log(d);
        this.list2 = d.data.data;
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
      url: "http://www.wyunfei.com:7001/api/private/v1/categories?type=8",
      headers: {
        Authorization: list.token
      }
    }).then(d => {
      // console.log(d);
      this.list = d.data.data;
    });
  }
};
</script>
<style  scoped>
.bian1 {
  width: 100%;
  margin: 20px auto;
  background: #f4f4f5;
  color: #909399;
  text-align: left;
  line-height: 100px;
  margin-bottom: 50px;
  border-radius: 20px;
  box-sizing: border-box;
  padding-left: 50px;
  color: #e6a23c;
  /* overflow: auto; */
}
.bian {
  height: 1100px;
  overflow: auto;
}
.bian >>> .el-tabs {
  overflow: auto;
}
.bian2 >>> .el-cascader {
  width: 400px;
  box-sizing: border-box;
  padding: 20px 50px;
}
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