<template>
  <div class="courseLearning">
    <div class="titleBox">
      听林崇德老师讲基础教育
    </div>
    <div class="video">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @click="pause"
        @ended="onPlayerEnded($event)"
      ></video-player>
      <van-icon v-show="!show" class="pause" name="pause" />
    </div>
    <div class="share">
      <ul>
        <li>{{ resouceTitle }}</li>
      </ul>
    </div>

    <div class="contentList">
      <div class="studyBox">
        <p class="studyTitle">课程列表</p>
        <ul>
          <li v-for="(studyItem, studyIndex) in studyList" :key="studyIndex">
            <div
              :class="{ studyItem: true, index: currindex == studyIndex }"
              @click="goDetail(studyItem, studyIndex)"
            >
              <span class="studyItem-title">{{ studyItem.title }}</span>
              <span
                class="tryMsg"
                v-if="!productDetail.contentValid && studyItem.freeFile"
                >试读</span
              >
              <span
                class="buyMsg"
                v-if="!productDetail.contentValid && !studyItem.freeFile"
                >需购买</span
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { videoPlayer } from "vue-video-player";
import { Dialog } from "vant";
import "video.js/dist/video-js.css";
Vue.use(Dialog);
export default {
  data() {
    return {
      show: true,
      mask: false,
      title: "",
      resouceTitle: this.$route.query.title ? this.$route.query.title : "",
      active: 0,
      currId: "",
      currindex: "",
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4" // 类型
          }
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          currentTime: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      },
      isclick: true,
      studyList: [],
      textList: [],
      questionList: [],
      downloads: true,
      videoListMd5: [] // md5的数组
    };
  },
  created() {
    this.appId = this.toolClass.getCookie("class_appId");
    this.getPrductData();
  },
  methods: {
    // loading() {
    //   this.$toast.loading({
    //     mask: true,
    //     message: "加载中..."
    //   });
    // },
    getPrductData() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/store/get",
          data: {
            productid: that.$route.query.productId,
            withContent: false,
            appId: that.appId
          }
        })
        .then(function(response) {
          that.productDetail = response.result;
          that.init();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    init() {
      var that = this;
      that.resouceTitle = that.$route.query.title;
      that.title = that.$route.query.parentName;
      document.title = that.$route.query.pageTitle;
      that.playerOptions.sources[0].src =
        that.config.requestCtx +
        "/fileDownload.ashx?appId=" +
        that.appId +
        "&md5=" +
        that.$route.query.md5 +
        "&access_token=" +
        that.toolClass.getCookie("token").split(" ")[1];
      if (that.$route.query.folderId) {
        that.getResouceListData();
      } else {
        that.studyList.push(JSON.parse(that.$route.query.itemData));
      }
      that.currId = that.$route.query.id;
      that.currindex = that.$route.query.index;
      that.playerOptions.poster =
        that.config.requestCtx +
        "/fileDownload.ashx?appId=" +
        that.appId +
        "&md5=" +
        that.$route.query.img.split(".")[0] +
        "&access_token=" +
        that.toolClass.getCookie("token").split(" ")[1];
    },
    getResouceListData() {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/cms/getFolderItemList",
          data: {
            folderId: that.$route.query.folderId,
            withData: true,
            keys: ["free", "freeFile"],
            appId: that.appId,
            querySort: {
              field: "CreateTime",
              direction: "desc"
            },
            queryFilter: [],
            querySearch: [],
            skipCount: 0,
            maxResultCount: 1000
          }
        })
        .then(function(response) {
          for (let j = 0; j < response.result.items.length; j++) {
            let folderItem = response.result.items[j];
            for (let z = 0; z < folderItem.datas.length; z++) {
              folderItem[folderItem.datas[z].fieldName] =
                folderItem.datas[z].fileValue;
            }
          }
          that.studyList = response.result.items;
          console.log(that.studyList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pause() {
      var that = this;
      that.show = false;
    },
    goDetail(itemData, index) {
      var that = this;
      var resources = "";
      if (itemData.freeFile) {
        resources = itemData.freeFile;
      } else {
        if (!that.productDetail.contentValid) {
          Dialog.alert({
            title: "提示",
            message: "请先购买后查看！"
          }).then(() => {});
          return false;
        }
        resources = itemData.free;
      }
      that.resouceTitle = itemData.title;
      that.playerOptions.sources[0].src =
        that.config.requestCtx +
        "/fileDownload.ashx?appId=" +
        that.appId +
        "&md5=" +
        resources +
        "&access_token=" +
        that.toolClass.getCookie("token").split(" ")[1];
      that.currindex = index;
      that.playerOptions.poster =
        that.config.requestCtx +
        "/fileDownload.ashx?appId=" +
        that.appId +
        "&md5=" +
        itemData.icon +
        "&access_token=" +
        that.toolClass.getCookie("token").split(" ")[1];
    },
    download(itemData) {
      var that = this;
      that
        .axios({
          method: "post",
          url: "/api/cms/getById",
          data: {
            itemId: itemData.cmsContainer.items[0].id,
            appId: that.appId
          }
        })
        .then(function(response) {
          var resources = "";
          for (let i = 0; i < response.result.datas.length; i++) {
            if (response.result.datas[i].fieldName == "resources") {
              resources = response.result.datas[i].strValue;
            }
          }
          window.location.href =
            that.config.requestCtx +
            "/fileDownload.ashx?appId=" +
            that.appId +
            "&md5=" +
            resources +
            "&isAttachment=true&useOrgiName=true" +
            "&access_token=" +
            that.toolClass.getCookie("token").split(" ")[1];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onPlayerEnded() {
      var that = this;
      that.currindex++;
      that.goDetail(that.studyList[that.currindex], that.currindex);
    }
  },
  components: {
    videoPlayer
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
.share {
  border-bottom: 5px solid #f0f0f0;
}
.share ul {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
}
.share ul li:nth-child(2) {
  display: flex;
  align-items: center;
}
.share ul li:nth-child(1) {
  padding-left: 28px;
  font-size: 32px;
  color: #000;
  font-weight: bold;
  line-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.share ul li img {
  width: 24px;
}

/* studyBox */
.studyBox {
  padding: 0 28px 40px;
}
.studyBox .audio {
  color: #ffffff;
  background: #c481fb;
  border-radius: 6px;
}
.studyBox .text {
  color: #ffffff;
  background: #fc4636;
  border-radius: 6px;
}
.studyBox .vedio {
  color: #ffffff;
  background: #24d522;
  border-radius: 6px;
}
.studyBox li span {
  font-size: 28px;
}
.studyBox li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 20px 40px;
  border-bottom: 1px solid #efefef;
}

.studyTitle {
  padding: 20px;
  font-weight: bold;
  font-size: 28px;
  color: #333;
  border-bottom: 1px solid #efefef;
}

.studyItem {
  flex: 1;
  overflow: hidden;
  display: flex;
}
.index {
  color: #947355;
}

.studyItem-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
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

.downloadBox {
  display: flex;
  align-items: center;
}

.download {
  height: 28px;
  width: 28px;
  margin-right: 12px;
}
.content {
  padding: 0 40px;
  height: 100%;
}
.photo {
  height: 36px;
  width: 30px;
}
.textList li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  padding: 30px 0;
}
.textList li span {
  margin-left: 20px;
  font-size: 28px;
}

.questionList li {
  border-bottom: 1px solid #dfdfdf;
  padding: 30px 0;
}
.questionList li p {
  font-size: 28px;
}
.about .van-icon {
  color: black;
  font-size: 40px;
}
.questionList li div {
  display: flex;
  align-items: center;
  margin-top: 24px;
}
.heardps {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.name {
  margin: 0 24px 0 12px;
}
.time {
  color: #999999;
}
.shareOther {
  padding: 6px 10px 6px 18px;
  background: #ededed;
  border-radius: 22px 0 0 22px;
  line-height: 44px;
}
.shareOther span {
  margin-left: 12px;
}
.nullBox {
  padding-top: 40px;
  font-size: 28px;
  color: #a6a6a6;
  text-align: center;
}
.courseLearning {
  overflow: hidden;
}
/* .loading {
  text-align: center;
  margin: 20px 0;
  height: 100%;
  padding: 50%;
} */
.video {
  position: relative;
}
.pause {
  position: absolute;
  border: 4px solid #fff;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  text-align: center;
  line-height: 120px;
  top: 50%;
  left: 50%;
  margin-left: -60px;
  margin-top: -60px;
  font-size: 60px;
  color: #fff;
  background: rgba(3, 3, 3, 0.4);
}
</style>

<style>
.video-js .vjs-time-control {
  display: block;
}
.video-js .vjs-remaining-time {
  display: none;
}
.courseLearning .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1em;
  margin-top: -1em;
}
.video-js .vjs-time-control {
  min-width: 0em;
  width: auto;
  padding-left: 0.2em;
  padding-right: 0.2em;
}
.video-js .vjs-big-play-button {
  height: 2em;
  width: 2em;
  border-radius: 50%;
  border: 0.05em solid #fff;
  line-height: 1.9em;
}
/* .van-loading {
  margin: 0 auto;
} */
.vjs-tech {
  pointer-events: none;
}
.video-js.vjs-playing .vjs-tech {
  pointer-events: auto;
}
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}
</style>
