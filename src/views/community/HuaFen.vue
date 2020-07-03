<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">话题分类</div>
    </header>
    <div class="bu"></div>
    <div
      v-for="(item,index) in showinfo"
      :key="index"
      @click="tohot(item.Name,item.Id)"
      class="hang"
      style="position:relative"
    >
      <div class="img"><img  :src="item.CategoryImg" alt /></div>
      
     

      <span>{{item.Name}}</span>
      <i class="iconfont icon-youjiantou" style="position:absolute;right:20px"></i>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import Return from "../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      showinfo: []
    };
  },
  mounted() {
    this.gethuafen();
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
        let url = this.$domain.url+"huafen";
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
    tohot(title,id) {
      //  console.log(title)
      this.$router.push({
        path: "/tophot",
        query: {
          title: title,
          id:id
        }
      });
    },
    gethuafen() {
      request
        .post(this.$api + "/mobile/GetArticleChannelInfoList", {
          ParentId: 74,
          Page:1,
          Rows:30
          // ParentCode: ""
        })
        .then(res => {
          if (res.IsSuccess) {
            this.showinfo = res.Data.List;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
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
    z-index: 10;
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
.hang {
  width: 100%;
  height: 100 / @base;
  line-height: 100 / @base;
  border-bottom: 1px solid #e6e6e6;
  display: flex;

  .img {
    width: 60 / @base;
    height: 65 / @base;
    margin-left: 30 / @base;
    margin-top: 15 / @base;
    overflow: hidden;
    img{
      width: 100%;
      height: auto;
    }
  }
  span {
    font-size: 36 / @base;
    margin-left: 40 / @base;
  }
}
</style>