<template>
  <div>
    <header>
      <i @click="$router.back()" class="iconfont icon-zuojiantou"></i>
      <div class="head">退款</div>
    </header>
    <div class="bu"></div>
    <div class="top">
      <img :src="product.Img" alt />
      <div class="top_right">
        <p class="p1">{{product.ProductName}}</p>
        <p class="p2">{{product.SCText}}</p>
        <p class="p3">
          <span class="span1">¥</span>
          {{product.Price}}
          <span class="span2">x{{product.Count}}</span>
        </p>
      </div>
    </div>
    <div class="hui"></div>
    <div class="sel" @click="sel(index)" v-for="(item,index) in sel_list" :key="index">
      <div class="sel_left">
        <img :src="item.img" alt />
        <p>{{item.name}}</p>
      </div>
      <div :class="sel_active === index?'sel_active':''" class="sel_right"></div>
    </div>
    <div @click="show=true" class="yuan">
      <div class="yuan_left">退货原因</div>
      <div class="yuan_right">
        {{because.name}}
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="hui"></div>
    <div class="price">
      <p class="p1">
        退款金额:
        <span>¥{{product.TotalPrice}}</span>
      </p>
      <p class="p2">最多¥{{product.TotalPrice}},含发货邮费¥0.00</p>
      <div class="p3">
        退款说明:
        <input type="text" placeholder="选填" v-model="message" />
      </div>
    </div>
    <div class="hui"></div>
    <div class="tu">
      <p class="title">上传凭证(最多三张)</p>
      <van-uploader :after-read="afterRead"  v-model="fileList" multiple :max-count="3" />
    </div>
    <div class="bottom" @click="tijiao">提交</div>
    <!-- 弹出层 -->
    <van-popup :style="{ height: '60%' }" v-model="show" position="bottom">
      <div class="tan">
        <p class="title">退货原因</p>
        <div
          class="hang"
          @click="sel_tan(index,item)"
          v-for="(item,index) in list_info"
          :key="index"
        >
          <div class="hang_left">{{item.name}}</div>
          <div class="hang_right" :class="tan_active === index?'active':''"></div>
        </div>
        <div class="kong"></div>
        <div class="btn" @click="show = false">提交</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Popup, Uploader,Toast } from "vant";
