<template>
  <div>
    <div class="header">
      任务中心
      <img @click="back" class="img1" src="../../../assets/images/newfan.png" alt />
      <span @click="$router.push('/jifen_explain')">等级说明</span>
    </div>
    <div class="jicheng"></div>
    <div class="title">
      <div class="mingxi" @click="$router.push('/jifen_mingxi')">明细</div>
      <img class="title_touxiang" :src="list.Avatar" alt />
      <div class="title_middle">
        <p class="name">
          {{list.UserName | communityname}}
          <img
            v-if="list.PointLevel === 1"
            src="../../../assets/images/vip_vv1.png"
            alt
          />
          <img v-else-if="list.PointLevel === 2" src="../../../assets/images/vip_vv2.png" alt />
          <img v-else-if="list.PointLevel === 3" src="../../../assets/images/vip_vv3.png" alt />
          <img v-else-if="list.PointLevel === 4" src="../../../assets/images/vip_vv4.png" alt />
          <img v-else-if="list.PointLevel === 5" src="../../../assets/images/vip_vv5.png" alt />
          <img v-else-if="list.PointLevel === 6" src="../../../assets/images/vip_vv6.png" alt />
          <img v-else src="../../../assets/images/vip_vv7.png" alt />
        </p>
        <p class="zhuan" @click="$router.push('/jifen_mall')">积分换豪礼 ></p>
      </div>
    </div>
    <!-- 进度条 -->
    <div class="jindu">
      <div class="jindu_left">
        <p class="lv">M{{list.PointLevel}}</p>
        <p class="des">{{list.PointLevelName}}</p>
      </div>
      <div class="jindu_middle">
        <!-- <span class="jindu_span1">{{min_num}}</span> -->
        <span class="jindu_span2">{{max_num}}</span>
        <div
          v-if="percent_top"
          class="jindu_kuang"
          :style="{'left':'calc(' +percent_top+')'}"
        >{{now_num}}</div>
        <div class="tiao">
          <div :style="{width:percent}" class="tiao_active"></div>
        </div>
        <div
          v-if="list.PointLevel <= 6"
          class="tiao_bottom"
        >距离M{{list.PointLevel + 1}}{{next_name}}还差{{list.NextLevelRequiredPoints - list.CurrentPoints}}积分加油呀</div>
        <div v-else class="tiao_bottom">满级了哦~</div>
      </div>
      <div v-if="list.PointLevel <= 6" class="jindu_right">
        <p class="lv">M{{list.PointLevel + 1}}</p>
        <p class="des">{{next_name}}</p>
      </div>
    </div>
    <!-- 公用标题 -->
    <div class="all_h">成长权益</div>
    <div class="quanyi">
      <div class="quanyi_item" v-for="(item,index) in banner_list" :key="index">
        <img :src="list.PointLevel > item.level?item.active:item.origin" alt />
        <p :class="list.PointLevel > item.level?'active':''" v-html="item.name"></p>
      </div>
    </div>
    <p class="haike">完成任务领积分,今天还可领取{{list.RemainPoints}}积分</p>
    <!-- 新手任务 -->
    <div class="all_h">新手任务</div>
    <div class="box">
      <div class="box_item" v-for="(item,index) in list.BaseTaskList" :key="index">
        <img class="item_left" :src="item.Img" alt />

        <div class="item_middle">
          <div class="item_middle_top">
            {{item.Name}}
            <p>
              <span>积分+{{item.Points}}</span>
            </p>
          </div>
          <p class="item_middle_bottom">
            {{item.Description}}<span style="color:#9d80f3">({{item.CurrentTime}}/
            <span style="color:#9d80f3">{{item.LimitTime}}</span>)</span>
          </p>
        </div>
        <div style="opacity:0.4" class="item_right" v-if="item.FinishFlag">已完成</div>
        <div @click="to_xinshou(item.Code)" class="item_right" v-else>未完成</div>
      </div>
    </div>
    <!-- 每日任务 -->
    <div class="all_h">每日任务</div>
    <div class="box">
      <div class="box_item" v-for="(item,index) in meiri_list" :key="index">
        <div class="item_left2">
          <img :src="item.Img" alt />
        </div>
        <div class="item_middle">
          <div class="item_middle_top">
            {{item.Name}}
            <p>
              <span>积分+{{item.Points}}</span>
            </p>
          </div>
          <p class="item_middle_bottom">
            {{item.Description}} <span style="color:#9d80f3" v-show="item.Code != 'Invite'">({{item.CurrentTime}}/
            <span style="color:#9d80f3">{{item.LimitTime}}</span>)</span>
          </p>
        </div>

        <div>
           <div style="opacity:0.4" class="item_right" v-if="item.FinishFlag">已完成</div>
           <div @click="to_meiri(item.Code)" class="item_right" v-else><span v-if="item.Code != 'Invite'">未完成</span><span v-else>去邀请</span></div>
        </div>
        
      </div>
      <p v-if="!isshow" @click="zhankai" class="zhankai">
        展开
        <i class="iconfont icon-xiangxia2"></i>
      </p>
      <p v-else @click="shouqi" class="zhankai">
        收起
        <i class="iconfont icon-xiangshang2"></i>
      </p>
    </div>
    <!-- 成长任务 -->
    <div class="all_h">成长任务</div>
    <div class="box">
      <div class="box_item" v-for="(item,index) in list.GrowTaskList" :key="index">
        <div class="item_left2">
          <img :src="item.Img" alt />
        </div>
        <div class="item_middle">
          <div class="item_middle_top">
            {{item.Name}}
            <p>
              <span>积分+{{item.Points}}</span>
            </p>
          </div>
          <p class="item_middle_bottom">
            {{item.Description}}<span style="color:#9d80f3">({{item.CurrentTime}}/
            <span style="color:#9d80f3">{{item.LimitTime}}</span>)</span>
          </p>
        </div>
        <div style="opacity:0.4" class="item_right" v-if="item.FinishFlag">已完成</div>
        <div class="item_right" @click="toadd(item.Name)" v-else>未完成</div>
      </div>
    </div>
    <grade></grade>
  </div>
