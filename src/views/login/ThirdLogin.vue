<template>
  <div class="third_login">
    <p>使用第三方登录</p>
    <a class="wechat"></a>
    <router-link to="/mlogin" class="phone"></router-link>
  </div>
</template>

<script>
/*eslint-disable*/

export default {};
</script>
<style scoped lang='less'>
@base: 75rem;
.third_login {
  text-align: center;
  font-size: 0;
  p {
    margin-bottom: 25 / @base;
    font-size: 28 / @base;
    color: #333;
  }
  a {
    display: inline-block;
    width: 76 / @base;
    height: 76 / @base;
    border-radius: 50%;
    &.wechat {
      background: url(../../assets/images/login_wechat.png) center no-repeat;
      background-size: 100%;
      margin-right: 25 / @base;
    }
    &.phone {
      background: url(../../assets/images/login_usephone.png) center no-repeat;
      background-size: 100%;
    }
  }
}
</style>