<template>
  <div>
    <header>
      <i @click="fanhui" class="iconfont icon-zuojiantou"></i>
      <div class="head"></div>
    </header>
    <div class="bu"></div>
    <img class="banner" src="../../../assets/images/code_dui.png" alt />
    <p class="p1">评价成功</p>
    <div class="btn" @click="fanhui">返回我的宝贝</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    fanhui() {
      this.$router.push("/order" + "?index=-1");
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // background:#B694E8;
  // z-index: 10;
  span {
    font-size: 26 / @base;
    position: fixed;
    right: 30 / @base;
    top: 32 / @base;
    // font-weight: bold;
  }
  i {
    position: fixed;
    left: 30 / @base;
    top: 25 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100 / @base;
    // background: #f4f4f4;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    // border-bottom: 1px solid #e6e6e6;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.banner {
  width: 130 / @base;
  height: 130 / @base;
  background-size: 100% 100%;
  margin: 200 / @base auto 100 / @base auto;
}
.p1 {
  width: 100%;
  font-size: 28 / @base;
  text-align: center;
  font-weight: bold;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 80 / @base;
  background: linear-gradient(to left, #9441ff, #eb9fdf);
  margin: 200 / @base auto 0 auto;
  font-size: 25 / @base;
  color: white;
  border-radius: 9px;
}
</style>