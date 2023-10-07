<template>
  <div class="upload-file">
    <el-upload
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      drag
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      class="upload-file-uploader"
      ref="upload"
      v-if="!disabled"
    >
      <!-- 上传按钮 -->
      <el-button
        size="mini"
        icon="el-icon-upload2"
        class="uplpoad-button"
        type="text"
        >将文件拖到此处，或点击上传</el-button
      >
      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
        </template>
        的文件
      </div>
    </el-upload>

    <!-- 文件列表 -->
    <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
      id="ul-upload"
    >
      <li
        :key="file.uuid"
        class="el-upload-list__item ele-upload-list__item-content"
        v-for="(file, index) in fileList"
      >
        <div class="el-icon-document">
          <el-image
            style="width: 15px; margin-right: 5px"
            :src="
              require(`@/assets/img/file/${getFileType(file.fileName)}.png`)
            "
            alt=""
          />
          <div class="el-name">{{ file.fileName }}</div>
        </div>
        <div class="ele-upload-list__item-content-action">
          <div class="fileSize">{{ file.size }}kb</div>
          <div class="link">
            <el-link
              v-if="isShowLook"
              :underline="false"
              @click="handleLook(file)"
              type="primary"
              >预览</el-link
            >
            <el-link
              v-if="isShowLook"
              :href="`${baseUrl}${file.viewPath}`"
              :underline="false"
              :download="file.fileName"
              type="success"
              target="_blank"
              >下载</el-link
            >
            <el-link
              v-show="showDelete"
              :underline="false"
              @click="handleDelete(index)"
              type="danger"
              >删除</el-link
            >
          </div>
        </div>
      </li>
    </transition-group>

    <el-dialog
      :append-to-body="true"
      :visible.sync="visible"
      :fullscreen="true"
    >
      <!-- 图片预览 -->
      <el-image style="height" :src="imgurl" v-if="isType == 'img'"></el-image>
      <!-- word -->
      <div id="bodyContainer" v-if="isType == 'word'"></div>
      <!-- pdf -->
      <iframe
        v-if="isType == 'pdf'"
        :src="imgurl"
        width="100%"
        height="900px"
        class="file-reader file-reader__iframe"
      />
      <!-- excel -->
      <el-table
        v-if="isType == 'excel'"
        :data="excelTable"
        style="width: 100%"
        height="500px"
        border
      >
        <el-table-column
          v-for="(value, index) in tableThead"
          :key="index"
          :prop="value"
          :label="value"
        ></el-table-column>
      </el-table>
      <el-row class="sheet_list" v-if="isType == 'excel'">
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

      <!-- txt -->
      <pre class="previewer-content" v-if="isType == 'txt'">{{ content }}</pre>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { getToken } from "@/utils/auth";

import * as XLSX from "xlsx";
import { renderAsync } from "docx-preview";

