<template>
  <div>
    <div class="wrap">
      <!-- 搜索 -->
      <div class="searchBox">
        <van-search
          placeholder="请输入要搜索的图书"
          @click="toSearch"
          style="width:100%;"
          shape="round"
        />
      </div>
      <!-- 轮播图 -->
      <div class="bannerBox">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="white"
          height="150"
        >
          <van-swipe-item v-for="(item, index) in bannerList" :key="index">
            <img class="bannerImg" :src="item" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 菜单 -->
      <div class="menuBox">
        <div class="menuList">
          <div class="menuBtn" @click="toShellList">
            <img src="@/assets/images/menu-icon1.png" alt="" />
            <span>高等教育</span>
          </div>
          <div class="menuBtn" @click="toShellList">
            <img src="@/assets/images/menu-icon2.png" alt="" />
            <span>京师职教</span>
          </div>
          <div class="menuBtn" @click="toShellList">
            <img src="@/assets/images/menu-icon3.png" alt="" />
            <span>科技经营</span>
          </div>
          <div class="menuBtn" @click="toShellList">
            <img src="@/assets/images/menu-icon4.png" alt="" />
            <span>教师教育</span>
          </div>
          <div class="menuBtn" @click="toShellList">
            <img src="@/assets/images/menu-icon5.png" alt="" />
            <span>京师普教</span>
          </div>
          <div class="menuBtn" @click="toShellList">
            <img src="@/assets/images/menu-icon6.png" alt="" />
            <span>京师学前</span>
          </div>
          <div class="menuBtn" @click="toShellList">
            <img src="@/assets/images/menu-icon7.png" alt="" />
            <span>主题出版</span>
          </div>
          <div class="menuBtn">
            <img src="@/assets/images/menu-icon8.png" alt="" />
            <span>免费专区</span>
          </div>
          <div class="menuBtn" @click="toMenuList">
            <img src="@/assets/images/menu-icon9.png" alt="" />
            <span>京师青课</span>
          </div>
          <div class="menuBtn" @click="toMenu">
            <img src="@/assets/images/menu-icon10.png" alt="" />
            <span>全部分类</span>
          </div>
        </div>
      </div>
      <!-- 限时特惠 -->
      <div class="limitSaleBox">
        <div class="titleBox">
          <div class="txt">限时特惠</div>
          <div class="countDownBox">
            <van-count-down :time="time">
              <template #default="timeData">
                <div class="countDownWrap">
                  <span class="countTxt">距结束 :</span>
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                  <div class="limitMore" @click="toBookList">></div>
                </div>
              </template>
            </van-count-down>
          </div>
        </div>
        <div class="limtContentBox">
          <div
            class="limitSaleList"
            v-for="(item, index) in limitSaleList"
            :key="index"
          >
            <div class="limitSaleItem" @click="toDetail">
              <div class="imgBox">
                <div class="iconBox">
                  <img :src="item.icon" alt="" />
                  <div class="priceBox">
                    <span class="price">¥{{ item.prcie }}</span>
                    <s class="oldPrice">¥{{ item.oldPrice }}</s>
                  </div>
                </div>
                <span class="txt">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spline"></div>
    <div class="wrap">
      <div class="newBookbox">
        <div class="titleBox">
          <div class="txt">新书速递</div>
          <div class="more" @click="toBookList">更多 ></div>
        </div>
        <div class="limtContentBox newBookContentBox">
          <div
            class="limitSaleList"
            v-for="(item, index) in newBookList"
            :key="index"
            @click="toDetail"
          >
            <div class="limitSaleItem">
              <div class="imgBox">
                <div class="iconBox">
                  <img :src="item.icon" alt="" />
                  <div class="priceBox">
                    <span class="price">¥{{ item.prcie }}</span>
                    <!-- <s>¥{{ item.oldPrice }}</s> -->
                  </div>
                </div>
                <span class="txt">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap rankWrap">
      <!-- 一周人气 -->
      <div class="rankScrollBox">
        <div class="rankBox">
          <div class="rankTitle">
            <img src="@/assets/images/rank-bg1.png" alt="" />
            <div class="more" @click="toBookList">更多 ></div>
          </div>
          <div class="rankList">
            <div
              class="rankItem"
              v-for="(item, index) in rankList"
              :key="index"
              @click="toDetail"
            >
              <div class="imgBox">
                <img class="bookImg" :src="item.icon" alt="" />
                <div class="tips">
                  <span class="tipsNum">{{ index + 1 }}</span>
                  <img
                    v-if="index < 3"
                    class="tipImg"
                    src="@/assets/images/rank-tip1.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="tipImg"
                    src="@/assets/images/rank-tip2.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="txtBox">
                <div class="title">{{ item.title }}</div>
                <div class="count">{{ item.count }}人浏览</div>
              </div>
            </div>
          </div>
        </div>
        <div class="rankBox">
          <div class="rankTitle">
            <img src="@/assets/images/rank-bg1.png" alt="" />
            <div class="more" @click="toBookList">更多 ></div>
          </div>
          <div class="rankList">
            <div
              class="rankItem"
              v-for="(item, index) in rankList"
              :key="index"
              @click="toDetail"
            >
              <div class="imgBox">
                <img class="bookImg" :src="item.icon" alt="" />
                <div class="tips">
                  <span class="tipsNum">{{ index + 1 }}</span>
                  <img
                    v-if="index < 3"
                    class="tipImg"
                    src="@/assets/images/rank-tip1.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="tipImg"
                    src="@/assets/images/rank-tip2.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="txtBox">
                <div class="title">{{ item.title }}</div>
                <div class="count">{{ item.count }}人浏览</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="newBookbox">
        <div class="titleBox">
          <div class="txt">主编推荐</div>
          <div class="more" @click="toBookList">更多 ></div>
        </div>
        <div class="limtContentBox newBookContentBox">
          <div
            class="limitSaleList"
            v-for="(item, index) in recommendList"
            :key="index"
            @click="toDetail"
          >
            <div class="limitSaleItem">
              <div class="imgBox">
                <div class="iconBox">
                  <img :src="item.icon" alt="" />
                  <div class="priceBox">
                    <span class="price">¥{{ item.prcie }}</span>
                  </div>
                </div>
                <span class="txt">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap rankWrap">
      <!-- game测试 -->
      <div class="rankScrollBox gameScroolBox">
        <div class="gameBtn">
          <img src="@/assets/images/game-btn1.png" alt="" />
        </div>
        <div class="gameBtn">
          <img src="@/assets/images/game-btn2.png" alt="" />
        </div>
        <div class="gameBtn">
          <img src="@/assets/images/game-btn1.png" alt="" />
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="newBookbox">
        <div class="titleBox">
          <div class="txt">精选书单</div>
          <div class="more" @click="toBookList">更多 ></div>
        </div>
        <div class="choiceBookContentBox">
          <div
            class="choiceList"
            v-for="(item, index) in choiceList"
            :key="index"
            @click="toBookList"
          >
            <div class="txtBox">
              <p class="title">{{ item.title }}</p>
              <p class="desc">{{ item.desc }}</p>
              <p class="num">{{ item.num }}本</p>
            </div>
            <div class="imgBox">
              <div class="iconBox">
                <img :src="item.icon" alt="" />
                <div class="priceBox">
                  <span class="price">{{ item.classify }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spline"></div>
    <div class="wrap">
      <div class="newBookbox">
        <div class="titleBox">
          <div class="txt">畅销书籍</div>
          <div class="more" @click="toBookList">更多 ></div>
        </div>
        <div class="limtContentBox newBookContentBox">
          <div
            class="limitSaleList"
            v-for="(item, index) in recommendList"
            :key="index"
            @click="toDetail"
          >
            <div class="limitSaleItem">
              <div class="imgBox">
                <div class="iconBox">
                  <img :src="item.icon" alt="" />
                  <div class="priceBox">
                    <span class="price">¥{{ item.prcie }}</span>
                  </div>
                </div>
                <span class="txt">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spline"></div>
    <div class="wrap">
      <div class="newBookbox">
        <div class="titleBox">
          <div class="txt">热门青课</div>
          <div class="more" @click="toHotList">更多 ></div>
        </div>
        <div class="classContentBox">
          <van-tabs v-model="classActive" title-active-color="#F24B3B">
            <van-tab title="视频">
              <div
                class="classList"
                v-for="(item, index) in classList"
                :key="index"
                @click="toReDetail"
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
            </van-tab>
            <van-tab title="音频">
              <div
                class="classList"
                v-for="(item, index) in classList"
                :key="index"
                @click="toReDetail"
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
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <Tabbar :idx="0"></Tabbar>
    <!-- 新人礼 -->
    <van-overlay class="giftBox" :show="giftShow" @click.stop>
      <div class="giftContent">
        <div class="giftBg" :style="giftBg">
          <div class="colseBtn" @click.stop="closeGift">
            <img src="@/assets/images/gift-close.png" alt="" />
          </div>
          <div class="couponListBox">
            <div
              class="couponList"
              v-for="(item, index) in couponList"
              :key="index"
            >
              <div class="priceInfo">
                <div class="couponPrice">
                  ¥<span>{{ item.price }}</span>
                </div>
                <div class="condition">
                  满{{ item.condition }}减{{ item.price }}
                </div>
              </div>
              <div class="couponType">
                <span>{{ item.type }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="getBtnBox">
          <span class="getBtn">立即领取</span>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from "vue";
import Tabbar from "@/components/tabBar.vue";
import { Search, Swipe, SwipeItem, CountDown, Tab, Tabs, Overlay } from "vant";
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(CountDown);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Overlay);
export default {
  name: "index",
  data() {
    return {
      //新人礼弹层
      giftShow: true,
      //新人礼背景
      giftBg: {
        backgroundImage: "url(" + require("@/assets/images/gift-bg.png") + ")"
      },
      // 热门青课active
      classActive: 0,
      // 轮播图数组
      bannerList: [
        require("@/assets/images/banner-img1.png"),
        require("@/assets/images/banner-img1.png"),
        require("@/assets/images/banner-img1.png")
      ],
      // 倒计时时间
      time: 30 * 60 * 60 * 1000,
      // 限时特惠数组
      limitSaleList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "运营管理",
          prcie: "12.00",
          oldPrice: "16.00"
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          prcie: "22.00",
          oldPrice: "30.00"
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "经济应用数学",
          prcie: "15.00",
          oldPrice: "18.00"
        }
      ],
      // 新书速递数组
      newBookList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "运营管理",
          prcie: "12.00",
          oldPrice: "16.00"
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          prcie: "22.00",
          oldPrice: "30.00"
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "经济应用数学",
          prcie: "15.00",
          oldPrice: "18.00"
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          prcie: "22.00",
          oldPrice: "30.00"
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "经济应用数学",
          prcie: "15.00",
          oldPrice: "18.00"
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          prcie: "22.00",
          oldPrice: "30.00"
        }
      ],
      // 人气榜数组
      rankList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "运营管理",
          count: 15
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          count: 10
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "经济应用数学",
          count: 10
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          count: 10
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "经济应用数学",
          count: 10
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          count: 10
        }
      ],
      // 主编推荐数组
      recommendList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "运营管理",
          prcie: "12.00"
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "出纳实务",
          prcie: "22.00"
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "经济应用数学",
          prcie: "15.00"
        }
      ],
      // 精选书单
      choiceList: [
        {
          icon: require("@/assets/images/book-img1.png"),
          title: "科技经管类系列书籍",
          desc: "简介文字简介文字简介文字简介文字",
          classify: "科技经管",
          num: 7
        },
        {
          icon: require("@/assets/images/book-img2.png"),
          title: "科技经管类系列书籍",
          desc: "简介文字简介文字简介文字简介文字",
          classify: "科技经管",
          num: 3
        },
        {
          icon: require("@/assets/images/book-img3.png"),
          title: "科技经管类系列书籍",
          desc: "简介文字简介文字简介文字简介文字",
          classify: "科技经管",
          num: 10
        }
      ],
      // 热门青课
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
      ],
      // 优惠券列表
      couponList: [
        {
          id: 1,
          price: 50,
          condition: 268,
          startDate: "2019-03-03",
          endDate: "2019-03-31",
          type: "新人专享"
        },
        {
          id: 2,
          price: 50,
          condition: 268,
          startDate: "2019-03-03",
          endDate: "2019-03-31",
          type: "新人专享"
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
    //到青课列表页面
    toMenuList() {
      this.$router.push({
        path: "/menuList"
      });
    },
    //到热门列表页面
    toHotList() {
      this.$router.push({
        path: "/hotList"
      });
    },
    //到书籍列表页面
    toBookList() {
      this.$router.push({
        path: "/bookList"
      });
    },
    //到书架列表页面
    toShellList() {
      this.$router.push({
        path: "/shellList"
      });
    },
    //到全部分类页面
    toMenu() {
      this.$router.push({
        path: "/menu"
      });
    },
    //到搜索页面
    toSearch() {
      this.$router.push({
        path: "/searchPage/search"
      });
    },
    // 关闭新人礼弹层
    closeGift() {
      this.giftShow = false;
    }
  },
  components: {
    Tabbar
  }
};
</script>
<style scoped>
/* 轮播图 */
.bannerImg {
  width: 100%;
  height: 100%;
}
/* 菜单 */
.menuList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 45px;
}
.menuBtn {
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 45px;
}
.menuBtn img {
  width: 56px;
  height: 56px;
}
.menuBtn span {
  font-size: 22px;
  color: #666;
  margin-top: 20px;
}
/* 限时特惠 */
.limitSaleBox {
  background: linear-gradient(to bottom, #fe4343, #ffffff);
  border: 1px solid #eeeeee;
  border-radius: 12px;
}
.titleBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  border-bottom: 1px solid #e44d5b;
}
.titleBox .txt {
  font-size: 36px;
  color: #ffffff;
  font-weight: bold;
}
.limitMore {
  padding: 0 5px;
  color: #ffffff;
}
/* 倒计时 */
.countDownWrap {
  display: flex;
  align-items: center;
}
.limitSaleBox .countTxt {
  margin-right: 10px;
  color: #ffffff;
}
.limitSaleBox >>> .colon {
  display: inline-block;
  margin: 0 8px;
  color: #ffffff;
}
.limitSaleBox >>> .block {
  display: inline-block;
  width: 40px;
  color: #ee0a24;
  font-size: 24px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 6px;
}
/* 特惠列表 */
.limtContentBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
}
.limitSaleItem .imgBox {
  display: flex;
  flex-direction: column;
}
.limitSaleItem .imgBox .txt {
  display: inline-block;
  margin-top: 8px;
  color: #333333;
}
.limitSaleItem .imgBox img {
  width: 195px;
  height: 280px;
  border-radius: 8px;
  box-shadow: #aba8a8 2px 4px 6px 0px;
}
.iconBox {
  position: relative;
}
.iconBox .priceBox {
  position: absolute;
  left: 15px;
  bottom: 15px;
  color: #ffffff;
  background: rgba(255, 0, 44, 0.7);
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
}
.iconBox .priceBox .price {
  font-size: 24px;
  margin-right: 5px;
}
.iconBox .priceBox .oldPrice {
  font-size: 18px;
}
/* 新书速递 */
.newBookbox .titleBox {
  border-color: #dddddd;
}
.newBookbox .titleBox .txt {
  color: #333333;
}
.newBookbox .titleBox .more {
  color: #999999;
}
.newBookContentBox {
  flex-wrap: wrap;
  padding: 25px 0;
}
.newBookContentBox .limitSaleList {
  margin-bottom: 40px;
}
.newBookContentBox .limitSaleItem .imgBox img {
  width: 210px;
  height: 285px;
}
.newBookContentBox .iconBox .priceBox {
  color: #ffffff;
  background: rgba(0, 0, 0, 0.7);
}
/* 人气榜 */
.rankWrap {
  width: 100%;
  overflow-y: scroll;
  background: #f5f5f5;
  padding: 30px 15px;
  box-sizing: border-box;
}
.rankBox {
  width: 610px;
  margin-right: 30px;
}
.rankBox .rankTitle {
  position: relative;
  width: 100%;
}
.rankBox .rankTitle img {
  width: 100%;
}
.rankBox .rankTitle .more {
  position: absolute;
  top: 36px;
  right: 15px;
  color: #ffffff;
  z-index: 1;
}
.rankList {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  background: #ffffff;
  height: 480px;
  padding: 20px 20px 10px 20px;
}
.rankItem {
  display: flex;
  justify-content: space-between;
  width: 300px;
  overflow: hidden;
  margin-bottom: 10px;
}
.rankItem .imgBox {
  position: relative;
  width: 100px;
  margin-right: 10px;
}
.rankItem .bookImg {
  width: 100px;
  height: 140px;
  border-radius: 5px;
}
.rankItem .tips {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 36px;
  line-height: 34px;
  text-align: center;
  z-index: 1;
}
.rankItem .tips .tipImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 36px;
  z-index: 1;
}
.rankItem .tips .tipsNum {
  position: relative;
  color: #ffffff;
  z-index: 2;
}
.rankItem .txtBox {
  position: relative;
  flex: 1;
}
.rankItem .txtBox .count {
  position: absolute;
  left: 0;
  bottom: 2px;
  z-index: 1;
  color: #999;
}
.rankScrollBox {
  display: flex;
  width: 1300px;
}
/* 手机测试 */
.gameBtn img {
  width: 340px;
  height: 170px;
}
.gameScroolBox {
  width: 1050px;
}
/* 精选书单 */
.choiceList {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.choiceList .imgBox img {
  width: 175px;
  height: 240px;
  border-radius: 6px;
}
.choiceBookContentBox .iconBox .priceBox {
  color: #ffffff;
  background: rgba(0, 0, 0, 0.7);
}
.choiceList p.title {
  font-size: 30px;
  font-weight: bold;
  color: #333333;
}
.choiceList p.desc {
  color: #999999;
  margin-top: 25px;
}
.choiceList p.num {
  color: #333333;
  margin-top: 25px;
}
/* 热门青课 */
.classContentBox >>> .van-tab {
  flex: none;
  width: 150px;
  font-size: 26px;
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
/* 新人礼 */
.giftContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.giftBg {
  position: relative;
  width: 530px;
  height: 690px;
  background-size: cover;
}
.couponListBox {
  position: absolute;
  width: 100%;
  top: 360px;
  padding: 0 85px 0 110px;
  box-sizing: border-box;
}
.couponList {
  display: flex;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 15px;
}
.priceInfo {
  flex: 1;
  height: 130px;
  background: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
}
.couponPrice {
  color: #f24b3b;
  font-size: 30px;
}
.couponPrice span {
  font-size: 50px;
  margin-left: 5px;
}
.couponType {
  width: 65px;
  height: 130px;
  line-height: 29px;
  background: #f24b3b;
  padding: 10px 20px;
  box-sizing: border-box;
}
.couponType span {
  color: #fff;
}
.getBtnBox {
  margin-top: 40px;
  text-align: center;
}
.getBtn {
  display: inline-block;
  width: 294px;
  height: 68px;
  line-height: 68px;
  text-align: center;
  font-size: 26px;
  color: #fff;
  background: linear-gradient(to bottom, #fcc32d, #f65138);
  border-radius: 34px;
}
.colseBtn {
  position: absolute;
  top: -26px;
  right: -26px;
  width: 56px;
  height: 56px;
}
.colseBtn img {
  width: 100%;
  height: 100%;
}
</style>
