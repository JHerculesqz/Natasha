<template>
  <div v-bind:class="[buttonType, size, disable, classCustom, {tip:isWarn}, isMouseDownStyle, icon,isIconPosToRight]"
       v-on:click="onClick" v-on:mousedown="_onMouseDown" v-on:mouseup="_onMouseUp"
       :title="userDefineTitle?userDefineTitle:label"
       :style="[butStyle, {'max-width':maxWidth + 'px'}]">
    {{ label }}
  </div>
</template>

<script>
  /**
   *  MarvelButtonEx widget description
   *  @vuedoc
   *  @exports MarvelButtonEx
   */
  export default {
    name: 'MarvelButton',
    props: {
      size: {
        type: String,
        default: "normal",
        required: false,
        validator: function (str) {
          if (str == "large" || str == "normal" || str == "small" || str == "mini") {
            return true;
          } else {
            return false;
          }
        }
      },
      buttonType: {
        type: String,
        default: "primaryBtn",
        required: false,
        validator: function (str) {
          if (str == "primaryBtn" || str == "plainBtn" || str == "dottedLineBtn" ||  str == "noBorderBtn") {
            return true;
          } else {
            return false;
          }
        }
      },
      classCustom: {
        type: String,
        default: "",
        required: false,
      },
      butStyle: {
        default: "",
        required: false,
      },
      maxWidth:{
        type: Number,
        default: 220,
        required: false,
      },
      icon: {
        type: String,
        default: "",
        required: false,
      },
      iconPos: {
        type: String,
        default: "left",
        required: false,
        validator: function (str) {
          if (str == "left" || str == "right") {
            return true;
          } else {
            return false;
          }
        }
      },
      label: {
        type: String,
        default: "",
        required: false,
      },
      isWarn: {
        type: Boolean,
        default: false,
        required: false,
      },
      userDefineTitle: {
        type: String,
        default: "",
        required: false,
      },
    },
    computed: {
      isMouseDownStyle: function () {
        if (this.isMouseDown || this.isActive) {
          return this.buttonType + 'MouseDown';
        } else {
          return "";
        }
      },
      isIconPosToRight: function () {
        return this.iconPos == 'right' ? 'iconPosToRight' : '';
      }
    },
    data: function () {
      return {
        disable: "",
        isActive:false,
        isMouseDown: false
      }
    },
    methods: {
      //#region inner

      _onMouseDown: function () {
        this.isMouseDown = true;
      },
      _onMouseUp: function () {
        this.isMouseDown = false;
      },

      //#endregion
      //#region callback

      onClick: function () {
        this.$emit('onClick');
      },

      //#endregion
      //#region 3rd

      setBtnDisable: function (bIsDisable) {
        this.disable = bIsDisable ? this.buttonType + "Disable" : "";
      },

      isBtnDisabled: function () {
        return this.disable == this.buttonType + "Disable" ? true : false;
      },

      setActive: function (bIsActive) {
        this.isActive = bIsActive;
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

  /*region primaryBtn*/

  .primaryBtn {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    color: #fff;
    background-color: #3399ff;
  }

  .primaryBtn:before{
    color: #ffffff;
  }

  .primaryBtn:hover {
    background-color: #60b0ff;
  }

  .primaryBtnMouseDown {
    background-color: #006ad4 !important;
  }

  .primaryBtnDisable {
    background-color: #aaa;
    color: #ffffff;
    pointer-events: none;
  }

  .primaryBtnDisable:before {
    color: #ffffff;
  }

  /*endregion*/

  /*region plainBtn*/

  .plainBtn {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    border: 1px solid #3399ff;
    color: #333;
    box-sizing: border-box;
  }

  .plainBtn:before{
    color: #3399ff;
  }

  .plainBtn:hover {
    color: #3399ff;
  }

  .plainBtnMouseDown {
    color: #3399ff;
    background-color: rgba(0,106,212, 0.1);
  }

  .plainBtnDisable {
    border: 1px solid #aaa;
    background-color: #aaa;
    color: #ffffff;
    pointer-events: none;
  }

  .plainBtnDisable:before {
    color: #ffffff;
  }

  /*endregion*/

  /*region dottedLineBtn*/

  .dottedLineBtn {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 2px;
    color: #333;
    cursor: pointer;
    border: 1px dashed #cccccc;
    position: relative;
    box-sizing: border-box;
  }

  .dottedLineBtn:before{
    color: #3399ff;
  }

  .dottedLineBtn:hover {
    color: #3399ff;
  }

  .dottedLineBtnMouseDown {
    border: 1px dashed #3399ff;
    color: #3399ff;
    background-color: rgba(0,106,212, 0.1);
  }

  .dottedLineBtnDisable {
    border: 0.4px solid #cccccc;
    color: #999 !important;
    background-color: rgba(0, 0, 0, 0.1);
    pointer-events: none;
  }

  .dottedLineBtnDisable:before {
    color: #999;
  }

  /*endregion*/

  /*region noBorderBtn*/

  .noBorderBtn {
    color: #3399ff;
    height: unset !important;
    font-size: 16px;
    display: inline-block;
    cursor: pointer;
    position: relative;
    line-height: unset !important;
    padding: 0 !important;
    box-sizing: border-box;
  }

  .noBorderBtn:before{
    color: #777;
  }

  .noBorderBtn:hover {
    color: #60b0ff;
  }

  .noBorderBtn:hover:before {
    color: #60b0ff;
  }

  .noBorderBtnMouseDown {
    color: #006ad4 !important;
  }

  .noBorderBtnMouseDown:before {
    color: #006ad4 !important;
  }

  .noBorderBtnDisable {
    color: #999 !important;
    pointer-events: none;
  }

  .noBorderBtnDisable:before {
    color: #999;
  }

  .iconPosToRight {
    padding-right: 40px !important;
  }

  .iconPosToRight:before {
    position: absolute;
    margin-right: 0px !important;
    right: 15px;
  }

  /*endregion*/

  /*region size*/

  .large {
    height: 40px;
    padding: 0 30px;
    font-size: 16px;
    line-height: 40px;
  }

  .small {
    height: 26px;
    padding: 0 16px;
    font-size: 14px;
    line-height: 26px;
  }

  .mini {
    height: 22px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 22px;
  }

  .large[class*="noBorderBtn"] {
    font-size: 18px;
  }

  .small[class*="noBorderBtn"] {
    font-size: 14px;
  }

  .mini[class*="noBorderBtn"] {
    font-size: 12px;
  }

  /*endregion*/

  /*region warn*/

  .tip:after {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }

  .tip[class*="noBorderBtn"]:after {
    top: -4px;
    left: -4px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }

  /*endregion*/

  /*region dark theme*/

  /*region primaryBtn*/

  .dark .primaryBtn {
    border: 1px solid #36365b;
    color: #ffffff;
    border-radius: 32px;
    background-color: #36365b;
  }

  .dark .primaryBtn:hover {
    border: 1px solid #6262a8;
  }

  .dark .primaryBtnMouseDown {
    background-color: #6262a8;
  }

  .dark .primaryBtnDisable {
    background-color: #36365b;
    color: rgba(255, 255, 255, 0.3);
    border: 1px solid #36365b;
  }

  /*endregion*/

  /*region plainBtn*/

  .dark .plainBtn {
    border-radius: 32px;
    border: 1px solid #36365b;
    color: #ffffff;
  }

  .dark .plainBtn:hover {
    border: 1px solid #6262a8;
  }

  .dark .plainBtnMouseDown {
    background-color: #6262a8;
  }

  .dark .plainBtnDisable {
    background-color: #36365b;
    color: rgba(255, 255, 255, 0.3);
    border: 1px solid #36365b;
  }

  /*endregion*/

  /*region dottedLineBtn*/

  .dark .dottedLineBtn {
    color: #a7abbe;
    border: 1px dashed #a7abbe;
  }

  .dark .dottedLineBtn:before{
    color: #a7abbe;
  }

  .dark .dottedLineBtn:hover {
    color: #3dcaa6;
  }

  .dark .dottedLineBtn:hover:before {
    color: #3dcaa6;
  }

  .dark .dottedLineBtnDisable {
    color: #8d8d8d !important;
  }

  .dark .dottedLineBtnMouseDown {
    border: 1px solid #3dcaa6;
    color: #fff;
    background-color: rgba(61, 202, 166, 0.2);
  }

  /*endregion*/

  /*region noBorderBtn*/

  .dark .noBorderBtn {
    color: #3dcca6;
  }

  .dark .noBorderBtn:before{
    color: #ffffff;
  }

  .dark .noBorderBtn:hover {
    color: #45e0b7;
  }

  .dark .noBorderBtn:hover:before {
    color: #45e0b7;
  }

  .dark .noBorderBtnMouseDown {
    color: #0058af;
  }

  .dark .noBorderBtnDisable {
    color: #8d8d8d !important;
  }

  .dark .noBorderBtnDisable:before {
    color: #36365b !important;
  }

  /*endregion*/

  /*endregion*/
</style>
