<template>
  <div class="wrap">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="classListBox">
          <div
            class="classList"
            v-for="(item, index) in bookList"
            :key="index"
            @click="toDetail"
          >
            <div class="imgBox">
              <img :src="item.icon" alt="" />
            </div>
            <div class="txtBox">
              <p class="title">{{ item.title }}</p>
              <p class="author">{{ item.author }}</p>
              <p class="count">{{ item.count }}人阅读</p>
              <span class="price" v-if="item.price > 0">¥{{ item.price }}</span>
              <span class="price free" v-else>免费</span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from "vue";
import { List, PullRefresh } from "vant";
Vue.use(List);
Vue.use(PullRefresh);
export default {
  name: "shellList",
  data() {
    return {
      //分页
      loading: false,
      finished: true,
      refreshing: false,
      // 书籍列表
      bookList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "电视节目主持",
          author: "林崇德",
          price: "12.00",
          count: 10
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "法国当代文学",
          author: "林崇德",
          price: "0",
          count: 18
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "电视节目主持",
          author: "林崇德",
          price: "12.00",
          count: 20
        }
      ]
    };
  },
  created() {},
  methods: {
    //到书籍详情页面
    toDetail() {
      this.$router.push({
        path: "/bookDetail"
      });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.loading = false;

        if (this.bookList.length >= 3) {
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
/* 书籍列表 */
.classListBox {
  padding: 20px 30px;
}
.classList {
  display: flex;
  justify-content: flex-start;
  margin-top: 26px;
}
.classList .imgBox {
  position: relative;
  margin-right: 50px;
}
.classList .imgBox img {
  width: 210px;
  height: 285px;
  border-radius: 8px;
  box-shadow: #aba8a8 2px 4px 6px 0px;
}
.classList .txtBox {
  position: relative;
}
.classList .title {
  font-size: 30px;
  margin-top: 20px;
}
.classList .author {
  color: #999;
  margin-top: 20px;
}
.classList .count {
  color: #999;
  margin-top: 20px;
}
.classList .txtBox .price {
  position: absolute;
  left: 0;
  bottom: 10px;
  color: #f24b3b;
}
.classList .txtBox .free {
  color: #65e49e;
}
</style>
