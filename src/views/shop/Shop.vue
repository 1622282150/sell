<template>

  <div class="contain">
    <!-- 弹出层分享 -->
    <van-action-sheet v-model="showfen">
      <div class="towechat">
        <div class="towechat_title">分享到</div>
        <div class="towechat_box">
          <div @click="towechat" class="towechat_item">
            <img src="../../assets/images/fenxiang_wechat.png" alt />
            <p>微信</p>
          </div>
          <div @click="tofriend" class="towechat_item">
            <img src="../../assets/images/fenxiang_pengyouquan.png" alt />
            <p>朋友圈</p>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 头部 -->
     <!-- 顶部返回分享容器 -->
    <div id="top_f" class="top_fixed">
      <div id="top_l" class="top_left">
        <i @click="back" id="top_li" class="iconfont icon-zuojiantou"></i>
      </div>
      <div id="top_r" @click="showfen = true" class="top_right">
        <i id="top_ri" class="iconfont icon-fenxiang2"></i>
      </div>
    </div>
    <div class="head">
      <!-- <Head :show="true" color="#fff" :star="true"></Head> -->
      <img :src="SellerDetail.BannerImg" alt="">
    </div>

    <div class="postion">
      <div v-if="SellerDetail.AttentionSellerFlag === 0" class="guanzhu" @click="AttentionSellerAdd">关注</div>
      <div v-else class="yiguanzhu" @click="del_AttentionSellerAdd">已关注</div>
      <h3>{{SellerDetail.Name}}</h3>
      <!-- <h3>时代USDhi爱是滴啊上覅反反复复付反反复复付付</h3> -->
      <div class="rate">
        <van-rate allow-half v-model="SellerDetail.ShopScore" readonly color="#b695e9" void-color="#eee" />
        <span>{{SellerDetail.ShopScore}}分</span>
      </div>
    </div>

    <div class="time">
      <div>营业时间</div>
      <p>{{SellerDetail.ShopHours}}</p>
    </div>
    <div class="area clearfix">
      <div class="left">
        <i></i>
        {{SellerDetail.Address}}
        <!-- <p>距地铁4号线新钱塘站A1口370m</p> -->
      </div>
      <div class="right">
        <img src="../../assets/images/shop_dianhua.png" alt />
      </div>
    </div>

     <div class="recoment">
      <div class="inner" v-for="(item,index) in CommodityProjectInfoListById" :key='index'>
        <div class="left clearfix">
          <img :src="item.BannerImg" alt class="fl" />
          <div class="clean">
            <p class="deep">{{item.Name}}</p>
            <div class="second">
              <span>45分钟 | 气泡</span>
              <span class="yishou">已售90笔</span>
            </div>
            <div class="price">
              <span class="now">¥ {{item.Price}}</span>
              <span class="ago">¥{{item.OriginalPrice}}</span>
            </div>
            <p></p>
          </div>
        </div>
      </div>
      <!-- <div class="inner">
        <div class="left clearfix">
          <img src="../../assets/images/shop_qingjie.jpg" alt class="fl" />
          <div class="clean">
            <p class="deep">深层清洁</p>
            <div class="second">
              <span>45分钟 | 气泡</span>
              <span class="yishou">已售90笔</span>
            </div>
            <div class="price">
              <span class="now">¥ 100</span>
              <span class="ago">¥ 200</span>
            </div>
            <p></p>
          </div>
        </div>
      </div> -->
    </div>

    <div class="comment">
      <div class="top">
        <div class="bd">
          <div class="user">
            <div class="aaa">用户评价&nbsp;&nbsp;( 25 条 )</div>
            <a href>></a>
          </div>
          <div class="zonghe">
            <div class="left">
              <span class="zh">综合评分</span>
              <span class="num">4.5</span>
              <div class="star">
                <van-rate allow-half v-model="seller_value" readonly color="#b695e9" void-color="#eee" />
              </div>
            </div>
            <div class="right">
              <p>高于50%同行</p>
              <p>好评率80%</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="bg">
          <div class="face">
            <img src="../../assets/images/shop_banner.jpg" alt />
            <div class="peo">
              <div class="keai">
                <span>小可爱</span>
                <span class="date">7月18号</span>
              </div>
              <div class="cstar">
                <span class="rate">评分</span>
                <div class="count">
                  <van-rate allow-half v-model="value" readonly color="#b695e9" void-color="#eee" />
                </div>
                <span class="num">4.5</span>
              </div>
            </div>
          </div>
          <div class="com">
            <a href="#">
              感觉不错, 如获新生, 美丽无比, 光滑无比, 还会再来, 哈哈哈哈哈哈...
            
              <span></span>
            </a>
          </div>
          <div class="all">
            <a href="#">全文</a>
          </div>
          <div class="pics">
            <img src="../../assets/images/shop_beibu.jpg" alt />
            <img src="../../assets/images/shop_beibu.jpg" alt />
            <img src="../../assets/images/shop_beibu.jpg" alt />
          </div>
        </div>
      </div>
      <!-- <div class="content">
        <div class="bg">
          <div class="face">
            <img src="../../assets/images/shop_banner.jpg" alt />
            <div class="peo">
              <div class="keai">
                <span>小可爱</span>
                <span class="date">7月18号</span>
              </div>
              <div class="cstar">
                <span class="rate">评分</span>
                <div class="count">
                  <van-rate allow-half v-model="value" readonly color="#b695e9" void-color="#eee" />
                </div>
                <span class="num">4.5</span>
              </div>
            </div>
          </div>
          <div class="com">
            <a href="#">
              感觉不错, 如获新生, 美丽无比, 光滑无比, 还会再来, 哈哈哈哈哈哈...
              <span></span>
            </a>
          </div>
          <div class="all">
            <a href="#">全文</a>
          </div>
          <div class="pics">
            <img src="../../assets/images/shop_beibu.jpg" alt />
            <img src="../../assets/images/shop_beibu.jpg" alt />
            <img src="../../assets/images/shop_beibu.jpg" alt />
          </div>
        </div>
      </div> -->
    </div> 
<!-- 
    <div class="more">
      <div class="link">
        <a href="#">查看所有用户评价 >></a>
      </div>
    </div> -->
    <!-- list -->
  </div>
</template>
<script src="./Shop.js">
</script>
<style lang="less" scoped src="./Shop.less">
</style>


