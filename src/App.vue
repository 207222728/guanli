<template>
  <div id="app">
    <router-view v-if="isRoute" />
  </div>
</template>

<script>
import Hello from "./views/products/hello";
import "./assets/js/index";
export default {
  name: "App",
  provide() {
    return {
      reloa: this.reload
    };
  },
  data() {
    return {
      isRoute: true
    };
  },
  components: {
    Hello
  },
  methods: {
    reload() {
      this.isRoute = false;
      this.$nextTick(function() {
        this.isRoute = true;
      });
    }
  },
  created() {
    // localStorage.clear()
    // localStorage.removeItem('done')
    //  localStorage.removeItem('loglevel:webpack-dev-server')
   
  }
};
</script>
<style>
@import url("./assets/css/App/index.css");
.default {
  flex: 1;
  box-sizing: border-box;
  padding: 20px 50px;
  min-width: 50%;
  background: #eaedf1;
}
.el-menu {
  box-sizing: border-box;
  padding: 10px;
}
.el-menu p {
  box-sizing: border-box;
  padding: 20px 0;
}
.bian {
  box-sizing: border-box;
  padding: 50px;
  background: #fff;
  border-radius: 20px;
}
/* 弹出框样式 */
/* .el-dialog__body div {
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
} */
</style>
