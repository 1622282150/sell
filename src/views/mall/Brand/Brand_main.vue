<template>
  <div>
    <div class="top">
      <header>
        <i
          style="position:absolute;top:3.5%;left:5px;font-size:30px;color:white"
          class="iconfont icon-zuojiantou"
        ></i>
        <input type="text" placeholder="大家都在搜~" />
        <i
          style="position:absolute;top:3.5%;left:14%;font-size:28px;color:#767676"
          class="iconfont icon-sousuo"
        ></i>
        <img src="../../../assets/images/mall_youhuiquan.png" alt />
      </header>
    </div>
    <!-- banner图 -->
    <img class="banner" src="../../../assets/images/brand_banner.png" alt />
    <!-- 人气推荐 -->
    <div class="tuijian_title">
      人气推荐
      <span>更多品牌>></span>
    </div>
    <div class="tuijian_box">
      <img v-for="(item,index) in imglist" :key="index" :src="item.img" alt />
    </div>
    <div class="bu"></div>

    <!-- 下拉菜单 -->
    <div class="menu">
      <span></span>
      <div class="menu_left">人气</div>
      <div class="menu_right">
        <van-dropdown-menu active-color='#B694EA' >
          <van-dropdown-item  ref="item" title="全球">
            <div class="menu_address" v-for="(item,index) in address" :key="index" @click="sel_add(index)">{{item.add}}</div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>

    <!-- 产品 -->
    <div class="product">
      <div class="product_item" v-for="(item,index) in 7" :key="index">
        <div class="product_item_left">
          <img src="../../../assets/images/brand_logo1.png" alt="">
          <div class="product_name">爱楼喂</div>
          <div class="product_name">Locuis vuit</div>
        </div>
        <div class="product_item_right">
          <div class="product_item_right_flag">中国品牌</div>
          <div class="product_item_right_hot">人气指数:30000</div>
          <div class="product_item_right_des">自1845年以来,代相传至今的路以卓越的品质,接触的精湛工艺成为时尚旅行艺术的象征</div>
          <div class="product_item_right_chanpin">产品:小米九,品牌机器人,巴拉..</div>
          <span class="jinru">进入店铺></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from "vant";
import { Search } from "vant";
export default {
  data() {
    return {
      address:[
        {add:'中国'},
         {add:'日本'},
          {add:'韩国'},
           {add:'斯坦'},
            {add:'哈萨克'},
             {add:'哈萨'},
              {add:'哈坦'},


      ],
      imglist: [
        { img: require("../../../assets/images/brand_logo1.png") },
        { img: require("../../../assets/images/brand_logo2.png") },
        { img: require("../../../assets/images/brand_logo3.png") },
        { img: require("../../../assets/images/brand_logo4.png") },
        { img: require("../../../assets/images/brand_logo5.png") },
        { img: require("../../../assets/images/brand_logo6.png") },
        { img: require("../../../assets/images/brand_logo7.png") },
        { img: require("../../../assets/images/brand_logo8.png") }
      ],
    };
  },
  methods:{
    sel_add(index){
      console.log(index)
      this.$refs.item.toggle();

    }
  }
};
</script>
<style src="./Brand_main.less" scoped lang='less'>
</style>