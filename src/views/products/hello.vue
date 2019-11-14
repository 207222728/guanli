<!--  -->
<template>
  <div class="hello">
    <div v-show="this.$store.state.done">
      <!-- 背景视频 -->
      <div class="div">
        <video-player
          autoplay="true"
          class="vjs-custom-skin"
          src="../../../static/Ipad.mp4"
          :options="playerOptions"
        ></video-player>
      </div>
      <div class="div1">
        <!-- 头像 -->
        <div class="Sign">
          <div>
            <img src="../../../static/1.jpg" width="400px" />
          </div>
        </div>
        <!-- 账号 -->
        <div class="Accountnumber" ref="Accountnumberv">
          <i class="el-icon-s-custom"></i>
          <input type="text" v-model="Accountnumberv" @blur="AcLose" placeholder="账户" />
        </div>
        <!-- 提示语 -->
        <div class="tishi">
          <p>
            <span v-show="Accountnumber">请输入登录名称</span>
          </p>
        </div>
        <!-- 密码 -->
        <div class="Password" ref="Passwordv">
          <i class="el-icon-unlock"></i>
          <input type="text" v-model="Passwordv" @blur="PaLose" placeholder="密码" />
        </div>
        <!-- 提示语 -->
        <div class="tishi">
          <p>
            <span v-show="Password">请输入登录密码</span>
          </p>
        </div>
        <!-- 登录按钮 -->
        <div class="Signin">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="Reset">重置</el-button>
        </div>
      </div>
    </div>
    <User v-show="this.$store.state.done==false"></User>
  </div>
</template>

<script>
import User from "./user";
import HTTP from "../../services/product-service.js";
const _http = new HTTP();
import Img from "../../../static/Ipad.mp4";
import stor from "../../model/storage.js";
import axios from "axios";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
export default {
  data() {
    return {
      // 视频设置
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        controls: false, //控制条
        preload: "auto", //视频预加载
        muted: true, //默认情况下将会消除任何音频。
        loop: true, //导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "../../../static/Ipad.mp4" //你所放置的视频的地址，最好是放在服务器上
          }
        ],
        width: document.documentElement.clientWidth
      },
      //账号密码提示框
      Accountnumber: false,
      Password: false,
      //input值
      Accountnumberv: "",
      Passwordv: ""
    };
  },
  methods: {
    //点击重置
    Reset() {
      this.Accountnumberv = "";
      this.Passwordv = "";
    },
    // 点击登录
    login() {
      axios
        .post(
          `http://www.wyunfei.com:7001/api/private/v1/login?username=${this.Accountnumberv}&password=${this.Passwordv}`
        )
        .then(d => {
          console.log(d.data.meta.status)
          if (d.data.meta.status == 200) {
            this.$store.state.token=d.data.data
            stor.set("token", JSON.stringify(d.data.data));
            this.$store.state.done = false;
            stor.set("done", JSON.stringify(this.$store.state.done));
            this.Accountnumberv = "";
            this.Passwordv = "";
            location.href='/'
            
          } else {
            return
          }
        });
    },
    //账号失去焦点
    AcLose() {
      if (this.Accountnumberv === "") {
        this.Accountnumber = true;
        this.$refs.Accountnumberv.style.border = "1px solid red";
      } else {
        this.Accountnumber = false;
        this.$refs.Accountnumberv.style.border = "";
      }
    },
    //密码失去焦点
    PaLose() {
      if (this.Passwordv === "") {
        this.Password = true;
        this.$refs.Passwordv.style.border = "1px solid red";
      } else {
        this.Password = false;
        this.$refs.Passwordv.style.border = "";
      }
    }
  },
  components: {
    Img,
    User
  },
  created() {
   
  }
};
</script>
<style  scoped>
@import url("../../assets/css/hello/hello.css");
.div >>> div {
  height: 100%;
}
#vjs_video_3 {
  height: 100%;
}
input {
  width: 90%;
  border: none;
  outline: medium;
}
.div {
  width: 100%;
  height: 100%;
  position: absolute;
  /* //   overflow: hidden; */
  z-index: -1;
}
.tishi {
  width: 600px;
  height: 50px;
  box-sizing: border-box;
  padding: 10px;
  margin: 2px auto;
  color: red;
}
.Password {
  width: 600px;
  box-sizing: border-box;
  padding: 20px 10px;
  background: #fff;
  margin: 0 auto;
  border-radius: 10px;
}
</style>