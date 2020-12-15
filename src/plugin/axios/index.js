import axios from "axios";
import myConfig from "@/assets/js/config";
import toolClass from "@/assets/js/toolClass";

// 创建 axios 实例
const service = axios.create({
  baseURL: myConfig.requestCtx,
  timeout: myConfig.requestTimeOut // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    if (!/^https:\/\/|http:\/\//.test(config.url)) {
      const token = toolClass.getCookie("token-" + myConfig.appId);
      if (token && token !== "undefined") {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  error => {
    // 发送失败
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { success } = dataAxios;
    // 根据 code 进行判断
    if (success) {
      return dataAxios.result;
    } else {
      // 提示错误
      console.error(dataAxios.msg);
    }
  },
  error => {
    if (error.response && error.response.status == 401) {
      toolClass.delCookie("token-" + myConfig.appId);
      var returnUrl = encodeURIComponent("/bookshelf2/#/index");
      var url =
        myConfig.requestCtx +
        "/WechatMpOauth?id=" +
        myConfig.appId +
        "&returnUrl=" +
        returnUrl;
      window.location.href = url;
    } else {
      if (error.response && error.response.data && error.response.data.error) {
        console.error(error.response.data.error.msg);
      } else {
        console.error("请求发生错误");
      }
    }
    return Promise.reject(error);
  }
);

export default service;
