<template>
  <div class="infrom">
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">私信</div>
    </header>
    <div class="bu"></div>
    <div class="main">
      <div class="mei">暂时还没有消息呦~</div>
      <!-- <ul>
       
        <li v-for="(item, index) in list" :key="index">
          <van-swipe-cell>
          <img src="../../assets/images/message_xiaoxi.png" alt />
          <div class="jieshao">
            <p>{{item.Title}}</p>
            <span>{{item.Createdate}}</span>
          </div>
          <template slot="right">
           <van-button square type="danger" text="删除" />
        </template>
       </van-swipe-cell>
        </li>
        
      </ul> -->
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import request  from '@/utils/request'
import Return from "../../components/Return.vue";
export default {
  components: {
    Return
  },
  data(){
     return{
       list:[]
     }
  },
  mounted(){
    // this.get()
  },
  methods:{
    // 返回
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"sixin";
        console.log(url);
        this.$bridge.callhandler("closePage", url, data => {
          // 处理返回数据
        });
        this.$router.back();
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        this.$router.back();
      }
    },
      // 获取消息
      get(){
        request.post(this.$api+'/mobile/GetMessageCenter',{
          Page:1,
          Rows:6
        }).then(res=>{
          console.log(res)
          this.list=res.Data.List
        }).catch(err=>{
          console.log(err)
        })
      }
  }
};
</script>

<style scoped lang='less'>
@base: 75rem;
.infrom {
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
.main {
  .mei{
    font-size: 30/@base;
    margin-top: 40/@base;
    text-align: center;
    color: #666666;
  }
  ul {
    border-top: 1 / @base solid #bfbfbf;
    li {
      position: relative;
      padding: 20 / @base 40 / @base;
      img {
        display: inline-block;
        width: 80 / @base;
        height: 80 / @base;
        border-radius: 50%;
        vertical-align: top;
      }
      .jieshao {
        position: relative;
        display: inline-block;
        margin-left: 10 / @base;
        font-size: 0;
        p {
          font-size: 30 / @base;
          color: #333;
        }
        span {
          font-size: 24 / @base;
          color: #707070;
          margin-bottom: 2 / @base;
        }
        .time {
          margin-top: 5 / @base;
          font-size: 18 / @base;
          color: #a5a5a5;
        }
      }
    }
  }
}
</style>
