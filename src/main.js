import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import service from "@/plugin/axios";
import wx from "weixin-js-sdk";

//rem适配
import "amfe-flexible/index";

// 自定义配置
import config from "./assets/js/config";

//工具类
import toolClass from "./assets/js/toolClass";

Vue.prototype.tool = toolClass;
Vue.prototype.config = config;
Vue.prototype.request = service;
Vue.use(wx);

// 全局微信初始化方法
Vue.prototype.SDKRegister = (obj, callback) => {
  // 接入微信JSSDK
  // 获取微信JSSDK配置
  var that = obj.that;
  let url = "/api/wechatJsSdk/signature";
  let option = {
    url: obj.pageUrl.split("#")[0],
    appId: config.appId
  };
  let jsApiList = obj.jsApiList;
  that
    .request({
      method: "POST",
      url: url,
      data: option
    })
    .then(res => {
      res = res.result;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: jsApiList
      });
    });

  wx.ready(function() {
    // 如果需要定制ready回调方法
    if (callback) {
      callback.call(that);
    }
  });
};

// 路由拦截处理
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 判断当前的token是否存在
    if (toolClass.getCookie("token-" + config.appId)) {
      next();
    } else {
      //判断是否是移动端
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        //如在是微信中打开
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          Vue.config.isWeChat = true;
          var returnUrl = encodeURIComponent("/bookshelf2/#" + to.fullPath);
          var url =
            config.requestCtx +
            "/WechatMpOauth?id=" +
            config.appId +
            "&returnUrl=" +
            returnUrl;
          window.location.href = url;
        } else {
          if (to.path.indexOf("/wechatOpen") >= 0) {
            next();
          } else {
            next({
              path: "/wechatOpen"
            });
          }
        }
      } else {
        next({
          path: "/wechatOpen"
        });
      }
    }
  } else {
    next();
  }
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
