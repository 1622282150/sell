<template>
  <div class="signal">
    <i class="iconfont icon-no-signal"></i>
    <p>无网络连接, 请检查您的网络 . . .</p>
    <button>重试</button>
  </div>
</template>

<script>
/*eslint-disable*/
export default {};
</script>
<style scoped lang='less'>
@base: 75rem;
.signal {
  padding-top: 300 / @base;
  text-align: center;
  i {
    font-size: 200 / @base;
    color: #7d7e80;
  }
  button {
    width: 100 / @base;
    height: 45 / @base;
  }
}
</style>