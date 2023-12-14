<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  watch: {
    $route(to, from) {
      this.active = to.name;

      //   console.log(to );
    },
    deep: true,
  },
};
</script>
<style lang='scss'>
#app {
  height: 100vh;
  width: 100vw;
  min-width: 1400px;
//   overflow: auto;
  .el-aside {
    height: 100vh;
  }
}
</style>
