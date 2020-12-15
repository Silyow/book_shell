import layoutPage from "@/layout/layout";

const meta = { requiresAuth: true };

export default {
  path: "/searchPage",
  name: "searchPage",
  meta,
  redirect: { name: "searchPage-search" },
  component: layoutPage,
  children: (pre => [
    {
      path: "search",
      name: `${pre}search`,
      component: () => import("@/views/searchPage/search"),
      meta: { meta, title: "搜索" }
    },
    {
      path: "searchList",
      name: `${pre}searchList`,
      component: () => import("@/views/searchPage/searchList"),
      meta: { meta, title: "搜索结果列表" }
    }
  ])("searchPage-")
};
