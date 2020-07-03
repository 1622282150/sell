/*eslint-disable*/
// import Return from "../../components/Return";
import Searchm from "../../components/Searchm";
import request from "@/utils/request";
import { CountDown, Toast, Switch, Swipe, SwipeItem } from 'vant';
export default {
    data () {
        return {
            index:'',
            fujin_loading: false,
            fujin_finished: false,
            fujin_page: 1,
            swiperlist: [],
            checked: true,//免预约
            tuante: ['团购', '特惠'],
            address1index: 0,//选择地址第一个
            address2index: 0,//选择地址第2个
            active_tuante: '',
            leibie_type: ['脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部',],
            gongxiao_type: ['美白', '补水稍等', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部',],
            chanlist: [],//chan产品列表
            isfu: true,//选择附近项目
            CategoryInfoList: [],//产品分类
            SellerPageList: [],//商家数组
            top_title: ['附近机构', '热门项目'],    // 选择附近机构或者热门项目
            active_title: 0,
            time: 10 * 60 * 60 * 1000,
            // 卡片部位列表
            partinfo: [
                { img: require('../../assets/images/gonglv_cb.png'), name: '脸部' },
                { img: require('../../assets/images/gonglv_cb.png'), name: '眼部' },
                { img: require('../../assets/images/gonglv_cb.png'), name: '唇部' },
                { img: require('../../assets/images/gonglv_cb.png'), name: '身体' },
                { img: require('../../assets/images/gonglv_cb.png'), name: '鼻部' },
                { img: require('../../assets/images/gonglv_cb.png'), name: '牙齿' },
                { img: require('../../assets/images/gonglv_cb.png'), name: '胸部' },
                { img: require('../../assets/images/gonglv_cb.png'), name: '私密' },
            ],
            swiperOption: {
                loop: true,
                roundLengths: true,
                centeredSlides: true,
                followFinger: false,
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination"
                }
            },
            id: -1,
            is: false,
            checked: true,
            value: 0,
            switch1: false,
            switch2: false,
            active_address: '',
            list: [
                { name: "附近", },
                { name: "行政区", },

            ],
            distanc1: ['不限', '1km', '2km', '3km'],
            distance2: ['西湖区', '下城区', '江干区', '上城区', '江干区'],
            option: [
                { text: "好评优先", value: 0 },
                { text: "最新发布", value: 1 },
                { text: "人气优先", value: 2 },
                { text: "价格最低", value: 3 },
                { text: "价格最高", value: 4 },
            ],
            lunboimg: [
                // { Icon: "http://test1.merrychange.net/Content/Upload/Image/Link/20191022022451814.jpg" },
                // { Icon: "http://test1.merrychange.net/Content/Upload/Image/Link/20191022022451814.jpg" },
                // { Icon: "http://test1.merrychange.net/Content/Upload/Image/Link/20191022022451814.jpg" },
              ],
            clickFlag: false,

        };
    },
    created () {
      this.getlink()
    },
    mounted () {

        this.get_SellerPageList()
        this.GetCommodityCategoryInfoList()
        this.GetCommodityInfoList()


    },
    methods: {
            // 获取轮播图
    getlink () {
        this.axios.post(this.$api + '/mobile/GetLink', {
            Keyword: "Project",
        }).then(res => {
          this.lunboimg = res.data.Data
  
        }).catch(err => {
  
        })
      },
        onTouchStart (e) {
            // this.clickIndex = 0; // 为了兼容安卓部分情况而加，如果不需要可忽略
            this.clickFlag = false;
        },
        // 用于判断滑动还是点击
        onTouchMove (e) {
            this.clickFlag = true;

        },
        onTouchEnd () {
            if (this.clickFlag) { // 滑动
                // console.log('滑动');
            } else { // 点击
                console.log('点击')
                //  this.toproduct(name,id)
            }
        },
        gettoken () {
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            if (isAndroid) {
                console.log("我是安卓");
                window.localStorage.setItem("token", result);
            } else if (isiOS) {
                // console.log("我是要去ios");
                this.$bridge.callhandler("getToken", "", response => {
                    // 处理返回数据
                    let token = JSON.stringify(response);
                    window.localStorage.setItem("token", JSON.parse(token));
                });
            } else {
                console.log("我不是安卓也不是ios,我在哪");
            }
        },
        fujin_onLoad () {
            this.fujin_page += 1
            this.get_SellerPageList()
        },
        // 选择团购个特惠
        sel_tuante (index) {
            console.log(index)
            this.active_tuante = index
        },
        //选择第一个选项
        sel_address1 (index) {
            this.address1index = index
        },
        //选第二
        sel_address2 (index) {
            this.address2index = index
        },
        nokai () {
            Toast('暂未开放~')
        },
        goback () {

            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            if (isAndroid) {
                // on close
                console.log("我是要去安卓");
                // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
                window.android.goToHome();
                //   this.$router.back();
            } else if (isiOS) {
                console.log("我是要去ios");
                //   let url = "http://test1.merrychange.net/#/articlestie?id=" + this.articleid;
                //   console.log(url);
                //   this.$bridge.callhandler("closePage", url, data => {
                //     // 处理返回数据
                //   });
                //   this.$router.back();
                window.location.href = 'mqjapp://home'
            } else {
                console.log("我不是安卓也不是ios,我在哪");
                this.$router.back();
            }
        },
        // 去分类详情
        toproduct (name, id) {
            if (this.clickFlag) {
            //    console.log('滑动了')
            } else {
                this.$router.push({
                    path: '/project',
                    query: {
                        name: name,
                        id: id
                    }
                })
            }

        },
        GetCommodityCategoryInfoList () {
            request.post(this.$api + '/mobile/GetCommodityCategoryInfoList', {
                ParentId: 12
            }).then(res => {
                this.CategoryInfoList = res.Data.List
                var len = this.CategoryInfoList.length
                var n = 8
                var lineNum = len % 8 === 0 ? len / 8 : Math.floor((len / 8) + 1)
                var resarr = [];
                for (let i = 0; i < lineNum; i++) {
                    let temp = this.CategoryInfoList.slice(i * n, i * n + n);
                    resarr.push(JSON.parse(JSON.stringify(temp)));
                }

                this.swiperlist = resarr
                console.log(this.swiperlist)
            }).catch(err => {

            })
        },
        // 选择上部标题
        sel_title (index) {
            this.active_title = index
            if (index == 0) {
                console.log('我是附近机构')
                this.isfu = true
            } else {
                console.log('我是热门项目')
                this.isfu = false
            }
        },
        onConfirm (index) {
            this.id = index;
            this.$refs.item.toggle();
            this.is = true;
            console.log(index);
        },
        // 获取商户列表
        get_SellerPageList () {
            request.post(this.$api + '/mobile/GetSellerProjectPageList', {
                Page: this.fujin_page,
                Rows: 9,
                // Type:'ShopProject'
            }).then(res => {
                // this.SellerPageList = res.Data.List
                // console.log(this.SellerPageList)
                this.fujin_loading = false;
                if (res.Data.List.length) {
                    var arr = res.Data.List
                    for (let i = 0; i < arr.length; i++) {
                        this.SellerPageList.push(arr[i])
                    }
                } else {
                    this.fujin_finished = true
                }
            }).catch(err => {

            })
        },
        // 产品列表
        GetCommodityInfoList () {
            request.post(this.$api + '/mobile/GetCommodityProjectInfoList', {
                CategoryId: 0,
                Page: 1,
                Rows: 16
            }).then(res => {
                this.chanlist1 = res.Data.List
                console.log(this.list)
            }).catch(err => {

            })
        },
        tozong () {
           
                this.$router.push("/search_zonghe");
             
         
        },
        // 去项目详情
        todetail (id) {
            this.$router.push({
                path: '/details',
                query: {
                    id: id
                }
            })
        },
        // 去商jia详情
        toSellerdetail (id) {
            this.$router.push({
                path: '/shop',
                query: {
                    id: id
                }
            })
        },
    },
    components: {
        // Return,
        Searchm
    }
};