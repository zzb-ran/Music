<template>
  <div class="header-top" @click="isList = false">
    <div class="fw">
      <i @click="goBack()"> <</i> <i @click="goForword()">> </i>
    </div>
    <div class="header-box">
      <div class="header-bar">
        <slot name="header"></slot>
      </div>
      <div class="search">
        <i></i>
        <input type="text" @click="getHotSearch()" @enter="toSearch()" placeholder="搜索" v-model="songName" />
        <div class="list" v-show="isShow" v-if="isList">
          <span>热门搜索</span>
        <div class="hot">
          <ul>
            <li v-for="(item,index) in hotList" :key="index" @click="search(item.first)">{{ item.first }}</li>
          </ul>
        </div>
        <div class="history">
          <span>历史搜索</span>
          <ul>
            <li>SSS</li>
            <li>SSSSSSSSS</li>
            <li>S</li>
          </ul>
        </div>
      </div>
      <div class="suggest" @click="toSearch()" v-show="!isShow">
        <ul>
          <li v-for="(item,index) in searchSuggestlist" 
          :key="index" @click="search(item.name)">
            {{ item.name }}&nbsp;&nbsp;/&nbsp;&nbsp;{{ item.artists[0].name }}
          </li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { delay } from "../fn/delay.js"
export default {
  data() {
    return {
      songName:"",
      hotList:[],
      searchSuggestlist:[],
      isShow:true,
      isList:false,
      to:"",
      from:""
    }
  },
  watch: {
    songName(){
      if(this.songName.length > 0){
          delay(() => {
            this.isShow = false;
            this.suggest();
          }, 300);
        }else{
          this.isShow = true;
        };
    }
  },
  methods: {
    goBack() {
      window.history.back();
    },
    goForword() {
      window.history.forward();
    },
    async getHotSearch(){
      const HotSearchList = await this.$http.get('/search/hot');
      this.hotList = HotSearchList.data.result.hots.splice(0,5);
      this.isList = true;
    },
    async suggest(){
      const suggestData = {
          keywords: this.songName
        };
        const result = await this.$http.get("/search/suggest",{
          params:suggestData
        });
        this.searchSuggestlist = result.data.result.songs;
    },
    search(data){
      this.songName = data;
      this.suggest();
    },
    toSearch(){
      this.isShow = true;
      this.$router.push({
        name: "search",
        params: {
          songName: this.songName
        }
      });
    }
  }
};
</script>

<style scoped>
div.header-top {
  width: 100%;
  height: 50px;
  background-color: hsla(0, 0%, 97.3%, 0.95);
  display: flex;
}
div.fw {
  width: 15%;
  height: 100%;
  color: black;
  line-height: 50px;
  font-weight: bold;
  text-align: right;
}
div.fw i {
  margin: 0 10px;
  cursor: default;
}
div.header-box {
  width: 85%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
div.header-bar {
  width: 80%;
  opacity: 1;
}
div.header-bar ul {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}
div.header-bar ul li {
  margin: 0 10px;
  font-size: 14px;
  color: #7d7d7d;
  cursor: default;
}
div.search {
  width: 15%;
  height: 53%;
  background-color: #ebebeb;
  border-radius: 13px;
  position: relative;
}
div.search input {
  width: 77%;
  height: 100%;
  border: none;
  background-color: #ebebeb;
  float: right;
  border-radius: 13px;
  outline: none;
  overflow:hidden; 
  white-space:nowrap; 
  text-overflow:ellipsis;
}
div.search input::-webkit-input-placeholder {
  color: #7e7e7e;
  font-size: 13px;
}
div.list{
  position: absolute;
  width: 200%;
  height: 300px;
  background: #ebebeb;
  top:40px;
  left:-100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
div.list{
  text-align: left;
}
div.list div.hot{
  flex: 1;
}
div.list div.history{
  flex: 2.5;
}
div.hot ul, div.history ul{
  width: 100%;
  margin-top: 5px;
}
div.hot ul li{
  float: left;
  padding: 3px 6px;
  border: 1px solid black;
  border-radius: 100px;
  margin: 3px 5px;
  font-size: 13px;
  cursor: pointer;
}
div.history ul li{
  width: 100%;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  text-align: left;
  border-bottom:0.5px solid hsla(0, 0%, 97.3%, 0.95);
  box-sizing: border-box;
  font-size: 13px;
  cursor: pointer;
}
div.suggest{
  position: absolute;
  width: 200%;
  background: #ebebeb;
  top:40px;
  left:-100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
div.suggest ul li{
  width: 100%;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  text-align: left;
  border-bottom:0.5px solid hsla(0, 0%, 97.3%, 0.95);
  box-sizing: border-box;
  font-size: 13px;
  cursor: pointer;
}
</style>
