<template>
  <div>
    <div class="top">
      <i class="iconfont icon-sousuo"></i>
      <input
        ref="username"
        placeholder="请输入你要搜索的内容"
        v-model.trim="searchCondition"
        type="text"
        @keyup.enter="search()"
      />
      <span @click="onleft">取消</span>
    </div>

    <!-- 内容-->
    <!-- 历史记录 -->
    <div v-show="historySearch.length">
      <div class="title">
        历史记录
        <i class="iconfont icon-shanchu1" @click="clearHistory()"></i>
      </div>
      <div class="content">
        <div
          class="ball"
          v-for="(item,index) in historySearch"
          :key="index"
          @click="tozong(item)"
        >{{item| renMenLength}}</div>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div>
      <div class="title">
        热门搜索
        <img src="../../../assets/images/search_hot.png" alt />
      </div>
      <div class="content">
        <div
          class="ball"
          v-for="(item,index) in hotWord"
          :key="index"
          @click="tozong(item.value)"
        >{{item.value | renMenLength}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchCondition: "",
      historySearch: [],
      hotWord: [{ value: "变美" }]
    };
  },
  methods: {
    //返回上一步
    onleft() {
      // this.$router.back(-1);
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
          this.$domain.url+"articlestie?id=" + this.articleid;
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
    //搜索框回车事件
    search() {
      this.setLocalStorage();
      this.$router.push({
        path: "/zonghe",
        query: {
          name: this.searchCondition
        }
      });
    },
    //存储方法
    setLocalStorage() {
      let searchWord = localStorage.getItem("searchWord");
      if (searchWord == null) {
        localStorage.setItem("searchWord", this.searchCondition);
      } else {
        let arr = localStorage.getItem("searchWord");
        arr = arr.split(",");
        //去除重复的历史搜索
        if (arr.indexOf(this.searchCondition) != -1) {
          arr = arr;
        } else {
          // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
          arr.unshift(this.searchCondition);
        }
        this.historySearch = arr;
        //设置历史搜索最多显示多少条
        if (this.historySearch.length > 8) {
          // pop() 方法用于删除并返回数组的最后一个元素。
          this.historySearch.pop();
        }
        localStorage.setItem("searchWord", this.historySearch);
      }
    },
    //清空历史搜索
    clearHistory() {
      this.historySearch = [];
      localStorage.removeItem("searchWord");
    },
    //在跳转综合页
    tozong(value) {
      console.log(value);
      this.$router.push({
        path: "/zonghe",
        query: {
          name: value
        }
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.username.focus();
    });
    let searchHistory = localStorage.getItem("searchWord");
    if (searchHistory) {
      this.historySearch = searchHistory.split(",");
      console.log(this.historySearch);
    }
  },
  mounted() {
    // this.$refs.username.focus();
  }
};
</script>
<style lang="less" scoped>
@base: 75rem;
.top {
  width: 100%;
  height: 140 / @base;
  position: relative;
  line-height: 140 / @base;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 40 / @base;
  display: flex;
  align-items: center;
  i {
    position: absolute;
    left: 60 / @base;
    display: inline-block;
    font-size: 38 / @base;
    color: #757575;
  }
  input {
    width: 80%;
    height: 85 / @base;
    border-radius: 20px;
    background: #eeeeee;
    font-size: 25 / @base;
    padding-left: 70 / @base;
  }
  span {
    display: inline-block;
    font-size: 30 / @base;
    color: #000;
    margin-left: 30 / @base;
  }
}
// 公共类
.title {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  padding-left: 30 / @base;
  font-size: 40 / @base;
  img {
    position: absolute;
    top: 45 / @base;
    left: 200 / @base;
    width: 60 / @base;
    background-size: 100% 100%;
  }
  // font-weight: 550;
  i {
    position: absolute;
    right: 40 / @base;
    font-size: 50 / @base;
  }
}
//内容类
.content {
  padding: 0 40 / @base;
  width: 100%;
  max-height: 240 / @base;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: hidden;
  .ball {
    padding: 0 10 / @base;
    min-width: 160 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    border-radius: 20px;
    background: #e5e5e5;
    text-align: center;
    font-size: 24 / @base;
    margin-bottom: 20 / @base;
    color: #a0a0a0;
    margin-right: 30 / @base;
  }
}
</style>