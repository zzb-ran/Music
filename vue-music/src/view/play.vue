<template>
  <div class="play" v-show="isPlay">
    <audio ref="audio" @canplay="getDuration" @timeupdate="updateTime" @ended="onended()" :src="url" autoplay></audio>
    <div class="progess" @click="toPro">
        <div class="bg"></div>
        <div class="line"></div>
    </div>
    <div class="audio-container">
      <div class="controls">
        <div class="prev" @click="prev()">上</div>
        <div class="p-p" @click="pp()">播</div>
        <div class="next" @click="next()">下</div>
      </div>
      <div class="intro">
        <img v-lazy="img" alt="">
        <div class="text">
          <span>{{ songName }}</span>
          <span>{{ name }}</span>
        </div>
      </div>
      <div class="lyric">
        <p :class="{lh:!pTlyric}">{{ pLrc }}</p>
        <p v-if="pTlyric">译: {{ pTlyric }}</p>
      </div>
      <div class="cdtime">
        {{ currentTime }} <span  v-if="duration">&nbsp;/&nbsp;</span> {{ duration }}
      </div>
      <div class="voice">
        <span>声音</span>
        <div class="voice-pro" @click="toVoice">
          <div class="bg"></div>
          <div class="round"></div>
          <div class="line"></div>
        </div>
      </div>
      <div class="toggle" @click="toggle()">
        随
      </div>
      <div class="songs" @click="isSongs = !isSongs">
        <span>歌单</span>
        <div class="songs-list" v-if="isSongs">
          <ul>
            <li :class="{red: songIndex == index}" v-for="(item,index) in playMusicList" :key="index">
              <span>{{ item.name }}</span>
              <span>{{ item.artists[0].name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from "../fn/local.js";
import { timeUp } from "../fn/time.js";
import { removeEmpty } from "../fn/isobj.js";
import { rd } from "../fn/rd.js";
export default {
  data() {
    return {
      id:"",
      playMusicList: [],
      url: "",
      img:"",
      name:"",
      songName:"",
      songIndex:"",
      duration:"",
      currentTime:"",
      lrcMap:{},
      tlyricMap:{},
      pLrc:"",
      pTlyric:"",
      isPlay: false,
      isSongs:false
    };
  },
  created () {
    let self = this;
    this.$bus.$on("songId",(id,newSongList,index)=>{
        self.id = id;
        self.playMusicList = newSongList;
        self.songIndex = index;
    })
    this.$bus.$on("oneSong",(id,newSong)=>{
        self.id = id;
        if(self.songIndex === ""){
          self.playMusicList.push(newSong)
          self.songIndex = 0
        }else{
          self.playMusicList.splice(self.songIndex + 1,0,newSong)
          self.songIndex = self.songIndex + 1
        }
    })
    if(this.duration !== NaN && this.duration !== ''){
      this.isPlay = true
    }else{
      this.isPlay = false
    }
  },
  watch: {
    url:{
      handler(url,oldUrl){
        if(url === null || url === ""){
          this.$refs.audio.pause();
          console.log("歌曲没有版权")
        }else{
           this.$refs.audio.play();
        }
      }
    },
    id:{
      handler(val,oldVal){
        if(val === oldVal) return;
        this.getPlay(val);
        // history.pushState("","",window.location.origin+"/play/"+val);
      }
    },
    songIndex:{
      handler(val,oldVal){
        if(val !== oldVal){
          if(val > 3){
            let toHeigth = val - 3;
            document.querySelector(".songs-list ul").scrollTo(0, toHeigth * 30)
          }else{
            document.querySelector(".songs-list ul").scrollTo(0, 0)
          }
        };
      }
    }
  },
  methods: {
    async getPlay(id) {
      const playingData = {
        id: id
      };
      const musciUrl = await this.$http.get("/song/url", {
        params: playingData
      });
      const songDetailData = {
        ids: id
      };
      const songDetail = await this.$http.get("/song/detail", {
        params: songDetailData
      });
      const songLyric = await this.$http.get("/lyric", {
        params: playingData
      });
      this.lrcMap = this.getLyric(songLyric.data).lrcMap;
      for( let key in this.lrcMap){
        if(this.lrcMap[key] === ""){
          delete this.lrcMap[key]
        }
      }
      this.tlyricMap = this.getLyric(songLyric.data).tlyricMap;
      for( const key in this.tlyricMap){
        if(this.tlyricMap[key] === ""){
          delete this.tlyricMap[key]
        }
      }
      this.url = musciUrl.data.data[0].url;
      this.name = songDetail.data.songs[0].ar[0].name;
      this.songName = songDetail.data.songs[0].name;
      this.img = songDetail.data.songs[0].al.picUrl;
    },
    prev(){
      this.songIndex--;
      if(this.songIndex <= 0) this.songIndex = this.playMusicList.length;
      this.id = this.playMusicList[this.songIndex].id;
      this.getPlay(this.id);
    },
    next(){
      this.songIndex++;
      if(this.songIndex >= this.playMusicList.length) this.songIndex = 0;
      this.id = this.playMusicList[this.songIndex].id;
      this.getPlay(this.id);
    },
    pp(){
      let { audio } = this.$refs;
      if(audio.paused){
        audio.play()
        document.querySelector(".p-p").innerText = "播"
      }else{
        audio.pause()
        document.querySelector(".p-p").innerText = "停"
      }
    },
    getDuration() { 
       this.duration = timeUp(this.$refs.audio.duration * 1000);
       if(this.duration !== NaN && this.duration !== ''){
         this.isPlay = true
       }else{
         this.isPlay = false
       }
    },
    updateTime(e) {
       let self = this;
       this.currentTime = timeUp(e.target.currentTime * 1000);
       let lyKey = Object.keys(this.lrcMap);
       let tlyKey = Object.keys(this.tlyricMap);
       lyKey.forEach((item,index)=>{
         if(this.currentTime == item.split(".")[0].split("[")[1]){
           self.pLrc = Object.values(self.lrcMap)[index];
           if(self.tlyricMap == {}) return;
           self.pTlyric = Object.values(self.tlyricMap)[index];
         }
       })
       tlyKey.forEach((item,index)=>{
         if(this.currentTime == item.split(".")[0].split("[")[1]){
           if(self.tlyricMap == {}) return;
           self.pTlyric = Object.values(self.tlyricMap)[index];
         }
       })
       let pro = ((e.target.currentTime / this.$refs.audio.duration) * 100).toFixed(2);
       document.querySelector(".progess .line").style.width = pro + '%';
    },
    onended(){
      var toggle = document.querySelector(".toggle").innerText;
      if(toggle == "随"){
        // document.querySelector(".toggle").innerText = "随";
        let rd = Math.floor(Math.random() * this.playMusicList.length)
        if(this.songIndex == rd){
          rd = Math.floor(Math.random() * this.playMusicList.length)
          this.songIndex = rd;
          this.id = this.playMusicList[this.songIndex].id;
          this.getPlay(this.id);
        }else{
          this.songIndex = rd;
          this.id = this.playMusicList[this.songIndex].id;
          this.getPlay(this.id);
        }
      }else if(toggle == "单"){
        // document.querySelector(".toggle").innerText = "单";
        this.songIndex = this.songIndex;
        this.id = this.playMusicList[this.songIndex].id;
        this.getPlay(this.id);
      }else{
        // document.querySelector(".toggle").innerText = "列"
        this.songIndex++;
        if(this.songIndex <= 0) this.songIndex = this.playMusicList.length;
        if(this.songIndex >= this.playMusicList.length) this.songIndex = 0;
        this.id = this.playMusicList[this.songIndex].id;
        this.getPlay(this.id);
      }
    },
    toggle(){
      var toggle = document.querySelector(".toggle").innerText;
      if(toggle == "列"){
        document.querySelector(".toggle").innerText = "随";
      }else if(toggle == "随"){
        document.querySelector(".toggle").innerText = "单";
      }else{
        document.querySelector(".toggle").innerText = "列"
      }
    },
    toPro(e){
      let { audio } = this.$refs
      let pro = ((e.offsetX/document.querySelector(".progess").offsetWidth) * 100).toFixed(2);
      document.querySelector(".progess .line").style.width = pro + '%';
      audio.currentTime = pro * this.$refs.audio.duration / 100;
    },
    toVoice(e){
      let { audio } = this.$refs
      let pro = ((e.offsetX/document.querySelector(".voice-pro").offsetWidth) * 100).toFixed(2);
      document.querySelector(".voice-pro .line").style.width = pro + '%';
      document.querySelector(".voice-pro .round").style.left = pro + '%';
      audio.volume = pro / 100;
    },
    //解析歌词
    getLyric(data){
      class Lyric {
            constructor(data) {
                this.data = data
                this.lrc = data['lrc']['lyric']
                this.tlyric = data['tlyric']['lyric']

                this.lrcMap = this.getLyricMap(this.lrc)
                this.finalLrcMap = this.convertProp(Object.assign({}, this.lrcMap))

                this.tlyricMap = this.getLyricMap(this.tlyric)
                this.finalTlyricMap = this.convertProp(Object.assign({}, this.tlyricMap))
            }

            getLyricMap(lrc) {
                let key, value, sIdx, eIdx, nsIdx
                let ret = {}
                if (!lrc || (typeof lrc !== 'string')) return ret

                while(lrc) {
                    sIdx = lrc.indexOf('[')
                    eIdx = lrc.indexOf(']') + 1
                    if (sIdx !== -1 && eIdx !== -1) {
                        key = lrc.slice(sIdx, eIdx)
                        advance(eIdx)
                        nsIdx = lrc.indexOf('[')
                        value = lrc.slice(0, nsIdx)
                        ret[key] = value.trim()
                        advance(nsIdx)
                    } else {
                        break
                    }
                }

                function advance (n) {
                    lrc = lrc.substring(n)
                }
                return ret
            }

            convertProp(obj) {
                Object.keys(obj).forEach((str) => {
                    if (!obj[str]) {
                        delete obj[str]
                    } else {
                        let prop = f(str)
                        obj[prop] = obj[str]
                        delete obj[str]
                    }
                })

                function f(str) {
                    str = str.match(/^\[(\d+):(\d+)\.(\d+)/)
                    return Number(str[1]) * 60 * 1000 +  Number(str[2]) * 1000 +  Number(str[3])
                }
                return obj
            }

            getCurPlayLyric(audioCurTime) {
                let audioCurTimeMs = audioCurTime * 1000
                let arrTime = Object.keys(this.finalLrcMap)
                
                let i = 0, len = arrTime.length, idx
                let hasTranslate = Object.keys(this.finalTlyricMap).length > 0

                if (audioCurTimeMs === 0) {
                    return g.call(this, arrTime[0])
                }
                if (audioCurTimeMs >= Number(arrTime[len - 1])) {
                    return g.call(this, arrTime[len - 1])
                }
                for (; i < len; i++) {
                    if (
                        audioCurTimeMs >= Number(arrTime[i - 1]) && 
                        audioCurTimeMs < Number(arrTime[i])
                    ) {
                        idx = i - 1
                        break
                    }
                }
                return g.call(this, arrTime[idx])

                function g(prop) {
                    return hasTranslate 
                        ? v(this.finalLrcMap[prop]) + ('\n') + v(this.finalTlyricMap[prop])
                        : v(this.finalLrcMap[prop])
                }
                function v(val) {
                    return typeof val === 'undefined' ? '' : val
                }
            }
        }
        let ly = new Lyric(data)
        return ly
    }
  }
};
</script>

<style>
.play {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(224, 129, 137, 0.5);
  color: white;
}

audio {
  width: 100%;
  height: 100%;
}

.audio-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progess{
  width: 100%;
  height: 2px;
  position: absolute;
  top:-2px;
  left: 0;
  z-index: 9999;
}

.progess .bg{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: absolute;
}

.progess .line{
  width: 0%;
  height: 100%;
  /* background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); */
  background-image: url("https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
  position: absolute;
}

.controls,.intro,.voice,.songs{
  flex: 1.5;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.voice span{
  flex: 5;
}

.voice-pro{
  flex: 5;
  width: 100%;
  height: 4px;
  position: relative;
  left: -20px;
}

.voice-pro .bg{
  width: 100%;
  height: 100%;
  background-color:hsla(0, 0%, 100%, 0.6);
  position: absolute;
}

.voice-pro .round{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  left: 100%;
  transform: translate(-50%,-25%);
}

.voice-pro .line{
  width: 100%;
  height: 100%;
  background-color:red;
  position: absolute;
}

.toggle{
  flex: 0.3;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.lyric{
  flex:2.5;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  text-align: left;
  text-indent: 15px;
}

.lyric p {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
  margin-top: 5px;
}

.lyric p.lh{
  line-height: 50px;
}

.cdtime{
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.controls div{
  cursor: pointer;
}

.intro img{
  width: 45px;
  height: 45px;
  border-radius: 6px;
}

.intro .text{
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 12px;
  text-align: left;
  margin-left: 10px;
}

.intro .text span:nth-child(1){
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
}

.songs{
  position: relative;
  cursor: pointer;
}

.songs-list{
  position: absolute;
  left: -100%;
  bottom: 64px;
  width: 150%;
  height: 210px;
  background-color: rgba(224, 129, 137);
  z-index: 9999;
  border-radius: 10px;
}

.songs-list ul{
  width: 100%;
  height: 100%;
  padding: 0 0 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  position: absolute;
}

.songs-list ul::-webkit-scrollbar {
  background-color: transparent;
}

.songs-list ul::-webkit-scrollbar-track {
  background-color: transparent;
}
.songs-list ul::-webkit-scrollbar-thumb {
  background: transparent;
}

.songs-list ul li{
  width: 100%;
  height: 30px;
  text-align: left;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.songs-list ul li span{
  flex: 1;
  overflow:hidden; 
  white-space:nowrap; 
  text-overflow:ellipsis;
}

.songs-list ul li span:nth-child(2){
  text-align: right;
}

.songs-list ul li.red{
  color: red;
}
</style>
