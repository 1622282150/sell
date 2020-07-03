<template>
  <div class="container bscroll" ref="bscroll">
    <!-- <img src="../../assets/images/gonglv_99.jpg" alt> -->
     <grade></grade>
    <div class="container_bscroll">
      

       <header ref="a1">
        <div class="header clearfix">
          <div class="right fl">
            <i @click="goback" style="font-size:30px" class="iconfont icon-zuojiantou"></i>
          </div>
          <div class="left fr">
            
            <span class="quan"></span>
            <span class="car" @click="tocar">
              <img src="../../assets/images/mall_gouwuche.png" alt />
              <span>购物车</span>
              <div class="num1" v-show="carnum != 0">{{carnum}}</div>
            </span>

            <span class="message">
              <img src="../../assets/images/mall_carcar.png" alt />
              <span>消息</span>
              
            </span>
          </div>
        </div>
        <div @click="tozong"><Search></Search></div>
        
      </header>
       
      <div  ref='a2' style="width:100%;height:101px;"></div> 
      <section style="display:none" ref="b1">
           <div class="header2 clearfix">
          <div class="right fl">
            <i @click="goback" style="font-size:30px" class="iconfont icon-zuojiantou"></i>
          </div>
          <div class="left fr">
           
            <span class="quan"></span>
            <span class="car" @click="$router.push('/shopping_car')">
              <img src="../../assets/images/mall_gouwuche.png" alt />
              <span>购物车</span>
              <div class="num1" v-show="carnum != 0">{{carnum}}</div>
            </span>

            <span class="message">
              <img src="../../assets/images/mall_carcar.png" alt />
              <span>消息</span>
             
            </span>
          </div>
           <div class="search2" @click="tozong"><Search></Search></div>
        </div>
     </section>
      <div  ref="b2" style="width:100%;height:50px;display:none"></div>
     
      <div class="swiper">
        <swiper :options="swiperOption" v-if="lunboimg.length>0"  ref="mySwiper">
          <!-- slides -->
        <swiper-slide v-for="(item,index) in lunboimg" :key="index">
          <img :src="item.Icon" alt />
        </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- <div style='width: 100%;height: 220px;'></div> -->

      <van-swipe :stop-propagation='false'  :height="180" indicator-color="#b695e9">
        <van-swipe-item  @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd" v-for="(item, index ) in swiperlist" :key="index">
          <nav>
            <ul>
             
                <li @click="tomall(i.Name,i.Id)"  v-for="(i,pindex) in item" :key="pindex">
                  <div >
                    <img  v-if="i.CategoryImg" :src="i.CategoryImg" alt />
                    <img
                      v-else
                      src="http://test1.merrychange.net/Content/Upload/Image/Image/20191106040959027.png"
                      alt
                    />
                    <p>{{i.Name}}</p>
                  </div>
                </li>
             
            </ul>
          </nav>
        </van-swipe-item>
      </van-swipe>
      <div class="tuijian">
        <ul>
          <li @click="nokai" v-for="(item, index) in img" :key="index">
            <img :src="item.src" />
          </li>
        </ul>
      </div>

      <div class="sell" @click="jifen">
        <img src="../../assets/images/mall_jifenduihuan.png" alt />
      </div>

      <div class="shopList">
        <h3>推荐</h3>
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
            
          </ul>
           </van-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Mall.js">
/*eslint-disable*/
</script>
<style scoped lang='less' src="./Mall.less">
</style>
