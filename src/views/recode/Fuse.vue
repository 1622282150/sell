<template>
  <div class="fuse clearfix">
    <div class="top clearfix">
      <span class="left fl" v-html="name"></span>
      <span v-show="isadvice" class="right fr" @click="gaishan(name)">改善方案 ></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isadvice:{
     type:Boolean,
     default:true
    },
    name: {
      type: String,
      default: ""
    },
    grade:{
      // type: Number,
      // default: 1
    }
  },
  methods:{
    gaishan(name){
      console.log(this.grade)
      this.$router.push({
        path:'/advice',
        query:{
          name:name,
          grade:this.grade
        }
      })
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.fuse {
  padding: 0 40 / @base;
  .top {
    margin-top:52/ @base;
    .left {
      color: #b695e9;
      border-left: 10 / @base solid #b695e9;
      font-size: 40 / @base;
      padding-left: 15 / @base;
      vertical-align: middle;
    }
    .right {
      margin-top: 6/ @base;
      font-size: 30 / @base;
      color: #6124c1;
      vertical-align: middle;
    }
  }
}
</style>