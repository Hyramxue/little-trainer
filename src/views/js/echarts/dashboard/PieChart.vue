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
    tooltip: {
      type: Boolean,
      default: false,
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
      let option = {
        color,
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },

        legend: {
          left: "center",
          icon: "circle", //  这个字段控制形状  类型包括 circle 圆形，triangle 三角形，diamond 四边形，arrow 变异三角形，none 无
          bottom: "10",
          data: ["社招", "内推"],
        },
        series: [
          {
            type: "pie",
            radius: [50, 85],
            center: ["50%", "38%"],
            //线边长

            data: [
              { value: 30, name: "社招" },
              { value: 70, name: "内推" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      };

      if (this.tooltip) {
        option.series[0].label = {
          show: false,
          position: "center",
          formatter: "{time|{c}}%\n{name|{b}}",
          fontSize: 20,
          rich: {
            time: {
              fontSize: 20,
              fontFamily: "DIN Alternate",
            },
            name: {
              fontSize: 14,
              color: "#999",
            },
          },
        };
        option.series[0].labelLine = {
          show: false,
        };
        option.series[0].emphasis = {
          label: {
            show: true,
            // fontSize: 40,
            // fontWeight: "bold",
          },
        };
      } else {
        option.label = {
          alignTo: "edge",
          formatter: "{name|{b}}人数占比\n\n{time|{c}}%",
          minMargin: 5,
          edgeDistance: 10,
          position: "center",
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 22,
              fontFamily: "DIN Alternate",
              color: "#999",
            },
          },
        };
        option.labelLine = {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80,
        };
        option.series[0].labelLayout = function (params) {
          //   console.log(params);
          const isLeft = params.labelRect.x < offsetWidth / 2;
          const points = params.labelLinePoints;
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
          };
        };
      }
      this.chart.setOption(option);
    },
  },
};
</script>
