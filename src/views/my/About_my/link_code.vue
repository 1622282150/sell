<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">分享</div>
    </header>
    <div class="bu"></div>
    <!-- 二维码啊 -->
    <p>让好友扫描下方二维码,即可下载app呦~</p>
    <img src="../../../assets/images/link_code.png" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods:{
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
        let url = this.$domain.url+"link_code";
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
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 50px;
}
p {
  text-align: center;
  margin-top: 40 / @base;
  font-size: 28 / @base;
  color: #888888;
}
img{
    width:300/@base;
    height:300/@base;
    margin:100/@base auto;
    background-size: 100% 100%;
}
</style>