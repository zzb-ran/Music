import Vue from "vue";
import Router from "vue-router";
import recommend from "@/view/recommend";
import songMenu from "@/view/songMenu";
import hq from "@/view/hq";
import newSong from "@/view/newSong";
import playlistDetail from "@/view/playlistDetail";
import search from "@/view/search";
import play from "@/view/play";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: "/recommend",
      name: "recommend",
      component: recommend
    },
    {
      path: "/songMenu",
      name: "songMenu",
      component: songMenu
    },
    {
      path: "/hq",
      name: "hq",
      component: hq
    },
    {
      path: "/newSong",
      name: "newSong",
      component: newSong
    },
    {
      path: "/playlistDetail/:playlistId",
      name: "playlistDetail",
      component: playlistDetail
    },
    {
      path: "/search?keywords=:songName",
      name: "search",
      component: search
    },
    {
      path: "/play",
      name: "play",
      component: play
    }
  ]
});
