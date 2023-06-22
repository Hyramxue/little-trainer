<template>
  <div id="siderbar">
    <el-menu
      :default-active="active"
      mode="vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <template v-for="router in routers.filter(ele=>{ return  ele.meta&&ele.meta.title})">
        <!-- 一级 -->
        <el-menu-item
          :key="router.name"
          :index="router.name"
          v-if="!router.children"
        >
          <span slot="title">{{ router.meta.title }}</span>
        </el-menu-item>
        <!-- 二级 -->
        <el-submenu :key="router.name" v-else :index="router.name">
          <template slot="title">
            <span slot="title">{{ router.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="child in router.children"
            :key="child.name"
            :index="child.name"
          >
            <span slot="title">{{ child.meta.title }} </span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "siderbar",
  props:['active'],
  data() {
    return {
      routers: this.$router.options.routes,
      
    };
  },
  created() {
    //   console.log(this.$route );
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components:{
    
  }

};
</script>

<style lang="scss">
#siderbar {
    height: 100%;
    .el-menu{
           height: 100%; 
    }
}
</style>