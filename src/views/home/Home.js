/*eslint-disable*/
import Tabbar from "../../components/Tabbar";
import Search from "../../components/Searchm";
import { List } from 'vant';
export default {
  data () {
    return {
      page: 1,
      loading: false,
      finished: false,
      jingimg: [],
      lunboimg: [
        // { Icon: "http://test1.merrychange.net/Content/Upload/Image/Link/20191022022451814.jpg" },
        // { Icon: "http://test1.merrychange.net/Content/Upload/Image/Link/20191022022451814.jpg" },
        // { Icon: "http://test1.merrychange.net/Content/Upload/Image/Link/20191022022451814.jpg" },
      ],
      swiperOption: {
        loop: true,
        roundLengths: true,
        initialSlide: 2,
        speed: 600,
        slidesPerView: "auto",
        centeredSlides: true,
        followFinger: false,
        autoplay: {
          autoplay: true,
          delay: 1500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      imgs: [
        {
          src: require("../../assets/images/home_select1.png"),
          text: "美美道",
          url: "/mall"
        },
        {
          src: require("../../assets/images/home_select2.png"),
          text: "美美供",
          url: "/"
        },
        {
          src: require("../../assets/images/home_select2.png"),
          text: "变美攻略",
          url: "/gonglv"
        },
        {
          src: require("../../assets/images/home_select4.png"),
          text: "美美聊",
          url: "/message"
        }
      ]
    };
  },
  components: {
    Tabbar,
    Search
  },
  methods: {
    //上拉加载
    onLoad () {
      // 异步更新数据

      this.page += 1
      this.getjing()
    },
    // 获取轮播图
    getlink () {
      this.axios.post(this.$api + '/mobile/GetLink', {

      }).then(res => {
        this.lunboimg = res.data.Data

      }).catch(err => {

      })
    },
    // 获取精选内容
    getjing () {
      this.axios.post(this.$api + '/mobile/GetIndexArticleInfoList', {
        Page: this.page,
        Rows: 6
      }).then(res => {
        // this.jingimg=res.data.Data.List
        this.loading = false;
        if (res.data.Data.List.length) {
          var arr = res.data.Data.List
          for (let i = 0; i < arr.length; i++) {
            this.jingimg.push(arr[i])
          }
        } else {
          this.finished = true
        }
      }).catch(err => {

      })
    },
    towen (id) {
      this.$router.push({
        path: '/articlesdetail',
        query: {
          id: id
        }
      })
    }
  },
  mounted () {
    this.getlink()
    this.getjing()
  }
};