<template>
  <div class="search">
    <input type="text" placeholder="大家都在搜美肤美妆" v-model="value" @keyup.enter="onsubmit(value)"/>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      value: ""
    };
},
methods:{
      onsubmit(value){
        console.log('我是自组建的value'+value)
        this.$emit('tofather',value)
      }
    }
};
</script>
<style scoped lang='less'>
@desgin: 750;
@base: 75rem;

.search {
  font-size: 0;
  input {
    width: 100%;
    height: 60 / @base;
    border-radius: 30 / @base;
    padding-left: 80 / @base;
    background: #fff url(../assets/images/search.png) 30 / @base center
      no-repeat;
    font-size: 20 / @base;
    color: #303030;
    background-size: 30 / @base 30 / @base;
    &::-webkit-input-placeholder {
      color: #b9b9b9;
      font-size: 22 / @base;
      letter-spacing: 2 / @base;
      line-height: 25 / @base;
    }
  }
}
</style>