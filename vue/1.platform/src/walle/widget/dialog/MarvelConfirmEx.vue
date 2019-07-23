<template>
  <div class="tipDialogBg" v-bind:class="{uiSink: !showConfirm}">
    <div class="tipDialogWrapper" :id="confirmId"
         :style="{'margin-top': marginTop + dialogYMove + 'px','margin-left':marginLeft + dialogXMove + 'px'}">
      <div class="tipDialogTitleArea" :class="{draggable:canDrag}" @mousedown="onResizeMouseDown($event)">
        <div class="titleName">{{confirmTitle}}</div>
        <div class="closeBtn icon-marvelIcon-20"
             v-on:click.stop="onClickCancel"></div>
      </div>
      <div class="tipDialogContArea">
        <div class="leftMessageIcon" :class="confirmIcon" :style="{color: confirmIconColor}"></div>
        <div class="rightMessageCont">
          <div class="MessageTitle">{{confirmSubTitle}}</div>
          <div name="dialogCont" class="customContArea">
            <div class="contentSession" v-for="content in confirmCont" :key="content.key">
              <div class="sessionKey">{{content.key}}</div>
              <div class="sessionValue">{{content.value}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tipDialogBtnArea">
        <marvel-button v-if="showOkBtn" :label="$t('marvelConfirm_confirm')" classCustom="buttonClassCustom"
                       v-on:onClick="onClickOK"></marvel-button>
        <marvel-button v-if="showCancelBtn" :label="$t('marvelConfirm_cancel')" classCustom="buttonClassCustom"
                       v-on:onClick="onClickCancel"></marvel-button>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "en": {
  "marvelConfirm_confirm": "OK",
  "marvelConfirm_cancel": "Cancel"
  },
  "zh": {
  "marvelConfirm_confirm": "确定",
  "marvelConfirm_cancel": "取消"
  }
  }
</i18n>

