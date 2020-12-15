<template>
  <div class="menuBox">
    <div class="menuItem" @click="toShellList">
      <img src="@/assets/images/menu-icon1.png" alt="" />
      <span>高等教育</span>
    </div>
    <div class="menuItem" @click="toShellList">
      <img src="@/assets/images/menu-icon2.png" alt="" />
      <span>京师职教</span>
    </div>
    <div class="menuItem" @click="toShellList">
      <img src="@/assets/images/menu-icon3.png" alt="" />
      <span>科技经管</span>
    </div>
    <div class="menuItem" @click="toShellList">
      <img src="@/assets/images/menu-icon4.png" alt="" />
      <span>教师教育</span>
    </div>
    <div class="menuItem" @click="toShellList">
      <img src="@/assets/images/menu-icon5.png" alt="" />
      <span>京师普教</span>
    </div>
    <div class="menuItem" @click="toShellList">
      <img src="@/assets/images/menu-icon6.png" alt="" />
      <span>京师学前</span>
    </div>
    <div class="menuItem" @click="toShellList">
      <img src="@/assets/images/menu-icon7.png" alt="" />
      <span>主题出版</span>
    </div>
    <div class="menuItem">
      <img src="@/assets/images/menu-icon8.png" alt="" />
      <span>免费专区</span>
    </div>
    <div class="menuItem" @click="toMenuList">
      <img src="@/assets/images/menu-icon9.png" alt="" />
      <span>京师青课</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu",
  data() {
    return {};
  },
  created() {},
  methods: {
    //到青课列表页面
    toMenuList() {
      this.$router.push({
        path: "/menuList"
      });
    },
    //到书架列表页面
    toShellList() {
      this.$router.push({
        path: "/shellList"
      });
    }
  }
};
</script>
<style scoped>
.menuBox {
  display: flex;
  flex-wrap: wrap;
}
.menuItem {
  display: flex;
  width: 33%;
  height: 250px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.menuItem img {
  width: 56px;
  height: 56px;
}
.menuItem span {
  color: #666;
  margin-top: 24px;
}
</style>
