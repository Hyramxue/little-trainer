<template>
  <div class="sidebar-wrapper">
    <!-- <div class="sidebar-logo">XHW</div> -->
    <div class="sidebar-menu">
      <Menu :active="active" :routersArr="routersArr"></Menu>
    </div>
    <!-- <el-dropdown
      class="avatar-container right-menu-item hover-effect"
      trigger="click"
    >
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  @click.native="logout">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>-->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import Menu from "./routerMenu.vue";

export default {
  name: "HomeView",
  components: {
    Menu,
  },
  props: {
    routersArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {},
  data() {
    return {
      active: this.$route.name,
      logo: "",
    };
  },
  created() {
    // console.log(this.$route);
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
  },
  watch: {
    $route(to, from) {
      this.active = to.name;

      //   console.log(to );
    },
    deep: true,
  },
};
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  width: 100%;
  height: 100%;

  background-repeat: no-repeat, no-repeat;

  background-position: center top, center bottom;
  //   padding: 30px 0 20px;
  //   background: #0e1726;
  .sidebar-logo {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    width: 100%;
    height: 40px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    img {
      width: 30px;
      height: auto;
      margin-right: 10px;
    }
  }
  .sidebar-menu {
    width: 150px;
    height: calc(100% - 120px);
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      /* -webkit-box-shadow: inset 0 0 5px rgba(186, 187, 255, 0.2); */
      /* background: transparent; */
      background: #a9a9a9;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #a9a9a9;
    }

    &::-webkit-scrollbar-track {
      display: none;
      /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1); */
    }
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #fff;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
  .avatar-container {
    width: 100%;
    height: 70px;

    .avatar-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;
      color: #333;

      .user-avatar {
        cursor: pointer;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        margin: 0 0 0 5px;
        font-size: 12px;
      }
    }
  }
  .breadcrumb-wrapper {
    width: 100%;
    height: 30px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.04);
  }
}
</style>
