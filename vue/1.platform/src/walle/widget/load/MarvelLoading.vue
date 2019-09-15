<template>
  <!-- maskLoading start-->
  <div class="maskLoading" v-bind:class="{ dpn: !bIsShow , globalLoading: isGlobal }" v-dom-portal="isGlobal">
    <div class="loadingBoard" v-bind:class="{onlyIcon:onlyIcon}">
      <div class="loadingIcon">
        <div class="icon">
          <div class="dot white"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
      <div class="loadingTip" v-if="!onlyIcon" v-html="loadingMsg"></div>
      <div class="loadingCancel" v-if="hasCancelBtn" :title="$t('cancel')"
           v-on:click="_cancelCurrentLoading">X
      </div>
    </div>
  </div>
  <!-- maskLoading end-->
  <!--global loading使用潜规则：
1 为保证loading有足够的区域范围显示，父容器应宽度不小于208px，高度不小于60px
2 为使loading能与父容器形成相对定位关系，从而达到覆盖住父容器的效果。父容器的position属性不可为"static",
应从"fixed"、"relative"、"absolute"中选择合适属性值使用(若父容器为body，则可忽略此条规则)。
  -->
</template>

<i18n>
  {
  "zh": {
  "cancel": "取消"
  },
  "en": {
  "cancel": "Cancel"
  }
  }
</i18n>

<script>
  /**
   *  MarvelLoadingC widget description
   *  @vuedoc
   *  @exports MarvelLoadingC
   */
  export default {
    name: 'MarvelLoading',
    props: {
      isGlobal: {
        type: Boolean,
        default: false,
        required: false,
      },
      hasCancelBtn: {
        type: Boolean,
        default: true,
        required: false,
      },
      onlyIcon:{
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        showList: []
      }
    },
    computed: {
      loadingMsg: function () {
        var iLen = this.showList.length;
        if (iLen !== 0) {
          return this.showList[iLen - 1].strMsg;
        } else {
          return "";
        }
      },
      bIsShow: function () {
        return this.showList.length > 0 ? true : false;
      }
    },
    methods: {
      //#region inner

      _cancelCurrentLoading: function () {
        var iLen = this.showList.length;
        var loadingKey = this.showList[iLen - 1].key;
        this.callback4OnCancel(loadingKey);
      },

      _getIndexInList: function (strKey) {
        var iIndex = -1;
        for (var i = 0; i < this.showList.length; i++) {
          if (this.showList[i].key == strKey) {
            iIndex = i;
            break;
          }
        }

        return iIndex;
      },

      //#endregion
      //#region callback

      callback4OnCancel: function (loadingKey) {
        this.$emit("onCancel", loadingKey);
      },

      //#endregion
      //#region 3rd

      imsgMarvelLoadingShow: function (strKey, strLoadingMsg) {
        if (this._getIndexInList(strKey) == -1) {
          //registry
          this.showList.push({
            key: strKey,
            strMsg: strLoadingMsg
          });
        }
      },
      imsgMarvelLoadingHide: function (strKey) {
        //is already registry
        var iIndexInList = this._getIndexInList(strKey);
        if (iIndexInList != -1) {
          //registry
          this.showList.splice(iIndexInList, 1);
        }
      },
      imsgMarvelLoadingCancel: function(strKey){
        this.imsgMarvelLoadingHide(strKey);
        this.callback4OnCancel(strKey);
      },

      imsgMarvelLoadingHideAll: function () {
        //is already registry
        this.showList = [];
      },

      //#endregion
    }
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
  .dpn {
    display: none;
  }

  /*loadingAnimate*/
  .icon {
    position: absolute;
    width: 24px;
    height: 24px;
    animation: rotate 2.4s infinite;
  }

  .white {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    animation: flash 2.4s linear infinite;
    opacity: 0;
  }

  .dot {
    position: absolute;
    margin: auto;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    transition: all 1s ease;
  }

  .dot:nth-child(2) {
    top: 0;
    bottom: 0;
    left: 0;
    background: #FF4444;
    animation: dotsY 2.4s linear infinite;
  }

  .dot:nth-child(3) {
    left: 0;
    right: 0;
    top: 0;
    background: #FFBB33;
    animation: dotsX 2.4s linear infinite;
  }

  .dot:nth-child(4) {
    top: 0;
    bottom: 0;
    right: 0;
    background: #99CC00;
    animation: dotsY 2.4s linear infinite;
  }

  .dot:nth-child(5) {
    left: 0;
    right: 0;
    bottom: 0;
    background: #33B5E5;
    animation: dotsX 2.4s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    10% {
      width: 24px;
      height: 24px;
      top: 0;
      left: 0;
    }
    66% {
      width: 6px;
      height: 6px;
      top: 9px;
      left: 9px;
    }
    100% {
      transform: rotate(360deg);
      width: 24px;
      height: 24px;
      top: 0;
      left: 0;
    }
  }

  @keyframes dotsY {
    66% {
      opacity: .1;
      width: 6px;
    }
    77% {
      opacity: 1;
      width: 0;
    }
  }

  @keyframes dotsX {
    66% {
      opacity: .1;
      height: 6px;
    }
    77% {
      opacity: 1;
      height: 0;
    }
  }

  @keyframes flash {
    33% {
      opacity: 0;
      border-radius: 0%;
    }
    55% {
      opacity: .6;
      border-radius: 100%;
    }
    66% {
      opacity: 0;
    }
  }

  /*loadingAnimate end*/

  .maskLoading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 3002;
    text-align: center;
  }

  .globalLoading {
    position: fixed;
  }

  .maskLoading .loadingBoard {
    position: relative;
    top: 50%;
    margin-top: -30px;
    max-width: 50%;
    display: inline-block;
    border-radius: 2px;
    overflow: hidden;
    padding: 18px 40px;
    background-color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  }

  .maskLoading .onlyIcon{
    width: 100%;
    height: 100%;
    max-width: none;
    top: 0;
    margin-top: unset;
    left: 0;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
  }

  .maskLoading .loadingBoard .loadingIcon {
    width: 24px;
    height: 24px;
    float: left;
    margin-right: 10px;
    position: relative;
  }

  .maskLoading .onlyIcon .loadingIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }

  .maskLoading .loadingBoard .loadingTip {
    font-size: 16px;
    line-height: 24px;
    color: #666;
    margin-right: 10px;
    float: left;
  }

  .maskLoading .loadingBoard .loadingCancel {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    border-bottom-left-radius: 24px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    background-color: #60b0ff;
    color: #fff;
    float: left;
    cursor: pointer;
  }

  .maskLoading .onlyIcon .loadingCancel{
    width: 40px;
    height: 40px;
    border-bottom-left-radius: 40px;
    font-size: 20px;
    line-height: 32px;
  }

  /*region dark theme*/

  .dark .maskLoading {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .dark .maskLoading .loadingBoard {
    background-color: #282746;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0);
  }

  .dark .maskLoading .loadingBoard .loadingTip {
    color: #8b90b3;
  }

  .dark .maskLoading .loadingBoard .loadingCancel {
    background-color: #3dcca6;
    color: #fff;
  }

  /*endregion*/
</style>
