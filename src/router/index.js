
import Vue from 'vue'
import Router from 'vue-router'
//首页

const Home = () => import('@/views/home/Home.vue')



const home_more = () => import('@/views/home/home_more.vue')
// 公共页面  //选择好友

const select_people = () => import('@/views/common/select_people')
//热门

const Hot = () => import('@/views/Hot.vue')
//热门项目

const List = () => import('@/views/List.vue')
//商品购买也1111111111111111

const Details = () => import('@/views/gonglv/GongLv_details/Details.vue')
//排名

const Ranking = () => import('@/views/Ranking.vue')
//项目购买

const Shop = () => import('@/views/shop/Shop.vue')
//门店列表

const shopList = () => import('@/views/shopList/ShopList.vue')
// 加v认证
const jia_v = () => import('@/views/jia_v/jia_v.vue')
const set_mobile = () => import('@/views/jia_v/set_mobile.vue')
const jia_v_daren = () => import('@/views/jia_v/jia_v_daren.vue')
const jia_v_daren_fans = () => import('@/views/jia_v/jia_v_daren_fans.vue')
const jia_v_daren_read = () => import('@/views/jia_v/jia_v_daren_read.vue')
const jia_v_zhuanjia = () => import('@/views/jia_v/jia_v_zhuanjia.vue')
const jia_v_zhuanjia_up = () => import('@/views/jia_v/jia_v_zhuanjia_up.vue')
const jia_v_framer = () => import('@/views/jia_v/jia_v_framer.vue')
//文章

const Articles = () => import('@/views/Articles.vue')

const articlesdetail = () => import('@/views/home/homearticle/ArticlesWen')

const articlestie = () => import('@/views/home/homearticle/ArticlesTie')

const articleshua = () => import('@/views/home/homearticle/ArticlesHua.vue')

const JvBaoarticleswen = () => import('@/views/home/homearticle/JvBaoarticleswen')
const jvbaoarticle = () => import('@/views/home/homearticle/jvbaoarticle')
//评论列表

const CommentList = () => import('@/views/CommentList.vue')
//商家合作注册页

const Register = () => import('@/views/Register.vue')
//审核资料

const Check = () => import('@/views/Check.vue')

//底部导航栏我的页面

const My = () => import('@/views/my/my.vue')
const link_code = () => import('@/views/my/About_my/link_code.vue')
const attention_shop = () => import('@/views/my/About_my/attention_shop.vue')
const collect_good = () => import('@/views/my/About_my/collect_good.vue')
const mei_card = () => import('@/views/my/mei_card/mei_card.vue')

const my_guan = () => import('@/views/my/About_my/My_guan.vue')

const my_fans = () => import('@/views/my/About_my/My_fans.vue')

const my_fabu = () => import('@/views/my/About_my/My_fabu.vue')
const wallet = () => import('@/views/my/About_my/wallet.vue')
const wallet_detail = () => import('@/views/my/About_my/wallet_detail.vue')
const my_shou = () => import('@/views/my/About_my/My_shou.vue')
const order = () => import('@/views/my/order/order.vue')
const tuikuan = () => import('@/views/my/order/tuikuan.vue')
const confirm_order = () => import('@/views/my/order/confirm_order.vue')
const order_detail = () => import('@/views/my/order/order_detail.vue')
const pingjia = () => import('@/views/my/order/pingjia.vue')
const pingjia_over = () => import('@/views/my/order/pingjia_over.vue')
const info_detail = () => import('@/views/my/order/info_detail.vue')
const pay = () => import('@/views/my/order/pay.vue')
const pay_after = () => import('@/views/my/order/pay_after.vue')
//个人信息页面

const Data = () => import('@/views/Data.vue')
//修改密码页

const Reset = () => import('@/views/setting/Reset.vue')
const setting_code = () => import('@/views/setting/setting_code.vue')
// 肤测记录页
const new_showcase = () => import('@/views/recode/new_showcase.vue')
const new_showcase_item = () => import('@/views/recode/new_showcase_item.vue')
const showcase = () => import('@/views/recode/showcase.vue')
const case_case = () => import('@/views/recode/case_case.vue')
const showcase_daren = () => import('@/views/recode/showcase_daren.vue')
const makeup = () => import('@/views/recode/makeup.vue')
const recommen = () => import('@/views/recode/recommen.vue')
const Recode = () => import('@/views/recode/Recode.vue')
const recode2 = () => import('@/views/recode/recode2.vue')
const advice = () => import('@/views/recode/advice.vue')
const skintest = () => import('@/views/recode/skintest.vue')
//订单中心

