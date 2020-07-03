-<template>
  <div ref="paging" style="background:#f2f2f2">
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">我的宝贝</div>
    </header>
    <div class="bu"></div>
    <van-tabs
      v-model="active"
      line-height="2px"
      background="#f2f2f2"
      line-width="20px"
      title-active-color="#b796e9"
      :offset-top="50"
      sticky
      color="#b796e9"
      swipeable
    >
      <van-tab title="全部">
        <div v-show="!list_all.length" class="common_no">
          <img src="../../../assets/images/community_kong.png" alt />
          <p>你还没有订单~</p>
        </div>

        <div class="cont">
          <!-- 盒子 -->
          <van-list v-model="loading_all" :finished="finished_all" finished-text @load="onLoad_all">
            <div class="box" v-for="(item,index) in list_all" :key="index">
              <div class="box_title" @click="todian(item.SellerId)">
                <img src="../../../assets/images/confirm_project.png" alt />
                <span class="span">{{item.SellerName}}</span>
                <van-icon name="arrow" />
                <span class="title_r" v-if="item.Status === 0">等待买家付款</span>
                <!-- <span class="title_r" v-else-if="item.Status === -2">交易关闭</span> -->
                <span class="title_r" v-else-if="item.Status === 1">已付款</span>
              </div>
              <div
                class="box_item"
                v-for="(i,index) in item.OrderDetailList"
                :key="index"
                @click="todetail(item.Id)"
              >
                <img :src="i.Img" alt />
                <div class="item_right">
                  <div class="item_name">{{i.Name}}</div>
                  <div class="item_des">{{i.SCText}}</div>
                  <div class="item_price">
                    <div v-if="i.Price===0&&i.Points===0">
                      <span>
                        <span class="renminbi">¥</span>
                        <span class="jiage">{{i.Price}}</span>
                      </span>
                    <span class="num">x{{i.Count}}</span>
                    </div>
                    <div v-else>
                      <span v-show="i.Price>0">
                        <span class="renminbi">¥</span>
                        <span class="jiage">{{i.Price}}</span>
                      </span>
                      <span v-show="i.Points>0" class="jiage">{{i.Points}}积分</span>
                   <span class="num">x{{i.Count}}</span>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div  class="box_bottom">
                共{{item.TotalCount}}件商品,合计:
                <span v-if="item.TotalPrice===0&&item.TotalPoints===0">
                <span>¥{{item.TotalPrice}}</span>
              </span>
               <span v-else>
                <span v-show="item.TotalPrice>0">¥{{item.TotalPrice}}</span>
                <span v-show="item.TotalPoints>0">{{item.TotalPoints}}积分</span>
              </span>
              </div>
            
              <div v-if="item.Status === 0" class="qufu">
                <div class="qufu_qu" @click="is_quxiao(item.Id)">取消订单</div>
                <div class="qufu_fu" @click="fukuan(item.Id,item.TotalPrice)">付款</div>
              </div>
              <div
                v-else-if="item.Status === -2 || item.Status === -3  || item.Status === 3  || item.Status === 4"
                class="qufu"
              >
                <div class="qufu_shanchu" @click="is_shanchu(item.Id,index)">删除订单</div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab style="background:#f2f2f2" title="待付款">
        <div v-if="!list_daifu.length" class="common_no">
          <img src="../../../assets/images/community_kong.png" alt />
          <p>你还没有订单~</p>
        </div>
        <div class="cont" v-else>
          <!-- 盒子 -->
          <van-list
            v-model="loading_daifu"
            :finished="finished_daifu"
            finished-text
            @load="onLoad_daifu"
          >
            <div class="box" v-for="(item,index) in list_daifu" :key="index">
              <div class="box_title" @click="todian(item.SellerId)">
                <img src="../../../assets/images/confirm_project.png" alt />
                <span class="span">{{item.SellerName}}</span>
                <van-icon name="arrow" />
                <span class="title_r">等待买家付款</span>
              </div>
              <div
                class="box_item"
                v-for="(i,index) in item.OrderDetailList"
                :key="index"
                @click="todetail(item.Id)"
              >
                <img :src="i.Img" alt />
                <div class="item_right">
                  <div class="item_name">{{i.Name}}</div>
                  <div class="item_des">{{i.SCText}}</div>
                  <div class="item_price">
                    <div v-if="i.Price===0&&i.Points===0">
                      <span>
                        <span class="renminbi">¥</span>
                        <span class="jiage">{{i.Price}}</span>
                      </span>
                       <span class="num">x{{i.Count}}</span>
                    </div>
                    <div v-else>
                      <span v-show="i.Price>0">
                        <span class="renminbi">¥</span>
                        <span class="jiage">{{i.Price}}</span>
                      </span>
                      <span v-show="i.Points>0" class="jiage">{{i.Points}}积分</span>
                     <span class="num">x{{i.Count}}</span>
                    </div>
                   
                  </div>
                </div>
              </div>
              <div class="box_bottom">
                共{{item.TotalCount}}件商品,合计:¥
                <span>{{item.TotalPrice}}</span>
              </div>
              <div class="qufu">
                <div class="qufu_qu" @click="is_quxiao(item.Id)">取消订单</div>
                <div class="qufu_fu" @click="fukuan(item.Id,item.TotalPrice)">付款</div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <div v-if="!list_daifa.length" class="common_no">
          <img src="../../../assets/images/community_kong.png" alt />
          <p>你还没有订单~</p>
        </div>
        <div class="cont" v-else>
          <!-- 盒子 -->
          <div class="box" v-for="(item,index) in list_daifa" :key="index">
            <div class="box_title" @click="todian(item.SellerId)">
              <img src="../../../assets/images/confirm_project.png" alt />
              <span class="span">{{item.SellerName}}</span>
              <van-icon name="arrow" />
              <span class="title_r">已付款</span>
            </div>
            <div
              class="box_item"
              v-for="(i,index) in item.OrderDetailList"
              :key="index"
              @click="todetail(item.Id)"
            >
              <img :src="i.Img" alt />
              <div class="item_right">
                <div class="item_name">{{i.Name}}</div>
                <div class="item_des">{{i.SCText}}</div>
                <div class="item_price">
                  <div v-if="i.Price===0&&i.Points===0">
                    <span>
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span class="num">x{{i.Count}}</span>
                  </div>
                  <div v-else>
                    <span v-show="i.Price>0">
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span v-show="i.Points>0" class="jiage">{{i.Points}}积分</span>
                  <span class="num">x{{i.Count}}</span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div  class="box_bottom">
              共{{item.TotalCount}}件商品,合计:
              <span v-if="item.TotalPrice===0&&item.TotalPoints===0">
                <span>¥{{item.TotalPrice}}</span>
              </span>
               <span v-else>
                <span v-show="item.TotalPrice>0">¥{{item.TotalPrice}}</span>
                <span v-show="item.TotalPoints>0">{{item.TotalPoints}}积分</span>
              </span>
            </div>
            
            <div class="qufu">
              <div class="qufu_fu" @click="tixing(item.Id)">提醒发货</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div class="common_no" v-if="!list_daishou.length">
          <img src="../../../assets/images/community_kong.png" alt />
          <p>你还没有订单~</p>
        </div>
        <div class="cont" v-else>
          <!-- 盒子 -->
          <div class="box" v-for="(item,index) in list_daishou" :key="index">
            <div class="box_title" @click="todian(item.SellerId)">
              <img src="../../../assets/images/confirm_project.png" alt />
              <span class="span">{{item.SellerName}}</span>
              <van-icon name="arrow" />
              <span class="title_r">已付款</span>
            </div>
            <div
              class="box_item"
              v-for="(i,index) in item.OrderDetailList"
              :key="index"
              @click="todetail(item.Id)"
            >
              <img :src="i.Img" alt />
              <div class="item_right">
                <div class="item_name">{{i.Name}}</div>
                <div class="item_des">{{i.SCText}}</div>
                <div class="item_price">
                  <div v-if="i.Price===0&&i.Points===0">
                    <span>
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span class="num">x{{i.Count}}</span>
                  </div>
                  <div v-else>
                    <span v-show="i.Price>0">
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span v-show="i.Points>0" class="jiage">{{i.Points}}积分</span>
                  <span class="num">x{{i.Count}}</span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="box_bottom">
              共{{item.TotalCount}}件商品,合计:
              <span v-if="item.TotalPrice===0&&item.TotalPoints===0">
                <span>¥{{item.TotalPrice}}</span>
              </span>
               <span v-else>
                <span v-show="item.TotalPrice>0">¥{{item.TotalPrice}}</span>
                <span v-show="item.TotalPoints>0">{{item.TotalPoints}}积分</span>
              </span>
            </div>
            <div class="qufu">
              <div class="qufu_fu" @click="confirm_shouhuo(item.Id)">确认收货</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待使用">
        <div class="common_no">
          <img src="../../../assets/images/community_kong.png" alt />
          <p>你还没有订单~</p>
        </div>
      </van-tab>
      <van-tab title="待评价">
        <div class="common_no" v-if="!list_daiping.length">
          <img src="../../../assets/images/community_kong.png" alt />
          <p>你还没有订单~</p>
        </div>
        <div class="cont" v-else>
          <!-- 盒子 -->
          <div class="box" v-for="(item,index) in list_daiping" :key="index">
            <div class="box_title" @click="todian(item.SellerId)">
              <img src="../../../assets/images/confirm_project.png" alt />
              <span class="span">{{item.SellerName}}</span>
              <van-icon name="arrow" />
              <span class="title_r">已付款</span>
            </div>
            <div
              class="box_item"
              v-for="(i,index) in item.OrderDetailList"
              :key="index"
              @click="todetail(item.Id)"
            >
              <img :src="i.Img" alt />
              <div class="item_right">
                <div class="item_name">{{i.Name}}</div>
                <div class="item_des">{{i.SCText}}</div>
                <div class="item_price">
                  <div v-if="i.Price===0&&i.Points===0">
                    <span>
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span class="num">x{{i.Count}}</span>
                  </div>
                  <div v-else>
                    <span v-show="i.Price>0">
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span v-show="i.Points>0" class="jiage">{{i.Points}}积分</span>
                  <span class="num">x{{i.Count}}</span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="box_bottom">
              共{{item.TotalCount}}件商品,合计:
              <span v-if="item.TotalPrice===0&&item.TotalPoints===0">
                <span>¥{{item.TotalPrice}}</span>
              </span>
               <span v-else>
                <span v-show="item.TotalPrice>0">¥{{item.TotalPrice}}</span>
                <span v-show="item.TotalPoints>0">{{item.TotalPoints}}积分</span>
              </span>
            </div>
            <div class="qufu">
              <div class="qufu_fu" @click="pingjia(item.Id)">评价</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="退款">
        <div class="common_no" v-if="!list_tui.length">
          <img src="../../../assets/images/community_kong.png" alt />
          <p>你还没有订单~</p>
        </div>
        <div class="cont" v-else>
          <!-- 盒子 -->
          <div class="box" v-for="(item,index) in list_tui" :key="index">
            <div class="box_title" @click="todian(item.SellerId)">
              <img src="../../../assets/images/confirm_project.png" alt />
              <span class="span">{{item.SellerName}}</span>
              <van-icon name="arrow" />
              <span class="title_r">{{item.RefundOrderStatusText}}</span>
            </div>
            <div
              class="box_item"
              v-for="(i,index) in item.OrderDetailList"
              :key="index"
              @click="todetail2(item.Id)"
            >
              <img :src="i.Img" alt />
              <div class="item_right">
                <div class="item_name">{{i.Name}}</div>
                <div class="item_des">{{i.SCText}}</div>
                <div class="item_price">
                  <div v-if="i.Price===0&&i.Points===0">
                    <span>
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span class="num">x{{i.Count}}</span>
                  </div>
                  <div v-else>
                    <span v-show="i.Price>0">
                      <span class="renminbi">¥</span>
                      <span class="jiage">{{i.Price}}</span>
                    </span>
                    <span v-show="i.Points>0" class="jiage">{{i.Points}}积分</span>
                  <span class="num">x{{i.Count}}</span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="box_bottom">
              共{{item.TotalCount}}件商品,合计:
              <span v-if="item.TotalPrice===0&&item.TotalPoints===0">
                <span>¥{{item.TotalPrice}}</span>
              </span>
               <span v-else>
                <span v-show="item.TotalPrice>0">¥{{item.TotalPrice}}</span>
                <span v-show="item.TotalPoints>0">{{item.TotalPoints}}积分</span>
              </span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Tab, Tabs, Dialog, Toast } from "vant";
