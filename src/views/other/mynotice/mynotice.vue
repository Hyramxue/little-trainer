<template>
  <div id="mynotice">
    <div class="run" v-if="!runSatus" @click="runSatus = true">批量管理</div>
    <div v-if="runSatus">
      <el-checkbox
        :indeterminate="isIndeterminate"
        @change="checkAll"
        v-model="isAll"
        >全选</el-checkbox
      >

      <div @click="deleteList">删除</div>
      <div class="cancel-run" @click="cancelRun">取消管理</div>
    </div>

    <ul>
      <li
        v-for="(l, index) in list"
        :key="l.id"
        @mouseover="deleteOne = l.id"
        @mouseout="deleteOne = ''"
      >
        <div class="content">
          <div class="desc">{{ l.content }}</div>
          <div class="time">{{ l.time }}</div>
        </div>
        <div class="delete-item">
          <div
            class="delete-item-one"
            v-if="!runSatus"
            v-show="deleteOne == l.id"
            @click="delOne(l)"
          >
            x
          </div>
          <div
            class="delete-item-all"
            :class="{ 'delete-item-true': l.isdel }"
            v-if="runSatus"
            @click="checkOne(l, index)"
          >
            <span v-show="l.isdel">√</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "dayjs",
  data() {
    return {
      list: [
        {
          content: "新功能上线了，立即体验1!",
          id: 1,
          time: 1,
        },
        {
          content: "新功能上线了，立即体验2!",
          id: 2,
          time: 1,
        },
      ],
      checkList: [],
      deleteOne: "", //鼠标移入删除展现
      runSatus: false, //批量管理
      isAll: false,
      isIndeterminate: false, //indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
    };
  },
  created() {},
  mounted() {
    if (this.list.length) {
      this.list.forEach((ele) => {
        ele.isdel = false;
      });
    }
  },
  methods: {
    delOne(item) {
      //删除一个
      console.log(item);
    },
    checkOne(item, index) {
      //批量管理选中一个
      item.isdel = !item.isdel;
      this.$set(this.list, index, item);
      if (this.list.length) {
        var arr = [...this.list];
        arr = arr.filter((ele) => ele.isdel == true);
        this.isIndeterminate = arr.length > 0 && arr.length < this.list.length;
        this.isAll = arr.length == this.list.length;
      }
    },
    checkAll(val) {
      // 全选
      this.isIndeterminate = false;
      //   console.log(val);
      if (this.list.length) {
        this.list.forEach((ele) => {
          ele.isdel = val;
        });
      }
    },
    cancelRun() {
      //取消管理
      this.reset()
        this.list.forEach((ele) => {
        ele.isdel = false;
      });
    },
    deleteList() {
      console.log(this.list);
    },
    reset() {
      this.deleteOne = "";
      this.runSatus = false;
      this.isAll = false;
      this.isIndeterminate = false;
    },
  },
  watch: {},
};
</script>

<style lang="scss">
#mynotice {
  width: 100%;
  height: 100%;
  background: #ffffff;
  padding: 15px;
  li {
    width: 80%;
    // height: 54px;
    padding: 20px 0px 20px 50px;
    background: #f5f4f2;
    margin-bottom: 2px;
    display: flex;
    cursor: pointer;
    .content {
      width: 95%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .desc {
        font-size: 14px;
        font-weight: 400;
        color: #222222;
      }
      .time {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #979797;
      }
    }
    .delete-item {
      width: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #979797;
      .delete-item-all {
        width: 15px;
        height: 15px;
        border: 1px solid #979797;
        transition: all 0.2s linear;
        &.delete-item-true {
          border: 1px solid #ff181a;
          color: #ff181a;
        }
      }
    }
  }
}
</style>
