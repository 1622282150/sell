<template>
  <div>
    <div class="zonghe_all">
      <div class="zonghe_all_title">
        <span class="zonghe_all_title_left">文章</span>
        <span class="zonghe_all_title_right">全部></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.zonghe_all {
  width: 100%;
  margin-top: 190 / @base;
  .zonghe_all_title {
    width: 100%;
    height: 100 / @base;
    //   background: red;
    padding: 20 / @base 40 / @base;
    position: relative;
    .zonghe_all_title_left {
      font-size: 35 / @base;
      position: absolute;
      top: 25 / @base;
      left: 40 / @base;
    }
    .zonghe_all_title_right {
      position: absolute;
      top: 30 / @base;
      right: 40 / @base;
      color: #b0b0b0;
      font-size: 28 / @base;
    }
  }
}
</style>