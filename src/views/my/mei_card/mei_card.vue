<template>
  <div>
    <div class="header">
      <i @click="goback" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou"></i>
      <span>魅卡</span>
    </div>
    <div class="jicheng"></div>
    <div class="quanyi"></div>
    <div class="meika">
      <div class="meika_box">
        <div class="box_title">会员特权</div>
        <div class="box_meika_meika"></div>
        <div class="box_meika_huangguan"></div>
        <div class="box_meika_quanyi">
          <div class="quan1"></div>
          <div class="quan2"></div>六大权益
        </div>
        <div class="quanyi_box">
          <div class="quanyi_li">
            <img src="../../../assets/images/mei_优惠礼包.png" alt />
            <div class="quanyi_title">优惠礼包</div>
            <div class="quanyi_content">
              <span>一次性赠送价值300元优惠券,每月还可再领120元优惠券</span>
            </div>
          </div>
          <div class="quanyi_li">
            <img src="../../../assets/images/mei_惠.png" alt />
            <div class="quanyi_title">专享特惠</div>
            <div class="quanyi_content">
              <span>所有带"魅"标产品都享特惠价</span>
            </div>
          </div>
          <div class="quanyi_li">
            <img src="../../../assets/images/mei_客服.png" alt />
            <div class="quanyi_title">专属客服</div>
            <div class="quanyi_content">
              <span>极速处理</span>
            </div>
            <div class="quanyi_content">
              <span>贴心服务</span>
            </div>
          </div>
          <div class="quanyi_li">
            <img src="../../../assets/images/mei_包邮.png" alt />
            <div class="quanyi_title">全国包邮</div>
            <div class="quanyi_content">
              <span>所有商品全国包邮(部分遥远地区除外)</span>
            </div>
          </div>
          <div class="quanyi_li">
            <img src="../../../assets/images/mei_退货.png" alt />
            <div class="quanyi_title">无理由退货</div>
            <div class="quanyi_content">
              <span>7天内,在不影响产品二次销售的情况下,可无理由退货</span>
            </div>
          </div>
          <div class="quanyi_li">
            <img src="../../../assets/images/mei_等级权益.png" alt />
            <div class="quanyi_title">享受等级权益</div>
            <div class="quanyi_content">
              <span>购买超级VIP人物等级并享受等级权益</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="libao">
      <div class="libao_box">
        <div class="libao_title">
          <i class="iconfont icon-libao"></i>优惠礼包
        </div>
        <div class="libao_content">
          <div class="libao_lable">
            <div
              class="libao_son"
              :class="active_lable===index?'active_lable':''"
              @click="sel_lable(index)"
              v-for="(item,index) in lable"
              :key="index"
            >{{item}}</div>
          </div>
          <div class="libao_card">
            <div class="card" @click="shiyong(index)" v-for="(item,index) in price" :key="index">
              <img v-if="item.use" src="../../../assets/images/mei_优惠券2.png" alt />
              <img v-else src="../../../assets/images/mei_优惠券1.png" alt />
              <span class="renminbi">¥</span>
              <span class="card_num">{{item.num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tehui">
      <div class="tehui_title">魅卡专享特惠区</div>
    </div>
    <!-- 商品 -->
    <div class="list">
      <ul>
        <li v-for="(item, index) in shangpinlist" :key="index" @click="tochanpin(item.CommodityId)">
          <img v-if="item.BannerImg" :src="item.BannerImg" alt />
          <img v-else src="../../../assets/images/list.jpg" alt />
          <div class="bottom">
            <!-- <p>盛大收购大红色的乖哈岁的干啥</p> -->
            <p>{{item.Name }}</p>
            <!-- <p>的撒韩国的</p> -->
            <!-- <div class="des">{{item.Description|renMenLength}}</div> -->
            <div class="price">
              <img src="../../../assets/images/mei_魅标.png" alt />
              <span class="qian">
                <span class="ren">¥</span>
                {{item.Price}}
              </span>
            </div>
            <!-- <div class="baoyou">包邮</div> -->
          </div>
          <div class="liji">立即购买</div>
        </li>
      </ul>
      <!-- 点击查看更多 -->
      <div class="dianji" @click="gengduo">点击查看更多</div>
    </div>
    <!-- 底部 -->
    <div class="footer_top"></div>
    <footer>
      <div class="footer_left">¥ 198/年</div>
      <div class="footer_right">20000魅力值/年</div>
    </footer>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      lable: ["年礼包", "月礼包"],
      active_lable: 0,
      price: [
        { num: "15", use: true },
        { num: "5", use: false },
        { num: "25", use: true },
        { num: "35", use: true },
        { num: "74", use: true },
        { num: "70", use: false }
      ],
      shangpinlist: [],
      page: 1
    };
  },
  mounted() {
    this.GetCommodityInfoList();
  },
  methods: {
    // 点击查看更多
    gengduo() {
      (this.page += 1), this.GetCommodityInfoList();
    },
    sel_lable(index) {
      this.active_lable = index;
    },
    shiyong(index) {
      this.price[index].use = false;
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
        let url = this.$domain.url+"mei_card";
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
    // 获取获取产品列表
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoList", {
          CategoryId: 0,
          Page: this.page,
          Rows: 6,
          Order: "asc",
          Sort: "id"
          // Type:'CommodityTypeType'
        })
        .then(res => {
          this.shangpinlist = this.shangpinlist.concat(res.Data.List);
          // console.log(this.shangpinlist)

          // console.log(res.Data.List.length)
        })
        .catch(err => {});
    },
    tochanpin(id) {
      this.$router.push({
        path: "/product_detail",
        query: {
          id: id
        }
      });
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
    font-size: 25px;
  }
}
.jicheng {
  width: 100%;
  height: 120 / @base;
}
.quanyi {
  width: 100%;
  height: 318 / @base;
  background: url(../../../assets/images/mei_上部.png) no-repeat;
  background-size: 100% 100%;
}
.meika {
  width: 100%;
  // min-height: 1270 / @base;
  background: url(../../../assets/images/mei_下部.png) no-repeat;
  background-size: 100% 100%;
  .meika_box {
    // display: flex;
    width: 90%;
    margin: 0 auto;
    padding-top: 44 / @base;
    border-radius: 5px;
    // height: 1223 / @base;
    background-image: linear-gradient(164deg, #fffaef 0%, #ffeac6 100%);
    .box_title {
      text-align: center;
      width: 258 / @base;
      height: 92 / @base;
      line-height: 92 / @base;
      margin: 0 auto;
      background: url(../../../assets/images/mei_边框.png) no-repeat;
      background-size: 100% 100%;
      letter-spacing: 9 / @base;
      font-size: 30 / @base;
      font-weight: normal;
      line-height: 92 / @base;
      color: #755435;
    }
    .box_meika_meika {
      width: 505 / @base;
      height: 312 / @base;
      background: url("../../../assets/images/mei_card.png");
      background-size: 100% 100%;
      margin: 30 / @base auto 50 / @base auto;
    }
    .box_meika_huangguan {
      width: 63 / @base;
      height: 38 / @base;
      margin: 0 auto;
      background: url("../../../assets/images/mei_王冠.png");
      background-size: 100% 100%;
      margin: 46 / @base auto 12 / @base auto;
    }
    .box_meika_quanyi {
      position: relative;
      width: 256 / @base;
      height: 38 / @base;
      font-size: 40 / @base;
      margin: 0 auto;
      line-height: 40 / @base;
      color: #4b2e16;
      font-weight: normal;
      // font-family: "PingFangBold";
      text-align: center;
      .quan1 {
        position: absolute;
        left: 0;
        top: 9.5 / @base;
        width: 19 / @base;
        height: 19 / @base;
        border-radius: 50%;
        background: #4b2e16;
      }
      .quan2 {
        position: absolute;
        right: 0;
        top: 9.5 / @base;
        width: 19 / @base;
        height: 19 / @base;
        border-radius: 50%;
        background: #4b2e16;
      }
    }
    .quanyi_box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
      min-height: 580 / @base;
      padding: 0 25 / @base;
      margin-top: 40 / @base;
      .quanyi_li {
        // display: block;
        width: 180 / @base;
        min-height: 270 / @base;
        // background: red;
        margin-bottom: 20 / @base;
        text-align: center;
        img {
          display: block;
          width: 95 / @base;
          height: 95 / @base;
          border-radius: 50%;
          background-size: 100% 100%;
          margin: 0 auto;
        }
        .quanyi_title {
          margin-top: 11 / @base;
          display: block;
          font-size: 22 / @base;
          font-weight: normal;
          // font-family: "PingFangBold";
          color: #a57045;
        }
        .quanyi_content {
          width: 100%;
          display: block;
          text-align: center;
          font-size: 16 / @base;
          color: #a57045;
          font-family: "PingFangMedium";
          font-weight: normal;
          letter-spacing: 0px;
          webkit-text-size-adjust: none;
          span {
            webkit-text-size-adjust: none;
            display: inline-block;
            font-size: 16 / @base;
            font-family: "PingFangMedium";
            // -webkit-transform: scale(0.8);
          }
          // -webkit-transform: scale(0.8);
        }
      }
    }
  }
}
.libao {
  width: 100%;
  height: 634 / @base;
  padding-top: 40 / @base;
  background: #570085;
  .libao_box {
    padding-top: 39 / @base;
    width: 670 / @base;
    height: 594 / @base;
    border-radius: 15 / @base;
    background-image: linear-gradient(-36deg, #ffebc6 0%, #fff4e0 100%);
    margin: 0 auto;
    .libao_title {
      color: #4b2e16;
      width: 210 / @base;
      height: 40 / @base;
      font-size: 40 / @base;
      font-weight: normal;
      // font-family: "PingFangBold";
      margin: 0 auto 59 / @base auto;
      i {
        width: 35 / @base;
        height: 41 / @base;
        font-size: 46 / @base;
      }
    }
    .libao_content {
      width: 620 / @base;
      height: 430 / @base;
      border: solid 1px #755435;
      margin: 0 auto;
      .libao_lable {
        display: flex;
        width: 100%;
        height: 81 / @base;
        border-bottom: solid 1px #755435;
        .active_lable {
          background: #755435 !important;
          color: #fff3db !important;
        }
        .libao_son {
          width: 50%;
          height: 81 / @base;
          font-size: 30 / @base;
          text-align: center;
          line-height: 81 / @base;
          color: #755435;
          // font-family: "PingFangBold";
        }
      }
      .libao_card {
        width: 100%;
        height: 323 / @base;
        padding: 18 / @base;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        overflow: scroll;
        .card {
          position: relative;
          width: 282 / @base;
          height: 106 / @base;
          margin-bottom: 25 / @base;
          &:nth-child(2n) {
            margin-left: 10 / @base;
          }
          img {
            width: 282 / @base;
            height: 106 / @base;
            background-size: 100% 100%;
          }
          .renminbi {
            position: absolute;
            left: 42 / @base;
            top: 30 / @base;
            font-size: 26 / @base;
            color: #ffffff;
            // font-family: "PingFangRegular";
          }
          .card_num {
            position: absolute;
            left: 80 / @base;
            top: 0 / @base;
            color: #ffffff;
            font-size: 56 / @base;
            // font-family: "PingFangBold";
          }
        }
      }
    }
  }
}
.tehui {
  width: 100%;
  height: 140 / @base;
  background: #570085;
  padding-top: 53 / @base;
  .tehui_title {
    width: 300 / @base;
    height: 70 / @base;
    line-height: 70 / @base;
    text-align: center;
    margin: 0 auto;
    border: 1px solid #ffefd3;
    border-radius: 35 / @base;
    color: #ffedcc;
    font-size: 30 / @base;
  }
}
.list {
  background: #570085;
  padding: 0 20 / @base 20 / @base 20 / @base;
  .dianji {
    width: 100%;
    height: 90 / @base;
    line-height: 90 / @base;
    text-align: center;
    font-size: 24 / @base;
    color: #ffffff;
    // font-family: "PingFangRegular";
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      position: relative;
      width: 48%;
      border-radius: 13 / @base;
      overflow: hidden;
      background-color: #fff;
      margin-top: 20 / @base;
      display: block;

      .liji {
        position: absolute;
        bottom: 20 / @base;
        right: 19 / @base;
        width: 120 / @base;
        height: 40 / @base;
        line-height: 40 / @base;
        font-size: 20 / @base;
        font-weight: normal;
        color: #ffffff;
        text-align: center;
        background: #b695e9;
        border-radius: 20px;
      }
      // box-shadow: 0px  0px  5px  1px #C4C3C6;
      img {
        height: 350 / @base;
      }
      .bottom {
        padding: 18 / @base;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: rgb(60, 60, 60);
          font-size: 28 / @base;
        }
        .des {
          color: rgb(148, 148, 148);
          font-size: 24 / @base;
          margin: 12 / @base 0;
        }
        .price {
          margin-top: 5/@base;
          display: flex;
          img {
            margin-top: 12 / @base;
            width: 26 / @base;
            height: 26 / @base;
            background-size: 100% 100%;
          }
          .qian {
            color: red;
            height: 48/@base;
            line-height:48/@base;
            display: flex;
            margin-left: 10 / @base;
            font-size: 34 / @base;
            & .ren {
              font-size: 21 / @base;
              height: 48 / @base;
              line-height:53/@base;
              margin-right: 5 / @base;
            }
          }
          .num {
            margin-top: 5 / @base;
            color: #8e44ab;
            font-size: 12px;
          }
        }
        .baoyou {
          margin-top: 18 / @base;
          width: 70 / @base;
          height: 60 / @base;
          line-height: 30 / @base;
          text-align: center;
          font-size: 12px;
          color: rgb(140, 7, 215);
          border: 1px solid rgb(140, 7, 215);
          border-radius: 8px;
        }
      }
    }
  }
}
.footer_top{
  width: 100%;
  height: 100/@base;
}
footer {
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100 / @base;
  background: #fff0d4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .footer_left {
    width: 325/@base;
    height:70/@base;
    line-height: 70/@base;
    text-align: center;
    font-size: 30/@base;
    background-image: linear-gradient(127deg, #40125a 0%, #24013b 100%);
    border-radius: 35px;
    color: #ffeecd;
  }
  .footer_right {
    width: 325/@base;
    height: 70/@base;
    line-height: 70/@base;
    text-align: center;
    font-size: 30/@base;
    background-image: linear-gradient(-23deg, #ab6c2a 0%, #c3925d 100%);
    border-radius: 35px;
    color:#efe9d3;
  }
}
</style>