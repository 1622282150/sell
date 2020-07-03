<template>
  <div v-if="alllist">
    <van-action-sheet v-model="showfen" title="请选择方式">
      <div class="towechat">
        <div @click="towechat" style="font-size:20px" class="fenkuai-son">
          <i
            class="iconfont icon-weixin"
            style="display:blcok;margin-top:10px;font-size:40px;height:60%;color:#03cf3c"
          ></i>
          <span style="display:block;font-size:11px;">微信</span>
        </div>
        <div @click="tofriend" style="font-size:20px" class="fenkuai-son">
          <i
            class="iconfont icon-pengyouquan"
            style="display:blcok;margin-top:10px;font-size:40px;height:60%;color:#03cf3c"
          ></i>
          <span style="display:block;font-size:11px;">朋友圈</span>
        </div>
      </div>
    </van-action-sheet>

    <div class="header">
      妆容报告
      <img @click="goback" class="img1" src="../../assets/images/newfan.png" alt />
      <i @click="showfen = true" class="iconfont icon-fenxiang2 "></i>
      <!-- <img @click="showfen = true" class="img2" src="../../assets/images/recode2_fenxiang.png" alt /> -->
      <!-- <img class="img3" src="../../assets/images/recode2_jilu.png" alt /> -->
    </div>
    <div class="jicheng"></div>
    <!--头部分数 -->
    <div  class="gradebox">
      <img :src="alllist.UserPhoto" alt />
      <div class="gradebox_left">
        <p class="gradebox_left_top">{{alllist.UserName | communityname}}</p>
        <p class="gradebox_left_bottom">{{alllist.Time |dateFmt('YYYY-MM-DD HH:mm')}}</p>
      </div>
      <div class="gradebox_middle">
        <p
          class="gradebox_middle_top"
          :class="alllist.beauty < 80?'gradebox_active_low':'gradebox_active_up'"
        >{{alllist.beauty}}</p>
        <p
          class="gradebox_middle_bottom"
          :class="alllist.beauty < 80?'gradebox_active_low':'gradebox_active_up'"
        >分数</p>
      </div>
      <div class="gradebox_right">
        <p class="gradebox_right_top">{{alllist.age}}</p>
        <p class="gradebox_right_bottm">年龄</p>
      </div>
    </div>
    <!-- 中间图片 -->
    <img  class="face" src="../../assets/images/faceface.png" alt />
    <div  class="main_title">
      <div>#{{alllist.skincolorhuedelta}}皮肤</div>
      <div>#肤色{{alllist.skincolorlevel}}</div>
      <div>#{{alllist.race}}</div>
    </div>
    <!-- 盒子 -->
    <div   class="box" >
      <div @click="to_item('底妆')" :style="backgroundDiv1" class="box_item">
        <p class="p">底妆</p>
        <img src="../../assets/images/new_showcase_di2.png" alt />
        <div><p>{{alllist.Skin.Tag}}</p></div>
      </div>
      <div @click="to_item('面部修容')" :style="backgroundDiv2" class="box_item">
        <p class="p">面部修容</p>
        <img src="../../assets/images/new_showcase_mian.png" alt />
        <div><p>{{alllist.Face.Tag}}</p></div>
      </div>
      <div @click="to_item('眉妆')" :style="backgroundDiv3" class="box_item">
        <p class="p">眉妆</p>
        <img src="../../assets/images/new_showcase_mei.png" alt />
        <div><p>{{alllist.Eyebrow.Tag}}</p></div>
      </div>
      <div @click="to_item('眼妆')"  :style="backgroundDiv4" class="box_item">
        <p class="p">眼妆</p>
        <img src="../../assets/images/new_showcase_yan.png" alt />
        <div><p >{{alllist.Eye.Tag}}</p></div>
      </div>
      <div @click="to_item('鼻妆')" :style="backgroundDiv5" class="box_item">
        <p class="p">鼻妆</p>
        <img src="../../assets/images/new_showcase_bi.png" alt />
        <div><p>{{alllist.Nose.Tag}}</p></div>
      </div>
      <div @click="to_item('唇妆')" :style="backgroundDiv6" class="box_item">
        <p class="p">唇妆</p>
        <img src="../../assets/images/new_showcase_chun.png" alt />
        <div>
          <p>{{alllist.Mouth.Tag}}</p>
        </div>
      </div>
    </div>
    <grade></grade>
  </div>
</template>

