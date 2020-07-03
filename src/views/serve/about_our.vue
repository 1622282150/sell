<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">关于魅千金</div>
    </header>
    <div class="bu"></div>
     <img class="img" src="../../assets/images/mqj_log.png" alt="">
     <p class="p">魅千金</p>
     <div class="line"></div>

     <!-- 内容 -->
    <div class="hang" @click="other(item.src)" v-for="(item,index) in list" :key="index">
        <span class="left">{{item.title}}</span>
        <i class="iconfont icon-youjiantou"></i>
    </div>
    <p class="about">Copyright©2019</p>
    <p class="about2">魅千金mobile.merrychange.net版权所有</p>
    <p class="about2">魅千金APP归杭州讯英生物科技发展有限公司</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[
          {title:'社区规范',src:'/guifan'},
           {title:'服务协议',src:'/serve_user'},
            {title:'隐私政策',src:'/yinsi'},
             {title:'关于魅千金',src:'/aboutmqj'},
      ]
    };
  },
  methods: {
    goback(){
     console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back(-1)
      }
    },
    other(item){
        this.$router.push(item)
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.about{
  margin-top: 70/@base;
  text-align: center;
  font-size: 24/@base;
  color: #666666;
}
.about2{
  text-align: center;
  font-size: 24/@base;
  color: #666666;
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
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.img{
    width: 134/@base;
    height: 134/@base;
    background-size: 100% 100%;
    margin: 70/@base auto 33/@base auto;
}
.p{
    font-size: 26/@base;
    color: #333333;
    text-align: center;
    margin-bottom: 61/@base;
}
.line{
    width: 100%;
    height: 1px;
    background:#e6e6e6;
}
.hang{
    width: 100%;
    height: 90/@base;
    line-height: 90/@base;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 40/@base;
    .left{
        height: 90/@base;
        float: left;
        font-size: 28/@base;
        color: #333333;
    }
    i{
        float: right;
        color: #bbbbbb;
    }
}
</style>