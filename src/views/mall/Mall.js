import BScroll from "better-scroll";
import Search from "../../components/Searchm";
import { Toast, Swipe, SwipeItem } from 'vant'
import request from '@/utils/request'
import grade from '@/components/GradePopup'
export default {
    data () {
        return {
            carnum: '', //购物车数量
            scrollTop: '',
            page: 1,
            loading: false,
            finished: false,
            CategoryInfoList: [],//品牌分类列表
            swiperlist: [],
            obj: [],
            shangpinlist: [],
            list: [
                { src: require("../../assets/images/mall_huli.png"), name: "护肤" },
                { src: require("../../assets/images/mall_gerenhuli.png"), name: "个人护理" },
                { src: require("../../assets/images/mall_peishi.png"), name: "配饰" },
                { src: require("../../assets/images/mall_yifu.png"), name: "服饰" },
                { src: require("../../assets/images/mall_xie.png"), name: "鞋靴" },
                { src: require("../../assets/images/mall_neiyi.png"), name: "内衣" },
                { src: require("../../assets/images/mall_jiajvfu.png"), name: "家居服" },
                { src: require("../../assets/images/mall_qiu.png"), name: "活动" },
                { src: require("../../assets/images/mall_bao.png"), name: "包包" },
                { src: require("../../assets/images/mall_tubiao.png"), name: "工具" }
            ],
            img: [
                { src: require("../../assets/images/mall_xinrenyouhui.png"), url: '/newzone' },
                { src: require("../../assets/images/mall_pinpaiguan.png"), url: '/brand_main' },
                { src: require("../../assets/images/mall_jingpintemai.png"), url: '/sale' }
            ],
            swiperOption: {
                loop: true,
                notNextTick: true,
                initialSlide: 0,
                autoplay: {
                    disableOnInteraction: false,
                    delay: 1000
                },
                pagination: {
                    el: ".swiper-pagination"
                }
            },
            lunboimg: [
                // { Icon: "" },
                // { Icon: "" },
                // { Icon: "" },
            ],
            clickFlag: false,
        };
    },
    created () {
        this.getlink()
    },
    mounted () {
        window.addEventListener("scroll", this.handleScroll); //每次进入开启滚轮监听
        window.scrollTo(0, 0);
        this.getcar()
        this.GetCommodityCategoryInfoList()
        this.GetCommodityInfoList()
    },
    destroy () {
        window.removeEventListener("scroll", this.handleScroll); //每次离开页面时去除这个监听   
    },

    // beforeRouteLeave (to, from, next) {
    //     console.log('我是mall.js')
    //     // console.log('我是from',from)
    //     if (to.path == '/product') {
    //         to.meta.keepAlive = true
    //     }
    //     next()
    // },
    methods: {
        // 获取轮播图
        getlink () {
            this.axios.post(this.$api + '/mobile/GetLink', {
                Keyword: "Product",
            }).then(res => {
                this.lunboimg = res.data.Data

            }).catch(err => {

            })
        },
        tocar () {
            request.post(this.$api + '/mobile/CheckLoginStatus', {

            }).then(res => {
                if (res.Data.OnlineFlag) {
                    // 说明登录
                    this.$router.push('/shopping_car')
                } else {
                    // 说明未登录  判断安卓和ios同事去登陆
                    var u = navigator.userAgent;
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    if (isAndroid) {
                        console.log('我是要去安卓')
                        window.android.logOut()

                    } else if (isiOS) {
                        console.log('我是要去ios')
                        window.location.href = 'mqjapp://logout'
                    }
                }
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
        getcar () {
            request
                .post(this.$api + "/mobile/GetShoppingCartCount", {})
                .then(res => {
                    if (res.IsSuccess) {
                        this.carnum = res.Data
                    } else {
                        Toast(res.Message);
                    }
                })
                .catch(err => { });
        },
        handleScroll () {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            this.scrollTop = scrollTop
            // console.log(this.scrollTop)
            if (this.scrollTop === 0) {
                // console.log('显示长的')
                this.$refs.a1.style.display = 'block'
                this.$refs.a2.style.display = 'block'
                this.$refs.b1.style.display = 'none'
                this.$refs.b2.style.display = 'none'
            } else {
                // console.log('显示短的')
                this.$refs.b1.style.display = 'block'
                this.$refs.b2.style.display = 'block'
                this.$refs.a1.style.display = 'none'
                this.$refs.a2.style.display = 'none'
            }
        },
        onLoad () {
            // 异步更新数据

            this.page += 1
            this.GetCommodityInfoList()
        },
        nokai () {
            Toast('活动暂未开通')
        },
        goback () {

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
                console.log("我不是安卓也不是ios,我在哪");
                this.$router.back();
            }
        },
        tomall (name, id) {
            if (this.clickFlag) {

            } else {
                console.log(name)
                this.$router.push({
                    path: '/product',
                    query: {
                        name: name,
                        id: id
                    }
                })
            }
        },
        // 去搜索框
        tozong () {
            this.$router.push("/search_zonghe");
        },
        // 获取产品分类
        GetCommodityCategoryInfoList () {
            request.post(this.$api + '/mobile/GetCommodityCategoryInfoList', {
                ParentId: 13,
                Rows: 20
            }).then(res => {
                // this.CategoryInfoList = res.Data.List.slice(0,10)
                // console.log(this.CategoryInfoList)
                this.CategoryInfoList = res.Data.List
                var len = this.CategoryInfoList.length
                var n = 10
                var lineNum = len % 10 === 0 ? len / 10 : Math.floor((len / 10) + 1)
                var resarr = [];
                for (let i = 0; i < lineNum; i++) {
                    let temp = this.CategoryInfoList.slice(i * n, i * n + n);
                    resarr.push(JSON.parse(JSON.stringify(temp)));
                }

                this.swiperlist = resarr
                // console.log(this.swiperlist)
            }).catch(err => {

            })
        },
        // 获取获取产品列表
        GetCommodityInfoList () {
            request.post(this.$api + '/mobile/GetCommodityInfoList', {
                CategoryId: 0,
                Page: this.page,
                Rows: 4,
                Order: 'desc',
                Sort: 'Popularity'
                // Type:'CommodityTypeType'
            }).then(res => {
                // this.shangpinlist = res.Data.List
                // console.log(this.shangpinlist)
                this.loading = false
                if (res.Data.List.length) {
                    var arr = res.Data.List
                    for (let i = 0; i < arr.length; i++) {
                        this.shangpinlist.push(arr[i])
                    }
                    // console.log(this.shangpinlist)
                } else {
                    this.finished = true
                }
                // console.log(res.Data.List.length)
            }).catch(err => {

            })
        },
        jifen () {
            this.$router.push('/jifen_mall')
        },
        tochanpin (id) {
            this.$router.push({
                path: '/product_detail',
                query: {
                    id: id
                }
            })
        }
    },
    components: {
        Search,
        grade
    }
};