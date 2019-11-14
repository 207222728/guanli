<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
      <div class="bian1">添加商品信息</div>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
        <el-step title="步骤 5"></el-step>
        <el-step title="步骤 6"></el-step>
      </el-steps>

      <el-tabs :tab-position="tabPosition" style="height: 600px;">
        <el-tab-pane label="基本信息" @click="active=1">
          <div class="block">
            <p>*商品名称</p>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <span></span>
          </div>
          <div class="block">
            <p>*商品价格</p>
            <el-input-number
              v-model="num1"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
            <span></span>
          </div>
          <div class="block">
            <p>*商品重量</p>
            <el-input-number
              v-model="num2"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
            <span></span>
          </div>
          <div class="block">
            <p>*商品数量</p>
            <el-input-number
              v-model="num3"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
            <span></span>
          </div>

          <div class="block">
            <p>*商品分类</p>
            <!-- <span class="demonstration">默认 click 触发子菜单</span> -->
            <el-cascader
              v-model="cat_name"
              :label="cat_name"
              :options="options"
              :props="defaultProps"
              ref="shang"
              @change="dee"
              clearable
            ></el-cascader>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品参数"  @click="active=2">
          <el-checkbox-group v-for="(item,i) in list" v-model="item.attr_vals" :key="i">
            <!-- <nav>{{item.attr_name}}</nav> -->
            <div>
              <el-checkbox :label="item.attr_name"></el-checkbox>
            </div>
            <el-checkbox :label="item.attr_vals"></el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane label="商品属性"  @click="active=3"></el-tab-pane>
        <el-tab-pane label="商品图片"  @click="active =4">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容"  @click="active =5">
          <div id="wangeditor">
            <div ref="editorElem" style="text-align:left;"></div>
          </div>
          <el-button type="primary" @click="add3()">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import Top from "../usertop";
import HTTP from "../../services/product-service.js";
const _http = new HTTP();
import stor from "../../model/storage.js";
import axios from "axios";
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      editor: null,
      editorContent: "",
      active: 0,
      tabPosition: "left",
      num: 1,
      value: [],
      defaultProps: {
        children: "children",
        label: "cat_name",
        value: "cat_id"
      },
      cat_name: [],
      //数据
      options: [],
      input: "",
      num1: "",
      num2: "",
      num3: "",
      list: [],
      canid: [],
      can:[]
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },

  methods: {
    //添加商品
    add3() {
      let list = JSON.parse(stor.get("token"));
      this.list.forEach(d=>{
       let obj={
         attr_id:d.attr_id,
         attr_value:d.attr_vals
       }
       let add=[]
       add.push(obj)
       this.can=add
       console.log(this.can)
       add=[]
      })
      let obj = {
        goods_name:this.input,
        goods_price:this.num1,
        goods_weight:this.num2,
        goods_number:this.num3,
        goods_cat:this.canid,
        goods_introduce:"<p><strong>hello small</strong></p>",
        pics:[
          {
            pic:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ],
        attrs:this.can,
        token:list.token
      };
    console.log(obj)
      _http.sptc(obj).then(d=>{
        console.log(d)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //商品参数
    dee() {
      let id = this.$refs.shang.getCheckedNodes()[0].value;
      let id1 = this.$refs.shang.getCheckedNodes()[0].parent.value;
      let id2 = this.$refs.shang.getCheckedNodes()[0].parent.parent.value;
      this.canid = [id2, id1, id];
      this.canid = String(this.canid);
      let list = JSON.parse(stor.get("token"));
      let obj = {
        id: id,
        token: list.token
      };
      _http.dee1(obj).then(d => {
        console.log(d);
        this.list = d.data.data;
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
      url: `http://www.wyunfei.com:7001/api/private/v1/categories?type=${list.id}`,
      headers: {
        Authorization: list.token
      }
    }).then(d => {
      console.log(d);
      this.options = d.data.data;
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
  text-align: center;
  line-height: 100px;
  margin-bottom: 50px;
  border-radius: 20px;
}
.el-steps {
  width: 80%;
  margin: 0 auto;
}

.bian >>> .el-tabs {
  overflow: auto;
}
.bian >>> .el-tabs__item {
  height: 80px !important;
  line-height: 80px;
}
.bian >>> input {
  width: 100%;
  padding: 40px 30px;
  box-sizing: border-box;
}
.bian p {
  width: 100%;
  height: 100px;
  padding: 30px 30px;
  box-sizing: border-box;
}
.bian span {
  display: block;
  height: 50px;
  line-height: 100px;
  box-sizing: border-box;
}
</style>