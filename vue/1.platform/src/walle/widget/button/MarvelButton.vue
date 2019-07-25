<template>
  <div class="marvelBtn"
       v-bind:class="[isPrimaryStyle, size, disable, classCustom, {tip:isWarn}, isMouseDownStyle]"
       v-on:click="onClick" v-on:mousedown="_onMouseDown" v-on:mouseup="_onMouseUp">{{ label }}
  </div>
</template>

<script>
  /**
   *  MarvelButton widget description
   *  @vuedoc
   *  @exports MarvelButton
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
      isWarn: {
        type: Boolean,
        default: false,
        required: false,
      },
      isPrimary: {
        type: Boolean,
        default: true,
        required: false,
      },
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
      }
    },
    data: function () {
      return {
        disable: "",
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
        this.disable = bIsDisable ? "disable" : "";
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
  .marvelBtn {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
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

  .primaryBtn {
    color: #fff;
    background-color: #3399ff;
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

  .defaultBtn:hover {
    border: 1px solid #60b0ff;
  }

  .defaultBtnMouseDown {
    color: #ffffff;
    background-color: #006ad4 !important;
  }

  .disable {
    background-color: #aaa;
    color: #ffffff;
    pointer-events: none;
  }

  /*region dark theme*/
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

  .dark .defaultBtn {
    border-radius: 32px;
    border: 1px solid #36365b;
    color: #ffffff;
  }

  .dark .defaultBtn:hover {
    border: 1px solid #6262a8;
  }

  .dark .defaultBtnMouseDown {
    background-color: #6262a8;
  }

  .dark .disable {
    background-color: #36365b;
    color: rgba(255, 255, 255, 0.3);
    border: 1px solid #36365b;
  }

  /*endregion*/
</style>
