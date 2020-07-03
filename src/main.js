// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index.js'  
import domain from '@/utils/domain.js'
import Bridge from './utils/bridge.js'
import plugins from './utils/plugins.js'
import moment from 'moment'
import Vant from 'vant'
import 'vant/lib/index.css'
import waterfall from "vue-waterfall2";
import * as custom from '@/filter/filter.js'
import { Scroller,Tab, TabItem,Timeline,TimelineItem} from 'vux'
import $ from 'jquery'
import  fastClick from 'fastclick'

fastClick.attach(document.body)
// 视频
import 'video.js/dist/video-js.css'

// 监听手指
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
Vue.prototype.axios = axios
import 'swiper/dist/css/swiper.css'

import './styles/base.css'
import './utils/flexible.js'
Vue.use(waterfall);
Vue.component('scroller', Scroller)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('timeline', Timeline)
Vue.component('timeline-item', TimelineItem)
Vue.use(Vant)
Vue.use(VueAwesomeSwiper)

//全局过滤器文件

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.filter("dateFmt", (input, formatString = "YYYY-MM-DD") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString || 

  
   // moment(input) 把时间字符串转成时间对象
   // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
})
Vue.config.productionTip = false
import { VueMasonryPlugin } from 'vue-masonry'
Vue.use(VueMasonryPlugin)
Vue.prototype.$api = api
Vue.prototype.$bridge = Bridge
Vue.prototype.$domain=domain
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
