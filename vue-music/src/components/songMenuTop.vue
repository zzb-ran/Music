<template>
  <div class="song-menu-top">
    <div class="song-zz" :style="{ backgroundImage: `url(${src})` }"></div>
    <div class="menu-box">
      <div class="img-box">
        <img v-lazy="src" alt="" />
      </div>
      <div class="title-box">
        <span>{{ cotyTitle }}</span>
        <p>
          <span v-for="item in tags" :key="item">{{ item }}</span>
        </p>
        <i>{{ copywriter }}</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String
    },
    src: {
      type: String
    },
    cotyTitle: {
      type: String
    },
    tags: {
      type: Array
    },
    copywriter: {
      type: String
    }
  }
};
</script>

<style scoped>
div.song-menu-top {
  width: 90%;
  height: 180px;
  margin-left: 5%;
  box-sizing: border-box;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
}
div.song-zz {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 6;
  transform: scale(1.5);
  filter: blur(10px);
}
div.menu-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  z-index: 99;
  background-color: rgba(1, 1, 1, 0.4);
}
div.img-box {
  width: 140px;
  height: calc(100% - 40px);
  border-radius: 10px;
  overflow: hidden;
  margin-left: 20px;
}
div.img-box img {
  width: 100%;
  height: 100%;
}
div.title-box {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 15px;
  align-items: flex-start;
}
div.title-box span {
  border: 1px solid red;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 8px;
  color: red;
}

div.title-box p span {
  margin: 0 5px;
}

div.title-box p span:nth-child(1),
div.title-box p span:last-child {
  border: 1px solid red;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 8px;
  color: red;
}

div.title-box span:nth-child(1) {
  border: none;
  font-size: 16px;
  padding: 0;
  color: white;
}

div.title-box i {
  font-style: normal;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.6);
}
</style>
