import Return from "@/components/Return.vue";
import request from "@/utils/request";
import { Toast } from "vant";
export default {
  components: {
    Return
  },
  data () {
    return {
      chuchuang:[],//橱窗
      data: [],
      page2:1,
      otherid: '',
      selfinfo: [],
      // 发布帖子话题部分
      toplist: [{ title: '帖子' }, { title: '话题' }],
      active: 0,
      activeindex: 0,

      tiezipage: 1,
      tiezilist: [],
      tieziloading: false,
      tiezifinished: false,
      //话题
      huatipage: 1,
      huatilist: [],
      huatiloading: false,
      huatifinished: false,
      // 收藏部分
      shoucang_activeindex: 0,
      shoucangtop: [{ title: '文章' }, { title: '帖子' }, { title: '话题' },],
      // 收藏文章部分
      wen_page: 0,
      wen_loading: false,
      wen_finished: false,
      wen_jingimg: [],
      //收藏帖子
      shoutie_loading: false,
      shoutie_finished: false,
      shoutie_page: 1,
      shoutie_tiezilist: [],
      //收藏话题
      shouhua_loading: false,
      shouhua_finished: false,
      shouhua_page: 1,
      shouhua_list: [],
      //收藏好货
      shouhao_list: [
       

      ],



      //收藏项目
      xiangmu_list: [
      
      ]
    };
  },
  created () {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    if (isiOS) {
      console.log("我是要去ios");
      this.$bridge.callhandler("getToken", "", response => {
        // 处理返回数据
        let token = JSON.stringify(response);
        window.localStorage.setItem("token", JSON.parse(token));
        // Dialog.alert({
        //   message: "ios返回来的token:" + JSON.parse(token)+'本地存的token:'+window.localStorage.getItem('token')
        // }).then(() => {
        //   // on close

        // });
      });
    } else {
      console.log("我不是ios");
    }
  },
  mounted () {
    window.test=this.test
    this.otherid = this.$route.query.id
    setTimeout(() => {
    this.get_selfinfo()
      this.gettuijian()
      this.gettuijian2()
    this.gethuati()
    }, 100);
    // console.log(this.active)
    // console.log(this.$route.query.ftp)
    // if (this.$route.query.ftp == 3) {
    //   this.active=2
    // } else {
    //   this.active=0
    // }
  },
  methods: {
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url =
        this.$domain.url+"otherself?id=" + this.otherid;
        console.log(url);
        this.$bridge.callhandler("closePage", url, data => {
          // 处理返回数据
        });
        this.$router.back();
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        this.$router.back();
      }
    },
    test (params) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        window.localStorage.setItem("token", params);
        this.get_selfinfo()
        this.gettuijian()
        this.gettuijian2()
        this.gethuati()
      
      } else {
        let token = JSON.stringify(params);
        window.localStorage.setItem("token", JSON.parse(token));
        this.get_selfinfo()
        this.gettuijian()
        this.gettuijian2()
        this.gethuati()
     
      }
    },
    hei () {
      this.$router.push({
        path: '/other_more',
        query: {
          id: this.otherid
        }
      })
    },
    // 禁用商品橱窗
    onClickDisabled () {
      Toast('商品橱窗还未开通')
    },
    // 获取它的信息
    get_selfinfo () {
      request.post(this.$api + '/mobile/GetOtherUserInfo', {
        Id: this.otherid
      }).then(res => {
        if (res.IsSuccess) {
          this.selfinfo = res.Data
          this.GetUserShopWindow()
          if (this.$route.query.ftp == 3) {
            console.log('你会看到我')
            this.$nextTick(() => {
              this.active = 2
            })
            
            console.log(this.active)
          } else {
            this.$nextTick(() => {
              this.active = 0
            })
          }
        } else {
          Toast(res.Message)
        }
      }).catch(err => {

      })
    },
    // 获取商品橱窗信息
    GetUserShopWindow () {
        
      request.post(this.$api + '/mobile/GetUserShopWindowCommodityInfoList',{
        UserId:this.selfinfo.UserId
      }).then(res=>{
        this.chuchuang=res.Data.List
      }).catch(err=>{

      })
    
    },
    guanzhu () {
      request
        .post(this.$api + "/mobile/AttentionAdd", {
          ByUserId: this.otherid
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("关注成功");
            this.get_selfinfo();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => { });
    },
    // 取消关注
    del_guanzhu () {
      request
        .post(this.$api + "/mobile/AttentionDelete", {
          ByUserId: this.otherid
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("取消关注");
            this.get_selfinfo();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => { });
    },
    // 跳转商品详情
    tomalldetail (id) {
      this.$router.push({
        path: '/product_detail',
        query: {
          id:id
        }
      })
    },
    //跳转他的粉丝和她的关注
    his_guan () {
      // this.$router.push('/his_guan')
      this.$router.push({
        path: '/his_guan',
        query: {
          userid:this.otherid
        }
      })
    },
    his_fans () {
      // this.$router.push('/his_fans')
      this.$router.push({
        path: '/his_fans',
        query: {
          userid:this.otherid
        }
      })
    },
    // 选择帖子话题
    xuanze (index) {
      this.activeindex = index
    },
    //选择收藏
    shoucang_xuanze (index) {
      this.shoucang_activeindex = index
      console.log(this.shoucang_activeindex)
    },
    //上拉加载文章
    tiezionLoad () {
      // 异步更新数据

      this.tiezipage += 1;
      this.gettuijian();
    },
    //获取帖子列表
    loadmore() {
      console.log("我被出发了");
      this.tiezipage += 1;
      setTimeout(() => {
        this.gettuijian();
      },100);
    },
    gettuijian() {
      request
        .post(this.$api + "/mobile/GetOtherArticleList", {
          UserId: this.otherid,
          Page: this.tiezipage,
          Rows: 10,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.tiezilist.push(arr[i]);
            }
          
          } else {
           
          }
        })
        .catch(err => {});
    },
    zanone (id, index) {
      this.tiezilist[index].IsLiked = 1;
      this.tiezilist[index].LikedCount += 1;
      request
        .post(this.$api + "/mobile/LikedAdd", {
          MainId: id,
          Type: 2
        })
        .then(res => {
          // this.mainping();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //评论取消赞
    nozanone (id, index) {
      this.tiezilist[index].IsLiked = 0;
      this.tiezilist[index].LikedCount -= 1;
      request
        .post(this.$api + "/mobile/LikedDelete", {
          MainId: id,
          Type: 2
        })
        .then(res => { })
        .catch(err => {
          console.log(err);
        });
    },
    zanone2 (id, index) {
      this.data[index].IsLiked = 1;
      this.data[index].LikedCount += 1;
      request
        .post(this.$api + "/mobile/LikedAdd", {
          MainId: id,
          Type: 2
        })
        .then(res => {
          // this.mainping();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //评论取消赞
    nozanone2 (id, index) {
      this.data[index].IsLiked = 0;
      this.data[index].LikedCount -= 1;
      request
        .post(this.$api + "/mobile/LikedDelete", {
          MainId: id,
          Type: 2
        })
        .then(res => { })
        .catch(err => {
          console.log(err);
        });
    },
    // 进入帖子详情
    toarticle (type, id,userid) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (type != "VideoArticle") {
        this.$router.push({
          path: "/ArticlesTie",
          query: {
            id: id
          }
        });
      } else {
        console.log("去视频");
        console.log("走视频" + id);
        if (isAndroid) {
          console.log("我是要去安卓" + id,userid);
          // window.android.goToHome()
          window.android.goVideo(id,userid);
        } else if (isiOS) {
          let videourl = "mqjapp://goVideo:" + id +'&'+userid;
          console.log("我是要去ios" + videourl);
          window.location.href = videourl;
        } else {
          console.log("我在浏览器");
        }
      }
    },
    // 话题
    huationLoad () {
      // 异步更新数据

      this.huatipage += 1;
      this.gethuati();
    },
    gethuati () {
      request
        .post(this.$api + "/mobile/GetOtherTopicArticleList", {
          Page: 1,
          Rows: 10,
          Sort: "Id",
          Order: "asc",
          UserId: this.otherid,
        })
        .then(res => {
          this.huatilist = res.Data.List
          // this.huatilist=res.Data.List
          // this.huatiloading = false;
          // console.log(res.Data.List.length)
          // if (res.Data.List.length) {
          //   var arr = res.Data.List;
          //   for (let i = 0; i < arr.length; i++) {
          //     this.huatilist.push(arr[i]);
          //   }
          // } else {
          //   this.huatifinished = true;
          // }
        })
        .catch(err => { console.log(err) });
    },

    //收藏文章部分
    wen_onLoad () {
      // 异步更新数据

      this.wen_page += 1
      this.getjing()
    },
    // 获取精选内容
    getjing () {
      request.post(this.$api + '/mobile/HisFavoriteIndexArticleList', {
        HisId: this.otherid,
        Page: this.wen_page,
        Rows: 6,
        Sort: "Id",
        Order: "asc"
      }).then(res => {
        // this.jingimg=res.data.Data.List
        this.wen_loading = false;
        if (res.Data.ListData.length) {
          var arr = res.Data.ListData
          for (let i = 0; i < arr.length; i++) {
            this.wen_jingimg.push(arr[i])
          }
        } else {
          this.wen_finished = true
        }
      }).catch(err => {
        console.log(err)

      })
    },
    towen (id) {
      this.$router.push({
        path: '/articlesdetail',
        query: {
          id: id
        }
      })
    },
    tohua (id) {
      this.$router.push({
        path: '/articleshua',
        query: {
          id: id
        }
      })
    },

    // 收藏帖子部分
    loadmore2() {
      console.log("我被出发了");
      
      this.page2 += 1;
      setTimeout(() => {
        this.gettuijian2();
      }, 100);
    },
    gettuijian2() {
      request
        .post(this.$api + "/mobile/HisFavoriteArticleList", {
          HisId: this.otherid,
          Page: this.page2,
          Rows: 6,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          // this.tuijianlist = res.Data.List;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.data.push(arr[i]);
            }
          } else {
          }
        })
        .catch(err => {});
    },

    //收藏话题部分
    //上拉加载文章
    shouhua_onLoad () {
      // 异步更新数据

      this.shouhua_page += 1;
      this.shouhua_gethuati();
    },
    shouhua_gethuati () {
      request
        .post(this.$api + "/mobile/HisFavoriteTopicList", {
          HisId:this.otherid,
          Page: this.shouhua_page,
          Rows: 4,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          this.shouhua_loading = false;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.shouhua_list.push(arr[i]);
            }
          } else {
            this.shouhua_finished = true;
          }
        })
        .catch(err => { console.log(err) });
    }
  }
};