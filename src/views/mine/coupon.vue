<template>
  <div class="wrap">
    <div class="schoolRoomBox">
      <van-tabs v-model="tabActive" title-active-color="#F24B3B">
        <van-tab title="未使用">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="couponListBox">
                <div
                  class="couponList"
                  v-for="(item, index) in couponList"
                  :key="index"
                >
                  <div
                    :class="
                      item.type == '新人专享'
                        ? 'couponInfo'
                        : 'couponInfo yellowBg'
                    "
                  >
                    <div
                      :class="
                        item.type == '新人专享'
                          ? 'priceBox'
                          : 'priceBox yellowBor'
                      "
                    >
                      <div class="price">
                        <span>¥</span>
                        <span class="priceFont">{{ item.price }}</span>
                      </div>
                      <div class="couponType">
                        <span>{{ item.type }}</span>
                      </div>
                    </div>
                    <div
                      :class="
                        item.type == '新人专享'
                          ? 'conditionBox'
                          : 'conditionBox yellow'
                      "
                    >
                      <div class="condition">
                        满{{ item.condition }}减{{ item.price }}
                      </div>
                      <div class="time">
                        {{ item.startDate }} - {{ item.endDate }}
                      </div>
                    </div>
                    <div class="btnBox">
                      <span
                        :class="
                          item.type == '新人专享' ? 'getBtn' : 'getBtn yellow'
                        "
                        >立即使用</span
                      >
                    </div>
                  </div>
                  <div class="txtInfo">
                    <van-collapse class="txtList" v-model="item.id" accordion>
                      <van-collapse-item
                        title="全部商品可用，不可抵扣运费，仅原价购买可用"
                      >
                        <p>1.本券在北京师范大学出版集团通用平台下都可使用</p>
                        <p>2.不兑换现金、不找零，不与其他优惠同时使用；</p>
                        <p>3.本优惠劵最终解释权归北京师范大学出版集团所有。</p>
                      </van-collapse-item>
                    </van-collapse>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已使用">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="couponListBox">
                <div
                  class="couponList"
                  v-for="(item, index) in couponList"
                  :key="index"
                >
                  <div class="couponInfo">
                    <div class="priceBox">
                      <div class="price">
                        <span>¥</span>
                        <span class="priceFont">{{ item.price }}</span>
                      </div>
                      <div class="couponType">
                        <span>{{ item.type }}</span>
                      </div>
                    </div>
                    <div class="conditionBox">
                      <div class="condition">
                        满{{ item.condition }}减{{ item.price }}
                      </div>
                      <div class="time">
                        {{ item.startDate }} - {{ item.endDate }}
                      </div>
                    </div>
                    <div class="btnBox">
                      <span class="getBtn">立即使用</span>
                    </div>
                  </div>
                  <div class="txtInfo">
                    <van-collapse class="txtList" v-model="item.id" accordion>
                      <van-collapse-item
                        title="全部商品可用，不可抵扣运费，仅原价购买可用"
                      >
                        <p>1.本券在北京师范大学出版集团通用平台下都可使用</p>
                        <p>2.不兑换现金、不找零，不与其他优惠同时使用；</p>
                        <p>3.本优惠劵最终解释权归北京师范大学出版集团所有。</p>
                      </van-collapse-item>
                    </van-collapse>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已失效">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="couponListBox">
                <div
                  class="couponList"
                  v-for="(item, index) in couponList"
                  :key="index"
                >
                  <div class="couponInfo">
                    <div class="priceBox">
                      <div class="price">
                        <span>¥</span>
                        <span class="priceFont">{{ item.price }}</span>
                      </div>
                      <div class="couponType">
                        <span>{{ item.type }}</span>
                      </div>
                    </div>
                    <div class="conditionBox">
                      <div class="condition">
                        满{{ item.condition }}减{{ item.price }}
                      </div>
                      <div class="time">
                        {{ item.startDate }} - {{ item.endDate }}
                      </div>
                    </div>
                    <div class="btnBox">
                      <span class="getBtn">立即使用</span>
                    </div>
                  </div>
                  <div class="txtInfo">
                    <van-collapse class="txtList" v-model="item.id" accordion>
                      <van-collapse-item
                        title="全部商品可用，不可抵扣运费，仅原价购买可用"
                      >
                        <p>1.本券在北京师范大学出版集团通用平台下都可使用</p>
                        <p>2.不兑换现金、不找零，不与其他优惠同时使用；</p>
                        <p>3.本优惠劵最终解释权归北京师范大学出版集团所有。</p>
                      </van-collapse-item>
                    </van-collapse>
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
import Tabbar from "@/components/tabBar.vue";
// eslint-disable-next-line
import { Tab, Tabs, List, PullRefresh, Collapse, CollapseItem } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Collapse);
Vue.use(CollapseItem);
export default {
  name: "mineCoupon",
  data() {
    return {
      //分页
      loading: false,
      finished: true,
      refreshing: false,
      // tabActive
      tabActive: 0,
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
          type: "全场通用"
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

        if (this.couponList.length >= 2) {
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
/* 优惠券列表 */
.couponList {
  margin-top: 18px;
  padding: 0 30px;
}
.couponInfo {
  display: flex;
  align-content: center;
  justify-content: space-between;
  background: #ffc8c8;
  border-radius: 12px 12px 0 0;
  padding: 30px;
}
.priceBox {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #cd1e21;
  border-right: 1px dashed #cd1e21;
  padding: 5px 30px 0 0;
}
.priceFont {
  font-size: 40px;
  margin-left: 6px;
}
.conditionBox {
  display: flex;
  flex-direction: column;
  padding: 10px 30px 10px 0;
  color: #cd1e21;
}
.couponType {
  margin-top: 3px;
}
.condition {
  font-size: 28px;
  margin-bottom: 10px;
}
.btnBox {
  display: flex;
  align-items: center;
}
.getBtn {
  color: #cd1e21;
  background: #fff;
  padding: 10px 20px;
  border-radius: 6px;
}
.txtInfo {
  box-shadow: #e6e3e3 1px 1px 5px 0px;
}
.txtList >>> .van-cell {
  color: #808080;
}
.txtList p {
  padding-bottom: 15px;
}
.couponInfo.yellowBg {
  background: #f9ebd3;
}
.priceBox.yellowBor {
  color: #d78003;
  border-right: 1px dashed #d78003;
}
.conditionBox.yellow,
.getBtn.yellow {
  color: #d78003;
}
</style>