</template>

<script>
import grade from '@/components/GradePopup'
import request from "@/utils/request";
export default {
  components:{
   grade
  },
  data() {
    return {
      next_name: "",
      now_num: 0,
      min_num: 0,
      max_num: 0,
      percent: 0,
      percent_top: "",
      isshow: false,
      list: [],
      meiri_list: [],
      meiri_three: [],
      meiri_all: [],
      banner_list: [
        {
          level: 1,
          origin: require("../../../assets/images/task_11.png"),
          active: require("../../../assets/images/task_1.png"),
          name: "5分钟</br>视频发布"
        },
        {
          level: 3,
          origin: require("../../../assets/images/task_22.png"),
          active: require("../../../assets/images/task_3.png"),
          name: "无门槛包邮"
        },
        {
          level: 4,
          origin: require("../../../assets/images/task_33.png"),
          active: require("../../../assets/images/task_2.png"),
          name: "积分购物"
        },
        {
          level: 5,
          origin: require("../../../assets/images/task_44.png"),
          active: require("../../../assets/images/task_4.png"),
          name: "购物95折"
        },
        {
          level: 6,
          origin: require("../../../assets/images/task_55.png"),
          active: require("../../../assets/images/task_5.png"),
          name: "个人</br>商品橱窗"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.gettask();
  },
  methods: {
    back() {
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
        let url = this.$domain.url + "task_center";
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
    // 新手任务点击事件
    to_xinshou(Code) {
      // console.log(name);
      if (Code == "BindUserName") {
        this.$router.push("/realname");
      } else if (Code == "BindMobile") {
        this.$router.push("/set_mobile");
      } else if (Code == "CompleteInfo") {
        this.$router.push("/edit");
      }
    },
    // 去安卓
    toandroid(par) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      // 跳社区
      if (isAndroid) {
        // window.android.Tocommunity();
      }
    },
    //每日任务点击事件
    to_meiri(Code) {
      console.log(Code);
      if (Code == "TestSkin") {
        location.href = "mqjapp://detection:1";
      } else if (Code == "TestFace") {
        location.href = "mqjapp://showcase:1";
      } else if (Code == "Publish") {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        // 跳发布
        if (isAndroid) {
           window.location.href='mqjapp://fabu'
        }
      } else if (Code == "Comment" || Code == "Share") {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        // 跳社区
        if (isAndroid) {
          window.android.Tocommunity();
        }
      } else if (Code == "Invite") {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        // 跳wode
        if (isAndroid) {
          window.location.href="mqjapp://my"
        }
      }
    },
    // 成长任务点击事件
    toadd() {
      this.$router.push("/my_fabu");
    },
    zhankai() {
      this.meiri_list = this.meiri_all;
      this.isshow = true;
    },
    shouqi() {
      this.meiri_list = this.meiri_three;
      this.isshow = false;
    },
    // 转化数
    toPercent(point) {
      var str = Number(point * 100).toFixed(1);
      str += "%";
      return str;
    },
    gettask() {
      request
        .post(this.$api + "/mobile/GetUserPointsCenterInfo", {})
        .then(res => {
          this.list = res.Data;
          // this.list.PointLevel = 7;
          window.localStorage.setItem("jifen", res.Data.CurrentPoints);
          this.meiri_list = res.Data.DayTaskList.slice(0, 3);
          this.meiri_three = res.Data.DayTaskList.slice(0, 3);
          this.meiri_all = res.Data.DayTaskList;
          this.max_num = res.Data.NextLevelRequiredPoints;
          this.min_num = res.Data.CurrentLevelRequirdPoints;
          this.now_num = res.Data.CurrentPoints;
          // var p =
          //   this.now_num /
          //   (this.max_num - this.min_num);
          if( this.now_num - this.min_num <= 0 ){
            var p=this.now_num / this.max_num
          }else{
              var p = (this.now_num-this.min_num) / (this.max_num - this.min_num)
          }
          this.percent = this.toPercent(p);
          this.percent_top = this.percent + " - 17px";
          this.list.PointLevel = res.Data.PointLevel;
          // this.list.PointLevel=5
          if (this.list.PointLevel == 1) {
            this.next_name = "精致女孩";
          } else if (this.list.PointLevel == 2) {
            this.next_name = "出水芙蓉";
          } else if (this.list.PointLevel == 3) {
            this.next_name = "花容月貌";
          } else if (this.list.PointLevel == 4) {
            this.next_name = "千娇百媚";
          } else if (this.list.PointLevel == 5) {
            this.next_name = "国色天香";
          } else if (this.list.PointLevel == 6) {
            this.next_name = "人间尤物";
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56 / @base;
  font-size: 18px;
  color: #252525;
  letter-spacing: 0 / @base;
  z-index: 11;
  background: white;
  span {
    position: absolute;
    top: 21 / @base;
    right: 14 / @base;
    font-size: 12px;
    // font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    // color: #9d80f3;
     color: #252525;
  }
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width: auto;
    height: 21 / @base;
    background-size: 100% 100%;
  }
}
.jicheng {
  width: 100%;
  height: 56 / @base;
  margin-bottom: 2px;
}
.title {
  position: relative;
  display: flex;
  width: 100%;
  height: 68 / @base;
  //   border-bottom: 1px solid #e6e6e6;
  padding-left: 14 / @base;
  .mingxi {
    position: absolute;
    right: 14 / @base;
    top: 15 / @base;
    width: 47 / @base;
    height: 20 / @base;
    border: 1px solid #ba89f8;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ba89f8;
    font-size: 12px;
    border-radius: 20px;
  }
  .title_touxiang {
    width: 51 / @base;
    height: 51 / @base;
    border-radius: 50%;
    background-size: 100% 100%;
  }
  .title_middle {
    padding-left: 11 / @base;
    .name {
      margin-top: 2 / @base;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
      img {
        height: 17 / @base;
        width: auto;
        background-size: 100% 100%;
        margin-left: 5 / @base;
      }
    }
    .zhuan {
      margin-top: 10 / @base;
      font-size: 11px;
      // font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #9d80f3;
    }
  }
}
// 进度
.jindu {
  display: flex;
  width: 100%;
  // height: 67 / @base;
  border-bottom: 1px solid #e6e6e6;
  .jindu_left {
    padding: 0 7 / @base 26 / @base 13 / @base;
    .lv {
      margin-top: 17 / @base;
      font-size: 12px;
      font-weight: bold;
      font-style: italic;
      font-stretch: normal;
      color: #3e3e3e;
      text-align: center;
    }
    .des {
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
  }
  .jindu_middle {
    padding-top: 21 / @base;
    position: relative;
    height: 100%;
    width: auto;
    // border: 1px solid red;
    .jindu_kuang {
      position: absolute;
      top: 0;
      height: 20 / @base;
      line-height: 15 / @base;
      width: auto;
      background: url("../../../assets/images/jindu_kuang.png") no-repeat;
      background-size: 100% 100%;
      padding-left: 8px;
      padding-right: 8px;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #bb8af9;
    }
    .jindu_span1 {
      position: absolute;
      left: 2 / @base;
      top: 2 / @base;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
    .jindu_span2 {
      position: absolute;
      right: 2 / @base;
      top: 2 / @base;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
    .tiao {
      width: 254 / @base;
      height: 12 / @base;
      border-radius: 6px;
      background: #efefef;
      overflow: hidden;
      .tiao_active {
        border-radius: 6px;
        height: 100%;
        background-image: linear-gradient(-87deg, #9441ff 0%, #eb9fdf 100%),
          linear-gradient(#fbc77c, #fbc77c);
        opacity: 0.6;
      }
    }
    .tiao_bottom {
      margin-top: 10 / @base;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ba88f8;
      text-align: center;
    }
  }
  .jindu_right {
    .lv {
      margin-top: 17 / @base;
      font-size: 12px;
      font-weight: bold;
      font-style: italic;
      font-stretch: normal;
      color: #3e3e3e;
      text-align: center;
    }
    .des {
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
  }
}
.all_h {
  width: 100%;
  height: 47 / @base;
  padding-left: 13 / @base;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 47 / @base;
  letter-spacing: 0px;
  color: #333333;
}
// 成长权益
.quanyi {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 351 / @base;
  box-shadow: 2px 3px 12px 1px rgba(187, 187, 187, 0.46);
  border-radius: 10px;
  padding-top: 18 / @base;
  padding-bottom: 26 / @base;
  //   padding-left: 5/@base;
  //   padding-right: 5/@base;
  .quanyi_item {
    // width: 60 / @base;
    img {
      width: 46 / @base;
      height: 46 / @base;
      background-size: 100% 100%;
      border-radius: 50%;
      margin: 0 auto 13 / @base auto;
    }
    p {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      text-align: center;
    }
    .active {
      color: #9d80f3;
    }
  }
}
.haike {
  margin-left: 14 / @base;
  margin-top: 22 / @base;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #9b57e4;
}
//任务
.box {
  width: calc(~"100% - 18px");
  margin: 0 auto 10 / @base auto;
  padding: 20 / @base 6 / @base 20 / @base 9 / @base;
  box-shadow: 2px 3px 12px 1px rgba(187, 187, 187, 0.46);
  border-radius: 10px;
  .zhankai {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    text-align: right;
    padding-right: 15 / @base;
    i {
      width: 9 / @base;
      height: 8 / @base;
      font-size: 12px;
    }
  }
  .box_item {
    &:last-child {
      margin-bottom: 0;
    }
    margin-bottom: 32 / @base;
    position: relative;
    display: flex;
    width: 100%;
    height: 41 / @base;
    .item_left {
      opacity: 0.8;
      width: 41 / @base;
      height: 41 / @base;
      border-radius: 10px;
      // padding-top: 7 / @base;
      // background-image: linear-gradient(-35deg, #9441ff 0%, #eb9fdf 100%),
      //   linear-gradient(#9d80f3, #9d80f3);
      // img {
      //   width: 26 / @base;
      //   height: auto;
      //   background-size: 100% 100%;
      //   margin:0 auto;
      // }
    }
    .item_left2 {
      opacity: 0.6;
      width: 36 / @base;
      height: 36 / @base;
      margin-top: 2.5 / @base;
      border-radius: 50%;
      padding-top: 7 / @base;
      background-image: linear-gradient(-35deg, #9441ff 0%, #eb9fdf 100%),
        linear-gradient(#9d80f3, #9d80f3);
      img {
        width: 21 / @base;
        height: auto;
        background-size: 100% 100%;
        margin: 0 auto;
      }
    }
    .item_middle_bottom {
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
    }
    .item_middle {
      width: 60%;
      margin-left: 8 / @base;
      .item_middle_top {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        p {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 13 / @base;
          width: auto;
          // line-height: 13 / @base;
          background-color: #febb74;
          border-radius: 0px 7px 7px 4px;
          margin-left: 3 / @base;
          font-size: 10px;
          font-weight: bold;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          opacity: 0.7;
          text-align: center;
          span {
            display: inline-block;
            transform: scale(0.85);
          }
        }
      }
    }
    .item_right {
      //  opacity: 0.4;
      position: absolute;
      right: 6 / @base;
      top: 10 / @base;
      width: 57px;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 21 / @base;
      text-align: center;
      letter-spacing: 0px;
      color: #ffffff;
      height: 21 / @base;
      background-color: #9d80f3;
      border-radius: 10px;
    }
  }
}
</style>