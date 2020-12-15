<template>
  <div>
    <div class="menuListBox">
      <div class="sideBarBox">
        <van-sidebar v-model="menuActive">
          <van-sidebar-item
            v-for="(item, index) in menuItems"
            :key="index"
            :title="item.title"
          />
        </van-sidebar>
      </div>
      <div class="listBox">
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
                  <div class="priceBox">
                    <p class="price">¥{{ item.price }}</p>
                  </div>
                </div>
                <p class="title">{{ item.title }}</p>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Sidebar, SidebarItem, List, PullRefresh } from "vant";
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(List);
Vue.use(PullRefresh);
export default {
  name: "hotList",
  data() {
    return {
      //分页
      loading: false,
      finished: true,
      refreshing: false,
      // 菜单active
      menuActive: 0,
      //菜单列表
      menuItems: [{ title: "视频" }, { title: "音频" }],
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
  created() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
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
.menuListBox {
  display: flex;
  min-height: 100vh;
}
.listBox {
  flex: 1;
}
/* 侧边栏 */
.sideBarBox {
  background: #fff8f3;
}
.sideBarBox >>> .van-sidebar {
  width: 160px;
}
.sideBarBox >>> .van-sidebar-item {
  padding: 30px 9px;
  text-align: center;
  background-color: #fff8f3;
}
.sideBarBox >>> .van-sidebar-item--select {
  color: #f24b3b;
  background-color: #fff;
}
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
  padding: 10px 22px;
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
  width: 260px;
  height: 145px;
  border-radius: 8px;
}
.classList .imgBox .priceBox {
  position: absolute;
  left: 15px;
  bottom: 15px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
}
</style>
