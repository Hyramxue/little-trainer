<template>
  <div>
    <el-button type="text" @click="openDialog">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      destroy-on-close
      :before-close="handleClose"
    >
      <span
        >请确保您的本次投诉主题及证明材料已经填报完成，不允许重复提交。</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="buttonClose">取 消</el-button>
        <el-button
          type="primary"
          :disabled="isDisabled"
          :loading="isDisabled"
          @click="dialogVisible = false"
          class="statistic-button-style"
        >
          <span v-if="!isDisabled">确定</span>
          <span v-else class="statistic-style">
            <statistic
              :value="deadline"
              time-indices
              format="ss"
              @finish="hilarity"
            >
              <template slot="suffix">s</template></statistic
            ></span
          >
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      isDisabled: false,
      deadline: "",
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
      this.isDisabled = true;
      this.deadline = Date.now() + 1000 * 5;
    },
    hilarity() {
      //倒计时结束
      this.isDisabled = false;
    },
    handleClose(done) {
      //其他关闭
      this.$confirm("确认关闭？")
        .then((_) => {
          done();

          //   this.isDisabled = false;
        })
        .catch((_) => {});
    },
    buttonClose() {
      //按钮取消
      this.dialogVisible = false;

      this.deadline = "";
      this.isDisabled = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.statistic-button-style {
}
::v-deep .statistic-style .el-statistic {
  display: inline-block;
}
</style>