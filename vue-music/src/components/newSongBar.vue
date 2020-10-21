<template>
  <div class="new-song-bar">
    <ul>
      <li
        v-for="(item, index) in typeIdList"
        :key="item.typeId"
        @click="getNews(index)"
        :class="{ news: item.id === idx }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    typeIdList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      idx: 0
    };
  },
  methods: {
    async getNews(index) {
      this.idx = index;
      this.$emit("getNews", index);
    }
  }
};
</script>

<style>
div.new-song-bar {
  width: 100%;
  height: 50px;
}
div.new-song-bar ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
div.new-song-bar ul li {
  font-size: 14px;
  color: #bababa;
  margin: 10px;
  cursor: default;
}
div.new-song-bar ul li:first-child {
  margin-left: 0;
}
div.new-song-bar ul li.news {
  color: red;
}
</style>
