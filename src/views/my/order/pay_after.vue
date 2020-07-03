<template>
  <div>
    <header>
      <Return>支付完成</Return>
    </header>
    <div class="bu"></div>
    <div class="num">支付金额: <span>¥ 200</span></div>
    <img src="../../../assets/images/order_success.png" alt="">
    <p class="over">订单完成</p>
    <p class="time">完成时间:2019年11月11日 20:30:50</p>
    <div class="di">完成</div>
  </div>
</template>

<script>
import { Icon, CountDown, Popup  } from "vant";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {

    };
  }
};
</script>
<style scoped lang='less'>
@base:75rem;
header {
  background: #fff;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #e6e6e6;
  z-index: 100;
}
.bu {
  width: 100%;
  height: 102 / @base;
}
.num{
    margin-left: 40/@base;
    margin-top: 32/@base;
    font-size: 30/@base;
    font-weight: bold;
    color: #363636;
    span{
        color: #b695ea;
    }
}
img{
    width: 173/@base;
    height: 208/@base;
    margin: 77/@base auto 0 auto
    
}
.over{
  margin: 59/@base auto 0 auto;
  font-size: 48/@base;
  font-weight: bold;
  color: #363636;
  text-align: center;
}
.time{
   font-size: 24/@base;
   font-weight: bold;
   color: #6b6b6b;
   text-align: center;
   margin-top: 40/@base;
}
.di{
  width: 670/@base;
  height: 80/@base;
  line-height: 80/@base;
  text-align: center;
  background: #b694ea;
  border-radius: 40/@base;
  margin: 115/@base auto 0 auto;
  font-size: 30/@base;
  font-weight: bold;
  color: #fff;
}
</style>