<script>
  import StringUtilsEx from '../../component/str'
  import MarvelButton from "../button/MarvelButton";

  /**
   *  MarvelConfirmEx widget description
   *  @vuedoc
   *  @exports MarvelConfirmEx
   */
  export default {
    components: {MarvelButton},
    name: 'MarvelConfirmEx',
    props: {
      showConfirm: {
        type: Boolean,
        default: false,
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
      confirmTitle: {
        type: String,
        default: "Confirm",
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
        default: "Confirm",
        required: false,
      },
      confirmCont: {
        type: Array,
        default: undefined,
        required: true,
      },
      canDrag: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    data: function () {
      return {
        confirmId: StringUtilsEx.uuid(),
        marginLeft: "0",
        marginTop: "0",
        dialogLastXMove: 0,
        dialogLastYMove: 0,
        dialogXMove: 0,
        dialogYMove: 0,
        bMouseDown: false,
        iMouseDownPosX: undefined,
        iMouseDownPosY: undefined,
      }
    },
    mounted: function () {
      //#region init
      this._initEx();
      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this._calcConfirmPos();
      },

      //#endregion

      _calcConfirmPos: function () {
        var iConfirmW = parseInt($("#" + this.confirmId).width());
        var iConfirmH = parseInt($("#" + this.confirmId).height());

        this.marginLeft = -iConfirmW / 2;
        this.marginTop = -iConfirmH / 2;
      },
      onResizeMouseDown: function (oEvent) {
        if (this.canDrag) {
          this.bMouseDown = true;
          this.iMouseDownPosX = oEvent.clientX;
          this.iMouseDownPosY = oEvent.clientY;

          //add listener
          let oWrapperFun = _.throttle(this.onResizeMouseMove, 100);
          document.body.addEventListener("mousemove", oWrapperFun);
          document.body.addEventListener("mouseup", this.onResizeMouseUp);
        }
      },
      onResizeMouseMove(oEvent) {
        if (this.bMouseDown) {
          let iDstClientX = oEvent.clientX;
          let iDstClientY = oEvent.clientY;
          this.dialogXMove = this.dialogLastXMove + (iDstClientX - this.iMouseDownPosX);
          this.dialogYMove = this.dialogLastYMove + (iDstClientY - this.iMouseDownPosY);
        }
      },
      onResizeMouseUp() {
        if (this.canDrag && this.bMouseDown) {
          this.bMouseDown = false;
          this.dialogLastXMove = this.dialogXMove;
          this.dialogLastYMove = this.dialogYMove;
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
      confirmCont: {
        handler() {
          this.$nextTick(function () {
            this._calcConfirmPos();
          });
        },
        deep: true
      },
      showDialog: function (strNewVal, strOldVal) {
        if (this.canDrag && !strNewVal) {
          this.dialogLastXMove = 0;
          this.dialogLastYMove = 0;
          this.dialogXMove = 0;
          this.dialogYMove = 0;
          this.bMouseDown = false;
          this.iMouseDownPosX = undefined;
          this.iMouseDownPosY = undefined;
        }
      },
      bMouseDown: function (strNewVal, strOldVal) {
        if (this.canDrag && !strNewVal) {
          //remove listener
          document.body.removeEventListener("mousemove", this.onResizeMouseMove);
          document.body.removeEventListener("mouseup", this.onResizeMouseUp);
        }
      }
    },
  }
</script>

<style scoped>
  .uiSink {
    opacity: 0 !important;
    position: absolute !important;
    z-index: -1 !important;
  }

  .tipDialogBg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3000;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .tipDialogBg .tipDialogWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 800px;
    border-radius: 2px;
    box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogTitleArea {
    height: 52px;
    width: 100%;
    clear: both;
  }

  .tipDialogBg .tipDialogWrapper .draggable {
    cursor: move;
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
    font-family: arial, "微软雅黑", sans-serif;
  }

  .tipDialogTitleArea .closeBtn {
    height: 100%;
    padding-top: 10px;
    margin-right: 10px;
    font-size: 10px;
    color: #777777;
    cursor: pointer;
    float: right;
    box-sizing: border-box;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea {
    padding: 20px 33px;
    width: 100%;
    height: calc(100% - 105px);
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

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont {
    width: calc(100% - 45px);
    height: 100%;
    float: left;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .MessageTitle {
    font-size: 18px;
    line-height: 45px;
    margin-bottom: 10px;
    color: #333333;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
    color: #999;
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
    height: 53px;
    width: 100%;
    padding-top: 9.5px;
    box-sizing: border-box;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: #f5f5f5;
    position: relative;
    clear: both;
    text-align: center;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogBtnArea .buttonClassCustom {
    margin-right: 16px;
  }

  @media (max-width: 440px) {
    .tipDialogBg .tipDialogWrapper {
      width: 90%;
      left: 5%;
      margin-left: 0px;
    }
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
    color: #ffffff;
  }

  .dark .closeBtn {
    color: #8b90b3;
  }

  .dark .tipDialogWrapper .tipDialogContArea {
  }

  .dark .tipDialogWrapper .tipDialogContArea .rightMessageCont .MessageTitle {
    color: #ffffff;
  }

  .dark .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 6px;
    color: #8b90b3;
  }

  .dark .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea .contentSession .sessionValue {
    color: #ffffff;
  }

  .dark .tipDialogWrapper .tipDialogBtnArea {
    background-color: #1e1f36;
  }

  /*endregion*/

  /*blackBg theme*/

  .blackBg .tipDialogBg {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .blackBg .tipDialogWrapper {
    box-shadow: 0 0 30px 2px rgba(255, 255, 255, 0.2);
    background-color: #000;
  }

  .blackBg .titleName:before {
    background-color: #3399ff;
  }

  .blackBg .titleName {
    color: #eee;
  }

  .blackBg .closeBtn {
    color: #aaa;
  }

  .blackBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .MessageTitle {
    color: #ffffff;
  }

  .blackBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 6px;
    color: #aaa;
  }

  .blackBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea .contentSession .sessionValue {
    color: #999;
  }

  .blackBg .tipDialogWrapper .tipDialogBtnArea {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /*endregion*/

</style>
