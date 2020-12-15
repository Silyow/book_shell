<template>
  <div class="resourceDetailBox">
    <div class="titleBox">
      听林崇德老师讲基础教育
    </div>
    <div class="content" v-if="!loading">
      <img
        class="content-photo"
        src="@/assets/images/resource-img.png"
        alt=""
      />
      <div class="bookMessage">
        <p class="name">听林崇德老师讲基础教育</p>
        <div class="viewCount">
          <div class="priceBox">
            ¥<span class="price">320.00</span>
            <s class="oldPrice">
              (原价: 420.00)
            </s>
          </div>
          <span>2345次学习</span>
        </div>
      </div>
    </div>
    <div class="spline"></div>
    <div class="tabInfoBox">
      <van-tabs v-model="tabActive" title-active-color="#F24B3B">
        <van-tab title="主讲人简介" style="border-right:1px solid #ddd;">
          <div
            class="teacherIntroduction"
            v-if="resourceInfo.teacherInfo"
            v-html="resourceInfo.teacherInfo"
          ></div>
          <!-- <div v-else class="nullBox">暂无数据</div> -->
        </van-tab>
        <van-tab title="课程简介" style="border-right:1px solid #ddd;">
          <div
            class="courseIntroduction"
            v-if="resourceInfo.courseInfo"
            v-html="resourceInfo.courseInfo"
          ></div>
          <div v-else class="nullBox">暂无数据</div>
        </van-tab>
        <van-tab title="课程列表">
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
        </van-tab>
      </van-tabs>
    </div>
    <!-- 点赞 -->
    <div class="likeBox">
      <div class="likeBtn">
        <van-icon class="likeIcon" name="good-job-o" size="16" />
        {{ likeNum }}人已点赞
      </div>
    </div>
    <!-- 评论 -->
    <div class="discussBlock">
      <Discuss></Discuss>
    </div>
    <!-- 赞赏 -->
    <div class="rewardBox">
      <div class="rewardBtnBox">
        <div class="rewardBtn" @click="toReward">赞赏</div>
      </div>
      <div class="rewardInfo">
        <div class="count">1325<span style="color:#999;">人已赞赏</span></div>
        <div class="avatarBox">
          <div class="avatar">
            <img src="@/assets/images/discuss-avatar.png" alt="" />
          </div>
          <div class="avatar">
            <img src="@/assets/images/discuss-avatar.png" alt="" />
          </div>
          <div class="avatar">
            <img src="@/assets/images/discuss-avatar.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 赞赏弹层 -->
    <van-dialog
      class="rewardDoalog"
      v-model="showReward"
      title="赞赏"
      :show-cancel-button="false"
      :showConfirmButton="false"
    >
      <span class="closeBtn" @click.stop="closeReward">
        <van-icon name="cross" size="24" />
      </span>
      <div class="rewardPirceBox">
        <span
          v-for="(item, index) in rewardPirceList"
          :class="index == priceIndex ? 'priceBtn on' : 'priceBtn'"
          :key="index"
          @click="selectPrice(index)"
          >{{ item }} 元</span
        >
      </div>
      <div class="wxBtnBox">
        <div class="payBtn">
          微信支付
        </div>
      </div>
    </van-dialog>
    <!-- 购买 -->
    <div class="payBox" @click="toPay" v-if="!productInfo.contentValid">
      <div class="btn buyBtn">立即购买</div>
    </div>
    <!-- 支付弹层 -->
    <van-dialog
      class="payDoalog"
      v-model="showPay"
      title="请选择支付方式"
      :show-cancel-button="false"
      :showConfirmButton="false"
    >
      <span class="closeBtn" @click.stop="closePay">
        <van-icon name="cross" size="24" />
      </span>
      <div class="selectPayBox">
        <div class="wxWay" @click="selectPayWay">
          <p>微信支付</p>
          <div :class="payWx ? 'tipIconBox on' : 'tipIconBox'">
            <span class="tipIcon"></span>
          </div>
        </div>
        <div class="codeWayBox">
          <div class="codeWay" @click="selectPayWay">
            <p>激活码</p>
            <div :class="payWx ? 'tipIconBox' : 'tipIconBox on'">
              <span class="tipIcon"></span>
            </div>
          </div>
          <input
            v-if="!payWx"
            class="codeTxt"
            type="text"
            placeholder="请输入激活码"
          />
        </div>
        <div class="payBtnBox">
          <div class="payBtn">
            确定
          </div>
        </div>
      </div>
    </van-dialog>
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
  name: "resourceDetail",
  data() {
    return {
      loading: false,
      // tabActive
      tabActive: 0,
      //商品信息
      productInfo: {
        id: 6615,
        contentValid: false
      },
      //点赞数
      likeNum: 1352,
      //课程信息
      resourceInfo: {
        //主讲人简介
        teacherInfo:
          "林崇德，1941年生，中共党员，浙江象山县人。现任北京师范大学资深教授，教育部社会科学委员会委员兼教育学·心理学学部召集人。曾任中国心理学会理事长，国务院学位委员会学科评议组成员等重要学术职务。他始终坚持辩证唯物主义为指导思想，坚持走心理学研究中国化道路。荣获“国家有突出贡献中青年专家”“全国劳动模范”“全国十佳师德标兵”“全国师德模范教师”“国家杰出专业技术人才”“北京市人民教师奖”等称号，并入选首届“当代教育名家”。",
        //课程简介
        courseInfo: "课程简介"
      },
      //课程列表
      activeNames: [0],
      //标题
      pageTitle: "听林崇德老师讲基础教育",
      resourceList: [
        {
          children: [],
          id: 6618,
          name: "第一讲 基础教育是国民教育的重中之重",
          items: [
            // eslint-disable-next-line
            { id: 7616, title: "一、教育发展的新特点",freeFile: "8f05b523f399aa2b1e2f12f328c69e06", icon: "7a0ed174eedc26becaa20c5a5db1bc29.JPG", type: "视频" },
            { id: 7618, title: "二、基础教育的定位", type: "音频" }
          ]
        },
        {
          children: [],
          id: 6618,
          name: "第一讲 基础教育是国民教育的重中之重",
          // eslint-disable-next-line
          items: [{ id: 7616, title: "一、教育发展的新特点", freeFile: "8f05b523f399aa2b1e2f12f328c69e06", type: "音频" }]
        }
      ],
      // 赞赏弹层
      showReward: false,
      //赞赏价格
      rewardPirceList: [1, 2, 3, 5, 10, 20],
      // 选中价格
      priceIndex: 0,
      //立即购买
      showPay: false,
      // 购买支付方式
      payWx: true
    };
  },
  methods: {
    //到视频详情
    goDetail(itemData, folderItem, index) {
      var that = this;
      if (itemData.freeFile) {
        if (itemData.type == "视频") {
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
        } else if (itemData.type == "音频") {
          this.$router.push({
            path: "/audioPlay",
            query: {
              pageTitle: that.title,
              floderId: itemData.parentId,
              audioId: itemData.id,
              audioImg: itemData.icon,
              audioTitle: itemData.title,
              index: index
            }
          });
        }
      } else {
        if (!that.productInfo.contentValid) {
          Dialog.alert({
            title: "提示",
            message: "请先购买后查看！"
          }).then(() => {});
          return false;
        }
        // that
        //   .axios({
        //     method: "post",
        //     url: "/api/cms/getById",
        //     data: {
        //       itemId: itemData.id,
        //       appId: that.appId,
        //     },
        //   })
        //   .then(function(response) {
        //     var resources = "";
        //     for (let i = 0; i < response.result.datas.length; i++) {
        //       if (response.result.datas[i].fieldName == "free") {
        //         resources = response.result.datas[i].fileValue;
        //       }
        //     }
        //     that.$router.push({
        //       path: "/videoPlay",
        //       query: {
        //         pageTitle: that.title,
        //         parentName: folderItem.name,
        //         title: response.result.title,
        //         md5: resources,
        //         folderId: folderItem.id,
        //         id: response.result.id,
        //         index: index,
        //         img: response.result.icon,
        //         productId: that.productInfo.id,
        //       },
        //     });
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
      }
    },
    // 立即购买按钮
    toPay() {
      this.showPay = true;
    },
    // 关闭购买弹层
    closePay() {
      this.showPay = false;
    },
    // 选择支付方式
    selectPayWay() {
      this.payWx = !this.payWx;
    },
    // 赞赏
    toReward() {
      this.showReward = true;
    },
    //关闭赞赏弹层
    closeReward() {
      this.showReward = false;
    },
    // 选择赞赏金额
    selectPrice(index) {
      this.priceIndex = index;
    }
  },
  components: {
    Discuss
  }
};
</script>
<style scoped>
.titleBox {
  font-size: 34px;
  text-align: center;
  padding: 23px 20px;
  background: #f3f3f3;
}
/* 资源详情 */
.content-photo {
  width: 100%;
  height: auto;
}
.bookMessage {
  padding: 20px;
}
.name {
  font-size: 28px;
  font-weight: 600;
}
.viewCount {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: #999999;
}
.priceBox {
  color: #e4393c;
}
.price {
  font-size: 40px;
  margin-left: 6px;
  margin-right: 20px;
}
.oldPrice {
  color: #999999;
}
/* 主讲人，课程简介 */
.teacherIntroduction,
.courseIntroduction {
  padding: 20px;
  font-size: 26px;
  line-height: 46px;
}
.teacherIntroduction img,
.courseIntroduction img {
  width: 100%;
  height: auto;
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
/* 评论盒子 */
.discussBlock {
  padding: 10px 20px;
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
  width: 100%;
  text-align: center;
  line-height: 98px;
  color: #ffffff;
  font-size: 28px;
}
.payBox .buyBtn {
  background: #f24b3b;
}
.emptypayBox {
  position: relative;
  width: 100%;
  height: 98px;
  z-index: -1;
}
/* 赞赏 */
.rewardBox {
  text-align: center;
}
.rewardInfo {
  margin-top: 20px;
}
.avatarBox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 560px;
  margin: 0 auto;
  margin-top: 20px;
}
.avatar {
  position: relative;
  width: 70px;
  height: 70px;
  margin-right: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.avatar img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
}
.rewardBtn {
  display: inline-block;
  width: 180px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: linear-gradient(45deg, #fcc32d, #ff735d);
  border-radius: 8px;
  color: #ffffff;
  font-size: 26px;
}
.rewardPirceBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  width: 500px;
}
.wxBtnBox {
  margin: 0 auto;
  width: 500px;
  padding: 40px 0;
}
.payBtn {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  color: #fff;
  font-size: 28px;
  background: #14b936;
  border-radius: 8px;
}
.priceBtn {
  display: inline-block;
  width: 150px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  box-sizing: border-box;
  border: 2px solid #dcdcdc;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 26px;
  color: #000;
}
.priceBtn.on {
  color: #f24b3b;
  border: 2px solid #f24b3b;
}
.rewardDoalog {
  border-radius: 10px;
}
.rewardDoalog >>> .van-dialog__header {
  font-size: 30px;
  font-weight: bold;
  padding: 25px;
}
.closeBtn {
  position: absolute;
  top: 18px;
  right: 15px;
}
/* 支付弹层 */
.payDoalog {
  padding: 50px;
  padding-top: 0;
  box-sizing: border-box;
  border-radius: 10px;
}
.payDoalog >>> .van-dialog__header {
  font-size: 30px;
  font-weight: bold;
  padding: 25px;
}
.selectPayBox {
  margin-top: 10px;
}
.wxWay {
  font-size: 28px;
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.codeWay {
  font-size: 28px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.codeTxt {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #eeeeee;
  border: none;
  box-sizing: border-box;
  padding: 0 15px;
  border-radius: 6px;
}
.payBtnBox {
  margin-top: 40px;
}
.payBtnBox .payBtn {
  padding: 0;
  height: 60px;
  line-height: 60px;
  background: #f24b3b;
}
/* 选择支付方式右边原型icon */
.tipIconBox {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #c8c7c7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tipIconBox.on {
  border: 1px solid #f24b3b;
}
.tipIcon {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
}
.tipIconBox.on .tipIcon {
  background: #f24b3b;
}
</style>
