<template>
  <div>
    <div class="recordBox">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="orderListBox">
            <div
              class="orderList"
              v-for="(item, index) in orderList"
              :key="index"
            >
              <div class="spline"></div>
              <div class="orderTitle">
                <span class="orderNum">订单号: {{ item.orderNum }}</span>
                <span class="time">{{ item.time }}</span>
              </div>
              <div class="orderContent">
                <div
                  class="contentItem"
                  v-for="(item, index) in item.orderBook"
                  :key="index"
                >
                  <div class="imgBox">
                    <img class="bookImg" :src="item.icon" alt="" />
                  </div>
                  <div class="txtBox">
                    <div class="title">{{ item.title }}</div>
                    <div class="price">¥{{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { List, PullRefresh } from "vant";
Vue.use(List);
Vue.use(PullRefresh);
export default {
  name: "record",
  data() {
    return {
      //分页
      loading: false,
      finished: true,
      refreshing: false,
      // 订单列表
      orderList: [
        {
          orderNum: 345618908323456,
          time: "2020-08-08",
          orderBook: [
            {
              icon: require("@/assets/images/audio-img.png"),
              title: "听林崇德老师讲基础教育",
              author: "林崇德",
              price: "12.00"
            },
            {
              icon: require("@/assets/images/book-img1.png"),
              title: "听林崇德老师讲基础教育",
              author: "林崇德",
              price: "12.00"
            },
            {
              icon: require("@/assets/images/book-img2.png"),
              title: "听林崇德老师讲基础教育",
              author: "林崇德",
              price: "12.00"
            }
          ]
        },
        {
          orderNum: 345618908322226,
          time: "2020-08-08",
          orderBook: [
            {
              icon: require("@/assets/images/audio-img.png"),
              title: "听林崇德老师讲基础教育",
              author: "林崇德",
              price: "12.00"
            },
            {
              icon: require("@/assets/images/book-img3.png"),
              title: "听林崇德老师讲基础教育",
              author: "林崇德",
              price: "12.00"
            }
          ]
        }
      ]
    };
  },
  created() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.loading = false;

        if (this.orderList.length >= 2) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>
<style scoped>
.orderTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999;
  padding: 20px 30px;
  border-bottom: 1px solid #dddddd;
}
.orderContent {
  padding: 30px;
}
.contentItem {
  display: flex;
  margin-top: 12px;
}
.txtBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.imgBox {
  width: 300px;
  height: 200px;
  margin-right: 30px;
  border: 1px solid #ddd;
  position: relative;
  box-sizing: border-box;
}
.imgBox img {
  width: auto;
  height: auto;
  max-width: calc(100% - 30px);
  max-height: calc(100% - 30px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.txtBox .title {
  font-size: 28px;
  color: #333333;
}
.txtBox .price {
  margin-bottom: 20px;
  color: #f24b3b;
}
</style>
