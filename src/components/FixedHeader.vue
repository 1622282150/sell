<template>
  <div>
    <div class="wai">
      <div class="headtop">
        <i class="iconfont icon-zuojiantou jiantou" @click="back"></i>
        <slot></slot>
      </div>
    </div>
    <div class="bu"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created(){
    console.log(window.location.href)
    
  },
  mounted(){
   
  },
  methods: {
    back() {
      console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
  
        console.log("我是要去安卓");
      
        window.android.closePage();
        
      }else{
        this.$router.back(-1)
      }
    }
  }
};
</script>
<style lang="less" scoped>
@base: 75rem;
.wai {
  position: relative;
}
.headtop {
  color: black;
  position: fixed;
  top: 0;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  background: white;
  z-index: 1;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
  font-size: 38 / @base;

  i {
    position: absolute;
    top: 0;
    left: 30 / @base;
    font-size: 50 / @base;
    //   font-weight: 700;
  }
}
.bu {
  width: 100%;
  height: 120 / @base;
}
</style>