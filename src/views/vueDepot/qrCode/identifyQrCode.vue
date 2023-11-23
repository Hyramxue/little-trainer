<template>
  <div>
    <input @change="getImageFromLocal" type="file" ref="fileInput" accept="image/*" />
    <el-divider></el-divider>
    <img :src="imgSrc" alt />
    <el-divider></el-divider>
 
    <el-divider></el-divider>
 
  </div>
</template>

<script>
export default {
  name: "identifyQrCode",
  data() {
    return {
      imgSrc: "",
      qrcode: "",
    };
  },
  methods: {
    getImageFromLocal(e) {
      const inputEl = e.target;
      if (!inputEl) return;
      const file = inputEl.files[0]; //获取文件的信息
      //   console.log("inputEl.files", file);

      //   const url = URL.createObjectURL(file); //获取本地文件地址Blob对象

      //   this.imgSrc = url;
      const reader = new FileReader();
      reader.onload = (re) => {
        this.imgSrc = re.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
</style>