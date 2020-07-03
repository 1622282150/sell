<template>
  <div class="contain">
  
 <input type="file" @change="handlerUpload($event)" />

    
  </div>
</template>
<script>
/*eslint-disable*/
import Head from "../components/Header.vue";
import request from "@/utils/request";
export default {
  components: {
    Head
  },data(){
    return{

    }
  },
  methods:{
     handlerUpload(event) {
       let file = event.target.files[0];
      let param = new FormData();
      param.append("file", file, file.name);
      // console.log(param.get("file"));
      let config = {
        headers: { "Content-Type": "multipart/form-data;" }
      };
      request
        .post(this.$api + "/mobile/UploadUserFaceImg", param, config)
        .then(res => {
          
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>
<style lang="less" scoped>
@desgin: 1080;
@base: 108rem;
</style>


