import Vue from "vue";
import Router from "vue-router";
import HomePage from "./components/HomePage.vue";
import UploadPage from "./components/UploadPage.vue";
import JupyterExecutor from "./components/JupyterExecutor.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // 使用 HTML5 历史模式
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/upload",
      name: "Upload",
      component: UploadPage,
    },
    {
      path: "/editor",
      name: "JupyterExecutor",
      component: JupyterExecutor,
    },
  ],
});
