<template>
  <div class="infrom">
    <header>
      <i @click="goback" class="iconfont icon-zuojiantou"></i>
      <div class="head">系统通知</div>
    </header>
    <div class="bu"></div>
    <div class="main">
      <div v-if="!list.length" class="mei">暂时还没有消息呦~</div>
      <ul v-else>
        <!-- <li v-for="(item, index) in list" :key="index">
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
        </li>-->
        <li v-for="(item, index) in list" :key="index" @click="todetail(item.Id)">
          <div class="li_time">{{item.Createdate}}</div>
          <div class="li_item">
            <div class="li_title">{{item.Title}}</div>
            <div class="li_content" v-html="item.Content"></div>
          </div>
        </li>
      </ul>
    </div>
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
      list: []
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    todetail(id){
      this.$router.push({
        path:'/informdetail',
        query:{
          id:id
        }
      })
    },
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
        let url = this.$domain.url+"inform";
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
    get() {
      request
        .post(this.$api + "/mobile/GetMessageCenter", {
          Page: 1,
          Rows: 20
        })
        .then(res => {
          console.log(res);
          this.list = res.Data.List;
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
      width: 100%;
      .li_time {
        font-size: 18 / @base;
        color: #676767;
        text-align: center;
        margin: 39 / @base auto 27 / @base auto;
      }
      .li_item {
        width: 670 / @base;
        // height: 150/@base;
        overflow: hidden;
        // height: 160 / @base;
        border-radius: 10 / @base;
        background: #eeeeee;
        padding: 22 / @base 49 / @base 30 / @base 22 / @base;
        margin: 0 auto;
        .li_title {
          font-size: 26 / @base;
          color: #333333;
        }
        .li_content {
          margin-top: 10/@base;
          font-size: 24 / @base;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
          line-height: 50/@base;
          height: 100/@base;
        }
      }
    }
  }
}
</style>
