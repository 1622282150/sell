<template>
  <div>
    <header>
      <Ret style="border-bottom:none">{{title}}</Ret>
    </header>
    <!-- 顶部分类 -->
    <div class="banner">
      <div v-if="banner_list.length>5" class="shadow"></div>
      <div
        @click="sel_banner(item.key,index)"
        class="banner_item"
        v-for="(item,index) in banner_list"
        :key="index"
      >
        <img :src="banner_index === index?item.img:item.origin" alt />
        <p :class="banner_index === index?'active':''">{{item.name}}</p>
      </div>
    </div>
    <div class="title">
      <div class="title_left">推荐</div>
      <div class="title_right">
        <div class="title_right_line"></div>
        <div
          :class="price_index === index?'active':''"
          class="title_right_left"
          v-for="(item,index) in price_info"
          :key="index"
          @click="sel_price(index)"
        >{{item}}</div>
      </div>
    </div>
    <!-- 盒子 -->
    <div class="box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="box_item"
          @click="tochanpin(item.CommodityId)"
          v-for="(item,index) in product"
          :key="index"
        >
          <div class="item_left">
            <img :src="item.BannerImg" alt />
            <div class="lable">
              <i class="iconfont icon-hot"></i>
              <span>{{item.Popularity}}</span>
            </div>
          </div>
          <div class="item_right">
            <p class="name">{{item.Name}}</p>
            <p class="des">{{item. Brief}}</p>
            <p class="price">
              ¥{{item.Price}}
              <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import Ret from "@/components/FixedHeader";
