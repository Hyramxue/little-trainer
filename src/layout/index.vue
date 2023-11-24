<template>
  <div class="home-wrapper">
    <div class="left-wrapper">
      <sidebar :routersArr="$router.options.routes[1].children"></sidebar>
    </div>
    <div class="right-wrapper">
      <navbar></navbar>
      <div class="right-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default {
  name: "HomeView",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {};
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
  .left-wrapper {
    float: left;
    width: 150px;

    height: 100%;
  }
  .right-wrapper {
    float: right;
    width: calc(100% - 150px);
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
