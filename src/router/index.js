import Vue from "vue";
import VueRouter from "vue-router";

// 路由数据
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});
//切换页面后让滚动条回到顶部
router.afterEach((to, from) => {
  window.pageYOffset = 0;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
export default router;
