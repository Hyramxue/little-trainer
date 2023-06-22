<template>
  <div>
    <div v-html="data"></div>
    <div>{{ ip }}</div>
  </div>
</template>
 
<script>
 
export default {
  name: "location",
  data() {
    return {
      data: "",
      ip: "",
    };
  },
  created() {
    this.getLocation();
    // this.getIp();
 
  },
  methods: {
  
    getLocation() {
      var _this = this;
      console.log(navigator.onLine );
      navigator.geolocation.getCurrentPosition(
        (result)=> {
          // 得到地理定位结果的前提：1，设备支持并开启定位功能 2，用户在网页弹窗授权允许
        //   console.log(1, result); //成功的结果
          _this.data = `当前位置的信息如下:<br>
                                经度是:${result.coords.longitude}<br>
                                纬度是：${result.coords.latitude}<br>
                                海拔是：${result.coords.altitude}<br>
                                方向是：${result.coords.heading}<br>
                                速度是：${result.coords.speed}<br>`;
        },
        function (err) {
          // 如果用户阻止获取位置，会执行第二个回调函数，也就是失败的回调
          console.log(2, err); //失败的信息
          _this.data = err.message;
        }
      );
    },
    getIp() {
  
    },
  },
};
</script>

<style lang="scss" scoped >
 
</style>