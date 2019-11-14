<!--  -->
<template>
  <p class="centop">
    <router-link to="/">首页</router-link>
    > {{item.authName}} > {{v.authName}}
  </p>
</template>
<script>
import stor from "../model/storage.js";
import axios from "axios";
export default {
  data() {
    return {
      item: "",
      v: ""
    };
  },
  methods: {},
  components: {},
  computed: {},
  created() {
    let item = this.$route.query.item;
    let v = this.$route.query.v;
    this.item = item;
    this.v = v;
    stor.set("item", JSON.stringify(this.item));
    stor.set("v", JSON.stringify(this.v));
  }
};
</script>
<style  scoped>
.centop {
  padding: 20px;
}
</style>