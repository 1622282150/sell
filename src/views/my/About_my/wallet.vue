<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">钱包</div>
    </header>
    <div class="bu"></div>
    <!-- banner -->
    <div class="banner">
      <p class="banner_title">账户余额(元)</p>
      <p class="banner_middle">
        25.58
        <span>
          提现
          <i class="iconfont icon-youjiantou"></i>
        </span>
      </p>
      <div class="banner_bottom">
        <div class="banner_bottomleft">
          <img src="../../../assets/images/wallet_ka1.png" alt />
          <span>银行卡管理</span>
        </div>
        <div class="banner_bottomright">
          <img src="../../../assets/images/wallet_suo.png" alt />
          <span>设置提现密码</span>
        </div>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="card">
      <div class="card_box">
        <img src="../../../assets/images/wallet_money.png" alt />
        <p>银行卡</p>
      </div>
      <div class="card_box">
        <img src="../../../assets/images/wallet_ka.png" alt />
        <p>充值</p>
      </div>
    </div>
    <!-- 明细 -->
    <p class="mingxi">明细</p>
    <!-- 内容 -->
    <van-swipe-cell>
      <div class="list">
        <div class="list_left">
          <img src="../../../assets/images/wallet_up.png" alt />
          <span>充值金额</span>
        </div>
        <div class="list_right">
          <span>+¥10</span>
        </div>
      </div>
      <template slot="right" >
        <img  class="hang_img" @click="del" src="../../../assets/images/wallet_del.png" alt />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { SwipeCell, Dialog } from "vant";
export default {
  data() {
    return{

    }
    
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
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"wallet";
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
    del() {
      Dialog.confirm({
        message: "确认删除此条"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
/deep/ .van-swipe-cell {
  border-top: 10 / @base solid #f7f7f7;
}
/deep/ .van-swipe-cell__right {
  width: 90 / @base;
  display: flex;
  align-items: center;
  overflow: hidden;
  img {
    width: 44 / @base;
    height: 44 / @base;
    background-size: 100% 100%;
    margin-left: 10 / @base;
  }
}
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
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    // border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 50px;
}
.banner {
  width: 89%;
  height: 300 / @base;
  background-image: linear-gradient(-37deg, #f1dafe 0%, #9948c3 100%),
    linear-gradient(#beb1b1, #beb1b1);
  background-blend-mode: normal, normal;
  border-radius: 38 / @base;
  opacity: 0.49;
  margin: 0 auto;
  padding: 34 / @base 37 / @base 25 / @base 37 / @base;
  .banner_title {
    font-size: 24 / @base;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 31px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .banner_middle {
    display: flex;
    justify-content: space-between;
    margin-top: 25 / @base;
    font-size: 90 / @base;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    span {
      margin: auto 0;
      font-size: 34 / @base;
      color: #ffffff;
    }
  }
  .banner_bottom {
    margin-top: 15 / @base;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 35 / @base;
    font-size: 22 / @base;
    color: #ffffff;
    .banner_bottomleft {
      display: flex;
      height: 100%;
      img {
        width: 43 / @base;
        height: 35 / @base;
        background-size: 100% 100%;
      }
      span {
        margin-left: 13 / @base;
        margin-top: 5 / @base;
      }
    }
    .banner_bottomright {
      display: flex;
      height: 100%;
      img {
        width: 26 / @base;
        height: 32 / @base;
        background-size: 100% 100%;
        margin-top: 3 / @base;
      }
      span {
        margin-left: 13 / @base;
        margin-top: 5 / @base;
      }
    }
  }
}
// 中间部分
.card {
  display: flex;
  justify-content: space-between;
  width: calc(~"100% - 189px");
  height: 80 / @base;
  margin: 85 / @base auto 62 / @base auto;
  .card_box {
    img {
      width: 43 / @base;
      height: 35 / @base;
      margin: 0 auto;
      background-size: 100% 100%;
    }
    p {
      font-size: 26 / @base;
      color: #000000;
      font-weight: bold;
      margin-top: 10 / @base;
    }
  }
}
.mingxi {
  font-size: 32 / @base;
  font-weight: bold;
  font-stretch: normal;
  color: #000000;
  padding-left: 37 / @base;
  padding-bottom: 27 / @base;
}
.list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  // height: 97 / @base;

  padding: 36 / @base 39 / @base;
  .list_left {
    display: flex;
    align-items: center;
    img {
      width: 16 / @base;
      height: 16 / @base;
      background-size: 100% 100%;
    }
    span {
      font-size: 26 / @base;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #000000;
      margin-left: 20 / @base;
    }
  }
  .list_right {
    font-size: 22 / @base;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #000000;
  }
}
</style>