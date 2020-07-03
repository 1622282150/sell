<template>
  <div>
    <div class="header">
      <i @click="goback" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou"></i>
      <span>肤质记录</span>
    </div>
    <div class="jicheng"></div>
    <!-- 没有记录 -->
    <div v-if="!UserSkinReportShortList.length" class="no_recode">
      <img src="../../assets/images/记录图标.png" alt />
      <p>你还没有进行过肤质检测</p>
      <a href="mqjapp://detection">立即检测</a>
    </div>
    <div class="box" v-else>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in  endlist" :key="index" class="recode_item">
          <div class="item_title">{{item.yyyyMM}}</div>
          <div class="item_box" @click="todetail(i.Id)" v-for="(i,index) in item.data" :key="index">
            <div class="item_left">{{i.dd}}日</div>
            <div class="item_middle">
              <img src="../../assets/images/时间图标.png" alt />
              <div>{{i.time}}</div>
            </div>
            <div class="item_right">{{i.SkinScore}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      UserSkinReportShortList: [], //肤质历史记录
      endlist: [],
      page: 1
    };
  },
  mounted() {
    this.GetUserSkinReportShortList();
  },
  methods: {
    onLoad() {
      this.page += 1;
      this.GetUserSkinReportShortList();
    },
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
        let url = this.$domain.url+"skintest";
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
    todetail(id) {
      console.log(id);
      this.$router.push({
        path: "/recode",
        query: {
          id: id
        }
      });
      // window.location.href='https://tb.53kf.com/code/app/10134076/1'
    },
    // 获取复制记录
    GetUserSkinReportShortList() {
      request
        .post(this.$api + "/mobile/GetUserSkinReportShortList", {
          Page: this.page,
          Rows: 5,
          Order: "desc",
          Sort: "CreateDate"
        })
        .then(res => {
          this.loading = false;
          if (res.Data.List.length) {
            this.UserSkinReportShortList = this.UserSkinReportShortList.concat(res.Data.List);
            var arr = this.UserSkinReportShortList;
            var map = {};
            var dest = [];
            for (var i = 0; i < arr.length; i++) {
              var ai = arr[i];
              if (!map[ai.yyyyMM]) {
                dest.push({
                  yyyyMM: ai.yyyyMM,
                  data: [ai]
                });
                map[ai.yyyyMM] = ai;
              } else {
                for (var j = 0; j < dest.length; j++) {
                  var dj = dest[j];
                  if (dj.yyyyMM == ai.yyyyMM) {
                    dj.data.push(ai);
                    break;
                  }
                }
              }
            }
            this.endlist = dest;
          } else {
            this.finished = true;
            console.log('结束了')
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.header {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  border-bottom: 1 / @base solid #ccc;
  position: fixed;
  top: 0;
  background: white;
  z-index: 1;
  i {
    font-size: 40 / @base;
  }
}
.jicheng {
  width: 100%;
  height: 120 / @base;
}

.no_recode {
  width: 100%;
  // height: 750/@base;
  // background:red;
  padding-top: 90 / @base;

  img {
    width: 321 / @base;
    margin: 0 auto;
    height: 213 / @base;
  }
  p {
    // font-family: "PingFangRegular";
    text-align: center;
    margin-top: 76 / @base;
    font-size: 32 / @base;
    color: #606060;
    font-weight: bold;
  }
  a {
    display: block;
    margin: 115 / @base auto;
    width: 300 / @base;
    height: 80 / @base;
    border-radius: 40 / @base;
    font-weight: blod;
    line-height: 80 / @base;
    color: #ffffff;
    font-size: 28 / @base;
    background: linear-gradient(131deg, #9557f6 0%, #8536ff 100%);
    text-align: center;
  }
}
// 历史记录
.box {
  width: 100%;
  .recode_item {
    width: 670 / @base;
    // height: 155/@base;
    // background:red;
    margin: 40 / @base;
    .item_title {
      // font-family: "PingFangMedium";
      font-size: 30 / @base;
      font-weight: bold;
      color: #333333;
      letter-spacing: 0;
      font-stretch: normal;
    }
    .item_box {
      position: relative;
      display: flex;
      width: 670 / @base;
      height: 100 / @base;
      margin-top: 26 / @base;
      background: #fbf5ff;
      border-radius: 15 / @base;
      .item_left {
        // font-family: "PingFangRegular";
        line-height: 100 / @base;
        font-size: 28 / @base;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0;
        color: #333333;
        margin-left: 13 / @base;
      }
      .item_middle {
        display: flex;
        height: 100 / @base;
        margin-left: 27 / @base;
        img {
          margin-top: 40 / @base;

          width: 19 / @base;
          height: 19 / @base;
          background-size: 100% 100%;
        }
        div {
          // font-family: "PingFangRegular";
          height: 100 / @base;
          line-height: 100 / @base;
          margin-left: 10 / @base;
          font-size: 20 / @base;
          font-weight: bold;
          color: #999999;
        }
      }
      .item_right {
        // font-family: "PingFangMedium";
        position: absolute;
        right: 39 / @base;
        top: 0;
        height: 100 / @base;
        line-height: 100 / @base;
        color: #b896ea;
        font-weight: bold;
        font-size: 48 / @base;
      }
    }
  }
}
</style>