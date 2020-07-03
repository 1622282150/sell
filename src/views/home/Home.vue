<template>
  <div class="layout">
    <!-- <div class="luyou" @click="$router.push('/lulu')">路由</div> -->
    <!-- 头部 -->
    <div class="header clearfix">
      <div class="inner">
        <header>
          <div class="left">杭州市</div>
          <section @click="$router.push('/search_zonghe')"><Search></Search></section>
          <div class="right"></div>
        </header>
        <div class="test clearfix">
          <div class="left fl">
            <div class="pic">
              <img src="../../assets/images/home_renwu.png" alt />
            </div>
            <div class="a">白皙</div>
            <div class="b">干性</div>
            <div class="c">痘痘</div>
          </div>
          <div class="right fr">
            <p class="score">评分: 77分</p>
            <p class="age">肤龄: 30岁</p>
            <div class="content">皮肤整体状态还是不错的, 需要关注一下皮肤细节加以呵护, 才能成为更精致的女孩哦。</div>
          </div>
        </div>
        <div class="btn">
          <button class="left">重新检测</button>
          <button class="right" @click="$router.push('/recode')">肤质报告</button>
        </div>
      </div>
    </div>

    <div class="nav">
      <div class="bd">
        <ul>
          <li v-for="(item, index) in imgs" :key="index">
            <router-link tag="a" :to="item.url">
              <img :src="item.src" alt />
              <p>{{item.text}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- lunbo -->
    <div class="swiper">
      <swiper v-if="lunboimg.length" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide  v-for="(item,index) in lunboimg" :key="index">
          <img :src="item.Icon" alt />
        </swiper-slide>
        <!-- <swiper-slide>
          <img src="../../assets/images/gonglv_99.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="../../assets/images/gonglv_99.jpg" alt />
        </swiper-slide>-->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="main">
      <div class="head clearfix">
        <a href="#" class="jingx fl">精选</a>
        <router-link to="/home_more" class="more fr">更多</router-link>
      </div>

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in jingimg" :key="index">
          <div class="item">
            <img @click="towen(item.ArticleId)" :src="item.ArticleImg" alt />
            <div class="mei" @click="towen(item.ArticleId)">
              <p class="top">{{item.ArticleTitle}}</p>
              <p class="bottom" v-show="item.Description">{{item.Description}}</p>
            </div>
            <div class="face">
              <div class="pic clearfix">
                <div class="left fl">
                  <img v-if="item.UserAvatar"  :src="item.UserAvatar" alt />
                  <img v-else src="../../assets/images/article_touxiang.jpg" alt />
                  <span v-if="item.UserName"></span>
                  <span v-else>小糊涂</span>
                </div>
                <div class="right fr">
                  <img src="../../assets/images/article_shou.png" alt class="good" />
                  {{item.ClickCount}}
                  <img
                    src="../../assets/images/article_xiaoxi.png"
                    class="mess"
                    alt
                  /> &nbsp;200
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 底部导航栏 -->
    <Tabbar></Tabbar>
  </div>
</template>

<script src="./Home.js">
</script>

<style scoped lang="less" src="./Home.less">
</style>
