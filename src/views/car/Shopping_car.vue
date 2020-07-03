<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">购物车</div>
      <span
        v-if="isguanli"
        @click="isguanli=false"
        style="position:fixed;right:20px;top:15px;z-index:334;font-size:16px;"
      >管理</span>
      <span
        v-else
        @click="isguanli=true"
        style="position:fixed;right:20px;top:15px;z-index:334;font-size:16px;"
      >完成</span>
    </header>
    <div v-if="!cartInfoList.length" class="common_no">
      <img src="../../assets/images/community_kong.png" alt />
      <p>购物车空空如也~</p>
    </div>
    <!--内容块儿 -->
    <div v-else class="box" ref="paging">
      <div class="shop_box" v-for="(item,index) in cartInfoList" :key="index">
        <div class="box_title">
          <van-checkbox checked-color="#b06df4" @click="checkShop(item)" v-model="item.checked"></van-checkbox>
          <img @click="todian(item.SellerId)" src="../../assets/images/confirm_product.png" alt />
          <span @click="todian(item.SellerId)">{{item.SellerName}}</span>
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <!-- 店里商品 -->
        <div class="shop_list" v-for="(pros,value) in item.List" :key="value">
          <div class="shop_list_sel">
            <van-checkbox
              checked-color="#b06df4"
              @click="ischeck(item,pros)"
              v-model="pros.isChecked"
            ></van-checkbox>
          </div>
          <div class="shop_list_content">
            <!-- <product-cart size="mini" type="number" :option="3"></product-cart> -->
            <img @click="todetail(pros.CommodityId)" :src="pros.Img" alt />
            <div class="shop_list_content_right">
              <div @click="todetail(pros.CommodityId)" class="shop_list_title">{{pros.Name}}</div>
              <div @click="todetail(pros.CommodityId)" class="shop_list_des">{{pros.SCText}}</div>
              <!-- <p>¥{{pros.price*pros.count | priceLength}}</p> -->
              <div class="shop_list_price">
                <span @click="todetail(pros.CommodityId)">¥{{pros.Price}}</span>
                <van-stepper
                 async-change
                  @change="countChange(pros.Count,pros.Id)"
                  v-model="pros.Count"
                  integer
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- dibu -->
    <div class="bottom">
      <div class="bottom_left">
        <van-checkbox checked-color="#b06df4" v-model="isCheckAll" @click="checkAll()">全选</van-checkbox>
      </div>
      <div class="bottom_right">
        <div v-show="isguanli" class="bottom_right_num">
          <div class="bottom_right_numtop">已选{{allCount}}件</div>
          <div class="bottom_right_numbottom">
            总计 :
            <span style="color:#b695e9">¥{{allPrice | priceLength}}</span>
          </div>
        </div>
        <div v-show="isguanli" @click="jiesuan" class="bottom_right_ball">结算</div>
        <div v-show="!isguanli" @click="shanchu" class="bottom_right_del">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Dialog, Toast } from "vant";
