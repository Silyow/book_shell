<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import "~@/assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* 解决ios用户设置字体大小 */
body {
  -webkit-text-size-adjust: 100% !important;
}
</style>
<script>
//解决安卓用户设置字体大小
/* eslint-disable */
(function() {
  if (
    typeof WeixinJSBridge == "object" &&
    typeof WeixinJSBridge.invoke == "function"
  ) {
    handleFontSize();
  } else {
    document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on("menu:setfont", function() {
      WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    });
  }
})();
</script>
