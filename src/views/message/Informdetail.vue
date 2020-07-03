<template>
  <div class="infromdetail">
    <header>
      <i @click="goback" class="iconfont icon-zuojiantou"></i>
      <div class="head">系统通知</div>
    </header>
    <div class="bu"></div>
    <div class="title">{{list.Title}}</div>
    <p class="time">{{list.CreateDate}}</p>
    <div class="box" v-html="list.Content"></div>
  </div>
</template>

<script>
/*eslint-disable*/
import request from "@/utils/request";
import Return from "../../components/Return.vue";
export default {
  components: {
    Return
  },
  data() {
    return {
      list: [],
      id:''
    };
  },
  mounted() {
    this.id=this.$route.query.id
    this.get();
  },
  methods: {
    // 返回
    goback() {
     
        this.$router.back();
      
    },
    // 获取消息
    get() {
      request
        .post(this.$api + "/mobile/GetNoticeInfoContent", {
       
          id:this.id
        })
        .then(res => {
          console.log(res);
          this.list = res.Data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang='less'>
@base: 75rem;
.infromdetail {
  width: 100%;
  height: 100%;
}
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
    height: 100 / @base;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.title{
    font-size: 30/@base;
    color: #b58eeb;
    text-align: center;
    margin-top: 39/@base;

}
.time{
    width: 334/@base;
    height: 32/@base;
    line-height: 32/@base;
    font-size: 18/@base;
    color: #676767;
    background: #eeeeee;
    border-radius: 15/@base;
    margin: 20/@base auto 0 auto;
    text-align: center;

}
.box{
    font-size: 26/@base;
    width: 100%;
    padding: 60/@base 40/@base;
    color: #676767;
}
</style>
