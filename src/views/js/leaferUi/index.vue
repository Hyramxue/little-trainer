<template>
  <div id="leaferUi"></div>
</template>

<script>
import { Leafer, Rect, PointerEvent } from "leafer-ui";
export default {
  data() {
    return {
      camera: null, //相机对象
      scene: null, //场景对象
      renderer: null, //渲染器对象
      mesh: null, //网格模型对象Mesh
    };
  },
  methods: {
    init() {
      const leafer = new Leafer({ view: "leaferUi" });
      const rect = new Rect({
        width: 200,
        height: 200,
        fill: "#32cd79", // 背景色
        stroke: "black", // 边框
        strokeWidth: 2, // 边框粗细
        draggable: true,//鼠标移动
        hittable:true,
      });
      leafer.add(rect);
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
};
</script>

<style>
#leaferUi {
  background: #fff;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>