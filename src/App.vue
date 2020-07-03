<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { Dialog } from "vant";
/*eslint-disable*/
export default {
  name: "App",
  data() {
    return {
      aspxauth: "",
      isapp: true
    };
  },
  created() {
    console.log("我是app.vue我先执行");
  },
  mounted() {
    this.gettoken();
    //  this.getQueryString();/
    //  console.log(this.aspxauth)
    //  window.localStorage.setItem('token',this.aspxauth)
    // window.localStorage.setItem('token',this.aspxauth)
  },
  methods: {
    gettoken() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
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
        console.log("我不是安卓也不是ios,我在哪");
      }
    }
    //   getQueryString() {
    // if(window.location.href.indexOf('?ASPXAUTH') !== -1){
    //        var obg={},a='';
    //     (a=window.location.search.substr(1))||(a=window.location.hash.split('?')[1])
    //     a.split(/&/g).forEach(function(item){
    //         obg[(item=item.split('='))[0]]=item[1];
    //     })
    //     this.aspxauth=obg.ASPXAUTH
    // }
    // },
  },
  computed: {
    back() {
      var slide = "";
      if (this.$route.meta.slide === "slide-back") slide = "slide-back";
      else if (this.$route.meta.slide === "slide-to") slide = "slide-to";
      else slide = null;

      return slide;
    }
  }
};

window.addEventListener("popstate", function() {
  // console.log(6666);
});
</script>

<style lang='less'>
@import "./common/font/font.css";
// @import '../static/font.css';
body {
  font-family: "PingFangMedium";
}
* {
  margin: 0;
}
[v-cloak] {
  display: none !important;
}
#app {
  width: 100%;
  // height: 100%;
  /* overflow: hidden; */
}
.slide-to-enter {
  transform: translateX(-100%);
  opacity: 1;
}
.slide-to-leave-to {
  transform: translateX(100%);
  position: absolute;
  opacity: 0;
}
.slide-to-enter-active,
.slide-to-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition: all 0.5s;
}

.slide-back-enter {
  transform: translateX(100%);
  opacity: 1;
}
.slide-back-leave-to {
  transform: translateX(-100%);
  position: absolute;
  opacity: 0;
}
</style>
