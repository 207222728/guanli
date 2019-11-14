<!--  -->
<template>
  <div class="user">
    <div class="user_top">
      <img src="../../../static/1.png" alt />
      <h2>电商后台管理系统</h2>
      <el-button type="info" round @click="tui">退出</el-button>
    </div>
    <div class="cen">
      <div class="el-menu-vertical-demo">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          v-for="(item,index) in list"
          :key="index"
          text-color="#fff"
          background-color="#333744"
        >
          <el-submenu index="index">
            <template slot="title">
              <i
                :class="index==0?'el-icon-location':index==1?'el-icon-menu':index==2?'el-icon-document':index==3?'el-icon-setting':'el-icon-data-line'"
              ></i>
              <span slot="title">{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <p slot="title" v-for="(v,i) in item.children" :key="i">
                <router-link tag="div" :to="{path:v.path,query:{item:item,v:v}}">
                  <i class="el-icon-menu"></i>
                  {{v.authName}}
                </router-link>
              </p>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <router-view v-if="isRoute" />
    </div>
  </div>
</template>

<script>
import Img from "../../../static/1.png";
import HTTP from "../../services/product-service.js";
const _http = new HTTP();
import stor from "../../model/storage.js";
import axios from "axios";
export default {
  inject: ["reloa"],
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isCollapse: false,
      list: [],
      isRoute: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    tui() {
      stor.set("done", JSON.stringify(this.$store.state.done));
      stor.remove("token");
      stor.remove("item");
      stor.remove("v");
      this.$store.state.done = true;
      localStorage.clear()
    },
    reload() {
      this.isRoute = false;
      this.$nextTick(function() {
        this.isRoute = true;
      });
    }
  },
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    // console.log(list)
    //菜单列表
    axios({
      method: "get",
      url: "http://www.wyunfei.com:7001/api/private/v1/menus",
      headers: {
        Authorization: list.token
      }
    }).then(d => {
      // console.log(d)
      if ((this.$store.state.done == false)) {
        this.$router.push({path:''})
        this.list = d.data.data;
      }
    });
    // 判断登录状态
    if (JSON.parse(stor.get("done"))) {
      this.$store.state.done = JSON.parse(stor.get("done"));
    } else {
      this.$store.state.done = false;
    }
  }
};
</script>
<style  scoped>
@import url("../../assets/css/user/user.css");
.user_left >>> .title {
  background: #333744 !important;
  box-sizing: border-box;
  padding: 20px 10px;
  padding-left: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 30px;
}
.user_left >>> i {
  box-sizing: border-box;
  padding: 0 10px;
}
.user_left >>> div {
  color: #fff;
  background: #333744 !important;
  border: none;
  font-size: 30px;
}
.cen {
  display: flex;
  height: 92%;
}

/*  */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 50px;
  background: #333744;
}
.el-menu-item-group {
  box-sizing: border-box;
  padding-left: 50px !important;
  background: #333744;
}
.el-menu-item-group >>> div {
  box-sizing: border-box;
  padding: 10px !important;
}
</style>