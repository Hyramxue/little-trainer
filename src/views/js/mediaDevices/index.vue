<template>
  <div class="flex">
    <div>
      <button @click="openWebcam">打开摄像头</button>
      <button @click="shoot">拍摄</button>
      <input @change="getImageFromLocal" type="file" ref="fileInput" accept="image/*" />
    </div>
    <img :src="image" alt />
    <video id="video" autoplay ref="videoWebcam"></video>
  </div>
</template>

<script>
import { uploadImg } from "@/api/upload";
export default {
  name: "mediaDevices",
  data() {
    return {
      mediaDevices: null,
      image: null,
      uploader: "",
    };
  },
  created() {
    this.$nextTick(() => {
      this.checkCamera();
    });
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
    //打开摄像头
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
          if (!videoWebcam) return;
          videoWebcam.srcObject = ele;
          videoWebcam.play();
        })
        .catch((err) => {
          /* 处理 error */
          this.getError(err);
        });
    },
    //错误处理
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
    //拍摄
    async shoot() {
      let videoRefs = this.$refs.videoWebcam;
      if (!videoRefs) return;
      const canvas = document.createElement("canvas");
      canvas.width = videoRefs.videoWidth;
      canvas.height = videoRefs.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRefs, 0, 0);
      const data = canvas.toDataURL("image/png");

      this.image = data;

      //base格式转为文件格式
      let file = await this.base64ToFile(data, "test");
      console.log(file);
      let formData = new FormData();
      await formData.append("file", file);
      console.log(formData);
      uploadImg(formData).then((ele) => {
        console.log(ele);
      });
    },
    async getImageFromLocal(e) {
      const inputEl = e.target;
      if (!inputEl) return;
      const file = inputEl.files[0]; //获取文件的信息
      console.log("inputEl.files", file);
      console.log(file);
      //   const url = URL.createObjectURL(file); //获取本地文件地址Blob对象

      let formData = new FormData();
      await formData.append("file", file);

      uploadImg(formData).then((ele) => {
        console.log(ele);
      });
    },

    base64ToFile(base64, fileName) {
      // 将base64按照 , 进行分割 将前缀  与后续内容分隔开
      let data = base64.split(",");
      // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
      let type = data[0].match(/:(.*?);/)[1];
      // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
      let suffix = type.split("/")[1];
      // 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
      const bstr = window.atob(data[1]);
      // 获取解码结果字符串的长度
      let n = bstr.length;
      // 根据解码结果字符串的长度创建一个等长的整形数字数组
      // 但在创建时 所有元素初始值都为 0
      const u8arr = new Uint8Array(n);
      // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
      while (n--) {
        // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 利用构造函数创建File文件对象
      // new File(bits, name, options)
      const file = new File([u8arr], `${fileName}.${suffix}`, {
        type: type,
      });
      // 将File文件对象返回给方法的调用者
      return file;
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      let formData = new FormData();
      formData.append("avatarfile", file.file);
      uploadImg(formData).then((ele) => {
        console.log(ele);
      });
    },
  },
};
</script>

<style>
</style>