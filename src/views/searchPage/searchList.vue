<template>
  <div>
    <!-- 搜索 -->
    <div class="searchBox">
      <van-search
        v-model="keywords"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        ref="getFocus"
        @search="searchKey"
      >
        <template #action>
          <div class="searchBtn" @click="searchKey">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="spline"></div>
    <!-- 搜索结果列表 -->
    <div class="listBox">
      <!-- 搜索结果个数 -->
      <div class="resultNum">
        搜索结果<span class="numBox">{{ totalNum }}</span>
      </div>
      <van-tabs v-model="classActive" title-active-color="#F24B3B">
        <van-tab title="书籍">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="bookListBox">
                <div
                  class="bookList"
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
                    <span class="price" v-if="item.price > 0"
                      >¥{{ item.price }}</span
                    >
                    <span class="price free" v-else>免费</span>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="视频">
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
                >
                  <div class="imgBox">
                    <img :src="item.icon" alt="" />
                  </div>
                  <div class="txtBox">
                    <p class="title">{{ item.title }}</p>
                    <p class="author">主讲人：{{ item.author }}</p>
                    <p class="price">¥{{ item.price }}</p>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="音频">
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
                >
                  <div class="imgBox">
                    <img :src="item.icon" alt="" />
                  </div>
                  <div class="txtBox">
                    <p class="title">{{ item.title }}</p>
                    <p class="author">主讲人：{{ item.author }}</p>
                    <p class="price">¥{{ item.price }}</p>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon, Tab, Tabs, List, PullRefresh } from "vant";
Vue.use(Search);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
export default {
  name: "search",
  data() {
    return {
      // 搜索关键词
      keywords: this.$route.query.keywords ? this.$route.query.keywords : "",
      // tabActive
      classActive: 0,
      //搜索结果数目
      totalNum: 23,
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
      ],
      // 课程列表
      classList: [
        {
          icon: require("@/assets/images/audio-img.png"),
          title: "听林崇德老师讲基础教育",
          author: "林崇德",
          price: "12.00"
        },
        {
          icon: require("@/assets/images/audio-img.png"),
          title: "听林崇德老师讲基础教育",
          author: "林崇德",
          price: "12.00"
        },
        {
          icon: require("@/assets/images/audio-img.png"),
          title: "听林崇德老师讲基础教育",
          author: "林崇德",
          price: "12.00"
        }
      ]
    };
  },
  created() {
    this.searchKey();
  },
  mounted() {
    //search自动获取焦点
    this.$refs.getFocus.focus();
  },
  methods: {
    // 搜索关键词
    searchKey() {
      console.log(this.keywords);
      // 搜索后给历史记录添加搜索关键字
      // this.historyKeyList.push(this.keywords);
    },
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
  }
};
</script>
<style scoped>
.searchBtn {
  font-size: 30px;
  padding-left: 30px;
}
.listBox {
  position: relative;
}
/* 搜索结果个数 */
.resultNum {
  position: absolute;
  top: 26px;
  right: 26px;
  color: #999;
  z-index: 10;
}
.numBox {
  padding: 4px 14px;
  color: #ff1600;
  background: #ffe0dd;
  border-radius: 14px;
  margin-left: 15px;
}
/* 课程列表 */
.listBox >>> .van-tabs__nav--line {
  display: flex;
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
  padding: 10px 22px;
}
.classList {
  display: flex;
  justify-content: flex-start;
  margin-top: 26px;
}
.classList .imgBox {
  margin-right: 25px;
}
.classList .imgBox img {
  width: 300px;
  height: 170px;
  border-radius: 8px;
}
.classList .txtBox {
  position: relative;
}
.classList .txtBox .title {
  font-size: 28px;
  color: #333333;
}
.classList .txtBox .author {
  margin-top: 15px;
  color: #333333;
}
.classList .txtBox .price {
  position: absolute;
  left: 0;
  bottom: 2px;
  font-size: 26px;
  color: #f24b3b;
}
/* 书籍列表 */
.bookListBox {
  padding: 20px 30px;
}
.bookList {
  display: flex;
  justify-content: flex-start;
  margin-top: 26px;
}
.bookList .imgBox {
  position: relative;
  margin-right: 50px;
}
.bookList .imgBox img {
  width: 210px;
  height: 285px;
  border-radius: 8px;
  box-shadow: #aba8a8 2px 4px 6px 0px;
}
.bookList .txtBox {
  position: relative;
}
.bookList .title {
  font-size: 30px;
  margin-top: 20px;
}
.bookList .author {
  color: #999;
  margin-top: 20px;
}
.bookList .count {
  color: #999;
  margin-top: 20px;
}
.bookList .txtBox .price {
  position: absolute;
  left: 0;
  bottom: 10px;
  color: #f24b3b;
}
.bookList .txtBox .free {
  color: #65e49e;
}
</style>
