<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
      <div class="bian1">
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search"  @click="suo"></el-button>
        <el-button type="primary" @click="dialogVisible =true">添加角色</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
          <div>
            <span>*用户名</span>
            <el-input placeholder="用户名" @blur="username" v-model="frem.username"></el-input>
          </div>
          <div>
            <span>密码</span>
            <el-input placeholder="密码" @blur="password" v-model="frem.password"></el-input>
          </div>
          <div>
            <span>邮箱</span>
            <el-input placeholder="邮箱" @blur="email" v-model="frem.email"></el-input>
          </div>
          <div>
            <span>手机号</span>
            <el-input placeholder="手机号" @blur="mobile" v-model="frem.mobile"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="qux">取 消</el-button>
            <el-button type="primary" @click="add()">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <!-- 数据 -->
      <div class="shuju">
        <el-table :data="list">
          <!-- 数量 -->
          <el-table-column type="index" width="50"></el-table-column>
          <!-- 姓名 -->
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.username }}</p>
            </template>
          </el-table-column>
          <!-- 邮箱 -->
          <el-table-column label="邮箱">
            <template slot-scope="scope">
              <p>{{ scope.row.email }}</p>
            </template>
          </el-table-column>
          <!-- 电话 -->
          <el-table-column label="电话">
            <template slot-scope="scope">
              <p>{{ scope.row.mobile }}</p>
            </template>
          </el-table-column>
          <!-- 角色-->
          <el-table-column label="角色">
            <template slot-scope="scope">
              <p>{{ scope.row.role_name }}</p>
            </template>
          </el-table-column>
          <!-- 状态-->
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
                @change="zhuangtai(scope.row)"
                @click="scope.row.mg_state=!scope.row.mg_state"
              ></el-switch>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" class="caozuo" width="500px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleEdit1(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type="warning"
                icon=" el-icon-s-tools"
                @click="handleEdit2(scope.$index, scope.row)"
              >分配权限</el-button>
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
            :total="zong"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div>
      <!-- 编辑 -->
      <el-dialog title="提示" :visible.sync="dialogVisible1" width="35%" :before-close="handleClose">
        <div>
          <span>*用户名</span>
          <el-input placeholder="用户名" :disabled="true" v-model="dialog1.username"></el-input>
        </div>
        <div>
          <span>*邮箱</span>
          <el-input placeholder="邮箱" v-model="dialog1.email"></el-input>
        </div>
        <div>
          <span>*手机号</span>
          <el-input placeholder="手机号" v-model="dialog1.mobile"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qux1">取 消</el-button>
          <el-button type="primary" @click="add1()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除 -->
      <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
        <span>此操作将永久删除该用户, 是否继续?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qx">取 消</el-button>
          <el-button type="primary" @click="qued">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 权限分配 -->
      <el-dialog title="提示" :visible.sync="dialogVisible3" width="35%" :before-close="handleClose">
        <div>
          <span>当前的用户</span>
          <span>{{dialog3.username}}</span>
        </div>
        <div>
          <span>当前的角色</span>
          <span>{{dialog3.role_name}}</span>
        </div>
        <div>
          <span>分配新角色</span>
          <el-select v-model="quanxian" placeholder="请选择">
            <el-option
              v-for="item in list1"
              :key="item.value"
              :label="item.label"
              :value="item.roleName"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qux2">取 消</el-button>
          <el-button type="primary" @click="add2()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Button, Table, Input } from "element-ui";
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
      tiao: 10,
      ye: 1,
      zong: 0,
      index: "",
      input: "",
      input1: "",
      quanxian: "",
      dialogVisible: false,
      frem: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      dialogVisible1: false,
      dialog1: "",
      dialogVisible2: false,
      dialog2: "",
      dialogVisible3: false,
      dialog3: "",
      list1: []
    };
  },
  methods: {
    //搜索
    suo() {
        let list1 = stor.get("token");
      list1 = JSON.parse(list1);
      let obj = {
        query: this.input1,
        pagenum:this.ye,
        pagesize:this.tiao,
        token:list1.token
      };
      _http.suo(obj).then(d => {
        this.list=d.data.data.users
        console.log(d);
        this.zong=d.data.data.total
      });
    },
    //权限分配
    add2() {
      this.dialogVisible3 = false;
      let list1 = stor.get("token");
      list1 = JSON.parse(list1);
      axios({
        method: "PUT",
        url: `http://www.wyunfei.com:7001/api/private/v1/users/${this.dialog3.id}/role`,
        data: {
          rid: list1.rid
        },
        headers: {
          Authorization: list1.token
        }
      }).then(d => {
        console.log(d);
        if (d.data.meta.status == 200) {
          this.reload();
          this.$message("修改成功");
          // this.$router.go(0)
        }
      });
    },
    //取消分配
    qux2() {
      this.dialogVisible3 = false;
      this.$message("取消分配");
    },
    //分配权限
    handleEdit2(i, v) {
      this.dialogVisible3 = true;
      this.dialog3 = v;
      console.log(this.dialog3);
      let list1 = stor.get("token");
      list1 = JSON.parse(list1);
      let obj = {
        token: list1.token
      };
      _http.list(obj).then(d => {
        this.list1 = d.data.data;
        // console.log(this.list1);
      });
    },
    //点击确认删除
    qued() {
      this.dialogVisible2 = false;
      let list = JSON.parse(stor.get("token"));
      console.log(list.token, this.dialog2.id);
      axios({
        method: "DELETE",
        url: `http://www.wyunfei.com:7001/api/private/v1/users/${this.dialog2.id}`,
        headers: {
          Authorization: list.token
        }
      }).then(d => {
        if (d.data.meta.status == 200) {
          this.reload();
          this.$message("删除成功");
          // this.$router.go(0)
        }
      });
    },
    //删除取消
    qx() {
      this.dialogVisible2 = false;
      this.$message("取消删除");
    },
    //点击删除
    handleEdit1(i, v) {
      this.dialogVisible2 = true;
      this.dialog2 = v;
    },
    //点击改变状态
    zhuangtai(v) {
      let list = JSON.parse(stor.get("token"));
      let obj = {
        token: list.token,
        name: v
      };
      _http.state(obj).then(d => {
        if (d.data.meta.status == 200) {
          this.$message("状态更新完成");
        }
      });
    },
    //确认编辑
    add1() {
      // users/557
      this.dialogVisible1 = false;
      let list = JSON.parse(stor.get("token"));
      let obj = {
        token: list.token,
        name: this.dialog1
      };
      console.log(obj);
      _http.Confirm(obj).then(d => {
        console.log(d);
      });
    },
    //点击取消编辑
    qux1() {
      this.dialogVisible1 = false;
      this.$message("取消编辑");
    },
    //点击编辑
    handleEdit(i, v) {
      this.dialogVisible1 = true;
      this.dialog1 = v;
    },
    // 用户名
    username() {
      if (this.frem.username == "") {
        this.$message("请输入用户名");
      }
    },
    // 密码
    password() {
      if (this.frem.password == "") {
        this.$message("请输入密码");
      }
    },
    //邮箱
    email() {
      let list = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if (this.frem.email == "") {
        this.$message("请输入邮箱");
      }
    },
    //手机号
    mobile() {
      let list = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (this.frem.mobile == "") {
        this.$message("请输入手机号");
      }
    },
    //取消弹出框
    qux() {
      this.dialogVisible = false;
      this.$message("已取消");
    },
    //确认添加用户
    add() {
      this.dialogVisible = false;
      let list = JSON.parse(stor.get("token"));
      let obj = {
        token: list.token,
        name: this.frem
      };
      _http.users(obj).then(d => {
        if (d.data.meta.msg == "创建成功") {
          this.$message("添加成功");
        }
        // console.log(d)
      });
    },
    //关闭弹出框
    handleClose(done) {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      this.dialogVisible2 = false;
      this.dialogVisible3 = false;
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
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
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    //用户列表
    axios({
      method: "get",
      url: `http://www.wyunfei.com:7001/api/private/v1/users?query=&pagenum=${this.ye}&pagesize=${this.tiao}`,
      headers: {
        Authorization: list.token
      }
    }).then(d => {
      // console.log(d);
      this.list = d.data.data.users;
      this.zong = d.data.data.total;
    });
    //权限分配
  },
  watch: {
    $route() {
      this.list;
    }
  }
};
</script>
<style  scoped>
.block {
  background: #eaedf1;
}
.caozuo {
  display: flex;
}
.el-table {
  border-radius: 10px;
  border: 1px solid #eaedf1;
}
.bian {
  box-sizing: border-box;
  padding: 50px;
  background: #fff;
  border-radius: 20px;
}
.bian1 {
  display: flex;
  width: 500px;
  box-sizing: border-box;
  padding: 20px 0;
}
.bian1 input {
  display: flex;
  width: 200px;
  box-sizing: border-box;
  padding: 20px 0;
}
/* 弹出框样式 */
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