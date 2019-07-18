<template>
  <div id="marvelDrag" class="marvelDragHelpWrapper" v-show="showDragHelpInner">
    <div class="iconContent" v-show="showIcon4DragHelp"
         v-bind:style="{right: positionRight + 'px', top: positionTop + 'px'}"
         @mousedown="mouseDown"
         @mousemove.stop="mouseMove"
         @mouseout="mouseUp"
         @mouseup="mouseUp"
         @mouseover="mouseover4Icon"
         @click="onClickDragIcon"
    >
      <div class="closeBtn icon-marvelIcon-20"
           v-show="showDragClose"
           v-on:click="onClickDragIconClose"></div>
    </div>
    <marvel-dialog ref="ref4Dialog" :showDialog="showDialog4DragHelp"
                   :title="title" :width="width" :height="height"
                   :dragable="dragable"
                   :hasFoot="hasFoot"
                   :isModal="false"
                   v-on:onClickDialogClose="onClickDialogClose4DragHelp">
      <div slot="dialogCont" class="dialogCont">
        <slot name="dragHelpCont"></slot>
      </div>
      <div slot="dialogFoot">
        <slot name="dragHelpFoot"></slot>
      </div>
    </marvel-dialog>
  </div>
</template>

<script>
  import MarvelDialog from "../../../walle/widget/dialog/MarvelDialog";

  /**
   *  MarvelDragHelp widget description
   *  @vuedoc
   *  @exports MarvelDragHelp
   */
  export default {
    name: 'MarvelDragHelp',
    components: {
      MarvelDialog
    },
    props: {
      width: {
        type: Number,
        default: 0,
        required: true,
      },
      height: {
        type: Number,
        default: 0,
        required: true,
      },
      showDragHelp: {
        type: Boolean,
        default: false,
        required: false,
      },
      title: {
        type: String,
        default: "",
        required: false,
      },
      right: {
        type: Number,
        default: 0,
        required: true,
      },
      top: {
        type: Number,
        default: 0,
        required: true,
      },
      hasFoot: {
        type: Boolean,
        default: false,
        required: false,
      },
      dragable: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    data: function () {
      return {
        showDialog4DragHelp: false,
        showIcon4DragHelp: true,
        showDragClose: false,
        positionRight: 0,
        positionTop: 0,
        iLastPositionRight: 0,
        iLastPositionTop: 0,
        mouseDownX: 0,
        mouseDownY: 0,
        bIsDragging: false,
        showDragHelpInner: false
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    watch: {
      showDragHelp: {
        handler: function () {
          this.showDragHelpInner = this.showDragHelp;
        }
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.positionRight = this.right;
        this.positionTop = this.top;
        this.iLastPositionRight = this.right;
        this.iLastPositionTop = this.top;
        this.showDragHelpInner = this.showDragHelp;
      },

      //#endregion

      onClickDialogClose4DragHelp: function () {
        this.showDialog4DragHelp = false;
        this.showIcon4DragHelp = true;
      },
      onClickDragIcon: function () {
        this.showDialog4DragHelp = true;
        this.showIcon4DragHelp = false;

        var iWidth = document.body.clientWidth;
        var iPositionLeft = parseInt(iWidth) - parseInt(this.positionRight) - this.width / 2 + "px";
        var iPositionTop = parseInt(this.positionTop) + parseInt(this.height / 2) + "px";
        this.$refs.ref4Dialog.setPositionLeftTop(iPositionLeft, iPositionTop);
      },
      onClickDragIconClose: function () {
        this.showDragHelpInner = false;
        this.callback4OnCloseDragHelp();
      },
      mouseover4Icon: function () {
        this.showDragClose = true;
      },
      mouseDown: function (e) {
        this.bIsDragging = true;
        this.mouseDownX = e.pageX;
        this.mouseDownY = e.pageY;
        this.iLastPositionRight = this.positionRight;
        this.iLastPositionTop = this.positionTop;
      },
      mouseMove: function (e) {
        if (this.bIsDragging) {
          var x = e.pageX;
          var Y = e.pageY;
          this.positionRight = parseInt(this.iLastPositionRight) - (x - this.mouseDownX);
          this.positionTop = parseInt(this.iLastPositionTop) + (Y - this.mouseDownY);
        }
      },
      mouseUp: function () {
        if (this.bIsDragging) {
          this.bIsDragging = false;
        }
        this.showDragClose = false;
      },

      //#endregion
      //#region callback

      callback4OnCloseDragHelp: function () {
        this.$emit("onCloseDragHelp");
      },

      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>
  .marvelDragHelpWrapper {
    width: 35px;
    height: 35px;
    padding-top: 5px;
    padding-right: 5px;
  }

  .iconContent {
    /*pos*/
    width: 30px;
    height: 30px;
    position: fixed;
    /*style*/
    cursor: auto;
    border-radius: 100%;
    border: 2px solid rgba(255, 255, 255, 1);
    background: url("../../../../../static/walle/draghelp/circleBg-white.png") no-repeat center rgba(0, 170, 255, 0.8);
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .closeBtn {
    height: 5px;
    width: 5px;
    margin-right: 2px;
    margin-top: -5px;
    font-size: 12px;
    color: #3399ff;
    cursor: pointer;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    right: 0;
  }
</style>