export default {
  name: "fileUploads",
  props: {
    // 值
    value: [String, Object, Array],
    // 数量限制
    limit: {
      type: Number,
      default: 500,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 500,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => [
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "pdf",
        "txt",
        "png",
        "jpg",
        "jpeg",
      ],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
    // 是否显示删除
    showDelete: {
      type: Boolean,
      default: true,
    },
    // 按钮展示
    disabled: {
      type: Boolean,
      default: false,
    },
    // 按钮展示
    isShowLook: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadFileUrl: process.env.VUE_APP_BASE_API + "/common/upload/uploadImg", // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      fileList: [],
      visible: false,
      imgurl: undefined,
      txtUrl: null,
      isType: null,
      docxOptions: {
        className: "kaimo-docx-666", // string：默认和文档样式类的类名/前缀
        inWrapper: true, // boolean：启用围绕文档内容的包装器渲染
        ignoreWidth: false, // boolean：禁用页面的渲染宽度
        ignoreHeight: false, // boolean：禁止渲染页面高度
        ignoreFonts: false, // boolean：禁用字体渲染
        breakPages: true, // boolean：在分页符上启用分页
        ignoreLastRenderedPageBreak: false, // boolean：在 lastRenderedPageBreak 元素上禁用分页
        experimental: true, // boolean：启用实验功能（制表符停止计算）
        trimXmlDeclaration: true, // boolean：如果为true，解析前会从​​ xml 文档中移除 xml 声明
        useBase64URL: false, // boolean：如果为true，图片、字体等会转为base 64 URL，否则使用URL.createObjectURL
        useMathMLPolyfill: false, // boolean：包括用于 chrome、edge 等的 MathML polyfill。
        showChanges: false, // boolean：启用文档更改的实验性渲染（插入/删除）
        debug: false, // boolean：启用额外的日志记录
      },
      excelTable: [], //excel
      workbook: {}, //excel
      tableThead: [],
      content: null, //txt
      sheetActive: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1;
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组

          this.fileList = list.map((item) => {
            if (typeof item === "string") {
              item = {
                fileName: this.getFileName(item),
                savePath: item,
                viewPath: item,
                size: "未知",
              };
            } else {
              item;
            }
            item.uuid = item.uuid || new Date().getTime() + temp++;
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      //   NProgress.configure({ showSpinner: false, parent: "#ul-upload" });
      //   NProgress.start();
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传失败
    handleUploadError(err) {
      //   NProgress.done();
      //   NProgress.remove();
      this.$message.error("上传失败, 请重试");
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      this.$message.success("上传成功");

      this.fileList.push(res.data);
      //   this.$forceUpdate()

      NProgress.done();
      setTimeout(() => {
        //  NProgress.remove();
      }, 500);

      this.$emit("input", this.fileList);
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1);
      console.log(this.fileList);
      this.$emit("input", this.fileList);
    },
    // 获取文件名称
    getFileName(name) {
      if (name.lastIndexOf("/") > -1) {
        return name.slice(name.lastIndexOf("/") + 1).toLowerCase();
      } else {
        return "";
      }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        strs += list[i].url + separator;
      }
      return strs != "" ? strs.substr(0, strs.length - 1) : "";
    },
    //
    getFileType(fileName) {
      let fileType = "";
      if (fileName) {
        fileType = fileName.split(".")[fileName.split(".").length - 1];
      }
      const imgType = ["png", "jpg", "jpeg"];
      const imgTypeOk = this.showFileType(fileType, imgType);
      //图片
      if (imgTypeOk) {
        return "img";
      }

      const txtType = ["txt"];
      const txtTypeOk = this.showFileType(fileType, txtType);
      //文本
      if (txtTypeOk) {
        return "txt";
      }
      //word
      const wordType = ["doc", "docx"];
      const wordTypeOk = this.showFileType(fileType, wordType);
      if (wordTypeOk) {
        return "word";
      }
      //excel

      const excelType = ["xls", "xlsx"];
      const excelTypeOk = this.showFileType(fileType, excelType);

      if (excelTypeOk) {
        return "excel";
      }
      const pptType = ["ppt", "pptx"];
      const pptTypeOk = this.showFileType(fileType, pptType);

      if (pptTypeOk) {
        return "ppt";
      }
      const pdfType = ["pdf"];
      const pdfTypeOk =  this.showFileType(fileType, pdfType);

      if (pdfTypeOk) {
        return "pdf";
      }
      const htmlType = ["html",'htm'];
      const htmlTypeOk =  this.showFileType(fileType, htmlType);

      if (htmlTypeOk) {
        return "html";
      }

      return "other";
    },

    //预览
    handleLook(file) {
      let { fileName, savePath, viewPath } = file;
      let fileType = fileName.split(".")[fileName.split(".").length - 1];
      const openurl = this.baseUrl + viewPath;
      this.isType = null;
      this.imgurl = null;
      this.txtUrl = null;
      const imgType = ["png", "jpg", "jpeg"];
      const imgTypeOk = this.showFileType(fileType, imgType);
      //图片预览
      if (imgTypeOk) {
        this.isType = "img";
        this.imgurl = openurl;
        this.visible = true;
        return;
      }

      const txtType = ["txt", "html"];
      const txtTypeOk = this.showFileType(fileType, txtType);
      //文本
      if (txtTypeOk) {
        // console.log(fileType);
        // window.open(`${openurl}`);
        request({
          methods: "get",
          responseType: "arraybuffer",
          url: viewPath,
        }).then((bufferData) => {
          this.isType = "txt";
          const blob = new Blob([bufferData], {
            type: "text/plain",
          });

          const fileReader = new FileReader();
          fileReader.readAsText(blob, "utf-8");
          fileReader.onloadend = (e) => {
            this.content = fileReader.result || "";
            this.visible = true;
          };
        });

        return;
      }
      //word
      const wordType = ["doc", "docx"];
      const wordTypeOk = this.showFileType(fileType, wordType);

      if (wordTypeOk) {
        const docx = require("docx-preview");
        this.isType = "word";
        this.visible = true;

        request({
          methods: "get",
          responseType: "blob",
          url: viewPath,
        })
          .then((data) => {
            this.isType = "word";
            this.visible = true;

            this.docxRender(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }

      //pdf
      const pdfType = ["pdf"];
      const pdfTypeOk = this.showFileType(fileType, pdfType);

      if (pdfTypeOk) {
        this.isType = "pdf";
        this.imgurl = openurl;
        this.visible = true;
      }
      //excel
      const excelType = ["xls", "xlsx"];
      const excelTypeOk = this.showFileType(fileType, excelType);

      if (excelTypeOk) {
        request({
          methods: "get",
          responseType: "blob",
          url: viewPath,
        })
          .then((blob) => {
            this.isType = "excel";
            this.excelRender(blob);
            this.visible = true;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    //文件类型
    showFileType(fileType, typeArr) {
      return typeArr.some((type) => {
        if (fileType.indexOf(type) > -1) return true;

        return false;
      });
    },
    // 渲染docx
    docxRender(buffer) {
      let bodyContainer = document.getElementById("bodyContainer");
      renderAsync(
        buffer, // Blob | ArrayBuffer | Uint8Array, 可以是 JSZip.loadAsync 支持的任何类型
        bodyContainer, // HTMLElement 渲染文档内容的元素,
        null, // HTMLElement, 用于呈现文档样式、数字、字体的元素。如果为 null，则将使用 bodyContainer。
        this.docxOptions // 配置
      ).then((res) => {
        console.log("res---->", res);
      });
    },
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

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;

  color: inherit;
}
.upload-file-list .ele-upload-list__item-content {
  width: 32%;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
.upload-file-list {
  display: flex;
  //   justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .el-upload-list__item {
    width: 32%;
    margin-right: 10px;
    padding: 5px 10px;
    overflow: hidden;
    box-sizing: border-box;
    background: #fafafa;
    &:first-child {
      margin-top: 5px;
    }
    .el-icon-document {
      width: 100%;
      margin-top: 5px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      &::before {
        content: "";
      }

      .el-name {
        width: calc(100% - 20px);
        overflow: hidden;
        //   height: 15px;
        text-overflow: ellipsis;
        // display: -webkit-box;
      }
    }

    .ele-upload-list__item-content-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .fileSize {
        color: #969696;
      }
    }
  }
}
::v-deep .el-upload-dragger {
  height: auto;
  width: auto;
  border: 1px solid #55adff;
  border-radius: 0;
  padding: 5px 15px;
}

.sheet_list {
  margin-top: 10px;
  .sheet_item {
    padding: 5px 10px;
    margin-top: 10px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    background: #e6e6e6;
    border-left: 1px solid #999999;
    &:last-child {
      border-right: 1px solid #999999;
    }
    &.sheetActive {
      background: #ffffff;
      color: #217389;
    }
  }
}
::v-deep .el-dialog__body {
  height: calc(100vh - 60px);
  overflow: hidden;
}
</style>