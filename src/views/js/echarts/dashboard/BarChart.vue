<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      //   let echart = echarts.init(document.querySelector("#suggetsBarCharts"));
      //   let monthList = data.map(ele => ele.month);
      // let dclList = data.map(ele => ele.dclCount);
      // let numList = data.map(ele => ele.nums);
      let Xlist = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      let szList = [1, 2, 3, 4];
      let ntList = [11, 1, 2, 4];
      if (Xlist.length > 5) {
        // console.log(parseInt( this.xAxis.length/5));
        var dataZoom = [
          {
            type: "slider",
            show: true,
            zoomLock: true,
            xAxisIndex: [0],
            start: 0,
            end: 50 / parseInt(Xlist.length / 5),
            textStyle: {
              //   color: "#ccd7d7",
            },
          },
        ];
      } else {
        var dataZoom = [];
      }
      this.chart.setOption({
        color: ["#3675FF", "#F4AC3F", "#C355DF"],
        dataZoom,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          icon: "circle",
          left: "80px",
          top: "0",
          itemWidth: 10,
          data: ["社招", "内推"],
        },
        grid: {
          top: "10%",
          left: "2%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            name: "岗位",
            type: "category",
            data: Xlist,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#92A1BC",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "应聘人员数",
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#92A1BC",
              },
            },
          },
        ],
        barWidth: 10,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
        },
        series: [
          {
            name: "社招",
            data: szList,
            type: "bar",
          },
          {
            name: "内推",
            data: ntList,
            type: "bar",
          },
        ],
      });
    },
  },
};
</script>
