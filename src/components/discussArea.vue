<template>
  <div class="discussBox">
    <div class="titleBox">
      <div class="txtBox"><span class="txt">评论</span>(66)</div>
      <span class="showWriteBtn" @click="showWrite()"
        ><img src="@/assets/images/icon-pencil.png" alt="" />写评论</span
      >
    </div>
    <div class="spline"></div>
    <!-- 评论列表 -->
    <div class="discussListBox">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="discussList"
          v-for="(item, index) in discussList"
          :key="index"
        >
          <div class="infoBox">
            <div class="avatar">
              <img :src="item.userIcon" alt="" />
            </div>
            <div class="discussInfo">
              <div class="topInfo">
                <div class="userNameBox">
                  <span class="userName">{{ item.userName }}</span>
                  <div class="istop" v-if="index == 0">置顶</div>
                </div>
                <div class="time">{{ item.time }}</div>
              </div>
              <div class="discussTxt">
                {{ item.discuss }}
              </div>
              <div class="replyBox" v-if="item.children">
                <div class="replyTop">
                  <div class="replyUser">{{ item.children.userName }}：</div>
                  <div class="replyTime">{{ item.children.time }}</div>
                </div>
                <div class="replyTxt">
                  {{ item.children.reply }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="writeShow" position="bottom" @close="clearDisTxt">
      <div class="writeBox">
        <textarea
          id="writeArea"
          placeholder="请评论"
          autofocus
          rows="3"
          v-model="discussWords"
        ></textarea>
        <div class="btnBox">
          <span class="cancleBtn" @click="cancle">取消</span>
          <span class="sendBtn" @click="send">发送</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, List, PullRefresh, Popup, Toast } from "vant";
Vue.use(Icon);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Toast);
export default {
  name: "discussArea",
  data() {
    return {
      //分页
      loading: false,
      finished: true,
      //当前评论文本
      discussWords: "",
      //评论弹出层
      writeShow: false,
      // 评论列表
      discussList: [
        {
          userIcon: require("@/assets/images/discuss-avatar.png"),
          userName: "用户名",
          discuss:
            "这本这本书不错，非常喜欢！这本书不错，非常喜欢！书不错，非常喜欢！",
          time: "2019/11/07",
          children: {
            userName: "管理员",
            reply:
              "非常感谢您的喜欢，我们会继续努力！贡献出好书籍，希望您一直支持下去。",
            time: "2019/11/08"
          }
        },
        {
          userIcon: require("@/assets/images/discuss-avatar.png"),
          userName: "用户名",
          discuss:
            "这本这本书不错，非常喜欢！这本书不错，非常喜欢！书不错，非常喜欢！",
          time: "2019/11/07"
        },
        {
          userIcon: require("@/assets/images/discuss-avatar.png"),
          userName: "用户名",
          discuss:
            "这本这本书不错，非常喜欢！这本书不错，非常喜欢！书不错，非常喜欢！",
          time: "2019/11/07"
        },
        {
          userIcon: require("@/assets/images/discuss-avatar.png"),
          userName: "用户名",
          discuss:
            "这本这本书不错，非常喜欢！这本书不错，非常喜欢！书不错，非常喜欢！",
          time: "2019/11/07"
        }
      ]
    };
  },
  created() {},
  methods: {
    //显示评论弹出层
    showWrite() {
      this.writeShow = true;
    },
    //发送
    send() {
      var item = {
        userIcon: require("@/assets/images/discuss-avatar.png"),
        userName: "张三",
        discuss: this.discussWords,
        time: "2020/11/09"
      };
      this.discussList.push(item);
      this.writeShow = false;
      this.discussWords = "";
      Toast.success("评论成功!");
    },
    //取消
    cancle() {
      this.writeShow = false;
      this.discussWords = "";
    },
    //关闭弹层清空输入框
    clearDisTxt() {
      this.discussWords = "";
    },
    onLoad() {
      setTimeout(() => {
        this.loading = false;

        if (this.discussList.length >= 3) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
.titleBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.txtBox {
  font-size: 30px;
}
.titleBox .txt {
  color: #333;
  font-weight: bold;
  margin-right: 15px;
}
.showWriteBtn {
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #f24b3b;
}
.showWriteBtn img {
  width: 30px;
  height: 28px;
  margin-right: 10px;
}
/* 评论列表 */
.discussList {
  padding: 30px 0;
  border-bottom: 1px solid #eee;
}
.infoBox {
  display: flex;
}
.discussInfo {
  flex: 1;
}
.avatar {
  position: relative;
  width: 70px;
  height: 70px;
  margin-right: 13px;
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
  border-radius: 50%;
}
.topInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userNameBox {
  display: flex;
  align-items: center;
}
.userName {
  color: #999;
  margin-right: 20px;
}
.time {
  color: #999;
}
.istop {
  font-size: 18px;
  color: #ffffff;
  background: #da3232;
  padding: 2px 10px;
  border-radius: 5px;
}
.discussTxt {
  color: #333;
  font-size: 28px;
  margin-top: 20px;
}
.replyBox {
  color: #999999;
  margin-top: 20px;
  margin-left: 10px;
}
.replyTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.replyTxt {
  font-size: 28px;
  margin-top: 20px;
}
/* 评论弹层 */
.writeBox {
  padding: 30px;
  padding-bottom: 50px;
}
#writeArea {
  width: 100%;
  font-size: 26px;
  resize: none;
  background: #f1f1f1;
  border: 1px solid #999;
}
.btnBox {
  font-size: 28px;
  text-align: right;
  margin-top: 15px;
}
.cancleBtn {
  padding: 5px 10px;
}
.sendBtn {
  color: #f39e1e;
  padding: 5px 10px;
  margin-left: 30px;
}
</style>
