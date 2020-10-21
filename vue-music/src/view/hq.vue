<template>
  <div class="hq">
    <div class="hqTop">
      <div class="time">
        <span>{{ week }}</span>
        <span>{{ day < 9 ? `0{day}` : day }}</span>
      </div>
      <div class="title">
        <span>每日歌曲推荐</span>
        <p>根据你的音乐口味生成，每天6:00更新</p>
      </div>
    </div>
    <songList v-if="isShow" :songList="hqList" />
    <div class="notLogin" v-else>
      您还未登录
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { timeUp, week } from "../fn/time.js";
import { getItem } from "../fn/local.js";
import songList from "../components/song-list.vue";
export default {
  components: {
    songList
  },
  data() {
    return {
      hqList: [],
      week: week(new Date().getDay()),
      day: new Date().getDate(),
      isShow:false
    };
  },
  mounted() {
    if(getItem("Cookie")){
      this.isShow = true;
      this.getHQ();
    }else{
      this.isShow = false;
    }
  },
  methods: {
    async getHQ() {
      const cookieInfo = {
        cookie: getItem("Cookie")
      };
      const hqListResult = await axios.get("/api/recommend/songs",
        {params:cookieInfo}
      );
      hqListResult.data.data.dailySongs.forEach(item => {
        return (item.duration = timeUp(item.duration));
      });
      this.hqList = hqListResult.data.data.dailySongs;
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
div.hq {
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
div.hq::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
  border-radius: 10px;
}

div.hq::-webkit-scrollbar-track {
  background-color: transparent;
}
div.hq::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
div.hqTop {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgb(246, 246, 246);
}
div.time {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
  overflow: hidden;
}
div.time span:first-child {
  display: block;
  background-color: rgba(224, 129, 137, 0.8);
  color: white;
}
div.time span:last-child {
  display: block;
  width: 100%;
  height: 80%;
  line-height: 60px;
  font-size: 30px;
  font-weight: bold;
  background-color: rgb(250, 249, 249);
}
div.title {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 22px;
  line-height: 30px;
}
div.title span {
  margin-top: 20px;
}
div.title p:last-child {
  font-size: 14px;
}
div.notLogin{
  height: calc(100vh - 211px);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
