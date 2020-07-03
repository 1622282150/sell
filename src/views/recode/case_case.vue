<template>

  <div>
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
    <!-- <div class="header">
      <i @click="goback" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou"></i>
      <span>妆容报告</span>
      <i
        @click="showfen = true"
        style="position:absolute;right:20px;"
        class="iconfont icon-fenxiang2"
      ></i>
    </div> -->
    <div class="contain">
      <div class="banner">
        <div class="bannertop">
          <div>
            <span>{{list.beauty}}</span>
          </div>
        </div>
        <!-- <div class="an">
          <div class="anniu" @click="$router.push('/recommen')">妆容推荐</div>
        </div> -->
        <!-- <div style="width:100%;height:7px;background:#f7f1ff;"></div> -->
        <div class="zikuang"></div>
        <div class="baikuang"></div>
        <div class="middle">
          <div class="middle_one">人种:{{list.race}}</div>
          <div class="middle_two">肤色:{{list.skincolorlevel}}</div>
          <div class="middle_three">肤质:{{list.skincolorhuedelta}}皮肤</div>
          <div class="middle_four">年龄:{{list.age}}</div>
        </div>
        <div class="baikuang"></div>
        <div class="zikuang"></div>
        <div class="buwei">{{list.makeupreport}}</div>
       
      </div>
      <!-- 第一块面部 -->
      <div class="box">
        <div class="box_title">
          <span>01</span>.面部修容
        </div>
        <img class="title2" src="../../assets/images/showcase-title.png" alt />
        <div class="box_one">
          <img
            v-if="list.face_shape === '偏倒三角'"
            class="mianimg"
            src="../../assets/images/case1_daosanjiao.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '长脸'"
            class="mianimg"
            src="../../assets/images/case1_changlian.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '偏椭圆'"
            class="mianimg"
            src="../../assets/images/case1_piantuoyuan.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '偏方'"
            class="mianimg"
            src="../../assets/images/case1_pianfangxing.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '偏圆'"
            class="mianimg"
            src="../../assets/images/case1_pianyuan.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '方形'"
            class="mianimg"
            src="../../assets/images/case1_fangxing.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '偏长脸'"
            class="mianimg"
            src="../../assets/images/case1_pianchanglian.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '椭圆'"
            class="mianimg"
            src="../../assets/images/case1_tuoyuan.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '圆脸'"
            class="mianimg"
            src="../../assets/images/case1_yuanlian.png"
            alt
          />
          <img
            v-else-if="list.face_shape === '棱形脸'"
            class="mianimg"
            src="../../assets/images/case1_lingxinglian.png"
            alt
          />
          <img v-else class="mianimg" src="../../assets/images/case1_piandaosanjiao.png" alt />
          <div class="box_one_right">
            <div class="kuang">
             <p>{{list.face_shape}}</p>
             <p>{{list.cheek_shape}}</p>
            </div>
            

            <div class="des" v-html="list.facetype_report"></div>
          </div>
        </div>
        <div class="box_xue" @click="todaren('修容')">美妆达人面部修容教学!</div>
        <div class="box_bottom" @click="tomakeup('修容')">适合你肤质的面部修容产品</div>
      </div>
      <!-- 第二块 眉妆 -->
      <div class="box">
        <div class="box_title">
          <span>02</span>.眉妆
        </div>
        <img class="title2" src="../../assets/images/showcase-title.png" alt />
        <div class="box_two">
          <div class="box_two_top">
            <img
              v-if="list.eyebrow_shape === '直眉'"
              class="meiimg"
              src="../../assets/images/case2_zhimei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏直眉-尾眉下垂'"
              class="meiimg"
              src="../../assets/images/case2_pianzhimei_weimeixiachui.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏直眉-眉头下垂'"
              class="meiimg"
              src="../../assets/images/case2_pianzhimei_meitouxiachui.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏直眉'"
              class="meiimg"
              src="../../assets/images/case2_pianzhimei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '剑眉'"
              class="meiimg"
              src="../../assets/images/case2_jianmei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏剑眉'"
              class="meiimg"
              src="../../assets/images/case2_pianjianmei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏八字眉'"
              class="meiimg"
              src="../../assets/images/case2_pianbazimei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '八字眉'"
              class="meiimg"
              src="../../assets/images/case2_bazimei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '高挑眉'"
              class="meiimg"
              src="../../assets/images/case2_gaotiaomei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏高挑眉'"
              class="meiimg"
              src="../../assets/images/case2_piangaotiaomei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '弯眉'"
              class="meiimg"
              src="../../assets/images/case2_wanmei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏弯眉'"
              class="meiimg"
              src="../../assets/images/case2_pianwanmei.png"
              alt
            />
            <img
              v-else-if="list.eyebrow_shape === '偏弯眉,眉头下垂'"
              class="meiimg"
              src="../../assets/images/case2_pianwanmei_meitouxiachui.png"
              alt
            />
            <img
              v-else
              class="meiimg"
              src="../../assets/images/case2_pianwanmei_meiweixiachui.png"
              alt
            />
            <div class="kuang">
              <p>{{list.eyebrow_shape}}</p>
              <p>{{list.eyebrow_concentration}}</p>
              <p>{{list.eyebrow_concentration_distribution}}</p>
              <p>{{list.eyebrow_distance}}</p>
            </div>
          </div>
          <div class="box_two_des" v-html="list.eyebrow_report"></div>
        </div>
        <div class="box_xue" @click="todaren('眉妆')">美妆达人眉妆教学!</div>
        <div class="box_bottom" @click="tomakeup('眉妆')">适合你肤质的眉妆产品</div>
      </div>
      <!-- 第三块眼妆 -->
      <div class="box">
        <div class="box_title">
          <span>03</span>.眼妆
        </div>
        <img class="title2" src="../../assets/images/showcase-title.png" alt />
        <div class="box_two">
          <div class="box_two_top">
            <img
              v-if="list.eye_shape === '标准眼大小'"
              class="yanimg"
              src="../../assets/images/case3_biaozhunyan.png"
              alt
            />
            <img
              v-else-if="list.eye_shape === '偏小眼'"
              class="yanimg"
              src="../../assets/images/case3_biyan.png"
              alt
            />
            <img
              v-else-if="list.eye_shape === '大眼'"
              class="yanimg"
              src="../../assets/images/case3_dayan.png"
              alt
            />
            <img
              v-else-if="list.eye_shape === '闭眼'"
              class="yanimg"
              src="../../assets/images/case3_pianxiaoyan.png"
              alt
            />
            <img v-else class="yanimg" src="../../assets/images/case3_xiaoyan.png" alt />
            <div class="kuang">
              <p>{{list.eye_shape}}</p>
              <p>{{list.left_eyelid}}</p>
              <p>{{list.right_eyelid}}</p>
              <p>{{list.eye_distance}}</p>
            </div>
          </div>
          <div class="box_two_des" v-html="list.eye_report"></div>
        </div>
        <div class="box_xue" @click="todaren('眼妆')">美妆达人眼妆教学!</div>
        <div class="box_bottom" @click="tomakeup('眼妆')">适合你肤质的眼妆产品</div>
      </div>
      <!-- 第四块儿鼻状 -->
      <div class="box">
        <div class="box_title">
          <span>04</span>.鼻妆
        </div>
        <img class="title2" src="../../assets/images/showcase-title.png" alt />
        <div class="box_one">
          <img
            v-if="list.nose_shape === '标准鼻'"
            class="biimg"
            src="../../assets/images/case4_biaozhunbi.png"
            alt
          />
          <img
            v-else-if="list.nose_shape === '宽鼻'"
            class="biimg"
            src="../../assets/images/case4_kuanbi.png"
            alt
          />
          <img
            v-else-if="list.nose_shape === '窄鼻'"
            class="biimg"
            src="../../assets/images/case4_zhaibi.png"
            alt
          />
          <img v-else class="biimg" src="../../assets/images/case4_piankuan.png" alt />
          <div class="box_one_right">
            <div class="kuang"><p>{{list.nose_shape}}</p></div>

            <div class="des" v-html="list.nose_report"></div>
          </div>
        </div>
        <div class="box_xue" @click="todaren('鼻妆')">美妆达人鼻妆教学!</div>
        <div class="box_bottom" @click="tomakeup('鼻妆')">适合你肤质的面部修容产品</div>
      </div>
      <!-- 第五块唇妆 -->
      <div class="box">
        <div class="box_title">
          <span>05</span>.唇妆
        </div>
        <img class="title2" src="../../assets/images/showcase-title.png" alt />
        <div class="box_one">
          <img
            v-if="list.mouth_thickness==='标准唇'"
            class="chunimg"
            src="../../assets/images/case5_biaozhun.png"
            alt
          />
          <img
            v-else-if="list.mouth_thickness==='薄唇'"
            class="chunimg"
            src="../../assets/images/case5_bo.png"
            alt
          />
          <img
            v-else-if="list.mouth_thickness==='偏薄唇'"
            class="chunimg"
            src="../../assets/images/case5_pianbo.png"
            alt
          />
          <img
            v-else-if="list.mouth_thickness==='厚唇'"
            class="chunimg"
            src="../../assets/images/case5_hou.png"
            alt
          />
          <img v-else class="chunimg" src="../../assets/images/case5_pianhou.png" alt />
          <div class="box_one_right">
            <div class="kuang"><p>{{list.mouth_thickness}}</p>
            <p v-show="list.lip_peak">{{list.lip_peak}}</p></div>
            <div class="des" v-html="list.lip_report"></div>
          </div>
        </div>
        <div class="box_xue" @click="todaren('唇妆')">美妆达人唇妆教学!</div>
        <div class="box_bottom" @click="tomakeup('唇妆')">适合你唇妆的产品</div>
      </div>
      <!-- 第六块底妆 -->
      <div class="box">
        <div class="box_title">
          <span>06</span>.底妆
        </div>
        <img class="title2" src="../../assets/images/showcase-title.png" alt />
        <div class="box_di">
          <div class="box_two_top">
            <img class="diimg" src="../../assets/images/case_底妆.png" alt />
            <div>{{list.bottommakeup}}</div>
          </div>
          <!-- <div class="box_two_des">奥斯卡了的哈看见飒飒的贺卡是极好的看见爱上副科级哈萨克干哈空间规划卡决胜巅峰哈阿达手法快速减肥哈就开始</div> -->
        </div>
        <div class="box_xue" @click="todaren('底妆')">美妆达人底妆教学!</div>
        <div class="box_bottom" @click="tomakeup('底妆')">适合你肤质的眼妆产品</div>
      </div>
      <!-- 底部按钮 -->
      <div class="footer">
        <div class="footer_left" @click="childMethod">妆容推荐</div>
        <!-- <div class="footer_right">再测一次</div> -->
        <a class="footer_right" href="mqjapp://showcase">再测一次</a>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Circle, Dialog } from "vant";
