<template>
  <div class="rightExtPanelWrapper">
    <div class="expandBtn icon-marvelIcon-98"
         v-on:click="onExpandBtnClick"></div>
    <div class="expandBtnInner"
         v-bind:class="[icon]"></div>
    <div class="content"
         v-bind:style="{width: iWidth + 'px'}"
         v-show="showEx">
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
   *  MarvelRightExtPanel widget description
   *  @vuedoc
   *  @exports MarvelRightExtPanel
   */
  export default {
    name: 'MarvelRightExtPanel',
    props: {
      width: {
        type: Number,
        default: 300,
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
    },
    data: function () {
      return {
        showEx: this.show,
        canDragEx: this.canDrag,
        bIsDragging: false,
        iWidth: 0,
        iBasicWidth: 0,
        iMouseDownX: 0
      }
    },
    computed: {
      icon: function () {
        var strIcon = this.showEx ? "icon-marvelIcon-23" : "icon-marvelIcon-25";
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
        this.iWidth = parseInt(this.width);
        this.iBasicWidth = parseInt(this.width);
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
          this.iMouseDownX = e.pageX;
        }
      },
      onMouseMove: function (event) {
        if (this.bIsDragging) {
          var x = event.pageX;
          this.iWidth = this.iBasicWidth + (this.iMouseDownX - x);
        }
      },
      onMouseUp: function (event) {
        if (this.bIsDragging) {
          this.bIsDragging = false;
          this.iBasicWidth = this.iWidth;
        }
      },

      //#endregion
      //#region callback

      callback4OnExpandBtnClick: function (bIsShow) {
        this.$emit("onExpandBtnClick", bIsShow);
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
  .rightExtPanelWrapper {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }

  .rightExtPanelWrapper .content {
    height: 100%;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    box-shadow: -1px 0 1px rgba(0, 0, 0, 0.15);
  }

  .rightExtPanelWrapper .expandBtn {
    position: absolute;
    left: -16px;
    top: 50%;
    margin-top: -32px;
    width: 16px;
    height: 60px;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 50px;
    cursor: pointer;
    text-shadow: -2px 0 2px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow: hidden;
  }

  .rightExtPanelWrapper .expandBtnInner {
    color: #777;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    position: absolute;
    top: 50%;
    margin-top: -9px;
    left: -10px;
    pointer-events: none;
    z-index: 2;
  }

  .rightExtPanelWrapper .expandBtn:before {
    position: relative;
    right: 14px;
  }

  .draggableHandel {
    height: 100%;
    width: 10px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: col-resize;
  }

  .isDragging {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

  /*endregion*/
</style>
