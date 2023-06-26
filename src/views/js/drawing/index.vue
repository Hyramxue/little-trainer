<template>
  <div class="canvas">
    <el-row :gutter="20">
      <el-col :span="18" id="container">
        <canvas id="canvas"></canvas>
      </el-col>
      <el-col :span="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="画笔颜色">
            <el-color-picker v-model="color"> </el-color-picker>
          </el-form-item>
          <el-form-item label="画笔粗细">
            <el-slider :min="1" v-model="lineWidth" show-input> </el-slider>
          </el-form-item>
          <el-form-item>
            <el-button @click="reback" :disabled="rebackDisable"
              >撤销</el-button
            >
            <el-button @click="cancelReback" :disabled="cancelDisable"
              >取消撤销</el-button
            >
            <el-button @click="clear">清空</el-button>
            <el-button @click="downLoand">下载</el-button>
          </el-form-item>
        </el-form>

        <div>
          <!-- <div v-for="(status, index) in statusArr" :key="index">
            {{ status.width }}
          </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "#000",
      ctx: null,
      lineWidth: 5,
      isDraw: false,
      form: {},
      //状态列表
      statusArr: [],
      statusIndex: 0,
      newStatusArr: [],
      cancelDisable: true,
      rebackDisable: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      let container = document.getElementById("container");
      let offsetWidth = container.offsetWidth; //父元素宽度
      let offsetHeight = container.offsetHeight; //父元素高度
      const top = container.getBoundingClientRect().top; //父距离窗口位置
      const left = container.getBoundingClientRect().left; //父距离窗口位置
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      this.ctx = canvas.getContext("2d");

      var { isDraw, ctx, color, lineWidth } = this;

      this.addText();

      //鼠标按下开始
      canvas.onmousedown = (e) => {
        isDraw = true;
        const { x, y } = e;

        this.draw(x - left, y - top);
      };

      //移动绘画
      canvas.onmousemove = (e) => {
        if (isDraw) {
          const { x, y } = e;

          ctx.lineTo(x - left, y - top);
          ctx.stroke();
        }
      };

      //停止绘画
      canvas.onmouseup = (e) => {
        isDraw = false;
        ctx.closePath();
        this.addStatus();
      };
    });
    //
  },
  methods: {
    //画
    draw(x, y) {
      const { ctx, color, lineWidth } = this;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    //添加状态
    addStatus() {
      const { ctx } = this;

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      this.statusArr.push(imageData);
      this.statusIndex++;

      //撤销

      this.rebackDisable = this.statusIndex == 0 ? true : false;
    },
    //撤销
    reback(status) {
      const { ctx } = this;
      let { statusArr } = this;
      //todo撤销
      this.rebackDisable = this.statusIndex == 1 ? true : false;
      //todo取消撤销
      this.cancelDisable =
        this.statusIndex == 0 ||
        (this.statusArr.length && this.statusIndex - 1 == this.statusArr.length)
          ? true
          : false;

      if (this.statusIndex - 1) {
        this.statusIndex--;

        let imageData = statusArr[this.statusIndex - 1];
        this.newStatusArr = [];
        for (let index = 0; index < this.statusIndex; index++) {
          this.newStatusArr.push(statusArr[index]);
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (this.statusIndex - 1 == 0) {
 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
 
     
      }
    },
    //取消撤销
    cancelReback() {
      const { ctx } = this;
      let { statusArr } = this;
      this.cancelDisable =
        this.statusIndex == 0 || this.statusIndex == this.statusArr.length
          ? true
          : false;
      if (this.statusIndex) {
        let imageData = statusArr[this.statusIndex - 1];
        this.statusIndex++;
        this.newStatusArr = [];
        for (let index = 0; index < this.statusIndex; index++) {
          this.newStatusArr.push(statusArr[index]);
        }

        this.rebackDisable = this.statusIndex == 0 ? true : false;
        ctx.putImageData(imageData, 0, 0);
      }
    },

    clear() {
      const { ctx } = this;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //状态列表
      this.statusArr = [];
      this.statusIndex = 0;
      this.newStatusArr = [];
      this.cancelDisable = true;
      this.rebackDisable = true;
    },
    downLoand() {
      let src = canvas.toDataURL("image/png");
      let a = document.createElement("a");
      a.href = src;
      a.download = `画板${new Date()}.png`;
      a.click();
    },
    //FIXME 添加文字
    addText() {
      let { ctx } = this;
      // 设置字体信息
      ctx.font = "bold 20px Arial";

      ////  设置文字样式
      //   ctx.fillStyle = "#FFF";
      //   ctx.strokeStyle = "#FFF";
      //   ctx.shadowColor = "#FFF";
      //   ctx.shadowOffsetX = 5;
      //   ctx.shadowOffsetY = 5;
      //   ctx.shadowBlur = 10;
      // 绘制文字  x，y
      ctx.fillText("我是水印", 10, 20);
      ctx.strokeText("我是水印", 150, 50);
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
  display: flex;
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