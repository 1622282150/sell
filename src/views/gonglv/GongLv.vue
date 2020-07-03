<template>
  <div class="gonlv">
    <div class="header">
      <!-- <Return  @click="$router.back(-1)" color="#fff"></Return> -->
      <i
        @click="goback"
        style="z-index:200;color:white;font-size:24px;position:absolute;top:12px;left:10px;"
        class="iconfont icon-zuojiantou"
      ></i>
      <div class="sousu" @click="tozong">
        <Searchm></Searchm>
      </div>
      <!-- <div class="pos">杭州市</div> -->
    </div>
    <div class="buwei"></div>
    <div class="swiper">
      <swiper :options="swiperOption" v-if="lunboimg.length>0" ref="mySwiper">
       <swiper-slide v-for="(item,index) in lunboimg" :key="index">
          <img :src="item.Icon" alt />
       </swiper-slide>
       <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <nav>
      <van-swipe :stop-propagation="false" :height="160" indicator-color="#b695e9">
        <van-swipe-item
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd()"
          v-for="(item, index) in swiperlist"
          :key="index"
        >
          <ul>
            <li @click="toproduct(i.Name,i.Id)" v-for="(i,index) in item" :key="index">
              <img :src="i.CategoryImg" alt />
              <!--  -->
              <span>{{i.Name}}</span>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </nav>

    <div class="banner" @click="nokai">
      <img src="../../assets/images/一元体验.png" alt />
    </div>

    <div class="youhui">
      <h3>本月特惠</h3>
      <div class="time">
        <span class="sell">
          <span>倒计时</span>
        </span>
        <span>
          <van-count-down :time="time" />
        </span>
      </div>

      <div class="product clearfix">
        <div class="left fl">
          <img src="../../assets/images/m2.jpg" alt />
          <div class="price">
            <span class="new">¥ 250</span>
            <span>原价 :</span>
            <span class="old">¥&nbsp;700</span>
          </div>
        </div>

        <div class="right fr">
          <img src="../../assets/images/m1.jpg" alt />
          <div class="price">
            <span class="new">¥ 250</span>
            <span>原价 :</span>
            <span class="old">¥&nbsp;700</span>
          </div>
        </div>
        <div class="right fr">
          <img src="../../assets/images/m3.jpg" alt />
          <div class="price">
            <span class="new">¥ 250</span>
            <span>原价 :</span>
            <span class="old">¥&nbsp;700</span>
          </div>
        </div>
      </div>
    </div>

    <div class="project">
      <div class="top">
        <span
          v-for="(item,index) in top_title"
          :key="index"
          :class="active_title===index?'active':''"
          @click="sel_title(index)"
        >{{item}}</span>
      </div>

      <div class="choose">
        <van-dropdown-menu active-color="#b695e9">
          <van-dropdown-item title="全城" ref="item">
            <div class="out">
              <div class="address1">
                <div
                  class="address1_item"
                  @click="sel_address1(index)"
                  :class="address1index===index?'address1_active':0"
                  v-for="(item,index) in list"
                  :key="index"
                >{{item.name}}</div>
              </div>
              <div class="address2">
                <div
                  v-show="address1index===0"
                  @click="sel_address2(index1)"
                  :class="address2index===index?'address2_active':0"
                  class="address2_item"
                  v-for="(item,index1) in distanc1"
                  :key="index1"
                >{{item}}</div>
                <div
                  v-show="address1index==1"
                  @click="sel_address2(index2)"
                  :class="address2index===index?'address2_active':0"
                  class="address2_item"
                  v-for="(item2,index2) in distance2"
                  :key="index2"
                >{{item2}}</div>
              </div>
            </div>
          </van-dropdown-item>

          <van-dropdown-item v-model="value" title="智能排序">
            <div class="paixu">
              <div class="paixu_item" v-for="(item,index) in option" :key="index">{{item.text}}</div>
            </div>
          </van-dropdown-item>

          <van-dropdown-item title="筛选" ref="item1">
            <div class="choice">
              <div class="choice_one">
                <div class="choice_oneleft">免预约</div>
                <div class="choice_oneright">
                  <van-switch size="27" v-model="checked" active-color="#cba8ff" />
                </div>
              </div>
              <div class="choice_two">
                <div class="choice_twoleft">活动</div>
                <div class="choice_tworight">
                  <div
                    @click="sel_tuante(index)"
                    :class="active_tuante===index?'choice_active':''"
                    class="choice_ball"
                    v-for="(item,index) in tuante"
                    :key="index"
                  >{{item}}</div>
                </div>
              </div>
              <div class="choice_three">
                <div class="choice_threetitle">类别</div>
                <div class="choice_threebox">
                  <div
                    class="choice_threebox_item"
                    v-for="(item,index) in leibie_type"
                    :key="index"
                  >{{item}}</div>
                </div>
              </div>
              <div class="choice_three">
                <div class="choice_threetitle">功效</div>
                <div class="choice_threebox">
                  <div
                    class="choice_threebox_item"
                    v-for="(item,index) in gongxiao_type"
                    :key="index"
                  >{{item}}</div>
                </div>
              </div>
              <div class="jiage">
                <div class="jiage_left">价格区间</div>
                <div class="jiage_right">
                  <div class="jiage_line"></div>
                  <!-- <div class="jiage_ballleft"></div>
                  <div class="jiage_ballright"></div>-->
                  <input class="jiage_ballleft" type="text" placeholder="最低价" />
                  <input class="jiage_ballright" type="text" placeholder="最高价" />
                </div>
              </div>
              <div class="shaixuan_bottom">
                <div class="shaixuan_bottom_left">重置</div>
                <div class="shaixuan_bottom_right">确定</div>
              </div>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <!-- f附近机构 -->
      <div v-if="isfu">
        <van-list
          v-model="fujin_loading"
          :finished="fujin_finished"
          finished-text="没有更多了"
          @load="fujin_onLoad"
        >
          <div v-for="(item,index) in SellerPageList" :key="index" class="projectitem">
            <div class="yiyuan" @click="toSellerdetail(item.Id)">
              <div class="yiyuan_name">{{item.Name}}</div>
              <div class="yiyuan_rate">
                <van-rate
                  allow-half
                  v-model="item.ShopScore"
                  readonly
                  color="#b695e9"
                  void-color="#eee"
                />
                <span style="margin-left:11px;padding-top:2px">{{item.ShopScore}}分</span>
                <span class="address">{{item.Address|titleLength}}</span>
              </div>
              <div class="yiyuan_renke">医疗执业认可</div>
            </div>
            <div
              class="xiangmu"
              @click="todetail(i.CommodityId)"
              v-for="(i,index) in item.CommodityInfoList"
              :key="index"
            >
              <img class="top1" :src="i.BannerImg" alt />
              <div class="top2">
                <p>{{i.Name}}</p>
                <!-- <div class="rate"> -->
                <!-- <van-rate allow-half v-model="item.ShopScore" readonly color="#b695e9" void-color="#eee" /> -->
                <!-- <span class="num">{{item.ShopScore}} 分</span> -->
                <!-- <div class="address">{{item.Address}}</div> -->
                <!-- </div> -->
                <div class="jieshao">
                  <span class="price">￥{{i.Price}}</span>
                  <span class="dian_price">原价：￥{{i.OriginalPrice}}</span>
                </div>
              </div>
            </div>

            <!-- <div class="bottom">
          <div class="pic">
            <img src="../../assets/images/gonglv_99.jpg" alt />
          </div>
          <div class="right">
            <p>美国 塑性 提拉 紧致, 全面部提升提拉除皱抗衰</p>
            <div class="price">
              <span class="new">¥ 138</span>
              <span class="old">门店价 : ¥ 138</span>
              <span class="shuliang">已售900</span>
            </div>
          </div>
            </div>-->
          </div>
        </van-list>
      </div>
      <!-- 热门项目 -->
      <div v-else class="product3">
        <div
          @click="todetail(item.CommodityId)"
          class="inner clearfix"
          v-for="(item, index) in chanlist1"
          :key="index"
        >
          <div class="left fl">
            <img  :src="item.BannerImg" alt />
            <!-- <img v-else src="../../assets/images/product_meirong.jpg" alt /> -->
          </div>
          <div class="right fr">
            <div class="wenzi">
              <!-- <span>韩后 &nbsp;</span> -->
              {{item.Name|shangTitle}}
              <!-- 的哈师大快速导航卡仕达卡仕达哈啊实打水水水水实 -->
            </div>
            <!-- <div class="clean">{{item.Description}}</div> -->

            <div style="margin-top:9px;" class="price">
              <!-- <span class="after"></span> -->
              <span class="icon" style="color:red">¥</span>
              <span class="num">{{item.Price}}</span>
              <span class="ispay">45人付款</span>
            </div>
            <!-- <div class="oldprice">
            <span>原价</span>
            <span class="del">¥120</span>
            <span>6折</span>
            </div>-->
            <span class="num2">
              杭州美容院
              <span>详情 ></span>
            </span>
            <div class="post">减50</div>
            <!-- <div class="car"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./GongLv.js">
</script>

<style scoped lang='less' src="./GongLv.less">
</style>