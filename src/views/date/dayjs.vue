<template>
  <div id="day-js">
    <el-row :gutter="12" type="flex">
      <el-col :span="12">
        <el-card shadow="hover" class="day-format-box box-card">
          <div class="day">
            <span class="title">当前时间：</span>
            <span class="desc">{{ today }}</span>
          </div>
          <div class="day">
            <span class="title">当前时间：</span>
            <span class="desc">{{ nowTime }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="day-format-box box-card">
          <el-date-picker
            v-model="datetime"
            type="datetime"
            :pickerOptions="pickerOptions"
            placeholder="选择日期时间"
            @change="timeChange"
            @blur="timeChange"
            :editable="false"
          >
          </el-date-picker>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" class="day-format-box box-card">
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{ date, data }">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split("-").slice(1).join("-") }}
                <!-- {{ data.isSelected ? "✔️" : "" }} -->
           
              </p>
                   <div>{{getFestival(data.day)}}</div>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import calendar from "chinese-calendar"; 2020年之前有用
import { isWorkday, isHoliday, getFestival } from  'chinese-workday';
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
export default {
  name: "dayjs",
  data() {
    return {
      today: "",
      nowTime: "",
      datetime: "",
      pickerOptions: {
        disabledDate(time) {
          //  let nowTime= dayjs().format( " HH:mm:ss")
          //  let otherDay= dayjs(time).format( "YYYY-MM-DD")
          // console.log(  dayjs(time).format( "YYYY.MM.DD HH:mm:ss"));
          return new Date(time).getTime() < new Date().getTime() - 8.64e7;
        },
        selectableRange:
          dayjs().add(1, "minute").format("HH:mm:ss") + " - 23:59:59",
        // 时间是否小于当前时间（后一天选择00；00：00，选择当天，当天已经6：00：00.控制显示6点以后）
      },
    };
  },
  created() {
    this.nowTimes();
    console.log();
  },
  mounted() {},
  methods: {
    //格式化日期
    dateFormat(day, format) {
      return dayjs(day).format(format || "YYYY.MM.DD HH:mm:ss");
    },
    timeFormate(timeStamp, format) {
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
      this.nowTime =
        year + "/" + month + "/" + date + "  " + hh + ":" + mm + ":" + ss;
      this.today = dayjs(timeStamp).format(format || "YYYY.MM.DD HH:mm:ss");
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
    timeChange() {
      console.log(this.datetime);
      if (
        dayjs(this.datetime).format("YYYY-MM-DD HH:mm:ss") <
        dayjs().format("YYYY-MM-DD HH:mm:ss")
      ) {
        this.datetime = undefined;
      }
    },
    //input不可选
    inputDisabled() {
      var input = document.querySelectorAll(".el-picker-panel ");
      console.log(input);
    },
 getFestival(day){
   return  getFestival(day)
 }

  },
  watch: {},
};
</script>

<style lang="scss" scoped >
#day-js {
  .box-card {
    width: 100%;
  }
  .el-row {
    flex-wrap: wrap;
    .el-col {
      height: auto;
      margin-bottom: 10px;
    }
  }
}
</style>