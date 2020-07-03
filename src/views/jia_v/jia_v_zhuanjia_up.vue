<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">美妆专家认证</div>
    </header>
    <div class="bu"></div>
    <!-- 输入框 -->
    <div class="hang" @click="jvjiao1">
      <span class="lab">*</span>
      <span class="title">单位/组织:</span>
      <input type="text" ref="ip1" v-model="pingtai" placeholder="请输入真实的组织或组织名" />
    </div>
     <div class="hang" @click="jvjiao2">
      <span class="lab">*</span>
      <span class="title">职位/称号:</span>
      <input type="text" ref="ip2" v-model="user" placeholder="请输入真实的职位或称号" />
    </div>
    <div class="hang">
      <span class="lab" style="opacity:0">*</span>
      <span class="title">补充信息:</span>
    </div>
     <textarea v-model="msg" class="text" placeholder="请输入更多信息以提高认证通过率,限制50字以内.例如:前xx医院皮肤专家;曾获xx奖项"></textarea>




     <div class="hang">
      <span class="lab">*</span>
      <span class="title">上传证明材料:</span>
    </div>
    <div class="up">
       <img v-if="!img.length" src="../../assets/images/jia_v_jia.png"  alt="">
       <img v-else :src="'http://test1.merrychange.net'+img" alt="">
       <p v-show="!img.length">提交美肤相关的职业资格证书,提供在职证明等材料可提高通过率</p>
       <input @change="handlerUpload($event)" type="file">
    </div>
    <div class="wancheng" @click="shang">完成</div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      pingtai:'',
      user:'',
      msg:'',
      img:'',
       type:''
    };
  },
  mounted(){
     this.type=this.$route.query.title
  },
  methods:{
    jvjiao1(){
      this.$refs.ip1.focus()
    },
    jvjiao2(){
       this.$refs.ip2.focus()
    },
    goback(){
      this.$router.back()
    },
     shang() {
      if (this.pingtai != "" && this.user != "") {
        request
          .post(this.$api + "/mobile/AddPlusVCertification", {
            Name: "美妆专家认证",
            PortalOrGroup: this.pingtai,
            Img1: this.img ,
            Type:'美妆专家认证',
            JobOrName:this.user,
            OtherType:this.type
          })
          .then(res => {
            if(res.IsSuccess){
              this.$router.back()
            }else{
              Toast(res.Message)
            }
          })
          .catch(err => {});
      } else {
        Toast("信息不完整");
      }
    },
     handlerUpload(event) {
      let file = event.target.files[0];
      console.log(file);
      let formData = new FormData();
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
            this.img = res.Data.Url;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // background:#B694E8;
  z-index: 1;
  i {
    position: fixed;
    left: 30 / @base;
    top: 30 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100 / @base;
    background: #fff;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.hang{
  display: flex;
  width: 90%;
  height: 90/@base;
  padding: 25/@base 5%;
  .lab{
    display: block;
    color: red;
    font-size: 30/@base;
    font-weight: bold;
    margin-right: 10/@base;
  }
  .title{
    position: relative;
    top: -2px;
    display: block;
    font-size: 30/@base;
    color: #262525;
  }
  input{
    margin-left: 20/@base;
    display: block;
    width: 50%;
    height: 40/@base;
    font-size: 24/@base;
  }
}
.up{
  position: relative;
  width: 340/@base;
  height: 220/@base;
  border-radius: 15/@base;
  margin-left: 40/@base;
  img{
    position:absolute;
    left: 0;
    top: 0;
    width: 340/@base;
    height: 220/@base;
    background-size: 100% 100%;
    border-radius: 15/@base;
  }
  p{
    position: absolute;
    left: 40/@base;
    bottom:15/@base;
    width: 285/@base;
    font-size: 22/@base;
    color: #6b6b6b;
  }
  input{
    position:absolute;
    left: 0;
    top: 0;
    width: 340/@base;
    height: 220/@base;
    border-radius: 15/@base;
    z-index: 33;
    opacity: 0;
  }
}
.wancheng{
  width: 597/@base;
  height: 80/@base;
  line-height: 80/@base;
  background: #b695e9;
  border-radius: 40/@base;
  text-align: center;
  color: #fff;
  font-size: 30/@base;
  font-weight: bold;
  margin: 213/@base auto 0 auto;
}
.text{
    width: 90%;
    margin: 0 5%;
    height: 200/@base;
    padding: 20/@base;
    font-size: 22/@base;
    background:#e9e3f2;
    border-radius: 10/@base;
}

</style>