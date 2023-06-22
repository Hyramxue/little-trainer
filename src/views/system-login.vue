<template>
  <div class="login">
    <div class="system-login-card">
      <div class="card-info">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="demo-loginForm"
          :hide-required-asterisk="true"
        >
          <div class="title">
            <img src="@/assets/system/img/login_title.png" alt="" />
          </div>
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="loginForm.username"
              clearable
            >
              <img slot="prefix" src="@/assets/system/img/login_username.png" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入登录密码"
              v-model="loginForm.password"
              show-password
            >
              <img slot="prefix" src="@/assets/system/img/login_lock.png" />
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="请输入验证码" v-model="loginForm.code">
              <img slot="prefix" src="@/assets/system/img/login_lock.png" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.rememberMe">记住用户名</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click.native.prevent="handleLogin('loginForm')"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span></el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { getToken, setToken } from "@/utils/auth";
// import Cookies from "js-cookie";

export default {
  data() {
    return {
      loginForm: {},
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    // this.getCode();
    // this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff =
          res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,

        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });

            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");

            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then((res) => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              //   this.getCode();
            });
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  background: url("@/assets/system/img/login_bg.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed; /* 不设置的话页面滑动时，背景会不铺满*/
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .system-login-card {
    padding: 2px;
    border-radius: 3px;
    background: url("@/assets/system/img/login_card_bg.png") no-repeat;
    background-size: 100% 100%;
    .card-info {
      border-radius: 3px;

      padding: 70px 50px;

      .title {
        margin-bottom: 40px;
        padding: 0 15px;
        img {
          width: 473px;
          height: 136px;
        }
      }

      .el-button {
        width: 100%;
        height: 60px;
        background: linear-gradient(10deg, #3c60f5, #1e0abb);
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
::v-deep .el-form-item:last-of-type {
  margin-bottom: 0px;
}
::v-deep .el-input .el-input__prefix {
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-input .el-input__inner {
  background: transparent;
  border: none;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  
font-size: 20px;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #414a92;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #414a92;
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #414a92;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #414a92;
  }
}
::v-deep .el-input {
  position: relative;

font-size: 22px;
  &:after {
    content: "";
    height: 37px;
    width: 100%;
    background: url("@/assets/system/img/login_input_bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: -24px;
    left: 0px;

    // transform: translateY(50%);
  }
}
::v-deep .el-checkbox__label {
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  color: #414a92;
}
::v-deep .el-checkbox__inner {
  border-radius: 50%;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #2d27de;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  color: #2d27de;
  background: #2d27de;
  border-color: #2d27de;
}
</style>