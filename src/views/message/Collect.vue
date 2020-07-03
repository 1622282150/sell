<template>
  <div class="collect">
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">获赞</div>
    </header>
    <div class="bu"></div>
    <div class="main">
      <ul>
        <li @click="other(item.UserId)" v-for="(item, index) in huozansum" :key="index">
          <img :src="item.UserAvator" alt />
          <div class="jieshao">
            <p>{{item.UserName}}</p>
            <span>赞了你的作品</span>
            <p class="time">{{item.Createdate}}</p>
          </div>
          <!-- <div class="btn">
            <img :src="item.MainIdImg" alt />
          </div>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
/*eslint-disable*/
import Return from "../../components/FixedHeader.vue";
export default {
  components: {
    Return
  },
  data() {
    return {
      huozansum: []
    };
  },
  mounted() {
    this.get_huozan();
  },
  methods: {
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
        let url = this.$domain.url+"collect";
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
    other(id){
      this.$router.push({
        path:'/otherself',
        query:{
          id:id
        }
      })
    },
    get_huozan() {
      request
        .post(this.$api + "/mobile/GetLikedCenter", {
          Page: 1,
          Rows: 20
        })
        .then(res => {
          console.log(res);
          this.huozansum = res.Data.List;
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
.collect {
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
    height: 50px;
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
  height: 50px;
}
.main {
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
        }
        .time {
          margin-top: 5 / @base;
          font-size: 18 / @base;
          color: #a5a5a5;
        }
      }
      .btn {
        position: absolute;
        right: 40 / @base;
        top: 22 / @base;
        img {
          width: 100 / @base;
          height: 100 / @base;
          border-radius: 12 / @base;
        }
      }
    }
  }
}
</style>
