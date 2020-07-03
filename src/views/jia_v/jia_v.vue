<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">加V认证</div>
    </header>
    <div class="bu"></div>
    <!-- 内容块儿 -->
    <div class="card_one">
      <p class="p1">美妆达人认证</p>
      <p class="p2">适用于在美妆领域有一定的知名度或创作过高质量美妆内容的用户</p>
      <div class="ball" v-if="daren.Status === 'Normal'" >已认证</div>
      <div class="ball" v-else-if="daren.Status === 'UnAudit'" >待审核</div>
      <div class="ball" v-else-if="daren.Status === 'UnApprove'" @click="$router.push('/jia_v_framer')">未通过</div>
      <div class="ball" v-else @click="$router.push('/jia_v_daren')">去认证</div>
    </div>
    <div class="card_two" >
      <p class="p1">优质创作者认证</p>
      <p class="p2">适用于在某领域下持续贡献内容的用户。如在时尚、美食、才艺、摄影等其中一个或多个领域下创作过多篇优质内容</p>
      <div class="ball" v-if="framer.Status === 'Normal'">已认证</div>
      <div class="ball" v-else-if="framer.Status === 'UnAudit'" >待审核</div>
      <div class="ball" v-else-if="framer.Status === 'UnApprove'" @click="$router.push('/jia_v_framer')">未通过</div>
      <div class="ball" v-else  @click="$router.push('/jia_v_framer')" >去认证</div>
    </div>
    <div class="card_three" >
      <p class="p1">美妆专家认证</p>
      <p class="p2">适用于具有美肤相关职业资格证或附加身份的用户。如拥有护肤美容师资格证、皮肤管理师、执业医师证等证书持有者或相关赛事获奖者</p>
      <div class="ball" v-if="zhuanjia.Status === 'Normal'"  >已认证</div>
      <div class="ball" v-else-if="zhuanjia.Status === 'UnAudit'" >待审核</div>
      <div class="ball" v-else-if="zhuanjia.Status === 'UnApprove'" @click="$router.push('/jia_v_zhuanjia')">未通过</div>
      <div class="ball" v-else @click="$router.push('/jia_v_zhuanjia')"   >去认证</div>
    </div>
    <img class="title_bottom" src="../../assets/images/jia_v_title.png" alt />
    <div class="title_box">
      <div class="title_item">
        <img src="../../assets/images/jia_v_b1.png" alt />
        <p class="p1">独家标识</p>
        <p class="p2">享有专属标识彰显独特身份</p>
      </div>
      <div class="title_item">
        <img src="../../assets/images/jia_v_b2.png" alt />
        <p class="p1">优先推荐</p>
        <p class="p2">内容优先推荐，增加曝光快速涨粉</p>
      </div>
      <div class="title_item">
        <img class="img" src="../../assets/images/jia_v_b3.png" alt />
        <p class="p11">创作奖励</p>
        <p class="p2">平台根据所发布作品的阅读量创作者进行相应金额奖励</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
      daren:{},
      framer:{},
      zhuanjia:{}

    };
  },
  mounted(){
    // this.getuserinfo()
    this.getstatus()
  },
  methods: {
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        // this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"jia_v";
        console.log(url);
        this.$bridge.callhandler("closePage", url, data => {
          // 处理返回数据
        });
        this.$router.back();
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        this.$router.back();
      }
    },
    getstatus(){
      request.post(this.$api+'/mobile/MyPlusVCertification',{

      }).then(res=>{
          var arr=res.Data.ListData
          arr.forEach(item => {
             if(item.Type === '美妆达人认证'){
               this.daren=item
               console.log(this.daren)
             }else if(item.Type === '优质创作者认证'){
               this.framer=item
             }else if(item.Type === '美妆专家认证'){
               this.zhuanjia=item
             }
          });
      }).catch(err=>{

      })
    },
     // 获取个人信息
    getuserinfo() {
      request
        .post(this.$api + "/mobile/GetUserInfo")
        .then(res => {
          window.localStorage.setItem("mobile", res.Data.Mobile);
          window.localStorage.setItem("shenfen", res.Data.IdCardStatus);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
// 内容块儿
.card_one {
  position: relative;
  width: 670 / @base;

  background-image: linear-gradient(90deg, #9a4ce3 0%, #b8a6d4 100%);
  box-shadow: 0px 20 / @base 40 / @base 0px rgba(160, 92, 225, 0.25);
  border-radius: 10 / @base;
  margin: 64 / @base auto 0 auto;
  padding: 32 / @base 0 34 / @base 34 / @base;
  .p1 {
    font-size: 36 / @base;
    color: #ffffff;
    // font-family: "PingFangBold";
  }
  .p2 {
    width: 415 / @base;
    font-size: 26 / @base;
    color: #ffffff;
    margin-top: 18 / @base;
  }
  .ball {
    position: absolute;
    right: 2px;
    top: 40%;
    width: 160 / @base;
    height: 59 / @base;
    line-height: 59 / @base;
    text-align: center;
    background: #ffffff;
    box-shadow: 0 5 / @base 10 / @base 0 rgba(108, 46, 168, 0.14);
    border-radius: 29 / @base;
    font-size: 24 / @base;
    color: #9c52e2;
  }
}
.card_two {
  position: relative;
  width: 670 / @base;

  background-image: linear-gradient(90deg, #ff6297 0%, #ffa169 100%);
  box-shadow: 0px 20px 40px 0px rgba(255, 133, 124, 0.25);
  border-radius: 10 / @base;
  margin: 40 / @base auto 0 auto;
  padding: 32 / @base 0 34 / @base 34 / @base;
  .p1 {
    font-size: 36 / @base;
    color: #ffffff;
    // font-family: "PingFangBold";
  }
  .p2 {
    width: 415 / @base;
    font-size: 26 / @base;
    color: #ffffff;
    margin-top: 18 / @base;
  }
  .ball {
    position: absolute;
    right: 2px;
    top: 40%;
    width: 160 / @base;
    height: 59 / @base;
    line-height: 59 / @base;
    text-align: center;
    background: #ffffff;
    box-shadow: 0 5 / @base 10 / @base 0 rgba(108, 46, 168, 0.14);
    border-radius: 29 / @base;
    font-size: 24 / @base;
    color: #ff9774;
  }
}
.card_three {
  position: relative;
  width: 670 / @base;
  //   height: 280 / @base;
  background-image: linear-gradient(90deg, #4e90fd 0%, #52bbfe 100%);
  box-shadow: 0px 20 / @base 40 @base 0 @base rgba(81, 169, 254, 0.25);
  border-radius: 10 / @base;
  margin: 40 / @base auto 0 auto;
  padding: 32 / @base 0 34 / @base 34 / @base;

  .p1 {
    font-size: 36 / @base;
    color: #ffffff;
    // font-family: "PingFangBold";
  }
  .p2 {
    width: 415 / @base;
    font-size: 26 / @base;
    color: #ffffff;
    margin-top: 18 / @base;
  }
  .ball {
    position: absolute;
    right: 2px;
    top: 40%;
    width: 160 / @base;
    height: 59 / @base;
    line-height: 59 / @base;
    text-align: center;
    background: #ffffff;
    box-shadow: 0 5 / @base 10 / @base 0 rgba(108, 46, 168, 0.14);
    border-radius: 29 / @base;
    font-size: 24 / @base;
    color: #50aafe;
  }
}

// 下边的部分
.title_bottom {
  width: 45%;
  height: 30 / @base;
  margin: 105 / @base auto 83 / @base auto;
}
.title_box {
  width: 100%;
  padding: 0 44 / @base  120/@base 44 / @base;
  display: flex;
  justify-content: space-around;
  .title_item {
    width: 30%;
    text-align: center;
    img{
        width: 63/@base;
        height: 60/@base;
        background-size: 100% auto;
        margin: 0 auto;
    }
    .img{
        width: 50/@base;
        height: 80/@base;
        background-size: 100% auto;
        margin: 0 auto;
    }
    .p11{
        font-size: 28/@base;
        font-weight: bold;
        color: #333333;
        margin-top: 15/@base;
        text-align: center;
    }
    .p1{
        font-size: 28/@base;
        font-weight: bold;
        color: #333333;
        margin-top: 35/@base;
        text-align: center;
    }
    .p2{
      font-size: 22/@base;
      color: #666666;
    }
  }
}
</style>