<template>
  <div class="title" :class="cTitle">
    <div class="top-title">
      <span>{{ titles }}</span>
      <i>></i>
    </div>
    <div class="song-list">
      <slot name="songList"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: String,
      required: true //必传的意思
    },
    cTitle: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
div.title {
  width: 100%;
  height: 100%;
}
div.top-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
}
div.song-list {
  width: 100%;
  height: 100%;
}
div.song-list ul.songList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

div.song-list ul.songList li.songList {
  width: 19%;
  position: relative;
}
div.song-list ul.songList li.songList div.song-container {
  width: 100%;
  height: 75%;
  border-radius: 6px;
  overflow: hidden;
}
div.song-list ul.songList li.songList div.song-container img {
  width: 100%;
  height: 100%;
}
div.song-list ul.songList li.songList p {
  font-size: 14px;
  text-align: left;
  padding-top: 10px;
}
div.song-list ul.songList li.songList div.song-container span {
  position: absolute;
  color: white;
  top: 10px;
  right: 12px;
  font-size: 14px;
}
div.title.newSong {
  width: 100%;
  height: 100%;
  margin-top: 45px;
  font-size: 18px;
}
div.song-list ul.newsongList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}
div.song-list ul.newsongList li.newsongList {
  width: 48%;
  height: 19%;
  display: flex;
  align-items: center;
  border-top: 1px solid #f5f5f5;
}
div.song-list ul.newsongList li.newsongList:nth-child(5),
div.song-list ul.newsongList li.newsongList:nth-child(10) {
  border-bottom: 1px solid #f5f5f5;
}
div.song-list ul.newsongList li.newsongList div {
  margin: 0 6px;
}
div.song-list ul.newsongList li.newsongList div.newsong-container {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
}
div.song-list ul li.newsongList div.newsong-container img {
  width: 100%;
  height: 100%;
}
div.song-list ul.newsongList li.newsongList div.ranking {
  color: #bababa;
  font-size: 14px;
}
div.song-list ul.newsongList li.newsongList div.song-name {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 14px;
  color: #7b7b7b;
}
div.song-list ul.newsongList li.newsongList div.song-name span:nth-child(1) {
  font-size: 15px;
  color: black;
}
div.title.MV {
  width: 100%;
  height: 50%;
  margin-top: 45px;
  font-size: 18px;
}
div.song-list ul.mvList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
div.song-list ul.mvList li.mvList {
  width: 23%;
  height: 85%;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}
div.song-list ul.mvList li.mvList div.mv-container img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
div.song-list ul.mvList li.mvList div.mv-container span {
  position: absolute;
  color: white;
  right: 12px;
  top: 10px;
  font-size: 14px;
}
div.song-list ul.mvList li.mvList p {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  text-align: left;
}
</style>
