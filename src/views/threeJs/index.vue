<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";

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
      this.scene = new THREE.Scene();
      /**
       * 创建网格模型
       */
      let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象

    
        // let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      let material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
      }); //材质对象Material 可以自定义颜色
      this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(this.mesh); //网格模型添加到场景中
      /**
       * 光源设置
       */
      //点光源
      let point = new THREE.PointLight(0xffffff);
      point.position.set(400, 200, 300); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      //环境光
      let ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);
      // console.log(scene)
      // console.log(scene.children)
      /**
       * 相机设置
       */
      let container = document.getElementById("container");
      let offsetWidth = container.offsetWidth; //父元素宽度
      let offsetHeight = container.offsetHeight; //父元素高度
      let offsetK = offsetWidth / offsetHeight; //父元素宽高比
 
      let width = window.innerWidth; //窗口宽度
      let height = window.innerHeight; //窗口高度
      let k = width / height; //窗口宽高比
      let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * offsetK, s * offsetK, s, -s, 1, 1000);
      this.camera.position.set(200, 300, 200); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(offsetWidth, offsetHeight); //设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      this.renderer.render(this.scene, this.camera);
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style>
#container {
  height: 100%;
  width: 100%;
}
</style>