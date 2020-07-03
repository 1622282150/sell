<template>
  <div class="container">
    <Return class="header">
      {{name}}
      <div class="right">
        <!-- <span class="quan"></span> -->
        <!-- <span class="search"><div class="circle">12</div></span> -->
        <i class="iconfont icon-sousuo"></i>
      </div>
    </Return>
    <div class="title_box">
      <div class="title_left">
        <!-- <scroller lock-y :scrollbar-x="false"> -->
        <div class="box1">
          <div
            class="box1-item"
            v-for="(i,index) in titletop_list"
            :key="index"
            @click="sel(i.Id,index)"
            :class="active_title_index === index?'active_item':''"
          >{{i.Name}}</div>
        </div>
        <!-- </scroller> -->
      </div>
      <div class="title_right">
        <div class="shadow">
          <div class="title_right_ball">分类</div>
        </div>
      </div>
    </div>

    <!-- 筛选框 -->
    <div class="nav clearfix">
      <div class="left fl">
        <span ref="tuijian" style="color:#B899EA" @click="tuijian">推荐</span>
        <span ref="renqi" @click="renqi">人气</span>
        <span @click="jiage" style="position:relative">
          价格
          <!-- 两个黑 -->
          <i
            v-show="isa===false"
            style="position:absolute;right:30%;top:38%;color:#A0A0A0;"
            class="iconfont icon-xiangshang2"
          ></i>
          <i
            v-show="isa===false"
            style="position:absolute;right:30%;top:50%;color:#A0A0A0;"
            class="iconfont icon-xiangxia2"
          ></i>
          <!-- 上紫下黑 -->
          <i
            v-show="issheng===true && isa===true"
            style="position:absolute;right:30%;top:38%;color:#B899EA"
            class="iconfont icon-xiangshang2"
          ></i>
          <i
            v-show="issheng===true && isa===true"
            style="position:absolute;right:30%;top:50%;color:#A0A0A0;"
            class="iconfont icon-xiangxia2"
          ></i>
          <!-- 上黑下紫 -->

          <i
            v-show="issheng===false && isa===true"
            style="position:absolute;right:30%;top:38%;color:#A0A0A0;"
            class="iconfont icon-xiangshang2"
          ></i>
          <i
            v-show="issheng===false && isa===true"
            style="position:absolute;right:30%;top:50%;color:#B899EA"
            class="iconfont icon-xiangxia2"
          ></i>
        </span>
      </div>
      <div class="right fr">
        <span v-if="vertical" @click="vertical=!vertical" class="pic">&nbsp;</span>
        <span v-else @click="vertical=!vertical" class="pic2">&nbsp;</span>
        <span @click="shaixuan" class="sxuan">筛选</span>
      </div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-if="vertical==true" class="product">
        <div
          @click="tochanpin(item.CommodityId)"
          class="inner clearfix"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="left fl">
            <img :src="item.BannerImg" alt />
            <!-- <img v-else src="../../assets/images/product_meirong.jpg" alt /> -->
          </div>
          <div class="right fr">
            <div class="wenzi">
              <!-- <span>韩后 &nbsp;</span> -->
              {{item.Name}}
              <!-- 的哈师大快速导航卡仕达卡仕达哈啊实打水水水水实 -->
            </div>
            <!-- <div class="clean">{{item.Description}}</div> -->

            <div style="margin-top:9px" class="price">
              <!-- <span class="after"></span> -->
              <span class="icon">¥</span>
              <span class="num">{{item.Price}}</span>
            </div>
            <!-- <div class="oldprice">
            <span>原价</span>
            <span class="del">¥120</span>
            <span>6折</span>
            </div>-->
            <span class="num2">
              <i class="iconfont icon-hot"></i>
              {{item.Popularity}}
              <span>进入详情 ></span>
            </span>
            <div class="post">{{item.SellerName}}</div>
            <!-- <div class="car"></div> -->
          </div>
        </div>
      </div>
      <!-- 横排显示 -->
      <div v-else class="shangpin_ul">
        <li v-for="(item, index) in list" :key="index" @click="tochanpin(item.CommodityId)">
          <img v-if="item.BannerImg" :src="item.BannerImg" alt />
          <img v-else src="../../assets/images/list.jpg" alt />
          <div class="bottom">
            <!-- <p>盛大收购大红色的乖哈岁的干啥</p> -->
            <p>{{item.Name}}</p>
            <!-- <p>的撒韩国的</p> -->
            <!-- <div class="des">{{item.Description|renMenLength}}</div> -->
            <div class="price clearfix">
              <span class="qian fl">
                <span class="ren">¥</span>
                {{item.Price}}
              </span>
              <span class="num fr">
                <i class="iconfont icon-hot"></i>
                {{item.Popularity}}
              </span>
            </div>
            <!-- <div class="baoyou">包邮</div> -->
          </div>
        </li>
      </div>
    </van-list>

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
          >{{item.Name}}</div>
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
            {{item.Name}}
          </div>
        </div>
        <!-- 价格 -->
        <div class="shaixuan_title">价格</div>
        <div class="shaixuan_price">
          <input type="text" placeholder="最低价"  v-model="MinPrice"/>
          <div>
            <span></span>
          </div>
          <input type="text" placeholder="最高价" v-model="MaxPrice"/>
        </div>
        <div  @click="type_btn" class="shaixuan_bottom">确定</div>
      </div>
    </van-popup>
  </div>
</template>


<script src="./Product.js">
</script>
<style scoped lang='less' src="./Product.less">
</style>
