<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
// require('echarts/theme/macarons') // echarts theme
import resize from "./mixins/resize";

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
      this.chart = echarts.init(this.$el, "macarons");
      var offsetWidth = this.$el.offsetWidth;
      let color = ["#F4AC3F", "#205ACF", "#C355DF"];
      this.chart.setOption({
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        color,
        legend: {
          left: "center",
          bottom: "10",
          icon: "circle", //  这个字段控制形状  类型包括 circle 圆形，triangle 三角形，diamond 四边形，arrow 变异三角形，none 无
          data: ["社招", "内推"],
        },
        label: {
          alignTo: "edge",
          formatter: "{name|{b}} {time|{c}}%",
          minMargin: 5,
          fontSize: 14,
          edgeDistance:5,

          lineHeight: 15,
          rich: {
            time: {
              fontSize: 14,
        
            },
          },
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80,
        },

        series: [
          {
            type: "pie",
            roseType: "radius",
            radius: [20, 95],
            center: ["50%", "38%"],
            data: [
              { value: 30, name: "社招" },
              { value: 70, name: "内推" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>
