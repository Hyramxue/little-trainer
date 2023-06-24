<template>
  <el-card>
    <el-row style="margin-bottom: 20px" :gutter="10">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addItem"
          >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-radio-group @change="clickRideo" v-model="radio" size="mini">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button :label="7">7天</el-radio-button>
          <el-radio-button :label="10">10天</el-radio-button>
          <el-radio-button :label="30">30天</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      height="calc(100% - 100px )"
      v-loading="tableLoading"
    >
      <el-table-column type="index" label="序号" align="center" width="50px">
      </el-table-column>
      <el-table-column prop="name" label="名字" align="center">
      </el-table-column>
      <el-table-column prop="img" label="图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="appUrl + scope.row.img"
            :preview-src-list="[appUrl + scope.row.img]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="productionDate" label="生产日期" align="center">
      </el-table-column>
      <el-table-column prop="expirationDate" label="到期时间" align="center">
      </el-table-column>
      <el-table-column prop="daynum" label="距今" align="center">
        <template slot-scope="scope">
          <div
            :style="{
              color: tableToToday(scope.row.expirationDate) < 7 ? 'red' : '',
            }"
          >
            {{ tableToToday(scope.row.expirationDate) }}天
          </div>
        </template>
      </el-table-column>
    <el-table-column   label="数量" align="center" prop="num"  width="50px">
         <template slot-scope="scope">
         {{scope.row.num||'---'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handle(scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :page.sync="queryParams.offset"
      :limit.sync="queryParams.limit"
      @pagination="handleCurrentChange"
      :total="total"
    >
    </pagination>

    <el-dialog
      title="新增"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="500px"
    >
      <el-row>
        <el-form :model="form" label-width="80px" ref="form">
          <el-col>
            <el-form-item label="名字">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="图片">
              <image-upload :isShowTip="false" v-model="form.img" />
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="生产日期">
              <el-date-picker
                v-model="form.productionDate"
                type="datetime"
                placeholder="选择生产日期"
                default-time="12:00:00"
                @change="expirationDate"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="18">
            <el-form-item label="保质期">
              <el-input-number
                @change="expirationDate"
                v-model="form.days"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label-width="0">
              <el-select
                @change="expirationDate"
                v-model="form.daysUnit"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="到期时间">
              <span v-text="form.expirationDate"></span>
            </el-form-item>
            <el-form-item label="距今">
              <span>{{
                form.toToday ? form.toToday + "天" : form.toToday
              }}</span>
            </el-form-item>
                <el-col :span="18">
            <el-form-item label="数量">
              <el-input-number
            
                v-model="form.num"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
import { addItem, getList, getNow,handleItem } from "@/api/food";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      queryParams: {
        offset: 1,
        limit: 10,
      },
      form: { daysUnit: "month" },
      dialogFormVisible: false,
      options: [
        {
          value: "day",
          label: "天",
        },
        {
          value: "month",
          label: "月",
        },
        {
          value: "year",
          label: "年",
        },
      ],
      tableLoading: false,
      radio: "",
    };
  },
  created() {
    this.getList(this.radio);
  },
  methods: {
    handleCurrentChange(val) {
      this.queryParams.offset = val.page;
      this.queryParams.limit = val.limit ? val.limit : 10;

      this.getList(this.radio);
    },
    addItem(val) {
      this.dialogFormVisible = true;
    },
    expirationDate() {
      // console.log(this.form.productionDate);
      // console.log(this.form.days);
      // console.log(this.form.daysUnit);
      if (this.form.productionDate && this.form.days && this.form.daysUnit) {
        this.form.expirationDate = dayjs(this.form.productionDate)
          .add(this.form.days, this.form.daysUnit)
          .format("YYYY-MM-DD HH:mm:ss");
        const date1 = dayjs(this.form.expirationDate);
        this.form.toToday = date1.diff(new Date(), "day");
        this.$forceUpdate();
      }
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id) {
          }

          this.form.productionDate = dayjs(this.form.productionDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );

          this.form.expirationDate = dayjs(this.form.expirationDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          addItem(this.form).then((res) => {
            if (res.code == 200) {
              this.dialogFormVisible = false;
              this.form = { daysUnit: "month" };
              this.$message.success("添加成功");
              this.getList();
            } else {
              this.$notify.error({
                title: "错误",
                message: res.message,
              });
            }
          });
        }
      });
    },
    cancel() {
      //  this.$refs['form'].resetFields();
      this.resetFields();
      this.dialogFormVisible = false;
    },
    resetFields() {
      this.form = { daysUnit: "month" };
    },
    getAllList() {
      this.tableLoading = true;
      getList(this.queryParams).then((res) => {
        this.tableData = res.results;
        this.total = res.total;
        this.tableLoading = false;
      });
    },
    tableToToday(expirationDate) {
      const date1 = dayjs(expirationDate);
      return date1.diff(new Date(), "day");
    },
    clickRideo(day) {
      this.queryParams.offset = 1;
      this.queryParams.limit = 10;
      this.getList(day);
    },
    getList(day) {
      if (day) {
        this.getNow(day);
      } else {
        this.getAllList();
      }
    },
    getNow(day) {
      this.tableLoading = true;
      var offset = this.queryParams.offset;
      var limit = this.queryParams.limit;
      getNow({ day, limit, offset }).then((res) => {
        this.tableData = res.results;
        this.total = res.total;
        this.tableLoading = false;
      });
    },
    handle(row){
 
        handleItem(row.id).then(async   res=>{
            // console.log(res.id);
                await this.getList(this.radio);
                if (res.code==200) {
                     await this.$message.success(res.message)  
                }else{
                     await this.$message.info(res.message)  
                }                         
        })
    }
  },
  watch: {
    dialogFormVisible(curVal) {
      if (curVal) {
        window.onbeforeunload = function (params) {
            return "不可以"
        }
       
      }else{
          window.onbeforeunload =false
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.el-card {
  //   width:calc(100% - 40px);
  //   margin: 20px auto;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  //  height: 100%;
  ::v-deep .el-card__body {
    // height: calc(100% - 40px);
    height: 100%;
    box-sizing: border-box;
  }
}
</style>