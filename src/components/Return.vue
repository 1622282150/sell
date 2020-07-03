<template>
  <header :style="{color}">
    <div class="return" v-show="show">
      <i class="iconfont icon-zuojiantou" @click="back"></i>
    </div>
    <div class="des">
      <slot></slot>
    </div>
  </header>
</template>

<script>
/*eslint-disable*/
import "../fonts/iconfont.css";
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#333"
    }
  },
  data() {
    return {};
  },
  methods: {
    back() {
      console.log("我是子组件返回");
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://mobile.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else {
        this.$router.back(-1);
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  position: relative;
  height: 100 / @base;
  width: 100%;
  // line-height: 100 / @base;
  text-align: center;
  font-size: 36 / @base;
  // padding: 0 100 / @base;/
  color: #333;
  border-bottom: 1 / @base solid transparent;
  .return {
    position: absolute;
    left: 30 / @base;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    line-height: 100 / @base;
    i {
      font-size: 50 / @base;
    }
  }
  .des {
    height: 100%;
    line-height: 100 / @base;
  }
}
</style>