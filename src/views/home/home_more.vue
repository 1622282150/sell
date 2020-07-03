<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <img class="swiper-slide" src="../../assets/images/brand_logo1.png" />
      </swiper-slide>
      <swiper-slide>
        <img class="swiper-slide" src="../../assets/images/brand_logo2.png" />
      </swiper-slide>
      <swiper-slide>
        <img class="swiper-slide" src="../../assets/images/brand_logo3.png" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
// import { Dialog } from 'vant';

export default {
  data() {
    return {
      swiperOption: {
        //可见图片张数
        slidesPerView: 3,
        // 默认选中中间一张
        centeredSlides: true,
        //无限循环
        // loop: true,
        initialSlide: 1,
        //小圆点（我此处没使用，列出供参考）
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        //自动轮播
        // autoplay: {
        //   stopOnLastSlide: true
        // },
        //上下按钮点击轮播效果
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: function() {
            console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
          }
        }
      }
    };
  },
  mounted() {}
};
</script>
<style scoped lang='less'>
@base: 75rem;
.swiper-slide {
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.swiper-slide img {
  width: 100px;
  height: 100px;
  transition: 0s;
}

.swiper-slide-active img,
.swiper-slide-duplicate-active img {
  height: 120px;
}
</style>