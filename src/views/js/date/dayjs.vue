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
              <div>{{ getFestival(data.day) }}</div>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="通知开启时间" prop="publicBeginDate">
                <el-date-picker
                  :readonly="isDisabled"
                  v-model="form.publicBeginDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  :picker-options="{
                    disabledDate(time) {
                      return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
                    },
                    selectableRange: startTimeRange,
                  }"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通知结束时间" prop="publicEndDate">
                <el-date-picker
                  :readonly="isDisabled"
                  v-model="form.publicEndDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  :picker-options="{
                    disabledDate(time) {
                      return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
                    },
                  }"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="投诉开启时间"
                prop="complaintBeginDate"
                v-if="form.publicBeginDate"
              >
                <el-date-picker
                  :readonly="isDisabled"
                  v-model="form.complaintBeginDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  :picker-options="{
                    disabledDate(time) {
                      return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
                    },
                    selectableRange: startTimeRange,
                  }"
                  placeholder="选择日期时间"
                  @change="complaintBeginDateChange"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="投诉结束时间"
                prop="complaintEndDate"
                v-if="form.complaintBeginDate"
              >
                <el-date-picker
                  :readonly="isDisabled"
                  v-model="form.complaintEndDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  :picker-options="{
                    disabledDate(time) {
                      return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
                    },
                  }"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
                <!-- <el-tag
                type="danger"
                :underline="false"
                style="margin-left: 10px"
                v-if="queryParamsTime.length > 0"
                >投诉开启后{{ queryParamsTime[0].configValue }}({{
                  queryParamsTime[0].configType
                }})内可投诉，投诉状态关闭后，通知状态同步关闭。</el-tag
              > -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import calendar from "chinese-calendar"; 2020年之前有用
import { isWorkday, isHoliday, getFestival } from "chinese-workday";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import moment from "moment";
export default {
  name: "dayjs",
  data() {
    const newPassword = (rule, value, callback) => {
      const diff5 = moment(this.form.complaintBeginDate).diff(
        moment(this.form.publicBeginDate),
        "seconds"
      );
      if (diff5 < 0) {
        callback(new Error("投诉开启时间不能大于通知开启时间"));
      } else {
        callback();
      }
    };
    const tzEndDate = (rule, value, callback) => {
      if (!this.form.publicBeginDate) {
        callback(new Error("请先选择通知开启时间时间"));
      }
      const diff5 = moment(value).diff(
        moment(this.form.publicBeginDate),
        "seconds"
      );
      if (diff5 < 0) {
        callback(new Error("通知结束时间不能小于通知开启时间"));
      } else {
        callback();
      }
    };
    const tsEndDate = (rule, value, callback) => {
      const diff5 = moment(value).diff(
        moment(this.form.complaintBeginDate),
        "seconds"
      );
      if (diff5 < 0) {
        callback(new Error("投诉结束时间不能小于投诉开启时间"));
      } else {
        callback();
      }
    };
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
      rules: {
        title: [{ required: true, trigger: ["blur"], message: "标题不能为空" }],
        content: [
          { required: true, trigger: ["blur"], message: "内容不能为空" },
        ],
        complaintBeginDate: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "投诉开启时间不能为空",
          },
          { validator: newPassword, trigger: "blur" },
        ],
        publicBeginDate: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "通知开启时间不能为空",
          },
        ],
        publicEndDate: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "通知结束时间不能为空",
          },
          { validator: tzEndDate, trigger: ["blur", "change"] },
        ],
        complaintEndDate: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "投诉结束时间不能为空",
          },
          { validator: tsEndDate, trigger: ["blur", "change"] },
        ],
      },
      form: {
        publicBeginDate: "",
        complaintBeginDate: "",
        complaintEndDate: "",
        publicEndDate: "",
      },
      startTimeRange: "",
      queryParamsTime: [
        {
          configValue: 2,
          configType: "日",
        },
      ],
      isDisabled: false,
    };
  },
  created() {
    this.nowTimes();
    console.log();
    let publicBeginDate = moment().format("YYYY-MM-DD HH:mm:ss")
    this.form={publicBeginDate}
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
    getFestival(day) {
      return getFestival(day);
    },

    complaintBeginDateChange(value) {
      if (value) {
        var dict = {
          日: "d",
          小时: "h",
        };
        var endtime = moment(value)
          .add(
            this.queryParamsTime[0].configValue,
            dict[this.queryParamsTime[0].configType]
          )
          .format("YYYY-MM-DD HH:mm:ss");
        if (!this.form.publicEndDate) {
          this.form.publicEndDate = endtime;
        }

        console.log(endtime);
        this.form.complaintEndDate = endtime;
      } else {
        this.form.complaintEndDate = "";
      }
    },
  },
  watch: {
    "form.publicBeginDate": {
      handler(newValue, oldValue) {
        if (newValue) {
          let nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
          let dt = nowDate.split(" ");
          let st = "";
          if (newValue.split(" ")[0] == dt[0]) {
            // 如果是当天,选择的时间开始为此刻的时分秒
            st = dt[1];

            // 如果是当天（只有当日期改变时）,默认选中时间为当前时间

            if (newValue.split(" ")[0] != oldValue.split(" ")[0]) {
              this.form.publicBeginDate = nowDate;
            }
          } else {
            // 明天以及后面的时间从0时开始

            st = "00:00:00";
          }

          this.startTimeRange = st + " - 23:59:59";

          //例如：如果今天此刻时间为15:27:00 则选择时间范围为： 15:27:00 - 23:59:59

          //否则为：00:00:00 - 23:59:59
        }
      },
    },
    "form.complaintBeginDate": {
      handler(newValue, oldValue) {
        if (newValue) {
          let nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
          let dt = nowDate.split(" ");
          let st = "";
          if (newValue.split(" ")[0] == dt[0]) {
            // 如果是当天,选择的时间开始为此刻的时分秒
            st = dt[1];
            // 如果是当天（只有当日期改变时）,默认选中时间为当前时间
            if (newValue.split(" ")[0] != oldValue.split(" ")[0]) {
              this.form.complaintBeginDate = nowDate;
            }
          } else {
            // 明天以及后面的时间从0时开始
            st = "00:00:00";
          }

          this.startTimeRange = st + " - 23:59:59";

          //例如：如果今天此刻时间为15:27:00 则选择时间范围为： 15:27:00 - 23:59:59

          //否则为：00:00:00 - 23:59:59
        }
      },
    },
  },
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