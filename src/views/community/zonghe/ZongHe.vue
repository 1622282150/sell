<template>
  <div>
    <!-- 顶部 -->
    <div class="main">
      <div class="header">
        <i style="position:absolute;left:13%;" class="iconfont icon-sousuo"></i>
        <i @click="back" class="iconfont icon-zuojiantou"></i>
        <input type="text" v-model="keyword" @click="search1()" />
      </div>
    </div>
    <!-- 标题 -->
    <div class="son">
      <van-tabs
        style="border-bottom:1px solid #e6e6e6"
        @click="onClick"
        ref="tab"
        v-model="active"
        title-active-color="#ba9aeb"
        line-height="0"
      >
        <van-tab v-for="(i,index) in titleinfo" :key="index" :title="i.title"></van-tab>
      </van-tabs>
    </div>

    <component :is="name" :key="keyword"></component>
  </div>
</template>
<script>
import ZongHe_all from "./ZongHe_all";
import WenZhang from "./Article_Wenzhang.vue";
import TieZi from "./Article_Tiezi.vue";
import HuaTi from "./Article_Huati.vue";
import ShangPin from "./Shop_shangpin";
import DianPu from "./Shop_dianpu";
import XiangMu from "./Shop_Xiangmu";
import YongHu from "./User_Yonghu";
import request from "@/utils/request";
// import BScroll from "better-scroll";
import { Search, Tab, Tabs } from "vant";
export default {
  components: {
    WenZhang
  },
  computed: {
    name() {
      let name;

      // if (this.active === 0)
      //  {
      //   name = ZongHe_all;
      //  return name
      //  }
      // else if
      // (this.active === 1) {name = WenZhang; return name}
      // else
      // {name = Huati;return name}
      if (this.active === 0) {
        name = WenZhang;
        return name;
      } else if (this.active === 1) {
        name = TieZi;
        return name;
      } else if (this.active === 2) {
        name = HuaTi;
        return name;
      } else if (this.active === 3) {
        name = ShangPin;
        return name;
      } else if (this.active === 4) {
        name = DianPu;
        return name;
      } else if (this.active === 5) {
        name = XiangMu;
        return name;
      } else if (this.active === 6) {
        name = YongHu;
        return name;
      }
    }
  },
  data() {
    return {
      keyword: "",
      titleinfo: [
        // { title: "综合" },
        { title: "文章" },
        { title: "帖子" },
        { title: "话题" },
        { title: "商品" },
        { title: "店铺" },
        { title: "项目" },

        { title: "用户" }
      ],
      active: 0,
      value: "",
      placeholder: ""
    };
  },
  methods: {
    //返回方法
    back(){
        console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back(-1)
      }
    },
    //选择题目
    onClick() {
      console.log(this.active);
    },
    search1(){
      this.$router.push('/search_zonghe')
    },
    
  },
  mounted() {
    //获取name关键词参数
    // this.placeholder = this.$route.query.name;
    // console.log("收到的" + this.$route.query.name);
    this.keyword = this.$route.query.name;
  }
};
</script>
<style scoped lang="less" >
@base: 75rem;
.main {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background: white;
}

.son {
  width: 100%;
  position: fixed;
  top: 100 / @base;
  z-index: 2;
}
.header {
  position: relative;
  width: 100%;
  height: 100 / @base;
  line-height: 100 / @base;
  // background: red;
  display: flex;
  i {
    margin-left: 30 / @base;
    font-size: 38 / @base;
  }
  input {
    margin-left: 30 / @base;
    width: 80%;
    height: 50 / @base;
    margin-top: 25 / @base;
    font-size: 30 / @base;
    background: #f5f5f5;
    border-radius: 20px;
    padding-left: 70 / @base;
  }
}
</style>