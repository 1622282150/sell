<template>
  <div>
     <header>
      <i @click="$router.back()" class="iconfont icon-zuojiantou"></i>
      <div class="head">实名认证</div>
    </header>
    <div class="bu"></div>
     <div class="box">
       <div class="box_item" @click="jvjiao">
         <p>真实姓名</p>
         <input type="text"  v-model="name" ref="inp" placeholder="请输入您的真实姓名" >
       </div>
        <div class="box_item">
         <p>证件类型</p>
         <div class="idcard">身份证</div>
       </div>
       <div class="box_item2">
           <p class="real">证件照片</p>
           <img class="img1" :src="imge" alt="">
           <input type="file" @change="handlerUpload($event)" class="input1">
           <!-- <div class="p1">请上传身份证正面</div> -->
           <img class="img2"  :src="imge1" alt="">
           <input type="file" @change="handlerUpload1($event)" class="input2">
           <!-- <div class="p2">请上传身份证反面</div> -->
       </div>
    </div>
    <div class="bottom1" v-if="same">确认提交</div>
    <div class="bottom2" @click="con" v-else>确认提交</div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
        imge:require('../../../assets/images/请上传身份证正面.png'),
        imge1:require('../../../assets/images/请上传身份证反面.png'),
        same:true,
        name:'',
    };
  },
  mounted(){
   
  },
  watch:{
    name(){
      if(this.name != '' && this.imge != '' && this.imge1 != '' ){
        this.same=false
      }else{
        this.same=true
      }
    }
  },
  methods:{
    jvjiao(){
     this.$refs.inp.focus()
    },
    con(){
      console.log('wozai')
      request.post(this.$api+'/mobile/UpdateIdCardImg',{
        IdCardFrontImg:this.imge,
        IdCardBackImg:this.imge1
      }).then(res=>{
        if(res.IsSuccess){
          this.$router.back()
        }
      }).catch(err=>{

      })
    },
    handlerUpload(event){
       let file = event.target.files[0];
      console.log(file);
      if (file == undefined) {
        Toast("未选择图片");
      } else {
        console.log("选择了");
        let formData = new FormData();
        // let fileName = `${+new Date()}.${fileType}`;
        let fileName = file.name;
        formData.append("FileType", "ImageUser");
        formData.append("FileName", fileName);
        formData.append("file", file);
        let config = {
          headers: { "Content-Type": "multipart/form-data;" }
        };
        request
          .post(this.$api + "/AppFile/UploadAttachment", formData, config)
          .then(res => {
            if (res.IsSuccess) {
              console.log(res.Data);
              this.imge='http://test1.merrychange.net' + res.Data.Url
            } else {
              Toast(res.Message);
            }
          })
          .catch(err => {});
      }
    },
     handlerUpload1(event){
       let file = event.target.files[0];
      console.log(file);
      if (file == undefined) {
        Toast("未选择图片");
      } else {
        console.log("选择了");
        let formData = new FormData();
        // let fileName = `${+new Date()}.${fileType}`;
        let fileName = file.name;
        formData.append("FileType", "ImageUser");
        formData.append("FileName", fileName);
        formData.append("file", file);
        let config = {
          headers: { "Content-Type": "multipart/form-data;" }
        };
        request
          .post(this.$api + "/AppFile/UploadAttachment", formData, config)
          .then(res => {
            if (res.IsSuccess) {
              console.log(res.Data);
              this.imge1='http://test1.merrychange.net' + res.Data.Url
            } else {
              Toast(res.Message);
            }
          })
          .catch(err => {});
      }
    }
  },
};
</script>
<style scoped lang='less'>
@base:75rem;
header {
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 30 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    // position: fixed;
    // top: 0;
    width: 100%;
    height: 100 / @base;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
  }
}
.bu{
  width: 100%;
  height: 15/@base;
  background: #eeeeee;
}
.box{
    position: relative;
    width: 100%;
    height: 921/@base;
    // background:red;
  
    .err{
        display: flex;
        justify-content: center;
        width: 100%;
        
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 0;
        img{
            display: inline-block;
            width: 20/@base;
            height: 20/@base;
            background-size: 100% 100%;
            margin:auto 0;
        }
        p{  margin-left: 10/@base;
            color: #bb0000;
            font-size: 24/@base;
            font-weight: normal;
        }
    }
    .box_item{
        display: flex;
        width: 100%;
        height: 90/@base;
        border-bottom: 1px solid #e6e6e6;
        padding: 0 40/@base;
        p{
          line-height: 90/@base;
          // font-family: 'PingFangRegular';
          font-size: 30/@base;
          font-weight: normal;
          font-stretch: normal;
          color: #333333;
        }
        input{
         width: 376/@base;
         height: 40/@base;
         margin-top: 25/@base;
         margin-left: 31/@base;
        font-size: 30/@base;
        color: #a6a6a6;
        }
        .idcard{
        height: 40/@base;
        margin-top: 25/@base;
        margin-left: 31/@base;
        font-size: 30/@base;
        color: #828482;
        }
    }
    .box_item2{
        position: relative;
        width: 100%;
        height: 700/@base;
        // background:red;
        .real{
          position: absolute;
          left: 42/@base;
          top: 31/@base;
          font-size: 30/@base;
          color: #333333;
        }
        .img1{
            position: absolute;
            top: 31/@base;
            left: 189/@base;
            width: 467/@base;
            height: 280/@base;
            background-size: 100% 100%;
        }
        .img2{
            position: absolute;
            top:360/@base;
            left: 189/@base;
            width: 467/@base;
            height: 280/@base;
            background-size: 100% 100%;
        }
        .input1{
            opacity: 0;
            z-index: 1;
           position: absolute;
            top: 31/@base;
            left: 189/@base;
            width: 467/@base;
            height: 280/@base;
        }
        .input2{
            opacity: 0;
            z-index: 1;
            position: absolute;
            top:360/@base;
            left: 189/@base;
            width: 467/@base;
            height: 280/@base;
        }
        .p1{
            position: absolute;
            top: 320/@base;
            left: 331/@base;
            font-size: 22/@base;
            color: #6b6b6b;
            font-weight: bold;
        }
        .p2{
            position: absolute;
            top: 650/@base;
            left: 331/@base;
            font-size: 22/@base;
            color: #6b6b6b;
            font-weight: bold;
        }
    }
}
  .bottom1{
        width: 601/@base;
        height: 80/@base;
        line-height: 80/@base;
        text-align: center;
        border-radius: 40/@base;
        margin: 35/@base auto;
        background: #b9b5c0;
        color: #ffffff;
        font-size: 30/@base;
        font-weight: bold;
        // font-family: 'PingFangRegular';
    }
      .bottom2{
        width: 601/@base;
        height: 80/@base;
        line-height: 80/@base;
        text-align: center;
        border-radius: 40/@base;
        margin: 35/@base auto;
        background:#b695e9;
        color: #ffffff;
        font-size: 30/@base;
        font-weight: bold;
        // font-family: 'PingFangRegular';
    }
</style>