<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">粉丝</div>
    </header>
    <div class="bu"></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        @click="otherself(item.LinkUserId)"
        class="user_list"
        v-for="(item,index) in user_list"
        :key="index"
      >
        <img :src="item.UserAvator" alt />
        <div class="user_list_middle">
          <div class="user_list_middle_name">{{item.UserName | renMenLength}}</div>
          <div class="user_list_middle_des">{{item.PersonalitySignature}}</div>
        </div>
        <i
          style="position:absolute;top:0.3rem;right:1.8rem;color:#B1B1B1;font-size:23px"
          class="iconfont icon-xiaoxiduihuaxinxi"
        ></i>
        <i
          style="position:absolute;top:0.3rem;right:.6rem;color:#B1B1B1;font-size:23px"
          class="iconfont icon-yonghuqueren"
        ></i>
      </div>
    </van-list>
  </div>
</template>

<script>
import request from "@/utils/request";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      user_list: []
    };
  },
  mounted() {
    this.getfans();
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
        let url = this.$domain.url+"my_fans";
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
    // 去别人
    otherself(id) {
      this.$router.push({
        path: "/otherself",
        query: { id: id }
      });
    },
    onLoad() {
      this.page += 1;
      this.getfans();
    },
    getfans() {
      request
        .post(this.$api + "/mobile/GetMyFansPageList", {
          Page: this.page
        })
        .then(res => {
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.user_list.push(arr[i]);
            }
          } else {
            this.finished = true;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
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

// 列表
.user_list {
  width: 100%;
  height: 100 / @base;
  //  background:red;
  padding: 10 / @base 40 / @base;
  display: flex;
  position: relative;
  img {
    margin-top: 10 / @base;
    width: 60 / @base;
    height: 60 / @base;
    border-radius: 50%;
  }
  .user_list_middle {
    padding-left: 20 / @base;
    width: 60%;
    height: 80 / @base;
    //  background: blue;
    .user_list_middle_name {
      width: 100%;
      height: 40 / @base;
      font-size: 30 / @base;
    }
    .user_list_middle_des {
      width: 100%;
      height: 40 / @base;
      font-size: 28 / @base;
      color: #b1b1b1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
  }
  .user_ball {
    font-size: 25 / @base;
    color: white;
    background: #b896ea;
    width: 170 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 15 / @base 0;
  }
  .user_activeball {
    font-size: 25 / @base;
    color: white;
    background: #c1bdcb;
    width: 170 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 15 / @base 0;
  }
}
</style>