<template>
  <div class="login_way">
    <div class="login_des">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {};
</script>
<style scoped lang='less'>
@base: 75rem;
.login_des {
  padding: 0 40 / @base;
  h3 {
    margin-top: 30 / @base;
    font-size: 48 / @base;
    color: #333;
    font-weight: 400;
  }
  p {
    margin-top: 5 / @base;
    font-size: 20 / @base;
    color: #959595;
    letter-spacing: 2 / @base;
  }
}
</style>