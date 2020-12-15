<template>
  <div class="wrap">
    <div class="schoolRoomBox">
      <van-tabs v-model="tabActive" title-active-color="#F24B3B">
        <van-tab title="我的书籍">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="classListBox">
                <div
                  class="classList bookList"
                  v-for="(item, index) in bookList"
                  :key="index"
                  @click="toDetail"
                >
                  <div class="imgBox">
                    <img :src="item.icon" alt="" />
                    <div class="priceBox">
                      <p class="price">{{ item.price }}%</p>
                    </div>
                  </div>
                  <p class="title">{{ item.title }}</p>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="我的课程">
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
                  v-for="(item, index) in classList"
                  :key="index"
                  @click="toReDetail"
                >
                  <div class="imgBox">
                    <img :src="item.icon" alt="" />
                    <div class="priceBox">
                      <p class="price">{{ item.price }}%</p>
                    </div>
                  </div>
                  <p class="title">{{ item.title }}</p>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <Tabbar :idx="1"></Tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import Tabbar from "@/components/tabBar.vue";
import { Tab, Tabs, List, PullRefresh } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
export default {
  name: "schoolRoom",
  data() {
    return {
      //分页
      loading: false,
      finished: true,
      refreshing: false,
      // tabActive
      tabActive: 0,
      // 书籍列表
      bookList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "电视节目主持",
          author: "林崇德",
          price: "12",
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
          price: "32",
          count: 20
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "电视节目主持",
          author: "林崇德",
          price: "12",
          count: 20
        }
      ],
      // 课程列表
      classList: [
        {
          icon: require("@/assets/images/audio-img.png"),
          title: "听林崇德老师讲基础教育",
          author: "林崇德",
          price: "20"
        },
        {
          icon: require("@/assets/images/audio-img.png"),
          title: "听林崇德老师讲基础教育",
          author: "林崇德",
          price: "56"
        },
        {
          icon: require("@/assets/images/audio-img.png"),
          title: "听林崇德老师讲基础教育",
          author: "林崇德",
          price: "18"
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
    //到音频视频详情页面
    toReDetail() {
      this.$router.push({
        path: "/resourceDetail"
      });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        this.loading = false;

        if (this.classList.length >= 3) {
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
  },
  components: {
    Tabbar
  }
};
</script>
<style scoped>
/* 课程列表 */
.listBox >>> .van-tabs__nav--line {
  display: flex;
  justify-content: center;
}
.listBox >>> .van-tab {
  flex: none;
  width: 150px;
  font-size: 26px;
}
.classListBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 12px;
}
.classList {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 26px;
}
.classList .imgBox {
  position: relative;
}
.classList .imgBox img {
  width: 335px;
  height: 190px;
  border-radius: 8px;
  box-shadow: #aba8a8 2px 4px 6px 0px;
}
.classList .imgBox .priceBox {
  position: absolute;
  left: 15px;
  bottom: 15px;
  color: #ffffff;
  background: rgba(0, 207, 68, 0.7);
  padding: 5px 15px;
  border-radius: 5px;
  z-index: 1;
}
.classList .title {
  margin-top: 20px;
}
/* 书籍列表 */
.bookList .imgBox img {
  width: 215px;
  height: 300px;
  border-radius: 8px;
  box-shadow: #aba8a8 2px 4px 6px 0px;
}
</style>
