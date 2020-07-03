<template>
  <div>
    <header>
      <i @click="back" class="iconfont icon-zuojiantou"></i>
      <div class="head">意见反馈</div>
    </header>
    <div class="box1">
      <div class="boxtitle">
        <img src="../../assets/images/fankui_neirong.png" alt />
        <p>问题和意见</p>
      </div>
      <textarea v-model="message" placeholder="请输入你的宝贵意见~" class="text" name id cols="30" rows="10"></textarea>
    </div>
    <div class="box2">
      <div class="boxtitle">
        <img src="../../assets/images/fankui_upload.png" alt />
        <p>上传图片</p>
      </div>
      <div class="img_box">
        <van-uploader :after-read='after_fale' v-model="fileList" multiple :max-count="3" />
      </div>
    </div>
    <div class="box3">
        <div class="boxtitle">
        <img src="../../assets/images/fankui_upload.png" alt />
        <p>联系方式(选填)</p>
      </div>
      <input  type="text" v-model="tel" placeholder="请输入你的手机号/邮箱">
    </div>
    <div class="bottom1" v-if="!issuccess" @click="no">点击提交</div>
    <div class="bottom2" v-else @click="tijiao">点击提交</div>
  </div>
</template>

<script>
import { Uploader,Toast } from "vant";
export default {
  data() {
    return {
      message:'',
      tel:'',
      issuccess:false,
      fileList: []
    };
  },
   watch: {
   message() {
      if (!this.message.length) {
        this.issuccess = false;
      } else {
        this.issuccess = true;
      }
    }
  },
  methods:{
    back(){
     console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back(-1)
      }
    },
    no(){
        Toast('信息不完整')
    },
    tijiao(){
        Toast('提交成功')
        this.$router.push('/setting')
    },
    after_fale(file){
          console.log(file)
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
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
.box1 {
  width: 670 / @base;
  height: 359 / @base;
  margin: 31 / @base 40 / @base;
  .text {
    margin-top: 29 / @base;
    width: 670 / @base;
    height: 300 / @base;
    max-height: 300 / @base;
    font-size: 28 / @base;
    color: #aaaaaa;
    background: #eeeeee;
    padding:0 48 / @base;
    border: 1px solid #d2d2d2;
  }
  // background:red;
  .boxtitle {
    display: flex;
    width: 100%;
    height: 32 / @base;
    // background:blue;
    img {
      width: 30 / @base;
      height: 32 / @base;
      background-size: 100% 100%;
    }
    p {
      line-height: 32 / @base;
      font-size: 30 / @base;
      font-weight: normal;
      color: #333333;
      margin-left: 17 / @base;
    }
  }
}
.box2 {
  width: 670 / @base;
//   height: 359 / @base;
  margin: 31 / @base 40 / @base;
  .boxtitle {
    display: flex;
    width: 100%;
    height: 32 / @base;
    // background:blue;
    img {
      width: 30 / @base;
      height: 32 / @base;
      background-size: 100% 100%;
    }
    p {
      line-height: 32 / @base;
      font-size: 30 / @base;
      font-weight: normal;
      color: #333333;
      margin-left: 17 / @base;
    }
  }
  .img_box {
    margin-top: 34 / @base;
    width: 100%;
    max-width: 100%;
    height: 160/ @base;
    // background: red;
  }
}

.box3{
    width:670 / @base;
    margin:49/@base auto;
    input{
        margin-top: 27/@base;
        width: 670/@base;
        height: 70/@base;
        line-height: 70/@base;
        background:#ffffff;
        border-radius: 5/@base;
        border: 1px solid #d2d2d2;
        padding: 0 51/@base;
        font-size: 28/@base;
        color: #a9a9a9;
    }
 .boxtitle {
    display: flex;
    width: 100%;
    height: 32 / @base;
    // background:blue;
    img {
      width: 30 / @base;
      height: 32 / @base;
      background-size: 100% 100%;
    }
    p {
      line-height: 32 / @base;
      font-size: 30 / @base;
      font-weight: normal;
      color: #333333;
      margin-left: 17 / @base;
    }
  }
}
.bottom1 {
 
  width:400 / @base;
  height: 80 / @base;
  line-height: 80 / @base;
  text-align: center;
  border-radius: 40 / @base;
  margin: 135 / @base auto;
  background: #b9b5c0;
  color: #ffffff;
  font-size: 30 / @base;
  font-weight: bold;
  // font-family: "PingFangRegular";
}
.bottom2 {
 
  width: 400 / @base;
  height: 80 / @base;
  line-height: 80 / @base;
  text-align: center;
  border-radius: 40 / @base;
  margin: 135 / @base auto;
  background: #b695e9;
  color: #ffffff;
  font-size: 30 / @base;
  font-weight: bold;
  // font-family: "PingFangRegular";
}
</style>