export default {
  data() {
    return {
      message:'',
      fileList: [], //上传图片数组
      reallist:[],//要发送给后台的数组
      orderid: "",
      because: [], //选择的对像
      tan_active: 0,
      show: false, //是否展示弹出层
      sel_active: 0,
      sel_list: [
        {
          img: require("../../../assets/images/tuikuan_money.png"),
          name: "仅退款"
        },
        {
          img: require("../../../assets/images/tuikuan_tui.png"),
          name: "退货退款"
        }
      ],
      list_info: [],
      list1: [
        { id: "13", name: "退运费" },
        { id: "14", name: "多拍/拍错/不想要" },
        { id: "15", name: "快递一直未到" },
        { id: "16", name: "空包裹/少货" },
        { id: "0", name: "其他" }
      ],
      list2: [
        { id: "6", name: "拍错/效果不好/不喜欢" },
        { id: "7", name: "颜色/尺寸/参数不符" },
        { id: "8", name: "商品瑕疵" },
        { id: "9", name: "质量问题" },
        { id: "10", name: "少发漏发" },
        { id: "11", name: "收到商品有划痕或破损" },
        { id: "12", name: "未按约定发货" },
        { id: "0", name: "其他" }
      ],
      product: [] //产品详细
    };
  },
  watch: {
    sel_active(newval, oldval) {
      this.tan_active = 0;
      if (this.sel_active == 0) {
        this.list_info = this.list1;
        this.because = this.list_info[0];
      } else if (this.sel_active == 1) {
        this.list_info = this.list2;
        this.because = this.list_info[0];
      }
    }
  },
  mounted() {
    this.orderid = this.$route.query.id;
    this.list_info = this.list1;
    this.get_detail();
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      // let file = this.fileList
      if (file.type === "video/mp4") {
        Toast("不支持视频类型");
      } else {
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType",'ImageApplyRefund');
        let config = {
          headers: { "Content-Type": "multipart/form-data;" }
        };
        request
          .post(this.$api + "/appmfile/tolead", formData, config)
          .then(res => {
            if (res.IsSuccess) {
              // this.userlist.UserPhoto = res.Data;
              this.reallist=this.reallist.concat(res.Data.List[0].Url)
              
            } else {
              Toast(res.Message);
            }
          })
          .catch(err => {});
      }
    },
    tijiao() {
      console.log(this.because.id)
      var type
      if(this.sel_active == 0){
        type=1
      }else{
        type=0
      }
      // 退款
      request.post(this.$api+'/mobile/ApplyRefund',{
         OrderId:this.product.OrderId,
         OrderDetailId:this.product.Id,
         ReasonType:this.because.id,
         RefundType:type,
         Reason:this.message,
         Img:this.reallist
      }).then(res=>{
         if(res.IsSuccess){
           Toast(res.Message)
           this.$router.back()
         }else{
           Toast(res.Message)
         }
      }).catch(err=>{

      })
      
    },
    sel(index) {
      this.sel_active = index;
    },
    sel_tan(index, item) {
      this.tan_active = index;
      console.log(item);
      this.because = item;
    },
    get_detail() {
      request
        .post(this.$api + "/mobile/GetOrderInfoDetail", {
          orderId: this.orderid
        })
        .then(res => {
          if (res.IsSuccess) {
            this.product = res.Data.ListData[0];
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 10px;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 50px;
}
.hui {
  width: 100%;
  height: 15 / @base;
  background: #eeeeee;
}
.top {
  display: flex;
  width: 100%;
  height: 280 / @base;
  padding: 34 / @base;
  img {
    min-width: 200 / @base;
    max-width: 200 / @base;
    height: 200 / @base;
    border-radius: 5 / @base;
  }
  .top_right {
    padding-left: 23 / @base;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .p1 {
      font-size: 28 / @base;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //行数
      -webkit-box-orient: vertical;
    }
    .p2 {
      font-size: 24 / @base;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #828282;
    }
    .p3 {
      font-size: 38 / @base;
      font-weight: bold;
      letter-spacing: 0px;
      color: #b695e9;
      .span1 {
        font-size: 27 / @base;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b695e9;
        margin-right: 3 / @base;
      }
      .span2 {
        font-size: 24 / @base;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #6e6e6e;
      }
    }
  }
}
.sel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 140 / @base;
  border-bottom: 1px solid #eeeeee;
  padding: 0 40 / @base;
  .sel_left {
    display: flex;
    align-items: center;
    img {
      width: 40 / @base;
      height: 40 / @base;
      margin-right: 25 / @base;
    }
    p {
      font-size: 30 / @base;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #3f3f3f;
    }
  }
  .sel_right {
    width: 40 / @base;
    height: 40 / @base;
    background: #eeeeee;
    //   border: solid 1px #a0a0a0;
    border-radius: 50%;
  }
  .sel_active {
    background: url("../../../assets/images/payment_over.png") !important;
  }
}
.yuan {
  width: 100%;
  height: 160 / @base;
  padding-top: 29 / @base;
  display: flex;
  justify-content: space-between;
  font-size: 30 / @base;
  font-weight: bold;
  letter-spacing: 1px;
  color: #3f3f3f;
  .yuan_left {
    padding-left: 40 / @base;
  }
  .yuan_right {
    padding-right: 40 / @base;
  }
}
.tan {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  // padding-bottom: 98/@base;
  .title {
    padding-top: 48 / @base;
    padding-bottom: 20 / @base;
    text-align: center;
    font-size: 36 / @base;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3f3f3f;
  }
  .hang {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 40 / @base;
    padding-right: 40 / @base;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    height: 123 / @base;
    display: flex;
    .hang_left {
      font-size: 36 / @base;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #3f3f3f;
    }
    .hang_right {
      width: 40 / @base;
      height: 40 / @base;
      border-radius: 50%;
      background: #eeeeee;
    }
    .active {
      background: url("../../../assets/images/payment_over.png") !important;
    }
  }
  .kong {
    width: 100%;
    height: 98 / @base;
  }
  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36 / @base;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff;
    width: 100%;
    height: 98 / @base;
    background-image: linear-gradient(146deg, #9557f6 0%, #8536ff 100%);
  }
}
.price {
  width: 100%;
  padding: 36 / @base 0 36 / @base 40 / @base;
  .p1 {
    font-size: 30 / @base;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3f3f3f;
    span {
      font-size: 36 / @base;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #b695e9;
    }
  }
  .p2 {
    margin: 25 / @base 0;
    font-size: 28 / @base;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #999999;
  }
  .p3 {
    font-size: 30 / @base;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3f3f3f;
    input {
      width: 70%;
      font-size: 24 / @base;

      font-stretch: normal;

      letter-spacing: 1px;
      color: #666666;
    }
  }
}
.tu {
  padding: 26 / @base 0 169 / @base 40 / @base;
  .title {
    margin-bottom: 35 / @base;
    font-size: 30 / @base;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3f3f3f;
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 98 / @base;
  background-image: linear-gradient(146deg, #9557f6 0%, #8536ff 100%);
  font-size: 36 / @base;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #ffffff;
}
</style>