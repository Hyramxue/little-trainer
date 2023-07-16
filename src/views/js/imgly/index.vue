<template>
  <div class="canvas">
    <el-button type="primary" @click="fileClick()">文件上传</el-button>
    <input
      type="file"
      id="fileExport"
      @change="handleFileChange"
      ref="inputer"
      style="display: none"
    />

    <el-row :gutter="20">
      <el-col :span="12">
        <img style="width: 100%" :src="image_src" alt="" />
      </el-col>
      <el-col :span="12">
        <img style="width: 100%" :src="url" alt="" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import imglyRemoveBackground from "@imgly/background-removal";
export default {
  data() {
    return {
      image_src: "",
      url: "",
    };
  },
  mounted() {
    this.$nextTick(() => {});
    //
  },
  methods: {
    fileClick() {
      // 点击button按钮click事件
      this.$refs.inputer.dispatchEvent(new MouseEvent("click")); // 触发input框的click事件
    },
    handleFileChange(e) {
      // 触发input选择文件事件
      var self = this;
      let inputDOM = self.$refs.inputer;
      var file = inputDOM.files[0]; // 通过DOM取文件数据
      var fileName = file.name;

        let size = Math.floor(file.size / 1024); //计算文件的大小
//         var formData = new FormData(); // new一个formData事件
//         formData.append("file", file); // 将file属性添加到formData里
//         formData.append("name", fileName); // 后台可接收的参数
//       console.log(file);
//   this.image_src=formData
      this.imglyRemoveBackground(file);
    },
    imglyRemoveBackground(image_src) {
      imglyRemoveBackground(image_src).then((blob) => {
        // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
        const url = URL.createObjectURL(blob);
        this.url = url;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  //   display: flex;
  .el-row {
    width: 100%;
    height: 100%;
    .el-col {
      height: 100%;
    }
  }
  .bth {
    // width: 20%;
    // float: right;
  }
}
</style>