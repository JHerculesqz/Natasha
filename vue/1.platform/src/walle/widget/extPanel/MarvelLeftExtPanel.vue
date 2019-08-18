<template>
  <div class="leftExtPanelWrapper">
    <div class="content"
         v-bind:style="{width: iWidth + 'px'}"
         v-show="showEx">
      <slot name="content"></slot>
      <div class="draggableHandel" v-show="canDragEx"
           v-bind:class="[{isDragging:bIsDragging}]"
           v-on:mousedown="mouseDown"></div>
    </div>
    <div class="expandBtn icon-marvelIcon-97" :style="{color:expandBtnBgColor}"
         v-on:click="onExpandBtnClick"></div>
    <div class="expandBtnInner" v-bind:class="[icon]"></div>
  </div>
</template>

<script>
  import _ from "lodash"

  /**
   *  MarvelLeftExtPanel widget description
   *  @vuedoc
   *  @exports MarvelLeftExtPanel
   */
  export default {
    name: 'MarvelLeftExtPanel',
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
      expandBtnBgColor:{
        type: String,
        default: "#ffffff",
        required: false,
      }
    },
    data: function () {
      return {
        showEx: this.show,
        canDragEx: this.canDrag,
        bIsDragging: false,
        iWidth: 0,
        iBasicWidth: 0,
        iMouseDownX: 0,
      }
    },
    computed: {
      icon: function () {
        var strIcon = this.showEx ? "icon-marvelIcon-25" : "icon-marvelIcon-23";
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
        if (this.canDragEx) {
          this.bIsDragging = true;
          this.iMouseDownX = e.pageX;
        }
      },
      onMouseMove: function (event) {
        if (this.bIsDragging) {
          var x = event.pageX;
          this.iWidth = this.iBasicWidth + (x - this.iMouseDownX);
        }
      },
      onMouseUp: function (event) {
        if (this.bIsDragging) {
          this.bIsDragging = false;
          this.iBasicWidth = this.iWidth;
          this.callback4Mouseup(this.iWidth);
        }
      },

      //#endregion
      //#region callback

      callback4OnExpandBtnClick: function (bIsShow) {
        this.$emit("onExpandBtnClick", bIsShow);
      },
      callback4Mouseup: function (iWidth) {
        this.$emit("onMouseUp", iWidth);
      },

      //#endregion
      //#region 3rd

      expand: function (bIsExpand) {
        if (bIsExpand) {
          this.showEx = true;
        } else {
          this.showEx = false;
        }
      },
      isExpand: function () {
        return this.showEx;
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
  .leftExtPanelWrapper {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .leftExtPanelWrapper .content {
    height: 100%;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    box-shadow: 1px 0 1px rgba(0, 0, 0, 0.15);
  }

  .leftExtPanelWrapper .expandBtn {
    position: absolute;
    right: -16px;
    top: 50%;
    margin-top: -32px;
    width: 16px;
    height: 60px;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 50px;
    cursor: pointer;
    text-shadow: 2px 0 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .leftExtPanelWrapper .expandBtnInner {
    color: #777;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    position: absolute;
    top: 50%;
    margin-top: -9px;
    right: -10px;
    pointer-events: none;
  }

  .leftExtPanelWrapper .expandBtn:before {
    position: relative;
    left: -20px;
  }

  .draggableHandel {
    height: 100%;
    width: 10px;
    position: absolute;
    top: 0;
    right: 0;
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
