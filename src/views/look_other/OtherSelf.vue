<template>
  <div>
    <div class="top_self">
      <i
        @click="hei"
        style="position:absolute;right:20px;top:8px;font-size:28px;z-index:1500"
        class="iconfont icon-gengduo"
      ></i>
      <!-- <Return>个人资料</Return> -->
      <header class="head">
        <i @click="goback" class="iconfont icon-zuojiantou jiantou"></i>
      </header>
      <!-- t头像部分 -->
      <div class="top_self_tou">
        <div class="top_self_tou_left">
          <img v-show="selfinfo.PointsLevel === 1" @click="$router.push('/task_center')" src="../../assets/images/vip_vv1.png" alt />
          <img v-show="selfinfo.PointsLevel === 2" @click="$router.push('/task_center')" src="../../assets/images/vip_vv2.png" alt />
          <img v-show="selfinfo.PointsLevel === 3" @click="$router.push('/task_center')" src="../../assets/images/vip_vv3.png" alt />
          <img v-show="selfinfo.PointsLevel === 4" @click="$router.push('/task_center')" src="../../assets/images/vip_vv4.png" alt />
          <img v-show="selfinfo.PointsLevel === 5" @click="$router.push('/task_center')" src="../../assets/images/vip_vv5.png" alt />
          <img v-show="selfinfo.PointsLevel === 6" @click="$router.push('/task_center')" src="../../assets/images/vip_vv6.png" alt />
          <img v-show="selfinfo.PointsLevel === 7" @click="$router.push('/task_center')" src="../../assets/images/vip_vv7.png" alt />
        </div>
        <div class="top_self_tou_middle">
          <img v-if="!selfinfo.UserPhoto" src="../../assets/images/phone.png" alt />
          <img v-else :src="selfinfo.UserPhoto" alt />
        </div>
        <div class="top_self_tou_right">
          <div
            v-show="selfinfo.AttentionFlag==0"
            @click="guanzhu"
            class="top_self_tou_right_guanzhu"
          >关注</div>
          <div
            v-show="selfinfo.AttentionFlag==1"
            @click="del_guanzhu"
            class="top_self_tou_right_yiguanzhu"
          >已关注</div>
        </div>
      </div>
      <!-- 账号名字部分 -->
      <div class="top_self_middle">
        <p class="top_self_middle1">魅号:{{selfinfo.UserAccount}}</p>
        <p class="top_self_middle2">{{selfinfo.Username}}</p>
        <p class="top_self_middle3">{{selfinfo.PersonalitySignature|renMenLength}}</p>
      </div>
      <!-- 关注粉丝获赞 -->
      <div class="top_self_bottom">
        <div class="top_self_bottom_left" @click="his_guan">
          <div class="top_self_bottom_top">关注</div>
          <div class="top_self_bottom_bottom">{{selfinfo.AttentionCount}}</div>
        </div>
        <div class="top_self_bottom_middle">
          <div class="xian1"></div>
          <div class="xian2"></div>
          <div class="top_self_bottom_top" @click="his_fans">粉丝</div>
          <div class="top_self_bottom_bottom">{{selfinfo.FansCount}}</div>
        </div>
        <div class="top_self_bottom_right">
          <div class="top_self_bottom_top">获赞</div>
          <div class="top_self_bottom_bottom">{{selfinfo.LikedCount}}</div>
        </div>
      </div>
    </div>

    <!-- 发布收藏橱窗选项卡 -->
    <van-tabs
      v-model="active"
      @disabled="onClickDisabled"
      title-active-color="#B896EA"
      color="#B896EA"
      line-width="33.3%"
    >
      <van-tab title="发布">
        <div class="fabu_title">
          <div
            v-for="(item,index) in toplist"
            :key="index"
            class="title_ball"
            :class="activeindex===index?'active_ball':''"
            @click="xuanze(index)"
          >{{item.title}}</div>
        </div>
        <div v-if="activeindex==0" class="guanzhu">
          <!-- <van-list
            v-model="tieziloading"
            :finished="tiezifinished"
            finished-text="没有更多了"
            @load="tiezionLoad"
          >-->
          <div class="tuijian">
            <!-- <van-list v-model="loading" :finished="finished" finished-text @load="onLoad"> -->
            <!-- 新瀑布流 -->
            <div class="container-water-fall">
              <!-- <div @click="loadmore">加载更多</div> -->

              <waterfall :col="2" :data="tiezilist" @loadmore="loadmore">
                <template>
                  <div class="lii" v-for="(item,index) in tiezilist" :key="index">
                    <div class="pic">
                      <img
                        v-show="item.Type == 'VideoArticle'"
                        class="img_video"
                        src="../../assets/images/community_video.png"
                        alt
                      />
                      <img
                        class="img"
                        v-if="item.ArticleImg"
                        @click="toarticle(item.Type,item.ArticleId,item.UserId)"
                        :lazy-src="item.ArticleImg"
                        alt
                      />
                      <img
                        class="img"
                        v-else
                        @click="toarticle(item.Type,item.ArticleId,item.UserId)"
                        src="../../assets/images/community_listbg.jpg"
                        alt
                      />
                    </div>
                    <div class="bottom">
                      <p @click="toarticle(item.Type,item.ArticleId,item.UserId)">{{item.ArticleTitle}}</p>
                      <div class="avtart">
                        <div class="divv">
                          <img
                            class="avimg"
                           
                            v-if="item.UserAvatar"
                            :src="item.UserAvatar"
                            alt
                          />
                          <img
                            class="avimg"
                         
                            v-else
                            src="../../assets/images/community_listbg.jpg"
                            alt
                          />
                          <span >{{item.UserName|communityname}}</span>
                        </div>
                        <div
                          @click="zanone(item.ArticleId,index)"
                          class="zan"
                          v-if="item.IsLiked===0"
                        >
                          <img src="../../assets/images/community_dianzan.png" alt />
                          <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                          <span>
                            <!-- 100.5w -->
                            <!-- <i class="iconfont icon-thumbup"></i> -->
                            {{item.LikedCount}}
                          </span>
                        </div>
                        <div @click="nozanone(item.ArticleId,index)" class="zan" v-else>
                          <img src="../../assets/images/community_yizan.png" alt />
                          <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                          <span>
                            <!-- 100.5w -->
                            <!-- <i class="iconfont icon-thumbup"></i> -->
                            {{item.LikedCount}}
                          </span>
                        </div>
                      </div>
                      <div v-show="item.AttentionFlag" class="isyi">
                        <img src="../../assets/images/community_yiguanzhu.png" alt />
                        <div>已关注</div>
                      </div>
                    </div>
                  </div>
                </template>
              </waterfall>
              <!-- 在加载中AA -->
            </div>
            <!-- </van-list> -->
          </div>
          <!-- </van-list> -->
        </div>
        <!-- 话题 -->
        <div v-else class="huati">
          <div class="item">
            <ul>
              <!-- <van-list
                v-model="huatiloading"
                :finished="huatifinished"
                finished-text="没有更多了"
                @load="huationLoad"
              >-->
              <li
                class="clearfix"
                v-for="(item,index) in huatilist"
                :key="index"
                @click="tohua(item.ArticleId)"
              >
                <div class="pic fl">
                  <img :src="item.ArticleImg" alt />
                </div>
                <div class="des">
                  <div class="title">
                    <span>#</span>
                    {{item.ArticleTitle}}
                  </div>
                  <p>{{item.Rcount}}</p>
                  <span class="talk">200参与讨论</span>
                </div>
              </li>
              <!-- </van-list> -->
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="收藏">
        <div class="shoucang_title">
          <div
            v-for="(item,index) in shoucangtop"
            :key="index"
            class="title_ball"
            :class="shoucang_activeindex===index?'active_ball':''"
            @click="shoucang_xuanze(index)"
          >{{item.title}}</div>
        </div>

        <!-- 收藏文章 -->
        <div class="main" v-if="shoucang_activeindex==0">
          <!-- <div class="head clearfix">
              <a href="#" class="jingx fl">精选</a>
              <a href="#" class="more fr">更多</a>
          </div>-->

          <van-list
            v-model="wen_loading"
            :finished="wen_finished"
            finished-text="没有更多了"
            @load="wen_onLoad"
          >
            <div v-for="(item,index) in wen_jingimg" :key="index">
              <div class="item">
                <img class="img" @click="towen(item.ArticleId)" :src="item.ArticleImage" alt />
                <div class="mei" @click="towen(item.ArticleId)">
                  <p class="top">{{item.Title}}</p>
                  <!-- <p class="bottom">夏天， &nbsp; 就是要白 ！白 ！白 ！</p> -->
                </div>
                <div class="face">
                  <div class="pic clearfix">
                    <div class="left fl">
                      <img v-if="item.UserAvatar" :src="item.UserAvatar" alt />
                      <img v-else src="../../assets/images/article_touxiang.jpg" alt />
                      小糊涂
                    </div>
                    <div class="right fr">
                      <img src="../../assets/images/article_shou.png" alt class="good" />
                      {{item.LikedCount}}
                      <img
                        src="../../assets/images/article_xiaoxi.png"
                        class="mess"
                        alt
                      />{{item.Rcount}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </div>

        <!-- 收藏帖子 -->
        <div class="guanzhu" v-else-if="shoucang_activeindex==1">
          <!-- <van-list
            v-model="shoutie_loading"
            :finished="shoutie_finished"
            finished-text="没有更多了"
            @load="shoutie_onLoad"
          >-->
          <div class="tuijian">
            <!-- <van-list v-model="loading" :finished="finished" finished-text @load="onLoad"> -->
            <div class="container-water-fall">
              <!-- <div @click="loadmore">加载更多</div> -->

              <waterfall :col="2" :data="data" @loadmore="loadmore2">
                <template>
                  <div class="lii" v-for="(item,index) in data" :key="index">
                    <div class="pic">
                      <img
                        v-show="item.Type == 'VideoArticle'"
                        class="img_video"
                        src="../../assets/images/community_video.png"
                        alt
                      />
                      <img
                        class="img"
                        v-if="item.ArticleImage"
                        @click="toarticle(item.Type,item.ArticleId,item.UserId)"
                        :lazy-src="item.ArticleImage"
                        alt
                      />
                      <img
                        class="img"
                        v-else
                        @click="toarticle(item.Type,item.ArticleId,item.UserId)"
                        src="../../assets/images/community_listbg.jpg"
                        alt
                      />
                    </div>
                    <div class="bottom">
                      <p @click="toarticle(item.Type,item.ArticleId,item.UserId)">{{item.Title}}</p>
                      <div class="avtart">
                        <div class="divv">
                          <img
                            class="avimg"
                           
                            v-if="item.UserAvatar"
                            :src="item.UserAvatar"
                            alt
                          />
                          <img
                            class="avimg"
                         
                            v-else
                            src="../../assets/images/community_listbg.jpg"
                            alt
                          />
                          <span >{{item.UserName|communityname}}</span>
                        </div>
                        <div
                          @click="zanone2(item.ArticleId,index)"
                          class="zan"
                          v-if="item.IsLiked===0"
                        >
                          <img src="../../assets/images/community_dianzan.png" alt />
                          <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                          <span>
                            <!-- 100.5w -->
                            <!-- <i class="iconfont icon-thumbup"></i> -->
                            {{item.LikedCount}}
                          </span>
                        </div>
                        <div @click="nozanone2(item.ArticleId,index)" class="zan" v-else>
                          <img src="../../assets/images/community_yizan.png" alt />
                          <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                          <span>
                            <!-- 100.5w -->
                            <!-- <i class="iconfont icon-thumbup"></i> -->
                            {{item.LikedCount}}
                          </span>
                        </div>
                      </div>
                      <div v-show="item.AttentionFlag" class="isyi">
                        <img src="../../assets/images/community_yiguanzhu.png" alt />
                        <div>已关注</div>
                      </div>
                    </div>
                  </div>
                </template>
              </waterfall>
              <!-- 在加载中AA -->
            </div>
            <!-- </van-list> -->
          </div>
          <!-- </van-list> -->
        </div>

        <!-- 收藏话题 -->
        <div class="shouhua_huati" v-else-if="shoucang_activeindex==2">
          <div class="item">
            <ul>
              <van-list
                v-model="shouhua_loading"
                :finished="shouhua_finished"
                finished-text="没有更多了"
                @load="shouhua_onLoad"
              >
                <li  @click="tohua(item.ArticleId)" class="clearfix" v-for="(item,index) in shouhua_list" :key="index">
                  <div class="pic fl">
                    <img :src="item.ArticleImage" alt />
                  </div>
                  <div class="des">
                    <div class="title">
                      <span>#</span>
                      {{item.Title}}
                    </div>
                    <!-- <p>{{item.Bewrite}}</p> -->
                    <span class="talk">200参与讨论</span>
                  </div>
                </li>
              </van-list>
            </ul>
          </div>
        </div>

        <!-- 收藏好货 -->

        <div class="shangpin_ul" v-else-if="shoucang_activeindex==3">
          <div class="shangpin_li" v-for="(item,index) in shouhao_list" :key="index">
            <img :src="item.img" alt />
            <div class="shangpin_bottom">
              <div class="shangpin_title">{{item.title}}</div>
              <div class="shangpin_flag">{{item.flag}}</div>
              <div class="shangpin_price">
                <span class="shangpin_price_daola">¥</span>
                <span class="shangpin_price_money">{{item.price}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 收藏项目 -->
        <div class="xiangmu_ul" v-else>
          <div class="xiangmu_li" v-for="(item,index) in xiangmu_list" :key="index">
            <img :src="item.img" alt />
            <div class="xiangmu_bottom">
              <div class="xiangmu_title">{{item.title}}</div>
              <div class="xiangmu_flag">{{item.flag}}</div>
              <div class="xiangmu_price">
                <span class="xiangmu_price_daola">¥</span>
                <span class="xiangmu_price_money">{{item.price}}</span>
              </div>
              <div class="xiangmu_shop">
                {{item.shop}}
                <span>详情 ></span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :disabled='!this.selfinfo.ShopWindowFlag' title="商品橱窗">
        <div class="window">
          <ul>
            <li @click="tomalldetail(item.CommodityId)" v-for="(item,index) in chuchuang" :key="index">
             
                <div class="pic">
                  <img :src="item.BannerImg" alt />
                </div>
                <div class="des">
                  <p>{{item.Name}}</p>
                </div>
                <div class="price">
                 ¥{{item.Price}}
                </div>
             
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script src="./OtherSelf.js">
</script>
<style scoped lang='less' src='./OtherSelf.less'>
</style>