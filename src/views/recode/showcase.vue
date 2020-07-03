<template>
  <!-- <v-touch   v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="vtouch" :swipe-options="{direction: 'horizontal'}"> -->
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
      <div class="hea">
        <div class="hea_left">
          <i @click="goback" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="hea_middle">
          <div class="middle_item" @click="sel(index)" v-for="(item,index) in info" :key="index">
            <div class="middle_item_top" :class="active===index?'active':''">{{item}}</div>
            <div class="middle_item_line" v-show="active===index">
              <div></div>
            </div>
          </div>
        </div>
        <div class="hea_right">
          <i
            @click="showfen = true"
            style="position:absolute;right:20px;"
            class="iconfont icon-fenxiang2"
          ></i>
        </div>
      </div>
      <component :is="name"></component>
      <!-- <van-tabs  v-model="active" swipeable>
          <van-tab v-for="(item,index) in info" :key="index"  :title="item">
            <component :is="name"></component>
          </van-tab>
      </van-tabs>-->
    </div>
  <!-- </v-touch> -->
</template>

<script>
import Showcase from "./case_case";
import Recommen from "./recommen";
import { Tab, Tabs } from "vant";
export default {
  components: {
    Showcase,
    Recommen
  },
  data() {
    return {
      active: 0,
      showfen: false,
      info: ["测妆报告", "妆容推荐"]
    };
  },
  created() {
    this.gettoken();
  },
  computed: {
    name() {
      let name;
      if (this.active === 0) {
        name = Showcase;
        return name;
      } else {
        name = Recommen;
        return name;
      }
    }
  },
  methods: {
    swiperleft(){
     console.log("左划")
     this.active+=1
     this.active>1?this.active=1:console.log('右到头')
    },
    swiperright() {
     console.log("右滑")
     this.active-=1
     this.active<0?this.active=0:console.log('左到头')
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
    sel(index) {
      this.active = index;
    },
    tuijian() {
      this.active = 1;
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
@base: 75rem;
.vtouch{
  touch-action: pan-y!important;
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
.hea {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background: #fff;
  z-index: 3;
  border-bottom: 1px solid #e6e6e6;
  .hea_left {
    width: 15%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    i {
      font-size: 25px;
    }
  }
  .hea_middle {
    display: flex;
    width: 60%;
    height: 50px;
    // background: red;
    margin-left: 5%;

    .middle_item {
      width: 50%;
      height: 50px;
      .active {
        font-size: 50 / @base!important;
        font-weight: bold !important;
        color: #1a1a1a !important;
      }
      .middle_item_top {
        width: 100%;
        height: 47px;
        line-height: 48px;
        text-align: center;
        font-size: 32 / @base;
        font-weight: bold;
        color: #666666;
      }
      .middle_item_line {
        width: 100%;
        height: 6 / @base;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        div {
          width: 78 / @base;
          height: 6 / @base;
          border-radius: 3px;
          background-image: linear-gradient(#8a60ca, #8a60ca),
            linear-gradient(#ffffff, #ffffff);
        }
      }
    }
  }
  .hea_right {
    width: 15%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    i {
      font-size: 25px;
    }
  }
}
</style>