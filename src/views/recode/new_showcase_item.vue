<template>
  <div v-if="alllist">
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
      妆容报告
      <img @click="goback" class="img1" src="../../assets/images/newfan.png" alt />
      <i @click="showfen = true" class="iconfont icon-fenxiang2"></i>
      <!-- <img @click="showfen = true" class="img2" src="../../assets/images/recode2_fenxiang.png" alt /> -->
      <!-- <img class="img3" src="../../assets/images/recode2_jilu.png" alt /> -->
    </div>
    <div class="jicheng"></div>
    <!--头部分数 -->
    <div class="gradebox">
      <img :src="alllist.UserPhoto" alt />
      <div class="gradebox_left">
        <p class="gradebox_left_top">{{alllist.UserName | communityname}}</p>
        <p class="gradebox_left_bottom">{{alllist.Time |dateFmt('YYYY-MM-DD HH:mm')}}</p>
      </div>
      <div class="gradebox_middle">
        <p
          class="gradebox_middle_top"
          :class="alllist.beauty < 80?'gradebox_active_low':'gradebox_active_up'"
        >{{alllist.beauty}}</p>
        <p
          class="gradebox_middle_bottom"
          :class="alllist.beauty < 80?'gradebox_active_low':'gradebox_active_up'"
        >分数</p>
      </div>
      <div class="gradebox_right">
        <p class="gradebox_right_top">{{alllist.age}}</p>
        <p class="gradebox_right_bottm">年龄</p>
      </div>
    </div>
    <!-- 底妆 -->
    <!-- 公共题目 1-->
    <div v-show="show_di">
      <div class="report_title">底妆分析</div>
      <div class="report_di">
        <div class="report_di_left">
          <img class="img_di" :src="alllist.Skin.Img" alt />
        </div>
        <div class="report_di_right">{{alllist.Skin.Report}}</div>
      </div>
      <div class="recommen_title">
        推荐底妆
        <img src="../../assets/images/yuanyuan.png" alt />
      </div>
      <div class="recommen_di">
        <div class="recommen_dileft">
          <img class="img_di" :src="alllist.Skin.Resolves[0].Img" alt />
        </div>
        <div class="recommen_diright">{{alllist.Skin.Resolves[0].Content}}</div>
        <div style="clear:both;"></div>
      </div>
      <Tool :tools="alllist.Skin.Resolves[0].Tools" :colors="alllist.Skin.Resolves[0].Colors"></Tool>
      <Step :list="alllist.Skin.Resolves[0].Step"></Step>
      <div v-if="show_di">
        <div class="tui_title">
          <div class="tui_title_left">达人推荐</div>
          <!-- <div class="tui_title_right">查看全部 ></div> -->
        </div>
        <div class="tuijian_box">
          <div
            @click="todetail(item.CommodityId)"
            class="tuijian_box_item"
            v-for="(item,index) in productlist"
            :key="index"
          >
            <div class="tuijian_box_item_title">
              <img :src="item.BannerImg" alt />
              <div class="lable">
                <i class="iconfont icon-hot"></i>
                <span>{{item.FavoriteCount}}</span>
              </div>
            </div>
            <div class="tuijian_box_item_name">{{item.Name}}</div>
            <div class="tuijian_box_item_price">
              ¥{{item.Price}}
              <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
            </div>
          </div>
        </div>
        <div class="more">别再滑了,我已经到底了</div>
      </div>
    </div>
    <!-- 面部修容 -->
    <div v-show="show_mian">
      <div class="report_title">面部分析</div>
      <div class="report_di">
        <div class="report_di_left">
          <img class="img_mian" :src="alllist.Face.Img" alt />
        </div>
        <div class="report_di_right">{{alllist.Face.Report}}</div>
      </div>
      <div class="recommen_title">
        推荐修容
        <img src="../../assets/images/yuanyuan.png" alt />
      </div>
      <div class="recommen_di">
        <div class="recommen_dileft">
          <img class="img_mian" :src="alllist.Face.Resolves[0].Img" alt />
        </div>
        <div class="recommen_diright">{{alllist.Face.Resolves[0].Content}}</div>
        <div style="clear:both;"></div>
      </div>
      <Tool :tools="alllist.Face.Resolves[0].Tools" :colors="alllist.Face.Resolves[0].Colors"></Tool>
      <Step :list="alllist.Face.Resolves[0].Step"></Step>
      <div v-if="show_mian">
        <div class="tui_title">
          <div class="tui_title_left">达人推荐</div>
          <!-- <div class="tui_title_right">查看全部 ></div> -->
        </div>
        <div class="tuijian_box">
          <div
            class="tuijian_box_item"
            @click="todetail(item.CommodityId)"
            v-for="(item,index) in productlist"
            :key="index"
          >
            <div class="tuijian_box_item_title">
              <img :src="item.BannerImg" alt />
              <div class="lable">
                <i class="iconfont icon-hot"></i>
                <span>{{item.FavoriteCount}}</span>
              </div>
            </div>
            <div class="tuijian_box_item_name">{{item.Name}}</div>
            <div class="tuijian_box_item_price">
              ¥{{item.Price}}
              <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
            </div>
          </div>
        </div>
        <div class="more">别再滑了,我已经到底了</div>
      </div>
    </div>
    <!-- 眉妆 -->
    <div v-show="show_mei">
      <div class="report_title">眉妆分析</div>
      <div class="report_mei">
        <div class="report_mei_top">{{alllist.Eyebrow.Report}}</div>
        <img class="img_mei" :src="alllist.Eyebrow.Img" alt />
      </div>
      <div class="recommen_title">
        推荐眉妆
        <img src="../../assets/images/yuanyuan.png" alt />
      </div>
      <div class="recommen_mei">
        <div class="recommen_mei_left">
          <img class="img_mei" :src="alllist.Eyebrow.Resolves[0].Img" alt />
        </div>
        <div class="recommen_mei_right">{{alllist.Eyebrow.Resolves[0].Content}}</div>
        <div style="clear:both;"></div>
      </div>
      <Tool :tools="alllist.Eyebrow.Resolves[0].Tools" :colors="alllist.Eyebrow.Resolves[0].Colors"></Tool>
      <Step :list="alllist.Eyebrow.Resolves[0].Step"></Step>
      <div v-if="show_mei">
        <div class="tui_title">
          <div class="tui_title_left">达人推荐</div>
          <!-- <div class="tui_title_right">查看全部 ></div> -->
        </div>
        <div class="tuijian_box">
          <div
            class="tuijian_box_item"
            @click="todetail(item.CommodityId)"
            v-for="(item,index) in productlist"
            :key="index"
          >
            <div class="tuijian_box_item_title">
              <img :src="item.BannerImg" alt />
              <div class="lable">
                <i class="iconfont icon-hot"></i>
                <span>{{item.FavoriteCount}}</span>
              </div>
            </div>
            <div class="tuijian_box_item_name">{{item.Name}}</div>
            <div class="tuijian_box_item_price">
              ¥{{item.Price}}
              <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
            </div>
          </div>
        </div>
        <div class="more">别再滑了,我已经到底了</div>
      </div>
    </div>
    <!-- 眼妆 -->
    <div v-show="show_yan">
      <div class="report_title">眼妆分析</div>
      <div class="report_yan">
        <div class="report_yan_top">
          <img class="yan_img" :src="alllist.Eye.Img" alt />
        </div>
        <div class="report_yan_bottom">{{alllist.Eye.Report}}</div>
      </div>
      <div class="recommen_title">
        推荐眼妆
        <img src="../../assets/images/yuanyuan.png" alt />
      </div>
      <div class="recommen_mei">
        <div class="recommen_mei_left">
          <img class="img_yan" :src="alllist.Eye.Resolves[0].Img" alt />
        </div>
        <div class="recommen_mei_right">{{alllist.Eye.Resolves[0].Content}}</div>
        <div style="clear:both;"></div>
      </div>
      <Tool :tools="alllist.Eye.Resolves[0].Tools" :colors="alllist.Eye.Resolves[0].Colors"></Tool>
      <Step :list="alllist.Eye.Resolves[0].Step"></Step>
      <div v-if="show_yan">
        <div class="tui_title">
          <div class="tui_title_left">达人推荐</div>
          <!-- <div class="tui_title_right">查看全部 ></div> -->
        </div>
        <div class="tuijian_box">
          <div
            class="tuijian_box_item"
            @click="todetail(item.CommodityId)"
            v-for="(item,index) in productlist"
            :key="index"
          >
            <div class="tuijian_box_item_title">
              <img :src="item.BannerImg" alt />
              <div class="lable">
                <i class="iconfont icon-hot"></i>
                <span>{{item.FavoriteCount}}</span>
              </div>
            </div>
            <div class="tuijian_box_item_name">{{item.Name}}</div>
            <div class="tuijian_box_item_price">
              ¥{{item.Price}}
              <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
            </div>
          </div>
        </div>
        <div class="more">别再滑了,我已经到底了</div>
      </div>
    </div>
    <!-- 鼻妆 -->
    <div v-show="show_bi">
      <div class="report_title">鼻妆分析</div>
      <div class="report_di">
        <div class="report_di_left">
          <img class="img_bi" :src="alllist.Nose.Img" alt />
        </div>
        <div class="report_di_right">{{alllist.Nose.Report}}</div>
      </div>
      <div class="recommen_title">
        推荐鼻妆
        <img src="../../assets/images/yuanyuan.png" alt />
      </div>
      <div class="recommen_di">
        <div class="recommen_dileft">
          <img class="img_bi" :src="alllist.Nose.Resolves[0].Img" alt />
        </div>
        <div class="recommen_diright">{{alllist.Nose.Resolves[0].Content}}</div>
        <div style="clear:both;"></div>
      </div>
      <Tool :tools="alllist.Nose.Resolves[0].Tools" :colors="alllist.Nose.Resolves[0].Colors"></Tool>
      <Step :list="alllist.Nose.Resolves[0].Step"></Step>
      <div v-if="show_bi">
        <div class="tui_title">
          <div class="tui_title_left">达人推荐</div>
          <!-- <div class="tui_title_right">查看全部 ></div> -->
        </div>
        <div class="tuijian_box">
          <div
            class="tuijian_box_item"
            @click="todetail(item.CommodityId)"
            v-for="(item,index) in productlist"
            :key="index"
          >
            <div class="tuijian_box_item_title">
              <img :src="item.BannerImg" alt />
              <div class="lable">
                <i class="iconfont icon-hot"></i>
                <span>{{item.FavoriteCount}}</span>
              </div>
            </div>
            <div class="tuijian_box_item_name">{{item.Name}}</div>
            <div class="tuijian_box_item_price">
              ¥{{item.Price}}
              <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
            </div>
          </div>
        </div>
        <div class="more">别再滑了,我已经到底了</div>
      </div>
    </div>
    <!-- 唇妆 -->
    <div v-show="show_chun">
      <div class="report_title">唇妆分析</div>
      <div class="report_di">
        <div class="report_di_left">
          <img class="img_chun" :src="alllist.Mouth.Img" alt />
        </div>
        <div class="report_di_right">{{alllist.Mouth.Report}}</div>
      </div>
      <div class="recommen_title">
        推荐唇妆
        <img src="../../assets/images/yuanyuan.png" alt />
      </div>
      <div class="recommen_di">
        <div class="recommen_dileft">
          <img class="img_chun" :src="alllist.Mouth.Resolves[0].Img" alt />
        </div>
        <div class="recommen_diright">{{alllist.Mouth.Resolves[0].Content}}</div>
        <div style="clear:both;"></div>
      </div>
      <Tool :tools="alllist.Mouth.Resolves[0].Tools" :colors="alllist.Mouth.Resolves[0].Colors"></Tool>
      <Step :list="alllist.Mouth.Resolves[0].Step"></Step>
      <div v-if="show_chun">
        <div class="tui_title">
          <div class="tui_title_left">达人推荐</div>
          <!-- <div class="tui_title_right">查看全部 ></div> -->
        </div>
        <div class="tuijian_box">
          <div
            class="tuijian_box_item"
            @click="todetail(item.CommodityId)"
            v-for="(item,index) in productlist"
            :key="index"
          >
            <div class="tuijian_box_item_title">
              <img :src="item.BannerImg" alt />
              <div class="lable">
                <i class="iconfont icon-hot"></i>
                <span>{{item.FavoriteCount}}</span>
              </div>
            </div>
            <div class="tuijian_box_item_name">{{item.Name}}</div>
            <div class="tuijian_box_item_price">
              ¥{{item.Price}}
              <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
            </div>
          </div>
        </div>
        <div class="more">别再滑了,我已经到底了</div>
      </div>
    </div>

    <!-- 底部悬浮 -->
    <div @click="zhankai('底妆')" v-show="show_di" class="bottom_ball" :style="backgroundDiv1"></div>
    <div @click="zhankai('面部修容')" v-show="show_mian" class="bottom_ball" :style="backgroundDiv2"></div>
    <div @click="zhankai('眉妆')" v-show="show_mei" class="bottom_ball" :style="backgroundDiv3"></div>
    <div @click="zhankai('眼妆')" v-show="show_yan" class="bottom_ball" :style="backgroundDiv4"></div>
    <div @click="zhankai('鼻妆')" v-show="show_bi" class="bottom_ball" :style="backgroundDiv5"></div>
    <div @click="zhankai('唇妆')" v-show="show_chun" class="bottom_ball" :style="backgroundDiv6"></div>

    <!-- 弹出层 -->
    <van-overlay :z-index="3" :show="show_shadow" @click="show_shadow = false">
      <div class="wrapper">
        <div
          :class="index === 5?'active_ball':''"
          class="wrapper_ball"
          @click.stop
          @click="small_click(index)"
          v-for="(item,index) in imgArr"
          :key="index"
          :style="{backgroundImage:'url(' + item.image + ')'}"
        ></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Product from "./new_tuijian";
