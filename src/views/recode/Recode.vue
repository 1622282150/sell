<template>
  <div>
    <div class="contain">
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
      <!-- <Head color="#353535">
      肤质报告
      <span class="edit">重测</span>
      </Head>-->
      <div class="header">
        <i @click="goback" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou"></i>
        <span>肤质报告</span>
        <i
          @click="showfen = true"
          style="position:absolute;right:20px;"
          class="iconfont icon-fenxiang2"
        ></i>
      </div>
      <div class="jicheng"></div>
      <!-- 肤质cicle-->
      <div class="pie clearfix">
        <div class="age fl">
          <van-circle
            style="position:relative"
            v-model="currentRate"
            :rate="list.SkinAge"
            :speed="30"
            color="#B694E8"
          >
            <div
              style="position:absolute;top:8px;left:8px;width:84px;height:84px;border-radius:50%;border:1px solid #B694E8"
            ></div>
            <!-- <span style="font-size:40px;position:absolute;top:20%;left:27%">20</span> -->
            <span style="text-align:center;line-height:100px;font-size:40px;">{{list.SkinAge}}</span>
          </van-circle>
          <!-- <vCircle :score="score1"></vCircle> -->
          <div>肌龄</div>
        </div>
        <div class="line"></div>
        <div class="age fr">
          <van-circle
            style="position:relative"
            v-model="currentRate2"
            :rate="list.SkinScore"
            :speed="30"
            color="#B694E8"
          >
            <div
              style="position:absolute;top:8px;left:8px;width:84px;height:84px;border-radius:50%;border:1px solid #B694E8"
            ></div>
            <!-- <span style="font-size:40px;position:absolute;top:20%;left:27%">20</span> -->
            <span style="text-align:center;line-height:100px;font-size:40px;">{{list.SkinScore}}</span>
          </van-circle>
          <!-- <vCircle :score="score2"></vCircle> -->
          <div>分数</div>
        </div>
      </div>
      <!-- 综合分析 -->
      <div class="zongfen">
        <p>综合分析:</p>
        <div>{{list.SkinScoreReport}}</div>
      </div>
      <div class="bu"></div>
      <div class="main">
        <Fuse name="肤色" :grade="list.SkinColorLevelEnum">
          <div class="item1">
            <div class="color">
              <ul>
                <li>
                  <div class="li_title">白皙</div>
                  <div class="line"></div>
                  <div class="li_box">
                    <div class="box_item">
                      <div :class="yanse===20?'ball_active1':''" class="bzhongxingball"></div>
                      <p :class="yanse===20?'ball_active':''">中性</p>
                    </div>
                    <div class="box_item">
                      <div class="bpianhongball" :class="yanse===22?'ball_active1':''"></div>
                      <p :class="yanse===22?'ball_active':''">偏红</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===21?'ball_active1':''" class="bpianhuangball"></div>
                      <p :class="yanse===21?'ball_active':''">偏黄</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li_title">透白</div>
                  <div class="line"></div>
                  <div class="li_box">
                    <div class="box_item">
                      <div class="tzhongxingball" :class="yanse===10?'ball_active1':''"></div>
                      <p :class="yanse===10?'ball_active':''">中性</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===12?'ball_active1':''" class="tpianhongball"></div>
                      <p :class="yanse===12?'ball_active':''">偏红</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===11?'ball_active1':''" class="tpianhuangball"></div>
                      <p :class="yanse===11?'ball_active':''">偏黄</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li_title">自然</div>
                  <div class="li_box">
                    <div class="box_item">
                      <div :class="yanse===30?'ball_active1':''" class="zzhongxingball"></div>
                      <p :class="yanse===30?'ball_active':''">中性</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===32?'ball_active1':''" class="zpianhongball"></div>
                      <p :class="yanse===32?'ball_active':''">偏红</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===31?'ball_active1':''" class="zpianhuangball"></div>
                      <p :class="yanse===31?'ball_active':''">偏黄</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li_title">小麦</div>
                  <div class="line"></div>
                  <div class="li_box">
                    <div class="box_item">
                      <div :class="yanse===40?'ball_active1':''" class="xzhongxingball"></div>
                      <p :class="yanse===40?'ball_active':''">中性</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===42?'ball_active1':''" class="xpianhongball"></div>
                      <p :class="yanse===42?'ball_active':''">偏红</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===41?'ball_active1':''" class="xpianhuangball"></div>
                      <p :class="yanse===41?'ball_active':''">偏黄</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li_title">暗沉</div>
                  <div class="line"></div>
                  <div class="li_box">
                    <div class="box_item">
                      <div :class="yanse===50?'ball_active1':''" class="azhongxingball"></div>
                      <p :class="yanse===50?'ball_active':''">中性</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===52?'ball_active1':''" class="zpianhongball"></div>
                      <p :class="yanse===52?'ball_active':''">偏红</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===51?'ball_active1':''" class="apianhuangball"></div>
                      <p :class="yanse===51?'ball_active':''">偏黄</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li_title">黝黑</div>
                  <div class="li_box">
                    <div class="box_item">
                      <div :class="yanse===60?'ball_active1':''" class="yzhongxingball"></div>
                      <p :class="yanse===60?'ball_active':''">中性</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===62?'ball_active1':''" class="ypianhongball"></div>
                      <p :class="yanse===62?'ball_active':''">偏红</p>
                    </div>
                    <div class="box_item">
                      <div :class="yanse===61?'ball_active1':''" class="ypianhuangball"></div>
                      <p :class="yanse===61?'ball_active':''">偏黄</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="des">
              <div class="pic1" v-show="yanse===20">
                <img src="../../assets/images/白皙-中性.png" />白皙-中性
              </div>
              <div class="pic1" v-show="yanse===22">
                <img src="../../assets/images/白皙-偏红.png" />白皙-偏红
              </div>
              <div class="pic1" v-show="yanse===21">
                <img src="../../assets/images/白皙-偏黄.png" />白皙-偏黄
              </div>
              <div class="pic1" v-show="yanse===10">
                <img src="../../assets/images/透白-中性.png" />透白-中性
              </div>
              <div class="pic1" v-show="yanse===12">
                <img src="../../assets/images/透白-偏红.png" />透白-偏红
              </div>
              <div class="pic1" v-show="yanse===11">
                <img src="../../assets/images/透白-偏黄.png" />透白-偏黄
              </div>
              <div class="pic1" v-show="yanse===30">
                <img src="../../assets/images/自然-中性.png" />自然-中性
              </div>
              <div class="pic1" v-show="yanse===32">
                <img src="../../assets/images/自然-偏红.png" />自然-偏红
              </div>
              <div class="pic1" v-show="yanse===31">
                <img src="../../assets/images/自然-偏黄.png" />自然-偏黄
              </div>
              <div class="pic1" v-show="yanse===40">
                <img src="../../assets/images/小麦-中性.png" />小麦-中性
              </div>
              <div class="pic1" v-show="yanse===42">
                <img src="../../assets/images/小麦-偏红.png" />小麦-偏红
              </div>
              <div class="pic1" v-show="yanse===41">
                <img src="../../assets/images/小麦-偏黄.png" />小麦-偏黄
              </div>
              <div class="pic1" v-show="yanse===50">
                <img src="../../assets/images/暗沉-中性.png" />暗沉-中性
              </div>
              <div class="pic1" v-show="yanse===52">
                <img src="../../assets/images/暗沉-偏红.png" />暗沉-偏红
              </div>
              <div class="pic1" v-show="yanse===51">
                <img src="../../assets/images/暗沉-偏黄.png" />暗沉-偏黄
              </div>
              <div class="pic1" v-show="yanse===60">
                <img src="../../assets/images/黝黑-中性.png" />黝黑-中性
              </div>
              <div class="pic1" v-show="yanse===62">
                <img src="../../assets/images/黝黑-偏红.png" />黝黑-偏红
              </div>
              <div class="pic1" v-show="yanse===61">
                <img src="../../assets/images/黝黑-偏黄.png" />黝黑-偏黄
              </div>
              <div class="content">{{list.SkinColorLevel}}</div>
            </div>
          </div>
        </Fuse>
        <div class="xian"></div>
        <Fuse name="皮肤" :grade="list.SkinTypeEnum">
          <div class="item2">
            <div class="des">
              <div v-if="list.SkinTypeEnum==0" class="pic1">当前为油性皮肤</div>
              <div v-else-if="list.SkinTypeEnum==1" class="pic2">当前为干性皮肤</div>
              <div v-else-if="list.SkinTypeEnum==2" class="pic3">当前为中性皮肤</div>
              <div v-else class="pic4">当前为混合性皮肤</div>
              <div class="content">{{list.SkinType}}</div>
            </div>
          </div>
        </Fuse>
        <div class="xian"></div>
        <Fuse name="毛孔" :grade="list.PoresHaveEnum" :isadvice="ismaokong">
          <!-- 没有毛孔问题 -->
          <div class="item3" v-show="list.PoresHaveEnum==0">
            <div class="tips">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p class="active_maokong">毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p>眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresCheeks}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
          <!-- 结果组合项12 -->
          <div class="item3" v-show="list.PoresHaveEnum==12">
            <div class="tips clearfix">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p>毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p class="active_maokong">脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p class="active_maokong">眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresCheeks}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
          <!-- 结果组合项23 -->
          <div class="item3" v-show="list.PoresHaveEnum==23">
            <div class="tips clearfix">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p>毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p class="active_maokong">眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p class="active_maokong">前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresCheeks}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
          <!-- 结果组合项13 -->
          <div class="item3" v-show="list.PoresHaveEnum==13">
            <div class="tips clearfix">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p>毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p class="active_maokong">脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p>眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p class="active_maokong">前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresCheeks}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
          <!-- 结果组合项123 -->
          <div class="item3" v-show="list.PoresHaveEnum==123">
            <div class="tips clearfix">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p>毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p class="active_maokong">脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p class="active_maokong">眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p class="active_maokong">前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresCheeks}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
          <!-- 结果组合项1脸颊 -->
          <div class="item3" v-show="list.PoresCheeks_Left&&list.PoresHaveEnum<10">
            <div class="tips clearfix">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p>毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p class="active_maokong">脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p>眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresCheeks_Left}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
          <!-- 结果组合项2眉间-->
          <div class="item3" v-show="list.PoresBetweenBrow_Have&&list.PoresHaveEnum<10">
            <div class="tips clearfix">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p>毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p class="active_maokong">眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresBetweenBrow_Have}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
          <!-- 结果组合项3前额-->
          <div class="item3" v-show="list.PoresForehead_Have&&list.PoresHaveEnum<10">
            <div class="tips clearfix">
              <div class="maokong_type">
                <img src="../../assets/images/无毛孔.png" alt />
                <p>毛孔正常</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-眉间.png" alt />
                <p>眉间</p>
              </div>
              <div class="maokong_type">
                <img src="../../assets/images/毛孔-前额.png" alt />
                <p class="active_maokong">前额</p>
              </div>
            </div>
            <div class="maokong">
              <div class="des">
                <!-- <div class="pic1">毛孔</div> -->
                <div class="content">
                  {{list.PoresForehead_Have}}
                  <!-- 设计的撒谎就 -->
                </div>
              </div>
            </div>
          </div>
        </Fuse>
        <div class="xian"></div>
        <Fuse name="黑头" :grade="list.SkinBlackEnum" :isadvice="isheitou">
          <div class="itemhei">
            <div class="heitou">
              <div class="des">
                <div class="heikuang">
                  <img v-if="list.SkinBlackEnum===0" src="../../assets/images/程度-无.png" alt />
                  <img v-else-if="list.SkinBlackEnum===1" src="../../assets/images/程度条-轻度.png" alt />
                  <img v-else src="../../assets/images/程度条-重度.png" alt />
                </div>
                <!-- <div class="pic1">黑头</div> -->
                <div class="content">{{list.SkinBlackHeads}}</div>
              </div>
            </div>
          </div>
        </Fuse>
        <div class="xian"></div>
        <Fuse name="皱纹" :grade="list.SkinWrinkleEnum" :isadvice='iszhouwen'>
          <div class="item4">
            <!-- 没有皱纹问题 -->
            <div class="zhouwen" v-show="list.SkinWrinkleEnum ==0 ">
              <div class="zhouwen_left">
                <img src="../../assets/images/无皱纹女孩.png" alt />
              </div>
              <div class="zhouwen_right">
                <p>没有皱纹</p>
                <div>{{list.SkinWrinkle}}</div>
              </div>
            </div>
            <!-- 抬头纹 -->
            <div class="zhouwen" v-show="list.SkinForeHeadWrinkle">
              <div class="zhouwen_left">
                <img src="../../assets/images/抬头纹女孩.png" alt />
              </div>
              <div class="zhouwen_right">
                <p>抬头纹</p>
                <div>{{list.SkinForeHeadWrinkle}}</div>
              </div>
            </div>
            <!--  鱼尾纹-->
            <div class="zhouwen" v-show="list.SkinCrowsFeed_Left">
              <div class="zhouwen_left">
                <img src="../../assets/images/鱼尾纹纹女孩.png" alt />
              </div>
              <div class="zhouwen_right">
                <p>鱼尾纹</p>
                <div>{{list.SkinCrowsFeed_Left}}</div>
              </div>
            </div>
            <!-- 法令纹 -->
            <div class="zhouwen" v-show="list.SkinNasolabialFolds_Left">
              <div class="zhouwen_left">
                <img src="../../assets/images/法令纹纹女孩.png" alt />
              </div>
              <div class="zhouwen_right">
                <p>法令纹</p>
                <div>{{list.SkinNasolabialFolds_Left}}</div>
              </div>
            </div>
            <!-- 眼纹 -->
            <div class="zhouwen" v-show="list.SkinEyeWrinkle_Left">
              <div class="zhouwen_left">
                <img src="../../assets/images/眼纹女孩.png" alt />
              </div>
              <div class="zhouwen_right">
                <p>眼纹问题</p>
                <div>{{list.SkinEyeWrinkle_Left}}</div>
              </div>
            </div>
            <!-- <div class="zhouwen clearfix">
              <div class="left fl">
                <h3>左眼-眼纹</h3>
                <div class="content">皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤</div>
              </div>
              <div class="middle">
                <img src="../../assets/images/recode_rw.png" alt />
              </div>
              <div class="right fr">
                <h3>左眼-眼纹</h3>
                <div class="content">皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤皮肤</div>
              </div>
            </div>-->
          </div>
        </Fuse>
        <div class="xian"></div>
        <Fuse name="瑕疵" :grade="list.SkinPimpleEnum" :isadvice='isxiaci'>
          <div class="item5">
            <div class="pad clearfix">
              <div class="left">
                <div class="head">
                  <div class="quan"></div>
                  <span style="font-weight: 550;">痘痘</span>
                </div>
                <div v-show="list.SkinPimpleEnum != 0" class="jibie">
                  <div class="jibie_son">
                    <img src="../../assets/images/痘痘-轻度.png" alt />
                    <p :class="list.SkinPimpleEnum==1?'active':''">轻度</p>
                  </div>
                  <div class="jibie_son">
                    <img src="../../assets/images/痘痘-中度.png" alt />
                    <p :class="list.SkinPimpleEnum==2?'active':''">中度</p>
                  </div>
                  <div class="jibie_son">
                    <img src="../../assets/images/痘痘-重度.png" alt />
                    <p :class="list.SkinPimpleEnum==3?'active':''">重度</p>
                  </div>
                </div>
                <div class="xiaci_middle">{{list.SkinPimple}}</div>
                <div class="bottom">
                  <div class="quan"></div>
                  <span style="font-weight: 550;">痣</span>
                  <p>{{list.SkinMole}}</p>
                </div>
              </div>
            </div>
          </div>
        </Fuse>
        <div class="xian"></div>
        <Fuse name="黑眼圈" :grade="list.SkinPandaEyeEnum" :isadvice="isblack">
          <div class="item6">
            <div class="black_eyes">
              <img v-if="list.SkinPandaEyeEnum==0" src="../../assets/images/无黑眼圈女孩.png" alt />
              <img v-else src="../../assets/images/recode_black.png" alt />
              <div class="black_right">
                <div class="black_right_top">
                  <div class="right_item">
                    <div>
                      <van-circle
                        v-model="currentRateA"
                        color="#C0B095"
                        layer-color="#E5E5E5"
                        :rate="ratese"
                        :text="sesuxing"
                        :stroke-width="120"
                        size="50px"
                      />
                    </div>

                    <p>色素型</p>
                  </div>
                  <div class="right_item">
                    <div>
                      <van-circle
                        v-model="currentRateB"
                        color="#B09E98"
                        layer-color="#E5E5E5"
                        :rate="ratexue"
                        :text="xueguanxing"
                        :stroke-width="120"
                        size="50px"
                      />
                    </div>
                    <p>血管型</p>
                  </div>
                  <div class="right_item">
                    <div>
                      <van-circle
                        v-model="currentRateC"
                        color="#BBBBBB"
                        layer-color="#E5E5E5"
                        :rate="rateyin"
                        :text="yinyingxing"
                        :stroke-width="120"
                        size="50px"
                      />
                    </div>
                    <p>阴影型</p>
                  </div>
                </div>
                <div
                  class="black_right_bottom"
                >{{list.SkinPandaEye}}{{list.SkinPandaEye_Left_Shadow}}{{list.SkinPandaEye_Left_Artery}}{{list.SkinPandaEye_Left_Pigment}}</div>
              </div>
            </div>
          </div>
        </Fuse>
        <div class="xian"></div>
        <Fuse name="玫瑰痤疮" :grade="list.SkinRosaceaEnum" :isadvice="isrose">
          <!-- 为0  没有痤疮 -->
          <div v-show="list.SkinRosaceaEnum===0" class="item7">
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 为一 鼻翼 -->
          <div v-show="list.SkinRosaceaEnum<10&&list.SkinRosaceaNose" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosaceaNose}}</p>
          </div>
          <!-- 为2脸颊 -->
          <div v-show="list.SkinRosaceaEnum<10&&list.SkinRosaceaLeftcheek" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosaceaLeftcheek}}</p>
          </div>
          <!-- wei为3前额 -->
          <div v-show="list.SkinRosaceaEnum<10&&list.SkinRosaceaForehead" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosaceaForehead}}</p>
          </div>
          <!-- 4为下巴 -->
          <div v-show="list.SkinRosaceaEnum<10&&list.SkinRosaceaChin" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosaceaChin}}</p>
          </div>
          <!-- 12 鼻翼和脸颊 -->
          <div v-show="list.SkinRosaceaEnum===12" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 13 鼻翼和前额 -->
          <div v-show="list.SkinRosaceaEnum===13" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>

              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!--14 鼻翼和下巴-->
          <div v-show="list.SkinRosaceaEnum===14" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 23 脸颊和前额 -->
          <div v-show="list.SkinRosaceaEnum===23" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 24脸颊和下巴 -->
          <div v-show="list.SkinRosaceaEnum===24" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 34前额和下巴 -->
          <div v-show="list.SkinRosaceaEnum===34" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 234 脸颊前额下巴 -->
          <div v-show="list.SkinRosaceaEnum===234" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 134鼻翼前额下巴 -->
          <div v-show="list.SkinRosaceaEnum===134" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 124鼻翼脸颊下吧 -->
          <div v-show="list.SkinRosaceaEnum===124" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 123鼻翼脸颊前额 -->
          <div v-show="list.SkinRosaceaEnum===123" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
          <!-- 1234over -->
          <div v-show="list.SkinRosaceaEnum===1234" class="item7">
            <div class="rose_top">
              <div class="rose_item">
                <img src="../../assets/images/鼻翼.png" alt />
                <p>鼻翼</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/脸颊.png" alt />
                <p>脸颊</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/前额.png" alt />
                <p>前额</p>
              </div>
              <div class="rose_item">
                <img src="../../assets/images/下巴.png" alt />
                <p>下巴</p>
              </div>
            </div>
            <p class="last">{{list.SkinRosacea}}</p>
          </div>
        </Fuse>
      </div>

      <a href="mqjapp://detection" class="reset">重新检测</a>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import request from "@/utils/request";
