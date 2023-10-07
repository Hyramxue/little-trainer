<template>
  <div id="siderbar">
    <el-menu
      :default-active="active"
      mode="vertical"
      @open="handleOpen"
      @close="handleClose"
 
    >
      <template
        v-for="router in routers.filter((ele) => {
          return ele.meta && ele.meta.title;
        })"
      >
        <!-- 一级 -->
        <el-menu-item
          :key="router.name"
          :index="router.name"
          v-if="!router.children"
          @click="goRouter(router.name)"
        >
          <span slot="title">
          
            <div class="menu-title">{{ router.meta.title }}</div>
          </span>
        </el-menu-item>
        <!-- 二级 -->
        <el-submenu :key="router.name" v-else :index="router.name">
          <template slot="title">
           
            <div class="menu-title">{{ router.meta.title }}</div>
          </template>
          <el-menu-item
            @click="goRouter(router.name + '/' + child.name)"
            v-for="child in router.children"
            :key="router.name + '/' + child.name"
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
  props: ["active"],
  data() {
    return {
      routers: this.$router.options.routes[1].children,
    };
  },
  created() {
    //   console.log(1,this.$router.options );
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goRouter(router) {
      router = "/" + router;
      this.$router.push(router);
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
#siderbar {
  width: 100%;
  height: 100%;

  .el-menu {
    width: 100%;
    height: 100%;
    // overflow: hidden;
    // background-color: transparent !important;
  }
}
::v-deep .el-menu-item {
 
//   height: 60px !important;
//   height: auto;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &:focus,
//   &:hover {
//     background-color: transparent;
//   }
//   img {
//     height: 30px;
//     width: auto;
//     margin: auto;
//   }
//   .menu-title {
//     line-height: 14px;
//     font-size: 14px;
//     margin-top: 5px;
//   }
//   &.is-active {
//     background: linear-gradient(90deg, #f2443b, #ff884b);
//   }
}
// ::v-deep .el-submenu__title:hover {
//   background-color: transparent;
// }
// ::v-deep .el-submenu .el-menu {
//   background-color: transparent;
// }
// ::v-deep .el-submenu {
//   .el-icon-arrow-down:before {
//     content: "";
//   }
//   .el-submenu__title {
//     img {
//       height: 30px;
//       width: auto;
//       margin: auto;
//     }
//     .menu-title {
//       line-height: 14px;
//       font-size: 14px;
//       margin-top: 5px;
//       text-align: center;
//     }
//   }

//   .el-menu--inline {
//     .el-menu-item {
//       display: block;
//       //   width: 100%;
//       span {
//         color: #ffcbc2;
//       }
//     }
//   }
//   &.is-opened {
//    &.is-active{
//     .el-submenu__title {
//         // position: relative;
//       background: linear-gradient(90deg, #f2443b, #ff884b);
//     //   &:after{
//     //     content: "";
//     //     width: 5px;
//     //     height: 100%;
//     //     position: absolute;
//     //     top: 0;
//     //     right: -5px;
//     //     background: #ff884b;
//     //   }
//     }
//    }
//     .is-active {
     
//       span {
//         color: #fff;
//       }

//       background: transparent;
//     }
//   }
// }
</style>