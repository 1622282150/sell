<template>
  <div class="container">
    <Return :show="false">我的消息</Return>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <section>
      <div class="item">
        <div
          v-for="(item,index) in list"
          :key="index"
          @click="to_other(item.path)"
          :class="['section',index === 0 ? 'first' : '', index === list.length -1 ? 'last': '']"
        >
          <div class="pic">
            <img v-show="index==0" src="../../assets/images/message_xiaoxi.png" alt />
            <img v-show="index==1" src="../../assets/images/收藏图标.png" alt />
            <img v-show="index==2" src="../../assets/images/收藏图标.png" alt />
            <img v-show="index==3" src="../../assets/images/评论图标.png" alt />
            <img v-show="index==4" src="../../assets/images/关注图标.png" alt />
            <img v-show="index==5" src="../../assets/images/通知.png" alt />
            <img v-show="index==6" src="../../assets/images/客服消息.png" alt />
            <div class="num" v-show="index === 5 &&  tongzhisum != 0?true : false">{{tongzhisum|messageLength}}</div>
            <div class="num" v-show="index === 1 &&  huozansum != 0? true : false">{{huozansum|messageLength}}</div>
          </div>
          <div :class="['name',index === 0 || index ===  list.length -1 ? 'last': '']">
            {{item.des}}
            <span class="iconfont icon-youjiantou"></span>
          </div>
        </div>
      </div>
    </section>
</van-pull-refresh>
    <!-- <Tabbar></Tabbar> -->
    <grade></grade>
  </div>
</template>

<script>
import grade from '@/components/GradePopup'
import { Dialog, Toast } from "vant";
/*eslint-disable*/
// import Tabbar from "../../components/Tabbar";
import Return from "../../components/Return.vue";
// import Tabbar from "../../components/Tabbar";
// import "../../fonts/iconfont.css";
import request from "@/utils/request";
export default {
  
  data() {
    return {
       isLoading: false,
      list: [
        // { paath: "/sixin", des: "私信" },
        { path: "sixin", des: "私信" },
        { path: "collect", des: "获赞" },
        { path: "m_shou", des: "收藏" },
        { path: "m_ping", des: "评论和@" },
        { path: "guangzhu", des: "新增关注" },
        // { path: "/collect", des: "获赞和收藏" },
        // { path: "/pinglun", des: "评论和@" },
        // { path: "/guanzhu", des: "关注" },
        { path: "inform", des: "系统通知" },
        { path: "kefu", des: "客服消息" }
      ],
      tongzhisum: "",
      huozansum: ""
    };
  },
  created(){
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    if (isiOS) {
      // console.log("我是要去ios");
      this.$bridge.callhandler("getToken","", response => {
        // 处理返回数据
        let token = JSON.stringify(response);
        window.localStorage.setItem("token", JSON.parse(token));
        
      });
    } else {
      console.log("我不是ios");
    }
  },
  mounted() {
    window.test = this.test
    setTimeout(()=>{
        this.get_tongzhi();
        this.get_huozan();
    },200)
  },
  methods: {
     onRefresh() {
      setTimeout(() => {
        this.get_tongzhi()
        this.get_huozan()
        // this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
     test(params) {
       window.localStorage.setItem('token',params)
      //  this.get_tongzhi()
      //  this.get_huozan()
      // Dialog.alert({
      //   message: params
      // }).then(() => {
      //   // on close
      // });
    },
    // 获取token
   gettoken() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        let result = window.android.getToken("");
        // Dialog.alert({
        //   message: "安卓返回来的token:" + result
        // }).then(() => {
        //   // on close
        // });
        window.localStorage.setItem("token", result);
      } else if (isiOS) {
        console.log("我是要去ios");
        this.$bridge.callhandler("getToken", "", response => {
          // 处理返回数据
          let token = JSON.stringify(response);
          window.localStorage.setItem("token", JSON.parse(token));
          // Dialog.alert({
          //   message: "ios返回来的token:" + JSON.parse(token)+'本地存的token:'+window.localStorage.getItem('token')
          // }).then(() => {
          //   // on close

          // });
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // 进入子页面
    to_other(path) {
      if (path == "a") {
        Toast("敬请期待");
      } else {
        console.log(path);
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        if (isAndroid) {
          console.log("我是要去安卓");
          // window.android.goToHome()
          var url = this.$domain.url + path;
          console.log(url);
          window.android.openNewPage(url);
          // this.$router.push("/" + path);
        } else if (isiOS) {
          console.log("我是要去ios");
          let url = this.$domain.url+path;
          console.log(url);
          this.$bridge.callhandler("openNewPage", url, data => {
            // 处理返回数据
          });
          this.$router.push("/" + path);
          //  window.location.href
          //  window.location.href='mqjapp://home'
        } else {
          console.log("我不是安卓也不是ios,我在哪");
        }
      }
    },
    // 获取通知数量
    get_tongzhi() {
      request
        .post(this.$api + "/mobile/GetMessageUnreadCount", {
          Page: 1
          // Rows:6
        })
        .then(res => {
          console.log(res);
          this.tongzhisum = res.Data.UnreadCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    get_huozan() {
      request
        .post(this.$api + "/mobile/GetLikedUnreadCount", {
          Page: 1
        })
        .then(res => {
          console.log(res);
          this.huozansum = res.Data.UnreadCount;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    Return,
      grade
    // Tabbar
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.container {
  width: 100%;
  height: 100%;
}
section {
  font-size: 30 / @base;
  color: #333;
  .item {
    background-color: #eee;
    overflow: hidden;
    .section {
      position: relative;
      padding-left: 40 / @base;
      background-color: #fff;
      &.first {
        margin: 10 / @base 0;
      }
      &.last {
        margin-top: 10 / @base;
      }
      .pic {
        position: relative;
        display: inline-block;
        line-height: 110 / @base;
        height: 120 / @base;
        .num {
          position: absolute;
          top: 12 / @base;
          right: 16 / @base;
          width: 35 / @base;
          height: 35 / @base;
          line-height: 35 / @base;
          text-align: center;
          background-color: #e60012;
          font-size: 16 / @base;
          color: #fff;
          border-radius: 50%;
        }
        img {
          display: inline-block;
          width: 70 / @base;
          height: 70 / @base;
          vertical-align: middle;
          margin-right: 30 / @base;
        }
      }
      .name {
        display: inline-block;
        width: 600 / @base;
        height: 120 / @base;
        line-height: 110 / @base;
        border-bottom: 1 / @base solid #d2d2d2;
        &.last {
          border-bottom: transparent;
        }
      }
      .iconfont {
        position: absolute;
        right: 40 / @base;
        font-size: 38 / @base;
        color: #bbb;
      }
    }
  }
}
</style>