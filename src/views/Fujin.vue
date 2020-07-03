<template>
  <div class="contain">
    <Head>
      <span>测试</span>
    </Head>
     <!-- <div class="box"><span style="color:blue">请输入接口名:</span><input type="text" style="background:red"  v-model="tel"></div> -->
     <input class="shangchuan" type="file" @change="handlerUpload($event)" />
  </div>
</template>
<script>
/*eslint-disable*/
import Head from "../components/Header.vue";
import request from '@/utils/request'
export default {
  components: {
    Head
  },
  data(){
    return{
       tel:''
    }
  },
  methods:{
    // 头像上传放法
    handlerUpload(event) {
      let file = event.target.files[0];
      console.log(file);
      if(file.type === 'video/mp4'){
        Toast('不支持视频类型')
      }else{
        let formData = new FormData();
        formData.append("file", file);
        let fileName = file.name;
        formData.append("FileType", "ImageUser");
        formData.append("FileName", fileName);
      let config = {
        headers: { "Content-Type": "multipart/form-data;" }
      };
      request
        .post(this.$api +'/mobile/PostUserFaceImg', formData, config)
        .then(res => {
          if (res.IsSuccess) {
            console.log(res.Data)
             
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
      }
    },
  }
};
</script>
<style lang="less" scoped>

@base: 75rem;
.shangchuan{
  width: 100%;
}
.box{
  width: 100%;
  font-size: 35/@base;
  display: flex;
  input{
    font-size: 28/@base;
    display: block;
    width: 70%;
  }
}
</style>


