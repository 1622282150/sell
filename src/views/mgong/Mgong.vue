<template>
  <div class="container">
    <header>
      <div class="left">测一测</div>
      <Search></Search>
      <div class="right">分类</div>
    </header>

    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>
          <img src="../../assets/images/gonglv_99.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="../../assets/images/gonglv_99.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img src="../../assets/images/gonglv_99.jpg" alt />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <nav>
      <ul>
        <li v-for="(item, index) in 4" :key="index">
          <a href="#">
            <img src="../../assets/images/gonglv_fushi1.png" alt />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/*eslint-disable*/
import Search from "../../components/Searchm";
export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    Search
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.container {
  height: 2000 / @base;
}

.padding20 {
  padding: 0 20 / @base;
}
header {
  height: 150 / @base;
  width: 100%;
  padding: 0 100 / @base;
  position: relative;
  // z-index: 999;
  background-color: #e1d2ff;
  padding-top: 50 / @base;

  .left,
  .right {
    position: absolute;
    top: 40 / @base;
    height: 100 / @base;
    width: 100 / @base;
    padding-top: 60 / @base;
    color: #fff;
    text-align: center;
    font-size: 24 / @base;
  }
  .left {
    left: 0;
    background: url(../../assets/images/gonglv_sao.png) center top no-repeat;
    background-size: 52 / @base 52 / @base;
  }
  .right {
    right: 0;
    background: url(../../assets/images/mgongfenlei.png) center top no-repeat;
    background-size: 52 / @base 52 / @base;
  }
}

.swiper {
  .padding20();
  padding-top: 20 / @base;
  border-radius: 20 / @base;
  overflow: hidden;
  img {
    height: 350 / @base;
  }
}
.swiper /deep/ .swiper-pagination-bullet {
  background: #56454c;
  opacity: 0.5;
}
.swiper /deep/ .swiper-pagination-bullet-active {
  background: #8b06d8;
}

nav {
  .padding20();
  margin-top: 20 / @base;
  font-size: 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 50%;
      a {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>