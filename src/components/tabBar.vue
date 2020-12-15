<template>
  <div class="tabbar">
    <van-tabbar
      v-model="active"
      class="active_tab"
      active-color="#F24B3B"
      :placeholder="true"
    >
      <van-tabbar-item
        v-for="(item, index) in tabbars"
        :key="index"
        @click="tab(index, item.name)"
      >
        <span :class="currIndex == index ? active : ''">{{ item.title }}</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  name: "Tabbar",
  props: {
    idx: Number
  },
  data() {
    return {
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: "/",
          title: "首页",
          normal: require("@/assets/images/icon-home.png"),
          active: require("@/assets/images/icon-home-pre.png")
        },
        {
          name: "schoolRoom",
          title: "书房",
          normal: require("@/assets/images/icon-schoolroom.png"),
          active: require("@/assets/images/icon-schoolroom-pre.png")
        },
        {
          index: 3,
          name: "mine",
          title: "我的",
          normal: require("@/assets/images/icon-mine.png"),
          active: require("@/assets/images/icon-mine-pre.png")
        }
      ]
    };
  },
  created() {
    // 通过路由跳转判断选中的样式
    if (this.$route.name == "/") {
      this.active = 0;
    } else if (this.$route.name == "schoolRoom") {
      this.active = 1;
    } else if (this.$route.name == "mine") {
      this.active = 2;
    }
  },
  methods: {
    tab(index, val) {
      this.currIndex = index;
      this.$router.push(val);
    }
  }
};
</script>
