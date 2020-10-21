<template>
  <div class="newsong">
    <newSongBar :typeIdList="typeIdList" @getNews="getNews(arguments)" />
    <songList :songList="newSongList" />
  </div>
</template>

<script>
import { timeUp } from "../fn/time.js";
import newSongBar from "../components/newSongBar.vue";
import songList from "../components/song-list.vue";
export default {
  components: {
    newSongBar,
    songList
  },
  data() {
    return {
      typeIdList: [
        { id: 0, typeId: 0, name: "全部" },
        { id: 1, typeId: 7, name: "华语" },
        { id: 2, typeId: 96, name: "欧美" },
        { id: 3, typeId: 8, name: "日本" },
        { id: 4, typeId: 16, name: "韩国" }
      ],
      newSongList: []
    };
  },
  mounted() {
    this.getNewSong(0);
  },
  methods: {
    getNews(res) {
      this.getNewSong(this.typeIdList[res[0]].typeId);
    },
    async getNewSong(typeId) {
      const newsData = {
        type: typeId
      };
      const newSongListResult = await this.$http.get("/top/song", {
        params: newsData
      });
      newSongListResult.data.data.forEach(item => {
        return (item.duration = timeUp(item.duration));
      });
      this.newSongList = newSongListResult.data.data;
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
div.newsong {
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
div.newsong::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
  border-radius: 10px;
}

div.newsong::-webkit-scrollbar-track {
  background-color: transparent;
}
div.newsong::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}

div.hq-list {
  width: 100%;
}
div.song {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  text-align: left;
  text-indent: 20px;
}
div.song.th {
  color: #bababa;
}
div.song:nth-child(2n) {
  background-color: rgb(246, 246, 246);
}

div.song span:first-child {
  margin-right: 10px;
  color: #bababa;
}
div.song span:last-child {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
}
div.music-title {
  width: 40%;
  height: 100%;
  line-height: 60px;
}
div.player,
div.album,
div.duration {
  width: 20%;
  height: 100%;
  line-height: 60px;
}

div.song:last-child div.music-title span{
  margin-right: 2px;
}

div.song div.music-title img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  vertical-align: middle;
}
</style>