import { Circle, Dialog } from "vant";
import Head from "../../components/Header";
import vCircle from "./Circle";
import Fuse from "./Fuse";
export default {
  components: {
    Head,
    vCircle,
    Fuse
  },
  data() {
    return {
      id: 0,
      yanse: 1,
      list: [],
      showfen: false, //分享
      currentRate: 0,
      currentRate2: 0,
      currentRateA: 0,
      currentRateB: 0,
      currentRateC: 0,
      ratese: 0,
      ratexue: 0,
      rateyin: 0,
      // score1:0,
      // score2:0,
      index: 0,
      disX: 0,
      sesuxing: "",
      xueguanxing: "",
      yinyingxing: "",
      ismaokong: "", //是否有毛孔建议
      isheitou: "",
      isblack: "", //shi否黑眼圈建议
      isrose: "", //是否有玫瑰痤疮
      iszhouwen:'',
      isxiaci:'',

    };
  },
  created() {
    this.gettoken();
  },
  mounted() {
    console.log("chang度" + window.history.length);
    console.log(this.$route.query.id);
    // this.id = this.$route.query.id;
    console.log("报告" + this.id);
    if (this.$route.query.id === undefined) {
      this.id = "0";
    } else {
      this.id = this.$route.query.id;
    }
    setTimeout(() => {
      this.getrecode();
    }, 100);
  },
  methods: {
    // gettoken
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
        this.$bridge.callhandler("getToken", "", response => {
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
    goback() {
      if (this.id === "0") {
        //
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
        }
      } else {
        console.log("我是大于0");
        // window.android.closePage();
        // this.$router.back()
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        if (isAndroid) {
          console.log("我是要去安卓");
          window.android.closePage();
        } else if (isiOS) {
          console.log("我是要去ios");
          this.$router.back();
        } else {
          console.log("多余的");
          this.$router.back();
        }
      }
    },

    // 获取肤质报告啊
    getrecode() {
      request
        .post(this.$api + "/mobile/GetUserSkinReportInfo", {
          Id: this.id
        })
        .then(res => {
          console.log(res.Data);
          this.list = res.Data;
          this.yanse = res.Data.SkinColorLevelEnum;
          // 是否有黑头建议
          if (this.list.SkinBlackEnum == 0) {
            this.isheitou = false;
          } else {
            console.log("666");
          }
          // 是否有皱纹建议
          if (this.list.SkinWrinkleEnum == 0) {
            this.iszhouwen = false;
          } else {
            console.log("666");
          }
          // 是否有瑕疵建议
          if (this.list.SkinPimpleEnum == 0) {
            this.isxiaci = false;
          } else {
            console.log("666");
          }
          //  是否有毛孔建议
          if (this.list.PoresHaveEnum == 0) {
            this.ismaokong = false;
          } else {
            console.log("666");
          }
          //  是否有黑眼圈建议isblack
          if (this.list.SkinPandaEyeEnum == 0) {
            this.isblack = false;
          } else {
            console.log("666");
          }
          //  是否有玫瑰痤疮建议list.SkinRosaceaEnum
          if (this.list.SkinRosaceaEnum == 0) {
            this.isrose = false;
          } else {
            console.log("666");
          }
          if (this.list.SkinPandaEye_Left_PigmentEnum == 0) {
            this.sesuxing = "无";
            this.ratese = 0;
          } else if (this.list.SkinPandaEye_Left_PigmentEnum == 1) {
            this.sesuxing = "轻度";
            this.ratese = 20;
          } else if (this.list.SkinPandaEye_Left_PigmentEnum == 2) {
            this.sesuxing = "中度";
            this.ratese = 50;
          } else {
            this.sesuxing = "重度";
            this.ratese = 80;
          }
          if (this.list.SkinPandaEye_Left_ArteryEnum == 0) {
            this.xueguanxing = "无";
            this.ratexue = 0;
          } else if (this.list.SkinPandaEye_Left_ArteryEnum == 1) {
            this.xueguanxing = "轻度";
            this.ratexue = 20;
          } else if (this.list.SkinPandaEye_Left_ArteryEnum == 2) {
            this.xueguanxing = "中度";
            this.ratexue = 50;
          } else {
            this.xueguanxing = "重度";
            this.ratexue = 80;
          }
          if (this.list.SkinPandaEye_Left_ShadowEnum == 0) {
            this.yinyingxing = "无";
            this.rateyin = 0;
          } else if (this.list.SkinPandaEye_Left_ShadowEnum == 1) {
            this.yinyingxing = "轻度";
            this.rateyin = 20;
          } else if (this.list.SkinPandaEye_Left_ShadowEnum == 2) {
            this.yinyingxing = "中度";
            this.rateyin = 50;
          } else {
            this.yinyingxing = "重度";
            this.rateyin = 80;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分享方法
    towechat() {
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
          window.location.href,
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
          window.location.href,
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
  },
  computed: {}
};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 75rem;
.xian {
  width: 88%;
  margin: 0 auto;
  height: 1px;
  background: #e6e6e6;
  margin-top: 52 / @base;
}
.contain {
  width: 100%;
  // padding-bottom: 60 / @base;
  // height: 10000 / @base;
}
.towechat {
  width: 100%;
  height: 370 / @base;
  padding: 40 / @base;
  display: flex;
  flex-wrap: wrap;
  .fenkuai-son {
    width: 140 / @base;
    height: 140 / @base;
    text-align: center;
    margin-right: 20 / @base;
  }
}
.edit {
  position: absolute;
  right: 30 / @base;
}
.header {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  border-bottom: 1 / @base solid #ccc;
  position: fixed;
  top: 0;
  background: white;
  z-index: 1;
  i {
    font-size: 25px;
  }
}
.jicheng {
  width: 100%;
  height: 120 / @base;
}
.zongfen {
  padding: 40 / @base;
  p {
    font-size: 35 / @base;
    margin-bottom: 15 / @base;
  }
  div {
    font-size: 30 / @base;
  }
}
.bu {
  width: 100%;
  height: 15 / @base;
  background: #eeeeee;
}
.pie {
  position: relative;
  padding: 50 / @base 70 / @base;
  color: #b695e9;
  .age {
    text-align: center;
    div {
      // margin-top: 10 / @base;
      font-size: 30 / @base;
    }
  }
  .line {
    position: absolute;
    top: 55 / @base;
    left: 50%;
    transform: translate(-50%, 0);
    height: 192 / @base;
    width: 5 / @base;
    background-color: #b695e9;
  }
}

.item1 {
  .color {
    ul {
      border-radius: 10px;
      width: 100%;
      padding: 0 0 20 / @base 0;
      height: 340 / @base;
      background: #e4e1ea;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 30 / @base;
      li {
        position: relative;
        width: 33%;
        height: 150 / @base;
        .li_title {
          height: 50 / @base;
          line-height: 50 / @base;
          width: 100%;
          font-size: 30 / @base;
          text-align: center;
        }
        .line {
          position: absolute;
          right: 0;
          top: 30 / @base;
          width: 1px;
          height: 60 / @base;
          background: #fff;
        }
        .li_box {
          padding: 0 10 / @base;
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: 100 / @base;

          .box_item {
            text-align: center;
            width: 30%;
            height: 100 / @base;
            .active_border {
              border: 1px solid #bb9cea;
            }
            .active_font {
              color: #bb9cea;
            }
            p {
              width: 100%;
              // height:
              font-size: 12px;
              color: #bbbabe;
            }
            .ball_active {
              //  border: 1px solid #b694e8!important;
              color: #b694e8 !important;
            }
            .ball_active1 {
              border: 2px solid #b694e8 !important;
            }
            .bzhongxingball {
              width: 50 / @base;
              height: 50 / @base;
              background: #fff8f2;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .bpianhongball {
              width: 50 / @base;
              height: 50 / @base;
              background: #ffe3d7;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .bpianhuangball {
              width: 50 / @base;
              height: 50 / @base;
              background: #fbf0d2;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .tzhongxingball {
              width: 50 / @base;
              height: 50 / @base;
              background: #fff5e9;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .tpianhongball {
              width: 50 / @base;
              height: 50 / @base;
              background: #ffdbcb;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .tpianhuangball {
              width: 50 / @base;
              height: 50 / @base;
              background: #fee8bf;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .zzhongxingball {
              width: 50 / @base;
              height: 50 / @base;
              background: #fef0d6;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .zpianhongball {
              width: 50 / @base;
              height: 50 / @base;
              background: #ffd2b5;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .zpianhuangball {
              width: 50 / @base;
              height: 50 / @base;
              background: #fbd8a8;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .xzhongxingball {
              width: 50 / @base;
              height: 50 / @base;
              background: #f9cba7;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .xpianhongball {
              width: 50 / @base;
              height: 50 / @base;
              background: #ffa187;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .xpianhuangball {
              width: 50 / @base;
              height: 50 / @base;
              background: #ee8f4b;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .azhongxingball {
              width: 50 / @base;
              height: 50 / @base;
              background: #c38a6f;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .apianhongball {
              width: 50 / @base;
              height: 50 / @base;
              background: #c16943;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .apianhuangball {
              width: 50 / @base;
              height: 50 / @base;
              background: #c49e71;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .yzhongxingball {
              width: 50 / @base;
              height: 50 / @base;
              background: #b06347;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .ypianhongball {
              width: 50 / @base;
              height: 50 / @base;
              background: #af4c25;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
            .ypianhuangball {
              width: 50 / @base;
              height: 50 / @base;
              background: #b06627;
              border-radius: 50%;
              margin: 10 / @base auto;
            }
          }
        }
      }
    }
  }
  // common
  // .common("");
  .des {
    margin-top: 40 / @base;
    .pic1 {
      // background: url(../../assets/images/白皙-中性.png) left center no-repeat; //
      // background-size: 36 / @base 36 / @base;
      // padding-left: 40 / @base;
      color: #3c3c3c;
      font-weight: 550;
      font-size: 34 / @base;
      line-height: 40 / @base;
      img {
        margin-right: 5px;
        position: relative;
        top: 5 / @base;
        margin-top: 8 / @base;
        display: inline-block;
        width: 40 / @base;
        height: 40 / @base;
        background-size: 100% 100%;
        border-radius: 50%;
        border: 2px solid #b694e8;
      }
    }
    .content {
      margin-top: 25 / @base;
      font-size: 28 / @base;
      color: #525252;
    }
  }
}
.item2 {
  // .common("");
  .des {
    margin-top: 40 / @base;
    .pic1 {
      background: url(../../assets/images/油性.png) no-repeat; //
      background-size: 32 / @base 40 / @base;
      padding-left: 40 / @base;
      color: #3c3c3c;
      font-size: 34 / @base;
      font-weight: 550;
    }
    .pic2 {
      background: url(../../assets/images/干性.png) no-repeat; //
      background-size: 32 / @base 40 / @base;
      padding-left: 40 / @base;
      color: #3c3c3c;
      font-size: 34 / @base;
      font-weight: 550;
    }
    .pic3 {
      background: url(../../assets/images/中性.png) no-repeat; //
      background-size: 32 / @base 40 / @base;
      padding-left: 40 / @base;
      color: #3c3c3c;
      font-size: 34 / @base;
      font-weight: 550;
    }
    .pic4 {
      background: url(../../assets/images/混合型.png) no-repeat; //
      background-size: 32 / @base 40 / @base;
      padding-left: 40 / @base;
      color: #3c3c3c;
      font-size: 34 / @base;
      font-weight: 550;
    }
    .content {
      margin-top: 25 / @base;
      font-size: 28 / @base;
      color: #525252;
    }
  }
}

.item3 {
  .maokong {
    // .common("");
    .des {
      margin-top: 40 / @base;
      .pic1 {
        background: url(../../assets/images/recode_nm.png) left center no-repeat; //
        background-size: 36 / @base 36 / @base;
        padding-left: 40 / @base;
        color: #3c3c3c;
        font-size: 34 / @base;
        font-weight: 550;
      }
      .content {
        margin-top: 25 / @base;
        font-size: 28 / @base;
        color: #525252;
      }
    }
  }

  .tips {
    margin-top: 55 / @base;
    width: 100%;
    height: 158 / @base;
    display: flex;
    justify-content: space-around;
    .maokong_type {
      .active_maokong {
        color: #b695e9;
      }
      width: 25%;
      height: 158 / @base;
      text-align: center;
      img {
        width: 100 / @base;
        height: 100 / @base;
        margin: 0 auto;
      }
      p {
        font-size: 28 / @base;
        // line-height: 36px;
        margin-top: 15 / @base;
      }
    }
    // .left,
    // .right {
    //   width: 50%;
    //   text-align: center;
    //   color: #3c3c3c;
    //   font-size: 30 / @base;
    //   img {
    //     width: 106 / @base;
    //     height: 100 / @base;
    //     margin: 0 auto;
    //   }
    // }
  }
}
.itemhei {
  .heikuang {
    width: 379 / @base;
    height: 129 / @base;
    margin: 47 / @base auto 36 / @base auto;
    // border: 1px dashed #ccc;
    border-radius: 10px;
    img {
      width: 362 / @base;
      height: 122 / @base;
      background-size: 100% 100%;
      margin: auto;
    }
  }
  .heitou {
    // .common("");
    .des {
      margin-top: 30 / @base;
      .pic1 {
        background: url(../../assets/images/recode_cg.png) left center no-repeat; //
        background-size: 36 / @base 36 / @base;
        padding-left: 40 / @base;
        color: #3c3c3c;
        font-size: 34 / @base;
        font-weight: 550;
      }
      .content {
        margin-top: 25 / @base;
        font-size: 28 / @base;
        color: #525252;
      }
    }
  }
}
.item4 {
  .zhouwen {
    padding: 50 / @base 0;
    display: flex;
    width: 100%;
    height: 370 / @base;
    // background:red;
    .zhouwen_left {
      width: 27%;
      height: 300 / @base;
      img {
        width: 100%;
        height: 270 / @base;
        background-size: 100% 100%;
      }
    }
    .zhouwen_right {
      width: 70%;
      height: 270 / @base;
      padding-left: 70 / @base;
      padding-top: 20 / @base;
      overflow: scroll;
      p {
        font-size: 34 / @base;
      }
      div {
        margin-top: 20 / @base;
        font-size: 28 / @base;
        color: #525252;
      }
    }
  }
}

.item5 {
  margin-top: 45 / @base;
  .left {
    .head {
      margin-top: 20 / @base;
      font-size: 34 / @base;
      color: #3c3c3c;
      .quan {
        display: inline-block;
        width: 27 / @base;
        height: 27 / @base;
        background-color: #8e0404;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .jibie {
      display: flex;
      width: 100%;
      height: 150 / @base;
      margin: 20 / @base 0;
      // border: 1px dashed #525252;
      border-radius: 5px;
      .jibie_son {
        text-align: center;
        width: 33%;
        height: 150 / @base;
        padding: 10 / @base 0;
        .active {
          color: #9262dc;
        }
        p {
          margin-top: 10 / @base;
          font-size: 28 / @base;
        }
        img {
          margin: 0 auto;
          width: 80 / @base;
          background-size: 100% 100%;
          height: 80 / @base;
        }
      }
    }
    .xiaci_middle {
      font-size: 28 / @base;
      color: #525252;
    }

    .bottom {
      font-size: 34 / @base;
      color: #3c3c3c;
      margin-top: 28 / @base;
      .quan {
        display: inline-block;
        width: 27 / @base;
        height: 27 / @base;
        background-color: #000;
        border-radius: 50%;
        vertical-align: middle;
      }
      p {
        font-size: 28 / @base;
        margin-top: 20 / @base;
        color: #525252;
      }
    }
  }
  .right {
    img {
      width: 186 / @base;
      height: 334 / @base;
    }
    .left {
      .head {
        margin-top: 20 / @base;
        font-size: 34 / @base;
        color: #3c3c3c;
        font-weight: 550;
        .quan {
          display: inline-block;
          width: 27 / @base;
          height: 27 / @base;
          background-color: #8e0404;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .middle {
        margin-top: 25 / @base;
        .lv {
          width: 300 / @base;
          height: 12 / @base;
          border-radius: 15 / @base;
          overflow: hidden;
          font-size: 34 / @base;
          color: #3c3c3c;
          .one,
          .two,
          .three {
            width: 33.3%;
            height: 12 / @base;
          }
          .one {
            background-color: #dcc6ff;
          }
          .two {
            background-color: #b695e9;
          }
          .three {
            background-color: #9262dc;
          }
        }
        .pic {
          display: inline-block;
          width: 100 / @base;
          padding-top: 32 / @base;
          margin-top: 2 / @base;
          text-align: center;
          //  font-weight: 550;
          background: url(../../assets/images/recode_bz.png) center top
            no-repeat;
          background-size: 20 / @base 30 / @base;
          font-size: 24 / @base;
        }
      }
      .bottom {
        font-size: 34 / @base;
        color: #3c3c3c;
        margin-top: 28 / @base;
        .quan {
          display: inline-block;
          width: 27 / @base;
          height: 27 / @base;
          background-color: #000;
          border-radius: 50%;
          vertical-align: middle;
        }
        p {
          font-size: 28 / @base;
          margin-top: 20 / @base;
        }
      }
    }
    .right {
      img {
        width: 186 / @base;
        height: 334 / @base;
      }
    }
  }
}

.item6 {
  .black_eyes {
    display: flex;
    width: 100%;
    height: 480 / @base;
    padding: 40 / @base 0;
    img {
      display: block;
      width: 35%;
      height: 400 / @base;
      background-size: 100% 100%;
    }
    .black_right {
      width: 65%;
      height: 400 / @base;
      .black_right_top {
        display: flex;
        padding: 20 / @base 0 20 / @base 40 / @base;
        width: 100%;
        height: 200 / @base;
        .right_item {
          text-align: center;
          width: 150 / @base;
          height: 160 / @base;
          div {
            width: 120 / @base;
            height: 120 / @base;
          }
          p {
            color: #b694e8;
            font-size: 28 / @base;
          }
        }
      }
      .black_right_bottom {
        width: 100%;
        height: 200 / @base;
        padding-left: 40 / @base;
        font-size: 28 / @base;
        color: #525252;
        overflow: scroll;
      }
    }
  }
}
.item7 {
  .last {
    margin-top: 20 / @base;
    font-size: 28 / @base;
    color: #525252;
  }
  .rose_top {
    margin-top: 30 / @base;
    width: 100%;
    height: 150 / @base;
    display: flex;
    justify-content: space-around;
    .rose_item {
      text-align: center;
      width: 80 / @base;
      height: 150 / @base;
      img {
        width: 80 / @base;
        height: 80 / @base;
        background-size: 100% 100%;
      }
      p {
        font-size: 28 / @base;
        color: #525252;
      }
    }
  }
}

.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: #fff;
  span {
    width: 50%;
    height: 98 / @base;
    text-align: center;
    line-height: 98 / @base;
    border-top: 1 / @base solid #b695e9;
    font-size: 40 / @base;
    color: #b695e9;
    &.active {
      background-color: #b695e9;
      color: #fff;
    }
  }
}

// 底部按钮
.reset {
  display: block;
  width: 280 / @base;
  height: 70 / @base;
  line-height: 70 / @base;
  font-size: 26 / @base;
  color: white;
  border-radius: 20px;
  text-align: center;
  margin: 80 / @base auto;
  background: #b694e8;
}
</style> 


