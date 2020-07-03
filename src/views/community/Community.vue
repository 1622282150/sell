<template>
 <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" :swipe-options="{direction: 'horizontal'}" class="wrapper">
  <div class="containere">
    <header>
      <div class="out">
        <van-tabs
          ref="certy"
          type="line"
          :border="false"
          line-width="40"
          v-model="active"
          @click="pid"
          color="#FDF467"
          background="none"
        >
          <van-tab title="关注"></van-tab>
          <van-tab title="推荐"></van-tab>
          <van-tab title="话题"></van-tab>
        </van-tabs>
        <!-- <Tabs :list="list" backgroundColor="#fbf567" @id="pid"></Tabs> -->
      </div>

      <section @click="tozong">
        <Searchm @tofather="toshow" class="padding"></Searchm>
      </section>
    </header>

    <component :is="name"></component>
    <!-- <Tabbar></Tabbar> -->
    <grade></grade>
  </div>
 </v-touch> 
</template>

<script>
/*eslint-disable*/
// import Tabbar from "../../components/Tabbar";
import grade from '@/components/GradePopup'
import { Tab, Tabs, Dialog } from "vant";
import request from "@/utils/request";
// import Tabs from "../../components/Tabs";
import Searchm from "../../components/Searchm";
import GuanZhu from "./GuanZhu";
import Huati from "./HuaTi";
import Tuijian from "./TuiJian";
export default {
  data() {
    return {
      active: 1,
      guanjianci: "",
      scrollTop: 0
    };
  },
  components: {
    // Tabs,
    Searchm,
    GuanZhu,
    Huati,
    Tuijian,
    grade
    // Tabbar
  },
  activated() {
    console.log("上次" + this.scrollTop);
    window.scrollTo(0, this.scrollTop); //每次进入页面时滚轮位置在上次的位置
    //this.scrollTop = 0;
    window.addEventListener("scroll", this.handleScroll); //每次进入开启滚轮监听
  },
  deactivated() {
    //离开该页面时调用的方法
    window.removeEventListener("scroll", this.handleScroll); //每次离开页面时去除这个监听
  },
  mounted() {
    window.test =this.test
    $(".van-tabs__nav--line").css("padding-bottom", "12px");
    // $(".van-tabs__line").css("width", "35px!important");
    // .van-tab
    $(".van-tab").css("font-size", "16px");
    // console.log(this.id)
    // this.$refs.certy.border=false
    console.log("初始" + this.active);
  },
  updated() {
    //  $(".van-tab").css("font-size", "16px");
  },
  methods: {
    // 手指方法
    swiperleft(){
     console.log('左滑要加')
     this.active+=1
     this.active>2?this.active=2:console.log('到头了')
    },
    swiperright(){
      this.active-=1
      console.log('右划减')
      this.active<0?this.active=0:console.log('到头了')
    },


     test(params) {
      window.localStorage.setItem("token", params);
    },
    // 安卓调用的方法
  
    // 去搜索框
    tozong() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.goToHome()
        var url = this.$domain.url+"search_zonghe";
        console.log(url);
        window.android.openNewPage(url);
        // this.$router.push("/search_zonghe");
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"search_zonghe";
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push("/search_zonghe");
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    toshow(data) {
      this.guanjianci = data;
      console.log("我是父" + this.guanjianci);
    },
    pid(name, title) {
      // this.id = index;
      this.active = name;
      console.log("现在的索引" + this.active);
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
    }
  },
  computed: {
    name() {
      let name;
      console.log("变化的" + this.active);

      if (this.active === 0) {
        name = GuanZhu;
        return name;
      } else if (this.active === 1) {
        name = Tuijian;
        return name;
      } else if (this.active === 2) {
        name = Huati;
        return name;
      }
    }
  }
};
</script>
<style scoped lang='less'>
.wrapper{
  touch-action: pan-y!important;
}
.van-tabs__nav--line {
  padding-bottom: 12px !important;
}

@base: 75rem;
.containere {
  padding-top: 230 / @base;
  width: 100%;
  height: 100%;
}
header {
  height: 230 / @base;
  width: 100%;
  background: linear-gradient(45deg, #e3e8ff, #d6c8ff);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .out {
    width: 400 / @base;
    padding-top: 30 / @base;
    margin: 0 auto;
  }
  .padding {
    margin-top: 20 / @base;
    padding: 0 20 / @base;
  }
}
</style>