const submit_order = () => import('@/views/gonglv/Submit_order/Submit_order.vue')
// 社区页

const Community = () => import('@/views/community/Community.vue')

const guangzhu = () => import('@/views/message/Guangzhu.vue')

const huafen = () => import('@/views/community/HuaFen.vue')

const tophot = () => import('@/views/community/TopHot.vue')
//111111111111111

const zonghe = () => import('@/views/community/zonghe/ZongHe.vue')

const search_zonghe = () => import('@/views/community/zonghe/Search_Zonghe.vue')
//发布

//我的关注

const MyGuanzhu = () => import('@/views/MyGuanzhu.vue')
//我的粉丝

const Fans = () => import('@/views/Fans.vue')
//我的足迹

const Zuji = () => import('@/views/Zuji.vue')
//附近

const Fujin = () => import('@/views/Fujin.vue')
//发布笔记页

const Biji = () => import('@/views/Biji.vue')
//
import Main from '../views/Main.vue'
// 变美攻略页111111111111111111111111111111111

const Gonglv = () => import('@/views/gonglv/Gonglv.vue')
// 设置页

const Setting = () => import('@/views/setting/Setting.vue')
const fankui = () => import('@/views/setting/fankui.vue')

const shopping_address = () => import('@/views/setting/Shopping_address/shopping_address.vue')
const add_address = () => import('@/views/setting/Shopping_address/add_address.vue')

//注销
const need_zhuxiao = () => import('@/views/setting/zhuxiao/need_zhuxiao.vue')
const zhuxiao = () => import('@/views/setting/zhuxiao/zhuxiao.vue')
const need_zhuxiao_next=()=>import('@/views/setting/zhuxiao/need_zhuxiao_next.vue')
const zhuxiao_explain = () => import('@/views/setting/zhuxiao/zhuxiao_explain.vue')
const payment_before_np = () => import('@/views/setting/Payment/payment_before_np.vue')
const payment_bang_np = () => import('@/views/setting/Payment/payment_bang_np.vue')

const payment_main = () => import('@/views/setting/Payment/payment_main.vue')
const payment_bang_hp = () => import('@/views/setting/Payment/payment_bang_hp.vue')
const payment_before_pwd = () => import('@/views/setting/Payment/payment_before_pwd.vue')
const payment_set_pwd = () => import('@/views/setting/Payment/payment_set_pwd.vue')
const payment_password_set = () => import('@/views/setting/Payment/payment_password_set.vue')
const payment_password_change = () => import('@/views/setting/Payment/payment_password_change.vue')
const alipay_binding = () => import('@/views/setting/Payment/alipay_binding')
const wechat_binding = () => import('@/views/setting/Payment/wechat_binding')
const alipay_change = () => import('@/views/setting/Payment/alipay_change')
const realname = () => import('@/views/setting/Payment/realname')
// 银行卡

// alipay_binding
//编辑页面

const Edit = () => import('@/views/setting/Edit.vue')
// 账号与安全页

const Zhanghao = () => import('@/views/setting/Zhanghao.vue')
//商城mall页1111111111111111111

const Mall = () => import('@/views/mall/Mall.vue')
const jifen_mall = () => import('@/views/mall/jifen/jifen_mall.vue')
const jifen_turntable = () => import('@/views/mall/jifen/jifen_turntable.vue')
const jifen_detail = () => import('@/views/mall/jifen/jifen_detail.vue')
const jifen_card = () => import('@/views/mall/jifen/jifen_card.vue')
const jifen_record = () => import('@/views/mall/jifen/jifen_record.vue')
const jifen_mingxi = () => import('@/views/mall/jifen/jifen_mingxi.vue')
const jifen_explain = () => import('@/views/mall/jifen/jifen_explain.vue')
const task_center = () => import('@/views/mall/jifen/task_center.vue')

