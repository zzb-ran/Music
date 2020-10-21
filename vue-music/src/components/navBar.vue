<template>
  <div class="nav-left">
    <div class="navBar">
      <slot name="nav"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div.navBar {
  width: 15%;
  height: calc(100vh - 110px);
  margin: 0;
  background: #eaeaea;
}
div.nav-top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: start;
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
div.navBar ul {
  margin: 0;
  padding: 0 20px;
}
div.navBar ul li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #7d7d7d;
  text-align: left;
}
</style>