export default {
  components: {
    Ret
  },
  data() {
    return {
      Sort: "Id",
      CategoryCode: "",
      page: 1,
      loading: false,
      finished: false,
      banner_index: -1,
      price_index: -1,
      product: [], //渲染的产品列表
      title: "", //顶部名字
      key: "", //关键词
      price_info: ["价格", "人气"],
      banner_list: [],
      zhouwen_list: [
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_yanshuang2.png"),
          img: require("../../assets/images/advice_yanshuang.png"),
          name: "眼霜",
          key: "yanshuang"
        },
        {
          origin: require("../../assets/images/advice_ruyemianshuang2.png"),
          img: require("../../assets/images/advice_ruyemianshuang.png"),
          name: "乳液/面霜",
          key: "ruyemianshuang"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        }
      ],
      doudou_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_ruyemianshuang2.png"),
          img: require("../../assets/images/advice_ruyemianshuang.png"),
          name: "乳液/面霜",
          key: "ruyemianshuang"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        },
        {
          origin: require("../../assets/images/advice_xiezhuang2.png"),
          img: require("../../assets/images/advice_xiezhuang.png"),
          name: "卸妆",
          key: "xiezhuang"
        }
      ],
      douyin_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_ruyemianshuang2.png"),
          img: require("../../assets/images/advice_ruyemianshuang.png"),
          name: "乳液/面霜",
          key: "ruyemianshuang"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        }
      ],
      ban_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_ruyemianshuang2.png"),
          img: require("../../assets/images/advice_ruyemianshuang.png"),
          name: "乳液/面霜",
          key: "ruyemianshuang"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        }
      ],
      heitou_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },

        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        }
      ],
      maokong_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        },
        {
          origin: require("../../assets/images/advice_xiezhuang2.png"),
          img: require("../../assets/images/advice_xiezhuang.png"),
          name: "卸妆",
          key: "xiezhuang"
        }
      ],
      meigui_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },

        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        }
      ],
      heiyan_list: [
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_yanshuang2.png"),
          img: require("../../assets/images/advice_yanshuang.png"),
          name: "眼霜",
          key: "yanshuang"
        },
        {
          origin: require("../../assets/images/advice_ruyemianshuang2.png"),
          img: require("../../assets/images/advice_ruyemianshuang.png"),
          name: "乳液/面霜",
          key: "ruyemianshuang"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        }
      ],
      fuse_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_yanshuang2.png"),
          img: require("../../assets/images/advice_yanshuang.png"),
          name: "眼霜",
          key: "yanshuang"
        },
        {
          origin: require("../../assets/images/advice_ruyemianshuang2.png"),
          img: require("../../assets/images/advice_ruyemianshuang.png"),
          name: "乳液/面霜",
          key: "ruyemianshuang"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        },
        {
          origin: require("../../assets/images/advice_xiezhuang2.png"),
          img: require("../../assets/images/advice_xiezhuang.png"),
          name: "卸妆",
          key: "xiezhuang"
        }
      ],
      fuzhi_list: [
        {
          origin: require("../../assets/images/advice_jiemian2.png"),
          img: require("../../assets/images/advice_jiemian.png"),
          name: "洁面",
          key: "jiemian"
        },
        {
          origin: require("../../assets/images/advice_hufushui2.png"),
          img: require("../../assets/images/advice_hufushui.png"),
          name: "护肤水",
          key: "hufushui"
        },
        {
          origin: require("../../assets/images/advice_jinghua2.png"),
          img: require("../../assets/images/advice_jinghua.png"),
          name: "精华",
          key: "jinghua"
        },
        {
          origin: require("../../assets/images/advice_yanshuang2.png"),
          img: require("../../assets/images/advice_yanshuang.png"),
          name: "眼霜",
          key: "yanshuang"
        },
        {
          origin: require("../../assets/images/advice_ruyemianshuang2.png"),
          img: require("../../assets/images/advice_ruyemianshuang.png"),
          name: "乳液/面霜",
          key: "ruyemianshuang"
        },
        {
          origin: require("../../assets/images/advice_mianmo2.png"),
          img: require("../../assets/images/advice_mianmo.png"),
          name: "面膜",
          key: "mianmo"
        },
        {
          origin: require("../../assets/images/advice_meifuyi2.png"),
          img: require("../../assets/images/advice_meifuyi.png"),
          name: "美肤仪器",
          key: "meifuyi"
        },
        {
          origin: require("../../assets/images/advice_xiezhuang2.png"),
          img: require("../../assets/images/advice_xiezhuang.png"),
          name: "卸妆",
          key: "xiezhuang"
        }
      ]
    };
  },
  created() {},
  methods: {
    onLoad() {
      this.page += 1;
      this.GetCommodityInfoList();
    },
    //选择bannerindex
    sel_banner(key, index) {
      this.banner_index = index;
      this.CategoryCode = key;
      this.page = 1;
      this.product = [];
      this.GetCommodityInfoList();
    },
    // 选择价格和人气
    sel_price(index) {
      this.price_index = index;
      if (index == 0) {
        this.Sort = "Price";
        this.page = 1;
        this.product = [];
        this.GetCommodityInfoList();
      }else if(index == 1){
        this.Sort = "Popularity";
        this.page = 1;
        this.product = [];
        this.GetCommodityInfoList();
      }
    },
    tochanpin(id) {
      this.$router.push({
        path: "/product_detail",
        query: {
          id: id
        }
      });
    },
    // 获取产品列表
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoList", {
          Page: this.page,
          Rows: 8,
          ProValue: this.title,
          Order: "asc",
          Sort: this.Sort,
          CategoryCode: this.CategoryCode
          // Type:'CommodityTypeType'
        })
        .then(res => {
          // this.product = res.Data.List;
          // console.log(this.shangpinlist)
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.product.push(arr[i]);
            }
            console.log(this.product);
          } else {
            this.finished = true;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.title = this.$route.query.name;
    this.key = this.$route.query.name;
    if (this.title == "祛皱") {
      // this.key = "皱";
      this.banner_list = this.zhouwen_list;
    } else if (this.title == "祛痘") {
      // this.key = "痘痘";
      this.banner_list = this.doudou_list;
    } else if (this.title == "祛痘印") {
      // this.key = "痘印";
      this.banner_list = this.douyin_list;
    } else if (this.title == "祛斑") {
      // this.key = "斑";
      this.banner_list = this.ban_list;
    } else if (this.title == "祛黑头") {
      // this.key = "黑头";
      this.banner_list = this.heitou_list;
    } else if (this.title == "缩小毛孔") {
      // this.key = "毛孔";
      this.banner_list = this.maokong_list;
    } else if (this.title == "去痤疮") {
      // this.key = "痤疮";
      this.banner_list = this.meigui_list;
    } else if (this.title == "护肤") {
      // this.key = "护肤";
      this.banner_list = this.fuse_list;
    } else if (this.title == "美白提亮") {
      // this.key = "肤质";
      this.banner_list = this.fuzhi_list;
    } else if (this.title == "祛黑眼圈") {
      // this.key = "黑眼圈";
      this.banner_list = this.heiyan_list;
    }
    this.GetCommodityInfoList();

    console.log("收到的title" + this.title);
  }
};
</script>
<style lang="less"   scoped>
@base: 37.5rem;
/deep/ .headtop {
  border-bottom: none !important;
}
.banner {
  position: relative;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  width: 90%;
  height: 82 / @base;
  margin: 14 / @base auto 0 auto;
  .shadow {
    position: fixed;
    right: 5%;
    top: 65 / @base;
    width: 9 / @base;
    height: 78 / @base;
    background: url("../../assets/images/active_shadow.png");
    background-size: 100% auto;
    z-index: 2;
  }

  .banner_item {
    width: 20%;
    height: 82 / @base;
    text-align: center;
    flex-shrink: 0;
    position: relative;
    img {
      width: 37 / @base;
      height: 37 / @base;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    p {
      font-size: 12px;
      text-align: center;
      letter-spacing: 0px;
      color: #161616;
      margin-top: 14 / @base;
    }
    .active {
      color: #9744fe;
    }
  }
}
.title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 90%;
  margin: 10 / @base auto 0 auto;
  height: 45 / @base;
  border-top: 1px solid #eeeeee;
  .title_left {
    font-size: 18px;
    color: #2e2d2d;
  }
  .title_right {
    border: solid 1px #f4f4f4;
    position: relative;
    display: flex;
    width: 78 / @base;
    height: 24 / @base;
    .title_right_line {
      position: absolute;
      top: 7 / @base;
      left: 50%;
      width: 1px;
      height: 10 / @base;
      background: #eeeeee;
    }
    .title_right_left {
      width: 50%;
      height: 24 / @base;
      font-size: 12px;
      color: #2e2d2d;
      text-align: center;
      line-height: 24 / @base;
    }
    .active {
      color: #9744fe;
    }
  }
}
.box {
  width: 100%;
  position: fixed;
  bottom: 0;
  top: 233 / @base;
  overflow-y: scroll;
  width: 100%;
  padding-left: 12 / @base;
  .box_item {
    display: flex;
    // width: 351 / @base;
    height: 140 / @base;
    margin-bottom: 22 / @base;
    padding-right: 12 / @base;
    .item_left {
      box-shadow: 2px 3px 10px 0px rgba(67, 28, 27, 0.11);
      border-radius: 10px;
      position: relative;
      // width: 125 / @base;
      height: 140 / @base;
      // overflow: hidden;
      img {
        width: 125 / @base;
        height: 140 / @base;
        border-radius: 10px;
      }
      .lable {
        border-radius: 6px 0px 0px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0 / @base;
        min-width: 35 / @base;
        height: 18 / @base;
        background-color: #e4d4f7;
        color: #782ad9;
        i {
          font-size: 8 / @base;
          transform: scale(0.8);
          color: #782ad9;
        }
        span {
          font-size: 10px;
        }
      }
    }
    .item_right {
      padding-right: 13 / @base;
      padding-left: 13 / @base;
      // width: 226 / @base;
      height: 115 / @base;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-top: 1px solid rgba(225, 225, 225, 0.4);
      border-right: 1px solid rgba(225, 225, 225, 0.4);
      border-bottom: 1px solid rgba(225, 225, 225, 0.4);
      margin-top: 14 / @base;
      .name {
        margin-top: 17 / @base;
        font-size: 14px;
        font-weight: bold;
        color: #3e3e3e;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //行数
        -webkit-box-orient: vertical;
        line-height: 19 / @base;
      }
      .des {
        margin-top: 10 / @base;
        color: #666666;
        font-weight: bold;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
      }
      .price {
        display: flex;
        align-items: center;
        margin-top: 8 / @base;
        font-size: 14px;
        color: #7b2eda;
        font-weight: bold;
        span {
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 0px;
          color: #7b2eda;
        }
      }
    }
  }
}
</style>