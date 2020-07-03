<template>
  <div>
    <header>
      <i @click="goback" class="iconfont icon-zuojiantou"></i>
      <div class="head">系统通知</div>
    </header>
    <div class="bu"></div>
    <div class="title">萨达</div>
    <p class="time">202020202</p>
    <div class="box">
      <p class="top">为净化我们真实、美好、多元的社区生态，营造健康的生态环境。对待违规行为，我们将采取0容忍的正常，竭尽全力守护魅千金家园！</p>
      <p class="box_title">以下为本月部分违规用户:</p>
      <div class="box_item">
        <p class="p1">违规ID</p>
        <div class="zise">
          <p v-for="(item,index) in 10" :key="index">二大爷</p>
        </div>
        <div class="bec">
          违规原因:
          <span>低俗评论</span>
        </div>
        <div class="bec">
          处罚:
          <span>禁言48小时</span>
        </div>
        <div class="guifan"></div>
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
    height: 100 / @base;
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
  height: 100 / @base;
}
.title {
  font-size: 30 / @base;
  color: #b58eeb;
  text-align: center;
  margin-top: 39 / @base;
}
.time {
  width: 334 / @base;
  height: 32 / @base;
  line-height: 32 / @base;
  font-size: 18 / @base;
  color: #676767;
  background: #eeeeee;
  border-radius: 15 / @base;
  margin: 20 / @base auto 0 auto;
  text-align: center;
}
.box {
  width: 100%;
  height: auto;
  padding: 42 / @base;
  .top {
    font-size: 26 / @base;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #676767;
  }
  .box_title {
    font-size: 28 / @base;
    font-weight: normal;
    letter-spacing: 0px;
    color: #676767;
    margin-top: 40 / @base;
  }
  .box_item {
    .p1 {
      font-size: 26 / @base;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #676767;
      margin: 40 / @base 0;
    }
    .zise {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background-color: #f3ebff;
      padding: 18 / @base;
      margin-bottom: 15 / @base;
      p {
        margin: 0 15 / @base;
        font-size: 24 / @base;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40 / @base;
        letter-spacing: 0px;
        color: #676767;
      }
    }
  }
  .bec {
    font-size: 24 / @base;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    span {
      font-size: 24/@base;
      font-weight: normal;
      letter-spacing: 0px;
      color: #cd0101;
    }
  }
}
</style>