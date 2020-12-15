<template>
  <div class="wrap">
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
    <!-- 热门搜索 -->
    <div class="hotKeyBox">
      <div class="title" style="margin-bottom:10px;">热门搜索</div>
      <div class="keyBox">
        <div class="hotKeyList">
          <div
            class="keyItem"
            v-for="(item, index) in hotKeyList"
            :key="index"
            @click="searchItem(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <!-- 历史搜索 -->
    <div class="historyKeyBox" v-if="historyKeyList.length > 0">
      <div class="titleBox" style="margin-bottom:10px;">
        <div class="title">历史搜索</div>
        <span class="clearBtn" @click="clearHistory">清空搜索记录</span>
      </div>
      <div class="keyBox">
        <div class="historyKeyList">
          <div
            class="keyItem"
            v-for="(item, index) in historyKeyList"
            :key="index"
            @click="searchItem(item)"
          >
            <div class="txt">{{ item }}</div>
            <span class="delBtn" @click.stop="delItem(index)"
              ><van-icon name="delete" size="16"
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon } from "vant";
Vue.use(Search);
Vue.use(Icon);
export default {
  name: "search",
  data() {
    return {
      // 搜索关键词
      keywords: "",
      // 热门搜索
      hotKeyList: ["林崇德", "名师课堂", "基础教育"],
      // 历史搜索
      historyKeyList: ["汪星人", "民航概论"]
    };
  },
  mounted() {
    //search自动获取焦点
    this.$refs.getFocus.focus();
  },
  methods: {
    // 搜索按钮搜索关键词
    searchKey() {
      console.log(this.keywords);
      this.$router.push({
        path: "/searchPage/searchList",
        query: {
          keywords: this.keywords
        }
      });
      this.historyKeyList.push(this.keywords);
    },
    //点击热门标签，历史记录搜索关键词
    searchItem(item) {
      this.keywords = item;
      this.searchKey();
    },
    //删除历史记录
    delItem(index) {
      this.historyKeyList.splice(index, 1);
    },
    // 清空历史记录
    clearHistory() {
      this.historyKeyList = [];
    }
  }
};
</script>
<style scoped>
.searchBtn {
  font-size: 30px;
  padding-left: 30px;
}
.hotKeyBox,
.historyKeyBox {
  padding: 30px;
}
.title {
  font-size: 28px;
  color: #000;
}
/* 热门搜索 */
.hotKeyList {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.hotKeyList .keyItem {
  padding: 16px 40px;
  color: #888;
  background: #f3f3f3;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin: 15px 15px 0 0;
}
/* 历史搜索 */
.titleBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clearBtn {
  color: #888;
}
.historyKeyList .keyItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}
.historyKeyList .keyItem .txt {
  color: #888;
}
.delBtn {
  display: flex;
  align-items: center;
}
.delBtn i {
  color: #888;
}
</style>