import Tool from "./new_tool";
import Step from "./new_step";
import request from "@/utils/request";
import { Overlay } from "vant";
export default {
  components: {
    Tool,
    Step
  },
  data() {
    return {
      type: "", //关于路由的传参
      keyvalue: "",
      imgArr: [
        { image: require("../../assets/images/bottom_di.png"), name: "底妆" },
        {
          image: require("../../assets/images/bottom_mian.png"),
          name: "面部修容"
        },
        { image: require("../../assets/images/bottom_mei.png"), name: "眉妆" },
        { image: require("../../assets/images/bottom_yan.png"), name: "眼妆" },
        { image: require("../../assets/images/bottom_bi.png"), name: "鼻妆" },
        { image: require("../../assets/images/bottom_chun.png"), name: "唇妆" }
      ],
      backgroundDiv1: {
        backgroundImage:
          "url(" + require("../../assets/images/bottom_di.png") + ")"
      },
      backgroundDiv2: {
        backgroundImage:
          "url(" + require("../../assets/images/bottom_mian.png") + ")"
      },
      backgroundDiv3: {
        backgroundImage:
          "url(" + require("../../assets/images/bottom_mei.png") + ")"
      },
      backgroundDiv4: {
        backgroundImage:
          "url(" + require("../../assets/images/bottom_yan.png") + ")"
      },
      backgroundDiv5: {
        backgroundImage:
          "url(" + require("../../assets/images/bottom_bi.png") + ")"
      },
      backgroundDiv6: {
        backgroundImage:
          "url(" + require("../../assets/images/bottom_chun.png") + ")"
      },
      show_shadow: false, // 蒙层
      showfen: false, //分享弹框
      show_di: false,
      show_mian: false,
      show_mei: false,
      show_yan: false,
      show_bi: false,
      show_chun: false,
      productlist: [],
      alllist: "" //所有数组
    };
  },

  created() {},
  mounted() {
    console.log(this.$route.query.type);
    var type = this.$route.query.type;
    switch (type) {
      case "底妆":
        this.keyvalue = "dizhuang";
        this.GetCommodityInfoList();
        this.show_di = true;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = false;
        break;
      case "面部修容":
        this.keyvalue = "mianbuxiurong";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = true;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = false;
        break;
      case "眉妆":
        this.keyvalue = "meimao";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = true;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = false;
        break;
      case "眼妆":
        this.keyvalue = "yanzhuang";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = true;
        this.show_bi = false;
        this.show_chun = false;
        break;
      case "鼻妆":
        this.keyvalue = "bizhuang";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = true;
        this.show_chun = false;
        break;
      case "唇妆":
        this.keyvalue = "chunzhuang";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = true;
        break;
      default:
        this.keyvalue = "dizhuang";
        this.GetCommodityInfoList();
        this.show_di = true;
        break;
    }

    this.getrec();
  },
  methods: {
    todetail(id) {
      this.$router.push({
        path: "/product_detail",
        query: {
          id: id
        }
      });
    },
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoList", {
          Page: 1,
          Rows: 8,
          CategroyGroup: this.keyvalue
        })
        .then(res => {
          this.productlist = res.Data.List;
          console.log("数组", this.productlist);
        })
        .catch(err => {});
    },
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");

        window.android.closePage();
      } else {
        this.$router.back(-1);
      }
    },
    small_click(index) {
      // console.log(this.imgArr[index]);
      this.show_shadow = false;
      if (this.imgArr[index].name == "底妆") {
        this.type = "底妆";
        this.keyvalue = "dizhuang";
        this.GetCommodityInfoList();
        this.show_di = true;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = false;

        console.log("item", this.keyvalue);
      } else if (this.imgArr[index].name == "面部修容") {
        this.type = "面部修容";
        this.keyvalue = "mianbuxiurong";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = true;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = false;

        console.log("item", this.keyvalue);
      } else if (this.imgArr[index].name == "眉妆") {
        this.type = "眉妆";
        this.keyvalue = "meimao";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = true;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = false;

        console.log("item", this.keyvalue);
      } else if (this.imgArr[index].name == "眼妆") {
        this.type = "眼妆";
        this.keyvalue = "yanzhuang";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = true;
        this.show_bi = false;
        this.show_chun = false;

        console.log("item", this.keyvalue);
      } else if (this.imgArr[index].name == "鼻妆") {
        this.type = "鼻妆";
        this.GetCommodityInfoList();
        console.log("item", this.keyvalue);
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = true;
        this.show_chun = false;
        this.keyvalue = "bizhuang";
      } else if (this.imgArr[index].name == "唇妆") {
        this.type = "唇妆";
        this.keyvalue = "chunzhuang";
        this.GetCommodityInfoList();
        this.show_di = false;
        this.show_mian = false;
        this.show_mei = false;
        this.show_yan = false;
        this.show_bi = false;
        this.show_chun = true;

        console.log("item", this.keyvalue);
      }
    },
    zhankai(param) {
      // this.show_shadow=true
      for (var i = 0; i < this.imgArr.length; i++) {
        if (this.imgArr[i].name == param) {
          var a = this.imgArr[i];

          this.imgArr.splice(i, 1);
          this.imgArr.push(a);
        }
      }
      this.show_shadow = true;
    },
    getrec() {
      request
        .post(this.$api + "/mobile/GetUserFaceReportInfoNew", {})
        .then(res => {
          this.alllist = res.Data;
          console.log(this.alllist.Skin.Tag);
        })
        .catch(err => {});
    },
    towechat() {
      var name = "妆容报告请查收~";
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
      var name = "妆容报告请查收~";
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
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.wrapper {
  width: 50 / @base;
  // height: 300/ @base;
  position: absolute;
  right: 15 / @base;
  bottom: 20 / @base;
  // background: red;
  .active_ball {
    width: 49 / @base!important;
    height: 49 / @base!important;
    margin-bottom: 0 !important;
    border-radius: 50%;
  }
  .wrapper_ball {
    width: 41 / @base;
    height: 41 / @base;
    border-radius: 50%;
    background-size: 100% 100%;
    background-position: center center;
    margin: 7 / @base auto;
  }
}

.bottom_ball {
  cursor: pointer;
  position: fixed;
  right: 14 / @base;
  bottom: 20 / @base;
  width: 49 / @base;
  height: 49 / @base;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 8px 0px rgba(84, 115, 115, 0.54);
  border-radius: 50%;
}
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
  z-index: 2;
  background: white;
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width: auto;
    height: 21 / @base;
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
  margin-bottom: 2px;
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
  margin: 2 / @base 17 / @base 0 40 / @base;
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
// 公用头部1
.report_title {
  font-size: 20px;
  font-weight: bold;
  color: #3e3e3e;
  margin: 47 / @base auto 29 / @base 16 / @base;
}
// 共用头部2
.recommen_title {
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: #3e3e3e;
  margin: 46 / @base auto 31 / @base 16 / @base;
  img {
    position: absolute;
    left: 70 / @base;
    top: -3 / @base;
    width: 19 / @base;
    // height: 19/@base;
    border-radius: 50%;
    opacity: 0.8;
  }
}
// 底妆
.report_di {
  display: flex;
  width: calc(~"100% - 30px");
  margin: 0 auto;
  height: 130 / @base;
  box-shadow: 4px 5px 16px 0px rgba(120, 120, 120, 0.23);
  border-radius: 10 / @base;
  .report_di_left {
    min-width: 135 / @base;
    max-width: 130 / @base;
    background: #fde8e2;
    border-bottom-left-radius: 10 / @base;
    border-top-left-radius: 10 / @base;
    .img_di {
      width: 60 / @base;
      height: 89 / @base;
      background-size: 100% 100%;
      margin: 20 / @base auto auto auto;
    }
    .img_mian {
      width: 60 / @base;
      height: 89 / @base;
      background-size: 100% 100%;
      margin: 18 / @base auto auto auto;
    }
    .img_bi {
      width: 65 / @base;
      height: 92 / @base;
      background-size: 100% 100%;
      margin: 13 / @base auto auto auto;
    }
    .img_chun {
      width: 92 / @base;
      // height: 40/@base;
      margin: 47 / @base auto auto auto;
    }
  }
  .report_di_right {
    display: flex;
    align-items: center;
    padding: 0 16 / @base;
    font-size: 14px;
    font-weight: bold;
    line-height: 24 / @base;
    letter-spacing: 0px;
    color: #666666;
  }
}
.recommen_di {
  padding: 0 15 / @base;
  .recommen_dileft {
    float: left;
    width: 156 / @base;
    height: 108 / @base;
    background: #fde8e2;
    margin-right: 18 / @base;
    // margin-bottom: 13/@base;
    box-shadow: 4px 5px 16px 0px rgba(120, 120, 120, 0.23);
    border-radius: 10px;
    overflow: hidden;
    .img_di {
      width: 60 / @base;
      height: 89 / @base;
      background-size: 100% 100%;
      margin: 10 / @base auto auto auto;
    }
    .img_mian {
      width: 60 / @base;
      height: 89 / @base;
      background-size: 100% 100%;
      margin: 10 / @base auto auto auto;
    }
    .img_bi {
      width: 75 / @base;
      height: 105 / @base;
      position: relative;
      left: 40 / @base;
      bottom: 17 / @base;
      // margin: auto auto 17/@base  auto;
    }
    .img_chun {
      width: 92 / @base;
      height: auto;
      margin: 38 / @base auto auto auto;
    }
  }
  .recommen_diright {
    font-size: 12px;
    line-height: 24 / @base;
    letter-spacing: 0px;
    color: #818181;
  }
}
// 眉妆
.report_mei {
  width: calc(~"100% - 30px");
  margin: 0 auto;
  padding: 26 / @base 12 / @base 41 / @base 12 / @base;
  box-shadow: 4px 5px 16px 0px rgba(120, 120, 120, 0.23);
  border-radius: 10px;
  .report_mei_top {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #666666;
    margin-bottom: 40 / @base;
  }
  .img_mei {
    width: 100%;
    // height: 16/@base;
    background-size: 100% 100%;
  }
}
.recommen_mei {
  padding: 0 15 / @base;
  .recommen_mei_left {
    float: left;
    width: 156 / @base;
    height: 108 / @base;
    // background: #fde8e2;
    margin-right: 18 / @base;
    // margin-bottom: 13/@base;
    box-shadow: 4px 5px 16px 0px rgba(120, 120, 120, 0.23);
    border-radius: 10px;
    overflow: hidden;
    .img_mei {
      // width: 140 / @base;
      width: auto;
      height: 19 / @base;
      // height: 19/@base;
      background-size: 100% 100%;
      margin: 46 / @base 8 / @base auto 8 / @base;
    }
    .img_yan {
      height: 90 / @base;
      width: auto;
      margin: 13 / @base auto auto auto;
    }
  }
  .recommen_mei_right {
    font-size: 12px;
    line-height: 24 / @base;
    letter-spacing: 0px;
    color: #818181;
  }
}
// 眼妆
.report_yan {
  width: calc(~"100% - 30px");
  margin: 0 auto;

  box-shadow: 0px 0px 13px 0px rgba(120, 120, 120, 0.23);
  border-radius: 10px;
  .report_yan_top {
    width: 100%;
    height: auto;
    background-color: #fde8e2;
    padding-top: 15 / @base;
    .yan_img {
      width: 250 / @base;
      height: auto;
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
  .report_yan_bottom {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #3e3e3e;
    padding: 25 / @base 13 / @base 22 / @base 13 / @base;
  }
}
// tuijian
.tui_title {
  padding: 0 15 / @base 0 17 / @base;
  width: 100%;
  margin-bottom: 29 / @base;
  height: 59 / @base;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .tui_title_left {
    vertical-align: bottom;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3e3e3e;
  }
  .tui_title_right {
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }
}
.tuijian_box {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  padding-left: 13 / @base;
  padding-bottom: 5 / @base;
  .tuijian_box_item {
    padding-bottom: 17 / @base;
    margin-right: 13 / @base;
    box-shadow: 0px 2px 8px 0px #e6e6e6;
    border-radius: 10px;
    flex-shrink: 0;
    position: relative;
    width: 150 / @base;
    .tuijian_box_item_title {
      position: relative;
      width: 149 / @base;
      height: 150 / @base;
      background-color: #ffffff;
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
      .lable {
        border-radius: 6px 0px 0px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0 / @base;
        min-width: 35 / @base;
        height: 18 / @base;
        background-color: #e4d4f7;
        color: #782ad9;
        i {
          font-size: 8 / @base;
          transform: scale(0.8);
          color: #782ad9;
        }
        span {
          font-size: 10px;
        }
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 149 / @base;
        height: 150 / @base;
        border-radius: 10px 10px 0px 0px;
      }
    }
    .tuijian_box_item_name {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
      margin: 5 / @base 6 / @base 0 6 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
    .tuijian_box_item_price {
      display: flex;
      align-items: center;
      margin: 12 / @base 6 / @base 0 6 / @base;
      font-size: 12px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #7b2eda;
      span {
        display: inline-block;
        font-weight: bold;
        letter-spacing: 0px;
        color: #7b2eda;
        transform: scale(0.8);
      }
    }
  }
}
.more {
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999999;
  text-align: center;
  padding-top: 32 / @base;
  padding-bottom: 32 / @base;
}
</style>