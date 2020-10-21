<template>
  <div class="search">
      <songList :songList="songArr" isOne="true" />
  </div>
</template>

<script>
import songList from "../components/song-list.vue";
import { timeUp } from "../fn/time.js";
export default {
    data(){
        return{
            songArr:[],
            songName:"",
        }
    },
    components: {
      songList  
    },
    mounted () {
        this.songName = this.$route.params.songName;
        this.getSearch(this.songName); 
    },
    watch: {
      $route(to,from){
          if(to.params.songName == from.params.songName) return;
          this.getSearch(to.params.songName)
      }
    },
    methods: {
        async getSearch(name){
            const keyW = {
                keywords:name
            };
            const songResult = await this.$http.get("/search",{
                params:keyW
            });
            songResult.data.result.songs.forEach(item => {
                return (item.duration = timeUp(item.duration));
            });
            this.songArr = songResult.data.result.songs
        }
    }
}
</script>

<style scoped>
img[lazy="loading"] {
  opacity: 0.3;
}
img[lazy="loaded"] {
  opacity: 1;
  transition: opacity ease-in-out 0.4s;
}
div.search {
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
div.search::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
  border-radius: 10px;
}

div.search::-webkit-scrollbar-track {
  background-color: transparent;
}
div.search::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
</style>