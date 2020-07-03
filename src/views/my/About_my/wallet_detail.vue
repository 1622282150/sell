<template>
  <div>
    <header>
      <i  class="iconfont icon-zuojiantou"></i>
      <div class="head">账单详情</div>
    </header>
      <div class="bu"></div>
      <!-- 头像 -->
      <img class="avat" src="../../../assets/images/wallet_money.png" alt="">
      <p class="title">魅千金平台商户</p>
      <p class="money">+10</p>
      <div class="list"><div class="list_left">商品说明</div><div class="list_right">充值金额</div></div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },methods:{

  }
};
</script>
<style scoped lang='less'>
@base:75rem;
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
    // border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 50px;
}
.avat{
    width: 100/@base;
    height: 100/@base;
    margin: 56/@base auto 29/@base auto;
    background-size: 100% 100%;
}
.title{
    font-size: 30/@base;
    font-weight: bold;
    letter-spacing: -2/@base;
    text-align: center;
	color: #3c3c3c;
}
.money{
    font-size: 46/@base;
    font-weight: bold;
    letter-spacing: 1/@base;
    color: #3c3c3c;
    text-align: center;
    margin-top: 24/@base;
}
.list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 40/@base;
  .list_left{
      font-size: 30/@base;
      color:#666666;
  }
  .list_right{
    font-size: 24/@base;
    color: #3c3c3c;
    letter-spacing: 1/@base;
  }
}
</style>