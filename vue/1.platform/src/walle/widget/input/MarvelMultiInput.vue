<template>
  <div class="inputWrapper" v-bind:class="[status, size]"
       v-bind:style="{height: height + 'px'}">
    <textarea :placeholder="placeHolder"
              :title="placeHolder"
              :disabled="bDisabled"
              v-model="inputMsg"
              @blur="onBlur"
              @input="onInput"></textarea>
  </div>
</template>

<script>
  import _ from "lodash"

  /**
   *  MarvelMultiInput widget description
   *  @vuedoc
   *  @exports MarvelMultiInput
   */
  export default {
    name: 'MarvelMultiInput',
    props: {
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
      height: {
        type: Number,
        default: 46,
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
        inputMsg: ""
      }
    },
    created: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    computed: {
      bDisabled() {
        return this.status ? this.status.toLowerCase() === "disable" : false;
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.inputWrap = _.debounce(function (event) {
          this.callback4OnInput(this.inputMsg);
        }, 1000)
      },

      //#endregion

      onInput: function (event) {
        this.inputWrap(event);
      },
      onBlur: function () {
        this.callback4OnBlur(this.inputMsg);
      },

      //#endregion
      //#region callback

      callback4OnBlur: function (strInput) {
        this.$emit("onBlur", strInput);
      },
      callback4OnInput: function (strInput) {
        this.$emit("onInput", strInput);
      },

      //#endregion
      //#region 3rd

      setInputMsg: function (strInputMsg) {
        this.inputMsg = strInputMsg;
      },
      getInputMsg: function () {
        return this.inputMsg;
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
  .inputWrapper {
    width: 100%;
    height: 100%;
  }

  .inputWrapper textarea {
    padding: 0 10px;
    height: 100%;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 20px;
    font-size: 14px;
    color: #333;
    background-color: transparent;
  }

  .inputWrapper textarea[disabled="disabled"] {
    color: #b3b3b3;
  }

  .inputWrapper textarea:hover, .inputWrapper textarea:focus {
    border: 1px solid #3399ff;
  }

  .disable textarea {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .mini textarea {
    height: 32px;
    line-height: 18px;
    font-size: 12px;
  }

  /*region dark theme*/
  .dark textarea {
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #8b90b3;
  }

  .dark textarea:hover, .dark textarea:focus {
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  /*endregion*/

</style>
