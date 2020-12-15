<template>
  <div class="newsBox">
    <div class="newsList">
      <div class="newsItem" v-for="(item, index) in newsList" :key="index">
        <div class="imgBox">
          <img
            v-if="item.type == 0"
            src="@/assets/images/icon-coupon.png"
            alt=""
          />
          <img
            v-if="item.type == 1"
            src="@/assets/images/icon-news.png"
            alt=""
          />
          <img
            v-if="item.type == 2"
            src="@/assets/images/icon-activity.png"
            alt=""
          />
        </div>
        <div class="txtBox">
          <div class="title">
            <span v-if="item.type == 0">优惠券领取</span>
            <span v-if="item.type == 1">消息回复</span>
            <span v-if="item.type == 2">优惠活动</span>
            <span class="time">{{ item.time }}</span>
          </div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
  name: "mineNews",
  data() {
    return {
      // 消息列表
      newsList: [
        {
          type: 0,
          content: "领取了一张满100减50的优惠券，请注意查看",
          time: "04-22"
        },
        {
          type: 1,
          content: "您收到一条消息回复，请注意查看",
          time: "04-12"
        },
        {
          type: 1,
          content: "您收到一条消息回复，请注意查看",
          time: "04-12"
        },
        {
          type: 1,
          content: "您收到一条消息回复，请注意查看",
          time: "04-12"
        },
        {
          type: 2,
          content: "北京师范大学出版集团优惠活动，请注意查看",
          time: "05-30"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>
<style scoped>
.newsBox {
  padding: 25px 30px;
}
.newsItem {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.newsItem .imgBox {
  margin-right: 28px;
}
.newsItem .imgBox img {
  width: 80px;
  height: 80px;
}
.txtBox {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px dotted #999;
}
.txtBox .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: #333;
}
.txtBox .title .time {
  color: #999;
}
.txtBox .content {
  margin-top: 15px;
  color: #999;
}
</style>