const fenxiao_center = () => import('@/views/mall/fenxiao/fenxiao_center.vue')
const fenxiao_code = () => import('@/views/mall/fenxiao/fenxiao_code.vue')
const fenxiao_tixian = () => import('@/views/mall/fenxiao/fenxiao_tixian.vue')
const fenxiao_bang_np = () => import('@/views/mall/fenxiao/fenxiao_bang_np.vue')
const fenxiao_bang_hp = () => import('@/views/mall/fenxiao/fenxiao_bang_hp.vue')
const fenxiao_before_np = () => import('@/views/mall/fenxiao/fenxiao_before_np.vue')
const fenxiao_before_pwd = () => import('@/views/mall/fenxiao/fenxiao_before_pwd.vue')
const fenxiao_set_pwd = () => import('@/views/mall/fenxiao/fenxiao_set_pwd.vue')
const fenxiao_tixian_over = () => import('@/views/mall/fenxiao/fenxiao_tixian_over.vue')
const fenxiao_team = () => import('@/views/mall/fenxiao/fenxiao_team.vue')
const fenxiao_tixian_recode = () => import('@/views/mall/fenxiao/fenxiao_tixian_recode.vue')
const fenxiao_order = () => import('@/views/mall/fenxiao/fenxiao_order.vue')
const newzone = () => import('@/views/mall/Activity/NewZone.vue')

const brand_main = () => import('@/views/mall/Brand/Brand_main.vue')


const all_brand = () => import('@/views/mall/Brand/All_brand.vue')


const sale = () => import('@/views/mall/Sale/sale.vue')



const oneyuan = () => import('@/views/mall/Sale/Oneyuan.vue')


const store_page = () => import('@/views/mall/Store/store_page.vue')
//美美供页

const Mgong = () => import('@/views/mgong/Mgong.vue')
//产品页

const product = () => import('@/views/product/Product.vue')
const project = () => import('@/views/project/project.vue')

const product_detail = () => import('@/views/product/Product_detail/Product_detail.vue')

const product_evaluate = () => import('@/views/product/Product_evaluate/product_evaluate')

const evaluate_detail = () => import('@/views/product/Product_evaluate/evaluate_detail')
//分类页

const Category = () => import('@/views/category/Category.vue')
//vip会员页面

const Vip = () => import('@/views/vip/Vip.vue')

// 消息页面及其子页

const Message = () => import('@/views/message/Message.vue')

const Guangzhu = () => import('@/views/message/Guangzhu.vue')

const Pinglun = () => import('@/views/message/Pinglun.vue')

const Sixin = () => import('@/views/message/Sixin.vue')
const m_shou = () => import('@/views/message/m_shou.vue')
const m_ping = () => import('@/views/message/m_ping.vue')

const Inform = () => import('@/views/message/Inform.vue')
const Informdetail = () => import('@/views/message/Informdetail.vue')
const inform_people = () => import('@/views/message/inform_people.vue')

const Collect = () => import('@/views/message/Collect.vue')

const Kefu = () => import('@/views/message/Kefu.vue')
//登录页 login文件里的路由

const Login = () => import('@/views/login/Login.vue')

const MLogin = () => import('@/views/login/MLogin.vue')

const FPassword = () => import('@/views/login/FPassword.vue')

const CPassword = () => import('@/views/login/CPassword.vue')

const vRegister = () => import('@/views/login/vRegister.vue')
//登录页 login文件里的路由
// 发布文章等增删改查

const fabu = () => import('@/views/fabu/FaBu.vue')

const fabulist = () => import('@/views/fabu/FaBuList.vue')

const bianji = () => import('@/views/fabu/BianJi.vue')
//看别人的个人信息11111111111111111111

const otherself = () => import('@/views/look_other/OtherSelf.vue')
const jvbao_user = () => import('@/views/look_other/jvbao_user.vue')
const jvbao_userlist = () => import('@/views/look_other/jvbao_userlist.vue')
const other_more = () => import('@/views/look_other/other_more.vue')

const his_guan = () => import('@/views/look_other/About_his/His_guan.vue')

const his_fans = () => import('@/views/look_other/About_his/His_fans.vue')
const shopping_car = () => import('@/views/car/shopping_car.vue')
// 隐私协议
// a安卓用user_serve
const user_serve = () => import('@/views/serve/user_serve.vue')
const serve_user = () => import('@/views/serve/serve_user.vue')
const yinsi = () => import('@/views/serve/yinsi.vue')
const guifan = () => import('@/views/serve/guifan.vue')
const about_our = () => import('@/views/serve/about_our.vue')
const aboutmqj = () => import('@/views/serve/aboutmqj.vue')
// 入驻合作
const enter = () => import('@/views/enter/enter.vue')
// 视频分享
const video = () => import('@/views/video/video.vue')
Vue.use(Router)