export default {
  data() {
    return {
      showfen: false, //分享微信
      // fullheight: document.documentElement.clientHeight,
      list: []
    };
  },
  created() {
    this.GetUserFaceReportInfo();
  },
  mounted() {
    // this.$refs.paging.style.height = this.fullheight + "px";
    if (this.$route.query.id === undefined) {
      this.id = "0";
    } else {
      this.id = this.$route.query.id;
    }
    this.gettoken();
  },
  methods: {
   //子组件方法
    childMethod(){
      this.$parent.tuijian();
    },
    // 获取报告
    GetUserFaceReportInfo() {
      request
        .post(this.$api + "/mobile/GetUserFaceReportInfo", {})
        .then(res => {
          this.list = res.Data;
          window.localStorage.setItem('faceId',res.Data.id)
        })
        .catch(err => {});
    },
    tomakeup(title) {
      this.$router.push({
        path: "/makeup",
        query: {
          title: title
        }
      });
    },
    todaren(name) {
      this.$router.push({
        path: "/showcase_daren",
        query: {
          name: name
        }
      });
    },
    towechat() {
      var name = "妆容报告请查收~";
      var description = "关注细节,才能变得更精致哦~";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'wechat'
        // }
        // console.log(data)
        window.android.shareToWechat(
          window.location.href,
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

        //  console.log(params)
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          // 处理返回数据
          //   Dialog.alert({
          //   message: "ios收到通知后才会触发的" + JSON.stringify(data)
          // }).then(() => {
          //   // on close
          // });
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
          window.location.href,
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
        let result = window.android.getToken("");

        window.localStorage.setItem("token", result);
      } else if (isiOS) {
        // console.log("我是要去ios");
        this.$bridge.callhandler("getToken", "", response => {
          // 处理返回数据
          let token = JSON.stringify(response);

          window.localStorage.setItem("token", JSON.parse(token));
        });
      } else {
      }
    },
    goback() {
      if (this.id === "0") {
        //
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
      } else {
        console.log("我是大于0");
        this.$router.back();
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.showcase {
  background: #fff;
  position: relative;
}
.towechat {
  width: 100%;
  height: 370 / @base;
  padding: 40 / @base;
  display: flex;
  flex-wrap: wrap;
  .fenkuai-son {
    width: 140 / @base;
    height: 140 / @base;
    text-align: center;
    margin-right: 20 / @base;
  }
}
.header {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  //   border-bottom: 1 / @base solid #ccc;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 1;
  i {
    font-size: 25px;
  }
}
.contain {
  padding-top: 100/@base;
  // position: absolute;
  // top: 120 / @base;
  // bottom: 0;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  width: 100%;
  .banner {
    width: 711 / @base;
    margin: 44 / @base auto 0 auto;
    .bannertop {
      display: block;
      width: 100%;
      height: 297 / @base;
      padding-top: 40 / @base;
      background: url("../../assets/images/showcase_banner.png") no-repeat;
      background-size: 100% 102%;
      div {
        position: relative;
        display: block;
        width: 205 / @base;
        height: 223 / @base;
        margin: 0 auto;
        background: url("../../assets/images/showcase_fen.png") no-repeat;
        background-size: 100% 100%;
        span {
          position: absolute;
          top: 80 / @base;
          left: 54 / @base;
          font-size: 80 / @base;
          color: #7703dd;
        }
      }
    }
    .an {
      width: 100%;
      height: 110 / @base;
      background: url("../../assets/images/showcase_bannerb.png") no-repeat;
      background-size: 100% 100%;
      .anniu {
        margin: 0 auto;
        width: 200 / @base;
        height: 60 / @base;
        line-height: 60 / @base;
        text-align: center;
        border-radius: 20px;
        font-size: 30 / @base;
        color: #fff;
        background-image: linear-gradient(93deg, #d1b5f9 0%, #ab4dfd 100%);
        // border-style: solid;
        // border-width: 1px;
      }
    }
    .zikuang {
      width: 100%;
      height: 10 / @base;
      background: #e3d2fc;
    }
    .baikuang {
      width: 100%;
      height: 5 / @base;
      background: #fff;
    }
    .middle {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 52 / @base;
      background: #e3d2fc;
      padding: 10 / @base 28/@base;;
      font-size: 24 / @base;
      color: #333333;
      .middle_one {
        border-right: 1px solid #fff;
        text-align: center;
        padding: 0 15 / @base;
      }
      .middle_two {
        border-right: 1px solid #fff;
        text-align: center;
        padding: 0 24 / @base;
      }
      .middle_three {
        border-right: 1px solid #fff;
        text-align: center;
        padding: 0 12 / @base;
      }
      .middle_four {
        text-align: center;
        padding: 0 16 / @base;
      }
    }
    .buwei {
      width: 100%;
      font-size: 24 / @base;
      color: #897d93;
      padding: 24/@base  30/@base  29 / @base 30/@base;
      min-height: 0/ @base;
      background: url("../../assets/images/showcase_des.png") no-repeat;
      background-size: 100% 100%;
      border-bottom-left-radius: 15 / @base;
      border-bottom-right-radius: 15 / @base;
    }
  }
  .box {
    width: 711 / @base;
    margin: 15 / @base auto;
    background: #f7f1ff;
    border-radius: 15 / @base;
    padding: 31 / @base 0 45 / @base 0;
    .box_title {
      width: 100%;
      text-align: center;
      font-size: 30 / @base;
      color: #333333;
      // margin-bottom: 63 / @base;
      span {
        font-style: italic;
        font-size: 48 / @base;
      }
    }
    .title2 {
      width: 177 / @base;
      height: 9 / @base;
      background-repeat: no-repeat;
      margin: 0 / @base auto 44 / @base auto;
      background-size: 100% 100%;
    }
    .box_one {
      display: flex;
      width: 100%;
      min-height: 250 / @base;
      padding-right: 0 / @base;
      .mianimg {
        min-width: 210 / @base;
        max-width: 210 / @base;
        height: 290 / @base;
        box-shadow: 0 3 / @base 10 / @base 0 rgba(0, 0, 0, 0.17);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 20 / @base;
        margin-left: 21 / @base;
        padding: 18 / @base 30 / @base 0 30 / @base;
      }
      .biimg {
        min-width: 210 / @base;
        max-width: 210 / @base;
        height: 240 / @base;
        box-shadow: 0 3 / @base 10 / @base 0 rgba(0, 0, 0, 0.17);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 20 / @base;
        margin-left: 21 / @base;
        padding: 16 / @base 40 / @base;
      }
      .chunimg {
        min-width: 210 / @base;
        max-width: 210 / @base;
        height: 240 / @base;
        box-shadow: 0 3 / @base 10 / @base 0 rgba(0, 0, 0, 0.17);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 20 / @base;
        margin-left: 21 / @base;
        padding: 87 / @base 15 / @base 73 / @base 15 / @base;
      }
      .box_one_right {
        width:430 / @base;
        min-height: 250 / @base;
        margin-left: 26 / @base;
        .kuang{
          display: flex;
          width: 100%;
          margin-top: 20/@base; 
          p{
            min-width: 0;
            border-radius: 25/@base;
            border: solid 1px #7703dd;
            text-align: center;
            height: 50/@base;
            line-height: 50/@base;
            font-size: 24/@base;
            color: #b57be7;
            padding: 0 33/@base;
            margin-right: 21/@base;
          }
        }
        .des {
          margin-top: 39 / @base;
          font-size: 24 / @base;
          color: #333333;
        }
      }
    }
    .box_two {
      width: 100%;
      margin: 0 auto;
      .box_two_top {
        display: flex;
        width: 100%;
        height: 200 / @base;
        .meiimg {
          width: 210 / @base;
          height: 182 / @base;
          box-shadow: 0 3 / @base 10 / @base 0 rgba(0, 0, 0, 0.17);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          border-radius: 20 / @base;
          margin-left: 21 / @base;
          padding: 61 / @base 0 66 / @base 14 / @base;
        }
        .yanimg {
          min-width: 210 / @base;
          max-width: 210 / @base;
          height: 182 / @base;
          box-shadow: 0 3 / @base 10 / @base 0 rgba(0, 0, 0, 0.17);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          border-radius: 20 / @base;
          margin-left: 21 / @base;
          padding: 30 / @base 0 30 / @base 10 / @base;
        }

        .kuang{
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: 132/@base;
          margin-top: 20/@base; 
          padding-left: 20/@base;
          p{
            min-width: 0;
            border-radius: 25/@base;
            border: solid 1px #7703dd;
            text-align: center;
            height: 50/@base;
            line-height: 50/@base;
            font-size: 24/@base;
            color: #b57be7;
            padding: 0 33/@base;
            margin-right: 21/@base;
          }
        }
      }
      .box_two_des {
        margin-top: 10 / @base;
        font-size: 24 / @base;
        color: #333333;
        padding: 0 22 / @base;
      }
    }
    .box_di {
      width: 100%;
      margin: 0 auto;
      .box_two_top {
        display: flex;
        width: 100%;
        min-height: 268 / @base;
        .diimg {
          min-width: 210 / @base;
          max-width: 210 / @base;
          height: 240 / @base;
          box-shadow: 0 3 / @base 10 / @base 0 rgba(0, 0, 0, 0.17);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          border-radius: 20 / @base;
          margin-left: 21 / @base;
          padding: 18 / @base 32 / @base 0 / @base 32 / @base;
        }
        div {
          padding-top: 17/@base;
          margin-left: 26 / @base;
          font-size: 24 / @base;
          color: #333333;
        }
      }
      .box_two_des {
        margin-top: 10 / @base;
        font-size: 24 / @base;
        color: #333333;
        padding: 0 22 / @base;
      }
    }
    .box_xue {
      width: 100%;
      font-size: 24 / @base;
      text-decoration: underline;
      color: #b58deb;
      text-align: center;
      margin-top: 31 / @base;
      margin-bottom: 13 / @base;
    }
    .box_bottom {
      width: 363 / @base;
      height: 52 / @base;
      line-height: 52 / @base;
      background-image: linear-gradient(-58deg, #ab49fe 0%, #c279fa 100%);
      border-radius: 26 / @base;
      border: solid 1px #7703dd;
      text-align: center;
      color: #fff;
      font-size: 24 / @base;
      margin: 13 / @base auto;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 49 / @base;
    height: 70 / @base;
    margin: 70 / @base auto;
    .footer_left {
      width: 300 / @base;
      height: 70 / @base;
      line-height: 70 / @base;
      border-radius: 35 / @base;
      text-align: center;
      font-size: 30 / @base;
      color: #fff;
      background-image: linear-gradient(0deg, #c178fa 0%, #ddc6ff 100%);
      // border-style: solid;
      // border-width: 1px;
      // border-image-source: linear-gradient(0deg,
      // 	#8700f3 0%,
      // 	#b969fc 100%);
      // border-image-slice: 1;
    }
    .footer_right {
      width: 300 / @base;
      height: 70 / @base;
      font-size: 30 / @base;
      line-height: 70 / @base;
      background-image: linear-gradient(0deg, #ffbb44 0%, #fed68f 100%);
      border-radius: 35 / @base;
      text-align: center;
      color: #fff;
    }
  }
}
</style>