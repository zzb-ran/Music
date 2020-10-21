<template>
  <div class="songBar">
    <div class="everyone" @click="getNone()">
      <span>{{ cotyTag }}</span>
    </div>
    <div class="coty">
      <ul>
        <li
          :class="{ actives: activeIdx === index }"
          v-for="(item, index) in tagList"
          :key="item.name"
          @click="getHotList(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="coty-box" v-if="isNone">
      <div class="container" @click="getName('全部歌单')">全部歌单</div>
      <div class="container" v-for="item in categoryList" :key="item[0].name">
        <div class="tag">{{ item[0].name }}</div>
        <div class="tag-box">
          <ul>
            <li
              v-for="tags in item[1]"
              :key="tags.name"
              @click="getName(tags.name)"
            >
              {{ tags.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cotyTag: {
      type: String,
      default: "全部歌单"
    },
    categoryList: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tagList: [],
      activeIdx: "",
      isNone: false
    };
  },
  mounted() {
    this.getTagList();
  },
  methods: {
    async getTagList() {
      const tagListResult = await this.$http.get("/playlist/hot");
      this.tagList = tagListResult.data.tags;
    },
    getHotList(idx) {
      this.activeIdx = idx;
      this.$emit("getHotList", this.tagList[idx].name);
    },
    getName(name) {
      if (name === "全部歌单") this.activeIdx = "";
      Object.values(this.tagList).forEach((item, index) => {
        if (item.name == name) {
          this.activeIdx = index;
        }
      });
      this.$emit("getName", name);
      this.isNone = false;
    },
    getNone() {
      this.isNone = true;
    }
  }
};
</script>

<style scoped>
.songBar {
  width: 100%;
  height: 50px;
  padding: 0 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.everyone span {
  font-size: 14px;
  border: 1px solid #bababa;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
}
.coty ul {
  width: 100%;
  height: 100%;
  display: flex;
}
.coty ul li {
  font-size: 13px;
  margin: 0 10px;
  padding: 2px 4px;
  border-radius: 20px;
  cursor: default;
}
.coty ul li.actives {
  background-color: #f6f5f5;
  color: red;
}
.coty ul li:last-child {
  margin-right: 0;
}
.coty-box {
  padding: 10px 20px;
  background-color: white;
  position: fixed;
  bottom: 60px;
  left: 15%;
  z-index: 100;
  border-radius: 10px;
}
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  margin: 10px 0;
  cursor: default;
}
.tag-box ul {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
}
.tag-box ul li {
  padding: 2px 4px;
  cursor: default;
}
</style>
