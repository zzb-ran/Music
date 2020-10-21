// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import http from "../http";
import VueLazyload from "vue-lazyload";
import moment from "moment";
moment.locale("zh-cn");

Vue.prototype.$moment = moment;

Vue.prototype.$http = http;

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  error: "",
  loading: "",
  attempt: 1
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
