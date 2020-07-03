<template>
  <div class="setting">
    <!-- 模态框 -->
    <van-overlay :show="show" z-index="3">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" color="#1989fa" />
      </div>
    </van-overlay>

    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">设置</div>
    </header>
    <div class="bu"></div>
    <div class="list">
      <div class="avatar" @click="$router.push('/edit')">
        <!-- <router-link class="avatar" tag="div" to="/edit"> -->
        <div class="pic">
          <img v-if="userinfo.UserPhoto" :src="userinfo.UserPhoto" alt />
          <img v-else src="../../assets/images/userphoto.png" alt />
        </div>
        <div class="name">
          <p class="mingzi">{{userinfo.Username|usernameLength}}</p>
          <p class="qianming">{{userinfo.PersonalitySignature}}</p>
        </div>
        <div class="edit">
          <a href="javascript:">
            <span>点击编辑</span>
            <span class="iconfont icon-youjiantou"></span>
          </a>
        </div>
        <!-- </router-link> -->
      </div>
      <div class="line"></div>
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="tobie(item.to)"
          :class="{'active': index===6}"
        >
          <div class="item">
            <div class="pic">
              <img :src="item.src" alt />
            </div>
            <div class="name">
              <span>{{item.name}}</span>
            </div>
            <div class="edit">
              <a href="javascript:">
                <i class="iconfont icon-youjiantou"></i>
              </a>
            </div>
          </div>
        </li>
      </ul>

      <div class="btn">
        <span @click="logout">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Return from "../../components/Return";
import { Toast, Dialog, Overlay, Loading } from "vant";
export default {
  components: {
    Return
  },
  data() {
    return {
      show: false,
      list: [
        {
          name: "账号与安全",
          src: require("../../assets/images/setting_aq.png"),
          to: "/zhanghao"
        },
        {
          name: "收货地址",
          src: require("../../assets/images/setting_shouhuodizhi.png"),
          to: "/shopping_address"
        },
        {
          name: "支付设置",
          src: require("../../assets/images/setting_shenfenrenzheng.png"),
          to: "/payment_main"
        },
        {
          name: "入驻合作",
          src: require("../../assets/images/setting_hezuo.png"),
          to: "/enter"
        },
        {
          name: "帮助客服",
          src: require("../../assets/images/setting_help.png"),
          to: "/a"
        },
        {
          name: "意见反馈",
          src: require("../../assets/images/setting_yijian.png"),
          to: "/fankui"
        },
         {
          name: "填写邀请码",
          src: require("../../assets/images/setting_code.png"),
          to: "/setting_code"
        },
        // {
        //   name: "隐私",
        //   src: require("../../assets/images/setting_yinsi.png"),
        //   to: "/yinsi"
        // },
        {
          name: "关于魅千金",
          src: require("../../assets/images/setting_about.png"),
          to: "/about_our"
        },
        {
          name: "清除缓存",
          src: require("../../assets/images/setting_gengxin.png"),
          to: "/b"
        }
      ],
      userinfo: []
    };
  },
  created() {
    this.getuserinfo();
  },
  mounted(){
    window.test=this.test
  },
  methods: {
     test(params) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        window.localStorage.setItem("token",params);
        this.getuserinfo();
        this.GetUserSkinReportShortList();
      }else{
         let token = JSON.stringify(params);
         window.localStorage.setItem("token", JSON.parse(token));
         this.getuserinfo();
      }
    },
    tobie(to) {
      if (to == "/a") {
        Toast("暂未开放");
      } else if (to == "/b") {
        console.log("去请缓存");
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        if (isAndroid) {
          this.show = true;
          console.log("我是安卓");
          let result = window.android.clearCache();
          // Dialog.alert({
          //   message: "安卓返回来的" + result
          // }).then(() => {
          //   // on close
          // });
          setTimeout(() => {
            if (result == 0) {
              this.show = false;
              Toast("清除失败");
            } else if (result == 1) {
              this.show = false;
              Toast("清除成功");
            } else {
              setTimeout(() => {
                this.show = false;
              }, 8000);
            }
          }, 500);
        } else if (isiOS) {
          console.log("我是要去ios");
          this.$bridge.callhandler("clearCache", "", response => {
            // 处理返回数据
            let token = JSON.stringify(response);
            Dialog.alert({
              message: "ios返回来的" + JSON.parse(token)
            }).then(() => {
              // on close
            });
          });
        } else {
          console.log("我不是安卓也不是ios,我在哪");
        }
      } else {
        this.$router.push(to);
      }
    },
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"setting";
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
    logout() {
      Dialog.confirm({
        title: "确认退出"
      })
        .then(() => {
          request
            .post(this.$api + "/mobile/LoginOut", {})
            .then(res => {
              if (res.IsSuccess == true) {
                Toast("退出成功");
                window.localStorage.removeItem("token");
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                var isAndroid =
                  u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
                if (isAndroid) {
                  window.android.logOut();
                } else if (isiOS) {
                  // console.log("我是要去ios");
                  window.location.href = "mqjapp://logout";
                } else {
                  console.log("我不是安卓也不是ios,我在哪");
                }
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    // 获取用户信息
    getuserinfo() {
      request
        .post(this.$api + "/mobile/GetUserInfo")
        .then(res => {
          this.userinfo = res.Data;
          window.localStorage.setItem(
            "HaveSellerFlag",
            res.Data.HaveSellerFlag
          );
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
}

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
    background: #b694e8;
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
.commoncss (@left, @right) {
  .name {
    position: absolute;
    top: 50%;
    left: @left;
    transform: translateY(-50%);
    color: #3c3c3c;
    font-size: 26/ @base;
    // font-weight: bold;
    .mingzi {
      font-size: 30 / @base;
      font-weight: 700;
    }
    .qianming {
      width: 300 / @base;
      margin-top: 6 / @base;
      font-size: 24 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .edit {
    position: absolute;
    right: @right;
    top: 50%;
    transform: translateY(-50%);
    a {
      display: block;
      color: #939393;
      font-size: 24 / @base;
      .aa {
        vertical-align: middle;
      }
      .icon-youjiantou {
        margin-left: 15 / @base;
        vertical-align: middle;
        font-size: 36 / @base;
        font-weight: 600;
      }
    }
  }
}

.list {
  padding-bottom: 80 / @base;
  .avatar {
    position: relative;
    padding: 25 / @base 40 / @base;
    .pic {
      img {
        width: 100 / @base;
        height: 100 / @base;
        border-radius: 50%;
      }
    }
    .commoncss(155 / @base, 40 / @base);
  }
  .line {
    width: 100%;
    height: 15 / @base;
    background-color: #eee;
  }
  ul {
    background: #eee;
    li {
      // border-bottom: 1 / @base solid #939393;
      &.active {
        margin-bottom: 15 / @base;
        border: none;
        border-bottom: none !important;
      }
      .item {
        border-bottom: 1 / @base solid #e6e6e6;
        padding: 25 / @base 40 / @base;
        position: relative;
        background-color: #fff;
        .pic {
          img {
            width: 50 / @base;
            height: 50 / @base;
            border-radius: 50%;
          }
        }
        .commoncss(115 / @base, 40 / @base);
      }
    }
  }
  .btn {
    margin-top: 60 / @base;
    span {
      display: block;
      width: 350 / @base;
      height: 60 / @base;
      line-height: 60 / @base;
      margin: 0 auto;
      text-align: center;
      border-radius: 10 / @base;
      background-color: #b694e8;
      font-size: 30 / @base;
      color: #fff;
    }
  }
}
</style>