<template>
  <div>
    <div class="mineBox">
      <div class="mineInfo" :style="mineBg">
        <div class="avatarBox">
          <img :src="userInfo.icon" alt="" />
        </div>
        <div class="userName">{{ userInfo.userName }}</div>
      </div>
      <div class="mineItem" style="margin-top:20px;" @click="toCoupon">
        <div class="inBox">
          <img class="mineImg" src="@/assets/images/mine-coupon.png" alt="" />
          <span>我的优惠券</span>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="mineItem" @click="toRecord">
        <div class="inBox">
          <img class="mineImg" src="@/assets/images/mine-record.png" alt="" />
          <span>购买记录</span>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="mineItem" @click="toNews">
        <div class="inBox">
          <img class="mineImg" src="@/assets/images/mine-news.png" alt="" />
          <span>我的消息</span>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="mineItem" style="margin-top:10px;" @click="toHelp">
        <div class="inBox">
          <img class="mineImg" src="@/assets/images/mine-help.png" alt="" />
          <span>帮助与反馈</span>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="mineItem exitBox" style="margin-top:10px;">
        <span class="exit">退出账号</span>
      </div>
    </div>
    <Tabbar :idx="2"></Tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import Tabbar from "@/components/tabBar.vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
  name: "mine",
  data() {
    return {
      //页面头部背景
      mineBg: {
        backgroundImage: "url(" + require("@/assets/images/mine-bg.png") + ")"
      },
      // 用户信息
      userInfo: {
        icon: require("@/assets/images/mine-avatar.png"),
        userName: "用户名"
      }
    };
  },
  created() {},
  methods: {
    //到我的优惠券
    toCoupon() {
      this.$router.push({
        path: "/mineCoupon"
      });
    },
    //到我的消息
    toNews() {
      this.$router.push({
        path: "/mineNews"
      });
    },
    //到购买记录
    toRecord() {
      this.$router.push({
        path: "/mineRecord"
      });
    },
    //到帮助与反馈
    toHelp() {
      this.$router.push({
        path: "/help"
      });
    }
  },
  components: {
    Tabbar
  }
};
</script>
<style scoped>
.mineBox {
  min-height: calc(100vh - 100px);
  background: #f5f5f5;
}
.mineInfo {
  height: 360px;
  background-size: cover;
  display: flex;
  align-items: center;
}
.avatarBox {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 60px;
}
.avatarBox img {
  width: 100%;
  height: 100%;
}
.userName {
  font-size: 36px;
  margin-left: 30px;
  color: #fff;
}
.mineItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 34px 30px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.inBox {
  display: flex;
  align-items: center;
}
.mineImg {
  width: 34px;
  height: 34px;
  margin-right: 22px;
}
.mineItem span {
  font-size: 28px;
  color: #333333;
}
.exitBox {
  justify-content: center;
}
.exitBox .exit {
  font-size: 28px;
  color: #f24b3b;
}
</style>
