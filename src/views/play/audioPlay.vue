<template>
  <div class="home">
    <div class="titleBox">
      听林崇德老师讲基础教育
    </div>
    <div class="bg">
      <div id="radio_box">
        <div id="center_box">
          <img v-if="audioImg" src="" alt="" />
          <img v-else src="@/assets/images/audio/audio-img.png" alt />
        </div>
        <p class="audioTitle">
          <span class="title">{{ audioTitle }}</span>
          <span class="nowSpeed">当前倍速: {{ audio.multipleIndex }}</span>
        </p>
        <div class="silderBox">
          <span>{{ formatCurrentTime }}</span>
          <van-slider
            id="slider"
            v-model="currentTime"
            bar-height="5px"
            active-color="#f24b3b"
            @drag-end="end"
          />
          <span>{{ totalTime ? totalTime : "00:00" }}</span>
        </div>
      </div>
    </div>
    <div id="playBox">
      <van-row class="palyBtnBox">
        <van-col class="play_button" span="4" style="dispaly:flex;">
          <div class="speedBox">
            <img
              id="speed"
              src="@/assets/images/audio/music_icon_list.png"
              alt="列表"
              @click="click_list"
            />
            <span>列表</span>
          </div>
          <van-action-sheet
            v-model="showBottom"
            title="音频"
            :style="{ height: '30%' }"
          >
            <van-collapse
              v-model="activeNames"
              v-for="(citem, cindex) in audioList"
              :key="cindex"
            >
              <ul>
                <li
                  :class="{
                    audioItem: true,
                    active: cindex == audio.listNumber
                  }"
                  @click="audioItemClick(cindex)"
                >
                  {{ citem.title }}
                </li>
              </ul>
            </van-collapse>
          </van-action-sheet>
          <!-- 列表 -->
        </van-col>
        <van-col class="play_button" span="4">
          <img
            id="last"
            :src="audio.listNumber == 0 ? src_lock : src_last"
            alt
            @click="click_last"
          />
          <!-- 上一首 -->
        </van-col>
        <van-col class="play_button" span="8">
          <img id="play" :src="src_play" @click="startPlayOrPause" />
          <!-- 播放暂停 -->
        </van-col>
        <van-col class="play_button" span="4">
          <img
            id="next"
            :src="
              audio.listNumber == audio.srcList.length - 1 ? src_lock : src_next
            "
            alt
            @click="click_next"
          />
          <!-- 下一首 -->
        </van-col>
        <van-col class="play_button" span="4">
          <div class="speedBox">
            <img
              id="speedbtn"
              src="@/assets/images/audio/music_but_speed.png"
              alt
              @click="speedChange"
            />
            <span>倍速</span>
          </div>
        </van-col>
        <!-- <van-col class="play_button" span="4">
          <img id="backward" src="@/assets/images/audio/color.png" alt="定时" @click="click_backward">
          <van-action-sheet v-model="showTime" :actions="actions" cancel-text="关闭"/>
        </van-col>-->
      </van-row>
    </div>
    <div v-if="!loading">
      <audio
        id="audio"
        ref="audio"
        @canplay="getDuration"
        @timeupdate="updateTime"
        @pause="onPause"
        @play="onPlay"
        @ended="click_next"
        :src="audioSrc"
        :multipleIndex="audio.multipleIndex"
      ></audio>
    </div>
    <!-- <div class="loadingBox" v-else>
      <van-loading type="spinner" color="#1989fa" />
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Slider, Row, Col, ActionSheet, Loading, Dialog } from "vant";
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(ActionSheet);
Vue.use(Loading);
Vue.use(Dialog);
export default {
  name: "index",
  data() {
    return {
      loading: false,
      showRoundCorner: false,
      showTime: false, //控制倒计时的底部弹出
      src_play: require("@/assets/images/audio/music_but_play.png"),
      src_last: require("@/assets/images/audio/music_but_last.png"),
      src_next: require("@/assets/images/audio/music_but_next.png"),
      src_lock: require("@/assets/images/audio/icon_lock.png"),
      currentIndex: "0",
      //定时与倍速下拉
      timeValue: 0,

      timeOption: [
        { text: "定时", value: 0 },
        { text: "1min", value: 1 },
        { text: "1:00", value: 11 },
        { text: "15min", value: 2 },
        { text: "1:30", value: 22 },
        { text: "2min", value: 3 },
        { text: "2:00", value: 33 }
      ],
      activeNames: ["0"],
      actions: [
        { name: "选项", color: "#07c160" },
        { name: "选项", color: "#07c160" },
        { name: "选项", color: "#07c160" }
      ],
      audioAllList: [
        {
          title: "音频1"
        },
        {
          title: "音频2"
        },
        {
          title: "音频3"
        }
      ],
      bookList: [],
      activeName: ["1"],
      /***************/
      audioList: [],
      audioImg: "",
      audioTitle: "",
      floderId: "",
      showBottom: false, // 控制列表底部弹出
      audio: {
        // 播放状态的属性
        playing: false,
        //音频列表
        srcList: [],
        listNumber: 0,
        multipleIndex: 1
      },
      token: "",
      audioSrc: "",
      //当前时间
      currentTime: 0,
      formatCurrentTime: "00:00",
      closeTime: 0,
      totalTime: 0,
      speedValue: "b",
      queryFilter: [{ field: "Tag", value: "bookResource" }]
    };
  },
  created() {
    var that = this;
    var accToken = this.tool.getCookie("token-" + this.config.appId);
    that.token = accToken.split(" ")[1];
    that.appId = that.config.appId;
    that.floderId = that.$route.query.floderId;
    that.audioId = that.$route.query.audioId;
    that.audioImg = that.$route.query.audioImg;
    that.audioTitle = that.$route.query.audioTitle;

    if (this.$route.query.form == "bookResource") {
      that.queryFilter = [{ field: "Tag", value: "bookResource" }];
    } else if (this.$route.query.form == "addResource") {
      that.queryFilter = [{ field: "Tag", value: "additionalResource" }];
    }
    that.getFoldersList(that.floderId);
  },
  mounted() {
    var that = this;
    that.audio.listNumber = that.$route.query.index;
    // console.log(this.$refs.audio.duration - 0);
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause() {
      if (this.audio.playing) {
        this.src_play = require("@/assets/images/audio/music_but_play.png");
        this.pause();
      } else {
        this.src_play = require("@/assets/images/audio/music_but_pause.png");
        this.play();
      }
      this.audio.playing = !this.audio.playing;
    },
    // 播放音频
    play() {
      setTimeout(() => {
        this.$refs.audio.play();
      }, 10);
      this.setTime(true);
    },
    // 暂停音频
    pause() {
      this.setTime(false);
      this.$refs.audio.pause();
    },
    setTime(open) {
      var that = this;
      if (open && !that.timer) {
        that.timer = setInterval(function() {
          that.currentTime =
            (that.$refs.audio.currentTime / that.$refs.audio.duration) * 100;
        }, 1000);
      } else {
        //clearInterval(that.timer);
      }
    },
    // 当音频播放
    onPlay() {
      this.$refs.audio.playbackRate = this.audio.multipleIndex;
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.$refs.audio.playbackRate = this.audio.multipleIndex;
      this.audio.playing = false;
    },
    end() {
      var that = this;
      that.$refs.audio.currentTime =
        (that.currentTime * that.$refs.audio.duration) / 100;
      that.src_play = require("@/assets/images/audio/music_but_pause.png");
      that.play();
    },
    //点击上一曲
    click_last() {
      if (this.audio.listNumber > 0) {
        this.src_last = require("@/assets/images/audio/music_but_last.png");
        this.audio.listNumber--;
        this.currentTime = 0;
        this.audioTitle = this.audioList[this.audio.listNumber].title;
        this.audioSrc = this.audio.srcList[this.audio.listNumber];
        this.audio.playing = false;
        this.startPlayOrPause();
      }
    },
    //点击下一曲
    click_next() {
      if (this.audio.listNumber < this.audio.srcList.length - 1) {
        this.src_next = require("@/assets/images/audio/music_but_next.png");
        this.audio.listNumber++;
        this.currentTime = 0;
        this.audioTitle = this.audioList[this.audio.listNumber].title;
        this.audioSrc = this.audio.srcList[this.audio.listNumber];
        this.audio.playing = false;
        this.startPlayOrPause();
      }
    },
    audioItemClick(index) {
      this.audio.listNumber = index;
      this.audioTitle = this.audioList[this.audio.listNumber].title;
      this.audioSrc = this.audio.srcList[this.audio.listNumber];
      this.currentTime = 0;
      this.audio.playing = false;
      this.startPlayOrPause();
    },
    //倍速
    speedChange() {
      if (this.speedValue == "a") {
        this.speedValue = "b";
        this.audio.multipleIndex = 1.0;
      } else if (this.speedValue == "b") {
        this.speedValue = "c";
        this.audio.multipleIndex = 1.5;
      } else if (this.speedValue == "c") {
        this.speedValue = "d";
        this.audio.multipleIndex = 2.0;
      } else if (this.speedValue == "d") {
        this.speedValue = "a";
        this.audio.multipleIndex = 0.5;
      }
      this.$refs.audio.playbackRate = this.audio.multipleIndex;
    },
    //获取yinpin资源
    getFoldersList(id) {
      var that = this;
      that.loading = true;
      this.request({
        method: "POST",
        url: "/api/cms/getFolderItemList",
        data: {
          appId: this.config.appId,
          folderId: id - 0,
          keys: ["file", "selectType", "protectedFile", "tag", "isDownload"],
          maxResultCount: 10000,
          queryFilter: that.queryFilter,
          querySearch: [],
          querySort: { field: "CreateDate", direction: "asc" },
          skipCount: 0,
          withData: true
        }
      }).then(res => {
        let arr = [];
        for (let item of res.items) {
          if (item.datas && item.datas.length > 0) {
            for (let citem of item.datas) {
              if (
                citem.fieldName == "file" ||
                citem.fieldName == "protectedFile"
              ) {
                if (citem.fileValue) {
                  item[citem.fieldName] = citem.fileValue;
                  item.fileObj = citem.strValue;
                }
              } else {
                item[citem.fieldName] = citem.strValue;
              }
            }
          }
          let url = this.audioInit(item);
          arr.push(url);
          this.$set(item, "src", url);
        }
        that.audioList = res.items;
        that.audio.srcList = arr;
        this.audioSrc = this.audio.srcList[this.audio.listNumber];
        that.loading = false;
        // console.log(that.audio.srcList);
        // this.$set(item, "floderList", res.items);
      });
    },
    getDuration() {
      //此时可以获取到duration
      this.totalTime = this.SecondToDate(this.$refs.audio.duration);
    },
    updateTime(e) {
      // this.currentTime = e.target.currentTime; //获取audio当前播放时间
      if (this.$refs.audio) {
        this.formatCurrentTime = this.SecondToDate(
          this.$refs.audio.currentTime
        );
      }
    },
    SecondToDate(msd) {
      var time = msd;
      if (time != null && time != "") {
        // if (time > 60 && time < 60 * 60) {
        time =
          (parseInt(time / 60.0) < 10
            ? "0" + parseInt(time / 60.0)
            : parseInt(time / 60.0)) +
          ":" +
          (parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) < 10
            ? "0" +
              parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60)
            : parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60));
      }
      if (time == 0) {
        time = "00:00";
      }
      return time;
    },
    //音频url拼接
    audioInit(floderItem) {
      let that = this;
      if (floderItem.file) {
        let fileObj = JSON.parse(floderItem.fileObj);
        let url =
          that.config.requestCtx +
          "/fileDownload.ashx?md5=" +
          floderItem.file +
          "&appId=" +
          that.config.appId +
          "&isAttachment=true&useOrgiName=true&fullfilename=" +
          fileObj.name +
          "." +
          fileObj.suffix;
        return url;
      } else if (floderItem.protectedFile) {
        let fileObj = JSON.parse(floderItem.fileObj);
        let url =
          that.config.requestCtx +
          "/fileDownload.ashx?md5=" +
          floderItem.protectedFile +
          "&appId=" +
          that.config.appId +
          "&isAttachment=true&useOrgiName=true&fullfilename=" +
          fileObj.name +
          "." +
          fileObj.suffix +
          "&access_token=" +
          that.token;
        return url;
      }
    },
    // 点击列表
    click_list() {
      var that = this;
      that.showBottom = true;
    },
    colose() {
      this.$router.go(-1);
    }
  },
  beforeDestroy() {
    //清除定时器
    clearInterval(this.timer);
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
.loadingBox {
  text-align: center;
  padding: 70px 0;
}
.timeBox {
  color: #fff;
}
#nav {
  font-family: "PingFang-SC-Bold";
  font-size: 16px !important;
}
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home i {
  color: black !important;
  font-size: 36px !important;
}
.bg {
  width: 100%;
  /* background-image: linear-gradient(180deg, #63594d, #aa7c77); */
}
#radio_box {
  text-align: center;
  width: 100%;
  /* background-image: linear-gradient(180deg, #63594d, #aa7c77); */
  position: relative;
}
#radio_box {
  margin-top: 28px;
}
.audioTitle {
  width: 100%;
  padding: 0 20px;
  color: #000000;
  font-family: "PingFang-SC-Bold";
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  font-size: 26px;
  margin-top: 40px;
}
.audioTitle .title {
  flex: 1;
  text-align: left;
}
.audioTitle .nowSpeed {
  width: 150px;
  font-size: 24px;
  margin-left: 20px;
  font-weight: 600;
}
#center_box {
  /* width: 120px;
  height: 167px; */
  border-radius: 4px;
  margin: auto;
}
#center_box img {
  width: 550px;
  height: 550px;
}
#slider {
  width: 500px;
  height: 10px;
  outline: none;
}

