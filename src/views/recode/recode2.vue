<template>
  <div>
    <van-action-sheet v-model="showfen" title="请选择方式">
      <div class="towechat">
        <div @click="towechat" style="font-size:20px" class="fenkuai-son">
          <i
            class="iconfont icon-weixin"
            style="display:blcok;margin-top:10px;font-size:40px;height:60%;color:#03cf3c"
          ></i>
          <span style="display:block;font-size:11px;">微信</span>
        </div>
        <div @click="tofriend" style="font-size:20px" class="fenkuai-son">
          <i
            class="iconfont icon-pengyouquan"
            style="display:blcok;margin-top:10px;font-size:40px;height:60%;color:#03cf3c"
          ></i>
          <span style="display:block;font-size:11px;">朋友圈</span>
        </div>
      </div>
    </van-action-sheet>

    <div class="header">
      肤质报告
      <img @click="goback" class="img1" src="../../assets/images/newfan.png" alt />
      <!-- <img @click="showfen = true" class="img2" src="../../assets/images/recode2_fenxiang.png" alt /> -->
      <i @click="showfen = true" class="iconfont icon-fenxiang2"></i>
      <!-- <img class="img3" src="../../assets/images/recode2_jilu.png" alt /> -->
    </div>
    <div class="jicheng"></div>
    <!--头部分数 -->
    <div class="gradebox">
      <img :src="alllist.UserAvator" alt />
      <div class="gradebox_left">
        <p class="gradebox_left_top">{{alllist.UserName | communityname}}</p>
        <p class="gradebox_left_bottom">{{alllist.CreateDate |dateFmt('YYYY-MM-DD HH:mm')}}</p>
      </div>
      <div class="gradebox_middle">
        <p
          class="gradebox_middle_top"
          :class="alllist.SkinScore < 80?'gradebox_active_low':'gradebox_active_up'"
        >{{alllist.SkinScore}}</p>
        <p
          class="gradebox_middle_bottom"
          :class="alllist.SkinScore < 80?'gradebox_active_low':'gradebox_active_up'"
        >分数</p>
      </div>
      <div class="gradebox_right">
        <p class="gradebox_right_top">{{alllist.SkinAge}}</p>
        <p class="gradebox_right_bottm">肌龄</p>
      </div>
    </div>
    <!-- main主要部分 -->
    <div class="main">
      <div class="main_img"></div>
      <div class="taitouwen_line" v-show="alllist.SkinForeHeadWrinkle_Score !=0"></div>
      <div
        class="title_type3 ball taitouwen"
        v-show="alllist.SkinForeHeadWrinkle_Score !=0"
      >抬头纹{{alllist.SkinForeHeadWrinkle_Score}}</div>

      <div
        class="fuse_line"
        v-show="alllist.SkinColorLevel_Score != 0 || alllist.SkinColorHueDelta_Score !=0"
      ></div>
      <div
        class="ball fuse"
        :class="alllist.SkinColorLevel_Score + alllist.SkinColorHueDelta_Score <=-4?'title_type3':(alllist.SkinColorLevel_Score + alllist.SkinColorHueDelta_Score == -3?'title_type2':'title_type1')"
      >肤色{{alllist.SkinColorLevel_Score + alllist.SkinColorHueDelta_Score}}</div>

      <div class="xiwen_line" v-show="alllist.SkinEyeFineLine_Left_Score!=0"></div>
      <div
        class="title_type1 ball xiwen"
        v-show="alllist.SkinEyeFineLine_Left_Score!=0 || alllist.SkinEyeFineLine_Right_Score!=0"
      >细纹{{alllist.SkinEyeFineLine_Left_Score + alllist.SkinEyeFineLine_Right_Score}}</div>
      <div class="fuzhi_line" v-show="alllist.SkinType_Score != 0"></div>
      <div
        class="title_type3 ball fuzhi"
        v-show="alllist.SkinType_Score != 0"
      >肤质{{alllist.SkinType_Score}}</div>
      <div class="heitou_line" v-show="alllist.SkinBlackHeads_Score != 0"></div>
      <div
        :class="alllist.SkinBlackHeads_Score<=-5?'title_type3':(alllist.SkinBlackHeads_Score>=-2?'title_type1':'title_type2')"
        class="ball heitou"
        v-show="alllist.SkinBlackHeads_Score != 0"
      >黑头{{alllist.SkinBlackHeads_Score}}</div>
      <div class="maokong_line" v-show="alllist.PoresHave_Score != 0"></div>
      <div
        :class="alllist.PoresHave_Score == -1?'title_type1':(alllist.PoresHave_Score == -2?'title_type2':'title_type3')"
        class="ball maokong"
        v-show="alllist.PoresHave_Score != 0"
      >毛孔{{alllist.PoresHave_Score}}</div>
      <!-- 右侧 -->
      <div v-show="alllist.SkinPimple_Score != 0" class="doudou_line"></div>
      <div
        v-show="alllist.SkinPimple_Score != 0"
        :class="alllist.SkinPimple_Score<=-6?'title_type3':(alllist.SkinPimple_Score>=-2?'title_type1':'title_type2')"
        class="ball doudou"
      >痘痘{{alllist.SkinPimple_Score}}</div>
      <div class="zhi_line" v-show="alllist.SkinMole_Score!=0"></div>
      <div
        class="title_type1 ball zhi"
        v-show="alllist.SkinMole_Score!=0"
      >痣{{alllist.SkinMole_Score}}</div>
      <div
        class="yuweiwen_line"
        v-show="alllist.SkinCrowsFeed_Left_Score!=0 || alllist.SkinCrowsFeed_Right_Score != 0"
      ></div>
      <div
        class="title_type2 ball yuweiwen"
        v-show="alllist.SkinCrowsFeed_Left_Score!=0 || alllist.SkinCrowsFeed_Right_Score != 0"
      >鱼尾纹{{alllist.SkinCrowsFeed_Left_Score + alllist.SkinCrowsFeed_Right_Score}}</div>

      <div
        v-show="alllist.SkinEyeWrinkle_Left_Score != 0 || alllist.SkinEyeWrinkle_Right_Score !=0"
        class="yanwen_line"
      ></div>
      <div
        v-show="alllist.SkinEyeWrinkle_Left_Score != 0 || alllist.SkinEyeWrinkle_Right_Score !=0"
        class="title_type1 ball yanwen"
      >眼纹{{alllist.SkinEyeWrinkle_Left_Score+alllist.SkinEyeWrinkle_Right_Score}}</div>

      <div
        v-show="alllist.SkinNasolabialFolds_Left_Score !=0 || alllist.SkinNasolabialFolds_Right_Score !=0"
        class="falingwen_line"
      ></div>
      <div
        class="title_type2 ball falingwen"
        v-show="alllist.SkinNasolabialFolds_Left_Score !=0 || alllist.SkinNasolabialFolds_Right_Score !=0"
      >法令纹{{alllist.SkinNasolabialFolds_Left_Score + alllist.SkinNasolabialFolds_Right_Score}}</div>

      <div class="heiyanquan_line" v-show="alllist.SkinPandaEye_Score != 0"></div>
      <div
        class="ball heiyanquan"
        :class="alllist.SkinPandaEye_Score<=-13?'title_type3':(alllist.SkinPandaEye_Score>=-12 && alllist.SkinPandaEye_Score<=-7?'title_type2':'title_type1')"
        v-show="alllist.SkinPandaEye_Score != 0"
      >黑眼圈{{alllist.SkinPandaEye_Score}}</div>

      <div class="ban_line" v-show="alllist.SkinSpot_Score != 0"></div>
      <div
        class="ball ban"
        :class="alllist.SkinSpot_Score<=-6?'title_type3':(alllist.SkinSpot_Score>=-2?'title_type1':'title_type2')"
        v-show="alllist.SkinSpot_Score != 0"
      >斑{{alllist.SkinSpot_Score}}</div>

      <div class="douyin_line" v-show="alllist.SkinAcne_Score!=0"></div>
      <div
        :class="alllist.SkinAcne_Score<=-6?'title_type3':(alllist.SkinAcne_Score>=-2?'title_type1':'title_type2')"
        class="ball douyin"
        v-show="alllist.SkinAcne_Score!=0"
      >痘印{{alllist.SkinAcne_Score}}</div>

      <div class="meicuo_line" v-show="alllist.SkinRosacea_Score!=0"></div>
      <div
        :class="alllist.SkinRosacea_Score<=-7?'title_type3':(alllist.SkinRosacea_Score>=-3?'title_type1':'title_type2')"
        class="ball meicuo"
        v-show="alllist.SkinRosacea_Score!=0"
      >玫瑰痤疮{{alllist.SkinRosacea_Score}}</div>
    </div>
    <!--轮播图部分 -->
    <div class="lunbo">
      <swiper v-if="swiperList.length>0" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,index) in swiperList" :key="index">
          <div class="img" :style="{backgroundImage:'url(' + item.backimg + ')'}">
            <!-- <div class="imgb"></div> -->
            <!-- 肤色 -->
            <p class="img_des" v-show="item.name === '肤色' && item.SkinColorLevelEnum === 1">透白</p>
            <p v-show="item.name === '肤色' && item.SkinColorLevelEnum === 2" class="img_des">白皙</p>
            <p v-show="item.name === '肤色' && item.SkinColorLevelEnum === 3" class="img_des">自然</p>
            <p v-show="item.name === '肤色' && item.SkinColorLevelEnum === 4" class="img_des">小麦</p>
            <p v-show="item.name === '肤色' && item.SkinColorLevelEnum === 5" class="img_des">暗沉</p>
            <p v-show="item.name === '肤色' && item.SkinColorLevelEnum === 6" class="img_des">黝黑</p>
            <!-- 肤质 -->
            <p v-show="item.name === '肤质' && item.SkinTypeEnum === 0" class="img_des">油性</p>
            <p v-show="item.name === '肤质' && item.SkinTypeEnum === 1" class="img_des">干性</p>
            <p v-show="item.name === '肤质' && item.SkinTypeEnum === 2" class="img_des">中性</p>
            <p v-show="item.name === '肤质' && item.SkinTypeEnum === 3" class="img_des">混合性</p>
            <!-- 毛孔 -->
            <p class="img_des" v-show="item.name === '毛孔'">粗大</p>
            <!-- 黑头 -->
            <p class="img_des" v-show="item.name === '黑头'">
              {{item.SkinBlackEnum}}
              <span>个</span>
            </p>
            <!-- 皱纹 -->
            <p class="img_des" v-show="item.name === '皱纹'">
              {{item.SkinWrinkleEnum}}
              <span>种</span>
            </p>
            <!-- 黑眼圈 -->
            <div v-show="item.name === '黑眼圈'">
              <div v-if="alllist.SkinPandaEyeEnum === 1">
                <p
                  class="img_des"
                  v-show="alllist.SkinPandaEye_Left_PigmentEnum != 0 ||alllist.SkinPandaEye_Right_PigmentEnum != 0 "
                >色素型</p>
                <p
                  v-show="alllist.SkinPandaEye_Left_ArteryEnum !=0 ||alllist.SkinPandaEye_Right_ArteryEnum !=0"
                  class="img_des"
                >血管型</p>
                <p
                  v-show="alllist.SkinPandaEye_Left_ShadowEnum !=0 || alllist.SkinPandaEye_Right_ShadowEnum !=0"
                  class="img_des"
                >阴影型</p>
              </div>

              <p class="img_des" v-else>综合型</p>
            </div>

            <!-- 痘痘 -->
            <p class="img_des" v-show="item.name === '痘痘'">
              {{item.SkinPimpleEnum}}
              <span>个</span>
            </p>
            <!-- 痣 -->
            <p class="img_des" v-show="item.name === '痣'">
              {{item.SkinMoleEnum}}
              <span>个</span>
            </p>
            <!-- 痘印 -->
            <p class="img_des" v-show="item.name === '痘印'">
              {{item.SkinAcneEnum}}
              <span>个</span>
            </p>
            <!-- 斑 -->
            <p class="img_des" v-show="item.name === '斑'">
              {{item.SkinSpotEnum}}
              <span>个</span>
            </p>
            <!-- 玫瑰痤疮 -->
            <div v-show="item.name === '玫瑰痤疮'">
              <p
                class="img_des"
                v-if="alllist.SkinRosaceaNose_Score !=0 && alllist.SkinRosaceaLeftcheek_Score ===0 &&alllist.SkinRosaceaRightcheek_Score ===0 && alllist.SkinRosaceaForehead_Score ===0 && alllist.SkinRosaceaChin_Score ===0"
              >鼻周</p>
              <p
                class="img_des"
                v-else-if="alllist.SkinRosaceaNose_Score ===0 && alllist.SkinRosaceaLeftcheek_Score !=0 &&alllist.SkinRosaceaRightcheek_Score ===0 && alllist.SkinRosaceaForehead_Score ===0 && alllist.SkinRosaceaChin_Score ===0"
              >左脸颊</p>
              <p
                class="img_des"
                v-else-if="alllist.SkinRosaceaNose_Score ===0 && alllist.SkinRosaceaLeftcheek_Score ===0 &&alllist.SkinRosaceaRightcheek_Score !=0 && alllist.SkinRosaceaForehead_Score ===0 && alllist.SkinRosaceaChin_Score ===0"
              >右脸颊</p>
              <p
                class="img_des"
                v-else-if="alllist.SkinRosaceaNose_Score ===0 && alllist.SkinRosaceaLeftcheek_Score ===0 &&alllist.SkinRosaceaRightcheek_Score ===0 && alllist.SkinRosaceaForehead_Score !=0 && alllist.SkinRosaceaChin_Score ===0"
              >前额</p>
              <p
                class="img_des"
                v-else-if="alllist.SkinRosaceaNose_Score ===0 && alllist.SkinRosaceaLeftcheek_Score ===0 &&alllist.SkinRosaceaRightcheek_Score ===0 && alllist.SkinRosaceaForehead_Score ===0 && alllist.SkinRosaceaChin_Score !=0"
              >下巴</p>
              <p class="img_des" v-else>局部</p>
            </div>

            <p class="img_top">
              <img :src="item.img" alt />
              <span class="img_top_span">{{item.name}}</span>
            </p>
            <!-- 肤色 -->
            <p
              class="img_bottom"
              v-show="item.name === '肤色' && alllist.SkinColorHueDeltaEnum === 0"
            >中性</p>
            <p
              class="img_bottom"
              v-show="item.name === '肤色' && alllist.SkinColorHueDeltaEnum === 1"
            >偏黄</p>
            <p
              class="img_bottom"
              v-show="item.name === '肤色' && alllist.SkinColorHueDeltaEnum === 2"
            >偏红</p>
            <!-- 毛孔 -->
            <!-- 黑头 -->
            <p
              class="img_bottom"
              v-show="item.name === '黑头' && item.SkinBlackEnum >= 0 && item.SkinBlackEnum < 6"
            >轻度</p>
            <p
              class="img_bottom"
              v-show="item.name === '黑头' && item.SkinBlackEnum >= 6 && item.SkinBlackEnum < 10"
            >中度</p>
            <p class="img_bottom" v-show="item.name === '黑头' && item.SkinBlackEnum >=10">重度</p>
            <!-- 皱纹 -->
            <!-- 黑眼圈 -->
            <div v-show="item.name === '黑眼圈' ">
              <p class="img_bottom" v-if="maxblack === 1">轻度</p>
              <p class="img_bottom" v-else-if="maxblack === 2">中度</p>
              <p class="img_bottom" v-else>重度</p>
            </div>
            <!-- 痘痘 -->
            <p
              class="img_bottom"
              v-show="item.name === '痘痘' && item.SkinPimpleEnum >=1 && item.SkinPimpleEnum <=3"
            >轻度</p>
            <p
              class="img_bottom"
              v-show="item.name === '痘痘' && item.SkinPimpleEnum >3 && item.SkinPimpleEnum <=10"
            >中度</p>
            <p class="img_bottom" v-show="item.name === '痘痘' && item.SkinPimpleEnum >11">重度</p>
            <!-- 痣 -->
            <!-- <p
              class="img_bottom"
              v-show="item.name === '痣' && item.SkinMoleEnum  >=1 &&item.SkinMoleEnum <3"
            >轻度</p>
            <p
              class="img_bottom"
              v-show="item.name === '痣' && item.SkinMoleEnum  >=3 &&item.SkinMoleEnum <10"
            >中度</p>
            <p class="img_bottom" v-show="item.name === '痣' && item.SkinMoleEnum  >=10">重度</p>-->
            <!-- 痘印 -->
            <p
              class="img_bottom"
              v-show="item.name === '痘印' && item.SkinAcneEnum  >=1 &&item.SkinAcneEnum <=3"
            >轻度</p>
            <p
              class="img_bottom"
              v-show="item.name === '痘印' && item.SkinAcneEnum  >=4 &&item.SkinAcneEnum <10"
            >中度</p>
            <p class="img_bottom" v-show="item.name === '痘印' && item.SkinAcneEnum  >=10">重度</p>
            <!-- 斑 -->
            <p
              class="img_bottom"
              v-show="item.name === '斑' && item.SkinSpotEnum >=1 &&item.SkinSpotEnum <3"
            >轻度</p>
            <p
              class="img_bottom"
              v-show="item.name === '斑' && item.SkinSpotEnum  >=4 &&item.SkinSpotEnum <10"
            >中度</p>
            <p class="img_bottom" v-show="item.name === '斑' && item.SkinSpotEnum  >=10">重度</p>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <!-- 肤色 -->
    <div v-show="'肤色' === this.aaa">
      <!-- 公共头部部分 -->
      <div class="title">
        <div class="title_right" @click="gaishan('护肤')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">肤色</div>
        <div
          class="title_fuse"
          v-show="alllist.SkinColorLevel_Score+alllist.SkinColorHueDelta_Score !=0"
          :class="alllist.SkinColorLevel_Score+alllist.SkinColorHueDelta_Score <=-4?'title_active_type3':(alllist.SkinColorLevel_Score+alllist.SkinColorHueDelta_Score == -3?'title_active_type2':'title_active_type1')"
        >{{alllist.SkinColorLevel_Score + alllist.SkinColorHueDelta_Score}}</div>
      </div>
      <div class="fuse_top">
        <div class="fuse_lightdes">明暗度</div>
        <div class="fuse_lightdes_right">
          <div class="fuse_lightdes_right1">
            <div v-show="alllist.SkinColorLevelEnum === 1" class="fuse_lightdes_right1_ball"></div>
            <div class="fuse_lightdes_right1_box"></div>
            <p>透白</p>
          </div>
          <div class="fuse_lightdes_right2">
            <div v-show="alllist.SkinColorLevelEnum === 2" class="fuse_lightdes_right2_ball"></div>
            <div class="fuse_lightdes_right2_box"></div>
            <p>白皙</p>
          </div>
          <div class="fuse_lightdes_right3">
            <div v-show="alllist.SkinColorLevelEnum === 3" class="fuse_lightdes_right3_ball"></div>
            <div class="fuse_lightdes_right3_box"></div>
            <p>自然</p>
          </div>
          <div class="fuse_lightdes_right4">
            <div v-show="alllist.SkinColorLevelEnum === 4" class="fuse_lightdes_right4_ball"></div>
            <div class="fuse_lightdes_right4_box"></div>
            <p>小麦</p>
          </div>
          <div class="fuse_lightdes_right5">
            <div v-show="alllist.SkinColorLevelEnum === 5" class="fuse_lightdes_right5_ball"></div>
            <div class="fuse_lightdes_right5_box"></div>
            <p>暗沉</p>
          </div>
          <div class="fuse_lightdes_right6">
            <div v-show="alllist.SkinColorLevelEnum === 6" class="fuse_lightdes_right6_ball"></div>
            <div class="fuse_lightdes_right6_box"></div>
            <p>黝黑</p>
          </div>
        </div>
      </div>
      <div class="fuse_bottom">
        <div class="fuse_sediao">色调</div>
        <div class="fuse_sediao_right">
          <div
            :class="alllist.SkinColorHueDeltaEnum == 1?'sediao_active':''"
            class="fuse_sediao_right_ball"
          >偏黄</div>
          <div
            :class="alllist.SkinColorHueDeltaEnum == 0?'sediao_active':''"
            class="fuse_sediao_right_ball"
          >中性</div>
          <div
            :class="alllist.SkinColorHueDeltaEnum == 2?'sediao_active':''"
            class="fuse_sediao_right_ball"
          >偏红</div>
        </div>
      </div>
      <!-- 描述公共部分 -->
      <div class="alldes" v-html="alllist.SkinColorLevel"></div>
      <div v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'">
        <div @click="showlast_fuse = !showlast_fuse" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_fuse" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_fuse">
          <div class="fuse_top">
            <div class="fuse_lightdes">明暗度</div>
            <div class="fuse_lightdes_right">
              <div class="fuse_lightdes_right1">
                <div
                  v-show="alllist.SkinColorLevelHistory === '1'"
                  class="fuse_lightdes_right1_ball"
                ></div>
                <div class="fuse_lightdes_right1_box"></div>
                <p>透白</p>
              </div>
              <div class="fuse_lightdes_right2">
                <div
                  v-show="alllist.SkinColorLevelHistory === '2'"
                  class="fuse_lightdes_right2_ball"
                ></div>
                <div class="fuse_lightdes_right2_box"></div>
                <p>白皙</p>
              </div>
              <div class="fuse_lightdes_right3">
                <div
                  v-show="alllist.SkinColorLevelHistory === '3'"
                  class="fuse_lightdes_right3_ball"
                ></div>
                <div class="fuse_lightdes_right3_box"></div>
                <p>自然</p>
              </div>
              <div class="fuse_lightdes_right4">
                <div
                  v-show="alllist.SkinColorLevelHistory === '4'"
                  class="fuse_lightdes_right4_ball"
                ></div>
                <div class="fuse_lightdes_right4_box"></div>
                <p>小麦</p>
              </div>
              <div class="fuse_lightdes_right5">
                <div
                  v-show="alllist.SkinColorLevelHistory === '5'"
                  class="fuse_lightdes_right5_ball"
                ></div>
                <div class="fuse_lightdes_right5_box"></div>
                <p>暗沉</p>
              </div>
              <div class="fuse_lightdes_right6">
                <div
                  v-show="alllist.SkinColorLevelHistory === '6'"
                  class="fuse_lightdes_right6_ball"
                ></div>
                <div class="fuse_lightdes_right6_box"></div>
                <p>黝黑</p>
              </div>
            </div>
          </div>
          <div class="fuse_bottom">
            <div class="fuse_sediao">色调</div>
            <div class="fuse_sediao_right">
              <div
                :class="alllist.SkinColorHueDeltaEnumHistory == 1?'sediao_active':''"
                class="fuse_sediao_right_ball"
              >偏黄</div>
              <div
                :class="alllist.SkinColorHueDeltaEnumHistory == 0?'sediao_active':''"
                class="fuse_sediao_right_ball"
              >中性</div>
              <div
                :class="alllist.SkinColorHueDeltaEnumHistory == 2?'sediao_active':''"
                class="fuse_sediao_right_ball"
              >偏红</div>
            </div>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox v-if="alllist.SkinColorLevel_Propose != ''" :title="alllist.SkinColorLevel_Propose"></redbox>
    </div>
    <!-- 肤质 -->
    <div v-show="'肤质' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('美白提亮')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">肤质</div>
        <div
          v-show="alllist.SkinType_Score != 0"
          class="title_fuse title_active_type3"
        >{{alllist.SkinType_Score}}</div>
      </div>
      <div class="fuzhi_main">
        <div class="fuzhi_main_line"></div>
        <div class="fuzhi_img"></div>
        <div class="fuzhi_main_type">
          <img
            v-show="alllist.SkinTypeEnum === 1"
            src="../../assets/images/fuzhi_main_ganxing.png"
            alt
          />
          <p v-show="alllist.SkinTypeEnum === 1">干性</p>
          <img
            v-show="alllist.SkinTypeEnum === 0"
            src="../../assets/images/fuzhi_main_youxing.png"
            alt
          />
          <p v-show="alllist.SkinTypeEnum === 0">油性</p>
          <img
            v-show="alllist.SkinTypeEnum === 2"
            src="../../assets/images/fuzhi_main_zhengchang.png"
            alt
          />
          <p v-show="alllist.SkinTypeEnum === 2">正常</p>
          <img
            v-show="alllist.SkinTypeEnum === 3"
            src="../../assets/images/fuzhi_main_hunhexing.png"
            alt
          />
          <p v-show="alllist.SkinTypeEnum === 3">混合性</p>
        </div>
      </div>
      <div class="alldes" v-html="alllist.SkinType"></div>
      <!-- 判断肤质的历史记录 -->
      <div v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'">
        <div @click="showlast_fuzhi = !showlast_fuzhi" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_fuzhi" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_fuzhi">
          <div class="fuzhi_main">
            <div class="fuzhi_main_line"></div>
            <div class="fuzhi_img"></div>
            <div class="fuzhi_main_type">
              <img
                v-show="alllist.SkinTypeHistory === '1'"
                src="../../assets/images/fuzhi_main_ganxing.png"
                alt
              />
              <p v-show="alllist.SkinTypeHistory === '1'">干性</p>
              <img
                v-show="alllist.SkinTypeHistory === '0'"
                src="../../assets/images/fuzhi_main_youxing.png"
                alt
              />
              <p v-show="alllist.SkinTypeHistory === '0'">油性</p>
              <img
                v-show="alllist.SkinTypeHistory === '2'"
                src="../../assets/images/fuzhi_main_zhengchang.png"
                alt
              />
              <p v-show="alllist.SkinTypeHistory === '2'">正常</p>
              <img
                v-show="alllist.SkinTypeHistory === '3'"
                src="../../assets/images/fuzhi_main_hunhexing.png"
                alt
              />
              <p v-show="alllist.SkinTypeHistory === '3'">混合性</p>
            </div>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox v-if="alllist.SkinType_Propose != ''" :title="alllist.SkinType_Propose"></redbox>
    </div>

    <!-- 毛孔 -->
    <div v-show="'毛孔' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('缩小毛孔')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">毛孔</div>
        <div
          class="title_fuse"
          v-show="alllist.PoresHave_Score != 0"
          :class="alllist.PoresHave_Score == -1?'title_active_type1':(alllist.PoresHave_Score == -2?'title_active_type2':'title_active_type3')"
        >{{alllist.PoresHave_Score}}</div>
      </div>
      <div class="maokong_main">
        <div class="maokong_img"></div>

        <img
          v-show="alllist.PoresForehead_Have_Score!=0"
          class="maokong_middle_qiane"
          src="../../assets/images/maokong_middle_qiane.png"
          alt
        />
        <img
          v-show="alllist.PoresBetweenBrow_Score!=0"
          class="maokong_middle_meijian"
          src="../../assets/images/maokong_middle_meijian.png"
          alt
        />
        <img
          v-show="alllist.PoresCheeks_Right_Score!=0"
          class="maokong_middle_youlianjia"
          src="../../assets/images/maokong_middle_youlianjia.png"
          alt
        />
        <img
          v-show="alllist.PoresCheeks_Left_Score!=0"
          class="maokong_middle_zuolianjia"
          src="../../assets/images/maokong_middle_zuolianjia.png"
          alt
        />

        <img
          v-show="alllist.PoresForehead_Have_Score!=0"
          class="maokong_qianexian"
          src="../../assets/images/maokong_qianexian.png"
          alt
        />
        <img
          v-show="alllist.PoresBetweenBrow_Score!=0"
          class="maokong_meijianxian"
          src="../../assets/images/maokong_meijianxian.png"
          alt
        />
        <img
          v-show="alllist.PoresCheeks_Right_Score!=0"
          class="maokong_youlianjiaxian"
          src="../../assets/images/maokong_youlianjiaxian.png"
          alt
        />
        <img
          v-show="alllist.PoresCheeks_Left_Score!=0"
          class="maokong_zuolianjiaxian"
          src="../../assets/images/maokong_zuolianjiaxian.png"
          alt
        />

        <div v-show="alllist.PoresForehead_Have_Score!=0" class="maokong_qiane">
          <img src="../../assets/images/maokong_qiane.png" alt />
          <p>前额</p>
        </div>
        <div v-show="alllist.PoresBetweenBrow_Score!=0" class="maokong_meijian">
          <img src="../../assets/images/maokong_meijian.png" alt />
          <p>眉间</p>
        </div>
        <div v-show="alllist.PoresCheeks_Right_Score!=0" class="maokong_youlianjia">
          <img src="../../assets/images/maokong_youlianjia.png" alt />
          <p>右脸颊</p>
        </div>
        <div v-show="alllist.PoresCheeks_Left_Score!=0" class="maokong_zuolianjia">
          <img src="../../assets/images/maokong_zuolianjia.png" alt />
          <p>左脸颊</p>
        </div>
      </div>
      <div class="alldes" v-html="alllist.PoresHave"></div>
      <div
        v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.PoresCheeks_LeftHistory+alllist.PoresCheeks_RightHistory+alllist.PoresBetweenBrow_HaveHistory+alllist.PoresForehead_HaveHistory>0"
      >
        <div @click="showlast_maokong = !showlast_maokong" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_maokong" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_maokong">
          <div class="maokong_main">
            <div class="maokong_img"></div>

            <img
              v-show="alllist.PoresForehead_HaveHistory!=0"
              class="maokong_middle_qiane"
              src="../../assets/images/maokong_middle_qiane.png"
              alt
            />
            <img
              v-show="alllist.PoresBetweenBrow_HaveHistory!=0"
              class="maokong_middle_meijian"
              src="../../assets/images/maokong_middle_meijian.png"
              alt
            />
            <img
              v-show="alllist.PoresCheeks_RightHistory!=0"
              class="maokong_middle_youlianjia"
              src="../../assets/images/maokong_middle_youlianjia.png"
              alt
            />
            <img
              v-show="alllist.PoresCheeks_LeftHistory!=0"
              class="maokong_middle_zuolianjia"
              src="../../assets/images/maokong_middle_zuolianjia.png"
              alt
            />

            <img
              v-show="alllist.PoresForehead_HaveHistory !=0"
              class="maokong_qianexian"
              src="../../assets/images/maokong_qianexian.png"
              alt
            />
            <img
              v-show="alllist.PoresBetweenBrow_HaveHistory !=0"
              class="maokong_meijianxian"
              src="../../assets/images/maokong_meijianxian.png"
              alt
            />
            <img
              v-show="alllist.PoresCheeks_RightHistory !=0"
              class="maokong_youlianjiaxian"
              src="../../assets/images/maokong_youlianjiaxian.png"
              alt
            />
            <img
              v-show="alllist.PoresCheeks_LeftHistory!=0"
              class="maokong_zuolianjiaxian"
              src="../../assets/images/maokong_zuolianjiaxian.png"
              alt
            />

            <div v-show="alllist.PoresForehead_HaveHistory!=0" class="maokong_qiane">
              <img src="../../assets/images/maokong_qiane.png" alt />
              <p>前额</p>
            </div>
            <div v-show=" alllist.PoresBetweenBrow_HaveHistory !=0" class="maokong_meijian">
              <img src="../../assets/images/maokong_meijian.png" alt />
              <p>眉间</p>
            </div>
            <div v-show="alllist.PoresCheeks_RightHistory!=0" class="maokong_youlianjia">
              <img src="../../assets/images/maokong_youlianjia.png" alt />
              <p>右脸颊</p>
            </div>
            <div v-show="alllist.PoresCheeks_LeftHistory!=0" class="maokong_zuolianjia">
              <img src="../../assets/images/maokong_zuolianjia.png" alt />
              <p>左脸颊</p>
            </div>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>

      <redbox :title="alllist.PoresHave_Propose"></redbox>
    </div>
    <!-- 黑头 -->
    <div v-show="'黑头' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('祛黑头')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">黑头</div>
        <div
          class="title_fuse title_active_type1"
          v-show="alllist.SkinBlackHeads_Score > -3 && alllist.SkinBlackHeads_Score !=0"
        >{{alllist.SkinBlackHeads_Score}}</div>
        <div
          class="title_fuse title_active_type2"
          v-show="alllist.SkinBlackHeads_Score>-5 && alllist.SkinBlackHeads_Score <=-3 "
        >{{alllist.SkinBlackHeads_Score}}</div>
        <div
          class="title_fuse title_active_type3"
          v-show="alllist.SkinBlackHeads_Score <= -5"
        >{{alllist.SkinBlackHeads_Score}}</div>
      </div>
      <div class="heitoubox">
        <img v-if="alllist.SkinBlackEnum === 1" src="../../assets/images/heitou_1.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 2" src="../../assets/images/heitou_2.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 3" src="../../assets/images/heitou_3.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 4" src="../../assets/images/heitou_4.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 5" src="../../assets/images/heitou_5.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 6" src="../../assets/images/heitou_6.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 7" src="../../assets/images/heitou_7.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 8" src="../../assets/images/heitou_8.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 9" src="../../assets/images/heitou_9.png" alt />
        <img v-else-if="alllist.SkinBlackEnum === 10" src="../../assets/images/heitou_10.png" alt />
        <img v-else src="../../assets/images/heitou_zhongdu.png" alt />
        <p class="heitoubox_degree" v-if="alllist.SkinBlackEnum > 0 && alllist.SkinBlackEnum < 6">轻度</p>
        <p
          class="heitoubox_degree"
          v-else-if="alllist.SkinBlackEnum > 5 && alllist.SkinBlackEnum < 10"
        >中度</p>
        <p class="heitoubox_degree" v-else>重度</p>
        <p class="heitoubox_num">
          {{alllist.SkinBlackEnum}}
          <span>个</span>
        </p>
      </div>
      <div class="alldes" v-html="alllist.SkinBlackHeads"></div>
      <div
        v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.SkinBlackHeadsHistory>0"
      >
        <div @click="showlast_heitou = !showlast_heitou" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_heitou" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_heitou">
          <div class="heitoubox">
            <img
              v-if="alllist.SkinBlackHeadsHistory === 1"
              src="../../assets/images/heitou_1.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 2"
              src="../../assets/images/heitou_2.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 3"
              src="../../assets/images/heitou_3.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 4"
              src="../../assets/images/heitou_4.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 5"
              src="../../assets/images/heitou_5.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 6"
              src="../../assets/images/heitou_6.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 7"
              src="../../assets/images/heitou_7.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 8"
              src="../../assets/images/heitou_8.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 9"
              src="../../assets/images/heitou_9.png"
              alt
            />
            <img
              v-else-if="alllist.SkinBlackHeadsHistory === 10"
              src="../../assets/images/heitou_10.png"
              alt
            />
            <img v-else src="../../assets/images/heitou_zhongdu.png" alt />
            <p class="heitoubox_degree">中度</p>
            <p class="heitoubox_num">
              {{alllist.SkinBlackHeadsHistory}}
              <span>个</span>
            </p>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinBlackHeads_Propose"></redbox>
    </div>
    <!-- 皱纹 -->
    <div v-show="'皱纹' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('祛皱')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">皱纹</div>
        <div
          v-show="alllist.SkinWrinkle_Score == -1 || alllist.SkinWrinkle_Score == -2 ||  alllist.SkinWrinkle_Score == -3"
          class="title_fuse title_active_type1"
        >{{alllist.SkinWrinkle_Score}}</div>
        <div
          v-show="alllist.SkinWrinkle_Score == -4 || alllist.SkinWrinkle_Score == -5 ||  alllist.SkinWrinkle_Score == -6"
          class="title_fuse title_active_type2"
        >{{alllist.SkinWrinkle_Score}}</div>
        <div
          v-show="alllist.SkinWrinkle_Score <= -7 && alllist.SkinWrinkle_Score != 0"
          class="title_fuse title_active_type3"
        >{{alllist.SkinWrinkle_Score}}</div>
      </div>
      <div class="zhouwen_main">
        <div class="zhouwen_img"></div>
        <img
          v-show="alllist.SkinNasolabialFolds_Right_Score != 0"
          class="zhouwen_falingwen"
          src="../../assets/images/zhouwen_falingwen.png"
          alt
        />
        <img
          v-show="alllist.SkinForeHeadWrinkle_Score !=0"
          class="zhouwen_taitouwen"
          src="../../assets/images/zhouwen_taitouwen.png"
          alt
        />
        <img
          v-show="alllist.SkinEyeWrinkle_Right_Score!=0"
          class="zhouwen_youyanwen"
          src="../../assets/images/zhouwen_youyanwen.png"
          alt
        />
        <img
          v-show="alllist.SkinCrowsFeed_Right_Score!=0"
          class="zhouwen_youyuweiwen"
          src="../../assets/images/zhouwen_youyuweiwen.png"
          alt
        />
        <img
          v-show="alllist.SkinEyeWrinkle_Left_Score!=0"
          class="zhouwen_zuoyanwen"
          src="../../assets/images/zhouwen_zuoyanwen.png"
          alt
        />
        <img
          v-show="alllist.SkinCrowsFeed_Left_Score!=0"
          class="zhouwen_zuoyuweiwen"
          src="../../assets/images/zhouwen_zuoyuweiwen.png"
          alt
        />

        <img
          v-show="alllist.SkinCrowsFeed_Right_Score!=0"
          class="youyuweiwen_line2"
          src="../../assets/images/youyuweiwen_line2.png"
          alt
        />
        <img
          v-show="alllist.SkinEyeWrinkle_Right_Score!=0"
          class="youyanwen_line2"
          src="../../assets/images/youyanwen_line2.png"
          alt
        />
        <img
          v-show="alllist.SkinNasolabialFolds_Right_Score!=0"
          class="youlianfalingwen_line2"
          src="../../assets/images/youlianfalingwen_line2.png"
          alt
        />
        <img
          v-show="alllist.SkinForeHeadWrinkle_Score!=0"
          class="taitouwen_line2"
          src="../../assets/images/taitouwen_line2.png"
          alt
        />
        <img
          v-show="alllist.SkinCrowsFeed_Left_Score!=0"
          class="zuoyuweiwen_line2"
          src="../../assets/images/zuoyuweiwen_line2.png"
          alt
        />
        <img
          v-show="alllist.SkinEyeWrinkle_Left_Score!=0"
          class="zuoyanwen_line2"
          src="../../assets/images/zuoyanwen_line2.png"
          alt
        />
        <img
          v-show="alllist.SkinNasolabialFolds_Left_Score!=0"
          class="zuolianfalingwen_line2"
          src="../../assets/images/zuolianfalingwen_line2.png"
          alt
        />

        <div v-show="alllist.SkinForeHeadWrinkle_Score!=0" class="font_taitouwen fontfont">抬头纹</div>
        <div v-show="alllist.SkinEyeWrinkle_Right_Score!=0" class="font_youyanwen fontfont">右眼纹</div>
        <div
          v-show="alllist.SkinNasolabialFolds_Right_Score!=0"
          class="font_youlianfalingwen fontfont"
        >右法令纹</div>
        <div v-show="alllist.SkinEyeWrinkle_Left_Score!=0" class="font_zuoyanwen fontfont">左眼纹</div>
        <div v-show="alllist.SkinCrowsFeed_Left_Score!=0" class="font_zuoyuweiwen fontfont">左鱼尾纹</div>
        <div v-show="alllist.SkinCrowsFeed_Right_Score!=0" class="font_youyuweiwen fontfont">右鱼尾纹</div>
        <div
          v-show="alllist.SkinNasolabialFolds_Left_Score!=0"
          class="font_zuolianfalingwen fontfont"
        >左法令纹</div>
      </div>
      <div class="alldes" v-html="alllist.SkinWrinkle"></div>
      <div
        v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.SkinForeHeadWrinkleHistory+alllist.SkinCrowsFeed_LeftHistory+alllist.SkinCrowsFeed_RightHistory+alllist.SkinNasolabialFolds_LeftHistory+alllist.SkinNasolabialFolds_RightHistory+alllist.SkinEyeWrinkle_LeftHistory+alllist.SkinEyeWrinkle_RightHistory+alllist.SkinEyeFineLine_LeftHistory+alllist.SkinEyeFineLine_RightHistory>0"
      >
        <div @click="showlast_zhouwen = !showlast_zhouwen" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_zhouwen" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_zhouwen">
          <div class="zhouwen_main">
            <div class="zhouwen_img"></div>
            <img
              v-show="alllist.SkinNasolabialFolds_LeftHistory!=0"
              class="zhouwen_falingwen"
              src="../../assets/images/zhouwen_falingwen.png"
              alt
            />
            <img
              v-show="alllist.SkinForeHeadWrinkleHistory !=0"
              class="zhouwen_taitouwen"
              src="../../assets/images/zhouwen_taitouwen.png"
              alt
            />
            <img
              v-show="alllist.SkinEyeWrinkle_RightHistory!=0"
              class="zhouwen_youyanwen"
              src="../../assets/images/zhouwen_youyanwen.png"
              alt
            />
            <img
              v-show="alllist.SkinCrowsFeed_RightHistory!=0"
              class="zhouwen_youyuweiwen"
              src="../../assets/images/zhouwen_youyuweiwen.png"
              alt
            />
            <img
              v-show="alllist.SkinEyeWrinkle_LeftHistory!=0"
              class="zhouwen_zuoyanwen"
              src="../../assets/images/zhouwen_zuoyanwen.png"
              alt
            />
            <img
              v-show="alllist.SkinCrowsFeed_LeftHistory!=0"
              class="zhouwen_zuoyuweiwen"
              src="../../assets/images/zhouwen_zuoyuweiwen.png"
              alt
            />

            <img
              v-show="alllist.SkinCrowsFeed_RightHistory!=0"
              class="youyuweiwen_line2"
              src="../../assets/images/youyuweiwen_line2.png"
              alt
            />
            <img
              v-show="alllist.SkinEyeWrinkle_RightHistory!=0"
              class="youyanwen_line2"
              src="../../assets/images/youyanwen_line2.png"
              alt
            />
            <img
              v-show="alllist.SkinNasolabialFolds_RightHistory!=0"
              class="youlianfalingwen_line2"
              src="../../assets/images/youlianfalingwen_line2.png"
              alt
            />
            <img
              v-show="alllist.SkinForeHeadWrinkleHistory !=0"
              class="taitouwen_line2"
              src="../../assets/images/taitouwen_line2.png"
              alt
            />
            <img
              v-show="alllist.SkinCrowsFeed_LeftHistory!=0"
              class="zuoyuweiwen_line2"
              src="../../assets/images/zuoyuweiwen_line2.png"
              alt
            />
            <img
              v-show="alllist.SkinEyeWrinkle_LeftHistory!=0"
              class="zuoyanwen_line2"
              src="../../assets/images/zuoyanwen_line2.png"
              alt
            />
            <img
              v-show="alllist.SkinNasolabialFolds_LeftHistory!=0"
              class="zuolianfalingwen_line2"
              src="../../assets/images/zuolianfalingwen_line2.png"
              alt
            />

            <div v-show="alllist.SkinForeHeadWrinkleHistory !=0" class="font_taitouwen fontfont">抬头纹</div>
            <div v-show="alllist.SkinEyeWrinkle_RightHistory!=0" class="font_youyanwen fontfont">右眼纹</div>
            <div
              v-show="alllist.SkinNasolabialFolds_RightHistory!=0"
              class="font_youlianfalingwen fontfont"
            >右法令纹</div>
            <div v-show="alllist.SkinEyeWrinkle_LeftHistory!=0" class="font_zuoyanwen fontfont">左眼纹</div>
            <div
              v-show="alllist.SkinCrowsFeed_LeftHistory!=0"
              class="font_zuoyuweiwen fontfont"
            >左鱼尾纹</div>
            <div
              v-show="alllist.SkinCrowsFeed_RightHistory!=0"
              class="font_youyuweiwen fontfont"
            >右鱼尾纹</div>
            <div
              v-show="alllist.SkinNasolabialFolds_LeftHistory!=0"
              class="font_zuolianfalingwen fontfont"
            >左法令纹</div>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinWrinkle_Propose"></redbox>
    </div>
    <!-- 黑眼圈 -->
    <div v-show="'黑眼圈' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('祛黑眼圈')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">黑眼圈</div>
        <div
          class="title_fuse title_active_type1"
          v-show="alllist.SkinPandaEye_Score>-6 && alllist.SkinPandaEye_Score!=0"
        >{{alllist.SkinPandaEye_Score}}</div>
        <div
          class="title_fuse title_active_type2"
          v-show="alllist.SkinPandaEye_Score<=-7 && alllist.SkinPandaEye_Score >= -12"
        >{{alllist.SkinPandaEye_Score}}</div>
        <div
          class="title_fuse title_active_type3"
          v-show="alllist.SkinPandaEye_Score<-13"
        >{{alllist.SkinPandaEye_Score}}</div>
      </div>

      <div class="blackcicle">
        <div class="blackcicle_eye"></div>
        <!-- <img class="blackcicle_sesuxing" src="../../assets/images/blackcicle_sesuxing.png" alt=""> -->
        <img
          v-show="alllist.SkinPandaEye_Left_ArteryEnum!= 0 ||alllist.SkinPandaEye_Right_ArteryEnum!= 0||alllist.SkinPandaEye_Left_PigmentEnum != 0|| alllist.SkinPandaEye_Right_PigmentEnum != 0"
          class="blackcicle_xueguanxing"
          src="../../assets/images/blackcicle_xueguanxing.png"
          alt
        />
        <img
          v-show="alllist.SkinPandaEye_Left_ShadowEnum!= 0 || alllist.SkinPandaEye_Right_ShadowEnum !=0"
          class="blackcicle_yinyingxing"
          src="../../assets/images/blackcicle_yinyingxing.png"
          alt
        />
      </div>
      <p class="blackcicle_p">
        <span
          v-show="alllist.SkinPandaEye_Left_PigmentEnumHistory != 0 ||alllist.SkinPandaEye_Right_PigmentEnumHistory != 0"
        >色素型黑眼圈</span>
        <span
          v-show="alllist.SkinPandaEye_Left_ArteryEnumHistory!= 0 || alllist.SkinPandaEye_Right_ArteryEnumHistory!= 0 "
        >血管型黑眼圈</span>
        <span
          v-show="alllist.SkinPandaEye_Left_ShadowEnumHistory !=0 || alllist.SkinPandaEye_Right_ShadowEnumHistory !=0"
        >阴影型黑眼圈</span>
      </p>
      <div class="black_box">
        <div class="black_box_item1">
          <div>
            <van-circle
              v-model="currentRate1"
              layer-color="#e9ebeb"
              color="#eb517c"
              :rate="30"
              :stroke-width="80"
              :size="53"
              :text="text1"
            />
          </div>
          <p>色素型</p>
        </div>
        <div class="black_box_item2">
          <div>
            <van-circle
              v-model="currentRate2"
              layer-color="#e9ebeb"
              color="#f5bc60"
              :rate="30"
              :stroke-width="80"
              :size="53"
              :text="text2"
            />
          </div>
          <p>血管型</p>
        </div>
        <div class="black_box_item3">
          <div>
            <van-circle
              v-model="currentRate3"
              layer-color="#e9ebeb"
              color="#46b1a6"
              :rate="30"
              :stroke-width="80"
              :size="53"
              :text="text3"
            />
          </div>
          <p>阴影型</p>
        </div>
      </div>
      <div class="alldes" v-html="alllist.SkinPandaEye"></div>
      <div
        v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&& alllist.SkinPandaEye_Left_PigmentHistory+alllist.SkinPandaEye_Right_PigmentHistory+alllist.SkinPandaEye_Left_ArteryHistory+alllist.SkinPandaEye_Right_ArteryHistory+alllist.SkinPandaEye_Left_ShadowHistory+alllist.SkinPandaEye_Right_ShadowHistory>0"
      >
        <div @click="showlast_blackcicle = !showlast_blackcicle" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_blackcicle" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_blackcicle">
          <div class="blackcicle">
            <div class="blackcicle_eye"></div>
            <!-- <img class="blackcicle_sesuxing" src="../../assets/images/blackcicle_sesuxing.png" alt=""> -->
            <img
              v-show="alllist.SkinPandaEye_Left_PigmentHistory!= 0 || alllist.SkinPandaEye_Left_ArteryHistory!= 0"
              class="blackcicle_xueguanxing"
              src="../../assets/images/blackcicle_xueguanxing.png"
              alt
            />
            <img
              v-show="alllist.SkinPandaEye_Right_ShadowHistory != 0"
              class="blackcicle_yinyingxing"
              src="../../assets/images/blackcicle_yinyingxing.png"
              alt
            />
          </div>
          <p class="blackcicle_p">
            <span
              v-show="alllist.SkinPandaEye_Left_PigmentHistory != 0 ||alllist.SkinPandaEye_Right_PigmentHistory != 0"
            >色素型黑眼圈</span>
            <span
              v-show="alllist.SkinPandaEye_Left_ArteryHistory!= 0 || alllist.SkinPandaEye_Right_ArteryHistory!= 0 "
            >血管型黑眼圈</span>
            <span
              v-show="alllist.SkinPandaEye_Left_ShadowHistory !=0 || alllist.SkinPandaEye_Right_ShadowHistory !=0"
            >阴影型黑眼圈</span>
          </p>
          <div class="black_box">
            <div class="black_box_item1">
              <div>
                <van-circle
                  v-model="currentRate4"
                  layer-color="#e9ebeb"
                  color="#eb517c"
                  :rate="30"
                  :stroke-width="80"
                  :size="53"
                  :text="text4"
                />
              </div>
              <p>色素型</p>
            </div>
            <div class="black_box_item2">
              <div>
                <van-circle
                  v-model="currentRate5"
                  layer-color="#e9ebeb"
                  color="#f5bc60"
                  :rate="30"
                  :stroke-width="80"
                  :size="53"
                  :text="text5"
                />
              </div>
              <p>血管型</p>
            </div>
            <div class="black_box_item3">
              <div>
                <van-circle
                  v-model="currentRate6"
                  layer-color="#e9ebeb"
                  color="#46b1a6"
                  :rate="30"
                  :stroke-width="80"
                  :size="53"
                  :text="text6"
                />
              </div>
              <p>阴影型</p>
            </div>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinPandaEye_Propose"></redbox>
    </div>
    <!-- 痘痘 -->
    <div v-show="'痘痘' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('祛痘')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">痘痘</div>
        <div
          class="title_fuse title_active_type1"
          v-show="alllist.SkinPimple_Score>=-2 && alllist.SkinPimple_Score != 0"
        >{{alllist.SkinPimple_Score}}</div>
        <div
          class="title_fuse title_active_type2"
          v-show="alllist.SkinPimple_Score<=-3 && alllist.SkinPimple_Score>=-5"
        >{{alllist.SkinPimple_Score}}</div>
        <div
          class="title_fuse title_active_type3"
          v-show="alllist.SkinPimple_Score<=-6"
        >{{alllist.SkinPimple_Score}}</div>
      </div>
      <div class="heitoubox">
        <img v-if="alllist.SkinPimpleEnum === 1" src="../../assets/images/doudou1.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 2" src="../../assets/images/doudou2.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 3" src="../../assets/images/doudou3.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 4" src="../../assets/images/doudou4.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 5" src="../../assets/images/doudou5.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 6" src="../../assets/images/doudou6.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 7" src="../../assets/images/doudou7.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 8" src="../../assets/images/doudou8.png" alt />
        <img v-else-if="alllist.SkinPimpleEnum === 9" src="../../assets/images/doudou9.png" alt />
        <img v-else src="../../assets/images/doudou10.png" alt />
        <p class="heitoubox_degree">痘痘</p>
        <p class="heitoubox_num">
          {{alllist.SkinPimpleEnum}}
          <span>颗</span>
        </p>
      </div>
      <div class="alldes" v-html="alllist.SkinPimple"></div>
      <div v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.kinPimpleHistory > 0">
        <div @click="showlast_doudou = !showlast_doudou" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_doudou" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_doudou">
          <div class="heitoubox">
            <img v-if="alllist.SkinPimpleHistory === 1" src="../../assets/images/doudou1.png" alt />
            <img
              v-else-if="alllist.SkinPimpleHistory === 2"
              src="../../assets/images/doudou2.png"
              alt
            />
            <img
              v-else-if="alllist.SkinPimpleHistory === 3"
              src="../../assets/images/doudou3.png"
              alt
            />
            <img
              v-else-if="alllist.SkinPimpleHistory === 4"
              src="../../assets/images/doudou4.png"
              alt
            />
            <img
              v-else-if="alllist.SkinPimpleHistory === 5"
              src="../../assets/images/doudou5.png"
              alt
            />
            <img
              v-else-if="alllist.SkinPimpleHistory=== 6"
              src="../../assets/images/doudou6.png"
              alt
            />
            <img
              v-else-if="alllist.SkinPimpleHistory === 7"
              src="../../assets/images/doudou7.png"
              alt
            />
            <img
              v-else-if="alllist.SkinPimpleHistory === 8"
              src="../../assets/images/doudou8.png"
              alt
            />
            <img
              v-else-if="alllist.SkinPimpleHistory === 9"
              src="../../assets/images/doudou9.png"
              alt
            />
            <img v-else src="../../assets/images/doudou10.png" alt />
            <p class="heitoubox_degree">痘痘</p>
            <p class="heitoubox_num">
              {{alllist.SkinPimpleHistory}}
              <span>颗</span>
            </p>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinPimple_Propose"></redbox>
    </div>
    <!-- 痣 -->
    <div v-show="'痣' === this.aaa">
      <div class="title">
        <!-- <div class="title_right" @click="gaishan('痣')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>-->
        <div class="title_ball"></div>
        <div class="title_des">痣</div>
        <div class="title_fuse title_active_type1">{{alllist.SkinMole_Score}}</div>
      </div>
      <div class="heitoubox">
        <img v-if="alllist.SkinMoleEnum === 1" src="../../assets/images/zhi1.png" alt />
        <img v-else-if="alllist.SkinMoleEnum === 2" src="../../assets/images/zhi2.png" alt />
        <img v-else-if="alllist.SkinMoleEnum === 3" src="../../assets/images/zhi3.png" alt />
        <img v-else-if="alllist.SkinMoleEnum === 4" src="../../assets/images/zhi4.png" alt />
        <img v-else-if="alllist.SkinMoleEnum === 5" src="../../assets/images/zhi5.png" alt />
        <img v-else-if="alllist.SkinMoleEnum === 6" src="../../assets/images/zhi6.png" alt />
        <img v-else-if="alllist.SkinMoleEnum === 7" src="../../assets/images/zhi7.png" alt />
        <img v-else-if="alllist.SkinMoleEnum === 8" src="../../assets/images/zhi8.png" alt />
        <img v-else-if="alllist.SkinMoleEnum=== 9" src="../../assets/images/zhi9.png" alt />
        <img v-else src="../../assets/images/zhi10.png" alt />
        <p class="heitoubox_degree">痣</p>
        <p class="heitoubox_num">
          {{alllist.SkinMoleEnum}}
          <span>颗</span>
        </p>
      </div>
      <div class="alldes" v-html="alllist.SkinMole"></div>
      <div v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.SkinMoleHistory>0">
        <div @click="showlast_zhi = !showlast_zhi" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_zhi" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_zhi">
          <div class="heitoubox">
            <img v-if="alllist.SkinMoleHistory === 1" src="../../assets/images/zhi1.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 2" src="../../assets/images/zhi2.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 3" src="../../assets/images/zhi3.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 4" src="../../assets/images/zhi4.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 5" src="../../assets/images/zhi5.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 6" src="../../assets/images/zhi6.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 7" src="../../assets/images/zhi7.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 8" src="../../assets/images/zhi8.png" alt />
            <img v-else-if="alllist.SkinMoleHistory === 9" src="../../assets/images/zhi9.png" alt />
            <img v-else src="../../assets/images/zhi10.png" alt />
            <p class="heitoubox_degree">痣</p>
            <p class="heitoubox_num">
              {{alllist.SkinMoleHistory}}
              <span>颗</span>
            </p>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinMole_Propose"></redbox>
    </div>
    <!-- 痘印 -->
    <div v-show="'痘印' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('祛痘印')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">痘印</div>
        <div
          class="title_fuse title_active_type1"
          v-show="alllist.SkinAcne_Score>=-2 && alllist.SkinAcne_Score != 0"
        >{{alllist.SkinAcne_Score}}</div>
        <div
          class="title_fuse title_active_type2"
          v-show="alllist.SkinAcne_Score<=-3 && alllist.SkinAcne_Score>=-5"
        >{{alllist.SkinAcne_Score}}</div>
        <div
          class="title_fuse title_active_type3"
          v-show="alllist.SkinAcne_Score<=-6"
        >{{alllist.SkinAcne_Score}}</div>
      </div>
      <div class="heitoubox">
        <img v-if="alllist.SkinAcneEnum === 1" src="../../assets/images/douyin1.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 2" src="../../assets/images/douyin2.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 3" src="../../assets/images/douyin3.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 4" src="../../assets/images/douyin4.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 5" src="../../assets/images/douyin5.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 6" src="../../assets/images/douyin6.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 7" src="../../assets/images/douyin7.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 8" src="../../assets/images/douyin8.png" alt />
        <img v-else-if="alllist.SkinAcneEnum === 9" src="../../assets/images/douyin9.png" alt />
        <img v-else src="../../assets/images/douyin10.png" alt />
        <p class="heitoubox_degree">痘印</p>
        <p class="heitoubox_num">
          {{alllist.SkinAcneEnum}}
          <span>颗</span>
        </p>
      </div>
      <div class="alldes" v-html="alllist.SkinAcne"></div>
      <div v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.SkinAcneHistory>0">
        <div @click="showlast_douyin = !showlast_douyin" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_douyin" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_douyin">
          <div class="heitoubox">
            <img v-if="alllist.SkinAcneHistory === 1" src="../../assets/images/douyin1.png" alt />
            <img
              v-else-if="alllist.SkinAcneHistory === 2"
              src="../../assets/images/douyin2.png"
              alt
            />
            <img
              v-else-if="alllist.SkinAcneHistory === 3"
              src="../../assets/images/douyin3.png"
              alt
            />
            <img
              v-else-if="alllist.SkinAcneHistory === 4"
              src="../../assets/images/douyin4.png"
              alt
            />
            <img
              v-else-if="alllist.SkinAcneHistory === 5"
              src="../../assets/images/douyin5.png"
              alt
            />
            <img
              v-else-if="alllist.SkinAcneHistory === 6"
              src="../../assets/images/douyin6.png"
              alt
            />
            <img
              v-else-if="alllist.SkinAcneHistory === 7"
              src="../../assets/images/douyin7.png"
              alt
            />
            <img v-else-if="alllist.SkinAcneHistory=== 8" src="../../assets/images/douyin8.png" alt />
            <img
              v-else-if="alllist.SkinAcneHistory === 9"
              src="../../assets/images/douyin9.png"
              alt
            />

            <p class="heitoubox_degree">痘印</p>
            <p class="heitoubox_num">
              {{alllist.SkinAcneHistory}}
              <span>颗</span>
            </p>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinAcne_Propose"></redbox>
    </div>
    <!-- 斑 -->
    <div v-show="'斑' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('祛斑')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">斑</div>
        <div
          class="title_fuse title_active_type1"
          v-show="alllist.SkinSpot_Score>=-2 && alllist.SkinSpot_Score != 0"
        >{{alllist.SkinSpot_Score}}</div>
        <div
          class="title_fuse title_active_type2"
          v-show="alllist.SkinSpot_Score<=-3 && alllist.SkinSpot_Score>=-5"
        >{{alllist.SkinSpot_Score}}</div>
        <div
          class="title_fuse title_active_type3"
          v-show="alllist.SkinSpot_Score<=-6"
        >{{alllist.SkinSpot_Score}}</div>
      </div>
      <div class="heitoubox">
        <img v-if="alllist.SkinSpotEnum === 1" src="../../assets/images/ban1.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 2" src="../../assets/images/ban2.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 3" src="../../assets/images/ban3.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 4" src="../../assets/images/ban4.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 5" src="../../assets/images/ban5.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 6" src="../../assets/images/ban6.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 7" src="../../assets/images/ban7.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 8" src="../../assets/images/ban8.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 9" src="../../assets/images/ban9.png" alt />
        <img v-else-if="alllist.SkinSpotEnum === 10" src="../../assets/images/ban10.png" alt />
        <img v-else src="../../assets/images/banduo.png" alt />
        <p class="heitoubox_degree">斑</p>
        <p class="heitoubox_num">
          {{alllist.SkinSpotEnum}}
          <span>个</span>
        </p>
      </div>
      <div class="alldes" v-html="alllist.SkinSpot"></div>
      <div v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.SkinSpotHistory>0">
        <div @click="showlast_ban = !showlast_ban" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_ban" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_ban">
          <div class="heitoubox">
            <img v-if="alllist.SkinSpotHistory === 1" src="../../assets/images/ban1.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 2" src="../../assets/images/ban2.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 3" src="../../assets/images/ban3.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 4" src="../../assets/images/ban4.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 5" src="../../assets/images/ban5.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 6" src="../../assets/images/ban6.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 7" src="../../assets/images/ban7.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 8" src="../../assets/images/ban8.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 9" src="../../assets/images/ban9.png" alt />
            <img v-else-if="alllist.SkinSpotHistory === 10" src="../../assets/images/ban10.png" alt />
            <img v-else src="../../assets/images/banduo.png" alt />

            <p class="heitoubox_degree">斑</p>
            <p class="heitoubox_num">
              {{alllist.SkinSpotHistory}}
              <span>个</span>
            </p>
          </div>
          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinSpot_Propose"></redbox>
    </div>
    <!-- 玫瑰痤疮 -->
    <div v-show="'玫瑰痤疮' === this.aaa">
      <div class="title">
        <div class="title_right" @click="gaishan('祛痤疮')">
          产品推荐
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="title_ball"></div>
        <div class="title_des">玫瑰痤疮</div>
        <div
          class="title_fuse title_active_type1"
          v-show="alllist.SkinRosacea_Score == -1 || alllist.SkinRosacea_Score == -2 || alllist.SkinRosacea_Score == -3"
        >{{alllist.SkinRosacea_Score}}</div>
        <div
          class="title_fuse title_active_type2"
          v-show="alllist.SkinRosacea_Score == -4 || alllist.SkinRosacea_Score == -5 || alllist.SkinRosacea_Score == -6"
        >{{alllist.SkinRosacea_Score}}</div>
        <div
          class="title_fuse title_active_type3"
          v-show="alllist.SkinRosacea_Score<-6"
        >{{alllist.SkinRosacea_Score}}</div>
      </div>
      <div class="meigui_main">
        <div class="meigui_img"></div>
        <div v-show="alllist.SkinRosaceaForehead != '0'" class="meigui_qiane">
          <img src="../../assets/images/meigui_qiane.png" alt />
          <p>前额</p>
        </div>
        <div v-show="alllist.SkinRosaceaNose != '0'" class="meigui_meijian">
          <img src="../../assets/images/meigui_meijian.png" alt />
          <p>鼻周</p>
        </div>
        <div v-show="alllist.SkinRosaceaLeftcheek!= '0'" class="meigui_zuolianjia">
          <img src="../../assets/images/meigui_zuolianjia.png" alt />
          <p>左脸颊</p>
        </div>
        <div v-show="alllist.SkinRosaceaRightcheek!= '0'" class="meigui_youlianjia">
          <img src="../../assets/images/meigui_youlianjia.png" alt />
          <p>右脸颊</p>
        </div>
        <div v-show="alllist.SkinRosaceaChin!= '0'" class="meigui_xiaba">
          <img src="../../assets/images/meigui_xiaba.png" alt />
          <p>下巴</p>
        </div>
      </div>
      <div class="alldes" v-html="alllist.SkinRosacea"></div>
      <div
        v-show="alllist.SkinHistoryDate != '0001-01-01 00:00:00'&&alllist.SkinRosaceaNoseHistory+alllist.SkinRosaceaLeftcheekHistory+alllist.SkinRosaceaRightcheekHistory+alllist.SkinRosaceaForeheadHistory+alllist.SkinRosaceaChinHistory>0"
      >
        <div @click="showlast_meigui = !showlast_meigui" class="last">
          <div>上次检测结果</div>
          <i v-if="!showlast_meigui" class="iconfont icon-xiangxia2"></i>
          <i v-else class="iconfont icon-xiangshang2"></i>
        </div>
        <div v-show="showlast_meigui">
          <div class="meigui_main">
            <div class="meigui_img"></div>
            <div v-show="alllist.SkinRosaceaForeheadHistory!=0 " class="meigui_qiane">
              <img src="../../assets/images/meigui_qiane.png" alt />
              <p>前额</p>
            </div>
            <div v-show="alllist.SkinRosaceaNoseHistory!=0 " class="meigui_meijian">
              <img src="../../assets/images/meigui_meijian.png" alt />
              <p>鼻周</p>
            </div>
            <div v-show="alllist.SkinRosaceaLeftcheekHistory!=0 " class="meigui_zuolianjia">
              <img src="../../assets/images/meigui_zuolianjia.png" alt />
              <p>左脸颊</p>
            </div>
            <div v-show="alllist.SkinRosaceaRightcheekHistory!=0 " class="meigui_youlianjia">
              <img src="../../assets/images/meigui_youlianjia.png" alt />
              <p>右脸颊</p>
            </div>
            <div v-show="alllist.SkinRosaceaChinHistory!=0 " class="meigui_xiaba">
              <img src="../../assets/images/meigui_xiaba.png" alt />
              <p>下巴</p>
            </div>
          </div>

          <div class="last_time">{{alllist.SkinHistoryDate |dateFmt('YYYY-MM-DD HH:mm')}}</div>
        </div>
      </div>
      <redbox :title="alllist.SkinRosacea_Propose"></redbox>
    </div>
    <!-- 通用 咨询专家 -->
    <div v-if="this.otherinfo.length">
      <div class="title">
        <div class="title_ball"></div>
        <div class="title_des">肤质专家</div>
      </div>
      <div class="zixunbox">
        <div class="zixun_item" v-for="(i,index) in otherinfo" :key="index">
          <div @click="lookother(i.Id)" class="img_box">
            <img v-if="i.Avatar" class="img_big" :src="i.Avatar" alt />
            <img v-else class="img_big" src="../../assets/images/userphoto.png" alt />
            <img class="img_small" src="../../assets/images/专家认证V.png" alt />
          </div>
          <p @click="lookother(i.Id)" class="zixun_item_name">{{i.Name}}</p>
          <p class="zixun_item_des">已帮助{{i.HelpCount}}人</p>
          <div class="zixun_item_anniu" @click="kefu">立即咨询</div>
        </div>
      </div>
    </div>
    <div v-else style="width:100%;height:50px"></div>
    <grade></grade>
  </div>
