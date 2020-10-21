<template>
  <div class="home">
    <header-bar>
      <ul slot="header">
        <li
          v-for="(item, index) in dataList"
          :key="item.name"
          @click="headerBar(index)"
          :class="{ active: item.id == colorIdx + 1 }"
        >
          {{ item.name }}
        </li>
      </ul>
    </header-bar>
    <div class="nav-top" @click="isBtn && openLogin()">
      <img v-lazy="userInfo.avatarUrl" />
      <span>{{ userInfo.nickname ? userInfo.nickname : "请登录" }}</span>
      <span class="logout" v-if="userInfo.nickname" @click.stop="Logout()">注销</span>
    </div>
    <nav-bar>
      <ul slot="nav">
        <li
          v-for="(item, index) in navList"
          :key="item.name"
          @click="navBar(index)"
          :class="{ active: item.id == idxes + 1 }"
        >
          {{ item.name }}
        </li>
      </ul>
    </nav-bar>
    <Login
      v-show="isLogin"
      @inputChange="Login(arguments)"
      @LoginClick="LoginClick()"
    />
    <!-- <play /> -->
  </div>
</template>

<script>
import { setItem, getItem, removeItem } from "../fn/local.js";
import headerBar from "./headerBar.vue";
import navBar from "./navBar.vue";
import Login from "./Login.vue";
// import play from "../view/play.vue";
export default {
  components: {
    headerBar,
    navBar,
    Login
    // play
  },
  data() {
    return {
      dataList: [],
      data: {
        0: [
          { id: "1", name: "推荐", path: "/recommend" },
          { id: "2", name: "每日推荐", path: "/hq" },
          { id: "3", name: "歌单", path: "/songMenu" },
          { id: "4", name: "最新音乐", path: "/newSong" },
          { id: "5", name: "排行榜", path: "/recommend" }
        ],
        1: [
          { id: "1", name: "推荐视频", path: "/recommend" },
          { id: "2", name: "MV", path: "/recommend" }
        ]
      },
      navList: [
        { id: "1", name: "发现音乐", path: "/recommend" },
        { id: "2", name: "视频", path: "/recommend" }
      ],
      colorIdx: 0,
      idxes: 0,
      name: "",
      password: "",
      isLogin: false,
      userInfo: {},
      isBtn:false
    };
  },
  mounted() {
    this.navBar(0);
    if (getItem("userInfo")) {
      this.userInfo = getItem("userInfo");
    } else {
      this.isBtn = true;
    }
  },
  methods: {
    headerBar(idx) {
      history.pushState("","",window.location.origin+window.location.hash)
      this.colorIdx = idx;
      this.$router.push({ path: this.dataList[idx].path });
    },
    navBar(idx) {
      this.idxes = idx;
      this.dataList = this.data[this.idxes];
    },
    openLogin() {
      this.isLogin = true;
      //----------------------
    },
    async LoginClick() {
      const loginData = {
        phone: this.name,
        password: this.password
      };
      const loginResult = await this.$http.get("/login/cellphone", {
        params: loginData
      }).catch(err =>{
          if(err.response.status == 501 || err.response.status == 509){
            alert("账号或密码错误")
          }
      });
      if(loginResult.data.code == 502){
        alert(loginResult.data.msg)
      }
        setItem("Cookie",loginResult.data.cookie)
        const UserData = {
          uid: loginResult.data.account.id
        };
        const userInfoResult = await this.$http.get("/user/detail", {
          params: UserData
        });
        this.userInfo = userInfoResult.data.profile;
        setItem("userInfo", this.userInfo);
        this.isLogin = false;
        this.isBtn = false;
        this.$router.push({path:"/recommend"})
      
    },
    Login(content) {
      this.name = content[0];
      this.password = content[1];
    },
    Logout(){
      this.userInfo = {};
      this.isBtn = true;
      this.isLogin =  false;
      removeItem("Cookie");
      removeItem("userInfo");
      this.$router.push({path:"/recommend"});
    }
  },
};
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
}
li {
  list-style: none;
  cursor: default;
}
div.header-bar ul li.active {
  color: black;
}
div.navBar ul li.active {
  color: red;
}
div.nav-top {
  width: 15%;
  height: 60px;
  line-height: 60px;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: start;
  user-select: none;
}
div.nav-top img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
}
div.nav-top span {
  font-size: 14px;
  margin-left: 10px;
}
span.logout{
  display: none;
}
div.nav-top:hover span.logout{
  display: block;
}
</style>
