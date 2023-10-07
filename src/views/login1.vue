<template>
  <div class="login">
    <div class="witpark-uccn-login-card">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-loginForm"
        :hide-required-asterisk="true"
      >
        <div class="title">
          <!-- <img src="@/assets/system/img/login_title.png" alt="" /> -->
        </div>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="loginForm.username"
            clearable
          >
            <!-- <img slot="prefix" src="@/assets/system/img/login_username.png" /> -->
            <i slot="prefix" class="el-icon-user" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入登录密码"
            v-model="loginForm.password"
            show-password
          >
            <!-- <img slot="prefix" src="@/assets/system/img/login_lock.png" /> -->
            <i slot="prefix" class="el-icon-unlock" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="loginForm.code">
            <!-- <img slot="prefix" src="@/assets/system/img/login_lock.png" /> -->
            <i slot="prefix" class="el-icon-unlock" />
            <img slot="suffix" :src="src" alt="验证码图片" @click=" src =  src + '?' +Math.random()">
          </el-input>
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
</template>

<script>
import { getToken, setToken } from "@/utils/auth";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      loginForm: {},
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading: false,
      src:process.env.VUE_APP_BASE_API+'/captchaImage'
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
    this.getCookie();
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
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #eff0f7;
  .witpark-uccn-login-card {
    // width: 521px;
    // height: 648px;
    background: #ffffff;
    border-radius: 4px;
    padding: 58px 37px;
  }
}

::v-deep .witpark-uccn-login-card {
  .el-input {
    width: 448px;
    height: 72px;
    //   border: 1px solid #eeeeee;
    //   border-radius: 5px;
    .el-input__inner {
      width: 100%;
      height: 100%;
      padding: 0 60px;

      &::-webkit-input-placeholder {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 63px;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 63px;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 63px;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 63px;
      }
    }

    .el-input__prefix {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        //   width: 22px;
        //   height: 26px;
        font-size: 30px;
      }
    }
  }
}
</style>