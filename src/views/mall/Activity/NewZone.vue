<template>
  <div>
    <header>
      <i @click="$router.back(-1)" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou jiantou"></i>
      <i style="position:absolute;right:15px;" class="iconfont icon-fenxiang2"></i>
      <i style="position:absolute;right:55px;" class="iconfont icon-50"></i>
      新人专区
    </header>
    <div class="content">
      <div class="content_box" v-for="(item,index) in list" :key="index">
        <img :src="item.img" alt />
        <div class="content_box_right">
          <div class="content_box_right_name">{{item.name | shopTitle}}</div>
          <div class="content_box_right_flag">{{item.flag}}</div>
          <div class="content_box_right_price"><span style="font-size:14px">¥</span>{{item.newprice}}<span class="content_box_right_oldprice">¥{{item.oldprice}}</span></div>
          <div class="content_box_right_ball">马上抢</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          img: require("../../../assets/images/d.jpg"),
          name: "韩后[收缩毛孔]毛空清透控油面膜120ml收缩面孔",
          flag: "保湿清洁面孔",
          newprice: 1000,
          oldprice: 2000
        },
        {
          img: require("../../../assets/images/d.jpg"),
          name: "韩后[收缩毛孔]毛空清透控油面膜120ml收缩面孔",
          flag: "保湿清洁面孔",
          newprice: 1000,
          oldprice: 2000
        },
        {
          img: require("../../../assets/images/d.jpg"),
          name: "韩后[收缩毛孔]毛空清透控油面膜120ml收缩面孔",
          flag: "保湿清洁面孔",
          newprice: 1000,
          oldprice: 2000
        },
        {
          img: require("../../../assets/images/d.jpg"),
          name: "韩后[收缩毛孔]毛空清透控油面膜120ml收缩面孔",
          flag: "保湿清洁面孔",
          newprice: 1000,
          oldprice: 2000
        },

        {
          img: require("../../../assets/images/d.jpg"),
          name: "韩后[收缩毛孔]毛空清透控油面膜120ml收缩面孔",
          flag: "保湿清洁面孔",
          newprice: 1000,
          oldprice: 2000
        },
        {
          img: require("../../../assets/images/d.jpg"),
          name: "韩后[收缩毛孔]毛空清透控油面膜120ml收缩面孔",
          flag: "保湿清洁面孔",
          newprice: 1000,
          oldprice: 2000
        }
      ]
    };
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  position: relative;
  position: fixed;
  top: 0;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  background: linear-gradient(to right, #d7bcff, #caa3fe);
  z-index: 1;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
  font-size: 38 / @base;
  color: white;

  i {
    font-size: 50 / @base;
  }
}
.content {
  margin-top: 120 / @base;
  width: 100%;
  background: #eeeeee;
  padding: 40 / @base;
  .content_box {
    width: 100%;
    height: 300 / @base;
    background: white;
    margin-bottom: 40 / @base;
    border-radius: 5px;
    padding: 20 / @base;
    display: flex;
    img {
      width: 260 / @base;
      height: 260 / @base;
    }
    .content_box_right {
        position: relative;
    //   width: 100%;
      height: 260 / @base;
      //    background: red;
      padding-left: 20 / @base;
      .content_box_right_name {
        font-size: 30 / @base;
        font-weight: 550;
      }
      .content_box_right_flag {
        font-size: 25 / @base;
        color: #adadad;
        margin-top: 10 / @base;
      }
      .content_box_right_price{
          color: #B897EB;
          margin-top: 10/@base;
          font-size: 35/@base;
          .content_box_right_oldprice{
              font-size: 8px;
              margin-left: 30/@base;
              color: #adadad;
              text-decoration: line-through;
          }
      }
      .content_box_right_ball{
          position: absolute;
          right: 0;
          bottom: 0;
          width: 160/@base;
          height: 50/@base;
          line-height: 50/@base;
          border-radius: 20px;
          background:#B897EB;
          font-size: 28/@base;
          color: white;
          text-align: center;

      }
    }
  }
}
</style>