<template>
  <div class="helpBox">
    <div class="helpInfo">
      <img class="bg" src="@/assets/images/help-bg.png" alt="" />
      <div class="linkNum" @click="toCallNum">
        <img src="@/assets/images/icon-phone.png" alt="" />
        <span>联系我们</span>
      </div>
    </div>
    <div class="spline"></div>
    <div class="helpItemBox">
      <div class="helpTitle">常见问题</div>
      <div class="helpItem" @click="toHelpDetail">
        <span>如何找回账号？</span>
        <van-icon name="arrow" />
      </div>
      <div class="helpItem" @click="toHelpDetail">
        <span>买过的书还会收费吗？</span>
        <van-icon name="arrow" />
      </div>
      <div class="helpItem" @click="toHelpDetail">
        <span>为什么我看的课程不见了？</span>
        <van-icon name="arrow" />
      </div>
      <div class="helpItem" @click="toHelpDetail">
        <span>购买过的课程在哪里可以找到？</span>
        <van-icon name="arrow" />
      </div>
      <div class="helpItem" @click="toHelpDetail">
        <span>为什么我已经购买了又要收费？</span>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Dialog } from "vant";
Vue.use(Icon);
Vue.use(Dialog);
export default {
  name: "help",
  data() {
    return {
      //客服电话号
      phoneNumber: "029-12502"
    };
  },
  created() {},
  methods: {
    //显示电话弹层
    toCallNum() {
      this.callPhone();
      // Dialog.confirm({
      //   title: "拨打客服热线",
      //   message: this.phoneNumber + "?",
      //   width: "260"
      // })
      //   .then(() => {
      //     this.callPhone();
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    },
    // 调用拨号功能
    callPhone() {
      window.location.href = "tel://" + this.phoneNumber;
    },
    //到帮助详情页
    toHelpDetail() {
      this.$router.push({
        path: "/helpDetail"
      });
    }
  }
};
</script>
<style scoped>
.helpInfo {
  width: 100%;
  height: 380px;
}
.helpInfo img.bg {
  width: 100%;
  height: 100%;
}
.linkNum {
  position: absolute;
  top: 190px;
  left: 340px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 180px;
  height: 60px;
  padding: 0 30px;
  background: #fff;
  border-radius: 30px;
  font-size: 28px;
  color: #5563d6;
  font-weight: bold;
}
.linkNum img {
  width: 30px;
  height: 28px;
}
.helpTitle {
  font-size: 30px;
  padding: 30px 36px;
  font-weight: bold;
  color: #333333;
}
.helpItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 26px;
  padding: 30px 36px;
  border-bottom: 1px solid #ededed;
}
</style>
