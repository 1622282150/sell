/*eslint-disable*/
import Head from "../../components/Header";
export default {
  data () {
    return {
      list: [
        { name: "附近 >", distance: "1km" },
        { name: "西湖区", distance: "2km" },
        { name: "江干区", distance: "3km" }
      ],
      id: -1,
      is: false,
      checked: true,
      value1: 4.5,
      value: 0,
      switch1: false,
      switch2: false,
      option: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ]
    };
  },

  methods: {
    onConfirm (index) {
      this.id = index;
      this.$refs.item.toggle();
      this.is = true;
      console.log(index);
    }
  },
  components: {
    Head
  }
};