<template>
  <div id="container"></div>
</template>

<script>
import * as ml5 from "@/assets/js/ml5.min.js";

export default {
  data() {
    return {
   
    };
  },
  methods: {
    init() {
     
    },
  },

  mounted() {
    console.log(ml5);
  },
};
</script>

<style>
#container {
  height: 100%;
  width: 100%;
}
</style>