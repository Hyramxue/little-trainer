<template>
  <div class="home-wrapper">
    <div class="head-wrapper">
      <navbarMenu :routersArr="$router.options.routes[1].children" />
    </div>
    <div class="main-wrapper">
      <div class="left-wrapper" v-show="leftShow">
        <sidebar></sidebar>
      </div>
      <div class="right-wrapper">
        <div class="right-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./sidebar";
import navbarMenu from "./navbarMenu";
export default {
  name: "HomeView",
  components: {
    Sidebar,
    navbarMenu,
  },
  data() {
    return {
      routersArr: [],
      firstPath: "",
    };
  },
  mounted() {
    this.$bus.$on("getTwoRouter", (form) => {
      //上传图片
      console.log("bus", form);
      this.routersArr = form.childrenArr;
      this.firstPath = form.firstPath;
    });
  },
  computed: {
    leftShow() {
      return this.routersArr.length;
    },
  },
};
</script>
<style lang="scss">
.home-wrapper {
  width: 100%;
  height: 100%;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
  .main-wrapper {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
 
  }
  .left-wrapper {
    width: 150px;
    height: 100%;
  }
  .right-wrapper {
    flex: 1;
    flex-shrink: 0;
    height: 100%;
    .right-box {
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
      height: calc(100% - 70px);
      overflow: auto !important;
      background: #f1f3f6;
    }
  }
}
</style>
