<template>
  <header>
    <div class="search">
      <input type="text" placeholder="大家都在搜, 美肤美妆" />
    </div>
    <div class="pos"></div>
  </header>
</template>

<script>
/*eslint-disable*/
export default {};
</script>
<style scoped lang='less'>
@desgin: 750;
@base: 75rem;

header {
  position: fixed;
  top: 0;
  height: 88 / @base;
  width: 100%;
  padding: 0 100 / @base;
  background-color: #b695e9;
  z-index: 999;
  .search {
    font-size: 0;
    input {
      width: 100%;
      height: 45 / @base;
      margin-top: 25 / @base;
      border-radius: 30 / @base;
      padding-left: 80 / @base;
      background: #fff url(../assets/images/search.png) 30 / @base center
        no-repeat;
      font-size: 20 / @base;
      color: #303030;
      background-size: 30 / @base 30 / @base;
      &::-webkit-input-placeholder {
        color: #b9b9b9;
        font-size: 20 / @base;
      }
    }
  }
  .pos {
    position: absolute;
    right: 0;
    top: 0;
    background: url(../assets/images/postion.png) center no-repeat;
    width: 100 / @base;
    height: 88 / @base;
    background-size: 41 / @base 45 / @base;
  }
}
</style>