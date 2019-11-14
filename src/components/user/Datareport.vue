<!--  -->
<template>
  <div class="default">
    <Top></Top>
    <div class="bian">
      <div id="myChart" :style="{width: '1500px', height: '800px'}"></div>
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
  data() {
    return {};
  },
  components: {
    Top
  },
  mounted() {
    this.drawLine();
  },
  updated() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let list = stor.get("token");
      list = JSON.parse(list);
      axios({
        method: "get",
        url: "http://www.wyunfei.com:7001/api/private/v1/reports/type/1",
        headers: {
          Authorization: list.token
        }
      }).then(d => {
        // console.log(d.data.data);
        this.list = d.data.data;
        this.num = d.data.data.total;

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: "用户来源",
            textStyle: {
              fontSize: 26 //字体大小
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: this.list.legend,
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: this.list.xAxis[0].data,
              axisLabel: {
                textStyle: {
                  fontSize: 26 //字体大小
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                textStyle: {
                  fontSize: 26 //字体大小
                }
              }
            }
          ],
          series: this.list.series,
          textStyle: {
            fontSize: 26 //字体大小
          }
        });
      });
    }
  },
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    axios({
      method: "get",
      url: "http://www.wyunfei.com:7001/api/private/v1/reports/type/1",
      headers: {
        Authorization: list.token
      }
    }).then(d => {
      // console.log(d.data.data);
      this.list = d.data.data;
      this.num = d.data.data.total;
    });
  }
};
</script>
<style  scoped>
.bian {
  box-sizing: border-box;
  padding: 50px;
  background: #fff;
  border-radius: 20px;
}
#myChart {
  font-size: 50px;
}
canvas {
  font-size: 50px;
}
</style>