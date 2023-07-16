<template>
  <FileUpload v-model="url"></FileUpload>
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
        this.url=ele.rows.url
      });
    },
  },
};
</script>

<style>
</style>