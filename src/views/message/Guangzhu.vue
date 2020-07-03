<template>
<div>
  <div class="guangzhu">
     <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">新增关注</div>
    </header>
    <div class="bu"></div>
     <div class="common_no" v-show="!this.user_list.length">
          <!-- <img src="../../assets/images/community_kong.png" alt /> -->
          <p>还没有内容呦~</p>
    </div>
    <div class="main">
      <ul>
        <li v-for="(item, index) in user_list" :key="index">
          <img  @click="lookother(item.UserId)" :src="item.UserAvator" alt />
          <div class="jieshao">
            <p>{{item.UserName|usernameLength}}</p>
            <span>关注了你</span>
            <p class="time">{{item.CreateDate}}</p>
          </div>
          <div class="btn"  @click="guanzhu(item.LinkUserId,index)" v-if="item.Type==1">
            <button>关注</button>
          </div>
          <div class="btn2" v-else>
            <button>已关注</button>
          </div>
        </li>
      </ul>
    </div>
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
  data(){
    return{
      loading: false,
      finished: false,
      page: 1,
      user_list: []
    }
  },
  mounted(){
    this.getfans();
  },
  methods:{
     lookother(id) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.goToHome()
        var url = this.$domain.url+"otherself?id=" + id;
        console.log(url);
        window.android.openNewPage(url);
       
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"otherself?id=" + id;
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push({
          path: "/otherself",
          query: {
            id: id
          }
        });
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    guanzhu(id,index){
       request
        .post(this.$api + "/mobile/AttentionAdd", {
          ByUserId:id
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("关注成功");
           this.getfans()
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    goback(){
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
        let url = this.$domain.url+"guangzhu";
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
        query: { id:id }
      });
    },
    onLoad(){
      this.page+=1
      this.getfans()
    },
    getfans() {
      request
        .post(this.$api + "/mobile/GetMyFansPageList", {
          Page:this.page
        })
        .then(res => {
          this.loading=false;
          if(res.Data.List.length){
            var arr=res.Data.List
            for(let i=0;i<arr.length;i++){
              this.user_list.push(arr[i])
            }
          }else{
            this.finished=true
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped lang='less'>
@base: 75rem;
.guangzhu {
  width: 100%;
  height: 100%;
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
    height:50px;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
}

.bu {
  width: 100%;
  height:50px;
}
.common_no {
  width: 100%;
  height: 650 / @base;
  // background:red;
  img {
    width: 60%;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  p {
    text-align: center;
    font-size: 30 / @base;
    color: #999999;
    margin-top: 50 / @base;
  }
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
        button {
          display: inline-block;
          width: 150 / @base;
          height: 50 / @base;
          background-color: #b795e9;
          border-radius: 40 / @base;
          font-size: 24 / @base;
          border: none;
          color: #fff;
          line-height: 50 / @base;
          text-align: center;
        }
      }
       .btn2 {
        position: absolute;
        right: 40 / @base;
        top: 22 / @base;
        button {
          display: inline-block;
          width: 150 / @base;
          height: 50 / @base;
          background-color:#f5f5f5;
          border-radius: 40 / @base;
          font-size: 24 / @base;
          border: none;
          color: #888888;
          line-height: 50 / @base;
          text-align: center;
        }
      }
    }
  }
}
</style>
