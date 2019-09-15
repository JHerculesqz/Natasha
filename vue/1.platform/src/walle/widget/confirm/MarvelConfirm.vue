<template>
  <div class="tipDialogBg" v-show="showConfirm">
    <div class="tipDialogWrapper" :id="confirmId"
         v-bind:style="{width: width + 'px','margin-left':marginLeft + 'px', 'margin-top':marginTop + 'px','left':positionLeft, 'top':positionTop}">
      <div class="tipDialogTitleArea">
        <div class="titleName">{{confirmTitle}}</div>
        <div v-if="draggable"
             class="dragArea"
             v-bind:class="[{isDragging:bIsDragging}]"
             v-on:mousedown="mouseDown"
             v-on:mousemove="mouseMove"
             v-on:mouseout="mouseUp"
             v-on:mouseup="mouseUp"></div>
        <div class="closeBtn icon-marvelIcon-20"
             v-on:click="onClickCancel"></div>
      </div>
      <div class="tipDialogContArea">
        <div class="leftMessageIcon icon-cancel-circle" v-if="tipType == 'error'"></div>
        <div class="leftMessageIcon icon-notification" v-else-if="tipType == 'warning'"></div>
        <div class="leftMessageIcon icon-question" v-else-if="tipType == 'tip'"></div>
        <div class="leftMessageIcon " v-else="tipType == 'custom'" :class="confirmIcon" :style="{color: confirmIconColor}"></div>
        <div class="rightMessageCont">
          <div class="MessageTitle errorTitle" v-if="tipType == 'error'" v-text="$t('error')"></div>
          <div class="MessageTitle warningTitle" v-else-if="tipType == 'warning'" v-text="$t('warning')"></div>
          <div class="MessageTitle tipTitle" v-else-if="tipType == 'tip'" v-text="$t('tip')"></div>
          <div class="MessageTitle" v-else="tipType == 'custom'" v-text="confirmSubTitle"></div>
          <div name="dialogCont" class="customContArea" :style="{'max-height':maxContH + 'px'}">
            <span style="line-height: normal;" v-html="confirmCont"></span>
            <div class="contentSession" v-for="content in confirmContLst" :key="content.key">
              <div class="sessionKey">{{content.key}}</div>
              <div class="sessionValue">{{content.value}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tipDialogBtnArea">
        <div class="wapper">
          <div class="pos1" v-show="showOkBtn">
            <marvel-button :label="buttonName == undefined ? $t('ok') : buttonName" icon="icon-checkmark"
                           v-on:onClick="onClickOK"></marvel-button>
          </div>
          <div class="pos2" v-show="showCancelBtn">
            <marvel-button :label="cancelButtonName == undefined ? $t('cancel') : cancelButtonName"
                           icon="icon-cross"
                           v-on:onClick="onClickCancel"></marvel-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "zh": {
  "confirm": "确认",
  "error": "错误",
  "warning": "警告",
  "tip": "提示",
  "ok": "确定",
  "cancel": "取消"
  },
  "en": {
  "confirm": "Confirm",
  "error": "Error",
  "warning": "Warning",
  "tip": "Tip",
  "ok": "OK",
  "cancel": "Cancel"
  }
  }
</i18n>

