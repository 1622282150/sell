<template>
  <div>
    <div class="header">
      <i @click="back()" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou"></i>
      <span>{{title}}推荐</span>
    </div>
    <div class="bg1">
      <img class="imgo" src="../../assets/images/makeup_sou.png" alt />
      <input v-on:input="inputFunc" v-model.trim="keyword" type="text" placeholder="资生堂眉笔" />
      <img class="imgf" src="../../assets/images/makeup_che.png" alt />
    </div>
    <div class="bu"></div>
    <div class="bg2">
      <img src="../../assets/images/makeup_banner.png" alt />
      <div class="bg2_top"></div>
    </div>
    <div class="hui"></div>

    <!-- 商品部分 -->
    <div class="shopList">
      <div class="h3">
        为你推荐
        <span @click="shaixuan">
          <i class="iconfont icon-filter"></i>筛选
        </span>
      </div>
      <div class="list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <ul>
            <li
              v-for="(item, index) in shangpinlist"
              :key="index"
              @click="tochanpin(item.CommodityId)"
            >
              <img v-if="item.BannerImg" :src="item.BannerImg" alt />
              <img v-else src="../../assets/images/list.jpg" alt />
              <div class="bottom">
                <!-- <p>盛大收购大红色的乖哈岁的干啥</p> -->
                <p>{{item.Name }}</p>
                <!-- <p>的撒韩国的</p> -->
                <!-- <div class="des">{{item.Description|renMenLength}}</div> -->
                <div class="price clearfix">
                  <span class="qian fl">
                    <span class="ren">¥</span>
                    {{item.Price}}
                  </span>
                  <span class="num fr">
                    <i class="iconfont icon-hot"></i>
                    500
                  </span>
                </div>
                <div class="baoyou">包邮</div>
              </div>
            </li>
          </ul>
        </van-list>
      </div>
    </div>
    <!-- 筛选框 -->
    <!-- 筛选框 -->
    <van-popup v-model="showpopup" position="right" :style="{ width: '80%',height:'100%' }">
      <div class="shaixuan">
        <!-- 品牌 -->
        <div class="shaixuan_top">筛选</div>
        <div class="shaixuan_title">品牌</div>
        <div v-if="ispinpai" class="shaixuan_pinpai">
          <div
            class="shaixuan_ball"
            v-for="(item,index) in brandlist"
            :key="index"
            @click="sel_brand(item)"
          >{{item}}</div>
        </div>
        <div v-else @click="delete_pinpai" class="shaixuan_pinpai">
          <div class="shaixuan_pinpai_active">
            {{brand}}
            <div class="chahao">x</div>
          </div>
        </div>
        <!-- fuwu -->
        <div class="shaixuan_title">服务</div>
        <div class="shaixuan_pinpai">
          <div
            class="shaixuan_ball"
            v-for="(item,index) in fuwulist"
            :key="index"
            @click="sel_fuwu(item,index)"
            :class="item.isSelected ?'shaixuan_pinpai_active' : '' "
          >
            <div v-show="item.isSelected" class="chahao">x</div>
            {{item.name}}
          </div>
        </div>
        <!-- 价格 -->
        <div class="shaixuan_title">价格</div>
        <div class="shaixuan_price">
          <input type="text" placeholder="最低价" />
          <div>
            <span></span>
          </div>
          <input type="text" placeholder="最高价" />
        </div>
        <div @click="showpopup = false" class="shaixuan_bottom">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast,Popup } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
      title:'',
      showpopup: false, //筛选弹出层
      ispinpai: true, //品牌动态显示
      brand: '',
      brandlist: ["海澜之家", "韩优尚", "奇米", "男人之家"],
      fuwulist: [
        { name: "包邮", isSelected: false },
        { name: "折扣", isSelected: false },
        { name: "限时特卖", isSelected: false },
        { name: "今日特卖", isSelected: false },
        { name: "极速发货", isSelected: false },
        { name: "货到付款", isSelected: false }
      ],
      keyword: "",
      page: 1,
      loading: false,
      finished: false,
      shangpinlist: [],
    };
  },
  created(){
    
  }, 
   mounted() {
     this.title=this.$route.query.title
    this.GetCommodityInfoList();
  },
  methods: {
    back(){
       console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back(-1)
      }
    },
    shaixuan () {
      this.showpopup = true;
    },
    //显示筛选框-选择品牌
    sel_brand (name) {
      console.log(name)
      this.brand = name
      this.ispinpai = false
    },
    //取消选择的品牌
    delete_pinpai () {
      this.ispinpai = true
      this.brand = ''
    },
    sel_fuwu (item, index) {
      this.active_fuwu = index
      item.isSelected = !item.isSelected //然后通过这个属性判断是否选中点亮和取消
    },
    inputFunc() {
      this.loading=false;
      this.finished=false;
      this.shangpinlist = [];
      this.page = 1;
      this.GetCommodityInfoList();
    },

    onLoad() {
      // 异步更新数据

      this.page += 1;
      this.GetCommodityInfoList();
    },
    // 获取获取产品列表
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoList", {
          Keyword: this.title,
          CategoryId: 0,
          Page: this.page,
          Rows: 4,
          Order: "asc",
          Sort: "id"
          // Type:'CommodityTypeType'
        })
        .then(res=>{
 // this.shangpinlist = res.Data.List
          // console.log(this.shangpinlist)
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.shangpinlist.push(arr[i]);
            }
            console.log(this.shangpinlist);
          } else {
            this.finished = true;
          }
          // console.log(res.Data.List.length)
        }).catch(err => {});
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
  position: fixed;
  top: 0;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  color: #fff;
  //   border-bottom: 1 / @base solid #ccc;
  background: #d3a4fa;
  box-shadow: -11px 0px 13px 0px rgba(202, 179, 238, 0.74);
  z-index: 1;
  i {
    font-size: 25px;
  }
}
.bu {
  width: 100%;
  height: 190 / @base;
}
.bg1 {
  position: fixed;
  top: 120 / @base;
  left: 0;
  z-index: 12;
  width: 100%;
  height: 70 / @base;
  background: url("../../assets/images/makeup_bg1.png") no-repeat;
  background-size: 100% 100%;
  input {
    position: absolute;
    top: 0;
    left: 40 / @base;
    width: 629 / @base;
    height: 60 / @base;
    background-color: #fff;
    box-shadow: 0 7 / @base 24 / @base 0 rgba(0, 0, 0, 0.22);
    border-radius: 20px;
    padding-left: 87 / @base;
    font-size: 24 / @base;
    color: #a7a6b7;
  }
  .imgo {
    position: absolute;
    top: 15 / @base;
    left: 72 / @base;
    z-index: 11;
    width: 27 / @base;
    height: 27 / @base;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .imgf {
    position: absolute;
    right: 29 / @base;
    top: 5 / @base;
    width: 48 / @base;
    height: 49 / @base;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.bg2 {
  position: relative;
  width: 100%;
  height: 325 / @base;
  img {
    position: absolute;
    top: 30 / @base;
    left: 5%;
    width: 90%;
    height: 260 / @base;
  }
  .bg2_top {
    width: 100%;
    height: 181 / @base;
    background: url("../../assets/images/makeup_bg2.png");
  }
}
.hui {
  width: 100%;
  height: 18 / @base;
  background: #ededed;
}
.shopList {
  .h3 {
    padding: 20 / @base;
    // margin-top: 35 / @base;
    font-size: 40 / @base;
    color: #3c3c3c;
    font-weight: bold;
    // margin-bottom: 25 / @base;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 26 / @base;
      color: #999999;
      font-weight: normal;
    }
  }
  .list {
    background-color: #fff;
    padding: 0 20 / @base 0 20 / @base;

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 48%;
        border-radius: 13 / @base;
        overflow: hidden;
        background-color: #fff;
        margin-top: 20 / @base;
        display: block;
        box-shadow: 0px 0px 5px 1px #c4c3c6;
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
            // color: rgb(60, 60, 60);
            font-size: 30 / @base;
          }
          .des {
            color: rgb(148, 148, 148);
            font-size: 24 / @base;
            margin: 12 / @base 0;
          }
          .price {
            color: red;
            .qian {
              font-size: 34 / @base;
              & .ren {
                font-size: 21 / @base;
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
            height: 30 / @base;
            line-height: 25 / @base;
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
}
//筛选框
.shaixuan {
  .shaixuan_pinpai_active {
    position: relative;
    width: 160 / @base;
    height: 70 / @base;
    line-height: 70 / @base;
    background: #e6d9f7 !important;
    color: #a07bd9;
    font-size: 20 / @base;
    text-align: center;
    border-radius: 3px;
    .chahao {
      position: absolute;
      top: -5 / @base;
      right: -5 / @base;
      width: 25 / @base;
      height: 25 / @base;
      line-height: 25 / @base;
      text-align: center;
      border-radius: 50%;
      background: #b999eb;
      font-size: 20 / @base;
      color: white;
    }
  }
  .shaixuan_top {
    width: 100%;
    height: 120 / @base;
    background: #eeeeee;
    font-size: 35 / @base;
    padding: 50 / @base 0 0 40 / @base;
  }
  .shaixuan_title {
    width: 100%;
    height: 90 / @base;
    font-size: 30 / @base;
    padding: 30 / @base 0 0 40 / @base;
  }
  .shaixuan_pinpai {
    width: 100%;
    padding: 0 40 / @base;
    .shaixuan_ball {
      display: inline-block;
      width: 160 / @base;
      height: 70 / @base;
      line-height: 70 / @base;
      background: #e5e5e5;
      font-size: 20 / @base;
      text-align: center;
      border-radius: 3px;
      margin-right: 20 / @base;
      margin-bottom: 20 / @base;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  // jiage
  .shaixuan_price {
    display: flex;
    width: 100%;
    padding: 0 40 / @base;
    div {
      position: relative;
      width: 60 / @base;
      height: 50 / @base;

      span {
        position: absolute;
        left: 10 / @base;
        top: 25 / @base;
        width: 40 / @base;
        height: 1px;
        background: #636363;
      }
    }
    input {
      width: 190 / @base;
      height: 50 / @base;
      background: #e5e5e5;
      border-radius: 40 / @base;
      text-align: center;
      font-size: 20 / @base;
    }
  }
  .shaixuan_bottom {
    width: 300 / @base;
    height: 60 / @base;
    line-height: 60 / @base;
    color: #fff;
    border-radius: 20px;
    text-align: center;
    font-size: 30 / @base;
    background: #a270ee;
    margin: 160 / @base auto 0 auto;
  }
}
</style>