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
        <div class="sortBox">
          <div class="btnBox">
            <div class="showSortBtn" @click="showSort">
              <span>{{ sortName }}</span>
              <van-icon name="arrow-down" />
            </div>
          </div>
          <van-action-sheet
            v-model="show"
            :actions="sortList"
            @select="onSelect"
          />
        </div>
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
// eslint-disable-next-line
import { Sidebar, SidebarItem, List, PullRefresh, ActionSheet, Icon } from "vant";
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(ActionSheet);
Vue.use(Icon);
export default {
  name: "shellList",
  data() {
    return {
      //分页
      loading: false,
      finished: true,
      refreshing: false,
      // 菜单active
      menuActive: 0,
      //菜单列表
      menuItems: [
        { title: "高等教育" },
        { title: "京师职教" },
        { title: "科技经管" },
        { title: "教师教育" }
      ],
      //分类弹层显示
      show: false,
      // 分类active
      sortActive: 0,
      sortName: "全部分类",
      // 分类列表
      sortList: [
        { name: "全部分类", value: 0 },
        { name: "电视栏目", value: 1 },
        { name: "当代文学", value: 2 },
        { name: "教育科普", value: 3 }
      ],
      // 课程列表
      classList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "电视节目主持",
          author: "林崇德",
          price: "12.00"
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "法国当代文学",
          author: "林崇德",
          price: "12.00"
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "电视节目主持",
          author: "林崇德",
          price: "12.00"
        }
      ]
    };
  },
  created() {},
  methods: {
    //显示分类列表
    showSort() {
      this.show = true;
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.sortName = item.name;
      this.sortActive = item.value;
    },
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
  padding: 10px 60px;
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
  width: 210px;
  height: 285px;
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
.classList .title {
  margin-top: 10px;
}
/* 分类 */
.btnBox {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.showSortBtn {
  width: 510px;
  padding: 20px 0;
  margin: 20px 0;
  background: #f3f3f3;
  text-align: center;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.showSortBtn span {
  margin-right: 10px;
}
</style>
