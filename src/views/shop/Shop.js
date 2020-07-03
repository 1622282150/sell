
/*eslint-disable*/
import request from "@/utils/request";
import Head from "../../components/Header";
export default {
  data () {
    return {
      showfen:false,
      value: 0,
      seller_value:0,
      id: '',
      SellerDetail: [],
      CommodityProjectInfoListById:[],
    };
  },
  methods: {
    towechat() {
      var dizhi = this.$domain.url+"shop?id="+this.id;
      var name = this.SellerDetail.Name;
      var description = "一家物美价廉的店铺";
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
        console.log(dizhi);
        window.android.shareToWechat(dizhi, name, description, "wechat");
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        var params = {
          address: dizhi,
          name: name,
          description: description,
          type: "wechat"
        };

        console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
      var dizhi = this.$domain.url+"shop?id="+this.id;
      var name = this.SellerDetail.Name;
      var description = "一家物美价廉的店铺";
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
        console.log(dizhi);
        window.android.shareToWechat(dizhi, name, description, "FriendCircle");
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        //  window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'朋友圈');
        var params = {
          address: dizhi,
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
    },
    test(params) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        window.localStorage.setItem("token",params);
      }else{
         let token = JSON.stringify(params);
         window.localStorage.setItem("token", JSON.parse(token));
      }
    },
    back () {
      console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back(-1)
      }    
},
    // 关注美容店
    AttentionSellerAdd () {
      // console.log('111')
      request.post(this.$api + '/mobile/AttentionSellerAdd', {
        ByUserId:this.id
      }).then(res => {
        this.GetSellerDetail()
      }).catch(err => {
        
      })
    },
    // 取消关注美容店
    del_AttentionSellerAdd () {
      // console.log('111')
      request.post(this.$api + '/mobile/AttentionSellerDelete', {
        ByUserId:this.id
      }).then(res => {
        this.GetSellerDetail()
      }).catch(err => {
        
      })
    },
    GetSellerDetail () {
      request.post(this.$api + '/mobile/GetSellerProjectDetail', {
        Id:this.id
      }).then(res => {
        console.log(res)
        this.SellerDetail=res.Data
      }).catch(err => {
        console.log(err)
      })
    },
  
   
    // 获取商户下的项目
    GetCommodityProjectInfoListById () {
      request.post(this.$api + '/mobile/GetCommodityProjectInfoListById', {
        Id:this.id
      }).then(res => {
        console.log(res)
        this.CommodityProjectInfoListById=res.Data.List
      }).catch(err => {
        console.log(err)
      })
    },
    handleFun() {
      var top_fixed=document.querySelector('#top_f');
      var top_left = document.querySelector("#top_l");
      var top_right = document.querySelector("#top_r");
      var top_li=document.querySelector("#top_li");
      var top_ri=document.querySelector("#top_ri");
      this.offsetTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.offsetTop > 36) {
       top_fixed.style.background='#FFFFFF'
       top_left.style.background='#FFFFFF'
      top_li.style.color='#040307'
       top_right.style.background='#FFFFFF'
      top_ri.style.color='#040307'
      } else {
       top_fixed.style.background='none'
       top_left.style.background='rgba(102, 103, 98, 0.5)'
        top_li.style.color='#ffffff'
       top_right.style.background='rgba(102, 103, 98, 0.5)'
       top_ri.style.color='#ffffff'
      }
    },
  },
  mounted () {
    window.scrollTo(0,0)
    window.addEventListener("scroll", this.handleFun);
    console.log(this.$route.query.id)
    this.id = this.$route.query.id
    this.GetSellerDetail()
    this.GetCommodityProjectInfoListById()
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleFun);
  },
  components: {
    Head
  }
};
