<template>
  <div>
    <div class="tui">
      <!-- <div class="header">
      <i
        @click="$router.back()"
        style="position:absolute;left:20px;"
        class="iconfont icon-zuojiantou"
      ></i>
      <span>妆容推荐</span>
      </div>-->
      <!-- <div class="bu"></div> -->
      <!-- 遮罩层 -->
      <van-overlay :z-index="5" :show="show">
        <div class="wrapper">
          <van-loading type="spinner" size="24px" />
          <p>正在生成结果...</p>
        </div>
      </van-overlay>
      <!-- 弹出大图 -->
      <!-- <van-image-preview
        :showIndex="false"
        ref="view"
        v-model="showda"
        :images="images"
      ></van-image-preview>-->

      <!-- 轮播图 -->
      <van-swipe @change="Change" indicator-color="#b695e9">
        <van-swipe-item
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          v-for="(item,index) in swiper_info"
          :key="index"
        >
          <img :src="item.img" alt />
          <div class="sw_dian" @click="datu(index)">点击查看定制妆容>></div>
          <div class="sw_title">
            <div @click="datu(index)">{{item.title}}</div>
          </div>
          <div class="sw_des">
            <div>{{item.des}}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="lunduo"></div>
      <!-- tab部分 -->
      <div class="tab">
        <div class="tab_item" @click="sel_tab(index)" v-for="(item,index) in tab_info" :key="index">
          <div class="tab_top" :class="active_tab===index?'active':''">{{item}}</div>
          <!-- <div class="tab_line" v-show="active_tab===index">
          <div></div>
          </div>-->
        </div>
      </div>
      <!-- 第一部分底妆 -->
      <div class="box">
        <div class="box_top" ref="r1">
          底妆
          <span>(Eyebrows)</span>
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="diimg" :src="info_list.di.img" alt />
          <div class="item_right">{{info_list.di.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('底妆')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
      </div>
      <div class="kong"></div>
      <!-- 第二部分眉妆 -->
      <div class="box">
        <div class="box_top" ref="r2">
          眉妆
          <span>(Eyebrow makeup)</span>
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="meiimg" :src="info_list.mei.img" alt />
          <div class="item_right">{{info_list.mei.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('眉妆')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
      </div>
      <div class="kong"></div>
      <!-- 第三部分眼妆 -->
      <div class="box">
        <div class="box_top" ref="r3">
          眼妆
          <span>(Eye makeup)</span>
        </div>
        <div class="box_lable">
          <span></span>眼影
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="yanyingimg" :src="info_list.yanying.img" alt />
          <div class="item_right">{{info_list.yanying.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('眼影')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
        <!-- 眼线 -->
        <div class="box_lable">
          <span></span>眼线
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="yanyingimg" :src="info_list.yanxian.img" alt />
          <div class="item_right">{{info_list.yanxian.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('眼线')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
        <!-- 睫毛 -->
        <div class="box_lable">
          <span></span>睫毛
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="yanyingimg" :src="info_list.jie.img" alt />
          <div class="item_right">{{info_list.jie.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('睫毛')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
      </div>
      <div class="kong"></div>
      <!-- 4鼻妆 -->
      <div class="box">
        <div class="box_top" ref="r4">
          鼻妆
          <span>(Nasal makeup)</span>
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="diimg" :src="info_list.bi.img" alt />
          <div class="item_right">{{info_list.bi.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('鼻妆')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
      </div>
      <div class="kong"></div>
      <!-- 5面部修容 -->
      <div class="box">
        <div class="box_top" ref="r5">
          面部修容
          <span>(Facial grooming)</span>
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="diimg" :src="info_list.mian.img" alt />
          <div class="item_right">{{info_list.mian.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('面部修容')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
      </div>
      <div class="kong"></div>
      <!-- 6唇妆 -->
      <div class="box">
        <div class="box_top" ref="r6">
          唇妆
          <span>(Labial makeup)</span>
        </div>
        <div class="box_item">
          <div class="box_line"></div>
          <img class="yanyingimg" :src="info_list.chun.img" alt />
          <div class="item_right">{{info_list.chun.content}}</div>
        </div>
        <div class="box_daren">
          <div class="box_daren_left">达人推荐</div>
          <div class="box_daren_right" @click="tomakeup('唇妆')">
            更多
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="mall">
          <div
            class="mall_item"
            @click="tochanpin(item.CommodityId)"
            v-for="(item,index) in shangpinlist"
            :key="index"
          >
            <p>
              <i class="iconfont icon-hot"></i>
              {{item.Price}}
            </p>
            <img :src="item.BannerImg" alt />
            <div class="xian"></div>
            <div class="name">{{item.Name | usernameLength}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Swipe, SwipeItem, ImagePreview, Overlay, Loading } from "vant";
export default {
  data() {
    return {
      closeImg: null,
      popstanub: -1,
      show: false,
      r1: "",
      r2: "",
      r3: "",
      r4: "",
      r5: "",
      r6: "",
      showda: false,
      clickFlag: false,
      images: [],
      active: 0,
      active_tab: 0,
      //   gitterwidth:document.body.clientWidth*0.8,
      tab_info: ["底妆", "眉妆", "眼妆", "鼻妆", "面部修容", "唇妆"],
      swiper_info: [
        {
          num: "01",
          title: "日常妆容",
          img: require("../../assets/images/rec_lun1.png"),
          des:
            "日常妆容讲究妆面的自然感,适用于日常、逛街、约会,整体比较自然清爽"
        },
        {
          num: "02",
          title: "职业OL妆容",
          img: require("../../assets/images/rec_lun2.png"),
          des:
            "职业OL妆容适用于职业化的职场,客户约谈,比较正式感,妆面不会过浓也不会太素"
        },
        {
          num: "03",
          title: "烟熏妆",
          img: require("../../assets/images/rec_lun3.png"),
          des:
            "烟熏妆是正式妆容,是用于高端的宴会场所,妆面较浓,在聚光灯下非常闪耀"
        },
        {
          num: "04",
          title: "日系妆容",
          img: require("../../assets/images/rec_lun4.png"),
          des:
            "日系妆容效果就是减龄温柔淡色,清新自然的妆面感,百搭妆容,无论哪个季节都很适用"
        },
        {
          num: "05",
          title: "韩系妆容",
          img: require("../../assets/images/rec_lun5.png"),
          des: "主要特点大眼 精致 感觉 温柔感"
        },
        {
          num: "06",
          title: "新年妆容",
          img: require("../../assets/images/rec_lun6.png"),
          des:
            "新年喜气洋洋,推荐这款樱桃妆,又酷又甜的红色系妆容,真的很爱!舍不得卸妆"
        },
        {
          num: "07",
          title: "秋冬妆容",
          img: require("../../assets/images/rec_lun7.png"),
          des:
            "秋冬是个比较凉爽的季节,这个秋冬温柔暖橘色妆容,让你在秋冬季也自然清新温暖动人"
        }
      ],
      shangpinlist: [], //shangpin
      info_list: [], //展示的对象
      fir_info: {
        di: {
          img: require("../../assets/images/fir_di.png"),
          content:
            "粉底选择与自己肤色接近的颜色，注意脸与脖子的衔接，选择和脖子颜色相同的粉底，根据自己面部的情况选择含油或不含油的产品，使用美妆蛋点拍方式均匀上脸，最后定妆"
        },
        mei: {
          img: require("../../assets/images/fir_mei.png"),
          content:
            "用眉刷来修饰眼眉，用比眉色浅一号的眉粉，眉刷从眉头至眉尾顺向刷过，按照原有的眉形淡淡描画，不必刻意修饰，眉毛的颜色可以与发色协调一致"
        },
        yanying: {
          img: require("../../assets/images/fir_yanying.png"),
          content:
            "用眼影刷轻扫眼影粉，第一个颜色选择浅大地色在眼窝大范围扫均匀，其次选择深色眼影采用上眼部2/3，下眼部后1/3的画法小范围扫均匀，最后用珠光色眼影在眼窝与眼球上方小范围轻扫提亮眼睛"
        },
        yanxian: {
          img: require("../../assets/images/fir_yanxian.png"),
          content:
            "睫毛浓密可以省略眼线，只在眼尾描些眼线。眼线一定不要露出眼白,也就是睫毛根下方那条白,要用眼线涂实"
        },
        jie: {
          img: require("../../assets/images/fir_jie.png"),
          content:
            "用睫毛夹夹卷整个睫毛，用自然纤长型睫毛膏刷Z字型刷出一根一根的加密效果，然后刷睫毛的头部，加长，下睫毛可以轻轻扫过"
        },
        bi: {
          img: require("../../assets/images/fir_bi.png"),
          content:
            "眼角处阴影很重要，延鼻梁两侧v字形打上浅大地色侧影，晕开过度到眼影前1/2处，五官更立体"
        },
        mian: {
          img: require("../../assets/images/fir_mian.png"),
          content:
            "选择深喉色腮红，颧骨位置由内向外或由外向内轻扫；脸部突出地方打高光，颧骨、鼻梁、额头、唇中、下巴"
        },
        chun: {
          img: require("../../assets/images/fir_chun.png"),
          content: "西柚色（淡色唇釉）先薄薄涂一层，成膜后再修补"
        }
      }, //第一种妆容

      sec_info: {
        di: {
          img: require("../../assets/images/sec_di.png"),
          content:
            "粉底选择比肤色亮一个色号的颜色，根据自己面部的情况选择含油或不含油的产品，使用美妆蛋点拍方式均匀上脸；眼周、脸颊部位用遮瑕刷遮去黑眼圈和小瑕疵，最后定妆"
        },
        mei: {
          img: require("../../assets/images/sec_mei.png"),
          content:
            "职场女性偏干练，（植村秀砍刀眉笔）用比眉色浅一号的眉笔，眉毛的颜色可以与发色协调一致，先画出眉尾，加重眉底线，细致的描绘眉头，最后用眉刷过度颜色"
        },
        yanying: {
          img: require("../../assets/images/sec_yanying.png"),
          content:
            "眼影刷轻扫眼影粉，（lunasol四色眼影盘）打底色选择浅卡其铺满整个眼窝，其次选择浅大地色给上眼部后2/3，下眼部后1/3内外眼角打出层次感，深大地色画眼尾，用打底色过度边缘，提亮内眼角与眼球上方"
        },
        yanxian: {
          img: require("../../assets/images/sec_yanxian.png"),
          content:
            "睫毛浓密可以省略眼线，只在眼尾描些眼线。眼线一定不要露出眼白,也就是睫毛根下方那条白,要用眼线涂实。（选择眼线膏，用起来简单方便）"
        },
        jie: {
          img: require("../../assets/images/sec_jie.png"),
          content:
            "用睫毛夹夹卷整个睫毛，（kate睫毛打底膏）给睫毛膏打底，用浓密精致睫毛膏刷Z字型刷出一根一根的加密效果，然后刷睫毛的头部，加长，下睫毛可以轻轻扫过"
        },
        bi: {
          img: require("../../assets/images/sec_bi.png"),
          content: "（inglot眼影#505）给山根与眼窝打出阴影，鼻翼两侧打出阴影"
        },
        mian: {
          img: require("../../assets/images/sec_mian.png"),
          content:
            "用大地色眼影/修容，轻轻地给脸颊打阴影，酒红色腮红（can make腮红#pw38）眼睛下方打圈方式轻扫颧骨；脸部突出地方打高光，颧骨、鼻梁、眉骨、唇中、下巴"
        },
        chun: {
          img: require("../../assets/images/sec_chun.png"),
          content: "梅色唇釉（kiko双头唇釉#108）满唇涂抹，最后唇周围涂抹晕染开"
        }
      }, //第二种
      thi_info: {
        di: {
          img: require("../../assets/images/thi_di.png"),
          content:
            "粉底选择比肤色亮一个色号的颜色，根据自己面部的情况选择含油或不含油的产品，使用美妆蛋点拍方式均匀上脸；眼周、脸颊部位用遮瑕刷遮去黑眼圈和小瑕疵，最后定妆"
        },
        mei: {
          img: require("../../assets/images/thi_mei.png"),
          content:
            "用比眉色浅一号的眉笔，眉毛的颜色与发色协调一致，先画出眉尾，加重眉底线，细致的描绘眉头，最后用眉刷过度颜色"
        },
        yanying: {
          img: require("../../assets/images/thi_yanying.png"),
          content:
            "眼影刷轻扫眼影粉，（etude house#命中注定）选择浅灰色+大地色打底，扫出大致眼窝，加深上眼部后2/3，下眼部后1/3内外眼角层次感，少量遮瑕点在眼皮前半段，指腹轻点晕开，深大地色画眼后部1/3处，（橘朵#g33）提亮卧蚕与眼球上方，（leemem#k17）再次提亮卧蚕与眼球上方，用高光提亮一下眼角"
        },
        yanxian: {
          img: require("../../assets/images/thi_yanxian.png"),
          content:
            "眼线一定不要露出眼白,先用（clio眼线笔）在眼部后半段睫毛根部描绘出眼线，再用（kissme棕色）眼线笔在眼尾勾勒出细长的眼线，最后画上后半段下眼线"
        },
        jie: {
          img: require("../../assets/images/thi_jie.png"),
          content:
            "用睫毛夹夹卷整个睫毛，（艾杜纱睫毛膏）纤长睫毛膏打底，（kate睫毛膏）刷睫毛的头部，加长，下睫毛可以轻轻扫过"
        },
        bi: {
          img: require("../../assets/images/thi_bi.png"),
          content:
            "给山根与眼窝打出阴影，鼻翼两侧打出阴影，延鼻梁两侧v字形打上浅大地色阴影，晕开过度到眼窝前1/2处，五官更立体，最后鼻梁、下巴处打上高光（wt905）"
        },
        mian: {
          img: require("../../assets/images/thi_mian.png"),
          content:
            "脸部突出地方打高光，颧骨、鼻梁、眉骨、唇中、下巴；用大地色眼影/修容，轻轻地给脸颊打阴影，浅粉色腮红眼角侧下方从下往上或从上往下轻扫颧骨"
        },
        chun: {
          img: require("../../assets/images/thi_chun.png"),
          content: "用（ct唇线笔）烟熏玫瑰色勾勒出唇形，哑光梅色口红填满唇部"
        }
      }, //第3种
      fou_info: {
        di: {
          img: require("../../assets/images/fou_di.png"),
          content:
            "日系妆容讲究透润的奶油肌感，底妆不适宜太厚重，粉底选择与自己肤色接近的颜色，根据自己面部的情况选择含油或不含油的产品，使用美妆蛋点拍方式均匀上脸，控制暗沉，眼周、脸颊部位用遮瑕刷遮去黑眼圈和小瑕疵，最后定妆"
        },
        mei: {
          img: require("../../assets/images/fou_mei.png"),
          content:
            "用比眉色浅一号的眉笔（棕色），眉形偏平缓没有明显的眉峰，不需要画出明显的线条感，眉笔从眉中间至眉尾顺向刷过，不必刻意修饰，唯一不同的是日系妆容眉头要比眉尾深色一些，最后用眉刷把眉毛梳顺"
        },
        yanying: {
          img: require("../../assets/images/fou_yanying.png"),
          content:
            "（nyx16色眼影盘#03）裸粉色打底眼窝，选择棕色画在内眼线、下眼尾的位置，刷子扫匀边缘自然过渡；小号眼影刷取棕色眼影画在下眼尾1/3处，眼球上方位置叠加棕橘色"
        },
        yanxian: {
          img: require("../../assets/images/fou_yanxian.png"),
          content:
            "画眼线的时候用黑色的眼线笔贴着睫毛根部慢慢画，眼线越细致越好，用眼线胶笔填充眼线根部"
        },
        jie: {
          img: require("../../assets/images/fou_jie.png"),
          content:
            "用睫毛夹夹卷整个睫毛，选择纤长自然型睫毛膏刷Z字型刷出一根一根的加密效果，然后刷睫毛的头部，加长，下睫毛可以轻轻扫过"
        },
        bi: {
          img: require("../../assets/images/fou_bi.png"),
          content:
            "清淡的鼻影，给山根与眼窝打出阴影，鼻翼两侧打出阴影，延鼻梁两侧v字形打上浅大地色阴影，晕开过度到眼窝前1/2处，五官更立体"
        },
        mian: {
          img: require("../../assets/images/fou_mian.png"),
          content:
            "想要脸显得更细，鼻梁、下巴、眼下三角区打上高光；腮红用浅粉色画在笑肌的两侧，再用干玫瑰色，重点叠画在眼窝的下方，突显出气质"
        },
        chun: {
          img: require("../../assets/images/fou_chun.png"),
          content: "姨妈红叠加橘红色，涂出满唇的淑女唇妆"
        }
      }, //第4种
      fiv_info: {
        di: {
          img: require("../../assets/images/fiv_di.png"),
          content:
            "粉底选择与自己肤色接近的颜色，注意脸与脖子的衔接，选择和脖子颜色相同的粉底，根据自己面部的情况选择含油或不含油的产品，使用美妆蛋点拍方式均匀上脸，眼周、脸颊部位用遮瑕刷遮去黑眼圈和小瑕疵，最后散粉定妆"
        },
        mei: {
          img: require("../../assets/images/fiv_mei.png"),
          content:
            "韩系妆容特点就是平眉和弯眉设计，用比眉色浅一号的眉笔（灰色或接近发色的颜色），眉毛下部分后2/3画平/直线，眉毛上部位后2/3处画出眉形，眉笔从眉中间至眉尾顺向刷过，日系眉形没有明显的眉峰，注意眉尾的弯度"
        },
        yanying: {
          img: require("../../assets/images/fiv_yanying.png"),
          content:
            "浅大地色眼窝处打底，棕色加深内眼线、下眼尾的位置，眼皮和下眼睑叠加金棕色，金闪在眼中和眼头提亮，最后用（橘朵液体眼影）在眼中和眼头加重闪的效果感"
        },
        yanxian: {
          img: require("../../assets/images/fiv_yanxian.png"),
          content:
            "画眼线的时候用黑色的眼线笔贴着睫毛根部慢慢画，在眼尾画上扬眼线，眼线越细致越好，用眼线笔填充眼线根部"
        },
        jie: {
          img: require("../../assets/images/fiv_jie.png"),
          content:
            "用睫毛夹夹卷整个睫毛，选择纤长自然型睫毛膏刷Z字型刷出一根一根的加密效果，下睫毛可以轻轻扫过"
        },
        bi: {
          img: require("../../assets/images/fiv_bi.png"),
          content: "延鼻梁两侧v字形打上浅大地色侧影，鼻头两侧，人中部位"
        },
        mian: {
          img: require("../../assets/images/fiv_mian.png"),
          content:
            "橘色+粉色腮红在笑肌两侧用刷子晕染开，鼻头、鼻梁、腮红上方、眉毛下方打上偏光金色（nars颊彩盘）修容"
        },
        chun: {
          img: require("../../assets/images/fiv_chun.png"),
          content:
            "先涂一层唇膏，纸巾抿掉，选择摩登复古红唇釉（touch inSOL #6）画出上唇咬唇、下唇全涂的感觉，精致的韩系女团妆容完成！妆容持久度也很好"
        }
      }, //第5种
      six_info: {
        di: {
          img: require("../../assets/images/six_di.png"),
          content:
            "粉底选择比肤色亮一号色，根据自己面部的情况选择含油或不含油的产品，抹在额头、两颊、下巴处使用美妆蛋点拍方式均匀上脸，遮瑕刷遮去黑眼圈和小瑕疵，最后散粉定妆"
        },
        mei: {
          img: require("../../assets/images/six_mei.png"),
          content:
            "用比眉色浅一号的眉笔（灰色或接近发色的颜色），根据自己的眉形，眉毛下部分后2/3、上部位后2/3处眉笔从眉中间至眉尾顺向刷过描出眉形，眉笔填充眉毛，眉刷刷匀"
        },
        yanying: {
          img: require("../../assets/images/six_yanying.png"),
          content:
            "浅大地色眼窝大面积扫刷打底，顺带过鼻翼两侧，鼻头两侧修容，梅色眼影晕染整个眼窝和下眼睑，深棕色眼尾晕染，高光笔在上眼皮、眼头、下眼睑前2/3处提亮"
        },
        yanxian: {
          img: require("../../assets/images/six_yanxian.png"),
          content:
            "画眼线用黑色的眼线笔贴着睫毛根部慢慢画，在眼尾画上扬眼线，眼线越细致越好，用眼线笔填充眼线根部；眼线一定不要露出眼白,要用眼线涂实"
        },
        jie: {
          img: require("../../assets/images/six_jie.png"),
          content:
            "选择纤长浓密型睫毛膏刷Z字型刷出一根一根的加密效果，下睫毛可以轻轻扫过，待半干后用睫毛夹夹轻轻卷整个睫毛"
        },
        bi: {
          img: require("../../assets/images/six_bi.png"),
          content: "延鼻梁两侧v字形打上浅大地色侧影，鼻头两侧，人中部位"
        },
        mian: {
          img: require("../../assets/images/six_mian.png"),
          content: "粉色腮红在颧骨、眉尾上下扫刷，高光轻扫眼下方、鼻头、下巴"
        },
        chun: {
          img: require("../../assets/images/six_chun.png"),
          content: "梅子色唇釉突出厚感和上唇咬唇感"
        }
      }, //第6种
      sev_info: {
        di: {
          img: require("../../assets/images/sev_di.png"),
          content:
            "粉底选择与自己肤色接近的颜色，注意脸与脖子的衔接，选择和脖子颜色相同的粉底，根据自己面部的情况选择含油或不含油的产品，使用美妆蛋点拍方式均匀上脸，眼周、脸颊部位用遮瑕刷遮去黑眼圈和小瑕疵，最后散粉定妆"
        },
        mei: {
          img: require("../../assets/images/sev_mei.png"),
          content:
            "用眉刷来修饰眼眉，用比眉色浅一号的眉粉，眉刷从眉头至眉尾顺向刷过，按照原有的眉形淡淡描画，不必刻意修饰，眉毛的颜色可以与发色协调一致"
        },
        yanying: {
          img: require("../../assets/images/sev_yanying.png"),
          content:
            "用眼影刷轻扫眼影粉（橘朵巧克力三色眼影盘），巧克力色眼窝打底，深棕色眼影在上眼部后2/3、下眼部后1/3的画法小范围扫均匀，最后用珠光色在眼窝与眼球上方小范围轻扫提亮眼睛"
        },
        yanxian: {
          img: require("../../assets/images/sev_yanxian.png"),
          content:
            "画眼线的时候用黑色的眼线笔贴着睫毛根部慢慢画，在眼尾画上扬眼线，眼线越细致越好，用眼线笔填充眼线根部；眼线一定不要露出眼白，睫毛浓密可以省略眼线，只在眼尾描些眼线"
        },
        jie: {
          img: require("../../assets/images/sev_jie.png"),
          content:
            "选择纤长浓密型睫毛膏刷Z字型刷出一根一根的加密效果，下睫毛可以轻轻扫过，待半干后用睫毛夹夹轻轻卷整个睫毛"
        },
        bi: {
          img: require("../../assets/images/sev_bi.png"),
          content: "延鼻梁两侧v字形打上浅橘色侧影，鼻头两侧，人中部位"
        },
        mian: {
          img: require("../../assets/images/sev_mian.png"),
          content:
            "（丽阳b10）橘调番茄色腮红，偏浓，用刷子蘸取要多抖几下粉，下手轻一点，扫在颧骨，上下轻扫，和修容融合"
        },
        chun: {
          img: require("../../assets/images/sev_chun.png"),
          content:
            "（完美日记小粉钻13）南瓜色，秋冬季橘调色系很适合这个颜色，下唇满涂，上唇微咬唇的感觉会更加温柔"
        }
      } //第7种
    };
  },
  created() {
    this.GetCommodityInfoList();
    window.scrollTo(0, 0);
    this.info_list = this.fir_info;
  },
  activated() {
    window.addEventListener("popstate", this.popState, false);
  },
  mounted() {
    window.closeView = this.closeView;
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handlefun);
    this.r1 = this.$refs.r1.offsetTop - document.documentElement.scrollTop;
    console.log(this.r1);
  },
  beforeDestroy() {
    //  this.$refs.view.close();
  },
  destroyed() {
    // window.removeEventListener('popstate',this.popState,false)
    window.scrollTo(0, 0);
    window.removeEventListener("scroll", this.handleScroll);
    // if(this.closeImg){
    //    this.closeImg.close()

    //  }else{
    //   //  此处执行返回
    //   var u = navigator.userAgent;
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    //   if (isAndroid) {
    //     console.log("我是要去安卓");
    //     window.android.closePage();
    //    }else{
    //     this.$router.back(-1)
    //   }
    //  }
  },
  methods: {
    // 额外关闭大土方法

    tomakeup(title) {
      this.$router.push({
        path: "/makeup",
        query: {
          title: title
        }
      });
    },
    onTouchStart(e) {
      // this.clickIndex = 0; // 为了兼容安卓部分情况而加，如果不需要可忽略
      this.clickFlag = false;
    },
    // 用于判断滑动还是点击
    onTouchMove(e) {
      this.clickFlag = true;
    },
    onTouchEnd() {
      if (this.clickFlag) {
        // 滑动
        // console.log('滑动')`;
      } else {
        // 点击
        console.log("点击");
        //  this.toproduct(name,id)
      }
    },

    // 关闭方法
    closeView() {
      if (this.closeImg) {
        //打开的情况
        this.closeImg.close();
        // window.android.HaveOpenpage('1');
      } else {
        // 没有打开
        // window.android.HaveOpenpage('2');
      }
    },
    // 展示预览图
    datu(index) {
      if (this.clickFlag === false) {
        this.show = true;
        request
          .post(this.$api + "/mobile/ARMakeupTest", {
            MakeupType: index,
            UserSkinReportId:window.localStorage.getItem('faceId')
          })
          .then(res => {
            console.log(typeof res.Data.ImgDate);
            this.images = [];
            this.images.push(res.Data.ImgDate);
            console.log(this.images);

            this.closeImg = ImagePreview({
              images: this.images,
              showIndex:false,
            });
            this.show = false;
            // 判断是安卓然后发送方法让安卓知道
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            if (isAndroid) {
              console.log("我是要去安卓");
              window.android.HaveOpenpage();
            } else if (isiOS) {
              
            } else {
             
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
      }
    },
    getpic(index) {},
    tugai(index) {
      this.active = index;
    },
    tochanpin(id) {
      this.$router.push({
        path: "/product_detail",
        query: {
          id: id
        }
      });
    },
    // 获取获取产品列表
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoList", {
          CategoryId: 0,
          Page: 1,
          Rows: 3,
          Keyword: "妆",
          Order: "asc",
          Sort: "id"
          // Type:'CommodityTypeType'
        })
        .then(res => {
          this.shangpinlist = res.Data.List;

          // console.log(res.Data.List.length)
        })
        .catch(err => {});
    },
    sel_tab(index) {
      this.active_tab = index;
      if (index === 0) {
        window.scrollTo(0, 453);
      } else if (index === 1) {
        window.scrollTo(0, 873);
      } else if (index === 2) {
        window.scrollTo(0, 1300);
      } else if (index === 3) {
        window.scrollTo(0, 2494);
      } else if (index === 4) {
        window.scrollTo(0, 2914);
      } else if (index === 5) {
        window.scrollTo(0, 3150);
      }
    },
    // 轮播图change事件
    Change(index) {
      // this.active = index;
      if (index === 0) {
        // this.images = this.images1;
        this.info_list = this.fir_info;
      } else if (index === 1) {
        // this.images = this.images2;
        this.info_list = this.sec_info;
      } else if (index === 2) {
        // this.images = this.images3;
        this.info_list = this.thi_info;
      } else if (index === 3) {
        // this.images = this.images4;
        this.info_list = this.fou_info;
      } else if (index === 4) {
        // this.images = this.images5;
        this.info_list = this.fiv_info;
      } else if (index === 5) {
        // this.images = this.images6;
        this.info_list = this.six_info;
      } else if (index === 6) {
        // this.images = this.images7;
        this.info_list = this.sev_info;
      }
    },
    //滚动事件
    handlefun() {
      let ofsetTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(ofsetTop);
      if (ofsetTop >= 0 && ofsetTop <= 872) {
        this.active_tab = 0;
      } else if (ofsetTop > 872 && ofsetTop <= 1293) {
        this.active_tab = 1;
      } else if (ofsetTop > 1293 && ofsetTop <= 2490) {
        this.active_tab = 2;
      } else if (ofsetTop > 2490 && ofsetTop <= 2910) {
        this.active_tab = 3;
      } else if (ofsetTop > 2910 && ofsetTop <= 2930) {
        this.active_tab = 4;
      } else if (ofsetTop > 2930) {
        this.active_tab = 5;
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  p {
    font-size: 20 / @base;
    color: white;
  }
}
.header {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  color: #fff;
  //   border-bottom: 1 / @base solid #ccc;
  position: fixed;
  top: 0;
  background-image: linear-gradient(121deg, #b695e9 0%, #cdb7ef 100%);
  box-shadow: -11px 0px 13px 0px rgba(202, 179, 238, 0.74);
  z-index: 1;
  i {
    font-size: 25px;
  }
}
.bu {
  width: 100%;
  height: 120 / @base;
}
.tui {
  padding-top: 100 / @base;
}
.tanbu {
  width: 100%;
  height: 200 / @base;
}
.lunduo {
  width: 100%;
  height: 60 / @base;
}
.van-swipe {
  height: 830 / @base;
  /deep/ .van-swipe-item {
    position: relative;
    width: 100%;
    padding-top: 54 / @base;
    img {
      width: 100%;
      height: 740 / @base;
      padding: 0 30 / @base;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .sw_dian {
      position: absolute;
      bottom: 270 / @base;
      width: 100%;
      text-align: center;
      font-size: 22 / @base;
      color: #8c62cb;
      font-weight: bold;
    }
    .sw_title {
      position: absolute;
      bottom: 180 / @base;
      width: 100%;
      height: 81 / @base;
      display: flex;
      justify-content: center;
      div {
        min-width: 309 / @base;
        height: 81 / @base;
        line-height: 81 / @base;
        padding: 0 20 / @base;
        font-size: 46 / @base;
        color: #fff;
        background: url("../../assets/images/case_anniu.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        margin: 0 auto;
      }
    }
    .sw_des {
      position: absolute;
      bottom: 80 / @base;

      width: 100%;
      height: 80 / @base;
      div {
        margin: 0 auto;
        width: 518 / @base;
        height: 80 / @base;
        text-align: center;
        color: #6b35bd;
        font-size: 26 / @base;
        font-weight: bold;
      }
    }
  }
  /deep/ .van-swipe__indicators {
    bottom: 0;
    /deep/ .van-swipe__indicator {
      width: 5px;
      height: 3px;
      border-radius: 3px;
      background-color: #a6a6a6;
    }
    /deep/.van-swipe__indicator--active {
      width: 11px;
    }
  }
}
// tab部分
.tab {
  position: sticky;
  top: 50px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  background: #fff;
  z-index: 2;
  .tab_item {
    min-width: 16%;
    height: 30px;
    .tab_top {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 30 / @base;
      color: #3c3c3c;
      text-align: center;
    }
    .active {
      // font-size: 34/@base!important;
      // font-weight: bold;
      color: #fff;
      background-image: linear-gradient(#b694e8, #b694e8),
        linear-gradient(#ffffff, #ffffff);
    }
    .tab_line {
      width: 100%;
      height: 10px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      div {
        width: 36 / @base;
        height: 3px;
        border-radius: 3px;
        background-image: linear-gradient(117deg, #b695e9 0%, #cdb7ef 100%),
          linear-gradient(#ffffff, #ffffff);
      }
    }
  }
}
//内容块部分
.kong {
  width: 100%;
  height: 20 / @base;
  background-color: #fafafa;
}
.box {
  width: 100%;
  padding: 0 40 / @base;
  .box_top {
    width: 100%;
    height: 190 / @base;
    text-align: center;
    line-height: 190 / @base;
    font-size: 40 / @base;
    color: #b695e9;
    span {
      font-size: 24 / @base;
    }
  }
  .box_lable {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 36 / @base;
    // font-weight: bold;
    color: #b695e9;
    margin-bottom: 57 / @base;
    span {
      display: block;
      margin-right: 17 / @base;
      width: 17 / @base;
      height: 17 / @base;
      border-radius: 50%;
      background-image: linear-gradient(-75deg, #b695e9 0%, #cdb7ef 100%),
        linear-gradient(#4e4e4e, #4e4e4e);
    }
  }
  .box_item {
    position: relative;
    width: 100%;
    min-height: 220 / @base;
    padding-bottom: 30 / @base;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    .box_line {
      position: absolute;
      bottom: 25%;
      left: 236 / @base;
      width: 1px;
      height: 50%;
      background-image: linear-gradient(#818181, #818181),
        linear-gradient(#e6e6e6, #e6e6e6);
    }
    .diimg {
      min-width: 250 / @base;
      max-width: 250 / @base;
      height: 198 / @base;
      background-size: 100% 100%;
      margin-left: 37 / @base;
      padding-right: 115 / @base;
    }
    .meiimg {
      min-width: 250 / @base;
      max-width: 250 / @base;
      height: 198 / @base;
      background-size: 100% 100%;
      margin-left: 20 / @base;
      padding-right: 55 / @base;
      padding-top: 58 / @base;
      padding-bottom: 68 / @base;
    }
    .yanyingimg {
      min-width: 250 / @base;
      max-width: 250 / @base;
      height: 198 / @base;
      background-size: 100% 100%;
      margin-left: 20 / @base;
      padding-right: 60 / @base;
      padding-top: 58 / @base;
      padding-bottom: 20 / @base;
    }
    .item_right {
      font-size: 24 / @base;
      line-height: 36 / @base;
      color: #666666;
      //  font-weight: bold;
      font-stretch: normal;
      display: flex;
      align-items: center;
    }
  }
  .box_daren {
    width: 100%;
    height: 95 / @base;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26 / @base;
    .box_daren_left {
      color: #1b1b1b;
      font-weight: bold;
    }

    .box_daren_right {
      font-size: 22 / @base;
      font-weight: normal;
      i {
        font-size: 16 / @base;
      }
    }
  }
  .mall {
    position: relative;
    width: 100%;
    height: 290 / @base;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 40 / @base;
    .mall_item {
      flex-shrink: 0;
      // float: left;
      position: relative;
      width: 195 / @base;
      height: 285 / @base;
      border-radius: 10 / @base;
      box-shadow: 0 0 13 / @base 0 rgba(218, 218, 218, 0.74);
      margin-right: 28 / @base;
      img {
        width: 140 / @base;
        height: 111 / @base;
        margin: 30 / @base auto 0 auto;
      }
      p {
        font-size: 20 / @base;
        color: #6b35bd;
        padding-left: 10 / @base;
        padding-top: 15 / @base;
        i {
          font-size: 16 / @base;
        }
      }
      .xian {
        width: 167 / @base;
        height: 1px;
        background: #e6e6e6;
        margin: 24 / @base auto 18 / @base auto;
      }
      .name {
        font-size: 18 / @base;
        color: #666666;
        text-align: center;
      }
    }
  }
}
</style>