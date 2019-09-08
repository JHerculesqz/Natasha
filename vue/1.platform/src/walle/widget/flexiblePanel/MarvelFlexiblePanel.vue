<template>
  <div class="flexiblePanelWrapper" :class="'pos4' + pos">
    <div class="expandBtn" :class="expandBtnIcon" :style="{color:expandBtnBgColor}"
         v-on:click="onExpandBtnClick">
      <div class="expandBtnInner" :class="expandBtnIconInner"></div>
    </div>
    <div class="content" :style="contentStyle"
         v-show="showEx">
      <div class="fullScreenBtn" v-if="fullScreenController" v-bind:class="fullScreenIcon"
           v-on:click="fullScreen"></div>
      <slot name="content"></slot>
      <div class="draggableHandel" v-show="canDrag"
           v-bind:class="[{isDragging:bIsDragging}]"
           v-on:mousedown="mouseDown"></div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash"

  /**
   *  MarvelFlexiblePanel widget description
   *  @vuedoc
   *  @exports MarvelFlexiblePanel
   */
  export default {
    name: 'MarvelFlexiblePanel',
    props: {
      pos: {
        type: String,
        default: "bottom",
        validator: function (str) {
          if (str == "top" || str == "right" || str == "bottom" || str == "left") {
            return true;
          } else {
            return false;
          }
        },
        required: false,
      },
      height: {
        type: Number,
        default: 300,
        required: false,
      },
      maxHeight: {
        type: Number,
        default: undefined,
        required: false,
      },
      width: {
        type: Number,
        default: 300,
        required: false,
      },
      maxWidth: {
        type: Number,
        default: undefined,
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
      expandBtnBgColor:{
        type: String,
        default: "",
        required: false,
      }
    },
    data: function () {
      return {
        bIsFullScreen: false,
        fullScreenIcon: "icon-marvelIcon-40",
        showEx: this.show,
        bIsDragging: false,
        iHeight: 0,
        iWidth: 0,
        iMouseDownY: 0,
        iMouseDownX: 0
      }
    },
    computed: {
      expandBtnIcon:function(){
        if(this.pos == "top"){
          return "icon-marvelIcon-96";
        }else if(this.pos == "right"){
          return "icon-marvelIcon-98";
        }else if(this.pos == "bottom"){
          return "icon-marvelIcon-95";
        }else if(this.pos == "left"){
          return "icon-marvelIcon-97";
        }
      },
      expandBtnIconInner: function () {
        var strIcon = '';
        if(this.pos == "top"){
          strIcon = this.showEx ? "icon-marvelIcon-22" : "icon-marvelIcon-24";
        }else if(this.pos == "right"){
          strIcon = this.showEx ? "icon-marvelIcon-23" : "icon-marvelIcon-25";
        }else if(this.pos == "bottom"){
          strIcon = this.showEx ? "icon-marvelIcon-24" : "icon-marvelIcon-22";
        }else if(this.pos == "left"){
          strIcon = this.showEx ? "icon-marvelIcon-25" : "icon-marvelIcon-23";
        }
        return strIcon;
      },
      contentStyle: function () {
        if(this.pos == "top" || this.pos == "bottom"){
          return {height: this.iHeight + 'px'}
        }else if(this.pos == "right" || this.pos == "left"){
          return {width: this.iWidth + 'px'}
        }
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
        this.iWidth = parseInt(this.width);
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
          this.iMouseDownX = e.pageX;
          this.callback4Mousedown(e);
        }
      },
      onMouseMove: function (event) {
        if (this.bIsDragging && this.pos == 'top') {
          this.onMouseMove4top(event);
        }else if(this.bIsDragging && this.pos == 'right'){
          this.onMouseMove4right(event);
        }else if(this.bIsDragging && this.pos == 'bottom'){
          this.onMouseMove4bottom(event);
        }else if(this.bIsDragging && this.pos == 'left'){
          this.onMouseMove4left(event);
        }
      },
      onMouseMove4top:function(event){
        var y = event.pageY;
        this.iHeight = this.iHeight - (this.iMouseDownY - y);
        this.iMouseDownY = y;
        this.restrictHeight();
        this.callback4MouseMove(event);
      },
      onMouseMove4right:function(event){
        var x = event.pageX;
        this.iWidth = this.iWidth + (this.iMouseDownX - x);
        this.iMouseDownX = x;
        this.restrictWidth();
        this.callback4MouseMove(event);
      },
      onMouseMove4bottom:function(event){
        var y = event.pageY;
        this.iHeight = this.iHeight + (this.iMouseDownY - y);
        this.iMouseDownY = y;
        this.restrictHeight();
        this.callback4MouseMove(event);
      },
      onMouseMove4left:function(event){
        var x = event.pageX;
        this.iWidth = this.iWidth - (this.iMouseDownX - x);
        this.iMouseDownX = x;
        this.restrictWidth();
        this.callback4MouseMove(event);
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
      restrictWidth: function () {
        if (this.maxWidth !== undefined) {
          let iMax = parseInt(this.maxWidth);
          if (this.iWidth > iMax) {
            this.iWidth = iMax;
          }
        }
      },
      fullScreen: function (e) {
        if (this.pos == 'top' || this.pos == 'bottom') {
          this.fullScreenInH(e);
        }else if(this.pos == 'right' || this.pos == 'left'){
          this.fullScreenInW(e);
        }
      },
      fullScreenInH: function(e){
        if (!this.bIsFullScreen) {
          this.callback4OnClickFullScreen();
          this.$nextTick(function () {
            this.iHeight = this.maxHeight != undefined ? this.maxHeight : 600;
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
      fullScreenInW: function(e){
        if (!this.bIsFullScreen) {
          this.callback4OnClickFullScreen();
          this.$nextTick(function () {
            this.iWidth = this.maxWidth != undefined ? this.maxWidth : 600;
            this.fullScreenIcon = "icon-marvelIcon-41";
            this.bIsFullScreen = true;
          });
        } else {
          this.iWidth = parseInt(this.width);
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
      },
      maxWidth(iNewVal, iOldVal) {
        this.restrictWidth();
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

  .flexiblePanelWrapper {
    position: absolute;
  }
  .pos4top{
    width: 100%;
    top: 0;
    left: 0;
  }
  .pos4right{
    height: 100%;
    top: 0;
    right: 0;
  }
  .pos4bottom{
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .pos4left{
    height: 100%;
    top: 0;
    left: 0;
  }

  .flexiblePanelWrapper .content {
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }
  .pos4top .content{
    width: 100%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  }
  .pos4right .content{
    height: 100%;
    box-shadow: 0 0px 1px rgba(0, 0, 0, 0.15);
  }
  .pos4bottom .content{
    width: 100%;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15);
  }
  .pos4left .content{
    height: 100%;
    box-shadow: 0 0px 1px rgba(0, 0, 0, 0.15);
  }

  .flexiblePanelWrapper .content .draggableHandel {
    position: absolute;
  }

  .pos4top .content .draggableHandel{
    height: 10px;
    width: 100%;
    bottom: 0;
    left: 0;
    cursor: row-resize;
  }
  .pos4right .content .draggableHandel{
    height: 100%;
    width: 10px;
    top: 0;
    left: 0;
    cursor: col-resize;
  }
  .pos4bottom .content .draggableHandel{
    height: 10px;
    width: 100%;
    top: 0;
    left: 0;
    cursor: row-resize;
  }
  .pos4left .content .draggableHandel{
    height: 100%;
    width: 10px;
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

  .fullScreenBtn {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
    color: #777777;
  }

  .flexiblePanelWrapper .expandBtn {
    position: absolute;
    cursor: pointer;
    overflow: hidden;
    color: #ffffff;
    text-align: center;
    font-size: 60px;
  }
  .flexiblePanelWrapper .expandBtnInner {
    text-align: center;
    color: #777777;
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }

  .pos4top .expandBtn{
    width: 60px;
    text-align: center;
    line-height: 20px;
    font-size: 60px;
    height: 16px;
    bottom: -16px;
    left: 50%;
    margin-left: -30px;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  }
  .pos4top .expandBtn:before{
    position: relative;
    top: -2px;
  }
  .pos4top .expandBtnInner{
    line-height: 16px;
    font-size: 12px;
    top: 0;
    left: 50%;
    margin-left: -6px
  }

  .pos4right .expandBtn{
    left: -16px;
    top: 50%;
    margin-top: -32px;
    width: 16px;
    height: 60px;
    line-height: 60px;
    font-size: 50px;
    text-shadow: -2px 0 2px rgba(0, 0, 0, 0.2);
  }
  .pos4right .expandBtn:before{
    position: relative !important;
    right: 16px !important;
  }
  .pos4right .expandBtnInner{
    line-height: 16px;
    font-size: 12px;
    top: 50%;
    right: 0px;
    margin-top: -9px;
  }

  .pos4bottom .expandBtn{
    width: 60px;
    text-align: center;
    line-height: 20px;
    font-size: 60px;
    height: 16px;
    top: -16px;
    left: 50%;
    margin-left: -30px;
    text-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
  }
  .pos4bottom .expandBtnInner{
    line-height: 16px;
    font-size: 12px;
    top: 0;
    left: 50%;
    margin-left: -6px;
    box-sizing: unset;
  }

  .pos4left .expandBtn{
    right: -16px;
    top: 50%;
    margin-top: -32px;
    width: 16px;
    height: 60px;
    line-height: 60px;
    font-size: 50px;
    text-shadow: 2px 0 2px rgba(0, 0, 0, 0.2);
  }
  .pos4left .expandBtn:before{
    position: relative !important;
    left: -18px !important;
  }
  .pos4left .expandBtnInner{
    line-height: 16px;
    font-size: 12px;
    top: 50%;
    left: 0px;
    margin-top: -9px;
  }

  /*region dark theme*/
  .dark .content {
    background-color: #1a1927;
  }

  .dark .expandBtn {
    color: #1a1927;
  }

  .dark .expandBtn .expandBtnInner {
    color: #3dcca6;
  }

  .dark .fullScreenBtn {
    color: #3dcca6;
  }

  /*endregion*/
</style>
