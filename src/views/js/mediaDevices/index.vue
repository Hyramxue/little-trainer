<template>
  <div>
    <button @click="openWebcam">打开摄像头</button>
    <video id="video" autoplay ref="videoWebcam"></video>
  </div>
</template>

<script>
export default {
  name: "mediaDevices",
  data() {
    return {
      mediaDevices: null,
    };
  },
  created() {
    // this.$nextTick(() => {
    this.checkCamera();
    // });
  },
  mounted() {},
  methods: {
    //检验当前设备是否有摄像设备
    async checkCamera() {
      // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
      if (window.navigator.mediaDevices === undefined) {
        window.navigator.mediaDevices = {};
      }
      const mediaDevices = window.navigator.mediaDevices;
      const device = await mediaDevices.enumerateDevices();
      console.log(device);
      if (device.length) {
        console.log("有摄像设备");

        /**
         * 使用摄像头
         * getUserMedia兼容
         */
        if (mediaDevices.getUserMedia === undefined) {
          mediaDevices.getUserMedia = function (constraints) {
            // 首先，如果有 getUserMedia 的话，就获得它
            var getUserMedia =
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            // 一些浏览器根本没实现它 - 那么就返回一个 error 到 promise 的 reject 来保持一个统一的接口
            if (!getUserMedia) {
              return Promise.reject(
                new Error("getUserMedia is not implemented in this browser")
              );
            }

            // 否则，为老的 navigator.getUserMedia 方法包裹一个 Promise
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }

        this.mediaDevices = mediaDevices;
        // 使用摄像头
      }
    },
    openWebcam() {
      const mediaDevices = this.mediaDevices;
      let mediaObj = {
        audio: false, //不使用音频
        video: {
          height: 500,
          with: 500,
          //   facingMode: { exact: "environment" }, //强制使用后置摄像头
          facingMode: "user", //前置摄像头
        },
      };
      mediaDevices
        .getUserMedia(mediaObj)
        .then((ele) => {
          console.log(ele);
          let videoWebcam = this.$refs.videoWebcam;
          videoWebcam.srcObject = ele;
          videoWebcam.play();
        })
        .catch((err) => {
          /* 处理 error */
          this.getError(err);
        });
    },
    getError(err) {
      const strErr = err.toString();
      switch (strErr) {
        case "AbortError":
          console.error("中止错误");
          console.log(
            "未出现可能抛出NotReadableError异常的硬件问题，但仍然有一些问题的出现导致了设备无法被使用。"
          );
          break;
        case "NotAllowedError":
          console.error("未授权错误");
          console.log("用户拒绝了访问设备。");
          break;
        case "NotAllowedError":
          console.error("拒绝错误");
          console.log(
            "用户拒绝了当前的浏览器实例的访问请求；或者用户拒绝了当前会话的访问；或者用户在全局范围内拒绝了所有媒体访问请求。"
          );
          break;
        case "NotReadableError":
          console.error("不可读错误");
          console.log("设备不可读。");
          break;
        case "OverconstrainedError":
          console.error("无法满足要求错误");
          console.log("用户未授予设备所需的权限。");
          break;
        case "notfounderror":
          console.error("找不到错误");
          console.log("找不到满足请求参数的媒体类型。");
          break;
        case "TypeError":
          console.error("类型错误");
          console.log("对象未设置［空］，或者都被设置为false。");
        default:
          console.error(strErr);
          console.log("其他未知错误");
          break;
      }
    },
  },
};
</script>

<style>
</style>