#playBox {
  width: 100%;
  margin-top: 60px;
}
@media screen and (min-height: 800px){ 
  #playBox {
    margin-top: 200px;
  }
}
#playBox .palyBtnBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#playBox ul li {
  line-height: 4;
  text-align: left;
  margin-left: 20px;
}

#playBox ul li.active {
  color: #3586ff;
}

.play_button {
  text-align: center;
}

#backward,
#speed {
  width: 37px;
  height: 37px;
}
#speedbtn {
  width: 42px;
  height: 42px;
}
#last,
#next {
  width: 25px;
  height: 25px;
}
#play {
  width: 120px;
  height: 120px;
}
.footer {
  text-align: center;
}
.footer img {
  width: 18px;
  height: 18px;
  margin-bottom: 4px;
}

/* 底部 */
.resourceList ul {
  font-size: 14px;
  color: #323233;
}
.resourceList ul li {
  line-height: 48px;
  padding-left: 20px;
  border-bottom: 1px solid #ebedf0;
}
.van-tabbar-item--active {
  color: #7d7e80;
}
/* bookItem */
.bookItem.active {
  color: #3586ff;
}
.pitch {
  color: #3586ff;
}

.silderBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  font-family: "PingFang SC Medium";
  color: #808080;
  margin-top: 100px;
}
.speedBox {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.speedBox span {
  color: #333333;
  margin-top: 12px;
}
</style>
<style>
.home .van-collapse-item__content {
  padding: 0;
}
.van-slider {
  background: #bebfc3;
}
.van-slider__button {
  width: 39px;
  height: 39px;
}
</style>
