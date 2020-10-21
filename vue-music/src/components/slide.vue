<template>
  <div class="banner">
    <div class="slide">
      <div class="swiper-container" :class="swiperid">
        <div class="swiper-wrapper">
          <!-- 存放具体的轮播内容 -->
          <slot name="slideContainer"></slot>
        </div>
        <!-- 分页器 -->
        <!-- <div :class="{ 'swiper-pagination': pagination }"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  props: {
    swiperid: {
      type: String,
      default: ""
    },
    effect: {
      type: String,
      default: "fade"
    },
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    pagination: {
      type: Boolean,
      default: true
    },
    paginationType: {
      type: String,
      default: "bullets"
    },
    autoPlay: {
      type: String,
      default: 3000
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      var _this = this;
      var mySwiper = new Swiper("." + _this.swiperid, {
        //循环
        loop: _this.loop,
        //分页
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet"
        },
        //分页类型
        paginationType: _this.paginationType,
        //自动播放
        autoplay: {
          delay: +_this.autoPlay,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        //动画时间
        speed: 500,
        //方向
        direction: _this.direction,
        //特效
        effect: _this.effect,
        //修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        //修改swiper的父元素时，自动初始化swiper
        observeParents: true
      });
    }
  }
};
</script>

<style>
.swiper-container {
  width: 90%;
  margin-top: 20px;
}
.swiper-wrapper {
  height: auto;
  position: relative;
}
.swiper-wrapper .swiper-slide {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.swiper-wrapper .swiper-slide img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.swiper-wrapper .swiper-slide span {
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  color: white;
  position: absolute;
  bottom: 22px;
  right: 20px;
  font-size: 14px;
}
.swiper-pagination-bullet-active {
  background: red;
}
</style>