<script>
import grade from '@/components/GradePopup'
import request from "@/utils/request";
export default {
  components:{
    grade
  },
  data() {
    return {
      id:0,
      backgroundDiv1: {
        backgroundImage:
          "url(" + require("../../assets/images/new_showcase_b1.png") + ")"
      },
      backgroundDiv2: {
        backgroundImage:
          "url(" + require("../../assets/images/new_showcase_b2.png") + ")"
      },
      backgroundDiv3: {
        backgroundImage:
          "url(" + require("../../assets/images/new_showcase_b3.png") + ")"
      },
      backgroundDiv4: {
        backgroundImage:
          "url(" + require("../../assets/images/new_showcase_b4.png") + ")"
      },
      backgroundDiv5: {
        backgroundImage:
          "url(" + require("../../assets/images/new_showcase_b5.png") + ")"
      },
      backgroundDiv6: {
        backgroundImage:
          "url(" + require("../../assets/images/new_showcase_b6.png") + ")"
      },
      showfen: false, //分享弹框
      alllist: '',//所有数组
    };
  },
  created() {
    this.gettoken();
    this.getrec();
  },
  mounted() {
    
  },
  methods: {
    to_item(type){
      this.$router.push({
        path:'/new_showcase_item',
        query:{
          type:type
        }
      })
    },
    getrec() {
      request
        .post(this.$api + "/mobile/GetUserFaceReportInfoNew", {

        }).then(res => {
          this.alllist = res.Data;
          this.id=res.Data.id
        })
        .catch(err => {});
    },
    // 分享方法
    towechat() {
      var name = "妆容报告请查收~";
      var description = "关注细节,才能变得更精致哦~";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        window.android.shareToWechat(
          window.location.href + "?id="+this.id,
          name,
          description,
          "wechat"
        );
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        var params = {
          address: window.location.href,
          name: name,
          description: description,
          type: "wechat"
        };
        this.$bridge.callhandler("shareToWechat", params, data => {
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
      var name = "妆容报告请查收~";
      var description = "关注细节,才能变得更精致哦~";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.shareToWechat(window.location.href,name,description,'朋友圈')
        //  var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'FriendCircle'
        // }
        // console.log(data)
        window.android.shareToWechat(
          window.location.href + "?id="+this.id,
          name,
          description,
          "FriendCircle"
        );
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        //  window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'朋友圈');
        var params = {
          address: window.location.href,
          name: name,
          description: description,
          type: "FriendCircle"
        };
        console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          // 处理返回数据
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    gettoken() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // console.log("我是安卓");
        let result = window.android.getToken("");
        // Dialog.alert({
        //   message: "安卓返回来的token:" + result
        // }).then(() => {
        //   // on close
        // });
        window.localStorage.setItem("token", result);
      } else if (isiOS) {
        // console.log("我是要去ios");
        this.$bridge.callhandler("getToken", "", response => {
          // 处理返回数据
          let token = JSON.stringify(response);
          // Dialog.alert({
          //   message: "ios返回来的token:" + token
          // }).then(() => {
          //   // on close

          // });
          window.localStorage.setItem("token", JSON.parse(token));
        });
      } else {
        // console.log("我不是安卓也不是ios,我在哪");
      }
    },
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        window.android.goToHome();
      } else if (isiOS) {
        console.log("我是要去ios");
        window.location.href = "mqjapp://home";
      } else {
        console.log("多余的");
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.towechat {
  width: 100%;
  height: 174 / @base;
  padding: 20 / @base;
  display: flex;
  flex-wrap: wrap;
  .fenkuai-son {
    width: 70 / @base;
    height: 70 / @base;
    text-align: center;
    margin-right: 10 / @base;
  }
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56 / @base;
  font-size: 18px;
  color: #252525;
  letter-spacing: 0 / @base;
  z-index: 11;
  background: white;
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width:auto;
    height: 21/ @base;
    background-size: 100% 100%;
  }
 i{
     position: absolute;
    top: 18 / @base;
    right: 17 / @base;
    // width: 15 / @base;
    // height: 15 / @base;
    font-size: 20px;
    // font-weight: bold;
    // background-size: 100% 100%;
  }
  .img3 {
    position: absolute;
    top: 21 / @base;
    right: 50 / @base;
    width: 15 / @base;
    height: 14 / @base;
    background-size: 100% 100%;
  }
}
.jicheng {
  width: 100%;
  height: 56 / @base;
  margin-bottom: 2px;
}
// fenshu
.gradebox {
  box-sizing: border-box;
  position: relative;
  // display: flex;
  // width: 318 / @base;
  width: auto;
  height: 60 / @base;
  background-color: #ffffff;
  margin: 0 17 / @base 0 40 / @base;
  box-shadow: 0 / @base 6 / @base 13 / @base 0 / @base rgba(89, 67, 104, 0.28);
  // opacity: 0.28;
  border-radius: 8 / @base;
  img {
    opacity: 1;
    position: absolute;
    left: -25 / @base;
    top: 5 / @base;
    width: 50 / @base;
    height: 50 / @base;
    border-radius: 50%;
    box-shadow: 0 / @base 6 / @base 13 / @base 0 / @base rgba(89, 67, 104, 0.28);
  }
  .gradebox_left {
    margin-left: 43 / @base;
    .gradebox_left_top {
      position: absolute;
      top: 13 / @base;
      left: 43 / @base;
      // margin-top: 13 / @base;
      font-size: 20px;
      font-weight: bold;
      color: #2e2e2e;
      line-height: 20 / @base;
      letter-spacing: 0 / @base;
      // font-family: "PingFangBold";
    }
    .gradebox_left_bottom {
      position: absolute;
      bottom: 8 / @base;
      left: 45 / @base;
      display: flex;
      font-stretch: normal;
      // line-height: 22 / @base;
      letter-spacing: 0 / @base;
      font-size: 10px;
      font-weight: bold;
      color: #343434;
      // font-family: "PingFangRegular";
    }
  }
  .gradebox_middle {
    margin-left: 49 / @base;
    .gradebox_active_up {
      color: #8ac793 !important;
    }
    .gradebox_active_low {
      color: red !important;
    }
    .gradebox_middle_top {
      position: absolute;
      top: 14 / @base;
      left: 193 / @base;
      // margin-top: 13 / @base;
      font-size: 22px;
      // font-family: "PingFangBold";
      font-weight: bold;
      line-height: 22 / @base;
      color: #2e2e2e;
      font-stretch: normal;
      letter-spacing: 1 / @base;
    }
    .gradebox_middle_bottom {
      position: absolute;
      bottom: 8 / @base;
      left: 195 / @base;
      // margin-left: 3.5 / @base;
      // line-height: 22 / @base;
      font-size: 10px;
      font-weight: bold;
      color: #343434;
      // font-family: "PingFangRegular";
      font-stretch: normal;
    }
  }
  .gradebox_right {
    margin-left: 49 / @base;
    .gradebox_right_top {
      // margin-top: 13 / @base;
      position: absolute;
      top: 14 / @base;
      right: 25 / @base;
      // font-family: "PingFangBold";
      font-size: 22px;
      font-weight: bold;
      font-stretch: normal;
      line-height: 22 / @base;
      letter-spacing: 1 / @base;
      color: #2e2e2e;
    }
    .gradebox_right_bottm {
      position: absolute;
      bottom: 8 / @base;
      right: 27.5 / @base;
      // font-family: "PingFangRegular";
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      // line-height: 22 / @base;
      letter-spacing: 0 / @base;
      color: #343434;
      margin-left: 1 / @base;
    }
  }
}
.face {
  width: 133 / @base;
  height: 218 / @base;
  background-size: 100% 100%;
  margin: 22 / @base auto 0 auto;
}
// 题目
.main_title {
  display: flex;
  justify-content: space-between;
  width: calc(~"100% - 27px");
  height: auto;
  margin: 0 auto;
  div {
    box-shadow: 0px 2px 6px 0px rgba(216, 216, 216, 0.6);
    border-radius: 8px;
    min-width: 90 / @base;
    height: 28 / @base;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14 / @base;
    color: #55268e;
    // font-family: "PingFangBold";
  }
}
// 盒子
.box {
  width: 342 / @base;
  height: auto;
  margin: 16 / @base auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .box_item {
    position: relative;
    width: 164 / @base;
    height: 164 / @base;
    box-shadow: 0px 2px 6px 0px rgba(216, 216, 216, 0.6);
    border-radius: 10px;
    margin-bottom: 20 / @base;
    background-size: 120% 120%;
    background-position: center center;
    .p {
      font-size: 14 / @base;
      font-weight: bold;
      color: #ffffff;
      margin-top: 14 / @base;
      margin-left: 10 / @base;
    }
    img {
      width:auto;
      height: 60 / @base;
      background-size: 100% 100%;
      margin: 16 / @base auto 0 auto;
    }
    div {
      position: absolute;
      left: 10 / @base;
      bottom: 10 / @base;
      width: 143 / @base;
      height: 32 / @base;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      color: #f7f7f7;
      // font-family: "PingFangBold";
      display: flex;
      align-items: center;
      padding-left: 10/@base;
      // padding: 10/@base 10 / @base;
      p{
        width: 120 / @base;
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //行数
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>