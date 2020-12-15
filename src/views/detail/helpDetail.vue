<template>
  <div class="helpDetailBox">
    <div class="title">{{ title }}</div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: "testLogin",
  data() {
    return {
      title: "如何找回账号?",
      content:
        "您好~如果您的账号下线了，无法登陆时,您可通过以下几种情况找回您的账号 1.绑定过手机号:如果您的账户绑定过手机号，您可直接使用手机与手机验证码登录 2.绑定过第三方软件:如果您绑定过第三方软件(微信，微博，QQ)，您可通过第三方软件直接登录 3.未绑定手机与第三方软件:如您未绑定过手机号与第三方软件，若您有过充值记录，您可提供商户订单号给客服人员，来帮您找回账号 查询方法:您可在第三方支付软件中找到之前消费过的记录，查询商户单号提供给客服人员 4.以上情况均未有:如您的情况均不符合以上场景,您点击去反馈，联系客服人员帮您查找您的登录记录，找回账号"
    };
  },
  created() {},
  methods: {}
};
</script>
<style scoped>
.helpDetailBox {
  padding: 30px 22px;
}
.title {
  font-size: 30px;
  color: #333333;
  font-weight: bold;
}
.content {
  margin-top: 48px;
  line-height: 50px;
}
</style>