import request from "@/utils/request";
import Return from "../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      del_list: [],
      isguanli: true,
      isCheckAll: false, // 是否全选
      allPrice: 0, // 所有价格
      allShops: 0, // 被选中的商店数量
      allCount: 0, // 被选中的产品数量
      cartInfoList: [], //购物车处理后的数组
      jiesuan_list: [] ,//结算传参的数组
      isxuanze:false
    };
  },
  mounted() {
    this.getcar();
  },
  watch: {
    // 深度监听所有数据，每次改变重新计算总价和总数
    cartInfoList: {
      deep: true,
      handler(val, oldval) {
        this._totalPeice();
        this._totalCount();
        this._totalDel();
        this._toOther();
        this.isxuan()
      }
    }
  },

  methods: {
    test(params) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        window.localStorage.setItem("token",params);
      }else{
         let token = JSON.stringify(params);
         window.localStorage.setItem("token", JSON.parse(token));
      }
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
        let url = this.$domain.url+ "shopping_car";
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
    todian(id) {
      this.$router.push({
        path: "/store_page",
        query: {
          id: id
        }
      });
    },
    todetail(id) {
      this.$router.push({
        path: "/product_detail",
        query: {
          id: id
        }
      });
    },
    getcar() {
      request
        .post(this.$api + "/mobile/GetMyShoppingCartGroupPageList", {

        })
        .then(res => {
          if (res.IsSuccess) {
            //  this.cartInfoList=res.Data.List;
             var arr=res.Data.List;
             arr.forEach(item=>{
               item.checked=false;
               item.checkedCount=0;
               item.List.forEach(i=>{
                 i.isChecked=false
               })
             })
             this.cartInfoList=arr
            // let arr0 = res.Data.List;
            // arr0.forEach(element => {
            //   element.isChecked = false;
            // });

            // var arr = arr0;
            // var map = {};
            // var dest = [];
            // for (var i = 0; i < arr.length; i++) {
            //   var ai = arr[i];
            //   if (!map[ai.SellerId]) {
            //     dest.push({
            //       SellerId: ai.SellerId,
            //       SellerName: ai.SellerName,
            //       checked: false,
            //       productList: [ai],
            //       checkedCount: 0
            //     });
            //     map[ai.SellerId] = ai;
            //   } else {
            //     for (var j = 0; j < dest.length; j++) {
            //       var dj = dest[j];
            //       if (dj.SellerId == ai.SellerId) {
            //         dj.productList.push(ai);
            //         break;
            //       }
            //     }
            //   }
            // }
            // this.cartInfoList = dest;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // a步进器
    countChange(count, id) {
      request
        .post(this.$api + "/mobile/UpdatShoppingCartCount", {
          Count: count,
          Id: id
        })
        .then(res => {})
        .catch(err => {});
    },
    // 选中单个商品
    ischeck(item, pro) {
      // 为未选中的时候改变为false，反之为true
      !pro.isChecked ? this._checkTrue(item, pro) : this._checkFalse(item, pro);
    },
    // 修改单个商品的true
    _checkTrue(item, pro) {
      pro.isChecked = true; // 将商品选中状态改为true
      // 这里执行了两部，选中商品数量先+1，再与该店铺商品数量比较，如果相等就更改店铺选中状态为true
      if (++item.checkedCount === item.List.length) {
        item.checked = true;
      } else {
        return "";
      }
      // ++item.checkedCount === item.List.length ? item.checked = true : ''
      // 如果店铺选中状态改为true，选中店铺数量先+1，再与店铺数量比较，如果相等就更改全选选中状态为true
      // // 当商店全选状态，每全选一个商店，被选中商店数加一，数值等于所有商店数，全选状态为true
      if (item.checked) {
        if (++this.allShops === this.cartInfoList.length) {
          this.isCheckAll = true;
        } else {
          this.isCheckAll = false;
        }
      } else {
        return "";
      }
      // item.checked ? ++this.allShops === this.cartInfoList.length ? this.isCheckAll = true : this.isCheckAll = false : ''
    },
    // 修改单个商品的 false
    _checkFalse(item, pro) {
      pro.isChecked = false; // 将商品选中状态改为false
      --item.checkedCount; // 被选中的商品数减一
      if (item.checked) {
        // 如果店铺是被选中的，更改店铺选中状态
        item.checked = false; // 当商店状态为选中时改变false
        --this.allShops; // 商店数减一
      }
      this.isCheckAll = false; // 全选状态为false
    },
    // 选择整个商店的商品
    checkShop(item) {
      !item.checked ? this._shopTrue(item) : this._shopFalse(item);
    },
    // 遍历商店每个商品,状态为false的改变为true,又在_checkTrue()方法中将商店状态改为true
    _shopTrue(item) {
      item.List.forEach(pro => {
        if (pro.isChecked === false) {
          this._checkTrue(item, pro);
        } else {
          return "";
        }
        // pro.isChecked === false ? this._checkTrue(item, pro) : ''
      });
    },
    _shopFalse(item) {
      item.List.forEach(pro => {
        // 同上
        if (pro.isChecked === true) {
          this._checkFalse(item, pro);
        } else {
          return "";
        }
        //  pro.isChecked === true ? this._checkFalse(item, pro) : ''
      });
    },
    // 选择全部商店的商品，已经计算总价和总数量的函数
    checkAll() {
      // 方法内调用方法
      this.isCheckAll = !this.isCheckAll;
      this.isCheckAll
        ? this.cartInfoList.forEach(item => {
            this._shopTrue(item);
          })
        : this.cartInfoList.forEach(item => {
            this._shopFalse(item);
          });
    },
    _totalPeice() {
      // 每次调用此方法，将初始值为0，遍历价格并累加
      this.allPrice = 0;
      this.cartInfoList.forEach(item => {
        let products = item.List;
        products.forEach(pros => {
          if (pros.isChecked) {
            this.allPrice += pros.Price * pros.Count;
          }
        });
      });
    },
    _totalCount() {
      // 同上
      this.allCount = 0;
      this.cartInfoList.forEach(item => {
        this.allCount += item.checkedCount;
      });
    },

    _totalDel() {
      this.del_list = [];
      this.cartInfoList.forEach(item => {
        let products = item.List;
        products.forEach(pros => {
          if (pros.isChecked) {
            this.del_list.push(pros.Id);
          }
        });
      });
    },
    _toOther() {
      this.jiesuan_list = [];
      this.cartInfoList.forEach(item => {
        let products = item.List;
        products.forEach(pros => {
          if (pros.isChecked) {
            this.jiesuan_list.push(pros);
            // console.log(this.jiesuan_list);
          }
        });
      });
    },
    isxuan(){
      this.cartInfoList.forEach(item => {
        let products = item.List;
        products.forEach(pros => {
          if (pros.isChecked === true) {
            this.isxuanze=true
            // console.log(this.jiesuan_list);
          }
        });
      });
    },
    jiesuan() {
     if(this.isxuanze === false){
        Toast('还未选中商品')
     }else{
       console.log(this.jiesuan_list)
           window.localStorage.setItem("type", 1);
            this.$router.push({
              path: "/confirm_order",
              query: {
                list: JSON.stringify(this.jiesuan_list)
                // num: this.value
              }
            });
        // var arr = this.jiesuan_list;
        //     var map = {};
        //     var dest = [];
        //     for (var i = 0; i < arr.length; i++) {
        //       var ai = arr[i];
        //       if (!map[ai.SellerId]) {
        //         dest.push({
        //           ProductType: ai.ProductType,
        //           ProductId: ai.ProductId,
        //           SellerId: ai.SellerId,
        //           SellerName: ai.SellerName,
        //           productList: [ai],
        //           Price: ai.Price,
        //           Count: ai.Count
        //         });
        //         map[ai.SellerId] = ai;
        //       } else {
        //         for (var j = 0; j < dest.length; j++) {
        //           var dj = dest[j];
        //           if (dj.SellerId == ai.SellerId) {
        //             dj.productList.push(ai);
        //             break;
        //           }
        //         }
        //       }
        //     }
        //     console.log(dest);
        //     window.localStorage.setItem("type", 1);
        //     this.$router.push({
        //       path: "/confirm_order",
        //       query: {
        //         list: JSON.stringify(dest)
        //         // num: this.value
        //       }
        //     });
     }
    },
    // 购物车删除方法
    shanchu() {
      console.log(this.del_list)
      if (this.del_list.length) {
        let len = this.del_list.length;
        Dialog.confirm({
          message: "确认将这" + len + "个宝贝删除"
        })
          .then(() => {
            request
              .post(this.$api + "/mobile/ShoppingCartDelete", {
                ids: this.del_list
              })
              .then(res => {
                if (res.Data != 1) {
                  Toast(res.Message);
                } else {
                  this.getcar();
                }
              })
              .catch(err => {});
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast({
          message: "您还没有选择商品~"
        });
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.common_no {
  padding-top: 120 / @base;
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
    font-size: 35 / @base;
    color: #999999;
    margin-top: 50 / @base;
  }
}
header {
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 20 / @base;
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
  height: 102 / @base;
}
// 商家盒子
.box {
  background: #f2f2f2;
  position: absolute;
  top: 100 / @base;
  bottom: 100 / @base;
  width: 100%;
  overflow-y: scroll;
  .shop_box {
    width: 95%;
    // height: 370/@base;
    background: #ffffff;
    margin: 20 / @base auto 0 auto;
    border-radius: 15px;
    /deep/ .van-checkbox__icon .van-icon {
      background: #eeeeee;
    }
    .box_title {
      display: flex;
      width: 100%;
      font-size: 30 / @base;
      font-weight: 600;
      height: 100 / @base;
      padding: 30 / @base;
      // line-height: 100/@base;
      // background: red;

      img {
        display: inline-block;
        width: 35 / @base;
        height: 35 / @base;
        margin-top: 1px;
        margin-left: 30 / @base;
      }
      span {
      display: inline-block;
      min-width: 160 / @base;
      max-width: 250/@base;
      height: 35 / @base;
      font-size: 32 / @base;
      color: #333333;
      font-weight: bold;
      font-family: "PingFangMedium";
      margin-left: 10 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
      }
      i {
        color: #8f8f8f;
        font-size: 25 / @base;
        line-height: 43 / @base;
        margin-left: 10 / @base;
      }
    }
    .shop_list {
      display: flex;
      width: 100%;
      // height: 300 / @base;
      padding: 0 30 / @base 30 / @base 30 / @base;
      .shop_list_sel {
        height: 270 / @base;
        line-height: 270 / @base;
        padding-top: 80 / @base;
      }
      .shop_list_content {
        position: relative;
        display: flex;
        width: 96%;
        min-height: 270 / @base;
        .step {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        //   background: red;
        img {
          min-width: 200 / @base;
          max-width: 200 / @base;
          height: 200 / @base;
          margin-left: 15 / @base;
        }
        .shop_list_content_right {
          width: 100%;
          height: 270 / @base;
          padding-left: 23 / @base;
          .shop_list_title {
            width: 100%;
            // min-height: 61 / @base;
            font-size: 28 / @base;
            font-weight: bold;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //行数
            -webkit-box-orient: vertical;
            //   word-wrap: break-word;
          }
          .shop_list_des {
            width: 100%;
            height: 61 / @base;
            font-size: 24 / @base;
            color: #828282;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //行数
            -webkit-box-orient: vertical;
          }
          .shop_list_price {
            margin-top: 20 / @base;
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 51 / @base;
            span {
              font-size: 27 / @base;
              color: #b695e9;
              font-weight: bold;
              line-height: 51 / @base;
            }
            /deep/ .van-stepper__minus {
              width: 23px;
              background: none;
              border: 1px solid #a0a0a0;
            }
            /deep/ .van-stepper__input {
              width: 40px;
              margin: 0;
              border-top: 1px solid #a0a0a0;
              border-bottom: 1px solid #a0a0a0;
              background: none;
            }
            /deep/ .van-stepper__plus {
              width: 23px;
              background: none;
              border: 1px solid #a0a0a0;
            }
          }
          .shop_list_gong {
            text-align: right;
            margin-top: 63 / @base;
            font-size: 20 / @base;
            color: #333333;
            font-weight: bold;
            span {
              font-size: 24 / @base;
            }
          }
        }
      }
    }
  }
}
//dibu
.bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  background: #ffffff;
  width: 100%;
  height: 100 / @base;
  z-index: 10;
  /deep/ .van-checkbox__icon .van-icon {
    background: #eeeeee;
  }
  .bottom_left {
    padding: 30 / @base;
    width: 40%;
    height: 100 / @base;
    font-size: 30 / @base;
    color: #a8a8a8;
  }
  .bottom_right {
    position: relative;
    display: flex;
    padding: 15 / @base;
    width: 60%;
    height: 100 / @base;
    .bottom_right_num {
      margin-left: 30 / @base;
      // overflow: hidden;
      // font-size: 32 / @base;
      // // line-height: 70 / @base;
      // vertical-align: text-bottom;
      .bottom_right_numtop {
        font-size: 20 / @base;
        color: #6b6b6b;
      }
      .bottom_right_numbottom {
        font-size: 26 / @base;
        font-weight: bold;
        span {
          margin-left: 6 / @base;
        }
      }
    }
    .bottom_right_ball {
      position: absolute;
      right: 40 / @base;
      top: 22 / @base;
      width: 170 / @base;
      height: 55 / @base;
      line-height: 55 / @base;
      border-radius: 20px;
      background-image: linear-gradient(
        120deg,
        #9657f6 0%,
        #8e47fb 50%,
        #8536ff 100%
      );
      font-size: 26 / @base;
      color: #ffffff;
      font-weight: bold;
      text-align: center;
    }
    .bottom_right_del {
      position: absolute;
      right: 40 / @base;
      top: 22 / @base;
      width: 170 / @base;
      height: 55 / @base;
      line-height: 55 / @base;
      border-radius: 20px;
      font-weight: bold;
      //   background: red;
      font-size: 26 / @base;
      color: #b695e9;
      text-align: center;
      border: 1px solid #b695e9;
    }
  }
}
</style>