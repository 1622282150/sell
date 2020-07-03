<template>
  <div class="vip">
    <div class="vip_top">
      <Ruturn color="#fff">会员中心</Ruturn>
      <div class="vip_avatar">
        <div class="pic">
          <img src="../../assets/images/vip_bg4.png" alt />
        </div>
        <div class="name">
          <div class="des">
            <p>SUMINM</p>
            <img src="../../assets/images/vip_vv1.png" alt />
          </div>
          <div class="count">
            <span class="now">当前积分</span>
            <span class="num">3000</span>
          </div>
        </div>
      </div>
      <p class="gnum">
        距离
        <span>lv.2</span>精致女孩还差
        <span>10</span>成长值交友哦
      </p>
      <div class="length">
        <!-- <div class="out_length"> -->
        <div class="inner_length">
          <div class="vip_length">
            <div class="circle"></div>
          </div>
          <!-- </div> -->
        </div>
        <div class="level">
          <span class="left">V1</span>
          <span class="middle">50</span>
          <span class="right">V2</span>
        </div>
      </div>

      <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in 7" :key="index" :data-index="index">
            <div class="item">
              <div class="value">
                需要成长值
                <span>20</span>
              </div>
              <div class="time">
                已于
                <span>2019-01-09</span>达到该等级
              </div>
              <div class="grow">
                <a href="javascript:(void)">升级攻略</a>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <component :is="id1"></component>
    </div>
    <div class="vip_right">
      <h4>V1等级特权</h4>
      <ul>
        <li v-for="(item,index) in rightList" :key="index">
          <a href="javascript:void(0)">
            <img :src="item.src" alt />
            <p>{{item.name}}</p>
            <span>{{item.name1}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="vip_change">
      <a href="javascript:void(0)">
        <img src="../../assets/images/vip_vip5.png" alt />
      </a>
    </div>
    <div class="line"></div>

    <div class="new_task">
      <h4>新生任务</h4>
      <ul>
        <li v-for="(item,index) in newTaskList" :key="index">
          <a href="javascript:void(0)">
            <img :src="item.src" alt />
            <span>{{item.name}}</span>
            <p>去完善 ></p>
          </a>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <!-- 每日任务 -->
    <div class="day_task">
      <p>每日任务</p>
      <ul>
        <li v-for="(item, index) in dayTaskList" :key="index">
          <a href="javscript:void(0)" class="clearfix">
            <div class="left fl">
              <img :src="item.src" alt />
              <span class="task_item">{{item.name}}</span>
              <span class="total" v-if="index===2 || index===6">{{item.num}}/{{item.total}}</span>
              <span class="task_num">{{item.count}}</span>
            </div>
            <div class="right fr">{{item.des}}</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Ruturn from "../../components/Return";
import aa from "./aa.vue";
import bb from "./bb.vue";
export default {
  components: {
    Ruturn
  },
  methods: {},
  watch: {},
  computed: {
    id1() {
      let name;
      if (this.id === 1) {
        name = aa;
      } else if (this.id === 2) {
        name = bb;
      } else {
        name = aa;
      }
    }
  },
  data() {
    const self = this;
    return {
      // id: "",
      // aa: {},
      id: 2,
      swiperOption: {
        // loop: true,
        roundLengths: true,
        // initialSlide: 2,
        speed: 600,
        slidesPerView: "auto",
        centeredSlides: true,
        followFinger: false,
        on: {
          slideChangeTransitionStart: function() {
            console.log(this.activeIndex);
            self.id = this.activeIndex;
          }
        }
      },
      rightList: [
        {
          name: "15秒",
          name1: "视频发布",
          src: require("../../assets/images/vip1.png")
        },
        { name: "购物9.5折", src: require("../../assets/images/vip_vip2.png") },
        { name: "积分购物", src: require("../../assets/images/vip_vip3.png") },
        {
          name: "兑换",
          name1: "超级会员",
          src: require("../../assets/images/vip_vip4.png")
        }
      ],
      newTaskList: [
        { name: "完善资料", src: require("../../assets/images/vip_vip6.png") },
        {
          name: "绑定微信(手机)",
          src: require("../../assets/images/vip7.png")
        },
        { name: "实名认证", src: require("../../assets/images/vip_vip8.png") }
      ],
      dayTaskList: [
        {
          name: "每日登陆",
          src: require("../../assets/images/vip_vip9.png"),
          count: 10,
          des: "点击登陆"
        },
        {
          name: "签到打开",
          src: require("../../assets/images/vip_vip10.png"),
          count: 30,
          des: "点击签到"
        },
        {
          name: "宴请好友",
          num: 0,
          total: 5,
          src: require("../../assets/images/vip_vip11.png"),
          count: 100,
          des: "立即邀请"
        },
        {
          name: "第一次测肤",
          src: require("../../assets/images/vip_vip12.png"),
          count: 50,
          des: "测一测"
        },
        {
          name: "分享一次文章或肤质报告",
          src: require("../../assets/images/vip_vip13.png"),
          count: 50,
          des: "点击分享"
        },
        {
          name: "发布一条帖子",
          src: require("../../assets/images/vip_vip19.png"),
          count: 50,
          des: "点击发布"
        },
        {
          name: "发布5条评论",
          num: 2,
          total: 5,
          src: require("../../assets/images/vip_vip14.png"),
          count: 50,
          des: "点击发布"
        },
        {
          name: "参与1次话题讨论         ",
          src: require("../../assets/images/vip_vip15.png"),
          count: 50,
          des: "点击参与"
        }
      ]
    };
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.vip {
  height: 2000 / @base;
}
.vip_top {
  background: linear-gradient(-12deg, #be84ff, #eed9ff);
  // height: 2000/@base;

  .vip_avatar {
    padding: 0 40 / @base;
    .pic {
      vertical-align: middle;
      display: inline-block;
      img {
        width: 100 / @base;
        height: 100 / @base;
        border-radius: 50%;
      }
    }
    .name {
      display: inline-block;
      vertical-align: middle;
      margin-left: 20 / @base;
      .des {
        display: inline-block;
        vertical-align: top;
        font-size: 30 / @base;
        color: #fff;
        img {
          width: 128 / @base;
          height: 30 / @base;
          border-radius: 30 / @base;
          margin-top: 5 / @base;

          vertical-align: middle;
        }
      }
      .count {
        display: inline-block;
        margin-left: 22 / @base;
        vertical-align: middle;
        color: #b05e08;
        font-size: 24 / @base;
        .now {
          display: inline-block;
          padding-left: 40 / @base;
          background: url(../../assets/images/vip_j1.png) left center no-repeat;
          background-size: 30 / @base 30 / @base;
        }
      }
    }
  }
  .gnum {
    margin-top: 30 / @base;
    padding: 0 40 / @base;
    font-size: 24 / @base;
    color: #fff;
  }
  .length {
    margin-top: 20 / @base;
    padding: 0 40 / @base;
    .inner_length {
      height: 6 / @base;
      background-color: #eee;
      border-radius: 5 / @base;
      .vip_length {
        position: relative;
        width: 50%;
        height: 100%;
        border-radius: 5 / @base;
        background-color: #5a23aa;
        .circle {
          position: absolute;
          right: -10 / @base;
          top: 50%;
          transform: translateY(-50%);
          width: 20 / @base;
          height: 20 / @base;
          border-radius: 50%;
          background-color: #5a23aa;
          border: 3 / @base solid #a275da;
        }
      }
    }
    .level {
      position: relative;
      margin-top: 10 / @base;
      .left,
      .middle,
      .right {
        position: absolute;
        color: #fff;
        font-size: 30 / @base;
        top: 0 / @base;
        &.left {
          left: 0;
        }
        &.middle {
          left: 50%;
          transform: translateX(-50%);
        }
        &.right {
          right: 0;
        }
      }
    }
  }
  .swiper {
    padding: 36 / @base 0;
    margin-top: 30 / @base;

    .item {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 10 / @base;
      background: url(../../assets/images/vip_m0.png) center no-repeat;
      background-size: 100%;
      .value {
        position: absolute;
        top: 116 / @base;
        left: 55 / @base;
        font-size: 24 / @base;
        color: #602b7c;
      }
      .time {
        position: absolute;
        bottom: 36 / @base;
        left: 55 / @base;
        font-size: 24 / @base;
        color: #602b7c;
      }
      .grow {
        position: absolute;
        bottom: 32 / @base;
        right: 40 / @base;
        z-index: 99;

        a {
          display: block;
          width: 158 / @base;
          height: 48 / @base;
          line-height: 48 / @base;
          text-align: center;
          font-size: 30 / @base;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 30 / @base;
        }
      }
    }
  }
  .swiper /deep/ .swiper-slide {
    padding: 0 20 / @base;
    width: 630 / @base;
    height: 278 / @base;
  }
  // .swiper /deep/ .swiper-pagination .swiper-pagination-bullets {
  //   font-size: 0;
  // }
  // .swiper /deep/ .swiper-pagination-bullet-active {
  //   background-color: #b695e5;
  // }
  // .swiper /deep/ .swiper-wrapper {
  //   padding-bottom: 40/@base;
  // }
}

.vip_right {
  padding: 0 40 / @base;
  font-size: 24 / @base;
  h4 {
    margin-top: 25 / @base;
    font-size: 30 / @base;
    color: #333;
  }
  ul {
    display: flex;
    justify-content: space-around;
    margin-top: 50 / @base;
    li {
      width: 20%;
    }
    a {
      display: block;
      text-align: center;
      // padding: 0 20/@base;

      img {
        width: 80 / @base;
        height: 80 / @base;
        margin: 0 auto;
        margin-bottom: 10 / @base;
      }
    }
  }
}
.vip_change {
  margin-top: 60 / @base;
  margin-bottom: 30 / @base;
  a {
    display: block;
    width: 670 / @base;
    height: 150 / @base;
    margin: 0 auto;
    img {
      height: 100%;
    }
  }
}
.line {
  height: 15 / @base;
  background-color: #eee;
}

.new_task {
  font-size: 24 / @base;
  margin-bottom: 45 / @base;
  h4 {
    margin-top: 25 / @base;
    font-size: 30 / @base;
    color: #333;
    padding: 0 40 / @base;
  }
  ul {
    display: flex;
    justify-content: space-around;
    margin-top: 50 / @base;
    li {
      width: 33.3%;
    }
    a {
      display: block;
      text-align: center;

      img {
        width: 78 / @base;
        height: 78 / @base;
        margin: 0 auto;
        margin-bottom: 10 / @base;
      }
      p {
        margin: 0;
        margin-top: 10 / @base;
        font-size: 18 / @base;
        color: #b96c58;
      }
    }
  }
}

.day_task {
  padding: 0 40 / @base;
  p {
    margin-top: 40 / @base;
    margin-bottom: 55 / @base;
    color: #333;
    font-size: 30 / @base;
  }
  li {
    a {
      display: block;
      padding: 20 / @base 0;
      border-bottom: 1 / @base solid #d2d2d2;
      .left {
        img {
          display: inline-block;
          width: 70 / @base;
          height: 70 / @base;
          vertical-align: middle;
        }
        .task_item {
          font-size: 28 / @base;
          color: #333;
          vertical-align: middle;
          margin-left: 20 / @base;
          margin-right: 10 / @base;
        }
        .task_num {
          display: inline-block;
          width: 80 / @base;
          height: 32 / @base;
          background: url(../../assets/images/vip_vip20.png) center no-repeat;
          padding-left: 35 / @base;
          font-size: 18 / @base;
          color: #ee5007;
          vertical-align: baseline;
          background-size: 100%;
        }
        .total {
          vertical-align: middle;
          font-size: 28 / @base;
          margin-right: 10 / @base;
        }
      }
      .right {
        font-size: 24 / @base;
        margin-top: 16 / @base;
        color: #fff;
        padding: 5 / @base 15 / @base;
        background-color: #fdbb94;
        border-radius: 30 / @base;
      }
    }
  }
}
</style> 