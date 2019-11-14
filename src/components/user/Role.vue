<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
      <div class="default_primary">
        <el-row>
          <el-button type="primary" @click="dialogVisible =true">添加角色</el-button>
        </el-row>
      </div>
      <!-- 添加 -->
      <el-dialog
        title="添加新角色"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose"
      >
        <div class="jslb">
          <span>*角色名称</span>
          <el-input placeholder="用户名" v-model="jiao"></el-input>
        </div>
        <div class="jslb">
          <span>*角色描述</span>
          <el-input placeholder="用户名" v-model="jiao1"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qux">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 数据 -->
      <div class="shuju">
        <el-table :data="list" v-for="(v,i) in list" :key="i" style="width: 100%">
          <el-table-column type="expand">
            <template>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="(item,index) in v.children" :key="index">
                  <div >
                    <div class="xqf" v-for="(v1,i1) in item.children" :key="i1">
                      <div class="yi">
                        <el-tag closable>{{item.authName}}</el-tag>
                      </div>
                      <div class="re">
                        <el-tag type="success" closable>{{v1.authName}}</el-tag>
                      </div>
                      <div class="san">
                        <el-tag
                          type="warning"
                          closable
                          v-for="(item1,index1) in v1.children"
                          :key="index1"
                        >{{item1.authName}}</el-tag>
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="商品 ID" prop="roleName"></el-table-column>
          <el-table-column label="商品名称" prop="roleDesc"></el-table-column>
          <el-table-column label="描述" prop="roleDesc"></el-table-column>
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
              <el-button
                type="warning"
                icon=" el-icon-s-tools"
                @click="handleEdit3(scope.$index, scope.row)"
              >分配权限</el-button>
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
            <div class="jslb">
              <span>*角色名称</span>
              <el-input placeholder="用户名" v-model="dialog1.roleName"></el-input>
            </div>
            <div class="jslb"> 
              <span>*角色描述</span>
              <el-input placeholder="用户名" v-model="dialog1.roleDesc"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="qux1">取 消</el-button>
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
              <el-button @click="qux2">取 消</el-button>
              <el-button type="primary" @click="qued">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 权限分配 -->

          <el-dialog
            class="fpqx"
            title="提示"
            :visible.sync="dialogVisible3"
            width="30%"
            :before-close="handleClose"
          >
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
              @check-change="handleCheckChange1"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="qux3">取 消</el-button>
              <el-button type="primary" @click="qued1">确 定</el-button>
            </span>
          </el-dialog>
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
      // 角色列表
      list: [],
      dialogVisible: false,
      //添加数据
      jiao: "",
      jiao1: "",
      // 编辑
      dialogVisible1: false,
      dialog1: "",
      // 删除
      dialogVisible2: false,
      dialog2: "",
      //权限分配
      dialogVisible3: false,
      dialog3: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  methods: {
    //点击分配的商品
    handleCheckChange1(node, data) {
      if (data == true) {
        node.id;
      } else {
      }
      console.log(node.id, data);
      // console.log(this.$refs.tree.setCheckedNodes([]));
    },
    //确认分配
    qued1() {
      // console.log(this.dialog3)
      console.log(this.data);
    },
    //确认删除
    qued() {
      let list = JSON.parse(stor.get("token"));
      let obj = {
        id: this.dialog2.id,
        token: list.token
      };
      console.log(obj);
      _http.addroles2(obj).then(d => {
        if (d.data.meta.status == 200) {
          this.dialogVisible = false;
          this.reload();
          this.$message("删除成功");
        }
      });
    },
    //确认编辑
    add1() {
      let list = JSON.parse(stor.get("token"));
      console.log(this.dialog1);
      let obj = {
        id: this.dialog1.id,
        roleName: this.dialog1.roleName,
        roleDesc: this.dialog1.roleDesc,
        token: list.token
      };
      _http.addroles1(obj).then(d => {
        if (d.data.meta.status == 200) {
          this.dialogVisible = false;
          this.reload();
          this.$message("编辑成功");
        }
      });
    },
    //点击权限分配
    handleEdit3(i, v) {
      this.dialogVisible3 = true;
      this.dialog3 = v;
      let list = JSON.parse(stor.get("token"));
      _http.tree(list).then(d => {
        console.log(d);
        this.data = d.data.data;
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
    //确认添加
    add() {
      let list = JSON.parse(stor.get("token"));
      let obj = {
        roleName: this.jiao,
        roleDesc: this.jiao1,
        token: list.token
      };
      _http.addroles(obj).then(d => {
        if (d.data.meta.status == 201) {
          this.dialogVisible = false;
          this.reload();
          this.$message("添加成功");
        }
        console.log(d);
      });
    },
    //取消添加
    qux() {
      this.dialogVisible = false;
      this.reload();
      this.$message("取消添加");
    },
    //取消编辑
    qux1() {
      this.dialogVisible1 = false;
      this.reload();
      this.$message("取消编辑");
    },
    //取消删除
    qux2() {
      this.dialogVisible2 = false;
      this.reload();
      this.$message("取消删除");
    },
    //取消分配
    qux3() {
      this.dialogVisible1 = false;
      this.reload();
      this.$message("取消分配");
    },
    //关闭弹出框
    handleClose(done) {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      this.dialogVisible2 = false;
      this.dialogVisible3 = false;
    }
  },
  components: {
    Top
  },
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    let obj = {
      token: list.token
    };
    _http.list(obj).then(d => {
      console.log(d);
      this.list = d.data.data;
    });
  }
};
</script>
<style  scoped>
.default {
  overflow: auto;
}
.default >>> .el-dialog__body {
  overflow: auto;
}
/* el-dialog__body */
.el-table {
  border-radius: 10px;
  border: 1px solid #eaedf1;
}
.default_primary {
  box-sizing: border-box;
  padding: 20px 0;
}
.el-dialog__body div {
  height: 100px;
  display: flex !important;
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
/* .el-dialog__body div >>> .el-input__inner {
  width: 80%;
  height: 100%;
  padding-right: 10px;
} */
.el-dialog {
  height: 800px !important;
}
.el-dialog__body div {
  height: 200px;
  display: flex !important;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
}
.el-dialog__body >>> div {
  height: 50px;
  box-sizing: border-box;
  padding: 10px !important;
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
.el-dialog__body >>> .el-tree {
  overflow: auto;
}
.el-table >>> td {
  width: 100px;
  height: 100px !important;
  line-height: 100px;
  padding: 10px 0px !important;
  font-size: 20px;
}
.xqf{
  width: 100%;
  display: flex;
   box-sizing: border-box;
  padding: 20px;
}
.yi{
  width: 300px;
  
}
.re{
  width: 300px;
 
}
.san{
  width: 50%;
}
.el-form-item{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.jslb{
  display: flex !important;
}

</style>