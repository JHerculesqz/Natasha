<template>
  <div class="bottomExtPanelWrapper">
    <div class="expandBtn icon-marvelIcon-95"
         v-on:click="onExpandBtnClick">
    </div>
    <div class="expandBtnInner" v-bind:class="[icon]"></div>
    <div class="content"
         v-bind:style="{height: iHeight + 'px'}"
         v-show="showEx">
      <div class="fullScreenBtn" v-if="fullScreenController" v-bind:class="fullScreenIcon"
           v-on:click="fullScreen"></div>
      <slot name="content"></slot>
      <div class="draggableHandel" v-show="canDragEx"
           v-bind:class="[{isDragging:bIsDragging}]"
           v-on:mousedown="mouseDown"></div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash"

  /**
   *  MarvelBottomExtPanel widget description
   *  @vuedoc
   *  @exports MarvelBottomExtPanel
   */
  export default {
    name: 'MarvelBottomExtPanel',
    props: {
      height: {
        type: Number,
        default: 300,
        required: false,
      },
      maxHeight: {
        type: Number,
        default: 600,
        required: false,
      },
      show: {
        type: Boolean,
        default: false,
        required: false,
      },
      canDrag: {
        type: Boolean,
        default: false,
        required: false,
      },
      fullScreenController: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        bIsFullScreen: false,
        fullScreenIcon: "icon-marvelIcon-40",
        showEx: this.show,
        canDragEx: this.canDrag,
        bIsDragging: false,
        iHeight: 0,
        iMouseDownY: 0
      }
    },
    computed: {
      icon: function () {
        var strIcon = this.showEx ? "icon-marvelIcon-24" : "icon-marvelIcon-22";
        return strIcon;
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy: function () {
      //#region destroy

      this._destroy();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.iHeight = parseInt(this.height);
        //event
        this.oWrapperFun = _.throttle(this.onMouseMove, 100);
        document.body.addEventListener("mousemove", this.oWrapperFun);
        document.body.addEventListener("mouseup", this.onMouseUp);
      },
      _destroy: function () {
        document.body.removeEventListener("mousemove", this.oWrapperFun);
        document.body.removeEventListener("mouseup", this.onMouseUp);
      },

      //#endregion

      onExpandBtnClick: function () {
        this.showEx = !this.showEx;
        this.callback4OnExpandBtnClick(this.showEx);
      },
      mouseDown: function (e) {
        if (this.canDrag) {
          this.bIsDragging = true;
          this.iMouseDownY = e.pageY;
          this.callback4Mousedown(e);
        }
      },
      onMouseMove: function (event) {
        if (this.bIsDragging) {
          var y = event.pageY;
          this.iHeight = this.iHeight + (this.iMouseDownY - y);
          this.iMouseDownY = y;
          this.restrictHeight();
          this.callback4MouseMove(event);
        }
      },
      onMouseUp: function (event) {
        if (this.bIsDragging) {
          this.bIsDragging = false;
          this.callback4MouseUp(event)
        }
      },
      restrictHeight: function () {
        if (this.maxHeight !== undefined) {
          let iMax = parseInt(this.maxHeight);
          if (this.iHeight > iMax) {
            this.iHeight = iMax;
          }
        }
      },
      fullScreen: function (e) {
        if (!this.bIsFullScreen) {
          this.callback4OnClickFullScreen();
          this.$nextTick(function () {
            this.iHeight = this.maxHeight;
            this.fullScreenIcon = "icon-marvelIcon-41";
            this.bIsFullScreen = true;
          });
        } else {
          this.iHeight = parseInt(this.height);
          this.fullScreenIcon = "icon-marvelIcon-40";
          this.bIsFullScreen = false;
        }
        this.callback4MouseUp(e);
      },

      //#endregion
      //#region callback

      callback4OnExpandBtnClick: function (bIsShow) {
        this.$emit("onExpandBtnClick", bIsShow);
      },
      callback4Mousedown: function (event) {
        this.$emit("mousemove", event);
      },
      callback4MouseMove: function (event) {
        this.$emit("mousemove", event);
      },
      callback4MouseUp: function (event) {
        this.$emit("mouseup", event);
      },
      callback4OnClickFullScreen: function () {
        this.$emit("onClickFullScreen");
      },

      //#endregion
      //#region 3rd

      isExpand: function () {
        return this.showEx;
      },
      expand: function (bIsExpand) {
        if (bIsExpand) {
          this.showEx = true;
        } else {
          this.showEx = false;
        }
      }

      //#endregion
    },
    watch: {
      maxHeight(iNewVal, iOldVal) {
        this.restrictHeight();
      }
    },
  }
</script>

<style scoped>
  .bottomExtPanelWrapper {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .bottomExtPanelWrapper .content {
    width: 100%;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15);
  }

  .bottomExtPanelWrapper .expandBtn {
    width: 60px;
    color: #ffffff;
    text-align: center;
    line-height: 20px;
    font-size: 60px;
    height: 16px;
    cursor: pointer;
    text-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 50%;
    margin-left: -30px;
    overflow: hidden;
  }

  .bottomExtPanelWrapper .expandBtnInner {
    color: #777777;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    position: relative;
    pointer-events: none;
  }

  .draggableHandel {
    height: 10px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    cursor: row-resize;
  }

  .isDragging {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .fullScreenBtn {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
    color: #777777;
  }

  /*region dark theme*/
  .dark .content {
    background-color: #1a1927;
  }

  .dark .expandBtn {
    color: #1a1927;
  }

  .dark .expandBtnInner {
    color: #3dcca6;
  }

  .dark .fullScreenBtn {
    color: #3dcca6;
  }

  /*endregion*/
</style>
