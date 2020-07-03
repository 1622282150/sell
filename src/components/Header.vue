<template>
  <!-- 头部 -->
  <div class="header" :style="{color: color}">
    <!-- <div class="top"> -->
    <i class="iconfont icon-zuojiantou jiantou" @click="$router.back()"></i>
    <i class="share iconfont icon-fenxiang" v-show="show"></i>
    <i class="collect iconfont icon-shoucang" v-show="star"></i>
    <!-- <span> -->
      <slot></slot>
    <!-- </span> -->
    <!-- </div> -->
  </div>
</template>
<script>
/*eslint-disable*/
import "../fonts/iconfont.css";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    star: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less" scoped>
@desgin: 1080;
@base: 108rem;

.header {
  
  height: 154 / @base;
  width: 100%;
  line-height: 154 / @base;
  // padding: 0 300 / @base 0 150 / @base;
  text-align: center;

  font-size: 44 / @base;
  // .top {
  //   padding: 0 300 / @base 0 150 / @base;
  //   line-height: 154 / @base;
  //   height: 154 / @base;
  //   width: 100%;

  i {
    position: absolute;
    top: 0;
    &.jiantou {
      left: 30 / @base;
      font-size: 70 / @base;
      font-weight: 700;
    }
    &.share {
      right: 30 / @base;
      font-size: 90 / @base;
    }
    &.collect {
      right: 175 / @base;
      font-size: 95 / @base;
    }
    // }
  }
}
</style>


