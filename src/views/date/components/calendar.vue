<template>
  <div style="height:50vh">
    <div>{{ startWeekTime }}---{{ endWeekTime }}</div>
    <el-calendar  style="height: 100%">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <div style="height: 100%" @click="clickCalendar(data, date)">
          

          <!-- 周 -->
          <!-- 背景 -->
          <div :class="{  isweekday: data.day>=startWeekTime && data.day<=endWeekTime}">
            <!-- 圈 -->
          <div  :class="{ isweek: data.day == startWeekTime || data.day == endWeekTime  }" >
            <div v-if="data.day == istoday" class="myIsTOday">今天</div>
            {{ data.day.split("-")[2] }}
          </div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/zh-cn";

dayjs.extend(weekday);
dayjs.locale("zh-cn");

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      istoday: dayjs().format("YYYY-MM-DD"),
      startWeekTime: "",
      endWeekTime: "",
    };
  },
  created() {
    // console.log(dayjs().format("YYYY-MM-DD"));
    this.isweek();
  },
  methods: {
    clickCalendar(data) {
      console.log(data);
    },
    isweek() {
      var start_time = dayjs().startOf("week").format("YYYY-MM-DD");
      var end_time = dayjs().endOf("week").format("YYYY-MM-DD");
      (this.startWeekTime = start_time), (this.endWeekTime = end_time);
      return [start_time, end_time];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.isweek {
  width: 34px;
  height: 34px;
  background: #30d0bf;
  border-radius: 50%;
}
.isweekday{
    width: 100%;
height: 34px;
background: rgba(48,208,191,0.18);
}
</style>
<style>
.el-calendar__header {
  display: none !important;
}
.el-calendar-table .el-calendar-day{
    padding: 0;
 
}
</style>