export default {
  data() {
    return {
      active: "",
      fullheight: document.documentElement.clientHeight,
      list_all: [],
      list_daifu: [], //待付款
      list_daifa: [], //待发货
      list_daishou: [], //待收货
      list_daishi: [], //待使用
      list_daiping: [], //待评价
      list_tui: [], //退款
      loading_all: false, //全部
      finished_all: false, //全部
      page_all: 1, //全部
      loading_daifu: false, //待付款
      finished_daifu: false, //待付款
      page_daifu: 1 //待付款
    };
  },
  watch: {
    active(newName, oldName) {
      if (this.active == 0) {
        //  全部
        this.getAll();
      } else if (this.active == 1) {
        //  待付款
        this.getDaifu();
      } else if (this.active == 2) {
        //代发货
        this.getDaifa();
      } else if (this.active == 3) {
        //待收货
        this.getDaishou();
      } else if (this.active == 4) {
        // 待使用
        this.getDaishi();
      } else if (this.active == 5) {
        //待评价
        this.getDaiping();
      } else if (this.active == 6) {
        //退款
        this.gettui();
      }
    }
  },
  mounted() {
    this.$refs.paging.style.height = this.fullheight + "px";

    this.active = Number(this.getQueryString("index")) + 1;
    console.log(this.active);
  },
  methods: {
    // 评价
    pingjia(id) {
      this.$router.push({
        path: "/pingjia",
        query: {
          id: id
        }
      });
    },
    // 退款
    tuikuan(id) {
      //  console.log(id)
      this.$router.push({
        path: "tuikuan",
        query: {
          id: id
        }
      });
    },
    todian(id) {
      this.$router.push({
        path: "/store_page",
        query: {
          id: id
        }
      });
    },
    // 确认收货
    confirm_shouhuo(id) {
      request
        .post(this.$api + "/mobile/HasReciveCommodity", {
          Id: id
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast(res.Message);
            this.active = 5;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 上拉加载
    //全部
    onLoad_all() {
      // 异步更新数据

      this.page_all += 1;
      this.getAll();
    },
    //代付
    onLoad_daifu() {
      // 异步更新数据

      this.page_daifu += 1;
      this.getDaifu();
    },
    // 提醒
    tixing(id) {
      console.log(id);
      request
        .post(this.$api + "/mobile/RemindDelivery", {
          OrderNo: id
        })
        .then(res => {
          Toast(res.Message);
        })
        .catch(err => {});
    },
    fukuan(id, price) {
      this.$router.push({
        path: "/pay",
        query: {
          OrderId: id,
          TotalPrice: price
        }
      });
    },
    // 去详情
    todetail(id) {
      this.$router.push({
        path: "/info_detail",
        query: {
          id: id,
          type: 1
        }
      });
    },
    todetail2(id) {
      this.$router.push({
        path: "/info_detail",
        query: {
          id: id,
          type: 2
        }
      });
    },
    getindex() {
      // var u = navigator.userAgent;
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      // if (isAndroid) {
      // } else if (isiOS) {
      //   this.active = this.$route.query.index + 1;
      //   console.log("ios+index" + this.active);
      // } else {
      // }
    },
    getQueryString(name, search) {
      search =
        search ||
        window.location.search.substr(1) ||
        window.location.hash.split("?")[1];
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = search.match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        window.location.href = "mqjapp://my";
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        // if (window.history.length > 1) {
        //   this.$router.back();
        // } else {
        //   window.android.closePage();
        // }
        // this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url + "order";
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
    // 取消订单
    is_quxiao(id) {
      Dialog.confirm({
        message: "确认取消此订单"
      })
        .then(() => {
          request
            .post(this.$api + "/mobile/CancelOrder", {
              Id: id
            })
            .then(res => {
              if (res.IsSuccess) {
                this.list_all = [];
                this.list_daifu = [];
                this.getAll();
                this.getDaifu();
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    // 删除订单
    is_shanchu(id, index) {
      Dialog.confirm({
        message: "确认删除此订单"
      })
        .then(() => {
          request
            .post(this.$api + "/mobile/DelOrder", {
              Id: id
            })
            .then(res => {
              if (res.IsSuccess) {
                //  删除成功
                // this.getAll();
                this.list_all.splice(index, 1);
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    getAll() {
      request
        .post(this.$api + "/mobile/GetMyOrderList", {
          Page: this.page_all,
          Rows: 5,
          Sort: "CreateTime",
          Order: "asc"
        })
        .then(res => {
          // this.list_all = res.Data.ListData;
          this.loading_all = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.list_all.push(arr[i]);
            }
          } else {
            this.finished_all = true;
          }
        })
        .catch(err => {});
    },
    getDaifu() {
      request
        .post(this.$api + "/mobile/GetMyOrderList", {
          Page: this.page_daifu,
          Rows: 6,
          Status: 0
        })
        .then(res => {
          // this.list_daifu = res.Data.ListData;
          this.loading_daifu = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.list_daifu.push(arr[i]);
            }
            // this.showlist.concat(res.data.Data.list)
            // console.log(this.showlist)
          } else {
            this.finished_daifu = true;
          }
        })
        .catch(err => {});
    },
    getDaifa() {
      request
        .post(this.$api + "/mobile/GetMyOrderList", {
          Page: 1,
          Rows: 10,
          Status: 1
        })
        .then(res => {
          this.list_daifa = res.Data.List;
        })
        .catch(err => {});
    },
    getDaishou() {
      request
        .post(this.$api + "/mobile/GetMyOrderList", {
          Page: 1,
          Rows: 10,
          Status: 2
        })
        .then(res => {
          this.list_daishou = res.Data.List;
        })
        .catch(err => {});
    },
    getDaishi() {
      request
        .post(this.$api + "/mobile/GetMyOrderList", {
          Page: 1,
          Rows: 10,
          Status: 6
        })
        .then(res => {
          this.list_daishi = res.Data.List;
        })
        .catch(err => {});
    },
    getDaiping() {
      request
        .post(this.$api + "/mobile/GetMyOrderList", {
          Page: 1,
          Rows: 10,
          Status: 3
        })
        .then(res => {
          this.list_daiping = res.Data.List;
        })
        .catch(err => {});
    },
    gettui() {
      request
        .post(this.$api + "/mobile/GetMyApplyRefundList", {
          Title: ""
        })
        .then(res => {
          this.list_tui = res.Data.List;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 10px;
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
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 50px;
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
    font-size: 35 / @base;
    color: #999999;
    margin-top: 50 / @base;
  }
}
.cont {
  position: fixed;
  top: 98px;
  bottom: 0;
  width: 100%;
  height: calc(~"100% - 96px");
  overflow: scroll;
}
.box {
  width: 670 / @base;
  margin: 32 / @base auto 0 auto;
  background: #fff;
  border-radius: 20 / @base;
  padding: 31 / @base 35 / @base 40 / @base 20 / @base;
  .box_title {
    position: relative;
    display: flex;
    height: 35 / @base;
    line-height: 35 / @base;
    margin-bottom: 51 / @base;
    img {
      display: inline-block;
      width: 35 / @base;
      height: 35 / @base;
    }
    .span {
      display: inline-block;
      min-width: 160 / @base;
      max-width: 250 / @base;
      // height: 35 / @base;
      font-size: 32 / @base;
      color: #333333;
      font-weight: bold;

      margin-left: 10 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
    .title_r {
      position: absolute;
      right: 0;
      font-size: 24 / @base;
      font-weight: bold;
      color: #b695e9;
    }
    i {
      display: inline-block;
      font-size: 12px;
      line-height: 35 / @base;
    }
  }
  .box_item {
    width: 100%;
    height: 203 / @base;
    margin: 27 / @base 0;
    display: flex;
    img {
      min-width: 200 / @base;
      max-width: 200 / @base;
      height: 200 / @base;
      border-radius: 5 / @base;
      background-size: 100% 100%;
    }
    .item_right {
      width: 100%;
      height: 100%;

      padding-left: 23 / @base;
      .item_name {
        // height: 61/@base;
        width: 100%;
        font-size: 28 / @base;
        color: #333333;
        font-weight: bold;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
      }
      .item_des {
        font-size: 24 / @base;
        margin-top: 33 / @base;
        color: #828282;
        font-weight: bold;
      }
      .item_price {
        //   display: flex;
        //   width:130/@base;
        height: 58 / @base;

        .renminbi {
          font-size: 24 / @base;
          color: #b695e9;
          font-weight: bold;
        }
        .jiage {
          font-size: 37 / @base;
          font-weight: bold;
          color: #b695e9;
          font-weight: bold;
        }
        .num {
          font-size: 26 / @base;

          font-weight: bold;
          color: #6e6e6e;
        }
      }
    }
  }
  .box_bottom {
    margin-top: 30 / @base;
    text-align: right;
    font-size: 20 / @base;
    color: #333333;
    span {
      font-size: 28 / @base;
    }
  }
  .qufu {
    position: relative;
    width: 100%;
    height: 60 / @base;
    // background:red;
    margin-top: 20 / @base;
    .qufu_qu {
      position: absolute;
      right: 182 / @base;
      width: 170 / @base;
      height: 55 / @base;
      line-height: 55 / @base;
      border: 1px solid #bfbfbf;
      border-radius: 27 / @base;
      text-align: center;
      font-size: 26 / @base;
      font-weight: bold;
      color: #838383;
    }
    .qufu_fu {
      position: absolute;
      right: 0;
      width: 170 / @base;
      height: 55 / @base;
      line-height: 55 / @base;
      border: 1px solid #b695e9;
      border-radius: 27 / @base;
      text-align: center;
      font-size: 26 / @base;
      font-weight: bold;
      color: #b695e9;
    }
    .qufu_shanchu {
      position: absolute;
      right: 0;
      width: 170 / @base;
      height: 55 / @base;
      line-height: 55 / @base;
      border: 1px solid #838383;
      border-radius: 27 / @base;
      text-align: center;
      font-size: 26 / @base;
      font-weight: bold;
      color: #838383;
    }
  }
}
</style>