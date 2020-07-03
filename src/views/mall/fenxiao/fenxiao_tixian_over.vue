<template>
  <div>
    <div class="header">
      提现
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="box">
      <div class="box_item">
        <img src="../../../assets/images/fenxiao_over.png" alt />
        <div class="item_right">
          <p class="p1">发起余额提现,等待处理</p>
          <p class="p2">{{start}}</p>
          <p class="p3">审核中</p>
          <p class="p4">预计{{finish}}前到账</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="main">
        <div class="main_item">
          <div class="left">提现金额</div>
          <div class="right">{{money}}</div>
        </div>
        <div class="main_item">
          <div class="left">到账支付宝</div>
          <div class="right">{{account}}</div>
        </div>
        <div class="over" @click="$router.push('/fenxiao_center')">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: "",
      finish: "",
      money: "",
      account: " "
    };
  },
  mounted() {
    this.start = this.$route.query.start;
    this.finish = this.$route.query.finish;
    this.money = this.$route.query.money;
    this.account = this.$route.query.account;
  },
  methods: {}
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56 / @base;
  font-size: 18px;
  color: #252525;
  letter-spacing: 0 / @base;
  z-index: 11;
  background: white;
  span {
    position: absolute;
    top: 21 / @base;
    right: 14 / @base;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #9d80f3;
  }
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width: auto;
    height: 21 / @base;
    background-size: 100% 100%;
  }
}
.jicheng {
  width: 100%;
  height: 56 / @base;
  margin-bottom: 2px;
}
.box {
  position: fixed;
  top: 56 / @base;
  bottom: 0;
  width: 100%;
  background: #f5f5f5;
  .box_item {
    display: flex;
    width: 100%;
    margin-top: 10 / @base;
    background: #ffffff;
    padding: 34 / @base 24 / @base 42 / @base 16 / @base;
    img {
      width: 25 / @base;
      height: 110 / @base;
      background-size: 100% 100%;
      margin-left: 14 / @base;
    }
    .item_right {
      margin-left: 17 / @base;
      .p1 {
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #9c49fc;
      }
      .p2 {
        margin-top: 4 / @base;
        font-size: 11px;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #8c8a90;
      }
      .p3 {
        margin-top: 44 / @base;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #9c49fc;
      }
      .p4 {
        margin-top: 4 / @base;
        font-size: 11px;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #8c8a90;
      }
    }
  }
  .line {
    width: calc(~"100% - 40px");
    height: 1px;
    background: #e6e6e6;
    margin-left: 16px;
  }
  .main {
    width: 100%;
    background: #ffffff;
    padding: 16 / @base 27 / @base 25 / @base 30 / @base;
    .main_item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 17 / @base;
      .left {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #6c6b6e;
      }
      .right {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #666666;
      }
    }
    .over {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 175 / @base;
      height: 30 / @base;
      background-image: linear-gradient(-35deg, #c976ff 0%, #dca2f1 100%),
        linear-gradient(#b694e8, #b694e8);
      background-blend-mode: normal, normal;
      border-radius: 5px;
      font-size: 15px;
      font-stretch: normal;
	letter-spacing: 1px;
    color: #ffffff;
    margin: 54/@base auto 0 auto;
    }
  }
}
</style>