<template>
  <div class="hq-list">
    <div class="song th">
      <div class="music-title">音乐</div>
      <div class="player">歌手</div>
      <div class="album">专辑</div>
      <div class="duration">时长</div>
    </div>
    <div
      class="song"
      v-for="(item, index) in songList"
      :key="item.name"
      @click="play(index)"
    >
      <div class="music-title">
        <span>{{ index < 9 ? `0${index + 1}` : index + 1 }}</span>
        <img v-if="item.album.picUrl" v-lazy="`${item.album.picUrl}?param=40y40`" />
        <span>{{ item.name }}</span>
      </div>
      <div class="player">{{ item.artists[0].name }}</div>
      <div class="album">{{ item.album.name }}</div>
      <div class="duration">{{ item.duration }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array
      // required: true
    },
    isOne:{
      type: String
    }
  },
  methods: {
    play(index) {
      if(this.isOne == "true"){
        this.$bus.$emit("oneSong",this.songList[index].id,this.songList[index])
      }else{
        this.$bus.$emit("songId",this.songList[index].id,this.songList,index)
      }
    }
  }
};
</script>

<style>
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
  /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical; */
  margin-left: 10px;
}
div.music-title {
  width: 40%;
  height: 100%;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
div.player,
div.album,
div.duration {
  width: 20%;
  height: 100%;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
div.song div.music-title img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  vertical-align: middle;
}
</style>
