<template>
  <div class="home">
    <imageUploads></imageUploads>
    <el-button class="" @click="websocketSend()">点击</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { WebsocketMixin } from "@/mixins/WebsocketMixin";
export default {
  name: "HomeView",
  mixins: [WebsocketMixin],
  data() {
    return {};
  },
  methods: {
    timeChange(value) {},
  },
};
</script>
