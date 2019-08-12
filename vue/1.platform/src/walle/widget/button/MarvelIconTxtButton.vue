<template>
  <div class="iconTextBtn"
       :title="userDefineTitle?userDefineTitle:label"
       :style="butStyle"
       v-bind:class="[isPrimaryStyle, isMouseDownStyle, size, disable, classCustom, icon, {tip:isWarn}, isIconPosToRight]"
       v-on:click="onClick" v-on:mousedown="_onMouseDown" v-on:mouseup="_onMouseUp">{{ label }}
  </div>
</template>

<script>
  /**
   *  MarvelIconTxtButton widget description
   *  @vuedoc
   *  @exports MarvelIconTxtButton
   */
  export default {
    name: 'MarvelIconTxtButton',
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
      butStyle: {
        default: "",
        required: false,
      },
      classCustom: {
        type: String,
        default: "",
        required: false,
      },
      label: {
        type: String,
        default: "Button",
        required: false,
      },
      icon: {
        type: String,
        default: "",
        required: false,
      },
      userDefineTitle: {
        type: String,
        default: "",
        required: false,
      },
      isWarn: {
        type: Boolean,
        default: false,
        required: false,
      },
      isPrimary: {
        type: Boolean,
        default: true,
        required: false,
      }
    },
    data: function () {
      return {
        disable: "",
        isMouseDown: false
      }
    },
    computed: {
      isPrimaryStyle: function () {
        return this.isPrimary ? 'primaryBtn' : 'defaultBtn';
      },
      isMouseDownStyle: function () {
        if (this.isMouseDown) {
          return this.isPrimary ? 'primaryBtnMouseDown' : 'defaultBtnMouseDown';
        } else {
          return "";
        }
      },
      isIconPosToRight: function () {
        return this.iconPos == 'right' ? 'iconPosToRight' : '';
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
        this.$emit('onClick', this.icon);
      },

      //#endregion
      //#region 3rd

      setBtnDisable: function (bIsDisable) {
        this.disable = bIsDisable ? "disable" : "";
      },
      getStatus: function () {
        return this.disable == "disable" ? true : false;
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
  .iconTextBtn {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
  }

  .iconTextBtn:before {
    margin-right: 10px;
  }

  .iconPosToRight {
    padding-right: 40px !important;
  }

  .iconPosToRight:before {
    position: absolute;
    margin-right: 0px !important;
    right: 15px;
  }

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

  .primaryBtn {
    color: #fff;
    background-color: #3399ff;
  }

  .primaryBtn:before {
    color: #ffffff;
  }

  .primaryBtn:hover {
    background-color: #60b0ff;
  }

  .primaryBtnMouseDown {
    background-color: #006ad4 !important;
  }

  .defaultBtn {
    border: 1px solid #ccc;
    color: #333;
  }

  .defaultBtn:before {
    color: #3399ff;
  }

  .defaultBtn:hover {
    border: 1px solid #60b0ff;
  }

  .defaultBtnMouseDown {
    color: #ffffff;
    background-color: #006ad4 !important;
  }

  .disable {
    background-color: #aaa;
    pointer-events: none;
  }

  /*region dark theme*/

  .dark .iconTextBtn {
    /*border: 1px solid #36365b;*/
    color: #ffffff;
    border-radius: 32px;
    cursor: pointer;
    background-color: #36365b;
  }

  .dark .iconTextBtn:before {
    margin-right: 10px;
    color: #ffffff;
  }

  .dark .iconTextBtn:hover {
    border: 1px solid #6262a8;
  }

  .dark .mouseDown {
    background-color: #6262a8;
    color: #3dcca6;
    border: 1px solid #3dcca6;
  }

  .dark .focus {
    color: #3dcca6;
    border: 1px solid #3dcca6;
  }

  .dark .disable {
    background-color: #36365b;
    color: rgba(255, 255, 255, 0.3);
    border: 1px solid #36365b;
    pointer-events: none;
  }

  .dark .disable:before {
    color: rgba(255, 255, 255, 0.3);
  }

  /*endregion*/
</style>
