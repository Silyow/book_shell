<template>
  <div class="bookDetailBox">
    <div class="detailInfoBox">
      <div class="classList">
        <div class="imgBox">
          <img :src="bookInfo.icon" alt="" />
        </div>
        <div class="txtBox">
          <p class="title">{{ bookInfo.title }}</p>
          <p class="author">{{ bookInfo.author }}</p>
          <p class="count">{{ bookInfo.count }}人阅读</p>
          <span class="price" v-if="bookInfo.price > 0"
            >¥{{ bookInfo.price }}</span
          >
          <span class="price free" v-else>免费</span>
        </div>
      </div>
    </div>
    <div class="spline" style="height:10px"></div>
    <div class="tabInfoBox">
      <van-tabs v-model="tabActive" title-active-color="#F24B3B">
        <van-tab title="简介" style="border-right:1px solid #ddd;">
          <div class="tabContent">{{ bookInfo.desc }}</div>
        </van-tab>
        <van-tab title="目录">
          <van-collapse v-model="activeNames">
            <van-collapse-item
              :name="chapterIndex"
              v-for="(chapterItem, chapterIndex) in resourceList"
              :key="chapterIndex"
            >
              <div slot="title">{{ chapterItem.name }}</div>
              <van-collapse
                v-model="names"
                v-if="chapterItem.children && chapterItem.children.length"
              >
                <van-collapse-item
                  class="childrenItem"
                  v-for="(childrenItem, childrenIndex) in chapterItem.children"
                  :key="childrenIndex"
                  :title="childrenItem.title"
                  :name="chapterIndex + '_' + childrenIndex"
                >
                  <span slot="value" v-if="childrenItem.totalCount">{{
                    childrenItem.totalCount
                  }}</span>
                  <div class="resourceBox">
                    <div
                      class="booklist"
                      v-for="(conItem, conIndex) in childrenItem.items"
                      :key="conIndex"
                      @click="goDetail(conItem, childrenItem, conIndex, image)"
                    >
                      <p>
                        <span class="itemContent">{{ conItem.title }}</span>
                        <span
                          class="tryMsg"
                          v-if="!productInfo.contentValid && conItem.freeFile"
                          >试读</span
                        >
                        <span
                          class="buyMsg"
                          v-if="!productInfo.contentValid && !conItem.freeFile"
                          >需购买</span
                        >
                      </p>
                    </div>
                    <div class="nullBox" v-if="chapterItem.items.length == 0">
                      暂无数据
                    </div>
                  </div>
                </van-collapse-item>
              </van-collapse>
              <div
                class="resourceBox"
                v-if="!chapterItem.children || chapterItem.children.length == 0"
              >
                <div
                  class="booklist"
                  v-for="(conItem, conIndex) in chapterItem.items"
                  :key="conIndex"
                  @click="goDetail(conItem, chapterItem, conIndex)"
                >
                  <p>
                    <span class="itemContent">{{ conItem.title }}</span>
                    <!-- <span
                      class="tryMsg"
                      v-if="!productInfo.contentValid && conItem.freeFile"
                      >试读</span
                    >
                    <span
                      class="buyMsg"
                      v-if="!productInfo.contentValid && !conItem.freeFile"
                      >需购买</span
                    > -->
                  </p>
                </div>
                <div class="nullBox" v-if="chapterItem.items.length == 0">
                  暂无数据
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 点赞 -->
    <div class="likeBox">
      <div class="likeBtn">
        <van-icon class="likeIcon" name="good-job-o" size="16" />
        {{ bookInfo.like }}人已点赞
      </div>
    </div>
    <!-- 评论 -->
    <div class="discussBlock">
      <Discuss></Discuss>
    </div>
    <div class="payBox" v-if="isFree">
      <div class="btn addBtn">加入书架</div>
      <div class="btn buyBtn">立即阅读</div>
    </div>
    <div class="payBox" v-else>
      <div class="btn redBtn">免费试读</div>
      <div class="btn buyBtn">立即购买</div>
    </div>
    <!-- 购买按钮占位 -->
    <div class="emptypayBox"></div>
  </div>
</template>

