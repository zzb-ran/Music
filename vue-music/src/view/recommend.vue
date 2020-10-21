<template>
  <div class="recommend">
    <slide
      swiperid="swiper"
      ref="swiper"
      autoPlay="4000"
      effect="fade"
      :loop="false"
    >
      <div
        class="swiper-slide"
        v-for="(item,index) in slideList"
        :key="item.id"
        slot="slideContainer"
        @click="play(index)"
      >
        <!-- encodeId值是获取歌曲详情的 -->
        <img v-lazy="item.imageUrl" alt="" />
        <span :style="{ background: item.titleColor }">{{
          item.typeTitle
        }}</span>
      </div>
    </slide>
    <Title titles="推荐歌单">
      <ul class="songList" slot="songList">
        <li
          class="songList"
          v-for="(item, index) in songList"
          :key="item.id"
          @click="goDetail(index)"
        >
          <div class="song-container">
            <img v-lazy="item.picUrl" alt="" />
            <span>{{ item.playCount }}</span>
          </div>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </Title>
    <Title titles="最新音乐" cTitle="newSong">
      <ul class="newsongList" slot="songList">
        <!-- id是歌曲详情 -->
        <li
          class="newsongList"
          v-for="(item, index) in newSongList"
          :key="item.id"
          @click="getSong(index)"
        >
          <div class="newsong-container">
            <img v-lazy="item.picUrl" alt="" />
          </div>
          <div class="ranking">
            <span>{{ index < 9 ? `0${index + 1}` : index + 1 }}</span>
          </div>
          <div class="song-name">
            <span>{{ item.name }}</span>
            <span>{{ item.song.artists[0].name }}</span>
          </div>
        </li>
      </ul>
    </Title>
    <Title titles="MV推荐" cTitle="MV">
      <ul class="mvList" slot="songList">
        <!-- id是歌曲详情 -->
        <li class="mvList" v-for="(item, index) in mvList" :key="item.id">
          <div class="mv-container">
            <img v-lazy="item.picUrl" alt="" />
            <span>{{ item.playCount }}</span>
          </div>
          <p>{{ item.copywriter }}</p>
        </li>
      </ul>
    </Title>
  </div>
</template>

<script>
import Num from "../fn/num.js";
import { setItem } from "../fn/local.js";
import slide from "../components/slide.vue";
import Title from "../components/title.vue";
export default {
  components: {
    slide,
    Title
  },
  data() {
    return {
      slideList: [],
      songList: [],
      newSongList: [],
      mvList: []
    };
  },
  mounted() {
    this.getSlide();
  },
  methods: {
    async getSlide() {
      const bannerData = {
        type: 0
      };
      const bannerResult = await this.$http.get("/banner", {
        params: bannerData
      });
      this.slideList = bannerResult.data.banners;
      // ------------------------------------
      const songListData = {
        limit: 10
      };
      const songListResult = await this.$http.get("/personalized", {
        params: songListData
      });
      songListResult.data.result.forEach(el => {
        return (el.playCount = Num(el.playCount));
      });
      this.songList = songListResult.data.result;
      //------------------------------------
      const newSongListResult = await this.$http.get("/personalized/newsong");
      this.newSongList = newSongListResult.data.result;
      //-------------------------------------
      const mvListResult = await this.$http.get("/personalized/mv");
      mvListResult.data.result.forEach(el => {
        return (el.playCount = Num(el.playCount));
      });
      this.mvList = mvListResult.data.result;
    },
    goDetail(index) {
      this.$router.push({
        name: "playlistDetail",
        params: {
          playlistId: this.songList[index].id
        }
      });
    },
    getSong(index) {
      // let id = this.newSongList[index].id;
      let songs = []
      this.newSongList.forEach(item=>{
        return songs.push(item.song)
      })
      this.$bus.$emit("songId",this.newSongList[index].id,songs,index);
    },
    play(index){
      if(this.slideList[index].url != null){
        window.open(this.slideList[index].url,"_Blank")
      }else{
        this.$bus.$emit("oneSong",this.slideList[index].encodeId,this.slideList[index]);
      }
    }
  }
};
</script>

<style scoped>
img[lazy="loading"] {
  opacity: 0.3;
}
img[lazy="loaded"] {
  opacity: 1;
  transition: opacity ease-in-out 0.4s;
}
div.recommend {
  width: 85%;
  height: calc(100vh - 110px);
  position: absolute;
  top: 50px;
  right: 0;
  overflow-y: scroll;
  overflow-x: none;
  padding: 0 3%;
  box-sizing: border-box;
}
div.recommend::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
  border-radius: 10px;
}

div.recommend::-webkit-scrollbar-track {
  background-color: transparent;
}
div.recommend::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
</style>
