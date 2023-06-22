<template>
  <div class="top-nav-wrapper">
    <div class="nav-bar-flex">
      <div class="party-building-title">智慧党建</div>

      <div class="party-building-left">
        <div class="party-building-time">
          <div class="party-building-hms">{{ nowTime }}</div>
          <div class="party-building-day">{{ day }}</div>
        </div>
      
      </div>
      <!-- <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" /> {{ name }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      nowTime: "",
      day: "",
    };
  },
  computed: {
    // ...mapGetters(["name", "avatar"]),
   
  },
  created() {
    this.nowTimes();
  },
  methods: {
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime = hh + ":" + mm + ":" + ss;
      this.day = year + "/" + month + "/" + date;
    },

    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
        this.nowTimes = null;
      //   this.day = null;
    },

  },
   watch: {
    $route: {
      handler: function (to, from) {
    //   this.nowTimes();
       

      },
      // 深度观察监听
      deep: true
    },
    beforeDestroy() {
      if (this.nowTimes) {
        clearInterval(this.nowTimes);
        this.nowTimes = null;
      }
    }
  }
};
</script>

<style lang='scss'>
.top-nav-wrapper {
  width: 100%;
  height: 70px;
  .nav-bar-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px 30px;
    background: #fff;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.04);
    .party-building-title {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #000000;
    }
    .party-building-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .party-building-time {
        text-align: center;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #000000;
        margin-right: 30px;
      }
      .party-building-img {
        width: 30px;
        cursor: pointer;
      }
    }
  }

  //   .right-menu-item {
  //     display: inline-block;
  //     padding: 0 8px;
  //     height: 100%;
  //     font-size: 18px;
  //     color: #fff;
  //     vertical-align: text-bottom;

  //     &.hover-effect {
  //       cursor: pointer;
  //       transition: background 0.3s;

  //       &:hover {
  //         background: rgba(0, 0, 0, 0.025);
  //       }
  //     }
  //   }
  //   .avatar-container {
  //     margin-right: 30px;

  //     .avatar-wrapper {
  //       display: flex;
  //       justify-content: flex-end;
  //       align-items: flex-end;
  //       margin-top: 5px;
  //       position: relative;
  //       color: #333;

  //       .user-avatar {
  //         cursor: pointer;
  //         width: 35px;
  //         height: 35px;
  //         border-radius: 10px;
  //       }

  //       .el-icon-caret-bottom {
  //         cursor: pointer;
  //         margin: 0 0 0 5px;
  //         font-size: 12px;
  //       }
  //     }
  //   }
  //   .breadcrumb-wrapper {
  //     width: 100%;
  //     height: 30px;
  //     background: rgba(255, 255, 255, 0.5);
  //     box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.04);
  //   }
}
</style>
