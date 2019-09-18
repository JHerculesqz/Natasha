<template>
  <div class="floatPanelWrapper" :style="floatPanelWrapperStyle">
    <div class="floatPanelInner" :style="floatPanelStyle"
         v-bind:class="[{ expand: isExpand}]">
      <div class="dashboardExpandFolderIcon"
           v-bind:class="[icon, {hasText:text != undefined}]"
           v-on:mousedown="mouseDown"
           v-on:mousemove="mouseMove"
           v-on:mouseup="mouseUp">
        <div class="tipInfo" v-if="bargeCount>0">{{ bargeCount }}</div>
        <div class="tipText" v-if="text != undefined">{{text}}</div>
      </div>
      <div class="dashboardContArea">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "zh": {
  "deviceId": "设备ID:",
  "deviceName": "设备名称:"
  },
  "en": {
  "deviceId": "Device ID:",
  "deviceName": "Device Name:"
  }
  }
</i18n>

<script>
  /**
   *  MarvelFloatPanel widget description
   *  @vuedoc
   *  @exports MarvelFloatPanel
   */
  export default {
    name: 'MarvelFloatPanel',
    props: {
      bargeCount: {
        type: Number,
        default: 0,
        required: false,
      },
      posTop:{
        type: Number,
        default: undefined,
        required: false,
      },
      posRight:{
        type: Number,
        default: undefined,
        required: false,
      },
      posBottom:{
        type: Number,
        default: undefined,
        required: false,
      },
      posLeft:{
        type: Number,
        default: undefined,
        required: false,
      },
      contPos:{
        type: String,
        default: "bottom-right",
        validator: function (str) {
          if (str == "top-left" || str == "top-right" || str == "bottom-left" || str == "bottom-right" || str == "center-left" || str == "center-right" || str == "top-center" || str == "bottom-center") {
            return true;
          } else {
            return false;
          }
        },
        required: false,
      },
      contWidth:{
        type: Number,
        default: 200,
        required: false,
      },
      contHeight:{
        type: Number,
        default: 200,
        required: false,
      },
      hasAnimate: {
        type: Boolean,
        default: true,
        required: false,
      },
      icon: {
        type: String,
        default: "icon-marvelIcon-26",
        required: false,
      },
      text: {
        type: String,
        default: undefined,
        required: false,
      },
      draggable: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        isExpand: false,
        zIndex: 2000,
        floatPanelWrapperStyle:{},
        floatPanelStyle:{},
        bIsMouseDown:false,
        bIsDragging:false,
        mouseDownX: 0,
        mouseDownY: 0,
        iLastPositionTop: undefined,
        iLastPositionRight: undefined,
        iLastPositionBottom: undefined,
        iLastPositionLeft: undefined,
        positionInTop: undefined,
        positionInRight: undefined,
        positionInBottom: undefined,
        positionInLeft: undefined,
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
        if(this.posTop != undefined){
          this.positionInTop = this.posTop;
        }
        if(this.posLeft != undefined){
          this.positionInLeft = this.posLeft;
        }
        if(this.posBottom != undefined){
          this.positionInBottom = this.posBottom;
        }
        if(this.posRight != undefined){
          this.positionInRight = this.posRight;
        }
        this.$nextTick(function () {
          this._calFloatPanelStyle();
        });
      },

      mouseDown: function (e) {
        if (this.draggable) {
          this.bIsMouseDown = true;
          this.mouseDownX = e.pageX;
          this.mouseDownY = e.pageY;
          this.iLastPositionTop = this.positionInTop != undefined? this.positionInTop : undefined;
          this.iLastPositionLeft = this.positionInLeft != undefined? this.positionInLeft : undefined;
          this.iLastPositionBottom = this.positionInBottom != undefined? this.positionInBottom : undefined;
          this.iLastPositionRight = this.positionInRight != undefined? this.positionInRight : undefined;
        }
      },
      mouseMove: function (e) {
        if (this.bIsMouseDown) {
          this.bIsDragging = true;
          var x = e.pageX;
          var Y = e.pageY;
          if(this.positionInTop != undefined){
            this.positionInTop = parseInt(this.iLastPositionTop) + (Y - this.mouseDownY);
          }
          if(this.positionInLeft != undefined){
            this.positionInLeft = parseInt(this.iLastPositionLeft) + (x - this.mouseDownX);
          }
          if(this.positionInBottom != undefined){
            this.positionInBottom = parseInt(this.iLastPositionBottom) - (Y - this.mouseDownY);
          }
          if(this.positionInRight != undefined){
            this.positionInRight = parseInt(this.iLastPositionRight) - (x - this.mouseDownX);
          }

          this._calFloatPanelStyle();
        }
      },
      mouseUp: function () {
        this.bIsMouseDown = false;
        if (this.bIsDragging) {
          this.bIsDragging = false;
        }else{
          this.isExpand = !this.isExpand;
          this._calFloatPanelStyle();
          if(this.isExpand){
            this.callback4OnOpenPanel();
          }else{
            this.callback4OnClosePanel();
          }
        }
      },

      //#endregion

      _calFloatPanelStyle: function(){
        var iIconWH = 46;
        var styleOption = {
          width: iIconWH + 'px',
          height: iIconWH + 'px',
          top: this.positionInTop != undefined? '0' : undefined,
          right: this.positionInRight != undefined? '0' : undefined,
          bottom: this.positionInBottom != undefined? '0' : undefined,
          left: this.positionInLeft != undefined? '0' : undefined,
        };

        if(this.isExpand){
          styleOption['width'] = this.contHeight + 'px';
          styleOption['height'] = this.contWidth + 'px';
          if (this.contPos == "top-left") {
            styleOption['margin-top'] = - this.contHeight + 'px';
            styleOption['margin-left'] = - this.contWidth + 'px';
          } else if(this.contPos == "top-right") {
            styleOption['margin-top'] = - this.contHeight + 'px';
          }else if(this.contPos == "bottom-left") {
            styleOption['margin-left'] = - this.contWidth + 'px';
          }else if(this.contPos == "bottom-right") {
            //do nothing
          }else if(this.contPos == "center-left") {
            styleOption['margin-top'] = - this.contHeight/2 + 'px';
            styleOption['margin-left'] = - this.contWidth + 'px';
          }else if(this.contPos == "center-right") {
            styleOption['margin-top'] = - this.contHeight/2 + 'px';
          }else if(this.contPos == "top-center") {
            styleOption['margin-top'] = - this.contHeight + 'px';
            styleOption['margin-left'] = - this.contWidth/2 + 'px';
          }else if(this.contPos == "bottom-center") {
            styleOption['margin-left'] = - this.contWidth/2 + 'px';
          }
          this.floatPanelWrapperStyle = {
            top: this.positionInTop != undefined? this.positionInTop + 'px' : undefined,
            right: this.positionInRight != undefined? this.positionInRight + 'px' : undefined,
            bottom: this.positionInBottom != undefined? this.positionInBottom + 'px' : undefined,
            left: this.positionInLeft != undefined? this.positionInLeft + 'px' : undefined,
            'z-index': this.zIndex,
          };
        }else{
          this.floatPanelWrapperStyle = {
            top: this.positionInTop != undefined ? this.positionInTop + 'px' : undefined,
            right: this.positionInRight != undefined ? this.positionInRight + iIconWH + 'px' : undefined,
            bottom: this.positionInBottom != undefined ? this.positionInBottom + iIconWH + 'px' : undefined,
            left: this.positionInLeft != undefined ? this.positionInLeft + 'px' : undefined,
            'z-index': this.zIndex,
          };
        }

        this.floatPanelStyle = styleOption;
      },

      //#endregion
      //#region callback

      callback4OnOpenPanel: function () {
        this.$emit("onOpenPanel");
      },
      callback4OnClosePanel: function () {
        this.$emit("onClosePanel");
      },

      //#endregion
      //#region 3rd

      setZIndex: function (iNum) {
        this.zIndex = iNum;
        this._calFloatPanelStyle();
      }

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

  /*endregion*/

  .floatPanelWrapper{
    position: absolute;
  }

  .floatPanelInner {
    position: absolute;
    background-color: #ffffff;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
  }

  .floatPanelInner .dashboardExpandFolderIcon {
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    font-size: 18px;
    position: absolute;
    color: #3399ff;
  }

  .floatPanelInner .dashboardExpandFolderIcon .tipInfo {
    background-color: #ff4c4c;
    border-radius: 20px;
    position: absolute;
    color: #ffffff;
    font-size: 12px;
    line-height: 20px;
    padding: 0 6px;
    top: -4px;
    right: -4px;
  }

  .floatPanelInner .hasText{
    line-height: 14px;
    font-size: 14px;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .floatPanelInner .hasText:before{
    position: relative;
  }

  .floatPanelInner .hasText .tipText{
    line-height: 18px;
    font-size: 12px;
  }

  .floatPanelInner .dashboardContArea {
    display: none;
  }

  .expand {
    border-radius: 4px;
  }

  .expand .dashboardExpandFolderIcon {
    background-color: #ffffff;
    top: -10px;
    left: -10px;
    border-radius: 100%;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.15);
  }

  .expand .dashboardExpandFolderIcon .tipInfo {
    display: none;
  }

  .expand .dashboardContArea {
    display: block;
    padding: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  /*region dark theme*/

  .dark .floatPanelInner {
    background-color: #41475a;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  }

  .dark .floatPanelInner .dashboardExpandFolderIcon {
    color: #3399ff;
  }

  .dark .floatPanelInner .dashboardExpandFolderIcon .tipInfo {
    background-color: #ff4c4c;
    color: #ffffff;
  }

  .dark .expand .dashboardExpandFolderIcon {
    background-color: #41475a;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.15);
  }

  /*endregion*/
</style>
