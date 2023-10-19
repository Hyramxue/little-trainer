<template>
  <div class="tianditu">
    <div class="map-button">
      <el-button type="primary" @click="ableDrag">{{
        isDrag ? "禁止拖拽" : "开启拖拽"
      }}</el-button>
    </div>
    <div id="mapDiv"></div>
  </div>
</template>

<script>
import { isMobile } from "@/utils";
export default {
  data() {
    return {
      map: null,
      /*
       *地图API的核心类，用来实例化一个地图。
       */
      mapOptions: {
        projection: "EPSG:900913", //指定地图的投影方式，目前支持的地图投影方式有：EPSG:900913(墨卡托投影)，EPSG:4326(大地平面投影)。（EPSG:900913为默认投影方式,全球地图才有区别）
        // minZoom: 14, //(1-18)
        // maxZoom: 17,
        // maxBounds: new T.LngLatBounds(
        //   new T.LngLat(112.53949068038696, 37.8526334),
        //   new T.LngLat(116.40969, 39.89945)
        // ),/**
        //  * 当这个选项被设置后，地图被限制在给定的地理边界内，
        //  * 当用户平移将地图拖动到视图以外的范围时会出现弹回的效果，
        //  * 并且也不允许缩小视图到给定范围以外的* 区域（这取决于地图的尺寸）。
        //  * 使用setMaxBounds方法可以动态地设置这种约束。
        //  */
        center: new T.LngLat(112.53949068038696, 37.8526334),
        zoom: 15,
      },
      control: null,
      geolocation: null,
      LngLat: [],
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initMap();
    // });
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      this.map = new T.Map("mapDiv", this.mapOptions); // 创建Map实例 id
      //   this.lnglat = new T.LngLat(112.53949068038696, 37.85263340965346); //   确定经纬度坐标
      //   this.map.centerAndZoom(this.lnglat); //地图初始化。设置中心点坐标和地图级别。 地图必须经过初始化才可以执行其他操作。(1-18) 数字越大,比例尺越大
      //   this.geolocation = new T.Geolocation({
      //     enableHighAccuracy: true, //要求浏览器获取最佳结果。
      //   });
      //   this.getlocation();
    },
    /**
     * 定位
     */
    getlocation() {
      //H5
      var geolocation = this.geolocation;
      var map = this.map;
      console.log(geolocation);
      geolocation.getCurrentPosition(function (e) {
        if (this.getStatus() == 0) {
          map.centerAndZoom(e.lnglat, 15);
          console.log(e);
          var marker = new T.Marker(e.lnglat);
          map.addOverLay(marker);
        }
        if (this.getStatus() == 1) {
          map.centerAndZoom(e.lnglat, e.level);
          console.log(e);
          var marker = new T.Marker(e.lnglat);
          map.addOverLay(marker);
        }
      });
    },
    getLocation() {
      var _this = this;
      navigator.geolocation.getCurrentPosition(
        (result) => {
          // 得到地理定位结果的前提：1，设备支持并开启定位功能 2，用户在网页弹窗授权允许
          //   console.log(1, result); //成功的结果
          //   _this.data = `当前位置的信息如下:<br>
          //                         经度是:${result.coords.longitude}<br>
          //                         纬度是：${result.coords.latitude}<br>
          //                         海拔是：${result.coords.altitude}<br>
          //                         方向是：${result.coords.heading}<br>
          //                         速度是：${result.coords.speed}<br>`;
          _this.LngLat = [result.coords.longitude, result.coords.latitude];
        },
        function (err) {
          console.log(2, err); //失败的信息
          _this.data = err.message;
        }
      );
    },
    ableDrag() {
      /**
       * 地图是否可拖拽，默认可拖拽。
       * 切换拖拽状态
       */
      if (this.isDrag) {
        this.map.disableDrag();
      } else {
        this.map.enableDrag();
      }
    },
  },
  computed: {
    isDrag() {
      if (this.map) {
        return this.map.isDrag();
      }
    },
  },
};
</script>

 <style lang="scss" scoped>
.tianditu {
  width: 100%;
  height: 100%;
  .map-button {
    padding: 10px 15px;
  }
  #mapDiv {
    width: 100%;
    height: calc(100% - 60px);
    //background-color: #000;
  }
}
</style>