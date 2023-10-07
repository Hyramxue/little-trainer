<template>
  <!-- <FileUpload v-model="url"></FileUpload> -->
  <div class="ts-q">
    <div href="#" class="titlea" style="white-space: nowrap">复议材料：</div>
    <filetools v-model="url" :disabled="true"></filetools>
  </div>
</template>

<script>
import { getList } from "@/api/file";
export default {
  data() {
    return {
      url: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getList().then((ele) => {
        this.url = ele.rows.url;
      });
    },
  },
};
</script>

<style  >
.ts-q{
    display: flex;
}
  .titlea {
      font-weight: 800;
      font-size: 16px;
      margin-top: 10px;
    }
</style>