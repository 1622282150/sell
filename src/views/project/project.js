import BScroll from "better-scroll";
import "../../fonts/iconfont.css";
import Return from "../../components/Return.vue";
import { Popup } from 'vant'
import request from '@/utils/request'
export default {
  data () {
    return {
      index:'',
      id:'',
      value: 0,
      option: [
        { text: "好评优先", value: 0 },
        { text: "最新发布", value: 1 },
        { text: "人气优先", value: 2 },
        { text: "价格最低", value: 3 },
        { text: "价格最高", value: 4 },
      ],
      alist: [
        { name: "附近", },
        { name: "行政区", },
      ],
      address1index: 0,//选择地址第一个
     address2index: 0,//选择地址第2个
      distanc1: ['不限', '1km', '2km', '3km'],
      distance2: ['西湖区', '下城区', '江干区', '上城区', '江干区'],
      checked: true,
      active_tuante: '',
      tuante: ['团购', '特惠'],
      leibie_type: ['脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部',],
      gongxiao_type: ['美白', '补水稍等', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部', '脸部',],
      isa: false, //价格黑色化
      issheng:false,
      active_fuwu: 0,
      ispinpai: true,//品牌动态显示
      brand: '',
      brandlist: [
        '海澜之家', '韩优尚', '奇米', '男人之家'
      ],
      fuwulist: [{ name: '包邮', isSelected: false },
      { name: '折扣', isSelected: false },
      { name: '限时特卖', isSelected: false },
      { name: '今日特卖', isSelected: false },
      { name: '极速发货', isSelected: false },
      { name: '货到付款', isSelected: false }],
      showpopup: false,
      list: [

      ],
      name: '',
      titletop_list: [
        { title: '洁面' }, { title: '化妆水' }, { title: '面膜' }, { title: '精华' }, { title: '卸妆' }, { title: '乳液面霜' },
      ],
      active_title_index: 0,
      vertical: true // 排列是否竖排
    };
  },
  methods: {
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
    // 价格升降序
    jiage () {
      console.log('触发了')
      this.isa = true;
      this.issheng = !this.issheng
      if (this.issheng) {
        request.post(this.$api + '/mobile/GetCommodityProjectInfoList', {
          CategoryId: this.id||0,
          Sort: 'Price',
          Order:'asc',
          Page: 1,
          Rows:8
      }).then(res => {
          this.list = res.Data.List
          console.log(this.list)
      }).catch(err => {
        GetCommodityProjectInfoList
      })  
      } else {
        request.post(this.$api + '/mobile/GetCommodityProjectInfoList', {
          CategoryId:this.id||0,
          Sort: 'Price',
          Order:'desc',
          Page: 1,
          Rows:8
      }).then(res => {
          this.list = res.Data.List
          console.log(this.list)
      }).catch(err => {
          
      })  
      }
    },
    GetCommodityCategoryInfoList () {
      request.post(this.$api + '/mobile/GetCommodityCategoryInfoList', {
          ParentId: this.id
      }).then(res => {
          this.titletop_list=res.Data.List
      }).catch(err => {

      })
  },
    // 获取产品列表
    GetCommodityInfoList () {
      request.post(this.$api + '/mobile/GetCommodityProjectInfoList', {
          CategoryId:this.id,
          Page: 1,
          Rows:8
      }).then(res => {
          this.list = res.Data.List
          console.log(this.list)
      }).catch(err => {
          
      })  
    },
    tochanpin (id) {
      this.$router.push({
          path: '/details',
          query: {
              id:id
          }
      })
  },
    //显示筛选框
    shaixuan () {
      this.showpopup = true;
    },
    //显示筛选框-选择品牌
    sel_brand (name) {
      console.log(name)
      this.brand = name
      this.ispinpai = false
    },
    //取消选择的品牌
    delete_pinpai () {
      this.ispinpai = true
      this.brand = ''
    },
    sel_fuwu (item, index) {
      this.active_fuwu = index
      item.isSelected = !item.isSelected //然后通过这个属性判断是否选中点亮和取消
    },
    // 选择物品分类
    sel (index) {
      this.active_title_index = index
    },
    //推荐
    tuijian () {
      this.$refs.tuijian.style.color = '#C8B0EF'
      this.$refs.renqi.style.color = 'black'
    },
    //人气
    renqi () {
      this.$refs.tuijian.style.color = 'black'
      this.$refs.renqi.style.color = '#C8B0EF'
    },
    //升序降序

  },
  mounted () {
    this.name = this.$route.query.name
    this.id = this.$route.query.id
    // this. GetCommodityCategoryInfoList () 
    this.GetCommodityInfoList ()
  },
  components: { Return }
};