<script>
  import StringUtilsEx from '../../component/str'
  import MarvelButton from "../btn/MarvelButton";

  /**
   *  MarvelConfirmC widget description
   *  @vuedoc
   *  @exports MarvelConfirmC
   */
  export default {
    components: {MarvelButton},
    name: 'MarvelConfirm',
    props: {
      width: {
        type: Number,
        default: 420,
        required: false,
      },
      maxContH: {
        type: Number,
        default: undefined,
        required: false,
      },
      confirmTitle: {
        type: String,
        default: function () {
          return this.$t("confirm");
        },
        required: false,
      },
      confirmIcon: {
        type: String,
        default: "icon-notification",
        required: false,
      },
      confirmIconColor: {
        type: String,
        default: "#ff8833",
        required: false,
      },
      confirmSubTitle: {
        type: String,
        default: undefined,
        required: false,
      },
      showConfirm: {
        type: Boolean,
        default: false,
        required: false,
      },
      tipType: {
        type: String,
        default: "tip",
        required: false,
        validator: function (str) {
          if (str == "tip" || str == "error" || str == "warning" || str =="custom") {
            return true;
          } else {
            return false;
          }
        }
      },
      confirmCont: {
        type: String,
        default: "&nbsp;&nbsp;",
        required: false,
      },
      confirmContLst: {
        type: Array,
        default: function () {
          return [];
        },
        required: false,
      },
      draggable: {
        type: Boolean,
        default: false,
        required: false,
      },
      buttonName: {
        type: String,
        default: undefined,
        required: false,
      },
      cancelButtonName: {
        type: String,
        default: undefined,
        required: false,
      },
      showOkBtn: {
        type: Boolean,
        default: true,
        required: false,
      },
      showCancelBtn: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    watch: {
      showConfirm: function () {
        if (!this.showConfirm) {
          this.positionLeft = "50%";
          this.positionTop = "50%";
        }
      }
    },
    data: function () {
      return {
        confirmId: StringUtilsEx.uuid(),
        bIsDragging: false,
        marginLeft: 0,
        marginTop: 0,
        mouseDownX: 0,
        mouseDownY: 0,
        positionLeft: "50%",
        positionTop: "50%",
        iLastPositionLeft: "",
        iLastPositionTop: "",
      }
    },
    methods: {
      //#region inner

      _calcConfirmPos: function () {
        var iConfirmW = parseInt($("#" + this.confirmId).width());
        var iConfirmH = parseInt($("#" + this.confirmId).height());

        this.marginLeft = -iConfirmW / 2;
        this.marginTop = -iConfirmH / 2;
      },

      mouseDown: function (e) {
        if (this.draggable) {
          this.bIsDragging = true;
          this.mouseDownX = e.pageX;
          this.mouseDownY = e.pageY;
          this.iLastPositionLeft = this.positionLeft;
          this.iLastPositionTop = this.positionTop;
        }
      },
      mouseMove: function (e) {
        if (this.bIsDragging) {
          var x = e.pageX;
          var Y = e.pageY;
          if (this.iLastPositionLeft == "50%") {
            var iWidth = document.body.clientWidth;
            this.iLastPositionLeft = iWidth / 2;
          }
          if (this.iLastPositionTop == "50%") {
            var iHeight = document.body.clientHeight;
            this.iLastPositionTop = iHeight / 2;
          }
          this.positionLeft = parseInt(this.iLastPositionLeft) + (x - this.mouseDownX) + "px";
          this.positionTop = parseInt(this.iLastPositionTop) + (Y - this.mouseDownY) + "px";
        }
      },
      mouseUp: function () {
        if (this.bIsDragging) {
          this.bIsDragging = false;
        }
      },

      //#endregion
      //#region callback

      onClickOK: function () {
        this.$emit("onClickOK");
      },
      onClickCancel: function () {
        this.$emit("onClickCancel");
      },

      //#endregion
      //#region 3rd
      //#endregion
    },
    watch: {
      showConfirm: {
        handler: function () {
          if (this.showConfirm) {
            this.$nextTick(function () {
              this._calcConfirmPos();
            });
          }
        },
        deep: true
      }
    },
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .tipDialogBg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3000;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .tipDialogBg .tipDialogWrapper {
    position: absolute;
    min-width: 330px;
    margin-left: -210px;
    margin-top: -106px;
    border-radius: 2px;
    box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
    background-color: #ffffff;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogTitleArea {
    height: 52px;
    width: 100%;
    clear: both;
    position: relative;
  }

  .tipDialogTitleArea .titleName:before {
    width: 3px;
    display: inline-block;
    content: "";
    background-color: #3399ff;
    height: 22px;
    margin-right: 30px;
  }

  .tipDialogTitleArea .titleName {
    height: 100%;
    float: left;
    padding-top: 30px;
    font-size: 24px;
    line-height: 24px;
    color: #333333;
    box-sizing: border-box;
    font-family: arial, "Microsoft YaHei", sans-serif;
  }

  .tipDialogTitleArea .dragArea {
    position: absolute;
    width: calc(100% - 30px);
    height: 100%;
    top: 0;
    left: 0;
    cursor: move;
  }

  .tipDialogTitleArea .isDragging {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .tipDialogTitleArea .closeBtn {
    height: 100%;
    padding-top: 10px;
    margin-right: 10px;
    font-size: 10px;
    color: #777777;
    cursor: pointer;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    right: 0;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea {
    padding: 30px 33px;
    width: 100%;
    height: calc(100% - 115px);
    box-sizing: border-box;
    clear: both;
    overflow: hidden;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .leftMessageIcon {
    width: 45px;
    height: 45px;
    float: left;
    line-height: 45px;
    font-size: 45px;
  }

  .icon-cancel-circle {
    color: #ff4c4c;
  }

  .icon-notification {
    color: #ff8833;
  }

  .icon-question {
    color: #3dcca6;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont {
    width: calc(100% - 45px);
    height: 100%;
    float: left;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .MessageTitle {
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 10px;
    color: #333333;
  }

  .errorTitle {
    color: #ff4c4c;
  }

  .warningTitle {
    color: #ff8833;
  }

  .tipTitle {
    color: #3dcca6;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 6px;
    color: #666;
    word-break: break-all;
    overflow-y: auto;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea .contentSession {
    overflow: hidden;
    font-size: 16px;
    line-height: 32px;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea .contentSession .sessionKey {
    width: 120px;
    margin-right: 10px;
    float: left;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea .contentSession .sessionValue {
    width: calc(100% - 130px);
    float: right;
    color: #333;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogBtnArea {
    height: 63px;
    width: 100%;
    padding-top: 16px;
    box-sizing: border-box;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: #f5f5f5;
    position: relative;
    clear: both;
    text-align: center;
  }

  @media (max-width: 440px) {
    .tipDialogBg .tipDialogWrapper {
      width: 90%;
      left: 5%;
      margin-left: 0px;
    }
  }

  .tipDialogBtnArea .wapper {
    display: table;
    margin: auto;
  }

  .tipDialogBtnArea .wapper .pos1 {
    float: left;
    margin-right: 10px;
  }

  .tipDialogBtnArea .wapper .pos2 {
    float: left;
  }

  /*region dark theme*/

  .dark .tipDialogBg {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .dark .tipDialogWrapper {
    box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0);
    background-color: #282746;
  }

  .dark .tipDialogWrapper .tipDialogTitleArea {
  }

  .dark .titleName:before {
    background-color: #02a888;
  }

  .dark .titleName {
    color: #8b90b3;
  }

  .dark .closeBtn {
    color: #8b90b3;
  }

  .dark .tipDialogWrapper .tipDialogContArea {
  }

  .dark .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 6px;
    color: #8b90b3;
  }

  .dark .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .MessageTitle {
    color: #8b90b3;
  }

  .dark .errorTitle {
    color: #ff4c4c;
  }

  .dark .warningTitle {
    color: #ff8833;
  }

  .dark .tipTitle {
    color: #3dcca6;
  }

  .dark .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea .contentSession .sessionValue {
    color: #ffffff;
  }

  .dark .tipDialogWrapper .tipDialogBtnArea {
    background-color: #1e1f36;
  }

  /*endregion*/

</style>
