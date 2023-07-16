<template>
  <div style="width: 100%;height:100%">
    <el-table :data="excelTable" style="width: 100%" height="500px" border>
      <el-table-column
        v-for="(value, index) in tableThead"
        :key="index"
        :prop="value"
        :label="value"
      ></el-table-column>
    </el-table>
    <el-row class="sheet_list">
      <el-col
        :span="2"
        :class="{ sheetActive: sheetActive === item }"
        class="sheet_item"
        :key="item"
        v-for="item in workbook.SheetNames"
        @click.native="getTable(item)"
        >{{ item }}</el-col
      >
    </el-row>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      excelTable: [], //excel
      workbook: {}, //excel
      tableThead: [],
    };
  },
  methods: {
    // 渲染excel
    excelRender(blob) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = (evt) => {
        let ints = new Uint8Array(evt.target.result); //要使用读取的内容，所以将读取内容转化成Uint8Array
        ints = ints.slice(0, blob.size);
        let workBook = XLSX.read(ints, { type: "array" });
        let sheetNames = workBook.SheetNames;
        let sheetName = sheetNames[0];
        this.sheetActive = sheetName;
        let workSheet = workBook.Sheets[sheetName];

        this.workbook = workBook;

        //获取Excle内容，并将空内容用空值保存
        let excelTable = XLSX.utils.sheet_to_json(workSheet, {
          defval: "",
        });

        // 获取Excel头部
        let tableThead = Array.from(Object.keys(excelTable[0])).map((item) => {
          return item;
        });
        this.tableThead = tableThead;
        this.excelTable = excelTable;
          console.log(tableThead);
      };
    },
    // 解析xlsx数据为table
    getTable(sheetName) {
      let excelTable = XLSX.utils.sheet_to_json(
        this.workbook.Sheets[sheetName],
        { defval: "" }
      );
      this.sheetActive = sheetName;
      this.excelTable = excelTable;
      console.log(this.excelTable);
      // 获取Excel头部
      let tableThead = Array.from(Object.keys(this.excelTable[0])).map(
        (item) => {
          return item;
        }
      );
      this.tableThead = tableThead;
      this.$forceUpdate();

      //    console.log(tableThead);
    },
  },
};
</script>

<style>
</style>