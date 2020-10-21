<template>
  <div class="song-menu">
    <song-menu-top
      :src="menuTopList.coverImgUrl"
      :cotyTitle="menuTopList.name"
      :tags="menuTopList.tags"
      :copywriter="menuTopList.copywriter"
    />
    <songMenuBar
      :cotyTag="cotyTag"
      :categoryList="categoryList"
      @getHotList="getHotList(arguments)"
      @getName="getName(arguments)"
    />
    <div class="playList">
      <ul class="playList">
        <li
          class="playList"
          v-for="(item, index) in playList"
          :key="item.id"
          @click="goDetail(index)"
        >
          <div class="playList-container">
            <img v-lazy="item.coverImgUrl" alt="" />
            <span>{{ item.playCount }}</span>
          </div>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Num from "../fn/num.js";
import songMenuTop from "../components/songMenuTop.vue";
import songMenuBar from "../components/songMenuBar.vue";
export default {
  components: {
    songMenuTop,
    songMenuBar
  },
  data() {
    return {
      menuTopList: [],
      categoryList: {
        Language: [],
        Style: [],
        Scenes: [],
        Emotion: [],
        Theme: []
      },
      playList: [],
      cotyTag: "全部歌单"
    };
  },
  mounted() {
    this.getMenu("全部");
    this.getPlayList("全部");
  },
  methods: {
    async getMenu(tag) {
      const menuTopListData = {
        cat: tag,
        limit: 1
      };
      const menuTopListResult = await this.$http.get(
        "/top/playlist/highquality",
        {
          params: menuTopListData
        }
      );
      this.menuTopList = menuTopListResult.data.playlists[0];
      //----------------------------------------------------
      const categoryListResult = await this.$http.get("/playlist/catlist");
      this.categoryList.Language = [
        { name: "语种" },
        categoryListResult.data.sub.filter(item => {
          return item.category == 0;
        })
      ];
      this.categoryList.Style = [
        { name: "风格" },
        categoryListResult.data.sub.filter(item => {
          return item.category == 1;
        })
      ];
      this.categoryList.Scenes = [
        { name: "场景" },
        categoryListResult.data.sub.filter(item => {
          return item.category == 2;
        })
      ];
      this.categoryList.Emotion = [
        { name: "情感" },
        categoryListResult.data.sub.filter(item => {
          return item.category == 3;
        })
      ];
      this.categoryList.Theme = [
        { name: "主题" },
        categoryListResult.data.sub.filter(item => {
          return item.category == 4;
        })
      ];
    },
    async getPlayList(tag) {
      const playListData = {
        cat: tag,
        limit: 101
      };
      const playListResult = await this.$http.get("/top/playlist/highquality", {
        params: playListData
      });
      playListResult.data.playlists.forEach(el => {
        return (el.playCount = Num(el.playCount));
      });
      this.playList = playListResult.data.playlists.slice(1);
    },
    getHotList(res) {
      this.getPlayList(res[0]);
      this.getMenu(res[0]);
      this.cotyTag = res[0];
    },
    getName(res) {
      this.getPlayList(res[0]);
      this.getMenu(res[0]);
      this.cotyTag = res[0];
    },
    goDetail(index) {
      this.$router.push({
        name: "playlistDetail",
        params: {
          playlistId: this.playList[index].id
        }
      });
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
div.song-menu {
  width: 85%;
  height: calc(100vh - 110px);
  position: absolute;
  top: 50px;
  right: 0;
  overflow-y: scroll;
  overflow-x: none;
}
div.song-menu::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
  border-radius: 10px;
}

div.song-menu::-webkit-scrollbar-track {
  background-color: transparent;
}
div.song-menu::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
div.playList {
  width: 100%;
  height: 100%;
  padding: 0 2.7%;
  box-sizing: border-box;
}
div.playList ul.playList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

div.playList ul.playList li.playList {
  width: 19%;
  position: relative;
  margin: 0 0.5%;
}
div.playList ul.playList li.playList div.playList-container {
  width: 100%;
  height: 75%;
  border-radius: 6px;
  overflow: hidden;
}
div.playList ul.playList li.playList div.playList-container img {
  width: 100%;
  height: 100%;
}
div.playList ul.playList li.playList p {
  font-size: 14px;
  text-align: left;
  padding-top: 10px;
}
div.playList ul.playList li.playList div.playList-container span {
  position: absolute;
  color: white;
  top: 10px;
  right: 12px;
  font-size: 14px;
}
</style>