/*eslint-disable*/
const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home_more',
      component: home_more
    },
    {
      path: '/shopping_car',
      component: shopping_car
    },
    {
      path: '/user_serve',
      component: user_serve
    }, 
    {
      path: '/serve_user',
      component: serve_user
    }, {
      path: '/aboutmqj',
      component: aboutmqj
    },
    {
      path: '/enter',
      component: enter
    },
    {
      path: '/add_address',
      component: add_address
    },
    // {
    //   path: '/lulu',
    //   component: lulu
    // },
    // {
    //   path: '/ceshi',
    //   component: ceshi
    // },
    //公共页面
    //选择好友
    {
      path: '/select_people',
      component: select_people
    },
    //登录 与注册 相关页面
    {
      path: '/login',
      component: Login
    },
    {

      path: '/mlogin',
      component: MLogin
    }, {

      path: '/user_password',
      component: FPassword
    }, {

      path: '/cpassword',
      component: CPassword
    }, {

      path: '/user_register',
      component: vRegister
    },
    //登录 与注册 相关页面

    // 底部导航栏 路由嵌套
    // {
    //   path: '/main',
    //   component: Main,
    //   children: [
    //     {
    //       path: '/',
    //       component: Home,
    //     },
    //     {
    //       path: '/message',
    //       component: Message,
    //       meta: { slide: 'slide-to' }
    //     },
    //     {
    //       path: '/community',
    //       component: Community,
    //     },
    //     {
    //       path: '/my',
    //       component: My,
    //     },
    //   ]
    // },
    {
      path: '/message',
      component: Message,
      // meta: { slide: 'slide-to' }
    },
    {
      path: '/community',
      component: Community,
      meta: { title: '社区', keepAlive: true }
    },
    //111111111
    {
      path: '/zonghe',
      component: zonghe,
      // meta: { title:'综合',keepAlive:true }
    }, {
      path: '/search_zonghe',
      component: search_zonghe,
    },
    {
      path: '/my',
      component: My,
    },
    {
      path: '/mei_card',
      component: mei_card,
    },
    {
      path: '/order',
      component: order,
    },
    {
      path: '/tuikuan',
      component: tuikuan,
    },
    {
      path: '/need_zhuxiao',
      component: need_zhuxiao,
    },
    {
      path: '/zhuxiao',
      component: zhuxiao,
    },
    
    {
      path: '/zhuxiao_explain',
      component: zhuxiao_explain,
    },
    {
      path: '/need_zhuxiao_next',
      component: need_zhuxiao_next,
    },
    {
      path: '/confirm_order',
      component: confirm_order
    },
    {
      path: '/order_detail',
      component: order_detail
    },
    {
      path: '/pingjia',
      component: pingjia
    },
    {
      path: '/pingjia_over',
      component: pingjia_over
    },
    {
      path: '/info_detail',
      component: info_detail
    },
    {
      path: '/pay',
      component: pay
    },
    {
      path: '/pay_after',
      component: pay_after
    },
    {
      path: '/my_guan',
      component: my_guan,
    },
    {
      path: '/attention_shop',
      component: attention_shop,
    },
    {
      path: '/collect_good',
      component: collect_good,
    },
    {
      path: '/link_code',
      component: link_code,
    },
    {
      path: '/my_fans',
      component: my_fans,
    },
    {
      path: '/my_fabu',
      component: my_fabu,
      // meta: { title:'我的发布',keepAlive:true}
    },
    {
      path: '/my_shou',
      component: my_shou,
      meta: { title: '我的收藏', keepAlive: true }
    },
    {
      path: '/wallet',
      component: wallet,
    },
    {
      path: '/wallet_detail',
      component: wallet_detail,
    },

    //111111
    {
      path: '/gonglv',
      component: Gonglv,
      meta: { title: '变美功略', keepAlive: true }
    },
    {
      path: '/hot',
      component: Hot
    },
    ,
    {
      path: '/fabu',
      component: fabu
    },
    {
      path: '/huafen',
      component: huafen
    },
    {
      path: '/tophot',
      component: tophot
    },
    {
      path: '/fabulist',
      component: fabulist
    },
    {

      path: '/bianji',
      component: bianji
    },
    {
      path: '/list',
      component: List
    },
    //11111111
    {
      path: '/details',
      component: Details
    },
    {
      path: '/ranking',
      component: Ranking
    },
    {
      path: '/shop',
      component: Shop
    },
    {
      path: '/shopList',
      component: shopList
    },
    {
      path: '/articles',
      component: Articles
    },
    {
      path: '/articlesdetail',
      component: articlesdetail
    },
    {
      path: '/articlestie',
      component: articlestie
    },
    {
      path: '/articleshua',
      component: articleshua
    },
    {
      path: '/JvBaoarticleswen',
      component: JvBaoarticleswen
    },
    {
      path: '/jvbaoarticle',
      component: jvbaoarticle
    },
    {
      path: '/commentList',
      component: CommentList
    },
    {
      path: '/register',/** */
      component: Register
    },
    {
      path: '/check',
      component: Check
    },
    // {
    //   path: '/header',
    //   component: Header
    // },


    {
      path: '/data',/** */
      component: Data
    },
    {
      path: '/reset',
      component: Reset
    },
    {
      path: '/showcase',
      component: new_showcase
    },
    {
      path: '/showcase_daren',
      component: showcase_daren,
      // meta: { title:'达人推荐',keepAlive:true }
    },
    // {
    //   path: '/recommen',
    //   component:recommen
    // },
    {
      path: '/recode',
      component: recode2,
      meta: { title: '报告', keepAlive: true }
    },
    {
      path: '/new_showcase',
      component: new_showcase
    },
    {
      path: '/new_showcase_item',
      component: new_showcase_item,
    },
    {
      path: '/recode2',
      component: recode2
    },
    // {
    //   path: '/case_case',
    //   component:case_case
    // },
    {
      path: '/makeup',
      component: makeup,
      // meta: { title:'妆容推荐',keepAlive:true }
    },
    {
      path: '/advice',
      name: 'advice',
      component: advice,
    },
    {
      path: '/skintest',
      component: skintest
    },

    {
      path: '/fans',
      component: Fans
    },

    {
      path: '/zuji',
      component: Zuji
    },
    {
      path: '/fujin',
      component: Fujin
    },
    {
      path: '/biji',
      component: Biji
    },
    // {
    //   path: '/order',
    //   component: Order
    // },
    {
      path: '/submit_order',
      component: submit_order
    },
    //1111111
    {
      path: '/mall',
      name:'Mall',
      component: Mall,
       meta: { title:'商城',keepAlive:true }

    },
    {
      path: '/jifen_mall',
      component: jifen_mall,
    },
    {
      path: '/jifen_card',
      component: jifen_card,
    },
    {
      path: '/jifen_explain',
      component: jifen_explain,
    },
    {
      path: '/jifen_detail',
      component: jifen_detail,
    },
    {
      path: '/jifen_turntable',
      component: jifen_turntable,
    },
    {
      path: '/jifen_record',
      component: jifen_record,
    },
    {
      path: '/jifen_mingxi',
      component: jifen_mingxi,
    },
    {
      path: '/fenxiao_center',
      component: fenxiao_center,
    },
    {
      path: '/fenxiao_code',
      component: fenxiao_code,
    },
    {
      path: '/fenxiao_order',
      component: fenxiao_order,
    },
    {
      path: '/fenxiao_tixian_recode',
      component: fenxiao_tixian_recode,
    },
    {
      path: '/fenxiao_team',
      component: fenxiao_team,
    },
    {
      path: '/fenxiao_before_pwd',
      component: fenxiao_before_pwd,
    },
    {
      path: '/fenxiao_set_pwd',
      component: fenxiao_set_pwd,
    },
    {
      path: '/fenxiao_bang_np',
      component: fenxiao_bang_np
    },
    {
      path: '/fenxiao_bang_hp',
      component: fenxiao_bang_hp
    },
    {
      path: '/fenxiao_before_np',
      component: fenxiao_before_np
    },
    {
      path: '/fenxiao_tixian',
      component: fenxiao_tixian,
    },
    {
      path: '/fenxiao_tixian_over',
      component: fenxiao_tixian_over,
    },
    {
      path: '/task_center',
      component: task_center
    },
    {
      path: '/brand_main',
      component: brand_main
    },
    {
      path: '/all_brand',
      component: all_brand
    },
    {
      path: '/sale',
      component: sale
    }, {
      path: '/oneyuan',
      component: oneyuan
    },
    {
      path: '/store_page',
      component: store_page
    },
    {
      path: '/product_detail',
      name:'product_detail',
      component: product_detail
    },
    {
      path: '/product_evaluate',
      component: product_evaluate
    },
    {
      path: '/evaluate_detail',
      component: evaluate_detail
    },
    {
      path: '/newzone',
      component: newzone
    },
    {
      path: '/mmgong',
      component: Mgong
    },
    {
      path: '/product',
      name:'product',
      component: product,
      meta: {keepAlive: true }

    },
    {
      path: '/project',
      component: project,
      // meta: { title: '项目列表', keepAlive: true }
    },
    {
      path: '/category',
      component: Category
    },



    /*消息页面路由*/
    {
      path: '/guangzhu',
      component: guangzhu,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/m_shou',
      component: m_shou,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/m_ping',
      component: m_ping,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/pinglun',
      component: Pinglun,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/sixin',
      component: Sixin,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/inform',
      component: Inform,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/inform_people',
      component:inform_people,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/informdetail',
      component: Informdetail,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/collect',
      component: Collect,
      meta: { slide: 'slide-back' }
    },
    {
      path: '/kefu',
      component: Kefu,
      meta: { slide: 'slide-back' }
    },
    //设置页
    {
      path: '/setting',
      component: Setting,
    },
    {
      path: '/setting_code',
      component: setting_code,
    },
    {
      path: '/fankui',
      component: fankui
    },
    {
      path: '/payment_password_set',
      component: payment_password_set,
    },
    {
      path: '/payment_bang_hp',
      component: payment_bang_hp,
    },
    {
      path: '/payment_before_np',
      component: payment_before_np,
    },
    {
      path: '/payment_bang_np',
      component: payment_bang_np,
    },
    {
      path: '/payment_set_pwd',
      component: payment_set_pwd,
    },
    {
      path: '/payment_before_pwd',
      component: payment_before_pwd,
    },
    {
      path: '/payment_password_change',
      component: payment_password_change
    },
    {
      path: '/realname',
      component: realname
    },
    {
      path: '/alipay_binding',
      component: alipay_binding
    },
    {
      path: '/wechat_binding',
      component: wechat_binding
    },
    {
      path: '/alipay_change',
      component: alipay_change
    },
    {
      path: '/payment_main',
      component: payment_main
    },
    {
      path: '/shopping_address',
      component: shopping_address
    },
    //编辑页 
    {
      path: '/edit',
      component: Edit,
    },
    {
      path: '/zhanghao',
      component: Zhanghao,
    },
    {
      path: '/vip',
      component: Vip
    }
    //111111111111
    ,
    {
      path: '/otherself',
      component: otherself
    },
    {
      path: '/jvbao_user',
      component: jvbao_user
    },
    {
      path: '/jvbao_userlist',
      component: jvbao_userlist
    },
    {
      path: '/other_more',
      component: other_more
    },
    {
      path: '/his_guan',
      component: his_guan
    },
    {
      path: '/his_fans',
      component: his_fans
    },
    {
      path: '/yinsi',
      component: yinsi
    },
    {
      path: '/guifan',
      component: guifan
    },
    {
      path: '/about_our',
      component: about_our
    }, {
      path: '/jia_v',
      component: jia_v
    },
    {
      path: '/set_mobile',
      component: set_mobile
    },
    {
      path: '/jia_v_daren',
      component: jia_v_daren
    }
    ,
    {
      path: '/jia_v_daren_fans',
      component: jia_v_daren_fans
    }
    ,
    {
      path: '/jia_v_daren_read',
      component: jia_v_daren_read
    }
    ,
    {
      path: '/jia_v_zhuanjia',
      component: jia_v_zhuanjia
    },
    {
      path: '/jia_v_zhuanjia_up',
      component: jia_v_zhuanjia_up
    },
    {
      path: '/jia_v_framer',
      component: jia_v_framer
    }
    ,
    {
      path: '/video',
      component: video
    }

  ],
  // scrollBehavior (to, from, savedPosition) {
  //   return {
  //     x: 0,
  //     y: 0
  //   }
  // }
})

router.beforeEach((to, from, next) => {
  next()
  // window.scrollTo(0,0);
});
export default router


