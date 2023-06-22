<template>
  <div id="1">
   <notes v-model="check_active">是否选中</notes>
   <notes  v-model="asd">是否选中</notes>
   <el-row></el-row>
  </div>
</template>

<script>
import   notes from './notesElement.vue'
export default {
      components: { notes },
    props: {
   
  },
  computed: {
    
  
  },
  data(){
    return {
        check_active:true,
        asd:false,
    }
  }
 
};
</script>

 