</template>

<script>
import request from "@/utils/request";
import grade from '@/components/GradePopup'
import redbox from "./recode2_redbox";
import { Circle, Swipe } from "vant";
export default {
  components: {
    redbox,
    grade
  },

  data() {
    return {
      otherinfo: [],
      maxblack: 0,
      id: 0,
      text1: "无",
      text2: "无",
      text3: "无",
      text4: "无",
      text5: "无",
      text6: "无",
      currentRate1: 0,
      currentRate2: 0,
      currentRate3: 0,
      currentRate4: 0,
      currentRate5: 0,
      currentRate6: 0,
      filterArr: [
        {
          key: "SkinColorLevelEnum",
          name: "肤色",
          img: require("../../assets/images/big1.png"),
          backimg: require("../../assets/images/small_yellow.png")
        },
        {
          key: "SkinTypeEnum",
          name: "肤质",
          img: require("../../assets/images/big2.png"),
          backimg: require("../../assets/images/big_purple.png")
        },
        {
          key: "PoresHaveEnum",
          name: "毛孔",
          img: require("../../assets/images/big3.png"),
          backimg: require("../../assets/images/small_bink.png")
        },
        {
          key: "SkinBlackEnum",
          name: "黑头",
          img: require("../../assets/images/big4.png"),
          backimg: require("../../assets/images/big_4.png")
        },
        {
          key: "SkinWrinkleEnum",
          name: "皱纹",
          img: require("../../assets/images/big5.png"),
          backimg: require("../../assets/images/big_5.png")
        },
        {
          key: "SkinPandaEyeEnum",
          name: "黑眼圈",
          img: require("../../assets/images/big6.png"),
          backimg: require("../../assets/images/big_6.png")
        },
        {
          key: "SkinPimpleEnum",
          name: "痘痘",
          img: require("../../assets/images/big7.png"),
          backimg: require("../../assets/images/big_7.png")
        },
        {
          key: "SkinMoleEnum",
          name: "痣",
          img: require("../../assets/images/big8.png"),
          backimg: require("../../assets/images/big_8.png")
        },
        {
          key: "SkinAcneEnum",
          name: "痘印",
          img: require("../../assets/images/big9.png"),
          backimg: require("../../assets/images/big_9.png")
        },
        {
          key: "SkinSpotEnum",
          name: "斑",
          img: require("../../assets/images/big10.png"),
          backimg: require("../../assets/images/big_10.png")
        },
        {
          key: "SkinRosaceaEnum",
          name: "玫瑰痤疮",
          img: require("../../assets/images/big10.png"),
          backimg: require("../../assets/images/big_11.png")
        }
      ],
      imgArr: [
        { image: require("../../assets/images/small_yellow.png") },
        { image: require("../../assets/images/big_purple.png") },
        { image: require("../../assets/images/small_bink.png") }
      ],
      alllist: [],
      swiperList: [],
      currentRate1: 30,
      showfen: false, //分享弹框
      showlast_fuse: false, //展示上次肤色结果
      showlast_fuzhi: false, // 展示上次肤质
      showlast_heitou: false, //展示上次黑头
      showlast_maokong: false, //展示上次毛孔
      showlast_doudou: false, //展示上次痘痘
      showlast_douyin: false, //展示上次痘印
      showlast_ban: false, //展示上次斑
      showlast_meigui: false, //展示上次玫瑰
      showlast_zhouwen: false, //展示上次皱纹
      showlast_blackcicle: false, //展示上次黑眼圈
      showlast_zhi: false, //展示上次痣
      aaa: "",
      active: 1,
      swiperOption: {
        //可见图片张数
        slidesPerView: 3,
        // 默认选中中间一张
        centeredSlides: true,
        //无限循环
        // loop: true,
        initialSlide: 1,
        //小圆点（我此处没使用，列出供参考）
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        //自动轮播
        // autoplay: {
        //   stopOnLastSlide: true
        // },
        //上下按钮点击轮播效果
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: () => {
            // console.log(this.activeIndex)
            // console.log(this.$refs.mySwiper.swiper.activeIndex); //切换结束时，告诉我现在是第几个slide
            let swiper = this.$refs.mySwiper.swiper;
            // console.log(swiper);
            if (swiper != null) {
              let i = swiper.activeIndex;
              //   // this.active = i;
              this.aaa = this.swiperList[i].name;
              // console.log(i);
              // let imgDomArr = $(".lunbo > div > div .img");
              // let image1 = require("../../assets/images/small_yellow.png");
              // let image2 = require("../../assets/images/big_purple.png");
              // let image3 = require("../../assets/images/small_bink.png");
              // $(imgDomArr[i - 1]).css({
              //   backgroundImage: "url(" + image1 + ")"
              // });
              // $(imgDomArr[i]).css({
              //   backgroundImage: "url(" + image2 + ")"
              // });
              // $(imgDomArr[i + 1]).css({
              //   backgroundImage: "url(" + image3 + ")"
              // });
            }
          }
        }
      }
    };
  },
  created() {
    this.gettoken();
  },
  mounted() {
    // let i=this.$refs.mySwiper.swiper.activeIndex
    // console.log('mo' + i)
    this.aaa = "肤质";
    
    setTimeout(() => {
      this.getrecode();
      this.getUser();
    }, 100);
  },
  methods: {
    // 看别人的
    lookother(id) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.goToHome()
        var url = this.$domain.url+"otherself?id=" + id;
        console.log(url);
        window.android.openNewPage(url);
        //  this.$router.push({
        //   path: "/otherself",
        //   query: {
        //     id: id
        //   }
        // });
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"otherself?id=" + id;
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push({
          path: "/otherself",
          query: {
            id: id
          }
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    getUser() {
      request
        .post(this.$api + "/mobile/PlusVUserListByType", {
          Type: "美肤专家认证",
          Rows: 5
        })
        .then(res => {
          this.otherinfo = res.Data;
          console.log(this.otherinfo.length);
        })
        .catch(err => {});
    },
    // 客服
    kefu() {
      window.location.href = "https://tb.53kf.com/code/app/10134076/1";
    },
    gaishan(name) {
      console.log(name);
      this.$router.push({
        path: "/advice",
        query: {
          name: name
        }
      });
    },
    gettoken() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // console.log("我是安卓");
        let result = window.android.getToken("");
        // Dialog.alert({
        //   message: "安卓返回来的token:" + result
        // }).then(() => {
        //   // on close
        // });
        window.localStorage.setItem("token", result);
      } else if (isiOS) {
        // console.log("我是要去ios");
        this.$bridge.callhandler("getToken","", response => {
          // 处理返回数据
          let token = JSON.stringify(response);
          // Dialog.alert({
          //   message: "ios返回来的token:" + token
          // }).then(() => {
          //   // on close

          // });
          window.localStorage.setItem("token", JSON.parse(token));
        });
      } else {
        // console.log("我不是安卓也不是ios,我在哪");
      }
    },
    //   返回方法
    goback() {
      // if (this.id === "0") {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        window.android.goToHome();
      } else if (isiOS) {
        console.log("我是要去ios");
        window.location.href = "mqjapp://home";
      } else {
        console.log("多余的");
        this.$router.back()
      }
      // } else {
      //   console.log("我是大于0");
      //   // window.android.closePage();
      //   // this.$router.back()
      //   var u = navigator.userAgent;
      //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      //   if (isAndroid) {
      //     console.log("我是要去安卓");
      //     window.android.closePage();
      //   } else if (isiOS) {
      //     console.log("我是要去ios");
      //     this.$router.back();
      //   } else {
      //     console.log("多余的");
      //     this.$router.back();
      //   }
      // }
    },
    getrecode() {
      request
        .post(this.$api + "/mobile/GetUserSkinReportInfoNew", {
          Id: this.id
        })
        .then(res => {
          console.log(res.Data);
          this.alllist = res.Data;
          this.id = res.Data.Id;
          // 黑眼圈判断色素型
          if (
            this.alllist.SkinPandaEye_Left_PigmentEnum != 0 ||
            this.alllist.SkinPandaEye_Right_PigmentEnum != 0
          ) {
            if (
              this.alllist.SkinPandaEye_Left_PigmentEnum == 1 ||
              this.alllist.SkinPandaEye_Right_PigmentEnum == 1
            ) {
              console.log("色素型轻度");
              this.text1 = "轻度";
              this.currentRate1 = 25;
            }
            if (
              this.alllist.SkinPandaEye_Left_PigmentEnum == 2 ||
              this.alllist.SkinPandaEye_Right_PigmentEnum == 2
            ) {
              console.log("色素型中度");
              this.text1 = "中度";
              this.currentRate1 = 50;
            }
            if (
              this.alllist.SkinPandaEye_Left_PigmentEnum == 3 ||
              this.alllist.SkinPandaEye_Right_PigmentEnum == 3
            ) {
              console.log("色素型重度");
              this.text1 = "重度";
              this.currentRate1 = 100;
            }
          } else {
            this.text1 = "无";
            this.currentRate1 = 0;
          }
          if (
            this.alllist.SkinPandaEye_Left_ArteryEnum != 0 ||
            this.alllist.SkinPandaEye_Right_ArteryEnum != 0
          ) {
            if (
              this.alllist.SkinPandaEye_Left_ArteryEnum == 1 ||
              this.alllist.SkinPandaEye_Right_ArteryEnum == 1
            ) {
              console.log("血轻度");
              this.text2 = "轻度";
              this.currentRate2 = 25;
            }
            if (
              this.alllist.SkinPandaEye_Left_ArteryEnum == 2 ||
              this.alllist.SkinPandaEye_Right_ArteryEnum == 2
            ) {
              console.log("血中度");
              this.text2 = "中度";
              this.currentRate2 = 50;
            }
            if (
              this.alllist.SkinPandaEye_Left_ArteryEnum == 3 ||
              this.alllist.SkinPandaEye_Right_ArteryEnum == 3
            ) {
              console.log("血重度");
              this.text2 = "重度";
              this.currentRate2 = 100;
            }
          } else {
            this.text2 = "无";
            this.currentRate2 = 0;
          }
          if (
            this.alllist.SkinPandaEye_Left_ShadowEnum != 0 ||
            this.alllist.SkinPandaEye_Right_ShadowEnum != 0
          ) {
            if (
              this.alllist.SkinPandaEye_Left_ShadowEnum == 1 ||
              this.alllist.SkinPandaEye_Right_ShadowEnum == 1
            ) {
              console.log("阴轻度");
              this.text3 = "轻度";
              this.currentRate3 = 25;
            }
            if (
              this.alllist.SkinPandaEye_Left_ShadowEnum == 2 ||
              this.alllist.SkinPandaEye_Right_ShadowEnum == 2
            ) {
              console.log("阴中度");
              this.text3 = "中度";
              this.currentRate3 = 50;
            }
            if (
              this.alllist.SkinPandaEye_Left_ShadowEnum == 3 ||
              this.alllist.SkinPandaEye_Right_ShadowEnum == 3
            ) {
              console.log("阴重度");
              this.text3 = "重度";
              this.currentRate3 = 100;
            }
          } else {
            this.text3 = "无";
            this.currentRate3 = 0;
          }
          //  黑眼圈历史
          if (
            this.alllist.SkinPandaEye_Left_PigmentHistory != 0 ||
            this.alllist.SkinPandaEye_Right_PigmentHistory != 0
          ) {
            if (
              this.alllist.SkinPandaEye_Left_PigmentHistory == 1 ||
              this.alllist.SkinPandaEye_Right_PigmentHistory == 1
            ) {
              console.log("色素型轻度");
              this.text4 = "轻度";
              this.currentRate4 = 25;
            }
            if (
              this.alllist.SkinPandaEye_Left_PigmentHistory == 2 ||
              this.alllist.SkinPandaEye_Right_PigmentHistory == 2
            ) {
              console.log("色素型中度");
              this.text4 = "中度";
              this.currentRate4 = 50;
            }
            if (
              this.alllist.SkinPandaEye_Left_PigmentHistory == 3 ||
              this.alllist.SkinPandaEye_Right_PigmentHistory == 3
            ) {
              console.log("色素型重度");
              this.text4 = "重度";
              this.currentRate4 = 100;
            }
          } else {
            this.text4 = "无";
            this.currentRate4 = 0;
          }
          if (
            this.alllist.SkinPandaEye_Left_ArteryHistory != 0 ||
            this.alllist.SkinPandaEye_Right_ArteryHistory != 0
          ) {
            if (
              this.alllist.SkinPandaEye_Left_ArteryHistory == 1 ||
              this.alllist.SkinPandaEye_Right_ArteryHistory == 1
            ) {
              console.log("血轻度");
              this.text5 = "轻度";
              this.currentRate5 = 25;
            }
            if (
              this.alllist.SkinPandaEye_Left_ArteryHistory == 2 ||
              this.alllist.SkinPandaEye_Right_ArteryHistory == 2
            ) {
              console.log("血中度");
              this.text5 = "中度";
              this.currentRate5 = 50;
            }
            if (
              this.alllist.SkinPandaEye_Left_ArteryHistory == 3 ||
              this.alllist.SkinPandaEye_Right_ArteryHistory == 3
            ) {
              console.log("血重度");
              this.text5 = "重度";
              this.currentRate5 = 100;
            }
          } else {
            this.text5 = "无";
            this.currentRate5 = 0;
          }
          if (
            this.alllist.SkinPandaEye_Left_ShadowHistory != 0 ||
            this.alllist.SkinPandaEye_Right_ShadowHistory != 0
          ) {
            if (
              this.alllist.SkinPandaEye_Left_ShadowHistory == 1 ||
              this.alllist.SkinPandaEye_Right_ShadowHistory == 1
            ) {
              console.log("阴轻度");
              this.text6 = "轻度";
              this.currentRate6 = 25;
            }
            if (
              this.alllist.SkinPandaEye_Left_ShadowHistory == 2 ||
              this.alllist.SkinPandaEye_Right_ShadowHistory == 2
            ) {
              console.log("阴中度");
              this.text6 = "中度";
              this.currentRate6 = 50;
            }
            if (
              this.alllist.SkinPandaEye_Left_ShadowHistory == 3 ||
              this.alllist.SkinPandaEye_Right_ShadowHistory == 3
            ) {
              console.log("阴重度");
              this.text6 = "重度";
              this.currentRate6 = 100;
            }
          } else {
            this.text6 = "无";
            this.currentRate6 = 0;
          }
          var a = this.alllist.SkinPandaEye_Left_PigmentEnum;
          var b = this.alllist.SkinPandaEye_Right_PigmentEnum;
          var c = this.alllist.SkinPandaEye_Left_ArteryEnum;
          var d = this.alllist.SkinPandaEye_Right_ArteryEnum;
          var e = this.alllist.SkinPandaEye_Left_ShadowEnum;
          var f = this.alllist.SkinPandaEye_Right_ShadowEnum;
          console.log(a, b, c, d, e, f);
          var arr = [];
          arr.push(a);
          arr.push(b);
          arr.push(c);
          arr.push(d);
          arr.push(e);
          arr.push(f);
          let arr2 = arr.sort();
          console.log(arr2);
          console.log(arr2[arr2.length - 1]);
          this.maxblack = arr2[arr2.length - 1];
          let swiperList = [];
          // let num = 0;
          for (let i = 0; i < this.filterArr.length; i++) {
            let data = this.filterArr[i];
            for (var key in this.alllist) {
              let obj = this.alllist[key];
              if (data.key == key) {
                if (obj != 0 || obj != "" || key == "SkinTypeEnum") {
                  swiperList.push({});
                  swiperList[swiperList.length - 1][key] = obj;
                  swiperList[swiperList.length - 1]["name"] = data.name;
                  swiperList[swiperList.length - 1]["img"] = data.img;
                  swiperList[swiperList.length - 1]["backimg"] = data.backimg;
                } else {
                  continue;
                }
              }
            }
          }
          // console.log(swiperList);
          this.swiperList = swiperList;
          //假数据开始
          // this.alllist.SkinColorLevel_Score = 16;
          // this.alllist.SkinColorHueDelta_Score = 16;
          // this.alllist.SkinType_Score = 16;
          // this.alllist.SkinBlackHeads_Score = 16;
          // this.alllist.PoresHave_Score = 16;
          // this.alllist.SkinPimple_Score = 16;
          // this.alllist.SkinMole_Score = 16;
          // this.alllist.SkinRosacea_Score = 16;
          // this.alllist.SkinCrowsFeed_Left_Score = 16;
          // this.alllist.SkinCrowsFeed_Right_Score = 16;
          // this.alllist.SkinNasolabialFolds_Left_Score = 16;
          // this.alllist.SkinNasolabialFolds_Right_Score = 16;
          // this.alllist.SkinEyeFineLine_Left_Score = 16;
          // this.alllist.SkinEyeFineLine_Right_Score = 16;
          // this.alllist.SkinForeHeadWrinkle_Score = 16;
          // this.alllist.SkinEyeWrinkle_Right_Score = 16;
          // this.alllist.SkinEyeWrinkle_Left_Score = 16;
          // this.alllist.SkinSpot_Score = 16;
          // this.alllist.SkinAcne_Score = -6;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分享方法
    towechat() {
      console.log(window.location.href + "?id=" + this.id);

      var name = "肤质报告请查收~";
      var description = "关注细节,才能变得更精致哦~";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'wechat'
        // }
        // console.log(data)
        window.android.shareToWechat(
          window.location.href + "?id=" + this.id,
          name,
          description,
          "wechat"
        );
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        var params = {
          address: window.location.href,
          name: name,
          description: description,
          type: "wechat"
        };

        //  console.log(params)
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          // 处理返回数据
          //   Dialog.alert({
          //   message: "ios收到通知后才会触发的" + JSON.stringify(data)
          // }).then(() => {
          //   // on close
          // });
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
      var name = "肤质报告请查收~";
      var description = "关注细节,才能变得更精致哦~";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.shareToWechat(window.location.href,name,description,'朋友圈')
        //  var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'FriendCircle'
        // }
        // console.log(data)
        window.android.shareToWechat(
          window.location.href + "?id=" + this.id,
          name,
          description,
          "FriendCircle"
        );
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        //  window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'朋友圈');
        var params = {
          address: window.location.href,
          name: name,
          description: description,
          type: "FriendCircle"
        };
        console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          // 处理返回数据
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.towechat {
  width: 100%;
  height: 174 / @base;
  padding: 20 / @base;
  display: flex;
  flex-wrap: wrap;
  .fenkuai-son {
    width: 70 / @base;
    height: 70 / @base;
    text-align: center;
    margin-right: 10 / @base;
  }
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56 / @base;
  font-size: 18px;
  color: #252525;
  letter-spacing: 0 / @base;
  z-index: 11;
  background: white;
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width:auto;
    height: 21/ @base;
    background-size: 100% 100%;
  }
  i {
    position: absolute;
    top: 18 / @base;
    right: 17 / @base;
    // width: 15 / @base;
    // height: 15 / @base;
    font-size: 20px;
    // font-weight: bold;
    // background-size: 100% 100%;
  }
  .img3 {
    position: absolute;
    top: 21 / @base;
    right: 50 / @base;
    width: 15 / @base;
    height: 14 / @base;
    background-size: 100% 100%;
  }
}
.jicheng {
  width: 100%;
  height: 56 / @base;
  margin-bottom: 4px;
}
// fenshu
.gradebox {
  box-sizing: border-box;
  position: relative;
  // display: flex;
  // width: 318 / @base;
  width: auto;
  height: 60 / @base;
  background-color: #ffffff;
  margin: 0 17 / @base 0 40 / @base;
  box-shadow: 0 / @base 6 / @base 13 / @base 0 / @base rgba(89, 67, 104, 0.28);
  // opacity: 0.28;
  border-radius: 8 / @base;
  img {
    opacity: 1;
    position: absolute;
    left: -25 / @base;
    top: 5 / @base;
    width: 50 / @base;
    height: 50 / @base;
    border-radius: 50%;
    box-shadow: 0 / @base 6 / @base 13 / @base 0 / @base rgba(89, 67, 104, 0.28);
  }
  .gradebox_left {
    margin-left: 43 / @base;
    .gradebox_left_top {
      position: absolute;
      top: 13 / @base;
      left: 43 / @base;
      // margin-top: 13 / @base;
      font-size: 20px;
      font-weight: bold;
      color: #2e2e2e;
      line-height: 20 / @base;
      letter-spacing: 0 / @base;
      // font-family: "PingFangBold";
    }
    .gradebox_left_bottom {
      position: absolute;
      bottom: 8 / @base;
      left: 45 / @base;
      display: flex;
      font-stretch: normal;
      // line-height: 22 / @base;
      letter-spacing: 0 / @base;
      font-size: 10px;
      font-weight: bold;
      color: #343434;
      // font-family: "PingFangRegular";
    }
  }
  .gradebox_middle {
    margin-left: 49 / @base;
    .gradebox_active_up {
      color: #8ac793 !important;
    }
    .gradebox_active_low {
      color: red !important;
    }
    .gradebox_middle_top {
      position: absolute;
      top: 14 / @base;
      left: 193 / @base;
      // margin-top: 13 / @base;
      font-size: 22px;
      // font-family: "PingFangBold";
      font-weight: bold;
      line-height: 22 / @base;
      color: #2e2e2e;
      font-stretch: normal;
      letter-spacing: 1 / @base;
    }
    .gradebox_middle_bottom {
      position: absolute;
      bottom: 8 / @base;
      left: 195 / @base;
      // margin-left: 3.5 / @base;
      // line-height: 22 / @base;
      font-size: 10px;
      font-weight: bold;
      color: #343434;
      // font-family: "PingFangRegular";
      font-stretch: normal;
    }
  }
  .gradebox_right {
    margin-left: 49 / @base;
    .gradebox_right_top {
      // margin-top: 13 / @base;
      position: absolute;
      top: 14 / @base;
      right: 25 / @base;
      // font-family: "PingFangBold";
      font-size: 22px;
      font-weight: bold;
      font-stretch: normal;
      line-height: 22 / @base;
      letter-spacing: 1 / @base;
      color: #2e2e2e;
    }
    .gradebox_right_bottm {
      position: absolute;
      bottom: 8 / @base;
      right: 27.5 / @base;
      // font-family: "PingFangRegular";
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      // line-height: 22 / @base;
      letter-spacing: 0 / @base;
      color: #343434;
      margin-left: 1 / @base;
    }
  }
}
// 主要部分
.main {
  position: relative;
  margin: 36 / @base auto 0 auto;
  width: 290 / @base;
  height: 218 / @base;
  .title_type1 {
    color: #55da6e !important;
  }
  .title_type2 {
    color: #f19235 !important;
  }
  .title_type3 {
    color: #ff0000 !important;
  }
  .main_img {
    width: 133 / @base;
    height: 218 / @base;
    margin: 0 auto;
    background: url("../../assets/images/faceface.png") no-repeat;
    background-size: 100% 100%;
  }
  .ball {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60 / @base;
    max-width: 90 / @base;
    height: 16 / @base;
    background-color: #ffffff;
    box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
      rgba(188, 161, 161, 0.51);
    border-radius: 7 / @base;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0 / @base;
    color: #666666;
    padding-left: 4 / @base;
    padding-right: 4 / @base;
  }
  .taitouwen {
    position: absolute;
    top: 33 / @base;
    left: 35 / @base;
  }
  .taitouwen_line {
    position: absolute;
    top: 41 / @base;
    left: 84 / @base;
    width: 61 / @base;
    height: 35 / @base;
    background: url(../../assets/images/taitouwen_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .fuse {
    position: absolute;
    top: 55 / @base;
    left: 22 / @base;
  }
  .fuse_line {
    position: absolute;
    top: 62 / @base;
    left: 71 / @base;
    width: 60 / @base;
    height: 18 / @base;
    background: url(../../assets/images/fuse_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .xiwen {
    position: absolute;
    top: 82 / @base;
    left: 11 / @base;
  }
  .xiwen_line {
    position: absolute;
    top: 90 / @base;
    left: 58 / @base;
    width: 82 / @base;
    height: 18 / @base;
    background: url(../../assets/images/xiwen_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .fuzhi {
    position: absolute;
    top: 197 / @base;
    left: 45 / @base;
  }
  .fuzhi_line {
    position: absolute;
    top: 165 / @base;
    left: 83 / @base;
    width: 60 / @base;
    height: 44 / @base;
    background: url(../../assets/images/fuzhi_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .heitou {
    position: absolute;
    top: 133 / @base;
    left: 11 / @base;
  }
  .heitou_line {
    position: absolute;
    top: 125 / @base;
    left: 61 / @base;
    width: 83 / @base;
    height: 22 / @base;
    background: url(../../assets/images/heitou_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .maokong {
    position: absolute;
    top: 156 / @base;
    left: 23 / @base;
  }
  .maokong_line {
    position: absolute;
    top: 139 / @base;
    left: 75 / @base;
    width: 63 / @base;
    height: 31 / @base;
    background: url(../../assets/images/maokong_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .ban {
    position: absolute;
    top: 177 / @base;
    left: 31 / @base;
  }
  .ban_line {
    position: absolute;
    top: 142 / @base;
    left: 80 / @base;
    width: 68 / @base;
    height: 47 / @base;
    background: url(../../assets/images/ban_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .doudou {
    position: absolute;
    top: 47 / @base;
    right: 21 / @base;
  }
  .doudou_line {
    position: absolute;
    top: 55 / @base;
    right: 58 / @base;
    width: 88 / @base;
    height: 16 / @base;
    background: url(../../assets/images/doudou_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .zhi {
    position: absolute;
    top: 71 / @base;
    right: 11 / @base;
  }
  .zhi_line {
    position: absolute;
    top: 71 / @base;
    right: 47 / @base;
    width: 75 / @base;
    height: 15 / @base;
    background: url(../../assets/images/zhi_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .yuweiwen {
    position: absolute;
    top: 94 / @base;
    right: 0 / @base;
  }
  .yuweiwen_line {
    position: absolute;
    top: 94 / @base;
    right: 47 / @base;
    width: 57 / @base;
    height: 5 / @base;
    background: url(../../assets/images/yuweiwen_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .heiyanquan {
    position: absolute;
    top: 107 / @base;
    left: 0 / @base;
  }
  .heiyanquan_line {
    position: absolute;
    top: 113 / @base;
    left: 49 / @base;
    width: 74 / @base;
    height: 8 / @base;
    background: url(../../assets/images/yuweiwen_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .yanwen {
    position: absolute;
    top: 115 / @base;
    right: 10 / @base;
  }
  .yanwen_line {
    position: absolute;
    top: 111 / @base;
    right: 57 / @base;
    width: 58 / @base;
    height: 18 / @base;
    background: url(../../assets/images/cuochuang_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .falingwen {
    position: absolute;
    top: 140 / @base;
    right: 19 / @base;
  }
  .falingwen_line {
    position: absolute;
    top: 136 / @base;
    right: 66 / @base;
    width: 57 / @base;
    height: 15 / @base;
    background: url(../../assets/images/falingwen_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .douyin {
    position: absolute;
    top: 165 / @base;
    right: 19 / @base;
  }

  .douyin_line {
    position: absolute;
    top: 149 / @base;
    right: 70 / @base;
    width: 60 / @base;
    height: 24 / @base;
    background: url(../../assets/images/douyin_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .meicuo {
    position: absolute;
    top: 185 / @base;
    right: 27 / @base;
  }
  .meicuo_line {
    position: absolute;
    top: 160 / @base;
    right: 80 / @base;
    width: 70 / @base;
    height: 34 / @base;
    background: url(../../assets/images/douyin_line.png) no-repeat;
    background-size: 100% 100%;
  }
}
// 轮播图部分
/deep/ .swiper-slide {
  height: 200 / @base;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
/deep/.swiper-slide .img {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 94 / @base;
  height: 130 / @base;
  // background: url('../../assets/images/small_yellow.png') no-repeat;
  // background:red;
  background-size: 100% 100%;
  .img_top {
    display: flex;
    position: absolute;
    top: 10 / @base;
    left: 7 / @base;
    color: #ffffff;
    img {
      width: 14 / @base;
      height: 14 / @base;
      background-size: 100% 100%;
      // margin-top: 3 / @base;
    }
    span {
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      color: #ffffff;
      margin-left: 5 / @base;
    }
  }
  .img_des {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 24px;
    color: #fefefe;
    // font-family: "PingFangBold";
    text-align: center;
    span {
      font-size: 12px;
      margin-top: 4 / @base;
    }
  }
  .img_bottom {
    font-size: 12px;
    color: #fefefe;
    position: absolute;
    bottom: 9 / @base;
    right: 8 / @base;
  }
}
/deep/.swiper-slide .imgb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/small_yellow.png") no-repeat;
  background-size: 100% 100%;
}
/deep/ .img_top {
  position: absolute;
  top: 0 / @base;
  left: 0 / @base;
  font-size: 10px;
  letter-spacing: 0 / @base;
  color: red;
  z-index: 2;
}
/deep/ .swiper-slide-duplicate-active img {
  height: 170 / @base;
  width: 140 / @base;
}
/deep/ .swiper-slide-active .img {
  height: 170 / @base;
  width: 140 / @base;
  position: relative;
  .imgb {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/big_purple.png") no-repeat;
    background-size: 100% 100%;
  }
  .img_des {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    span {
      font-size: 16px;
      font-weight: normal;
      color: #fefefe;
      margin-top: 8 / @base;
    }
  }
  .img_top {
    display: flex;
    position: absolute;
    top: 15 / @base;
    left: 7 / @base;
    color: #ffffff;
    img {
      width: 20 / @base;
      height: 20 / @base;
      margin-top: 0;
      background-size: 100% 100%;
    }
    span {
      font-size: 12px;
      font-weight: bold;
      font-stretch: normal;
      color: #ffffff;
      margin-left: 5 / @base;
    }
  }
  .img_bottom {
    font-size: 14px;
    color: #fefefe;
    position: absolute;
    bottom: 12 / @base;
    right: 8 / @base;
  }
}
/deep/ .swiper-button-prev {
  width: 110 / @base;
  height: 130 / @base;
  margin-top: 0;
  left: 0;
  bottom: 0 / @base;
  top: auto;
  background: none;
  // background-size: 100% 100%;
}
/deep/ .swiper-button-next {
  width: 110 / @base;
  height: 130 / @base;
  margin-top: 0;
  right: 0;
  bottom: 0 / @base;
  top: auto;
  background: none;
  // background-size: 100% 100%;
}
// /deep/.swiper-slide .img2 {
//   width: 94/@base;
//   height: 130/@base;
//   background: url('../../assets/images/big_purple.png') no-repeat;
//   background-size: 100% 100%;
// }
// /deep/.swiper-slide .img3 {
//   width: 94/@base;
//   height: 130/@base;
//   background: url('../../assets/images/small_bink.png') no-repeat;
//   background-size: 100% 100%;
// }

// 公共头部
.title {
  position: relative;
  display: flex;
  width: 100%;
  padding-left: 11 / @base;
  margin-top: 41 / @base;
  .title_right {
    font-size: 12px;
    color: #666666;
    position: absolute;
    right: 11 / @base;
    i {
      font-size: 12px;
      color: #666666;
    }
  }
  .title_active_type1 {
    background-image: linear-gradient(to right, #55da6e, #8ac793);
  }
  .title_active_type2 {
    background-image: linear-gradient(to right, #f19235, #ffb66e);
  }
  .title_active_type3 {
    background-image: linear-gradient(to right, #ff0000, #f94a4a);
  }
  .title_ball {
    margin-top: 3 / @base;
    width: 11 / @base;
    height: 10 / @base;
    background-image: linear-gradient(
        -65deg,
        #c976ff 0%,
        #d48df8 53%,
        #d898f4 77%,
        #dca2f1 100%
      ),
      linear-gradient(#ffffff, #ffffff);
    background-blend-mode: normal, normal;
    border-radius: 50%;
  }
  .title_des {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0 / @base;
    color: #272727;
    line-height: 16 / @base;
    margin-left: 10 / @base;
    margin-right: 9 / @base;
  }
  .title_fuse {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    // line-height: 40/@base;
    letter-spacing: 0 / @base;
    color: #ffffff;
    width: 35 / @base;
    height: 16 / @base;
    background-blend-mode: normal, normal;
    border-radius: 8 / @base;
  }
}
// 描述公共部分
.alldes {
  font-size: 14px;
  width: 88%;
  margin: 0 auto 29 / @base auto;
  color: #666666;
}
// 上次检测结果
.last {
  display: flex;
  padding-left: 11 / @base;
  color: #55da6e;
  div {
    text-decoration: underline;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0 / @base;
    // font-family: "PingFangBold";
  }
  i {
    font-size: 12px;
    margin-top: 3 / @base;
  }
}
// 上次时间
.last_time {
  // font-family: "PingFangRegular";
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0 / @base;
  color: #3e3e3e;
  padding-right: 16 / @base;
  text-align: right;
}
// 肤色部分
.fuse_top {
  display: flex;
  width: 100%;
  height: 37 / @base;
  margin-top: 22 / @base;
  .fuse_lightdes {
    // font-family: "PingFangRegular";
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0 / @base;
    color: #666666;
    margin-left: 12 / @base;
  }
  .fuse_lightdes_right {
    margin-left: 32 / @base;
    display: flex;
    width: 250 / @base;
    height: 37 / @base;
    .fuse_lightdes_right1 {
      position: relative;
      width: 40 / @base;
      height: 100%;
      .fuse_lightdes_right1_ball {
        position: absolute;
        top: -4 / @base;
        left: 10 / @base;
        width: 20 / @base;
        height: 20 / @base;
        border-radius: 50%;
        border: 2 / @base solid white;
        box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
          rgba(216, 216, 216, 0.6);
        background: #fff8f2;
      }
      .fuse_lightdes_right1_box {
        width: 40 / @base;
        height: 12 / @base;
        background: #fff8f2;
        border-radius: 6 / @base 0 / @base 0 / @base 6 / @base;
      }
      p {
        // font-family: "PingFangRegular";
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0 / @base;
        color: #999999;
        text-align: center;
        margin-top: 10 / @base;
      }
    }
    .fuse_lightdes_right2 {
      position: relative;
      width: 40 / @base;
      height: 100%;
      .fuse_lightdes_right2_ball {
        position: absolute;
        top: -4 / @base;
        left: 10 / @base;
        width: 20 / @base;
        height: 20 / @base;
        border-radius: 50%;
        border: 2 / @base solid white;
        box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
          rgba(216, 216, 216, 0.6);
        background: #fff5e9;
      }
      .fuse_lightdes_right2_box {
        width: 40 / @base;
        height: 12 / @base;
        background: #fff5e9;
      }
      p {
        // font-family: "PingFangRegular";
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0 / @base;
        color: #999999;
        text-align: center;
        margin-top: 10 / @base;
      }
    }
    .fuse_lightdes_right3 {
      position: relative;
      width: 40 / @base;
      height: 100%;
      .fuse_lightdes_right3_ball {
        position: absolute;
        top: -4 / @base;
        left: 10 / @base;
        width: 20 / @base;
        height: 20 / @base;
        border-radius: 50%;
        border: 2 / @base solid white;
        box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
          rgba(216, 216, 216, 0.6);
        background: #fdefd5;
      }
      .fuse_lightdes_right3_box {
        width: 40 / @base;
        height: 12 / @base;
        background: #fdefd5;
      }
      p {
        // font-family: "PingFangRegular";
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0 / @base;
        color: #999999;
        text-align: center;
        margin-top: 10 / @base;
      }
    }
    .fuse_lightdes_right4 {
      position: relative;
      width: 40 / @base;
      height: 100%;
      .fuse_lightdes_right4_ball {
        position: absolute;
        top: -4 / @base;
        left: 10 / @base;
        width: 20 / @base;
        height: 20 / @base;
        border-radius: 50%;
        border: 2 / @base solid white;
        box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
          rgba(216, 216, 216, 0.6);
        background: #f9cba7;
      }
      .fuse_lightdes_right4_box {
        width: 40 / @base;
        height: 12 / @base;
        background: #f9cba7;
      }
      p {
        // font-family: "PingFangRegular";
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0 / @base;
        color: #999999;
        text-align: center;
        margin-top: 10 / @base;
      }
    }
    .fuse_lightdes_right5 {
      position: relative;
      width: 40 / @base;
      height: 100%;
      .fuse_lightdes_right5_ball {
        position: absolute;
        top: -4 / @base;
        left: 10 / @base;
        width: 20 / @base;
        height: 20 / @base;
        border-radius: 50%;
        border: 2 / @base solid white;
        box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
          rgba(216, 216, 216, 0.6);
        background: #c38a6f;
      }
      .fuse_lightdes_right5_box {
        width: 40 / @base;
        height: 12 / @base;
        background: #c38a6f;
      }
      p {
        // font-family: "PingFangRegular";
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0 / @base;
        color: #999999;
        text-align: center;
        margin-top: 10 / @base;
      }
    }
    .fuse_lightdes_right6 {
      width: 40 / @base;
      height: 100%;
      position: relative;
      .fuse_lightdes_right6_ball {
        position: absolute;
        top: -4 / @base;
        left: 10 / @base;
        width: 20 / @base;
        height: 20 / @base;
        border-radius: 50%;
        border: 2 / @base solid white;
        box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
          rgba(216, 216, 216, 0.6);
        background-color: #b06347;
      }
      .fuse_lightdes_right6_box {
        width: 40 / @base;
        height: 12 / @base;
        background-color: #b06347;
        border-radius: 0 / @base 6 / @base 6 / @base 0 / @base;
      }
      p {
        // font-family: "PingFangRegular";
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0 / @base;
        color: #999999;
        text-align: center;
        margin-top: 10 / @base;
      }
    }
  }
}
.fuse_bottom {
  display: flex;
  margin-top: 30 / @base;
  margin-bottom: 23 / @base;
  width: 100%;
  // height: 30/@base;
  .fuse_sediao {
    line-height: 32 / @base;
    // font-family: "PingFangRegular";
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0 / @base;
    color: #666666;
    margin-left: 13 / @base;
  }
  .fuse_sediao_right {
    width: 207 / @base;
    height: 32 / @base;
    margin-left: 50 / @base;
    display: flex;
    justify-content: space-between;
    .sediao_active {
      color: #666666;
      opacity: 0.53;
      background-image: linear-gradient(90deg, #9441ff 0%, #eb9fdf 100%),
        linear-gradient(#6b35bd, #6b35bd);
    }
    .fuse_sediao_right_ball {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32 / @base;
      height: 32 / @base;
      border-radius: 50%;
      background-color: #f6f6f6;
      box-shadow: 0 / @base 0 / @base 6 / @base 0 / @base
        rgba(162, 162, 162, 0.35);
      font-size: 10px;
      // font-family: "PingFangRegular";
      font-weight: bold;
      color: #666666;
    }
  }
}

// 肤质部分
.fuzhi_main {
  position: relative;
  width: 236 / @base;
  height: 182 / @base;
  margin: 33 / @base auto 35 / @base auto;
  .fuzhi_main_line {
    position: absolute;
    left: 75 / @base;
    top: 70 / @base;
    width: 116 / @base;
    height: 42 / @base;
    background: url("../../assets/images/fuzhi_main_line.png") no-repeat;
    background-size: 100% 100%;
  }
  .fuzhi_main_type {
    position: absolute;
    left: 175 / @base;
    top: 21 / @base;
    width: 62 / @base;
    height: 84 / @base;
    img {
      width: 63 / @base;
      height: 63 / @base;
      //   box-shadow: 0/@base 2/@base 6/@base 0/@base rgba(216, 216, 216, 0.6);
      //   border: solid 1/@base #cccccc;
      border-radius: 50%;
      background-size: 100% 100%;
    }
    p {
      // font-family: "PingFangBold";
      letter-spacing: 0 / @base;
      color: #666666;
      font-size: 12px;
      text-align: center;
      margin-top: 8 / @base;
    }
  }
  .fuzhi_img {
    width: 111 / @base;
    height: 182 / @base;
    background: url("../../assets/images/faceface.png") no-repeat;
    background-size: 100% 100%;
  }
}
//毛孔部分
.maokong_main {
  position: relative;
  width: 302 / @base;
  height: 220 / @base;
  margin: 15 / @base auto 17 / @base auto;
  .maokong_img {
    position: absolute;
    top: 16 / @base;
    left: 91 / @base;
    width: 107 / @base;
    height: 176 / @base;
    background: url("../../assets/images/maokong_lian.png") no-repeat;
    background-size: 100% 100%;
  }
  .maokong_middle_qiane {
    position: absolute;
    top: 65 / @base;
    left: 119 / @base;
    width: 48 / @base;
    height: 19 / @base;
    background-size: 100% 100%;
  }
  .maokong_middle_meijian {
    position: absolute;
    top: 89 / @base;
    left: 137 / @base;
    width: 15 / @base;
    height: 33 / @base;
    background-size: 100% 100%;
  }
  .maokong_middle_youlianjia {
    position: absolute;
    top: 109 / @base;
    left: 112 / @base;
    width: 25 / @base;
    height: 17 / @base;
    background-size: 100% 100%;
  }
  .maokong_middle_zuolianjia {
    position: absolute;
    top: 109 / @base;
    right: 124 / @base;
    width: 25 / @base;
    height: 17 / @base;
    background-size: 100% 100%;
  }
  .maokong_qianexian {
    width: 87 / @base;
    height: 38 / @base;
    background-size: 100% 100%;
    position: absolute;
    top: 40 / @base;
    left: 44 / @base;
  }
  .maokong_meijianxian {
    width: 110 / @base;
    height: 48 / @base;
    background-size: 100% 100%;
    position: absolute;
    top: 48 / @base;
    right: 45 / @base;
  }
  .maokong_youlianjiaxian {
    width: 74 / @base;
    height: 52 / @base;
    background-size: 100% 100%;
    position: absolute;
    top: 119 / @base;
    left: 47 / @base;
  }
  .maokong_zuolianjiaxian {
    width: 75 / @base;
    height: 51 / @base;
    background-size: 100% 100%;
    position: absolute;
    top: 117 / @base;
    right: 57 / @base;
  }
  .maokong_qiane {
    position: absolute;
    top: 1 / @base;
    left: 1 / @base;
    width: 54 / @base;
    height: 75 / @base;
    img {
      width: 54 / @base;
      height: 54 / @base;
      background-size: 100% 100%;
    }
    p {
      font-size: 12px;
      text-align: center;
      color: #585858;
      letter-spacing: 0 / @base;
    }
  }
  .maokong_meijian {
    position: absolute;
    top: 8 / @base;
    right: 4 / @base;
    width: 57 / @base;
    height: 78 / @base;
    img {
      width: 57 / @base;
      height: 57 / @base;
      background-size: 100% 100%;
    }
    p {
      font-size: 12px;
      text-align: center;
      color: #585858;
      letter-spacing: 0 / @base;
    }
  }
  .maokong_youlianjia {
    position: absolute;
    left: 3 / @base;
    top: 140 / @base;
    width: 57 / @base;
    height: 78 / @base;
    img {
      width: 57 / @base;
      height: 57 / @base;
      background-size: 100% 100%;
    }
    p {
      font-size: 12px;
      text-align: center;
      color: #585858;
      letter-spacing: 0 / @base;
    }
  }
  .maokong_zuolianjia {
    position: absolute;
    top: 146 / @base;
    right: 20 / @base;
    width: 57 / @base;
    height: 78 / @base;
    img {
      width: 57 / @base;
      height: 57 / @base;
      background-size: 100% 100%;
    }
    p {
      font-size: 12px;
      text-align: center;
      color: #585858;
      letter-spacing: 0 / @base;
    }
  }
}

// 黑头部分
.heitoubox {
  position: relative;
  margin-bottom: 27 / @base;
  display: flex;
  align-items: center;
  margin-top: 24 / @base;
  margin-left: 12 / @base;
  margin-right: 12 / @base;
  // width: 348 / @base;
  height: 87 / @base;
  background: #f0f0f0;
  border-radius: 8 / @base;
  // opacity: 0.3;
  img {
    margin-left: 19 / @base;
    width: 40 / @base;
    height: 40 / @base;
    background-size: 100% 100%;
  }
  .heitoubox_degree {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    color: #771f72;
    margin-left: 12 / @base;
  }
  .heitoubox_num {
    position: absolute;
    right: 38 / @base;
    display: flex;
    width: 35 / @base;
    // height: 17/@base;
    // margin-left: 164 / @base;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    color: #771f72;
    letter-spacing: 0 / @base;
    span {
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 0 / @base;
      color: #771f72;
      margin-top: 7 / @base;
    }
  }
}

// 玫瑰痤疮部分
.meigui_main {
  position: relative;
  width: 328 / @base;
  height: 211 / @base;
  margin: 9 / @base auto 28 / @base auto;
  .meigui_img {
    position: absolute;
    top: 21 / @base;
    left: 27 / @base;
    width: 107 / @base;
    height: 176 / @base;
    background: url("../../assets/images/faceface.png") no-repeat;
    background-size: 100% 100%;
  }
  .meigui_qiane {
    position: absolute;
    top: 7 / @base;
    right: 156 / @base;
    width: 36 / @base;
    height: 54 / @base;
    img {
      width: 36 / @base;
      height: 36 / @base;
      background-size: 100% 100%;
      box-shadow: 5 / @base -3 / @base 10 / @base 0 / @base rgba(0, 0, 0, 0.23);
      border-radius: 50%;
    }
    p {
      text-align: center;
      margin-top: 4 / @base;
      font-size: 10px;
      color: #666666;
    }
  }
  .meigui_meijian {
    position: absolute;
    top: 1 / @base;
    right: 87 / @base;
    width: 42 / @base;
    height: 60 / @base;
    img {
      width: 42 / @base;
      height: 42 / @base;
      background-size: 100% 100%;
      border-radius: 50%;
      box-shadow: 7 / @base -2 / @base 10 / @base 0 / @base rgba(0, 0, 0, 0.23);
    }
    p {
      text-align: center;
      margin-top: 4 / @base;
      font-size: 10px;
      color: #666666;
    }
  }
  .meigui_zuolianjia {
    position: absolute;
    top: 29 / @base;
    right: 28 / @base;
    width: 51 / @base;
    height: 67 / @base;
    img {
      width: 51 / @base;
      height: 51 / @base;
      background-size: 100% 100%;
      box-shadow: 8 / @base 0 / @base 10 / @base 0 / @base rgba(0, 0, 0, 0.23);
      border-radius: 50%;
    }
    p {
      text-align: center;
      margin-top: 4 / @base;
      font-size: 10px;
      color: #666666;
    }
  }
  .meigui_youlianjia {
    position: absolute;
    top: 105 / @base;
    right: 26 / @base;
    width: 56 / @base;
    height: 72 / @base;
    img {
      width: 56 / @base;
      height: 56 / @base;
      background-size: 100% 100%;
      box-shadow: 5 / @base 7 / @base 10 / @base 0 / @base rgba(0, 0, 0, 0.23);
      border-radius: 50%;
    }
    p {
      text-align: center;
      margin-top: 4 / @base;
      font-size: 10px;
      color: #666666;
    }
  }
  .meigui_xiaba {
    position: absolute;
    top: 131 / @base;
    right: 100 / @base;
    width: 63 / @base;
    height: 79 / @base;
    img {
      width: 63 / @base;
      height: 63 / @base;
      background-size: 100% 100%;
      box-shadow: 5 / @base 7 / @base 10 / @base 0 / @base rgba(0, 0, 0, 0.23);
      border-radius: 50%;
    }
    p {
      text-align: center;
      margin-top: 4 / @base;
      font-size: 10px;
      color: #666666;
    }
  }
}

// 皱纹部分
.zhouwen_main {
  position: relative;
  width: 269 / @base;
  height: 188 / @base;
  margin: 24 / @base auto 36 / @base auto;
  .fontfont {
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    color: #999999;
  }
  .zhouwen_img {
    position: absolute;
    top: 5 / @base;
    left: 86 / @base;
    width: 97 / @base;
    height: 177 / @base;
    background: url("../../assets/images/zhouwenface.png") no-repeat;
    background-size: 100% 100%;
  }
  .zhouwen_falingwen {
    position: absolute;
    top: 105 / @base;
    left: 114 / @base;
    width: 56 / @base;
    height: 26 / @base;
    background-size: 100% 100%;
  }
  .zhouwen_taitouwen {
    position: absolute;
    top: 60 / @base;
    left: 116 / @base;
    width: 38 / @base;
    height: 14 / @base;
    background-size: 100% 100%;
  }
  .zhouwen_youyanwen {
    position: absolute;
    top: 84 / @base;
    left: 107 / @base;
    width: 20 / @base;
    height: 22 / @base;
    background-size: 100% 100%;
  }
  .zhouwen_youyuweiwen {
    position: absolute;
    top: 91 / @base;
    left: 95 / @base;
    width: 11 / @base;
    height: 9 / @base;
    background-size: 100% 100%;
  }
  .zhouwen_zuoyanwen {
    position: absolute;
    top: 85 / @base;
    left: 142 / @base;
    width: 20 / @base;
    height: 22 / @base;
    background-size: 100% 100%;
  }
  .zhouwen_zuoyuweiwen {
    position: absolute;
    top: 91 / @base;
    left: 164 / @base;
    width: 11 / @base;
    height: 9 / @base;
    background-size: 100% 100%;
  }
  .youyuweiwen_line2 {
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 37 / @base;
    width: 102 / @base;
    height: 63 / @base;
  }
  .youyanwen_line2 {
    background-size: 100% 100%;
    position: absolute;
    left: 5 / @base;
    top: 91 / @base;
    width: 120 / @base;
    height: 40 / @base;
  }
  .youlianfalingwen_line2 {
    background-size: 100% 100%;
    position: absolute;
    left: 13 / @base;
    top: 122 / @base;
    width: 111 / @base;
    height: 66 / @base;
  }
  .taitouwen_line2 {
    background-size: 100% 100%;
    position: absolute;
    right: 26 / @base;
    top: 0 / @base;
    width: 111 / @base;
    height: 66 / @base;
  }
  .zuoyuweiwen_line2 {
    background-size: 100% 100%;
    position: absolute;
    right: 0 / @base;
    top: 40 / @base;
    width: 102 / @base;
    height: 60 / @base;
  }
  .zuoyanwen_line2 {
    background-size: 100% 100%;
    position: absolute;
    right: 0 / @base;
    top: 90 / @base;
    width: 124 / @base;
    height: 40 / @base;
  }
  .zuolianfalingwen_line2 {
    background-size: 100% 100%;
    position: absolute;
    right: 12 / @base;
    top: 123 / @base;
    width: 111 / @base;
    height: 65 / @base;
  }
  .font_taitouwen {
    position: absolute;
    top: 21 / @base;
    right: 65 / @base;
    transform: rotate(-29deg);
  }
  .font_youyanwen {
    position: absolute;
    top: 95 / @base;
    left: 44 / @base;
  }
  .font_youlianfalingwen {
    position: absolute;
    top: 126 / @base;
    left: 47 / @base;
    transform: rotate(-25deg);
  }
  .font_youyuweiwen {
    position: absolute;
    top: 56 / @base;
    left: 45 / @base;
    transform: rotate(29deg);
  }
  .font_zuoyuweiwen {
    position: absolute;
    top: 60 / @base;
    right: 42 / @base;
    transform: rotate(-25deg);
  }
  .font_zuoyanwen {
    position: absolute;
    top: 95 / @base;
    right: 44 / @base;
  }
  .font_zuolianfalingwen {
    position: absolute;
    top: 126 / @base;
    right: 49 / @base;
    transform: rotate(25deg);
  }
}

// 黑眼圈部分
.blackcicle {
  position: relative;
  width: 270 / @base;
  height: 75 / @base;
  background: url("../../assets/images/blackcicle.png") no-repeat;
  background-size: 100% 100%;
  margin: 28 / @base auto 13 / @base auto;

  .blackcicle_eye {
    position: absolute;
    top: 34 / @base;
    left: 51 / @base;
    width: 167 / @base;
    height: 23 / @base;
    background: url("../../assets/images/blackcicle_eye.png") no-repeat;
    background-size: 100% 100%;
  }
  .blackcicle_sesuxing {
    background-size: 100% 100%;
    width: 167 / @base;
    height: 23 / @base;
    position: absolute;
    top: 34 / @base;
    left: 51 / @base;
  }
  .blackcicle_xueguanxing {
    background-size: 100% 100%;
    width: 167 / @base;
    height: 25 / @base;
    position: absolute;
    top: 42 / @base;
    right: 51 / @base;
  }
  .blackcicle_yinyingxing {
    background-size: 100% 100%;
    width: 167 / @base;
    height: 35 / @base;
    position: absolute;
    top: 36 / @base;
    right: 52 / @base;
  }
}
.blackcicle_p {
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0 / @base;
  color: #8c26cc;
  margin-bottom: 27 / @base;
}
.black_box {
  display: flex;
  justify-content: space-between;
  width: 256 / @base;
  // height: 75 / @base;
  margin: 0 auto 27 / @base auto;
  .black_box_item1 {
    position: relative;
    width: 53 / @base;
    height: 100%;
    /deep/ .van-circle__text {
      color: #eb517c;
      font-size: 10px;
    }
    div {
      width: 53 / @base;
      height: 53 / @base;
    }
    p {
      margin-top: 7 / @base;
      color: #828282;
      font-size: 10px;
      letter-spacing: 0 / @base;
      text-align: center;
    }
  }
  .black_box_item2 {
    position: relative;
    width: 53 / @base;
    height: 100%;
    /deep/ .van-circle__text {
      color: #f5bc60;
      font-size: 10px;
    }
    div {
      width: 53 / @base;
      height: 53 / @base;
    }
    p {
      margin-top: 7 / @base;
      color: #828282;
      font-size: 10px;
      letter-spacing: 0 / @base;
      text-align: center;
    }
  }
  .black_box_item3 {
    position: relative;
    width: 53 / @base;
    height: 100%;
    /deep/ .van-circle__text {
      color: #46b1a6;
      font-size: 10px;
    }
    div {
      width: 53 / @base;
      height: 53 / @base;
    }
    p {
      margin-top: 7 / @base;
      color: #828282;
      font-size: 10px;
      letter-spacing: 0 / @base;
      text-align: center;
    }
  }
}

// 专家部分
.zixunbox {
  position: relative;
  width: 100%;
  margin-top: 32 / @base;
  padding-left: 13 / @base;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 47 / @base;
  .zixun_item {
    flex-shrink: 0;
    position: relative;
    width: 100 / @base;
    box-shadow: 0px 0px 6 / @base 0px rgba(162, 162, 162, 0.4);
    border-radius: 8px;
    text-align: center;
    margin-right: 7 / @base;
    margin-top: 3px;
    overflow: hidden;
    .img_box {
      position: relative;
      // border-radius: 50%;
      width: 50 / @base;
      height: 50 / @base;
      // background-size: 100% 100%;
      margin: 7 / @base auto 0 auto;
      .img_big {
        border-radius: 50%;
        width: 50 / @base;
        height: 50 / @base;
      }
      .img_small {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 20 / @base;
        height: 20 / @base;
        border-radius: 50%;
        background-size: 100% 100%;
      }
    }
    .zixun_item_name {
      margin-top: 10 / @base;
      font-size: 16px;
      color: #3e3d3d;
      font-weight: bold;
      font-stretch: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
    .zixun_item_des {
      font-size: 11px;
      font-weight: bold;
      font-stretch: normal;
      color: #999999;
      margin-top: 4 / @base;
    }
    .zixun_item_anniu {
      margin: 9 / @base auto 11 / @base auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50 / @base;
      height: 20 / @base;
      background-image: linear-gradient(90deg, #9441ff 0%, #eb9fdf 100%),
        linear-gradient(#6b35bd, #6b35bd);
      background-blend-mode: normal, normal;
      border-radius: 10 / @base;
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      color: #ffffff;
    }
  }
}
</style>