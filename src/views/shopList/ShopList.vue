<template>
  <div class="container">
    <!-- 头部 -->
    <Head :show="true" color="#3c3c3c">门店列表</Head>

    <!-- banner -->

    <div class="banner">
      <img src="../../assets/images/shoplist_banner.jpg" alt />
    </div>

    <div class="choose">
      <van-dropdown-menu active-color="#b695e9">
        <van-dropdown-item title="全城" ref="item">
          <div class="out">
            <div
              class="city"
              @click="onConfirm(index)"
              :class="{ active: id == index, padd: index == 0}"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="dist">{{item.distance}}</div>
              <span>{{item.name}}</span>
            </div>
          </div>
        </van-dropdown-item>

        <van-dropdown-item v-model="value" :options="option" title="智能排序" />

        <van-dropdown-item title="筛选" ref="item1">
          <div class="choice">
            <div class="name">
              <div class="checked">
                <van-checkbox
                  label-position="left"
                  v-model="checked"
                  checked-color="#b695e9"
                  shape="square"
                >只看免预约</van-checkbox>
              </div>
            </div>
            <div class="btn">
              <button>重置</button>
              <button>完成</button>
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <div class="product">
      <div class="inner">
        <div class="left clearfix">
          <img src="../../assets/images/shoplist_title.jpg" alt class="fl" />
          <div class="clean">
            <p class="deep">汉宫汗蒸美容养生馆</p>
            <div class="rate">
              <van-rate allow-half v-model="value1" readonly color="#b695e9" void-color="#eee" />
              <span>4.5 分</span>
            </div>
            <div class="price">
              <span class="yang">养生 / 气泡</span>
              <span>距离下沙龙湖天街5.2km</span>
            </div>
            <p></p>
          </div>
        </div>

        <div class="sell">
          <div class="bg clearfix">
            <div class="left fl">
              <p class="jiage">¥ 50</p>
              <p class="mendian">门店价: ¥ 500</p>
            </div>

            <div class="right fl">
              <p class="name">单人肩颈酸痛按摩艾灸调理</p>
              <p class="sellout">已售 14</p>
            </div>
          </div>
          <div class="bg clearfix">
            <div class="left fl">
              <p class="jiage">¥ 50</p>
              <p class="mendian">门店价: ¥ 500</p>
            </div>

            <div class="right fl">
              <p class="name">单人肩颈酸痛按摩艾灸调理</p>
              <p class="sellout">已售 14</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chakan">
        <div class="link">
          <a href="#">点击查看所有下项目</a>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="inner">
        <div class="left clearfix">
          <img src="../../assets/images/shoplist_title.jpg" alt class="fl" />
          <div class="clean">
            <p class="deep">汉宫汗蒸美容养生馆</p>
            <div class="rate">
              <van-rate allow-half v-model="value1" readonly color="#b695e9" void-color="#eee" />
              <span>4.5 分</span>
            </div>
            <div class="price">
              <span class="yang">养生 / 气泡</span>
              <span>距离下沙龙湖天街5.2km</span>
            </div>
            <p></p>
          </div>
        </div>

        <div class="sell">
          <div class="bg clearfix">
            <div class="left fl">
              <p class="jiage">¥ 50</p>
              <p class="mendian">门店价: ¥ 500</p>
            </div>

            <div class="right fl">
              <p class="name">单人肩颈酸痛按摩艾灸调理</p>
              <p class="sellout">已售 14</p>
            </div>
          </div>
          <div class="bg clearfix">
            <div class="left fl">
              <p class="jiage">¥ 50</p>
              <p class="mendian">门店价: ¥ 500</p>
            </div>

            <div class="right fl">
              <p class="name">单人肩颈酸痛按摩艾灸调理</p>
              <p class="sellout">已售 14</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chakan">
        <div class="link">
          <a href="#">点击查看所有下项目</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./ShopList.js">

</script>
<style lang="less" scoped src="./ShopList.less">
</style>


