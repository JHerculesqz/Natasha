<template>
  <div v-bind:class="{tipDialogBg: isModal, tipDialogBgModal: !isModal}" v-show="showDialog">
    <div class="tipDialogWrapper"
         v-bind:style="{ width: width + 'px', height: height + 'px', 'margin-top': -height/2 + 'px', 'margin-left': -width/2 + 'px', 'left':positionLeft, 'top':positionTop}">
      <div class="tipDialogTitleArea">
        <div class="titleName">{{ title }}</div>
        <div v-if="draggable"
             class="dragArea"
             v-bind:class="[{isDragging:bIsDragging}]"
             v-on:mousedown="mouseDown"
             v-on:mousemove="mouseMove"
             v-on:mouseout="mouseUp"
             v-on:mouseup="mouseUp"></div>
        <div class="closeBtn icon-marvelIcon-20"
             v-on:click="onClickDialogClose"></div>
      </div>
      <div class="tipDialogContArea" v-bind:class="{hasFoot:hasFoot}">
        <slot name="dialogCont"></slot>
      </div>
      <div class="tipDialogBtnArea" v-if="hasFoot">
        <slot name="dialogFoot"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelDialog widget description
   *  @vuedoc
   *  @exports MarvelDialog
   */
  export default {
    name: 'MarvelDialog',
    props: {
      showDialog: {
        type: Boolean,
        default: false,
        required: false,
      },
      title: {
        type: String,
        default: "",
        required: false,
      },
      width: {
        type: Number,
        default: 100,
        required: false,
      },
      height: {
        type: Number,
        default: 100,
        required: false,
      },
      draggable: {
        type: Boolean,
        default: false,
        required: false,
      },
      hasFoot: {
        type: Boolean,
        default: true,
        required: false,
      },
      isModal: {
        type: Boolean,
        default: true,
        required: false,
      },
      showDialogCloseBtn: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    watch: {
      showDialog: function () {
        if (!this.showDialog) {
          this.positionLeft = '50%';
          this.positionTop = '50%';
        }
      }
    },
    data: function () {
      return {
        bIsDragging: false,
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
      setPositionLeftTop: function(iPositionLeft, iPositionTop){
        this.positionLeft = iPositionLeft;
        this.positionTop = iPositionTop;
      },
      mouseUp: function () {
        if (this.bIsDragging) {
          this.bIsDragging = false;
        }
      },

      //#endregion
      //#region callback

      onClickDialogClose: function () {
        this.$emit("onClickDialogClose");
      },

      //#endregion
      //#region 3rd
      //#endregion
    },
  }
</script>

<style scoped>
  .tipDialogBg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: auto;
    z-index: 3000;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .tipDialogBgModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .tipDialogWrapper {
    position: absolute;
    border-radius: 2px;
    box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
    background-color: #ffffff;
  }

  .tipDialogWrapper .tipDialogTitleArea {
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
    margin-right: 18px;
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

  .tipDialogWrapper .tipDialogContArea {
    padding: 20px;
    width: 100%;
    height: calc(100% - 52px);
    box-sizing: border-box;
    clear: both;
  }

  .tipDialogWrapper .tipDialogContArea.hasFoot {
    height: calc(100% - 90px);
  }

  .tipDialogWrapper .tipDialogBtnArea {
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
    .tipDialogWrapper {
      width: 90%;
      left: 5%;
      margin-left: 0px;
    }
  }

  /*region dark theme*/

  .dark .tipDialogWrapper {
    box-shadow: 0 0 30px 2px rgba(0, 0, 0, 0);
    background-color: #282746;
  }

  .dark .tipDialogWrapper .tipDialogTitleArea {
  }

  .dark .tipDialogTitleArea .titleName:before {
    background-color: #02a888;
  }

  .dark .tipDialogTitleArea .titleName {
    color: #8b90b3;
  }

  .dark .tipDialogTitleArea .closeBtn {
    color: #8b90b3;
  }

  .dark .tipDialogWrapper .tipDialogContArea {
  }

  .dark .tipDialogWrapper .tipDialogBtnArea {
    background-color: #1e1f36;
  }

  /*endregion*/
</style>
