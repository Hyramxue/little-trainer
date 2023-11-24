<template>
  <div class="top-menuNav-wrapper">
    <div class="menuNav-bar-flex">
      <el-menu :default-active="active" mode="horizontal" class="top-menu-box">
        <template
          v-for="router in routers.filter((ele) => {
          return ele.meta && ele.meta.title;
        })"
        >
          <el-menu-item :key="router.name" :index="router.name" @click="menuClick(router)">
            <span slot="title">
              <div class="menu-title">{{ router.meta.title }}</div>
            </span>
          </el-menu-item>
        </template>
      </el-menu>

      <div class="party-building-left">
        <div class="party-building-time">
          <div class="party-building-hms">{{ nowTime }}</div>
          <div class="party-building-day">{{ day }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    routersArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      nowTime: "",
      day: "",
      active: "",
    };
  },
  computed: {
    routers() {
      return this.routersArr;
    },
  },
  created() {
    this.nowTimes();
  },
  methods: {
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
    },
    menuClick(router) {
      //   console.log(router);
      const childrenArr = router.children || [];
      if (!childrenArr.length) {
        this.$router.push(router);
      }
      //   this.$bus.$emit("getTwoRouter", {
      //     firstPath: "/" + router.path,
      //     childrenArr,
      //   });
      this.$store.commit("menu/SET_FIRSTPATH", "/" + router.path);
      this.$store.commit("menu/SET_CHILDRENARR", childrenArr);
    },
  },
  watch: {
    $route: {
      handler: function (to, from) {
        let active = to.path.split("/")[1];

        let activeIndex = this.routers.findIndex(
          (item) => item.name === active
        );
        const childrenArr = this.routers[activeIndex].children || [];

        if (!childrenArr.length) {
          this.$store.commit("menu/SET_FIRSTPATH", null);
        } else {
          this.$store.commit("menu/SET_FIRSTPATH", "/" + active);
        }

        this.$store.commit("menu/SET_CHILDRENARR", childrenArr);
        this.active = active;
      },
      // 深度观察监听
      deep: true,
      immediate: true,
    },
    beforeDestroy() {
      if (this.nowTimes) {
        clearInterval(this.nowTimes);
        this.nowTimes = null;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.top-menuNav-wrapper {
  width: 100%;
  height: 50px;
  .menuNav-bar-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 30px;
    background: #fff;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.04);

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
}

::v-deep .menuNav-bar-flex {
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }
}
</style>