<script>
import Vue from "vue";
import Discuss from "@/components/discussArea.vue";
import { Tab, Tabs, Icon, Collapse, CollapseItem, Dialog } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dialog);
export default {
  name: "bookDetail",
  data() {
    return {
      //是否免费
      isFree: false,
      // tabActive
      tabActive: 0,
      // 书籍列表
      bookInfo: {
        icon: require("@/assets/images/book-img1.png"),
        title: "法国当代文学",
        author: "林崇德",
        price: "12.00",
        count: 10,
        desc:
          "《经济应用数学/高等职业教育“十三五”规划教材·经济管理专业系列》定位在为经济、管理专业服务上，强化经济应用信息，引导经济定量分析基本的思维、表达、交流和方法；对于教材内容的设计和知识体系的演绎，以经济专业需求为主导，改变“为讲数学而讲经济”的模式，紧扣操作性和应用性，集中了必需、够用的数学核心技术；融人建模思想，实施案例驱动，还原数学应用广泛的本色，让学生感到数学实实在在就在身边，而且是为他们掌握专业技能、步入职业生涯搭建的台阶，是他们搏击经济浪潮的强劲翅膀。一经典点拨，一节课轻松掌握全书重点知识。",
        catalogue: "目录内容",
        like: 1325
      },
      //商品信息
      productInfo: {
        contentValid: false
      },
      //课程列表
      activeNames: [0],
      resourceList: [
        {
          children: [],
          id: 6618,
          name: "第一讲 基础教育是国民教育的重中之重",
          items: [
            { id: 7616, title: "一、教育发展的新特点" },
            { id: 7618, title: "二、基础教育的定位" }
          ]
        },
        {
          children: [],
          id: 6618,
          name: "第一讲 基础教育是国民教育的重中之重",
          items: [{ id: 7616, title: "一、教育发展的新特点" }]
        }
      ]
    };
  },
  created() {},
  methods: {
    //到视频详情
    goDetail(itemData, folderItem, index) {
      var that = this;
      if (itemData.freeFile) {
        that.$router.push({
          path: "/videoPlay",
          query: {
            pageTitle: that.title,
            parentName: folderItem.name,
            title: itemData.title,
            md5: itemData.freeFile,
            folderId: folderItem.id,
            id: itemData.id,
            index: index,
            img: itemData.icon,
            productId: that.productInfo.id
          }
        });
      } else {
        if (!that.productInfo.contentValid) {
          Dialog.alert({
            title: "提示",
            message: "请先购买后查看！"
          }).then(() => {});
          return false;
        }
      }
    }
  },
  components: {
    Discuss
  }
};
</script>
<style scoped>
.bookDetailBox {
  padding-bottom: 98px;
  box-sizing: border-box;
}
/* 书籍信息 */
.detailInfoBox {
  padding: 15px 20px;
}
.classList {
  display: flex;
  justify-content: flex-start;
}
.classList .imgBox {
  position: relative;
  margin-right: 50px;
}
.classList .imgBox img {
  width: 215px;
  height: 300px;
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
/* tab */
.tabInfoBox >>> .van-tabs__nav--line {
  display: flex;
  justify-content: center;
}
.tabInfoBox >>> .van-tabs__line {
  width: 180px;
}
.tabInfoBox >>> .van-tab {
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-size: 26px;
}
.tabContent {
  font-size: 26px;
  line-height: 50px;
  padding: 30px 35px;
}
/* 点赞 */
.likeBox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 0;
}
.likeBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
  height: 60px;
  color: #999;
  border: 1px solid #999;
  border-radius: 20px;
}
.likeIcon {
  margin-right: 8px;
}
/* 购买相关按钮 */
.payBox {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 98px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payBox .btn {
  width: 50%;
  text-align: center;
  line-height: 98px;
  color: #ffffff;
  font-size: 28px;
}
.payBox .redBtn {
  background: #3c85ff;
}
.payBox .buyBtn {
  background: #f24b3b;
}
.payBox .addBtn {
  color: #333;
  background: #fff;
  border-top: 1px solid #ddd;
}
.emptypayBox {
  position: relative;
  width: 100%;
  height: 98px;
}
/* 评论盒子 */
.discussBlock {
  padding: 10px 20px;
}
/* 课程列表 */
.booklist p {
  color: #666666;
  padding-left: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #efefef;
  display: flex;
}
.itemContent {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.booklist:last-child p {
  margin: 0;
  /* border-bottom: none; */
}
.nullBox {
  font-size: 28px;
  color: #a6a6a6;
  text-align: center;
  padding: 20px 0;
}
.tryMsg,
.buyMsg {
  display: inline-block;
  width: 100px;
  text-align: center;
}
.tryMsg {
  color: #409eff;
}
.buyMsg {
  color: #f56c6c;
}
</style>
