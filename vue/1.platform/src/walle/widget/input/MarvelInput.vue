<template>
  <div class="inputWrapper" v-bind:class="[status, size]">
    <div class="placeHolder" v-show="inputMsg === '' || inputMsg == undefined">{{placeHolder}}</div>
    <input class="inputDefault" :type="inputType"
           :title="placeHolder"
           :disabled="bDisabled"
           v-model.trim="inputMsg"
           @input="onInput"
           @blur="onBlur"
           @focus="onFocus">
    <div class="errorTip icon-notification" v-show="bShowErrMsg">{{ errMsg }}</div>
  </div>
</template>

<script>
  import _ from "lodash"

  /**
   *  MarvelInput widget description
   *  @vuedoc
   *  @exports MarvelInput
   */
  export default {
    name: 'MarvelInput',
    props: {
      inputType: {
        type: String,
        default: "text",
        required: false,
      },
      status: {
        type: String,
        default: "",
        required: false,
      },
      placeHolder: {
        type: String,
        default: "",
        required: false,
      },
      errMsg: {
        type: String,
        default: "",
        required: false,
      },
      size: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {
        lastInputMsg: "",
        inputMsg: "",
        bShowErrMsg: true
      }
    },
    created: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    computed: {
      bDisabled() {
        return this.status.toLowerCase() === 'disable';
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.inputWrap = _.debounce(function (event) {
          this.callback4OnInput(this.inputMsg);
        }, 1000);
      },

      //#endregion

      onInput: function (event) {
        this.inputWrap(event);
      },
      onBlur: function () {
        this.bShowErrMsg = false;
        this.callback4OnBlur(this.inputMsg, this.lastInputMsg);
      },
      onFocus: function () {
        this.lastInputMsg = this.inputMsg;
        this.bShowErrMsg = true;
      },

      //#endregion
      //#region callback

      callback4OnBlur: function (strInput, strLastInput) {
        this.$emit("onBlur", strInput, strLastInput);
      },
      callback4OnInput: function (strInput) {
        this.$emit("onInput", strInput);
      },

      //#endregion
      //#region 3rd

      setInputMsg: function (strInputMsg) {
        if (strInputMsg != undefined) {
          this.inputMsg = strInputMsg;
        }
      },
      getInputMsg: function () {
        return this.inputMsg;
      },

      //#endregion
    },
  }
</script>

<style scoped>
  /*region basic*/

  * {
    font-family: "Microsoft YaHei", "arial", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .inputWrapper {
    width: 100%;
    position: relative;
  }

  .placeHolder {
    color: #999;
    position: absolute;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 12px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  .inputWrapper .inputDefault {
    padding: 0 10px;
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    outline: none;
  }

  .inputWrapper .inputDefault:hover, .inputWrapper .inputDefault:focus {
    border: 1px solid #3399ff;
  }

  .inputWrapper .errorTip {
    color: #ff4c4c;
    line-height: 36px;
    font-size: 14px;
    display: none;
  }

  .inputWrapper .errorTip:before {
    margin-right: 10px;
  }

  .error .inputDefault {
    border: 1px solid #ff4c4c !important;
  }

  .error .errorTip {
    display: block;
  }

  .disable .inputDefault {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .mini .inputDefault {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
  }

  .mini .placeHolder {
    height: 22px;
    line-height: 22px;
  }

  /*region dark theme*/
  .dark .inputWrapper {
    background-color: transparent;
  }

  .dark .inputWrapper .placeHolder {
    color: #666;
  }

  .dark .inputDefault {
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #ffffff;
    background-color: transparent;
  }

  .dark .inputWrapper .inputDefault:hover, .dark .inputWrapper .inputDefault:focus {
    border: 1px solid #3dcca6;
  }

  .dark .disable .inputDefault {
    background-color: rgba(0, 0, 0, 0.4);
    color: #8d8d8d;
    pointer-events: none;
  }

  /*endregion*/

</style>
