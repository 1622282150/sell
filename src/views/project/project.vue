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
      <scroller lock-y :scrollbar-x=false>
      <div class="box1">
        <div  class="box1-item" v-for="(i,index) in titletop_list" :key="index" @click="sel(index)" :class="active_title_index ===index?'active_item':''">{{i.title}}</div>
      </div>
    </scroller>
    </div>
    <div class="title_right">
      <div class="shadow">
        <div class="title_right_ball">分类</div>
      </div>
    </div>
    </div>
    
     


<!-- 筛选框 -->
 <div class="choose">
        <van-dropdown-menu active-color="#b695e9">
          <van-dropdown-item title="全城" ref="item">
            <div class="out">
              <div class="address1">
                <div
                  class="address1_item"
                   v-for="(item,index) in alist"
                  @click="sel_address1(index)"
                  :class="address1index===index?'address1_active':0"
                 
                  :key="index"
                >{{item.name}}</div>
              </div>
              <div class="address2">
                <div

                  v-show="address1index==0"
                   v-for="(item,index1) in distanc1"
                  @click="sel_address2(index1)"
                  :class="address2index===index?'address2_active':0"
                  class="address2_item"
                 
                  :key="index1"
                >{{item}}</div>
                <div
                v-for="(item2,index2) in distance2"
                  v-show="address1index==1"
                  @click="sel_address2(index2)"
                  :class="address2index===index?'address2_active':0"
                  class="address2_item"
                  
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
                   v-for="(item,index) in tuante"
                    @click="sel_tuante(index)"
                    :class="active_tuante===index?'choice_active':''"
                    class="choice_ball"
                   
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
    <!-- <div class="nav clearfix">
      <div class="left fl">
        <span ref="tuijian" style="color:#B899EA" @click="tuijian">推荐</span>
        <span ref="renqi" @click="renqi">人气</span>
        <span @click="jiage" style="position:relative">价格
        
           <i v-show="isa===false"  style="position:absolute;right:30%;top:38%;color:#A0A0A0;" class="iconfont icon-xiangshang2"></i>
           <i v-show="isa===false" style="position:absolute;right:30%;top:50%;color:#A0A0A0;" class="iconfont icon-xiangxia2"></i>
          
            <i v-show="issheng===true && isa===true" style="position:absolute;right:30%;top:38%;color:#B899EA" class="iconfont icon-xiangshang2"></i>
            <i v-show="issheng===true && isa===true" style="position:absolute;right:30%;top:50%;color:#A0A0A0;" class="iconfont icon-xiangxia2"></i>
         
           
           <i v-show="issheng===false && isa===true" style="position:absolute;right:30%;top:38%;color:#A0A0A0;" class="iconfont icon-xiangshang2"></i>
          <i v-show="issheng===false && isa===true" style="position:absolute;right:30%;top:50%;color:#B899EA" class="iconfont icon-xiangxia2"></i>
          
          </span>
        
      </div>
      <div class="right fr">
        <span v-if="vertical" @click="vertical=!vertical" class="pic">&nbsp;</span>
        <span v-else @click="vertical=!vertical" class="pic2">&nbsp;</span>
        <span @click="shaixuan" class="sxuan">筛选</span>
      </div>
    </div> -->
<!-- 竖排显示 -->
    <div  class="product">
      <div @click="tochanpin(item.CommodityId)"  class="inner clearfix" v-for="(item, index) in list" :key="index">
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

          <div style="margin-top:9px" class="price">
            <!-- <span class="after"></span> -->
            <span class="icon">¥</span>
            <span class="num">{{item.Price}}</span>
          </div>
          <!-- <div class="oldprice">
            <span>原价</span>
            <span class="del">¥120</span>
            <span>6折</span>
          </div> -->
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
 
   <!-- <div class="shopcar"><span class="circle"><span>12</span></span></div> -->
 
 <!-- 筛选框 -->
 <van-popup
  v-model="showpopup"
  position="right"
  :style="{ width: '80%',height:'100%' }"
>
 <div class="shaixuan">
   <!-- 品牌 -->
   <div class="shaixuan_top">筛选</div>
   <div class="shaixuan_title">品牌</div>
   <div v-if="ispinpai" class="shaixuan_pinpai">
     <div class="shaixuan_ball" v-for="(item,index) in brandlist" :key="index" @click="sel_brand(item)">{{item}}</div>
   </div>
   <div v-else @click="delete_pinpai" class="shaixuan_pinpai">
     <div class="shaixuan_pinpai_active">
       {{brand}}
       <div class="chahao">x </div>
       </div>
   </div>
   <!-- fuwu -->
   <div class="shaixuan_title">服务</div>
   <div class="shaixuan_pinpai">
     <div class="shaixuan_ball"  v-for="(item,index) in fuwulist" :key="index" @click="sel_fuwu(item,index)" :class="item.isSelected ?'shaixuan_pinpai_active' : '' "><div v-show="item.isSelected" class="chahao">x </div>{{item.name}}</div>
   </div>
   <!-- 价格 -->
   <div class="shaixuan_title">价格</div>
   <div class="shaixuan_price">
       <input type="text" placeholder="最低价">
       <div><span></span></div>
       <input type="text" placeholder="最高价">
   </div>
 </div>

</van-popup>
  </div>
</template>


<script src="./project.js">

</script>
<style scoped lang='less' src="./project.less">
</style>
