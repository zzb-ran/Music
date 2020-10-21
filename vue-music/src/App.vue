<template>
  <div id="app">
    <home />
    <play />
    <router-view />
  </div>
</template>

<script>
import home from "@/components/home.vue";
import play from "@/view/play.vue";
export default {
  name: "App",
  components: {
    home,
    play
  },
  created () {
    history.pushState("","",window.location.origin+window.location.hash)
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
