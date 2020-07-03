import BScroll from "better-scroll";
import "../../fonts/iconfont.css";
import Return from "../../components/Return.vue";
import { Popup, Toast } from 'vant'
import request from '@/utils/request'
export default {
  data () {
    return {
      isFirstEnter:true, //首次进入
      sort: 'hv',//Sort=hv 综合， Sort=Popularity 人气  ，Sort=Price 价格）
      order: '',//asc  desc
      page: 1,
      loading: false,
      finished: false,
      index: '',
      id: '',
      isa: false, //价格黑色化
      issheng: false,
      ServiceType:[],//选择的服务的数组
      ispinpai: true,//品牌动态显示
      brand: '',  //选择的品牌名字
      brandid:'',   //选择的品牌id
      BrandIds:[],//后台需要的id
      MinPrice: '',//最小价格
      MaxPrice:'',//最大价格
      brandlist: [],
      fuwulist: [],
      showpopup: false,
      list: [],
      name: '',
      titletop_list: [
        // { title: '洁面' }, { title: '化妆水' }, { title: '面膜' }, { title: '精华' }, { title: '卸妆' }, { title: '乳液面霜' },
      ],
      active_title_index: -1,
      vertical: true, // 排列是否竖排b
    };
  },
  watch: {
    $route (to, from) {

    }
  },
  mounted () {
    this.isFirstEnter=true
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // console.log('你看到我了')
      this.active_title_index = -1
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.list = []
      this.name = this.$route.query.name
      this.id = this.$route.query.id
      this.GetCommodityCategoryInfoList()
      this.GetCommodityInfoList()
    }
    this.$route.meta.isBack = false;
    this.isFirstEnter=false
  },
  beforeRouteEnter (to, from, next) {
    // console.log(from.name,to.name)
    if (from.name === 'product_detail' && to.name === 'product') {
      // console.log('我改变了某些值')
      to.meta.isBack = true;
      next()
    } else {
      next()
    }
  },
  methods: {
    onLoad () {
      this.page += 1;
      this.GetCommodityInfoList()
    },
    // 获取子分类
    // 获取产品分类
    GetCommodityCategoryInfoList () {
      request.post(this.$api + '/mobile/GetCommodityCategoryInfoList', {
        ParentId: this.id,
        Rows: 20
      }).then(res => {
        this.titletop_list = res.Data.List
      }).catch(err => {

      })
    },
    // 价格升降序
    jiage () {
      // console.log('触发了')
      this.isa = true;
      this.issheng = !this.issheng
      if (this.issheng) {
        this.order = 'asc'
        this.sort = 'Price'
        this.page = 1
        this.loading = false
        this.finished = false
        this.list = []
        this.GetCommodityInfoList()
      } else {
        this.order = 'desc'
        this.sort = 'Price'
        this.page = 1
        this.loading = false
        this.finished = false
        this.list = []
        this.GetCommodityInfoList()
      }
    },
    // 获取产品列表
    GetCommodityInfoList () {
      request.post(this.$api + '/mobile/GetCommodityInfoList', {
        BrandIds: this.BrandIds,
        MinPrice: this.MinPrice,
        MaxPrice: this.MaxPrice,
        ServiceType:this.ServiceType,
        CategoryId: this.id || 0,
        Page: this.page,
        Order: this.order,
        Sort: this.sort,
        Rows: 8
      }).then(res => {
        // this.list = res.Data.List
        // console.log(this.list)
        this.loading = false;
        if (res.Data.List.length) {
          var arr = res.Data.List
          for (let i = 0; i < arr.length; i++) {
            this.list.push(arr[i])
          }
        } else {
          this.finished = true
        }
      }).catch(err => {

      })
    },
    tochanpin (id) {
      this.$router.push({
        path: '/product_detail',
        query: {
          id: id
        }
      })
    },
    // 获取品牌接口
    GetCommodityBrandFromFront () {
      request.post(this.$api + '/mobile/GetCommodityBrandFromFront', {
        Count: 10,             //获取数量
        CommodityCategoryId: this.id   //商品分类编号 
      }).then(res => {

        this.brandlist = res.Data.List

      }).catch(err => {

      })
    },
    // 获取商品服务
    GetCommodityServiceTypeList () {
      request.post(this.$api + '/mobile/GetCommodityServiceTypeList', {

      }).then(res => {
        // this.fuwulist = res.Data.List
        var arr = res.Data.List
        arr.forEach(ele => {
          ele.isSelected=false
        });
        this.fuwulist=arr
      }).catch(err => {

      })
    },
    //显示筛选框
    shaixuan () {
      // 重置状态
      this.ispinpai=true
      this.ServiceType = []
      this.BrandIds = []
      this.brandid = ''
      this.MaxPrice = ''
      this.MinPrice = ''
      this.brand=''
      this.GetCommodityBrandFromFront();// 获取品牌接口
      this.GetCommodityServiceTypeList();// 获取商品服务
      this.showpopup = true;
    },
    //显示筛选框-选择品牌
    sel_brand (item) {
      // console.log(name)
      this.brand = item.Name
      this.brandid=item.Id
      this.ispinpai = false
    },
    //取消选择的品牌
    delete_pinpai () {
      console.log('执行了取消')
      this.ispinpai = true
      this.brand = ''
      this.brandid=''
      this.BrandIds=[]
    },
    m1() {
       var a=1
    },
    m2 () {
      let b
      console.log('我要输出上个方法的a',b)
    },
    sel_fuwu (item, index) {
      item.isSelected = !item.isSelected //然后通过这个属性判断是否选中点亮和取消
    },
    // 参数确定方法
    type_btn () {
      // @click="showpopup = false"
      this.BrandIds.push(this.brandid)
      this.fuwulist.forEach(i => {
        if (i.isSelected) {
          this.ServiceType.push(i.Id)
        }
      })
      if (this.MinPrice > this.MaxPrice) {
        var a = this.MinPrice; var b = this.MaxPrice
        this.MaxPrice = a
        this.MinPrice=b
      }
      console.log(this.MinPrice, this.MaxPrice)
      console.log(this.ServiceType)
      console.log(this.BrandIds)
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.list = []
      this.GetCommodityInfoList()
      this.showpopup = false
    },
    // 选择物品分类
    sel (id, index) {
      this.active_title_index = index
      this.id = id
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.list = []
      this.GetCommodityInfoList()
    },
    //推荐
    tuijian () {
      this.$refs.tuijian.style.color = '#C8B0EF'
      this.$refs.renqi.style.color = 'black'
      this.sort = 'hv'
      this.page = 1
      this.loading = false
      this.finished = false
      this.list = []
      this.GetCommodityInfoList()
    },
    //人气
    renqi () {
      this.$refs.tuijian.style.color = 'black'
      this.$refs.renqi.style.color = '#C8B0EF'
      this.sort = 'Popularity'
      this.page = 1
      this.loading = false
      this.finished = false
      this.list = []
      this.GetCommodityInfoList()
      
    },
    

  },

  components: { Return }
};