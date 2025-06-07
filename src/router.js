import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import HomePage from "./components/HomePage.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // 使用 HTML5 历史模式
  routes: [
    { path: "/", component: LoginPage },
    { path: "/home", component: HomePage, props: true }
  ],
});
