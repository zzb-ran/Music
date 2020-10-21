<template>
  <div class="playlist-detail">
    <div class="title-box">
      <div class="img-box">
        <img v-lazy="`${detailList.coverImgUrl}?param=200y200`" />
      </div>
      <div class="titleIntro">
        <div class="playlist-name">
          <span>歌单</span>
          <span>{{ detailList.name }}</span>
        </div>
        <div class="playlist-intro">
          <img v-lazy="`${avatarUrl}?param=30y30`" />
          <span>{{ nickname }}</span>
          <span>{{ createTime }}创建</span>
        </div>
        <div class="playlist" @click="play()">
          <span>播放全部</span>
        </div>
        <div>
          <span>标签: {{ tags }}</span>
        </div>
        <div>
          <span>歌曲数: {{ length }}&nbsp;</span>
          <span>歌单数: {{ playCount }}</span>
        </div>
        <div class="one-intro">
          <span>简介: {{ detailList.description }}</span>
        </div>
      </div>
    </div>
    <songList :songList="detailList.tracks" isOne="true" />
  </div>
</template>

<script>
import axios from "axios";
import { timeUp } from "../fn/time.js";
import { base64encode } from "../fn/base64.js";
import Num from "../fn/num.js";
import moment from "../fn/moment.js";
import songList from "../components/song-list.vue";
export default {
  components: {
    songList
  },
  data() {
    return {
      detailList: [],
      createTime: "",
      playCount: "",
      avatarUrl: "",
      nickname: "",
      tags: "",
      length: ""
    };
  },
  mounted() {
    this.getPlayListDetail();
  },
  methods: {
    async getPlayListDetail() {
      const detailListDtata = {
        id: this.$route.params.playlistId
      };
      const detailResult = await axios.get("/api/playlist/detail", {
        params: detailListDtata
      });
      detailResult.data.playlist.tracks.forEach(item => {
        return (
          (item.album = item.al),
          (item.artists = item.ar),
          (item.duration = timeUp(item.dt))
        );
      });
      this.detailList = detailResult.data.playlist;
      this.createTime = moment(this.$moment(this.detailList.createTime)._d);
      this.playCount = Num(this.detailList.playCount);
      this.avatarUrl = this.detailList.creator.avatarUrl;
      this.nickname = this.detailList.creator.nickname;
      this.tags = this.detailList.tags[0];
      this.length = this.detailList.tracks.length;
    },
    play(){
      this.$bus.$emit('songId',this.detailList.tracks[0].id,this.detailList.tracks,0)
    }
  }
};
</script>

<style>
img[lazy="loading"] {
  opacity: 0.3;
}
img[lazy="loaded"] {
  opacity: 1;
  transition: opacity ease-in-out 0.4s;
}
div.playlist-detail {
  width: 85%;
  height: calc(100vh - 110px);
  position: absolute;
  top: 50px;
  right: 0;
  overflow-y: scroll;
  overflow-x: none;
  box-sizing: border-box;
  padding: 0 3%;
}
div.playlist-detail::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
  border-radius: 10px;
}

div.playlist-detail::-webkit-scrollbar-track {
  background-color: transparent;
}
div.playlist-detail::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
div.title-box {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}
div.img-box {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}
div.img-box img {
  width: 100%;
  height: 100%;
}
div.titleIntro {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-left: 20px;
}
div.titleIntro > div {
  font-size: 13px;
}
div.playlist-name {
  display: flex;
  align-items: flex-end;
}
div.playlist-name span:first-child {
  display: inline-block;
  padding: 2px 6px;
  border: 1px solid red;
  border-radius: 20px;
  font-size: 12px;
  color: red;
}
div.playlist-name span:last-child {
  font-size: 20px;
  margin-left: 20px;
}
div.playlist-intro {
  display: flex;
  align-items: center;
}
div.playlist-intro img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
div.playlist-intro span {
  margin-left: 10px;
}
div.playlist {
  padding: 6px 16px;
  background-color: red;
  color: white;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
}
div.one-intro {
  width: 750px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
