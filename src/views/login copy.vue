<template>
  <div class="login">
    <div class="system-login-card">
      <div class="card-info">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          :hide-required-asterisk="true"
        >
          <div class="title">
            <div>潞城经开区数智互联产业园5G+智慧园区</div>
            <div class="h1-title">综合运维管理平台</div>
          </div>
          <el-form-item prop="name">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid"
              v-model="ruleForm.name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入登录密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
            >
              <!-- <img  slot="suffix"  src="@/assets/logo.png">  -->
            </el-input>
          </el-form-item>
          <el-form-item  >
             <el-checkbox v-model="ruleForm.rememberMe">记住用户名</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, setToken } from "@/utils/auth";
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    onSubmit(formName) {
      //   this.$refs[formName].validate((valid) => {
      // 
      //   });

    //   setToken("wqdefasdfsdbcssdf");
      this.$router.push("/");
    },
    async notify() {
      const { name } = this.ruleForm;
      const title = "登陆成功";
      const msg = `${name}登陆成功`;
      //判断是否有通知的权限，没有则向系统申请通知权限
      if (Notification.permission != "granted") {
        await Notification.requestPermission();
      }

      //获取到权限后发送通知
      if (Notification.permission == "granted") {
        //发送通知
        const notification = new Notification(title, { body: msg });

        notification.addEventListener("click", () => {
          this.$message.success("你点击了这条消息");
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .system-login-card {
    padding: 2px;
    border-radius: 3px;
    background: linear-gradient(0deg, #f3f3f300, #1f33d2, #3752eb);
    .card-info {
      border-radius: 3px;

      padding: 70px 50px;
      background: #110e38;
      .title {
        margin-bottom: 60px;
        padding: 0 15px;
        font-size: 24px;
        font-family: HYLingXinJ;
        text-align: center;
        color: #ffffff;
        text-shadow: 0px 5px 27px #4e34ff;

        .h1-title {
          font-size: 36px;
          margin-top: 20px;
        }
      }

      .el-button {
        width: 100%;
        height: 60px;
        background: linear-gradient(-90deg, #3c60f5, #1e0abb);
        border-radius: 6px;
        border: 0px;
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}
</style>