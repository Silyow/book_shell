import layoutPage from "@/layout/layout";

import searchPage from "./modules/searchPage";

const meta = { requiresAuth: true };

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: "/",
    redirect: { name: "index" },
    component: layoutPage,
    children: [
      {
        path: "index",
        name: "index",
        meta: { meta, title: "首页" },
        component: () => import("@/views/index")
      }
    ]
  },
  searchPage
];

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 书房
  {
    path: "/schoolRoom",
    name: "schoolRoom",
    component: () => import("@/views/schoolRoom")
  },
  // 我的
  {
    path: "/mine",
    name: "mine",
    component: () => import("@/views/mine")
  },
  // 全部分类
  {
    path: "/menu",
    name: "menu",
    component: () => import("@/views/menu")
  },
  // 左侧为菜单的列表
  {
    path: "/menuList",
    name: "menuList",
    component: () => import("@/views/list/menuList")
  },
  // 热门课程列表
  {
    path: "/hotList",
    name: "hotList",
    component: () => import("@/views/list/hotList")
  },
  // 书籍列表
  {
    path: "/bookList",
    name: "bookList",
    component: () => import("@/views/list/bookList")
  },
  // 书架列表
  {
    path: "/shellList",
    name: "shellList",
    component: () => import("@/views/list/shellList")
  },
  // 左侧为菜单的列表
  {
    path: "/menuList",
    name: "menuList",
    component: () => import("@/views/list/menuList")
  },
  // 书籍详情页
  {
    path: "/bookDetail",
    name: "bookDetail",
    component: () => import("@/views/detail/bookDetail")
  },
  // 我的消息
  {
    path: "/mineNews",
    name: "mineNews",
    component: () => import("@/views/mine/news")
  },
  // 我的记录
  {
    path: "/mineRecord",
    name: "mineRecord",
    component: () => import("@/views/mine/record")
  },
  // 我的优惠券
  {
    path: "/mineCoupon",
    name: "mineCoupon",
    component: () => import("@/views/mine/coupon")
  },
  // 帮助与反馈
  {
    path: "/help",
    name: "help",
    component: () => import("@/views/mine/help")
  },
  // 帮助与反馈详情
  {
    path: "/helpDetail",
    name: "helpDetail",
    component: () => import("@/views/detail/helpDetail")
  },
  // 音频视频详情
  {
    path: "/resourceDetail",
    name: "resourceDetail",
    component: () => import("@/views/detail/resourceDetail")
  },
  // 视频播放器
  {
    path: "/videoPlay",
    name: "videoPlay",
    component: () => import("@/views/play/videoPlay")
  },
  // 音频播放器
  {
    path: "/audioPlay",
    name: "audioPlay",
    component: () => import("@/views/play/audioPlay")
  },
  // 测试登录
  {
    path: "/testLogin",
    name: "testLogin",
    component: () => import("@/views/testLogin")
  },
  // 微信中打开
  {
    path: "/wechatOpen",
    name: "wechatOpen",
    component: () => import("@/views/wechatOpen")
  }
];

// 重新组织后导出
export default [...frameIn, ...frameOut];
