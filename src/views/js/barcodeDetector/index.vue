<template>
  <div class="barcodeDetector">
    <input @change="getImageFromLocal" type="file" ref="fileInput" accept="image/*" />
    <button @click="spot">识别</button>
    <el-divider></el-divider>
    <img class="qrImg" :src="imgSrc" alt />
    <el-divider></el-divider>

    <el-divider></el-divider>
    <mdnDoc />
  </div>
</template>

<script>
import mdnDoc from "./style/mdnDoc";
export default {
  name: "identifyQrCode",
  components: { mdnDoc },
  data() {
    return {
      imgSrc: "",
    };
  },
  methods: {
    getImageFromLocal(e) {
      const inputEl = e.target;
      if (!inputEl) return;
      const file = inputEl.files[0]; //获取文件的信息
      const url = URL.createObjectURL(file); //获取本地文件地址Blob对象

      this.imgSrc = url;
      //   const reader = new FileReader();
      //   reader.onload = (res) => {
      //     this.imgSrc = res.target.result;
      //   };
      //   reader.readAsDataURL(file);
    },
    spot() {
      if (!("BarcodeDetector" in globalThis)) {
        console.log("Barcode Detector is not supported by this browser.");
      } else {
        console.log("Barcode Detector supported!");

        // create new detector
        const barcodeDetector = new BarcodeDetector({
          formats: ["code_39", "codabar", "ean_13"],
        });
        barcodeDetector.getSupportedFormats().then((supportedFormats) => {
          supportedFormats.forEach((format) => console.log(format));
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.barcodeDetector {
  .qrImg {
    width: 50px;
    height: 50px;
  }
}
</style>
 